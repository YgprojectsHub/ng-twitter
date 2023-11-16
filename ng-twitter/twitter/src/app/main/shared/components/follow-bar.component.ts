import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../../interface';

@Component({
  selector: 'app-follow-bar',
  template: `
  <div class="px-6 py-4 hidden lg:block">
    <div class="bg-neutral-800 rounded-xl p-4">
      <h2 class="text-white text-xl font-semibold">Who to follow?</h2>
      <div class="flex flex-col gap-6 mt-4">
        <div class="flex justify-center align-middle" *ngIf="!users.length">
          <!-- Loader here -->
          <app-loader></app-loader>
        </div>
        <ng-container *ngFor="let user of users">
          <a routerLink="/user/{{user.uid}}" *ngIf="user.uid != auth.loggedInUserId">
          <div class="flex flex-row gap-4">
            <!-- Avatar -->
            <Avatar></Avatar>
            <div class="flex flex-col">
              <p class="text-white font-semibold text-sm">
                {{user.displayName}}
              </p>
              <p class="text-neutral-400 text-sm">
                @{{user.username}}
              </p>
            </div>
          </div>
          </a>
        </ng-container>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class FollowBarComponent implements OnInit{

  loading: boolean = false;
  users: User[] = []

  constructor(private userService: UserService, public auth: AuthService){}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users
    })
  }
}
