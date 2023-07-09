import { Component, OnInit } from '@angular/core';
import { MyDataService } from '../../../services/my-data.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  public isCollapsed: boolean[];
  userData;
  courseId: any = 4;
  isOwner: boolean = false;
  courseDetails: any = [
    {
      category_id: 0,
      category_name: '',
      cover: '',
      description: '',
      id: 0,
      instructor_name: '',
      name: '',
      negative_count: 0,
      neutral_count: 0,
      positive_count: 0,
      user_count: 0,
    },
  ];
  courseRate;
  courseReviews: any;
  selected = 0;
  hovered = 0;
  readonly = false;
  commentForm: FormGroup;
  content: any = [];
  currentSection: string = 'not';

  constructor(
    private formBuilder: FormBuilder,
    private MyDataService: MyDataService,
    private sendDist: MyDataService,
    private getMatrial: MyDataService,
    private summary: MyDataService,
    private pdfsummary: MyDataService,
    private router: Router,
    config: NgbRatingConfig
  ) {
    if (!sessionStorage.getItem('loggedIn')) {
      alert('please Login to see Coures Details');
      this.router.navigate(['login']);
    }
    this.courseId = sessionStorage.getItem('ClickedCourseID');
    this.courseId = JSON.parse(this.courseId);
    // console.log('course ID :', this.courseId);
    this.fetchCourseDetails();
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    // console.log('User Id :', this.userData.id);
    config.max = 5;
    config.readonly = true;
  }
  ngOnInit(): void {
    const initialSize = 50;
    this.isCollapsed = new Array(initialSize).fill(true);
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
      rating: [1, Validators.required],
      user_id: this.userData.id,
      course_id: this.courseId,
    });
    this.MyDataService.AllComments(this.courseId).subscribe((data) => {
      console.log(this.courseId);
      this.courseReviews = data;
      // console.log('course reviews : ', this.courseReviews);
    });
    this.getMatrial.getMatrial(this.courseId).subscribe((matrial) => {
      console.log("we are getting matrial of Course :", this.courseId);
      this.content = matrial;
      console.log("Here it is : ", this.content)
    })
  }

  fetchCourseDetails(): void {
    this.MyDataService.getCourse(this.courseId).subscribe((data) => {
      this.courseDetails = data;

      this.courseRate = this.calcRate();
      // console.log('course info :', this.courseDetails);
      if (this.courseDetails[0].instructor_name == this.userData.name) {
        this.isOwner = true;
        console.log("Can Upload Matrial")
      }
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
  calcRate(): any {
    const rate = Math.ceil((5 * this.courseDetails[0].positive_count) / (this.courseDetails[0].positive_count + this.courseDetails[0].negative_count + this.courseDetails[0].neutral_count))
    console.log("Course Rate : ", rate)
    if (isNaN(rate))
      return 'Not Rated Yet'
    else
      return rate;
  }
  CalcPercentage(n: number): number {
    const percentage = Math.ceil(n * 100 / (this.courseDetails[0].positive_count + this.courseDetails[0].negative_count + this.courseDetails[0].neutral_count));
    if (isNaN(percentage))
      return 0
    else
      return percentage;
  }
  sendData(data: any, typeVid: boolean) {
    const content = {
      title: '',
      id: ''
    }
    if (typeVid) {
      content.title = data.video_title;
      content.id = data.video_link;
    }
    else {
      content.title = data.pdf.slice(0, data.pdf.lastIndexOf(".pdf"));
      content.id = data.pdf;
    }
    console.log('sending ', content)
    sessionStorage.setItem('matrial', JSON.stringify(content));
    this.sendDist.setSharedData(content);
  }

  Summary(data: any , type:boolean) {
        console.log('Content ID :' , data.id)
    const content = {
      typeSummary:true,
      title: '',
      id: '',
      matrialSummary:''
    }
    if (type) {
      content.title = data.video_title;
      content.id = data.id;
      this.summary.getVidSummary(content.id).subscribe((data) => {
        content.matrialSummary = data;
        console.log(' summary :', content.matrialSummary);
        console.log('sending ', content)
        sessionStorage.setItem('matrial', JSON.stringify(content));

        this.sendDist.setSharedData(content);
        console.log('Content ID :' , content.id)
      });
    }
    else {
      content.title = data.pdf.slice(0, data.pdf.lastIndexOf(".pdf"));
      content.id = data.id;
      this.summary.getpdfSummary(content.id).subscribe((data) => {
         content.matrialSummary = data;
        console.log(' summary :', content.matrialSummary);
        console.log('sending ', content)
        sessionStorage.setItem('matrial', JSON.stringify(content));
        this.reloadPage();
        this.sendDist.setSharedData(content);
        console.log('Content ID :' , content.id)
      });
    }


  }
  pdfSummary(id: number) {
    console.log(id)

  }
  newMatrialPage() {
    this.router.navigate(['/newMatrial', this.courseId, this.content.length + 1]);
  }
  reloadPage() {
    const delayTime = 2000; // Time in milliseconds before reloading the page
    setTimeout(() => {
      location.reload();
    }, delayTime);
  }
}
