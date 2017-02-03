import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loginService: LoginService;
  router: Router;
  
  constructor( _loginService: LoginService, _router:Router) {
    this.loginService = _loginService;
    this.router = _router;
  }

  ngOnInit() {

  }

  clickMe(event, data) {
    console.log("I was clicked:" + data)
    this.loginService.setPath(data);
    this.router.navigateByUrl(data);
  }


}
