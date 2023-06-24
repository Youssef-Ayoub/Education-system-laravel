import { Component ,Input,OnInit} from '@angular/core';
import { LoggedInUserDataService } from 'src/app/services/logged-in-user-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  page:boolean=true;
  userData:any;
  @Input() pageType:boolean=true;
  constructor(private loggedUser:LoggedInUserDataService , private router:Router){
    this.pageType=this.page;
    if(sessionStorage.getItem('loggedIn'))
    {
      const storedData = sessionStorage.getItem('userData');
      if (storedData){
        this.userData = JSON.parse(storedData);
      }
     }
    else{
      alert("You are not logged in. Please log in to continue.");
      this.router.navigate(['login']);
    }
  }
  logout(){
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('loggedIn');
    location.reload();
    console.log("Logged Out");
  }
  ngOnInit(): void {
  }

}
