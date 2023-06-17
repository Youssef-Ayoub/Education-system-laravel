import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() course: boolean = true
  @Input() title: string = 'Computer Network'
  @Input() id: number = 1
  @Input() description: string = 'computer network course'
  @Input() category: string = "Comuter Science";
  @Input() instructor: string = "Ahmed Badr";
  @Input() image: string = "./assets/images/first pic.jpg";

  // articalContent:articleCard={
  //   id:1,
  //     title:"Teams or individuals , all thrive here",
  //     image:'./assets/images/first pic.jpg',
  //     cardAuthor:"ahmed Ali",
  //     cardDate:"18 - 3 - 2022",
  //     description: "David Droga Still Has Faith in Online Advertising"
  //  }
  // constructor(private ArticleService:ArticleService) { }

  ngOnInit(): void {
    // this.ArticleService.getArticles().subscribe(res=>{
    //   console.log(res);
    // })
  }

}
