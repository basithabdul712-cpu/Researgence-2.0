import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeneralApiService {

  cachedMenuItems: any;
  error:any;

  private jwt() {
      let headers = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
      let options = {
          headers: headers
       }
  return options;
  }
  constructor(private http: HttpClient) {

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
      return throwError(
      'Something bad happened; please try again later.');
  };   
       // dropdown for Gender and designation
       getDropdown(type){
        const url=environment.commonUrl+"/api/Master/GetMasterDropDownValues?columnName="+type;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }
      // dropdown for campus, institute, department
      getDropCID(universityId,role,userId){
        const url=environment.commonUrl+"/api/Master/GetUnivLocInstDeparment?universityId="+universityId+"&roleId="+role+"&loginUserId="+userId;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

      getturnkeyReportList(name,version){
        const url=environment.commonUrl+"/api/Report/GetTurnkeyReportColumnDetails?ReportName="+name+"&ReportVersion="+version;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

      getCoulmnForReport(data){
        const url=environment.commonUrl+"/api/Report/GetTurnkeyReportOutput";
        return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
      }
      
      getTurnkeyReport(id){
        const url=environment.commonUrl+"/api/Account/GetUnivTurnkeyKeyReportsConfig?universityId="+id;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

      getPatentLayer(univId,roleId,userId,level,locationid,schoolid,instituteid,deptid){
        let url=environment.commonUrl+"/api/Home/GetPatDashboardPatCntByLayerLevel?UniversityId="+univId+"&RoleId="+roleId+"&LevelId="+level;
        if(locationid!=null||locationid!=undefined){
          url=url+"&Locationid="+locationid;
        }
        if(schoolid!=null||schoolid!=undefined){
          url=url+"&SchoolId="+schoolid;
        }
        if(instituteid!=null||instituteid!=undefined){
          url=url+"&InstituteId="+instituteid;
        }
        if(deptid!=null||deptid!=undefined){
          url=url+"&DepartmentId="+deptid;
        }
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }
      
      getPatentStage(univId,roleId,userId,level,locationid,schoolid,instituteid,deptid){
        let url=environment.commonUrl+"/api/Patent/GetDsBrdPatentCountByStage?UniversityId="+univId+"&RoleId="+roleId+"&LevelId="+level;
        if(locationid!=null||locationid!=undefined){
          url=url+"&Locationid="+locationid;
        }
        if(schoolid!=null||schoolid!=undefined){
          url=url+"&SchoolId="+schoolid;
        }
        if(instituteid!=null||instituteid!=undefined){
          url=url+"&InstituteId="+instituteid;
        }
        if(deptid!=null||deptid!=undefined){
          url=url+"&DepartmentId="+deptid;
        }
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

     searchJournalData(data){
     
      
         let url=environment.commonUrl+"/api/Journal/PostJournalSearchDetails";
         const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
         return this.http.post<any>(url, data, { headers, observe: 'response' });
     }

}
