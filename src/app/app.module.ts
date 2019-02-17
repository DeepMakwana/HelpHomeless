import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './shared/landing/landing.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EditProfileComponent } from './shared/profile/edit-profile/edit-profile.component';
import { HomeComponent } from './shared/home/home.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';

import { HomeModule } from './shared/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { DashboardComponent } from './users/dashboard/dashboard.component';

import { FlashMessageModule } from 'angular-flash-message';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

import { AgmCoreModule } from '@agm/core' //for google maps
import { AgmDirectionModule } from 'agm-direction' // for directions
import { SponsorRegisterComponent } from './sponsors/sponsor-register/sponsor-register.component';
import { SponsorLoginComponent } from './sponsors/sponsor-login/sponsor-login.component';
import { AdminDashboardComponent } from './users/admin-dashboard/admin-dashboard.component'
import { SponsorDashboardComponent } from './sponsors/sponsor-dashboard/sponsor-dashboard.component';


const routes: Routes =[
    { path: 'home',             component: LandingComponent },
    { path: 'login',            component: LoginComponent },
    { path: 'register',         component: RegisterComponent },
    { path: 'sponsor-login',    component: SponsorLoginComponent },
    { path: 'sponsor-register', component: SponsorRegisterComponent },
    { path: 'dashboard',        component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'admin-dashboard',  component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: 'sponsor-dashboard',  component: SponsorDashboardComponent, canActivate: [AuthGuard] },
    { path: 'profile',          component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'edit-profile',     component: EditProfileComponent, canActivate: [AuthGuard] },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EditProfileComponent,
    SponsorRegisterComponent,
    SponsorLoginComponent,
    AdminDashboardComponent,
    SponsorDashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    ChartsModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    HomeModule,
    FlashMessageModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyA0Rwk_ewEA1790MD-MrPHkYGEKs1r5DtI'
    }),                 // for maps
    AgmDirectionModule //for Directions
  ],
  providers: [
      ValidateService,
      AuthService,
      AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
