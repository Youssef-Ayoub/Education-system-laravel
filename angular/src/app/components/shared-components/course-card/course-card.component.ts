import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { MyDataService } from 'src/app/services/my-data.service';


@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  src:string="../../../assets/images/Courses/";
  // @Input() course: boolean = true
  @Input() title: string = 'Computer Network'
  @Input() id:any;
  @Input() numOfStudents: number = 1
  @Input() numOfReviews: number = 4
  @Input() description: string = 'computer network course'
  @Input() category: string = "Development";
  @Input() instructor: string = "Ahmed Badr";
  @Input() image: string = "./assets/images/first pic.jpg";
  @Input() Rate:any=4;
  @Input() showEnroll:boolean=true;
  userData:any={};

  // articalContent:articleCard={
  //   id:1,
  //     title:"Teams or individuals , all thrive here",
  //     image:'./assets/images/first pic.jpg',
  //     cardAuthor:"ahmed Ali",
  //     cardDate:"18 - 3 - 2022",
  //     description: "David Droga Still Has Faith in Online Advertising"
  //  }
  constructor(private myApi:MyDataService , private router:Router) { }

  ngOnInit(): void {
    // this.ArticleService.getArticles().subscribe(res=>{
    //   console.log(res);
    // })
  }
  enroll(){
    if(sessionStorage.getItem('loggedIn'))
    {
      const storedData = sessionStorage.getItem('userData');
      if (storedData){
        this.userData = JSON.parse(storedData);
      }
     }

    this.myApi.enrollInCourse(this.userData.id , this.id ).subscribe(
      (response) => {
        console.log(this.userData.id , this.id);
        // console.log(response);
        if(response.message!=='Already Enrolled.')
        {
          alert('User Enrolled Successfulay');
          location.reload();
        }
        else
          alert('You are Already Enrolled')
      },
      (error) => {
       alert("You are not logged in. Please log in to Enroll In Course.");

      this.router.navigate(['login']);
    }
        // Handle error or display error message
     );


  }
  changeClicked(){
     sessionStorage.setItem('ClickedCourseID', this.id);
     console.log('Changed')
  }

}
