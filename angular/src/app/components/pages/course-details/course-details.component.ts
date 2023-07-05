import {Component,OnInit} from '@angular/core';
import { MyDataService } from '../../../services/my-data.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute,  Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  public isCollapsed = true;
  userData;
  courseId: any = 4;
  courseDetails2 = [
    {
      section: 'Course Overview',
      lectures: '5 lectures • 19min',
      items: [
        { title: 'Welcome to the Complete Python Bootcamp', duration: '00:44' },
        { title: 'The Complete Python Bootcamp', duration: '06:39' },
        // Add more items here
      ],
    },
  ];
  courseDetails: any = [
    {
      category_id: 0,
      category_name: '',
      cover: '',
      description: '',
      id: 0,
      instructor_name: '',
      name: '',
      negative_count:0,
      neutral_count: 0,
      positive_count: 0,
      user_count: 0,
    },
  ];
  courseRate ;
  courseReviews: any;
  selected = 0;
  hovered = 0;
  readonly = false;
  commentForm: FormGroup;
  panels = ['First', 'Second', 'Third'];
  content: any = [
    { week: 1, pdf: 'PathPDF', video: 'Chapter1Vid1' },
    { week: 2, pdf: 'Chapter2', video: 'Chapter2Vid1' },
    { week: 2, pdf: 'Chapter2', video: 'Chapter2Vid2' },
    { week: 3, pdf: 'Chapter3', video: 'Chapter3Vid' },
    { week: 4, pdf: 'Chaptet4', video: 'Chapter4Vid' },
    { week: 5, pdf: 'Chapter5', video: 'Chapter5Vid1' },
    { week: 5, pdf: 'Chapter5', video: 'Chapter5Vid2' },
  ];
  currentSection: string = 'not';

  constructor(
    private formBuilder: FormBuilder,
    private MyDataService: MyDataService,
    private sendDist: MyDataService,
     private router: Router,
    config: NgbRatingConfig
  ) {
    if (!sessionStorage.getItem('loggedIn')) {
      alert('please Login to see Coures Details');
      this.router.navigate(['login']);
    }
    this.courseId = sessionStorage.getItem('ClickedCourseID');
    this.courseId = JSON.parse(this.courseId);
    console.log('course ID :', this.courseId);
    this.fetchCourseDetails();
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    console.log('User Id :', this.userData.id);
    config.max = 5;
    config.readonly = true;
  }
  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
      rating: [1, Validators.required],
      user_id: this.userData.id,
      course_id: this.courseId,
    });
    this.MyDataService.AllComments(this.courseId).subscribe((data) => {
      console.log(this.courseId);
      this.courseReviews = data;
      console.log('course reviews : ', this.courseReviews);
    });
  }

  fetchCourseDetails(): void {
    this.MyDataService.getCourse(this.courseId).subscribe((data) => {
      this.courseDetails = data;
      this.courseRate = this.calcRate();
      console.log('course info :', this.courseDetails);
    });
  }
  accordionSamples = [
    {
      id: 1,

      title: 'Week1',
      content: {
        pdf: 'PathPDF', video: 'Chapter1Vid1'
      }
    },
    {
      id: 2,
      title: 'Week2',
      content: {
        pdf: 'Chapter2', video: 'Chapter2Vid1'
      }
    },
    {
      id: 3,
       title: 'Week3',
      content: {
        pdf: 'Chapter2', video: 'Chapter2Vid2'
      }
    },
    {
      id: 4,
      title: 'Week4',
      content: {
        pdf: 'Chapter3', video: 'Chapter3Vid'
      }
    },
    {
      id: 5,
      title: 'Week5',
      content: {
        pdf: 'Chaptet4', video: 'Chapter4Vid'
      }
    },
    {
      id: 6,
      title: 'Week6',
      content: {
        pdf:'mohen',
        video:'vid1',
      }
    },
    { id: 7,
      title: 'Week7',
      content: {
        pdf: 'Chapter5', video: 'Chapter5Vid1'
      }
    },
    {
      id: 8,
      title: 'Fancy',
      content: {
        pdf:'mohen',
        video:'vid1',
      }
    },
    {
      id: 9,
      title: 'Fancy',
      content: {
        pdf: 'PathPDF', video: 'Chapter1Vid1'
      }
    },
    {
      id: 10,
      title: 'Fancy',
      content: {
        pdf:'mohen',
        video:'vid1',
      }
    }
    ]
  get contentByWeek() {
    const contentByWeek: {
      week: any;
      items: any[];
    }[] = [];

    // Group content by week
    this.content.forEach((item: { week: any }) => {
      const weekIndex = contentByWeek.findIndex(
        (week) => week.week === item.week
      );
      if (weekIndex === -1) {
        contentByWeek.push({ week: item.week, items: [item] });
      } else {
        contentByWeek[weekIndex].items.push(item);
      }
    });
    return contentByWeek;
  }

  submitComment() {
    this.commentForm.value.rating = this.selected;
    console.log(this.commentForm.value);
    this.MyDataService.comment(this.commentForm.value).subscribe(
      (response: any) => {
        alert('Comment Created Successfully! ');
      },
      (error) => {
        console.error('Error:', error);
        alert(error.messeage);
      }
    );
  }
  toggleSection(section: string): void {
    this.currentSection = section;
  }
  calcRate():number{
    const rate =Math.ceil((5*this.courseDetails[0].positive_count)/(this.courseDetails[0].positive_count + this.courseDetails[0].negative_count + this.courseDetails[0].neutral_count))
    console.log("Course Rate : ", rate)
    return rate
  }
  CalcPercentage(n:number) : number{
    return Math.ceil(n*100/(this.courseDetails[0].positive_count + this.courseDetails[0].negative_count + this.courseDetails[0].neutral_count))
  }
  sendData() {
    const content = {
      title: 'Angular Week1',
      id:'BlFM6ENAAdk'
    }
     console.log('sending ', content)
     sessionStorage.setItem('matrial' ,  JSON.stringify(content));
    this.sendDist.setSharedData(content);
  }
}
