import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../../shared/services/posts.service';
import { Comment } from '../../interface';

@Component({
  selector: 'app-comments',
  template: `
    <div class="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition" *ngFor="let comment of comments">
      <div class="flex flex-row items-start gap-3">
        <Avatar/>
        <div>
          <div class="flex flex-row items-center gap-2">
            <p class="text-white font-semibold cursor-pointer hover:underline">
              {{comment.user?.displayName}}
            </p>
            <span class="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              {{ "@" + comment.user?.username}}
            </span>
            <span class="text-neutral-500 text-sm">
              {{comment.createdAt?.toDate() | dateAgo}}
            </span>
          </div>
          <div class="text-white mt-1">
            {{comment.body}}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class CommentsComponent implements OnInit{

  @Input() postId: string = ""
  comments: Comment[] = []

  constructor(private postService: PostsService){}

  ngOnInit(): void {
    this.postService.getCommentsByPostId(this.postId).subscribe((comments) =>{
      this.comments = comments
    })
  }
}
