import { Component, OnInit } from '@angular/core';
import { MyDataService } from '../../../services/my-data.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoggedInUserDataService} from '../../../services/logged-in-user-data.service'


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
 })
export class LoginComponent implements OnInit {
  formData:any = {};

  constructor(private myAPI:MyDataService , private userData:LoggedInUserDataService , private router: Router){

  }
  submitForm(formData: any) {
    const email = formData.Email;
    const password = formData.Password;
    const loginData = {
      email: email,
      password: password
    };

    // Send the POST request
    this.myAPI.Login(loginData).subscribe(
      (response) => {

        console.log('Response:', response.status);

       // Assuming the server returns a token upon successful login
        if(response.status=="successfully logged in ")
       {
          console.log('Response:', response[0]);
          if(response[0].type==0){
             const token = "8|25HoPY3ItEA611U3saxIzK1RwV4lo9zhyjeB9HF8";
             sessionStorage.setItem('token', token);
             console.log(token)

          }
          else{
             const token ="7|a2cj7O2web2L37do5nlKAS40wy72hPJk6kWxNtrW";
             sessionStorage.setItem('token', token);
             console.log(token)
          }
          this.userData.setUserData(response[0]);
          this.router.navigate(['']);

       }
     },
     (error) => {
      console.error('Error:', error);

     if (error.status === 422) {
        const errorMessage = error.error.message;
       console.log('Error Message:', errorMessage);
        alert(errorMessage);
     }
     location.reload();
     }
    );
  }


  ngOnInit(): void {

  }

}
