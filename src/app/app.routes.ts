import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
},
  { path: 'home', component: HomeComponent },
  { path: 'apartments/:id', component: ApartmentDetailComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'create-post', component: CreatePostComponent ,canActivate: [AuthGuard]},
];
