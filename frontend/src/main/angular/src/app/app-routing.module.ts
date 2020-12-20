import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './modules/private/components/home/home.component';
import {LoginComponent} from './modules/public/components/login/login.component';
import {RegisterComponent} from './modules/public/components/register/register.component';
import {ProfileComponent} from './modules/private/components/profile/profile.component';
import {BoardUserComponent} from './modules/private/components/board-user/board-user.component';
import {BoardAdminComponent} from './modules/private/components/board-admin/board-admin.component';
import {BoardModeratorComponent} from './modules/private/components/board-moderator/board-moderator.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'user', component: BoardUserComponent},
  {path: 'mod', component: BoardModeratorComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
