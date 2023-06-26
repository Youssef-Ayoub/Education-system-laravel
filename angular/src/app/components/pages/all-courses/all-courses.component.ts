import { Component ,Input,OnInit } from '@angular/core';
import { MyDataService } from '../../../services/my-data.service';

 
@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})

export class AllCoursesComponent implements OnInit {
  categoriesArray:any=["Development" ,"Designing" , "Business" , "Social" , "Cokking" ];
  categories:any;
  @Input() viewtype:string="All Courses";
  @Input() Courses:any=[
    {id:4 ,title:'Business topics', discription:'Selected topics course is here' , instructor:'dr.abdelwahab' , image:'./assets/images/Courses/c2.jpg', category:'Business',numOfStudents:100},
    {id:5 ,title:'Business Computing', discription:'Cloud Computing course is here' , instructor:'dr.fatama' , image:'./assets/images/Courses/c3.jpg', category:'Social',numOfStudents:70},
    {id:6 ,title:'Business Testing', discription:'Software Testing course is here' , instructor:'dr.manar' , image:'./assets/images/Courses/c4.jpg', category:'Business',numOfStudents:200},
  ];
  activatedTab:any;
  noActiveTab:boolean= true;
  constructor(private myApi:MyDataService ){
  }

  ngOnInit(): void {
    this.myApi.getAllCategories().subscribe((data)=>{
      this.myApi=data;
       this.  categoriesArray = data.map((item: { name: any; }) => item.name);
       this.categories=data;
      // console.log(this.categoriesArray);
    })
    this.myApi.AllCourses().subscribe((courses)=>{
      this.Courses = courses;
      console.log(courses);
     });
   }
   getCategoryNameById(id: number): string {
    const category = this.categories.find((item:any) => item.id === id);
    return category ? category.name : '';
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
