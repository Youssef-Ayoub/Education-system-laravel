import { Component ,Input,OnInit } from '@angular/core';
import { MyDataService } from '../../../services/my-data.service';


@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})

export class AllCoursesComponent implements OnInit {
  categoriesArray:any=["Development" ,"Designing" , "Business" , "Social" , "Cokking" ];
  categories:any={};
  @Input() viewtype:string="All Courses";
  @Input() Courses:any={};
  enroll:boolean=true;
  activatedTab:any;
  noActiveTab:boolean= true;
  constructor(private myApi:MyDataService ){

  }

  ngOnInit(): void {
    if(this.viewtype!='All Courses'){
      this.enroll=false;
    }
    this.myApi.getAllCategories().subscribe((data)=>{
      this.myApi=data;
       this.  categoriesArray = data.map((item: { name: any; }) => item.name);
       this.categories=data;
      // console.log(this.categoriesArray);
    })
    if(this.viewtype=='All Courses')
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
