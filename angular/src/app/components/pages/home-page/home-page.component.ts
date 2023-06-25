import { MyDataService } from '../../../services/my-data.service';
import { LoggedInUserDataService } from '../../../services/logged-in-user-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { count } from 'rxjs';
interface course
{
  id:number;
  numOfStudents:number;
  title:string;
  discription:string;
  instructor:string;
  image:string;
  category:string;

}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
   user:any=sessionStorage.getItem('userData');
   categoriesArray:any;
   //  apiCategories: string[] =["Development" ,"Designing" , "Business" , "Social" , "Cokking" ];
   activatedTab:any;
   noActiveTab:boolean= true;
   apiAllCourses : any;
   coursesR1:Array<course>;
  constructor( private myApi:MyDataService , private route: ActivatedRoute , private loggedUser:LoggedInUserDataService){
    this.coursesR1 =[
      {id:4 ,title:'Selected topics', discription:'Selected topics course is here' , instructor:'dr.abdelwahab' , image:'./assets/images/Courses/c1.jpg', category:'computer science' ,numOfStudents:1000},
      {id:5 ,title:'Cloud Computing', discription:'Cloud Computing course is here' , instructor:'dr.fatama' , image:'./assets/images/Courses/c2.jpg', category:'Development' ,numOfStudents:99},
      {id:4 ,title:'Selected topics', discription:'Selected topics course is here' , instructor:'dr.abdelwahab' , image:'./assets/images/Courses/c3.jpg', category:'Development',numOfStudents:30},
      {id:5 ,title:'Cloud Computing', discription:'Cloud Computing course is here' , instructor:'dr.fatama' , image:'./assets/images/Courses/c4.jpg', category:'Development',numOfStudents:50},
      {id:6 ,title:'Software Testing', discription:'Software Testing course is here' , instructor:'dr.manar' , image:'./assets/images/Courses/c5.jpg', category:'Development',numOfStudents:40},
      {id:6 ,title:'Software Testing', discription:'Software Testing course is here' , instructor:'dr.manar' , image:'./assets/images/Courses/c6.jpg', category:'Development',numOfStudents:60},
      {id:4 ,title:'Desing topics', discription:'Selected topics course is here' , instructor:'dr.abdelwahab' , image:'./assets/images/Courses/c7.jpg', category:'Designing',numOfStudents:70},
      {id:5 ,title:'Design Computing', discription:'Cloud Computing course is here' , instructor:'dr.fatama' , image:'./assets/images/Courses/c8.jpg', category:'Designing',numOfStudents:80},
      {id:6 ,title:'Design Testing', discription:'Software Testing course is here' , instructor:'dr.manar' , image:'./assets/images/Courses/c1.jpg', category:'Designing',numOfStudents:90},
      {id:4 ,title:'Business topics', discription:'Selected topics course is here' , instructor:'dr.abdelwahab' , image:'./assets/images/Courses/c2.jpg', category:'Business',numOfStudents:100},
      {id:5 ,title:'Business Computing', discription:'Cloud Computing course is here' , instructor:'dr.fatama' , image:'./assets/images/Courses/c3.jpg', category:'Social',numOfStudents:70},
      {id:6 ,title:'Business Testing', discription:'Software Testing course is here' , instructor:'dr.manar' , image:'./assets/images/Courses/c4.jpg', category:'Business',numOfStudents:200},
    ];
    this.coursesR1.sort((a, b) => {
      return b.numOfStudents - a.numOfStudents;
    });
  }
  ngOnInit(): void {
    // console.log(this.user);
    this.myApi.getAllCategories().subscribe((data)=>{
      this.myApi=data;
       this.  categoriesArray = data.map((item: { name: any; }) => item.name);
      // console.log(this.categoriesArray);
    })
    this.myApi.AllCourses().subscribe((courses)=>{
       this.apiAllCourses = courses;
       console.log(this.apiAllCourses);
    }
    )
   }
   tabChange(i:number){
    this.noActiveTab=false;
    this.activatedTab=i;
  }


}
