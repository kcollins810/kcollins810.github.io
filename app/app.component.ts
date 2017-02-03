import { Component, ViewChild,NgZone } from '@angular/core';
import {SilverlightComponent} from './silverlight/silverlight.component';
import { LoginService } from './login.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  show_login_form = true;
  router: Router;
  loginService: LoginService;
  @ViewChild('SilverLight') silverLight: SilverlightComponent;
  constructor( _loginService: LoginService, _router: Router) {
           // instance is fine but transient
    this.router = _router;
    this.loginService = _loginService;

  }
  ngOnInit() {
    console.log("now you see it.")

    this.loginService.currentSilverlightVisible.subscribe((value) => {
      if (value) {
        this.silverLight.showSilverlight(); 
        console.log("Subscription says show")
      }
      else {
        console.log("Subscription says hide")
        this.silverLight.hideSilverlight();
      }
      console.log("Silverlight set to " +value);
    })
    //setTimeout(() => {
    //  console.log("No longer visible.")
    //   this.loginService.setSilverlightVisible(false);
    //   this.silverLight.hideHeader();
    // }, 2000)
  }
  initComplete(event) {
    console.log("Hiding Silverlight");
    this.loginService.setSilverlightVisible(false);
    this.silverLight.hideHeader();
  }
  login(event) {
    console.log("Here you go. Hey dude the app knows to try to log in.");
    console.log(this.silverLight);
    this.silverLight.loginStart(event.username, event.password);
    
    console.log(event);
  }
  okLogin(event) {
    console.log("Login worked!")
    //this.silverLight.showSilverlight();
    this.show_login_form = false;
    this.router.navigateByUrl('/dashboard')
    this.loginService.setLoggedIn(true);
  }
  failLogin(event) {
    console.log("Fail Login");
     this.loginService.setLoggedIn(false);
  }
  
}
