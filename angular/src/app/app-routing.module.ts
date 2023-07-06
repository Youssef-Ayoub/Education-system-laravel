import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { AllCoursesComponent } from './components/pages/all-courses/all-courses.component';
import { UserCoursesComponent } from './components/pages/user-courses/user-courses.component';
import { CourseDetailsComponent } from './components/pages/course-details/course-details.component';
import { CreateCourseComponent } from './components/pages/create-course/create-course.component';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
import { ShowMediaComponent } from './components/pages/show-media/show-media.component';
import { CreateMatrialComponent } from './components/pages/create-matrial/create-matrial.component';

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
    path:"courses" , component : AllCoursesComponent
  },
  { path: 'userCourses', component: UserCoursesComponent },
  {path:'course-details' , component: CourseDetailsComponent},
  {path:'course-media' , component: ShowMediaComponent},
  { path: 'newCourse', component: CreateCourseComponent },
  { path: 'newMatrial/:id/:week', component: CreateMatrialComponent },
  { path: 'error', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
