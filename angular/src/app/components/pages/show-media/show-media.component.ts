import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyDataService } from 'src/app/services/my-data.service';

@Component({
  selector: 'app-show-media',
  templateUrl: './show-media.component.html',
  styleUrls: ['./show-media.component.scss']
})
export class ShowMediaComponent implements OnInit {
  @Input() content:any={
    title:'Ahmed CV',
    id:'ahmed.pdf'
  };
   constructor(private route: ActivatedRoute , private getDist : MyDataService){
    // console.log("there is Matrial", sessionStorage.getItem('matrial'));
    this.content = sessionStorage.getItem('matrial');
    this.content = JSON.parse(this.content);
   }
  ngOnInit(): void {

  }
}
