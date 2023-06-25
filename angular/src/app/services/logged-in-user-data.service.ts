import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserDataService {
  loggedIn: boolean = false;
  private userData: any;
  constructor() {
    this.userData = this.getUserData();
  }
  setUserData(data: any) {
    this.userData = data;
    this.loggedIn=true;
    sessionStorage.setItem('loggedIn' , 'true' );
    sessionStorage.setItem('userData', JSON.stringify(data));
  }

  getUserData(): any {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
   }

  clearUserData() {
    this.userData = null;
    this.loggedIn=false;
    sessionStorage.removeItem('userData');
  }
  updateUserData(newUserData: any) {
    this.userData = newUserData;
    this.setUserData(newUserData);
  }
}
