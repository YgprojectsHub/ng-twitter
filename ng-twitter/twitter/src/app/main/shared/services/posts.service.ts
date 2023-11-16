import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comment, Post, User } from '../../interface';
import { Observable, combineLatest, defaultIfEmpty, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: AngularFirestore) { }

  savePost(data: Post) {
    return this.afs.collection<Post>('posts').add(data);
  }

  getPost(id: string) {
    return combineLatest([
      this.afs.collection<Post>('posts').doc(id).valueChanges({ idField: 'postId' }),
      this.afs.collection<User>('users').valueChanges({ idField: 'userId' }),
      this.getCommentsByPostId(id)
    ]).pipe(
      map(([post, users, comments]) => {
        const user = users.find(u => u.userId === post?.userId)
        const commentCount = comments.length;
        return { ...post, user, commentCount }
      })
    )
  }

  getPosts(id: string = ''): Observable<Post[]> {
    if (id) {
      return combineLatest([
        this.afs.collection<Post>('posts', ref => ref.where('userId', '==', id)).valueChanges({ idField: 'postId' }),
        this.afs.collection<User>('users').valueChanges({ idField: 'userId' })
      ]).pipe(
        switchMap(([posts, users]) => {
          const postObservables = posts.map(post => {
            const user = users.find(u => u.userId === post.userId)
            const comments$ = this.getCommentsByPostId(post.postId)

            return comments$.pipe(
              map(comments => {
                const commentCount = comments.length;
                return { ...post, user, commentCount }
              })
            );
          });
          return combineLatest(postObservables).pipe(
            defaultIfEmpty([]) // Return an empty array if there are no posts available
          )
        })
      )
    } else {
      return combineLatest([
        this.afs.collection<Post>('posts').valueChanges({ idField: 'postId' }),
        this.afs.collection<User>('users').valueChanges({ idField: 'userId' })
      ]).pipe(
        switchMap(([posts, users]) => {
          const postObservables = posts.map(post => {
            const user = users.find(u => u.userId === post.userId)
            const comments$ = this.getCommentsByPostId(post.postId);

            return comments$.pipe(
              map(comments => {
                const commentCount = comments.length;
                return { ...post, user, commentCount }
              })
            );
          });
          return combineLatest(postObservables).pipe(
            defaultIfEmpty([]) // Return an empty array if there are no posts available
          )
        })
      )
    }
  }

  saveComment(comment: Comment): Promise<any> {
    const commentCollection = this.afs.collection<Comment>('comments');
    const id = this.afs.createId();
    comment.id = id;
    return commentCollection.doc(id).set(comment);
  }

  getCommentsByPostId(postId: string): Observable<Comment[]> {
    return combineLatest([
      this.afs.collection<Comment>('comments', ref => ref.where('postId', '==', postId)).valueChanges({ idField: 'commentId' }),
      this.afs.collection<User>('users').valueChanges({ idField: 'userId' })
    ]).pipe(
      map(([comments, users]) => {
        return comments.map(comment => {
          const user = users.find(u => u.userId === comment.userId);
          return { ...comment, user }
        })
      })
    )
  }

  toggleLike(postId: string, userId: string): Observable<void> {
    const postRef = this.afs.collection('posts').doc(postId);
    return new Observable<void>(observer => {
      this.afs.firestore.runTransaction(transaction => {
        return transaction.get(postRef.ref).then(postDoc => {
          if (postDoc.exists) {
            const post = postDoc.data() as Post;
            const likes = post.likes || [];
            if (likes.includes(userId)) {
              const index = likes.indexOf(userId);
              likes.splice(index, 1);
            } else {
              likes.push(userId);
            }
            transaction.update(postRef.ref, { likes })
            observer.next()
          } else {
            observer.error('Post not found')
          }
        })
      })
    })
  }
}