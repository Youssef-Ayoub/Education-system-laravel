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
  },
  { path: 'userCourses', component: UserCoursesComponent },
  { path: 'courseDetails', component: CourseDetailsComponent },
  { path: 'newCourse', component: CreateCourseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
