import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './shared/components/sidebar.component';
import { SidebarItemsComponent } from './shared/components/sidebar-items.component';
import { HeaderComponent } from './shared/components/header.component';
import { FollowBarComponent } from './shared/components/follow-bar.component';
import { AvatarComponent } from './shared/components/avatar.component';
import { RegisterModalComponent } from './shared/auth/register-modal/register-modal.component';
import { ModalComponent } from './shared/components/modal.component';
import { ButtonComponent } from './shared/components/button.component';
import { LoginModalComponent } from './shared/auth/login-modal/login-modal.component';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { LoaderComponent } from './shared/components/loader.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormComponent } from './components/form.component';
import { HomeComponent } from './home/home.component';
import { ModelService } from './shared/services/model.service';
import { PostsComponent } from './components/posts.component';
import { PostItemsComponent } from './components/post-items.component';
import { DateAgoPipe } from './shared/pipes/date-ago.pipe';
import { PostComponent } from './components/post/post.component';
import { PostComponent as PC2 } from './post/post.component';
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    SidebarItemsComponent,
    HeaderComponent,
    FollowBarComponent,
    AvatarComponent,
    RegisterModalComponent,
    ModalComponent,
    ButtonComponent,
    LoginModalComponent,
    UserProfileComponent,
    LoaderComponent,
    EditUserComponent,
    FormComponent,
    HomeComponent,
    PostsComponent,
    PostItemsComponent,
    DateAgoPipe,
    PostComponent,
    PC2,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ModelService]
  
})
export class MainModule { }
