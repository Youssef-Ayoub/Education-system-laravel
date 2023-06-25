import { Component, OnInit } from '@angular/core';
import { LoggedInUserDataService } from 'src/app/services/logged-in-user-data.service';
LoggedInUserDataService
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  loggedIn:boolean=false;
  constructor(private apiData:LoggedInUserDataService){}

  ngOnInit(): void {
   if( sessionStorage.getItem('loggedIn') == 'true'){
    this.loggedIn=true;
   }

  }

}
