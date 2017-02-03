import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

 import {
   RouterModule,
   Routes
} from '@angular/router';
import { LoginService } from './login.service'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { SilverlightComponent } from './silverlight/silverlight.component';
import { NoComponent } from './no/no.component';
 const routes: Routes = [
    {path:'', component: NoComponent},
    {path:'dashboard', component: DashboardComponent, canActivate:[LoginService]},
    {path:'**', component: NoComponent, canActivate:[LoginService]}
 ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SilverlightComponent,
    NoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [
    LoginService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
