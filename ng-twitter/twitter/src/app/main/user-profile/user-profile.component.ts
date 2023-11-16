import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../shared/services/auth.service'
import { UserService } from '../shared/services/user.service';
import { User } from '../interface';
import { Subscription } from 'rxjs';
import { ModelService } from '../shared/services/model.service';
import { ConfigService } from '../shared/services/config.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  isFollowed: boolean = false
  followingCount : number = 0
  followersCount : number = 0
  user!: User
  currentUserId: string = ""
  loading: boolean = false
  isAdmin: boolean = false

  private subscribtion!: Subscription

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, public modalService: ModelService, public auth: AuthService, public modal: ModelService, private config: ConfigService){}

  ngOnInit(): void {
    this.subscribtion = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.currentUserId = params.get('id') || ''
      this.isAdmin = this.currentUserId === this.auth.loggedInUserId ? true : false
      
      this.getCurrentUserProfileInfo()
      this.getFollowers()
      this.getFollowing()

      if(this.auth.isLoggedIn){
        this.userService.checkIfFollowed(this.auth.loggedInUserId, this.currentUserId).subscribe((isFollowed) => {
          this.isFollowed = isFollowed
        })
      }
    })
  }

  getCurrentUserProfileInfo(): void {
    this.subscribtion = this.userService.getAllUsers().subscribe(_user => {
      this.user = _user.find(u => u.uid == this.currentUserId) as User
      this.config.updateHeaderSettings(this.user.displayName, true)
    })
  }

  getFollowers(): void{
    this.userService.getFollowersCount(this.currentUserId).subscribe(count =>{
      this.followersCount = count
    })
  }
  
  getFollowing(): void{
    this.userService.getFollowingCount(this.currentUserId).subscribe(count =>{
      this.followingCount = count
    })
  }

  toggleFollow(): void{
    if(!this.auth.isLoggedIn){
      this.modal.isLoginModelOpen.set(true)
      return
    }
    if(this.isFollowed){
      this.userService.unfollowUser(this.auth.loggedInUserId, this.currentUserId).then(res => {

      })
    }else{
      this.userService.followUser(this.auth.loggedInUserId, this.currentUserId).then(res => {

      })
    }
    this.isFollowed = !this.isFollowed
  }

  edit(): void{
    this.modalService.isEditModelOpen.set(true)
  }
}
