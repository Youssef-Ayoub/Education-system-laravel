import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyDataService } from '../../../services/my-data.service';
import {LoggedInUserDataService} from '../../../services/logged-in-user-data.service'





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
 })

export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  passwordVisible: boolean = false;
  passwordVisible2: boolean = false;


  constructor(private formBuilder: FormBuilder , private MyDataService:MyDataService , private router: Router , private userData:LoggedInUserDataService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required , ],
      type: ['', Validators.required],
      gender: ['', Validators.required]
    },
    {
      validator: passwordMatchValidator
    });
  }

  submitForm(formData:any) {
    formData.name = this.getFullName();

    if (this.registerForm.invalid) {
       this.markFormGroupTouched(this.registerForm);
      return;
    }

    else{
      delete formData.firstName;
      delete formData.lastName;
      delete formData.confirmPassword;
      // console.log( "data before sending Request " , formData);
      //sending Registeration Request to the server.
      this.MyDataService.Registeruser(formData).subscribe(
        (response:any) => {
          console.log('Response status:', response[1]);
          this.userData.setUserData(response[0]);
          console.log('Response:', response[0]);
          if(response[0].type==0){
            console.log("Student Logged In")
            this.router.navigate(['']);
             const token = "8|25HoPY3ItEA611U3saxIzK1RwV4lo9zhyjeB9HF8";   //stdent
             sessionStorage.setItem('token', token);
             console.log(token)
          }
          else{
            console.log("Instructor Logged In")
            this.router.navigate(['userProfile']);
             const token ="7|a2cj7O2web2L37do5nlKAS40wy72hPJk6kWxNtrW";
             sessionStorage.setItem('token', token);
             console.log(token)
          }
          this.userData.setUserData(response[0]);
        },
        (error) => {
           console.error('Error:', error);

          if (error.status === 422) {
             const errorMessage = error.error.message;
            console.log('Error Message:', errorMessage);
             alert(errorMessage);
          }
        }
      );

    }
   }


  // Helper method to mark all form controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  togglePasswordVisibility2() {
    this.passwordVisible2 = !this.passwordVisible2;
  }
  getFullName(): string {
    const firstName = this.registerForm.get('firstName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;
    return `${firstName} ${lastName}`;
  }
}

function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { 'passwordMismatch': true };
  }

  return null;
}
