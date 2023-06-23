import { Component ,Input,OnInit} from '@angular/core';

interface user{
  id:number;
  name:string;
  email:string;
  type:boolean; //0 student 1 instructor
  numOfCourses:number;
  numOfReviews:number;

}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  page:boolean=true;
  @Input() pageType:boolean=true;
  apiData:user = {id:4 ,name:'Ahmed Tareq', email:'at@gmail.com' , type:false , numOfCourses:5, numOfReviews:3};
  constructor(){
    this.pageType=this.page;
  }
  ngOnInit(): void {
  }
}
