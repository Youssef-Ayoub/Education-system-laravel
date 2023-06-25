import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { AllCoursesComponent } from './components/pages/all-courses/all-courses.component';

const routes: Routes = [
  {
    path :'login' , component : LoginComponent
  },
  {
    path:"signup" , component : RegisterComponent

  },
  {
    path: '',
    component :HomePageComponent,
  },
  {
    path:"userProfile" , component : UserProfileComponent
  },
  {
    path:"allCourses" , component : AllCoursesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
