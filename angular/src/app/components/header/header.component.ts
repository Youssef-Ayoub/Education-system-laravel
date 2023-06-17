import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ngOnInit() {
    const mobileIcon = document.querySelector('.mobile_icon') as HTMLElement;
    const burgerBarsIcon = document.querySelector('#burger_bars_icon') as HTMLElement;
    const navLinks = document.querySelector('.nav_links') as HTMLElement;
    const nav = document.querySelector('.mynav') as HTMLElement;

    let changer = 0;

    burgerBarsIcon.addEventListener('click', () => {
      if (changer === 0) {
        navLinks.style.cssText = "height:256px;";
        burgerBarsIcon.style.cssText = 'color:white;';
        nav.style.cssText='height:400px;';

        changer = 1;
      } else {
        navLinks.style.cssText = "height:0";
        burgerBarsIcon.style.cssText = 'color:black';
        changer = 0;
      }
    });

    const exitIcon = document.getElementById('exit_icon') as HTMLElement;
    const profileIcon = document.querySelector('.personal_profile') as HTMLElement;
    const profileDetails = document.querySelector('.profile_details') as HTMLElement;

    profileIcon.addEventListener('click', () => {
      profileDetails.style.cssText = 'right:0';
    });

    exitIcon.addEventListener('click', () => {
      profileDetails.style.cssText = 'right:-300px';
    });
  }
}
