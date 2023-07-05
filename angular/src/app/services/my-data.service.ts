import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {
  private sharedData: any;

  constructor(private http:HttpClient) {
   }

   setSharedData(data: any) {
    this.sharedData = data;
  }
  getSharedData() {
    return this.sharedData;
  }
  
  Registeruser(userData:any){
    return this.http.post<any>('http://localhost/CoursePilot/Education-system-laravel/laravel%20finale/public/api/register', userData);
  }

  Login(loginData:any){
   return this.http.post<any>('http://localhost/CoursePilot/Education-system-laravel/laravel%20finale/public/api/login', loginData)
  }

  getAllCategories(){
    const headers = { 'Accept':'application/vnd.api+json' , 'Content-Type': 'application/vnd.api+json'
  }
     return this.http.get<any>('http://localhost/CoursePilot/Education-system-laravel/laravel%20finale/public/api/categories' ,{headers})
  }

  AllCourses(){
      const headers = { 'Accept':'application/vnd.api+json' , 'Content-Type': 'application/vnd.api+json' }
      // console.log(headers);
    return this.http.get<any>('http://localhost/CoursePilot/Education-system-laravel/laravel%20finale/public/api/courses' , {headers} )
  }
  getCourse(Id:number){
    return this.http.get<any>(`http://localhost/CoursePilot/Education-system-laravel/laravel%20finale/public/api/courses/${Id}`);
  }

  enrollInCourse(u_id:number , c_id:number){
    const param = {
      user_id: u_id,
      course_id: c_id
     };
    return this.http.post<any>( 'http://localhost/CoursePilot/Education-system-laravel/laravel%20finale/public/api/enroll' , param )
  }
  userCourses(id:number){
    const param = {
      user_id: id
     };
     return this.http.post<any>('http://localhost/CoursePilot/Education-system-laravel/laravel%20finale/public/api/courses/student' , param )

  }
  comment(commentData:any){
    return this.http.post<any>('http://localhost/CoursePilot/Education-system-laravel/laravel%20finale/public/api/comments', commentData)
   }

  AllStudentsInCourse(courseId:number)
  {
    const param = {
      course_id: courseId
     };
    // const headers = { 'Accept':'application/vnd.api+json' , 'Content-Type': 'application/vnd.api+json' }
    // // console.log(headers);
  return this.http.post<any>('http://localhost/CoursePilot/Education-system-laravel/laravel%20finale/public/api/students/course/number' , param )
  }

  AllComments(Id:number){
    return this.http.get<any>(`http://localhost/CoursePilot/Education-system-laravel/laravel%20finale/public/api/comments/course/${Id}`);
  }
  CreateCourse(courseData:any){
    return this.http.post<any>('http://localhost/CoursePilot/Education-system-laravel/laravel%20finale/public/api/courses', courseData);
  }
}
