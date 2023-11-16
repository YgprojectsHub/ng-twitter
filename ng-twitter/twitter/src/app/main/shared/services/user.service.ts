import { Injectable } from '@angular/core';
import { User } from '../../interface';
import { Observable, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users!: Observable<User[]>

  constructor(private afs: AngularFirestore) { }

  getAllUsers(){
    return this.users = this.afs.collection<User>('users').valueChanges()
  }

  getFollowersCount(userId: string): Observable<number>{
    const userRef = this.afs.collection('users').doc(userId)
    return userRef.collection('followers').valueChanges().pipe(map(followers => followers.length))
  }

  getFollowingCount(userId: string): Observable<number>{
    const userRef = this.afs.collection('users').doc(userId)
    return userRef.collection('following').valueChanges().pipe(map(following => following.length))
  }

  checkIfFollowed(currentUserId: string, userIdToCheck: string): Observable<boolean>{
    const currentUserRef = this.afs.collection('users').doc(currentUserId)
    const following = currentUserRef.collection('following').doc(userIdToCheck)

    return following.get().pipe(map(docSnapShot => docSnapShot.exists))
  }

  followUser(currentUserId: string, userIdToFollow: string): Promise<void>{
    const currentUserRef = this.afs.collection('users').doc(currentUserId)
    const following = currentUserRef.collection('following').doc(userIdToFollow)

    const followedUserRef = this.afs.collection('users').doc(userIdToFollow)
    const followers = followedUserRef.collection('following').doc(currentUserId)

    const batch = this.afs.firestore.batch()
    batch.set(following.ref, {followedAt: new Date()})
    batch.set(followers.ref, {followedAt: new Date()})

    return batch.commit()
  }

  unfollowUser(currentUserId: string, userIdToFollow: string): Promise<void>{
    const currentUserRef = this.afs.collection('users').doc(currentUserId)
    const following = currentUserRef.collection('following').doc(userIdToFollow)

    const followedUserRef = this.afs.collection('users').doc(userIdToFollow)
    const followers = followedUserRef.collection('following').doc(currentUserId)

    const batch = this.afs.firestore.batch()
    batch.delete(following.ref)
    batch.delete(followers.ref)

    return batch.commit()
  }

  editUserProfile(id: string, userData: any): Promise<any> {
    return this.afs.collection('users').doc(id).update(userData)
  }
}
