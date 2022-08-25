import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UpdateUserProfileComponent } from './component/update-user-profile/update-user-profile.component';
import { UserProfilComponent } from './component/user-profil/user-profil.component';
import { UsersComponent } from './component/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'update-profile',
    component: UpdateUserProfileComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user',
    children: [
      {
        path: '',
        component: UsersComponent
      },
      {
        path: ':id',
        component: UserProfilComponent
      },
   ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
