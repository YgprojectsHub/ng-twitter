import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', component: HomeComponent, pathMatch: 'full'
      },
      {
        path: 'post/:id', component: PostComponent
      },
      {
        path: 'user/:id', component: UserProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
