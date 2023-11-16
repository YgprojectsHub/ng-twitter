import { Component, Input } from '@angular/core';
import { ModelService } from '../shared/services/model.service';
import { AuthService } from '../shared/services/auth.service';
import { PostsService } from '../shared/services/posts.service';
import { Post, Comment } from '../interface';

@Component({
  selector: 'app-form',template: `
  <!-- Guest User -->
<div class="border-b-[1px] border-neutral-800 px-5 py-2">
 <div class="py-8" *ngIf="!auth.loggedInUserId">
   <h1 class="text-white text-2xl text-center mb-4 font-bold">Welcome to Twitter</h1>
   <div class="flex flex-row items-center justify-center gap-4">
     <app-button label="Login" (click)="modalService.isLoginModelOpen.set(true)" />
     <app-button label="Register" [secondary]="true" (click)="modalService.isRegisterModalOpen.set(true)" />
   </div>
 </div>
 <!-- End Guest User -->

 <!-- Logged In User -->
 <div class="flex flex-row gap-4" *ngIf="auth.loggedInUserId">
   <Avatar [userId]="auth.loggedInUserId" />
   <div class="w-full">
     <textarea [disabled]="isLoading"
     [(ngModel)]="body"
     #ctrl="ngModel"
       class="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
       [placeholder]="placeholder"></textarea>
     <hr class="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
     <div class="mt-4 flex flex-row justify-end">
       <app-button label="Tweet" [disabled]="isLoading || !body.length" (click)="tweet()" />
     </div>
   </div>
 </div>
 <!-- End LoggedIn User -->
</div>
`,
  styles: [
  ]
})
export class FormComponent {

  isLoading: boolean = false;
  body: string = '';
  @Input() placeholder: string = '';
  @Input() isComment: boolean = false;
  @Input() postId: string = '';

  constructor(public modalService: ModelService, public auth : AuthService, private postService: PostsService) {}

  tweet(): void {
    this.isLoading = true;

    const body: (Post | Comment) = {
      body: this.body,
      userId: this.auth.loggedInUserId,
      createdAt: new Date()
    };

    if (this.isComment) {
      body.postId = this.postId;
      this.postService.saveComment(body as Comment).then(() => {
        this.isLoading = false;
        this.body = ''
      })
    } else {
      this.postService.savePost(body).then((res) => {
        this.isLoading = false;
        this.body = '';
      }).catch(() => {
        this.isLoading = false;
      })
    }
  }
}
