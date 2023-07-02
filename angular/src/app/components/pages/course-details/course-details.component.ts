import { Component, OnInit, Type, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { MyDataService } from '../../../services/my-data.service';
import { VideoComponent } from '../../video/video.component';
import { PdfComponent } from '../../pdf/pdf.component';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  courseId:any;
  vidID = 'MbTM6xnl5Qc';

  changeID(newID: string) {
    this.vidID = newID;
  }

  courseDetails: any = {
    id: 4,
    title: 'Selected topics',
    discription: 'Selected topics course is here',
    instructor: 'dr.abdelwahab',
    image: './assets/images/Courses/c1.jpg',
    category: 'Development',
    numOfStudents: 10,
  };

  content: any = [
    { week: 1, pdf: 'PathPDF', video: 'Chapter1Vid1' },
    { week: 2, pdf: 'Chapter2', video: 'Chapter2Vid1' },
    { week: 2, pdf: 'Chapter2', video: 'Chapter2Vid2' },
    { week: 3, pdf: 'Chapter3', video: 'Chapter3Vid' },
    { week: 4, pdf: 'Chaptet4', video: 'Chapter4Vid' },
    { week: 5, pdf: 'Chapter5', video: 'Chapter5Vid1' },
    { week: 5, pdf: 'Chapter5', video: 'Chapter5Vid2' },
  ];

  courseReviews: any;
  // courseReviews=[
  //   {userName:"Ahmed" , Comment:"GOOOD"},
  //   {userName:"mariam" , Comment:"Very GOOOD"},
  //   {userName:"badr" , Comment:"nice"},
  //   {userName:"ali" , Comment:"mshNice"},
  //   {userName:"mostafa" , Comment:"GOOokkkOD"},
  //   {userName:"Abdo" , Comment:"momtazzz"}
  // ]
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  createComponent(newid: string) {
    console.log('IN Func')
    this.container.clear();
    const cType=this.getComponentType(newid);
    const component = this.container.createComponent(cType);
    component.instance.id = newid;
    console.log(newid);
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
   private componentRef?: ComponentRef<any>; // Store the component reference
   constructor(
    private MyDataService: MyDataService,
    private componentFactoryResolver: ComponentFactoryResolver, private route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id');
      this.fetchCourseDetails();
    });
    console.log("course id is " , this.courseId);

    // this.MyDataService.AllComments(this.courseId).subscribe((data) => {
    //   this.courseReviews = data;
    //   console.log('course reviews : ' ,this.courseReviews );
    // });
  }
  fetchCourseDetails(): void {
    this.MyDataService.getCourse(this.courseId).subscribe((data) => {
      this.courseDetails = data;
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
}
