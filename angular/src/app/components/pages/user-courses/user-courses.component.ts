import { Component ,OnInit } from '@angular/core';
@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit {
  constructor(){}
  type:string="Your Course";
  coursesAPI:any=[
    {id:4 ,title:'Selected topics', discription:'Selected topics course is here' , instructor:'dr.abdelwahab' , image:'./assets/images/Courses/c3.jpg', category:'Development',numOfStudents:30},
    {id:5 ,title:'Cloud Computing', discription:'Cloud Computing course is here' , instructor:'dr.fatama' , image:'./assets/images/Courses/c4.jpg', category:'Development',numOfStudents:50},
      {id:3 ,title:'Desing topics', discription:'Selected topics course is here' , instructor:'dr.abdelwahab' , image:'./assets/images/Courses/c7.jpg', category:'Designing',numOfStudents:70},
     {id:2,title:'Design Testing', discription:'Software Testing course is here' , instructor:'dr.manar' , image:'./assets/images/Courses/c1.jpg', category:'Designing',numOfStudents:90},
      {id:1 ,title:'Business Testing', discription:'Software Testing course is here' , instructor:'dr.manar' , image:'./assets/images/Courses/c4.jpg', category:'Business',numOfStudents:200},
  ];
  ngOnInit(): void {
  }

}
