import { Component ,Input,OnInit , Output ,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trending-now',
  templateUrl: './trending-now.component.html',
  styleUrls: ['./trending-now.component.scss']
})
export class TrendingNowComponent implements OnInit {
@Input() catArray : string[] = ["Development" ,"Designing" , "Business" , "Social" ];
@Output() onTabChange =new EventEmitter<number>();
 activTab:any;
  constructor(){

  }
  ngOnInit(): void {
   }
  setActive(i:number){
    this.activTab =i;
    this.onTabChange.emit(this.activTab);
    // console.log(this.catArray[this.activTab]);
  }

}
