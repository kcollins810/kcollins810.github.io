import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {LoginService} from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginService: LoginService;
  
  @Output() loginRequest =  new EventEmitter();

  ngOnInit() {
  }
  constructor( _loginService: LoginService) {
    this.loginService=_loginService;

  }
  login(username: HTMLInputElement, password: HTMLInputElement) {
    console.log(`Got it ${username.value}`)
    //this.loginRequest.emit({username: username.value, password:password.value})
    this.loginService.login(username, password);

  }

}
