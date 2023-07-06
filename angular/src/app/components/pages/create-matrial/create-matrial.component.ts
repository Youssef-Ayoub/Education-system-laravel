import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyDataService } from 'src/app/services/my-data.service';

@Component({
  selector: 'app-create-matrial',
  templateUrl: './create-matrial.component.html',
  styleUrls: ['./create-matrial.component.scss']
})
export class CreateMatrialComponent {
  form: FormGroup;
  week:any;
  course_id:any
  constructor(private formBuilder: FormBuilder  ,private apiService:MyDataService,  private router:Router ,private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      course_id: ['' ],
      week: [''],
      video_title: ['', Validators.required],
      video_link: ['', Validators.required],
      pdf :['', Validators.required],
     });
  }


    ngOnInit(): void {
      this.course_id= this.route.snapshot.paramMap.get('id');
      this.week = this.route.snapshot.paramMap.get('week');
      console.log('id is: ' ,this.course_id)
      console.log('week is: ' ,this.week)
    }

    Create() {
      if (this.form.invalid) {
        console.log("invalid")
        return;
      }
      this.form.value.course_id =this.course_id;
      this.form.value.week =this.week;
      console.log("Form Data : " , this.form.value)

       const vidID = this.extractSubstringAfterLastEqual(this.form.value.video_link);
       this.form.value.video_link =vidID;

       const fileName = this.extractFileName(this.form.value.pdf);
       this.form.value.pdf = fileName;
      console.log('Video ID:' , this.form.value.video_link)
      console.log('PDF name:' , this.form.value.pdf)
      this.apiService.createMaterial(this.form.value).subscribe(
        (response: any) => {
          alert('Material created successfully!');
          this.router.navigate(['/course-details']);
        },
        (error) => {
          console.error('Error creating material:', error);
          alert('Failed to create material.');
        }
      );
    }

    extractSubstringAfterLastEqual(url: string): string | null {
      const lastIndex = url.lastIndexOf('=');
      return lastIndex !== -1 ? url.substring(lastIndex + 1) : null;
    }
    extractFileName(filePath: string): string {
      const startIndex = filePath.lastIndexOf('\\') + 1;
      return filePath.slice(startIndex);
    }
}

