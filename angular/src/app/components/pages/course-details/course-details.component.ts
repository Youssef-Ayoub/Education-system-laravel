import {
  Component,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  OnDestroy,
} from '@angular/core';
import { MyDataService } from '../../../services/my-data.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import { VideoComponent } from '../../video/video.component';
import { PdfComponent } from '../../pdf/pdf.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
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

  courseReviews: any;
  selected = 0;
  hovered = 0;
  readonly = false;
  commentForm: FormGroup;
  vidID = 'MbTM6xnl5Qc';
  private componentRef?: ComponentRef<any>;
  changeID(newID: string) {
    this.vidID = newID;
  }
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
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
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

    // this.createComponent('gnTFkl2AF-w');
    // this.route.paramMap.subscribe((params) => {
    //   this.courseId = params.get('id');
    //   this.commentForm.value.course_id = this.courseId;
    //   this.fetchCourseDetails();
    // });

    console.log('course id is ', this.courseId);

    this.MyDataService.AllComments(this.courseId).subscribe((data) => {
      console.log(this.courseId);
      this.courseReviews = data;
      console.log('course reviews : ', this.courseReviews);
    });
  }

  fetchCourseDetails(): void {
    this.MyDataService.getCourse(this.courseId).subscribe((data) => {
      this.courseDetails = data;
      console.log('course info :', this.courseDetails);
    });
  }

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
    return  Math.ceil((5*this.courseDetails[0].positive_count)/(this.courseDetails[0].positive_count + this.courseDetails[0].negative_count + this.courseDetails[0].neutral_count))
  }
  CalcPercentage(n:number) : number{
    return Math.ceil(n*100/(this.courseDetails[0].positive_count + this.courseDetails[0].negative_count + this.courseDetails[0].neutral_count))
  }

}
