import { MyDataService } from '../../../services/my-data.service';
import { LoggedInUserDataService } from '../../../services/logged-in-user-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, count, map } from 'rxjs';
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
   categoriesNames:any=["Development" ,"Designing" , "Business" , "Social" , "Cokking" ];
   categoriesData:any;
   activatedTab:any;
   noActiveTab:boolean= true;
   apiAllCourses : any;
   apiAllStudentsInCourse:any;
  //  coursesR1:Array<course>;
  constructor( private myApi:MyDataService , private route: ActivatedRoute , private loggedUser:LoggedInUserDataService){
    // this.coursesR1 =[
    //   {id:4 ,title:'Selected topics', discription:'Selected topics course is here' , instructor:'dr.abdelwahab' , image:'./assets/images/Courses/c1.jpg', category:'computer science' ,numOfStudents:1000},
    //   {id:5 ,title:'Cloud Computing', discription:'Cloud Computing course is here' , instructor:'dr.fatama' , image:'./assets/images/Courses/c2.jpg', category:'Development' ,numOfStudents:99},
    //   {id:4 ,title:'Selected topics', discription:'Selected topics course is here' , instructor:'dr.abdelwahab' , image:'./assets/images/Courses/c3.jpg', category:'Development',numOfStudents:30},
    //    ];
    // this.coursesR1.sort((a, b) => {
    //   return b.numOfStudents - a.numOfStudents;
    // });
  }
  ngOnInit(): void {
    // console.log(this.user);
    this.myApi.getAllCategories().subscribe((data)=>{
      this.myApi=data;
      this.categoriesData=data;
      this.categoriesNames = data.map((item: { name: any; }) => item.name);
      // console.log(this.categoriesArray);
    })


    this.myApi.AllCourses().subscribe((courses)=>{
       this.apiAllCourses = courses;
       this.apiAllCourses.sort((a:any, b:any) => {
        return b.category_id - a.category_id;
      });
      //  console.log(this.apiAllCourses);
    })
    
   }

  getCategoryNameById(id: number): string {
    const category = this.categoriesData.find((item:any) => item.id === id);
    return category ? category.name : '';
  }
  getNumOfStudentsInCourse(courseId: number): number {
   return 0
  }
   tabChange(i:number){
    this.noActiveTab=false;
    this.activatedTab=i;
  }


}
