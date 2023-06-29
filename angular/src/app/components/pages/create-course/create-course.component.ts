import { MyDataService } from 'src/app/services/my-data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder  ,private apiService:MyDataService ) {
    this.form = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      cover: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

    ngOnInit(): void {

    }
    getCoverName(coverPath: string): string {
      const parts = coverPath.split('\\');
      return parts[parts.length - 1];
    }

    print(){
      this.form.value.cover= this.getCoverName(this.form.value.cover);
      console.log(this.form.value)
      
      this.apiService.CreateCourse(this.form.value).subscribe(
      (response:any) => {
        console.log('Response status:', response[1]);
      },
      (error) => {
         console.error('Error:', error);
           alert(error);
        }
      );
    }

}
