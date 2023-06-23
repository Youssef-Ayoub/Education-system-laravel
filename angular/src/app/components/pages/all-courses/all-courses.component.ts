import { Component ,Input,OnInit } from '@angular/core';
import { MyDataService } from '../../../services/my-data.service';

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
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})

export class AllCoursesComponent implements OnInit {
  @Input() viewtype:string="All Courses";
  @Input() Courses:any=[
    {id:4 ,title:'Selected topics', discription:'Selected topics course is here' , instructor:'dr.abdelwahab' , image:'./assets/images/Courses/c1.jpg', category:'Development' ,numOfStudents:10},
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
  myData:any;
  apiCategories: string[] =["Development" ,"Designing" , "Business" , "Social" , "Cokking" ];
  activatedTab:any;
  noActiveTab:boolean= true;
  counter:number =0;
  constructor(private MyDataService:MyDataService ){

  }
  ngOnInit(): void {
    this.MyDataService.getData().subscribe((data)=>{
      this.myData=data.data;
     })
   }
   searchV:string="";
   onSearchTextEnterd(value:string){
    this.searchV=value;
    console.log(this.searchV);
   }
   tabChange(i:number){
    this.noActiveTab=false;
    this.activatedTab=i;
  }

}
