import { MyDataService } from 'src/app/services/my-data.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  form: FormGroup;
  categories:any;
  instructor:any
  constructor(private formBuilder: FormBuilder  ,private apiService:MyDataService , private apiCategories:MyDataService , private router:Router) {
    this.instructor =sessionStorage.getItem('userData');
    this.instructor =JSON.parse(this.instructor);
    if(this.instructor.type!=1){
      console.log(this.instructor.id)
      this.router.navigate(['error']);
    }
    console.log(this.instructor.name)
    this.form = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      cover: ['', Validators.required],
      description: ['', Validators.required],
      instructor_name :[this.instructor.name],
      id :[this.instructor.id]
    });
  }

    ngOnInit(): void {
      this.apiCategories.getAllCategories().subscribe((data)=>{
        this.apiCategories=data;
          this.categories=data;
        console.log(this.categories);
      })
    }
    getCoverName(coverPath: string): string {
      const parts = coverPath.split('\\');
      return parts[parts.length - 1];
    }

    Create(){
      this.form.value.cover= this.getCoverName(this.form.value.cover);
      this.form.value.instructor_name=this.instructor.name;
      console.log(this.form.value)
      this.apiService.CreateCourse(this.form.value).subscribe(
      (response:any) => {
        alert("course Created Successfully! ")
        this.router.navigate(['userProfile']);


       },
      (error) => {
         console.error('Error:', error);
           alert(error.messeage);
        }
      );
    }
}
