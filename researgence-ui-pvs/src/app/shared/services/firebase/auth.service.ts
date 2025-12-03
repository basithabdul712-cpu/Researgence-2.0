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
import { UniversityidService } from "../universityid.service";


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
    private httpClient: HttpClient,
    private univservice: UniversityidService
  ) {}

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("currentUser")!);
    return user !== null && user.id !== false ? true : false;
  }
 
  // getProfileObs(): any {
  //   const role = localStorage.getItem("profile");

  //   return role;
  // }

  getProfileObs(): any {
      return 6;
  }

  setProfileObs(profile: any) {
    localStorage.setItem("profile", profile);
  }

 
  // To get login user details
  // getUserDetail(): any {
  //   const user = JSON.parse(localStorage.getItem("currentUser"));
  //   return user;
  // } 

  GetUnivId():any{
    this.univservice.selectedId$.subscribe(id => {
        return id;
    });
  }

  getUserDetails(id): any {
    // const user = JSON.parse(localStorage.getItem("currentUser"));
    let user = [ {
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "MARIA SUSAI MANUEL",
      "UniversityId": "43",
      "University": "JIS Group",
      "UniversityShortName": "JISGroup",
      "UserId": "8908",
      "LayerTypeId": "7",
      "LayerType": "4LType2",
      "RoleId": "0",
      "LandingPage": "NA",
      "Designation": "Lecturer",
      "ProfileFilePath": "ReseargenceProdDocs\\JISGroup\\Profile\\8908.jpg",
      "SubscriptionStatus": "Active",
      "SchoolName": "JIS G-JIS University",
      "InstituteName": "School of Pharmaceutical Science and Technology",
      "DepartmentName": "Pharmaceutical Chemistry",
      "LocationName": "Kolkata",
      "ResponseCode": "4",
      "ResponseMessage": "User exists",
      "exp": 1737538501,
      "iss": "Test.com",
      "aud": "Test1.com"
    },
   {
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "CINTEL ASK TESTUSER01",
      "UniversityId": "4395",
      "University": "Ashoka University",
      "UniversityShortName": "Ashoka",
      "UserId": "22001",
      "LayerTypeId": "2",
      "LayerType": "2LType1",
      "RoleId": "0",
      "LandingPage": "NA",
      "Designation": "NA",
      "ProfileFilePath": "None",
      "SubscriptionStatus": "Active",
      "SchoolName": "TBD",
      "InstituteName": "Faculty of Computer Science",
      "DepartmentName": "Computer Science",
      "LocationName": "Sonepat",
      "ResponseCode": "4",
      "ResponseMessage": "User exists",
      "exp": 1739427138,
      "iss": "Test.com",
      "aud": "Test1.com"
   },
   {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "DR. MARIA SUSAI MANUEL",
    "UniversityId": "1009",
    "University": "SGT University",
    "UniversityShortName": "SGT",
    "UserId": "20602",
    "LayerTypeId": "2",
    "LayerType": "2LType1",
    "RoleId": "0",
    "LandingPage": "NA",
    "Designation": "HOD",
    "ProfileFilePath": "ReseargenceProdDocs\\SGT\\Profile\\20602. Francis Collins",
    "SubscriptionStatus": "Active",
    "SchoolName": "TBD",
    "InstituteName": "Faculty of Medicine and Health Sciences",
    "DepartmentName": "Microbiology",
    "LocationName": "Gurugram",
    "ResponseCode": "4",
    "ResponseMessage": "User exists",
    "exp": 1739874831,
    "iss": "Test.com",
    "aud": "Test1.com"
}];

    user = user.filter(val => val.UniversityId == id);

    return user;
  }
  
  getUserDetail(): any {
    // const user = JSON.parse(localStorage.getItem("currentUser"));
    let user = {
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "CINTEL ASK TESTUSER01",
      "UniversityId": "4395",
      "University": "Ashoka University",
      "UniversityShortName": "Ashoka",
      "UserId": "22001",
      "LayerTypeId": "2",
      "LayerType": "2LType1",
      "RoleId": "0",
      "LandingPage": "NA",
      "Designation": "NA",
      "ProfileFilePath": "None",
      "SubscriptionStatus": "Active",
      "SchoolName": "TBD",
      "InstituteName": "Faculty of Computer Science",
      "DepartmentName": "Computer Science",
      "LocationName": "Sonepat",
      "ResponseCode": "4",
      "ResponseMessage": "User exists",
      "exp": 1739427138,
      "iss": "Test.com",
      "aud": "Test1.com"
   };
   
   
    return user;
  }

  RoleSelection(UniversityId, UserId) {
    const url = environment.commonUrl +"/api/Master/GetRoles?universityId=" +UniversityId +"&UserId=" +UserId;
    return this.httpClient.get(url, this.jwt()).pipe(map((res) => res));
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

      // getUnivSubscriptionModule(univId){
      //   let url=environment.commonUrl+"/api/Home/GetUnivSubscriptionModuleCheck?universityId="+univId;
      //   return this.httpClient.get(url,this.jwt()).pipe(map((res) => res))
      //  }

}
