import { Component ,OnInit } from '@angular/core';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  courseDeatils:any={id:4 ,title:'Selected topics', discription:'Selected topics course is here' , instructor:'dr.abdelwahab' , image:'./assets/images/Courses/c1.jpg', category:'Development' ,numOfStudents:10}
//api/6/conent
  content:any=[
    {week:1 , pdf:"PathPDF" , video:"Chapter1Vid1"} ,
    {week:1 , pdf:"Chapter1lec2" , video:"Chapter1Vid2"} ,
    {week:2 , pdf:"Chapter2" , video:"Chapter2Vid1"} ,
    {week:2 , pdf:"Chapter2" , video:"Chapter2Vid2"} ,
    {week:3 , pdf:"Chapter3" , video:"Chapter3Vid"} ,
    {week:4 , pdf:"Chaptet4" , video:"Chapter4Vid"} ,
    {week:5 , pdf:"Chapter5" , video:"Chapter5Vid1"} ,
    {week:5 , pdf:"Chapter5" , video:"Chapter5Vid2"} ,
  ]

  courseReviews=[
    {userName:"Ahmed" , Comment:"GOOOD"},
    {userName:"mariam" , Comment:"Very GOOOD"},
    {userName:"badr" , Comment:"nice"},
    {userName:"ali" , Comment:"mshNice"},
    {userName:"mostafa" , Comment:"GOOokkkOD"},
    {userName:"Abdo" , Comment:"momtazzz"}
  ]

  constructor(){

  }
  ngOnInit(): void {

  }

  get contentByWeek() {

    const contentByWeek: {
      week: any; items: any[];
}[] = [];

    // Group content by week
    this.content.forEach((item: { week: any; }) => {
      const weekIndex = contentByWeek.findIndex((week) => week.week === item.week);
      if (weekIndex === -1) {
        contentByWeek.push({ week: item.week, items: [item] });
      } else {
        contentByWeek[weekIndex].items.push(item);
      }
    });

    return contentByWeek;
  }
}
