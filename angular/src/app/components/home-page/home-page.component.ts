import { Component } from '@angular/core';
import { count } from 'rxjs';
interface course
{
  id:number;
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
export class HomePageComponent {
counter:number =0;
coursesR1:Array<course>;
coursesR2:Array<course>;
constructor(){
  this.coursesR1 =[
    {id:1 ,title:'Computer Network', discription:'Computer Network course is here' , instructor:'dr.Waleed' , image:'./assets/images/Courses/computerNetwork.png', category:'Computer Science'},
    {id:2 ,title:'Artificial intelligence', discription:'Artificial intelligence course is here' , instructor:'dr.abeer' , image:'./assets/images/Courses/neural language.png', category:'Computer Science'},
    {id:3 ,title:'Selected topics', discription:'Selected topics course is here' , instructor:'dr.abdelwahab' , image:'./assets/images/Courses/desktop programming.png', category:'Computer Science'},

  ];
  this.coursesR2 =[
    {id:4 ,title:'Selected topics', discription:'Selected topics course is here' , instructor:'dr.abdelwahab' , image:'./assets/images/Courses/desktop programming.png', category:'Computer Science'},
    {id:5 ,title:'Cloud Computing', discription:'Cloud Computing course is here' , instructor:'dr.fatama' , image:'./assets/images/Courses/computerNetwork.png', category:'Computer Science'},
    {id:6 ,title:'Software Testing', discription:'Software Testing course is here' , instructor:'dr.manar' , image:'./assets/images/Courses/desktop programming.png', category:'Computer Science'}
  ];
 }
 incCounter(){
  this.counter+=1;
 }
}
