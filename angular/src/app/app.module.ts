import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { TrendingNowComponent } from './components/trending-now/trending-now.component';
import { AllCoursesComponent } from './components/pages/all-courses/all-courses.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { UserCoursesComponent } from './components/pages/user-courses/user-courses.component';
import { CourseDetailsComponent } from './components/pages/course-details/course-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoggedInUserDataService } from './services/logged-in-user-data.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CourseCardComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    TrendingNowComponent,
    AllCoursesComponent,
    SearchComponent,
    UserProfileComponent,
    UserCoursesComponent,
    CourseDetailsComponent,
      ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
   ],
  providers: [LoggedInUserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
