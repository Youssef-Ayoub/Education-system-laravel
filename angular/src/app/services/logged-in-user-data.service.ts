import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserDataService {
  loggedIn: boolean = false;
  private userData: any;
  constructor(private http: HttpClient) {
    this.userData = this.getUserData();

  }
  ngOnInit() {

  }
  setUserData(data: any) {
    this.userData = data;
    this.loggedIn = true;
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('userData', JSON.stringify(data));
  }

  getUserData(): any {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  clearUserData() {
    this.userData = null;
    this.loggedIn = false;
    sessionStorage.removeItem('userData');
  }
  updateUserData(newUserData: any) {
    this.userData = newUserData;
    this.setUserData(newUserData);
  }
  updateUser(userId: number, userData: any) {
    const url = `http://localhost/gp/project/Education-system-laravel/laravel%20finale/public/api/users/${userId}`;
    return this.http.put<any>(url, userData);
  }
  userComments(userId: number): Observable<any> {
    const url = `http://localhost/gp/project/Education-system-laravel/laravel%20finale/public/api/comments/user/${userId}`;
    return this.http.get<any>(url);
  }
}
