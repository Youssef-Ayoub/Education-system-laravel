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
  vid:boolean =true;
   constructor(private route: ActivatedRoute , private getDist : MyDataService){

   }
  ngOnInit(): void {

    if(this.getDist.getSharedData())
    {
       this.content = this.getDist.getSharedData();
       console.log("", this.content);
       sessionStorage.setItem('matrial' ,  JSON.stringify(this.content));
    }
    console.log("there is Matrial", sessionStorage.getItem('matrial'));
    this.content = sessionStorage.getItem('matrial');
    this.content = JSON.parse(this.content);
    
    if(this.content.id.slice(-4) === ".pdf"){
      this.vid=false;
     }

  }
}
