import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../interface';
import { Subscription } from 'rxjs';
import { PostsService } from '../shared/services/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-posts',
  template: `
    <div class="flex justify-center align-middle" *ngIf="loading">
      <app-loader></app-loader>
    </div>
    <ng-container *ngFor="let post of posts">
      <app-post-items *ngIf="post" [post]="post" />
    </ng-container>
  `,
  styles: [
  ]
})
export class PostsComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  posts: Post[] = [];
  subscription!: Subscription
  userId: string = ""

  constructor(private postService: PostsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap?.subscribe((params: ParamMap) => {
      this.userId = params.get('id') || '';
      this.loading = true;
      this.getPosts();
    })
  }

  private getPosts(): void {
    this.subscription = this.postService.getPosts(this.userId).subscribe((posts) => {
      this.posts = posts
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
