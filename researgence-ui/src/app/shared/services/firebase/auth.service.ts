import { Injectable, NgZone } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Router } from "@angular/router";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { environment } from "../../../../environments/environment";
import jwt_decode from "jwt-decode";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";


export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: any = [];
  roles: any;
  roleCheck: any;
  name: string;
  userexists=[4];   // all details are correct
  emailExists=[5];  // email and user exist but first time login 
  nopassword=[3];

  private jwt() {
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      tenantID: "evlr2",
    });
    let options = {
      headers: httpHeaders,
    };
    return options;
  }

  public showLoader: boolean = false;
  userData: any; // Save logged in user data
  constructor(
    public router: Router,
    public ngZone: NgZone,
    private httpClient: HttpClient
  ) {}

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("currentUser")!);
    return user !== null && user.id !== false ? true : false;
  }
  logins(obj: any): Observable<any> {
    localStorage.setItem("userName", JSON.stringify(obj));
    const userData = JSON.parse(localStorage.getItem("userName"));
    const data=JSON.parse(obj);
    const url = environment.commonUrl + "/api/Account/Login?username=" + data.userName + "&password=" + data.password + "&UniversityId=" + data.universityId;
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
  
    return this.httpClient.post(url, obj, { headers }).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 200) {
            const responseText = err.error.text;
            try {
              const decodedToken = jwt_decode(responseText);
              console.log(decodedToken);
              const landingPage = decodedToken["LandingPage"];
              console.log(landingPage);
              const responsecode = decodedToken["ResponseCode"];
              localStorage.setItem("currentUser", JSON.stringify(decodedToken));
              this.showLoader = true;

              this.user = this.getUserDetail();
              this.getUnivSubcripModuleConsolidated(this.user.UniversityId).subscribe({
                  next: (res: any) => {
                    console.log(res);
                    localStorage.setItem('UnivSubcripModuleConsolidated', JSON.stringify(res));
                   }
                 });

              if (this.userexists.includes(Number(responsecode))) {
                if (landingPage !== "NA") {
                  this.user = this.getUserDetail();
                  return this.RoleSelection(this.user.UniversityId, this.user.UserId).pipe(
                    mergeMap((x) => {
                      this.roles = x;
                      localStorage.setItem('RoleSelection', JSON.stringify(x));
                      this.roleCheck = this.roles.length;
                      
                      for (let i = 0; i < this.roles.length; i++) {
                        if (this.roles[i].landingPage == "/dashboard") {
                          this.roles[i].landingPage = "/Home";
                         }
                        }
  
                        if (this.roles[0].landingPage == "/universityselect") {
                          this.name = "/clientadmin/universitySelect";
                        } else {
                          this.name = this.roles[0].landingPage;
                        }
  
                        if (this.roleCheck === 1 || this.roleCheck === 0) {
                          this.setProfileObs(this.roles[0].roleId);
                          this.router.navigate([this.name]).then(() => {
                            window.location.reload();
                          });
                        } else {
                          this.router.navigate(["/Landing"]);
                        }
  
                      return of(decodedToken);
                    })
                  );
                } else {
                  this.router.navigate(["/Landing"]);
                  return of(decodedToken);  
                }
              } else if (this.emailExists.includes(Number(responsecode))) {
                this.emailExists = responsecode;
                console.log(responsecode);
                return of(decodedToken);  
              } else if (this.nopassword.includes(Number(responsecode))) {
                localStorage.setItem("message", "Check your password");
                return of(decodedToken); 
              } else {
                console.log(responsecode);
                return of(decodedToken); 
              }
            } catch (e) {
              console.error(e);
              return throwError("Failed to decode JWT");
            }
          } else if (err.status !== 0) {
            console.error(`HTTP Error: ${err.status}`);
            localStorage.setItem("message", "Check username and password");
            return of(err.status);
          }
        } else {
          console.error("An error occurred:", err);
          return throwError("An error occurred while processing the request");
        }
      })
    );
  }
  

  SignOut() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
    let body = JSON.parse(localStorage.getItem("userName"));
    const userData = JSON.parse(body);
    const url =
      environment.commonUrl +
      "/api/Account/Login?username=" +
      userData.userName +
      "&password=" +
      userData.password;
    return this.httpClient.post(url, body, { headers }).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 200) {
            const responseText = err.error.text;
            try {
              const decodedToken = jwt_decode(responseText);
              localStorage.removeItem("currentUser");
              localStorage.removeItem("profile");
              localStorage.removeItem('mineSearch');
              localStorage.removeItem("RfsUnivId");
              localStorage.clear();
              this.showLoader = false;
              this.router.navigate(["/auth/login"]);
              return of(decodedToken);
            } catch (e) {
              console.error(e);
              return throwError("Failed to decode JWT");
            }
          } else {
            console.error(`HTTP Error: ${err.status}`);
            return throwError(`HTTP Error: ${err.status}`);
          }
        } else {
          console.error("An error occurred:", err);
          return throwError("An error occurred while processing the request");
        }
      })
    );
  }



  getProfileObs(): any {
    const role = localStorage.getItem("profile");

    return role;
  }

  setProfileObs(profile: any) {
    localStorage.setItem("profile", profile);
  }

  RoleSelection(UniversityId, UserId) {
    const url = environment.commonUrl +"/api/Master/GetRoles?universityId=" +UniversityId +"&UserId=" +UserId;
    return this.httpClient.get(url, this.jwt()).pipe(map((res) => res));
  }

  // To get login user details
  getUserDetail(): any {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return user;
  } 

  sendEmail(emailData: any) {
    return this.httpClient.post(`${environment.nodeServerUrl}/send-email`, emailData);
  }

  getSentEmails() {
    return this.httpClient.get(`${environment.nodeServerUrl}/get-sent-emails`);
  }

  validateOTP(email: string, otp: string): Observable<any> {
    return this.httpClient.post(`${environment.nodeServerUrl}/validate-otp`, { to: email, otp });
  }

  generateOTP(): string {
    const min = 100000;
    const max = 999999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    return otp.toString();
  }

  //Update mail
   updateMail(userId,Password:string,mail,loginTime){
    console.log(Password);
    
     const url=environment.commonUrl+"/api/Account/UpdateUserCredentials?UserId="+userId+"&Password="+encodeURIComponent(Password)+"&EmailId="+mail+"&UpdateLoginTime="+loginTime;
     return this.httpClient.post(url,this.jwt()).pipe(map((res) => res));
   }

   //Get Mail for userID
   getUserMail(userId){
      const url = environment.commonUrl+"/api/Account/GetEmailId?UserId="+userId+"&Type=USERID"
      return this.httpClient.get(url, this.jwt()).pipe(
        map(response => {
          if (response === '204') {
            // Status code is 204, return null
            return null;
          }
          // Status code is 200, return the response
          return response;
        })
      );
   }

   //GetMail by username
  getMailByName(username,univId){

    const url = environment.commonUrl+"/api/Account/GetEmailId?UserName="+username+"&Type=USERNAME&universityId="+univId;
    return this.httpClient.get(url, this.jwt()).pipe(
      map(response => {
        if (response === '204') {
          // Status code is 204, return null
          return null;
        }
        // Status code is 200, return the response
        return response;
      })
    );
  }

  //To get password
  getPassword(userid){
    const url = environment.commonUrl+"/api/Account/GetUserIdPwd?UserId="+userid;
    return this.httpClient.get(url, { responseType: 'text' });
  }

  //To get notification list
    getNotifyList(univId,roleId,userId){
      const url= environment.commonUrl+"/api/SRQNotIf/GetNotifications?UniversityId="+univId+"&RoleId="+roleId+"&LoginUserId="+userId;
      return this.httpClient.get(url,this.jwt()).pipe(map((res) => res));
    }

  //upDate notification mark or delete
    updateNotify(data,univId,roleId,userid){
        const url=environment.commonUrl+"/api/SRQNotIf/UpdNotificationViewStatus?UniversityId="+univId+"&RoleId="+roleId+"&LoginUserId="+userid;
        return this.httpClient.post(url,data,this.jwt()).pipe(map((res) => res));
    }

          
    //To change date and time format for notification
      formatDate(dateString: string): string {
        const date = new Date(dateString);

        const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();

        return `${month}, ${day} at ${hour}:${minute}`;
      }

      getUnivSubscriptionModule(univId,roleId,userId){
        let url=environment.commonUrl+"/api/Account/GetUnivSubscriptionModuleCheck?universityId="+univId+"&roleId="+roleId+"&loginUserId="+userId;
        return this.httpClient.get(url,this.jwt()).pipe(map((res) => res))
       }

       getUnivSubcripModuleConsolidated(univId:any){
        let url=environment.commonUrl+"/api/Account/GetUnivSubcripModuleConsolidated?universityId="+univId;
        return this.httpClient.get(url,this.jwt()).pipe(map((res) => res))
       }

}
