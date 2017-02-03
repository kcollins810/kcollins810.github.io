import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router'
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import {Observable} from "rxjs/Observable";

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class Credential {
  username: string;
  password: string;
  constructor(_username:string, _password:string) {
    this.username=_username;
    this.password=_password;
  }
  
}


@Injectable()
export class LoginService implements CanActivate {
 
  loggedin = false;
  current_path: BehaviorSubject<string>;
  silverlight_visible: BehaviorSubject<boolean>;
  credentials: BehaviorSubject<Credential>;
  

  constructor() { 
    this.current_path = new BehaviorSubject("init")
    this.silverlight_visible = new BehaviorSubject(true);
    this.credentials = <BehaviorSubject<Credential>>new BehaviorSubject(new Credential("",""));
    
    console.log("Initiating Service for login.")
    this.current_path.next("init2");
  }

  login(username, password) {
   console.log("Setting Username" + username.value)
   this.credentials.next(new Credential(username.value, password.value))

  }

  setLoggedIn(val ) {
    console.log("Setting Service " + val)
    this.loggedin = val;
  }

  setPath(val) {
    this.current_path.next(val);
    if ((val.length > 2)&& (val[0] == '/') ) {
      console.log("Non root path.")
      this.silverlight_visible.next(true);
    }
  }

  getLoggedIn() {
    return this.loggedin;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    return this.loggedin;
  }

  get currentCredentials():Observable<Credential> {
      return this.credentials.asObservable();
  }
  get currentPath():Observable<string> {
    //return new Observable(fn => this.current_path.subscribe(fn));
    return this.current_path.asObservable();
  }

  setSilverlightVisible(val) {
    console.log("Setting Visible" + val)
    this.silverlight_visible.next(val);
  }

  get currentSilverlightVisible():Observable<boolean> {
    return this.silverlight_visible.asObservable();
  }
}
