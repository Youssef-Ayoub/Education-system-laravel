import { Component, OnInit, Type, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { MyDataService } from '../../../services/my-data.service';
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
  userData;
  courseId:any=4;
  courseDetails: any;
  courseReviews: any;
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

  constructor(private formBuilder: FormBuilder ,private MyDataService: MyDataService, private componentFactoryResolver: ComponentFactoryResolver, private route:ActivatedRoute , private router:Router) {
    if(!sessionStorage.getItem('loggedIn')){
      alert("please Login to see Coures Details")
       this.router.navigate(['login']);
    }
    this.userData=sessionStorage.getItem('userData');
    this.userData= JSON.parse(this.userData);
    console.log(this.userData.id);
   }
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  createComponent(newid: string) {
    this.container.clear();
    const cType=this.getComponentType(newid);
    const component = this.container.createComponent(cType);
    component.instance.id = newid;
    // console.log(newid);
   }
   getComponentType(name:string): Type<any>{
    let type : Type<any> = VideoComponent;
    if(name.slice(-4) === ".pdf")
    {
      type = PdfComponent;
      return type;
    }
    return type
   }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
      rating: [1, Validators.required],
      user_id: this.userData.id,
      course_id:this.courseId
    });

    this.createComponent('gnTFkl2AF-w');
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id');
      this.commentForm.value.course_id = this.courseId;
      this.fetchCourseDetails();
    });

    this.fetchCourseDetails();

    console.log("course id is " , this.courseId);

    this.MyDataService.AllComments(this.courseId).subscribe((data) => {
      console.log(this.courseId)
      this.courseReviews = data;
      console.log('course reviews : ' ,this.courseReviews );
    });
  }


  fetchCourseDetails(): void {
    this.MyDataService.getCourse(this.courseId).subscribe((data) => {
      this.courseDetails = data;
      console.log(this.courseDetails)
    });
  }
  // ngOnDestroy(): void {
  //    if (this.componentRef) {
  //     this.componentRef.destroy();
  //   }
  // }

  get contentByWeek() {
    const contentByWeek: {
      week: any;
      items: any[] } [] = [];

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

  // submitComment(){
  //      console.log(this.commentForm.value)
  //     this.MyDataService.comment(this.form.value).subscribe(
  //     (response:any) => {
  //       alert("course Created Successfully! ")
  //       this.router.navigate(['userProfile']);


  //      },
  //     (error) => {
  //        console.error('Error:', error);
  //          alert(error.messeage);
  //       }
  //     );
  //  }
}
