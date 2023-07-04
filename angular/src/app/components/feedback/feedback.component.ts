import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @Input() feedback =
    {
      "id": 1,
      "user_id": 3,
      "user_name": "ahmed",
      "comment": "This is an amazing course, totally recommend it",
      "rating": 5,
      "course_id": 3
  }
  constructor(){

  }
  ngOnInit(): void {

  }

}
