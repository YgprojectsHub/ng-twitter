import { Component, Input } from '@angular/core';
import { Post } from '../interface';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { PostsService } from '../shared/services/posts.service';

@Component({
  selector: 'app-post-items',
  template: ` 
    <div (click)="goToPost(post.postId)" class="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div class="flex flex-row items-start gap-3">
        <Avatar/>
        <div>
          <div class="flex flex-row items-center gap-2">
            <p class="text-white font-semibold cursor-pointer hover:underline">
              {{post.user?.displayName}}
            </p>
            <span (click)="goToUser(post.user?.uid)" class="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              {{ "@" + post.user?.username}}
            </span>
            <span class="text-neutral-500 text-sm">
              {{post.createdAt?.toDate() | dateAgo}}
            </span>
          </div>
          <div class="text-white mt-1">
            {{post.body}}
          </div>
          <div class="flex flex-row items-center mt-3 gap-10">
            <div class="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
            <span class="material-symbols-outlined">
              mode_comment
            </span>
              <p>
                {{post.commentCount}}
              </p>
            </div>
            <div (click)="toggleLike($event)" class="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
              <span class="material-icons">
                {{post.likes?.length && (post.likes?.includes(this.auth.loggedInUserId)) ? 'favorite' : 'favorite_border'}}
              </span>
              <p>
                {{post.likes?.length ?? '0'}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class PostItemsComponent {
  @Input() post!: Post

  constructor(public auth: AuthService, private router: Router, private postService: PostsService) {}

  goToUser(id: string | undefined): void {
    this.router.navigate(['user', id])
  }

  goToPost(id: string | any): void {
    this.router.navigate(['post', id])
  }

  toggleLike(event: Event): void {
    event.stopPropagation();
    if (this.post.postId) {
      this.postService.toggleLike(this.post.postId, this.auth.loggedInUserId).subscribe()
    }
  }

}
