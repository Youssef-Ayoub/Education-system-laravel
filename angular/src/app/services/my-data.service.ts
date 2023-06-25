import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {

  constructor(private http:HttpClient) {
   }
   ngOnInit() {

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
      console.log(headers);
    return this.http.get<any>('http://localhost/Education-system-laravel/laravel%20test/public/api/courses' , {headers} )
  }
  AllComments(){
    return this.http.get<any>('http://localhost/CoursePilot/Education-system-laravel/laravel%20finale/public/api/comments/course/3' )
  }
}