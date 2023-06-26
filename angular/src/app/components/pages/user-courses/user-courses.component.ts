import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyDataService } from 'src/app/services/my-data.service';
@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit {
  userId:any;
  type:string="Your Courses";
  coursesAPI:any;
  constructor(private myApi : MyDataService , private router: Router ){
    if(sessionStorage.getItem('loggedIn'))
    {
      const storedData = sessionStorage.getItem('userData');
      if (storedData){
        const userData = JSON.parse(storedData);
        this.userId =userData.id;
      }
     }
    else{
      alert("You are not logged in. Please log in to Acess this Page.");
      this.router.navigate(['login']);
    }
  }


  ngOnInit(): void {

  console.log('user id before GITTING',  this.userId);
  this.getUserCourses();
  }

  getUserCourses(): void {
    this.myApi.userCourses(this.userId).subscribe(
      (response) => {
        this.coursesAPI = response;
        console.log(this.coursesAPI);
       },
      (error) => {
        console.error('errror is ' , error)
        console.log('param is ' , this.userId);
      }
    );

  }


}
