import { Component ,Input,OnInit} from '@angular/core';
import { LoggedInUserDataService } from 'src/app/services/logged-in-user-data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MyDataService } from 'src/app/services/my-data.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  page:boolean=true;
  userData:any;
  userComments:any;
  numOfCourses:number=0;
  isInputDisabled: boolean = true; // Set it to `true` initially

  @Input() pageType:boolean=true;
  constructor( private myApi:MyDataService, private loggedUser:LoggedInUserDataService , private router:Router){
    this.pageType=this.page;
    if(sessionStorage.getItem('loggedIn'))
    {
      const storedData = sessionStorage.getItem('userData');
      if (storedData){
        this.userData = JSON.parse(storedData);
      }
     }
    else{
      alert("You are not logged in. Please log in to continue.");
      this.router.navigate(['login']);
    }
  }
  editProfile(): void {
    this.isInputDisabled=false;
   }
  Update(): void {
    this.loggedUser.updateUser(this.userData.id, this.userData).subscribe(
      (response) => {
        alert('User data updated');
        this.loggedUser.updateUserData(this.userData);
        this.isInputDisabled=true;
      },
      (error) => {
        alert('Error');
        // Handle error or display error message
      }
    );
  }
  //  getUserComments(){
  //   return this.userComments.length;
  // }
  logout(){
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('loggedIn');
    location.reload();
    console.log("Logged Out");
  }
  ngOnInit(): void {
    this.loggedUser.userComments(this.userData.id).subscribe(
      (response) => {
        // console.log(response.length);
        this.loggedUser = response;
        this.userComments=response;
        },
      (error) => {
        alert('Error');
        // Handle error or display error message
      }
    );
    this.getUserCourses();
  }
  getUserCourses(): void {
    this.myApi.userCourses(this.userData.id).subscribe(
      (response) => {
        this.numOfCourses = response.length;
        console.log(response)
        },
      (error) => {
        console.error('errror is ' , error)
        console.log('param is ' , this.userData.id);
      }
    );
}
}
