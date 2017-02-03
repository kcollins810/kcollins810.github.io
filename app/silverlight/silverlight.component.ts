import { Component, OnInit } from '@angular/core';
import { LoginService ,Credential} from '../login.service';

@Component({
  selector: 'app-silverlight',
  templateUrl: './silverlight.component.html',
  styleUrls: ['./silverlight.component.css']
})
export class SilverlightComponent implements OnInit {
  // orig_width= "100%";
  // orig_height= "500px";
  // width= "100%";
  // height = "500px";
  visible = true;
  targetPath="Bob";
  loginService: LoginService;
constructor( _loginService: LoginService) {
           // instance is fine but transient
  
    this.loginService = _loginService;
    this.loginService.currentPath.subscribe((value) => {
      this.navigate(value);
      console.log("Silverlight set to " +value);
    })
  }

ngOnInit() {
  this.loginService.credentials.subscribe((credentials:Credential) => {
    console.log("This is silverlight component Username changed to " + credentials.username)
    if (credentials.username.length > 0) {
    this.loginStart(credentials.username, credentials.password);
    }
  });
}
  public showSilverlight() {
    console.log("Showing silverlight");
    this.visible = true;
  }
  public getVisibility() {
    if (this.visible) return "visible";
    else return "hidden";
  }
  public getHeight() {
    if (this.visible) return "500px";
    else return "5px";
  }
  hideHeader() {
    (<any> document.getElementById("vesion")).content.vesion.hideHeader();          
  }
  navigate(url) { 
    console.log("Navigating" + url);
    if (document.getElementById("vesion") != null ) {
      (<any> document.getElementById("vesion")).content.vesion.navigate(url);    
    }    
  }
  public getWidth() {
    if (this.visible) return "100%";
    else return "5px";
  }
  public hideSilverlight() {
    console.log("hide silverlight.")
    this.visible=false;
    //$("#vesion").css("visibility", "hidden");
    //restore_width = $('#vesion').css("width");
    //restore_height = $('#vesion').css("height");
    //$('#vesion').css("height", "4px");
    //$('#vesion').css("width",  "4px");
  }
  loginStart(userId, password) {
    console.log("Silverlight says " + userId);
    return (<any>document.getElementById("vesion")).content.vesion.loginStart(userId, password);
  }

  /*
          logout() {
              document.getElementById("vesion").content.vesion.logout();
          }
  
          navigate(url) {
              document.getElementById("vesion").content.vesion.navigate(url);
          }
  
          showHeader() {
              document.getElementById("vesion").content.vesion.showHeader();
          }
  
          hideHeader() {
              document.getElementById("vesion").content.vesion.hideHeader();
          }
  
          changeTodBmV() {
              document.getElementById("vesion").content.vesion.changeTodBmV();
          }
          
  
          changeTodBuV() {
              document.getElementById("vesion").content.vesion.changeTodBuV();
          }
  
          showMyVeSion() {
              document.getElementById("vesion").content.vesion.showMyVeSion();
          }
  
    onSilverlightError(sender, args) {
      var appSource = "";
      if (sender != null && sender != 0) {
        appSource = sender.getHost().Source;
      }
  
      var errorType = args.ErrorType;
      var iErrorCode = args.ErrorCode;
  
      if (errorType == "ImageError" || errorType == "MediaError") {
        return;
      }
  
      var errMsg = "Unhandled Error in Silverlight Application " + appSource + "\n";
  
      errMsg += "Code: " + iErrorCode + "    \n";
      errMsg += "Category: " + errorType + "       \n";
      errMsg += "Message: " + args.ErrorMessage + "     \n";
  
      if (errorType == "ParserError") {
        errMsg += "File: " + args.xamlFile + "     \n";
        errMsg += "Line: " + args.lineNumber + "     \n";
        errMsg += "Position: " + args.charPosition + "     \n";
      }
      else if (errorType == "RuntimeError") {
        if (args.lineNumber != 0) {
          errMsg += "Line: " + args.lineNumber + "     \n";
          errMsg += "Position: " + args.charPosition + "     \n";
        }
        errMsg += "MethodName: " + args.methodName + "     \n";
      }
  
      throw new Error(errMsg);
    }*/

}
