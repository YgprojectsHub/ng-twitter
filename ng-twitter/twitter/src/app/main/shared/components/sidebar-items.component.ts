import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarItems } from 'src/app/main/interface';
import { ModelService } from '../services/model.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sidebar-items',
  template: `
    <div class="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-opacity-10 hover:bg-blue-300 cursor-pointer transition">
      <img src="/assets/images/logo.svg" alt="Logo" class="h-14 w-14">
    </div>
    <div class="flex flex-row items-center" *ngFor="let item of items">
      <a [routerLink]="item.route" [ngClass]="{'text-white': !item.isActive, 'text-sky-500': item.isActive}" class="text-white material-icons relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        {{item.icon}}
      </a>
      <a [routerLink]="item.route" class="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <p class="hidden lg:block text-white text-lg">{{item.label}}</p>
      </a>
    </div>

    <!-- Logout Button -->

    <div (click)="signOut()" *ngIf="authService.userData | async" class="flex flex-row items center">
      <div class="material-icons text-white relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bgslate-300 hover:bg-opacity-10 cursor-pointer">
        logout
      </div>
      <div class="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-opacity-10 cursor-pointer hover:bg-slate-300">
        <p class="hidden lg:block text-white text-lg">Logout</p>
      </div>
    </div>

    <!-- Tweet button -->

    <div class="material-icons text-white mt-6 lg:hidden h-14 w-14 rounded-full p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer text-lg">
    send
    </div>
    <div (click)="openLoginModal()" class="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition">
      <p class="text-white text-center font-semibold text-[15px]">Tweet</p>
    </div>
  `,
  styles: [
  ]
})
export class SidebarItemsComponent implements OnInit, OnDestroy {
  items: Array<SidebarItems> = [{
    label:'Home',
    route: '/',
    icon: 'home',
    isActive: true,
  },
  {
    label:'Notifications',
    route:'/notifications',
    icon: 'notifications'
  }]

  subscribtion!: Subscription

  constructor(private modelService: ModelService, public authService: AuthService){}
  
  ngOnInit(): void {
      this.subscribtion = this.authService.userData.subscribe((user) => {
        if(!user){
          this.items = this.items.filter((item) => {
            return item.label != "Profile"
          })
        }else{
          this.items.push({
            label: "Profile",
            route: `/user/${this.authService.loggedInUserId}`,
            icon: "person"
          })
        }
      })
  }

  openLoginModal(): void{
    this.modelService.isLoginModelOpen.set(true);
  }

  signOut(){
    this.authService.signOut()
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
