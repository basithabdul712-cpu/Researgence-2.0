import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScorebookService {

  private months = [
    { id: "01", name: 'January' },
    { id: "02", name: 'February' },
    { id: "03", name: 'March' },
    { id: "04", name: 'April' },
    { id: "05", name: 'May' },
    { id: "06", name: 'June' },
    { id: "07", name: 'July' },
    { id: "08", name: 'August' },
    { id: "09", name: 'September' },
    { id: "10", name: 'October' },
    { id: "11", name: 'November' },
    { id: "12", name: 'December' },
  ];

  private jwt() {
    let headers = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    let options = {
        headers: headers
     }
     return options;
  }
  constructor(private http: HttpClient) {}
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


    GetScorebook(universityId,roleId,loginUserId){

      const url=environment.commonUrl+"/api/Publication/GetPubScoreBookMetrics?universityId="+universityId+"&roleId="+roleId+"&loginUserId="+loginUserId;
        // return this.http.get(url, this.jwt()).pipe(map((res) => res))   
        return this.http.get<any>(url, { observe: 'response' });   
    }
    
    ScorebookPublicationcompares(data:any){

      const url=environment.commonUrl+"/api/Publication/PostPubScoreBookMetricsCompare";

      return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
    }

    //to get month
    getMonths(): { id: string, name: string }[] {
      return this.months;
    }

    // Patent Mine
    fetchPatentData(data:any):Observable<HttpResponse<any>>{
      const url=environment.commonUrl+"/api/Patent/PostPatentSearchDetails";
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(url, data, { headers, observe: 'response' });
   }

  //  patent Mine excel & pdf
  fetchExportPatent(data:any){
    const url=environment.commonUrl+"/api/Home/PostPatentSearchDetails";
    return this.http.post(url,data,this.jwt()).pipe(map((res) => res));
  } 

    ///MINE the database API
     fetchMIneDB(data:any): Observable<HttpResponse<any>>{
        const url=environment.commonUrl+"/api/Home/PostPublicationSearchDetails";
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(url, data, { headers, observe: 'response' });
     }

     fetchSupportMine(data:any): Observable<HttpResponse<any>>{
      const url=environment.commonUrl+"/api/Home/SupportPublicationMine";
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(url, data, { headers, observe: 'response' });
   }

     fetchMIneDB1(data:any){
      const url=environment.commonUrl+"/api/Publication/PostPublicationSearchDetails";
      return this.http.post(url,data,this.jwt()).pipe(map((res) => res));
     }

     fetchSupportMine1(data:any){
      const url=environment.commonUrl+"/api/Support/SupportPublicationMine";
      return this.http.post(url,data,this.jwt()).pipe(map((res) => res));
     }

                                      // --------------Json Url-------------------
    // getScoreFull(){
    //   var url="/assets/jsondata/scorebook1.json";
    //   return this.http.get(url, this.jwt()).pipe(map((res) => res))
    // }

  //   comparepublication(){
  //      var url="/assets/jsondata/comparepublication.json";      
  //       return this.http.get(url, this.jwt()).pipe(map((res) => res))     
  //   }

  //      compareKeyindicators(){
  //        var url="/assets/jsondata/comparekeyindex.json";
  //          return this.http.get(url, this.jwt()).pipe(map((res) => res))
  //  }

  GetInsightCountryCollaboration(univId,roleid,userId,locationid,schoolid,instituteid,deptid,fromyear,toyear){
    let url=environment.commonUrl+"/api/Home/GetInsightCountryCollaboration?UniversityId="+univId+"&RoleId="+roleid+"&FromYear="+fromyear+"&ToYear="+toyear;
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

  GetInsightPubTrendByYear(univId,roleid,userId,locationid,schoolid,instituteid,deptid,fromyear,toyear){
    let url=environment.commonUrl+"/api/Home/GetInsightPubTrendByYear?UniversityId="+univId+"&RoleId="+roleid+"&FromYear="+fromyear+"&ToYear="+toyear;
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

  GetInsightPubDBCountByYear(univId,roleid,userId,locationid,schoolid,instituteid,deptid,fromyear,toyear){
    let url=environment.commonUrl+"/api/Home/GetInsightPubDBCountByYear?UniversityId="+univId+"&RoleId="+roleid+"&FromYear="+fromyear+"&ToYear="+toyear;
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
  GetInsightJournalPubCount(univId,roleid,userId,locationid,schoolid,instituteid,deptid,fromyear,toyear){
  let url=environment.commonUrl+"/api/Home/GetInsightJournalPubCount?UniversityId="+univId+"&RoleId="+roleid+"&FromYear="+fromyear+"&ToYear="+toyear
  if(locationid!=null||locationid!=null){
    url=url+"&Locationid="+locationid;
  }
  if(schoolid!=null||schoolid!=null){
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
  GetInsightPubIndexedTrendByYear(univId,roleid,userId,locationid,schoolid,instituteid,deptid,fromyear,toyear){
   let url =environment.commonUrl+"/api/Home/GetInsightPubIndexedTrendByYear?UniversityId="+univId+"&RoleId="+roleid+"&FromYear="+fromyear+"&ToYear="+toyear
   if(locationid!=null||locationid!=null){
     url=url+"&Locationid="+locationid;
   }
   if(schoolid!=null||schoolid!=null){
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
GetInsightCitationByYearDB(univId,roleid,userId,locationid,schoolid,instituteid,deptid,fromyear,toyear){
  let url =environment.commonUrl+"/api/Home/GetInsightCitationByYearDB?UniversityId="+univId+"&RoleId="+roleid+"&FromYear="+fromyear+"&ToYear="+toyear
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
GetInsightStateCollaboration(univId,roleid,userId,locationid,schoolid,instituteid,deptid,fromyear,toyear){
  let url =environment.commonUrl+"/api/Home/GetInsightStateCollaboration?UniversityId="+univId+"&RoleId="+roleid+"&FromYear="+fromyear+"&ToYear="+toyear
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

getScoreBookViewList(univId,roleId,userId,modules,submodule){
  let urlName;
  if(modules=="Publications"){
     urlName="GetPubSBPublicationMetricsView";
  }
  else if(modules=="Journal Q Ranking"){
     urlName="GetPubSBJournalQRankingView";
  }
  else if(modules=="Journal Scores"){
    urlName="GetPubSBJournalScoresView";
  }
  else if(modules=="Premium Publications"){
    urlName="GetPubSBPremiumPublicationsView";
  }
  else if(modules=="Predatory Publications"){
    urlName="GetPubSBPredatoryPublicationsView";
  }
  else if(modules=="Article Type"){
    urlName="GetPubSBArticleTypeView";
  }
  else if(modules=="Citations"){
    urlName="GetPubSBCitationMetricsView";
  }
  else if(modules=="Quality Index"){
    urlName="GetPubSBQualityIndexView";
  }
  else if(modules=="Productivity Index"){
    urlName="GetPubSBProductivityIndMetricsView";
  }
  else if(modules=="Collaborations"){
    urlName="GetPubSBCollaborationsMetricsView";
  } 
  else if(modules=="Rankings"){
    urlName="GetPubSBRankingsMetricsView";
  }
  else if(modules=="SDG"){
    urlName="GetPubSBSDGMetricsView"
  }
  let url =environment.commonUrl+"/api/ScoreBook/"+urlName+"?universityId="+univId+"&roleId="+roleId+"&loginUserId="+userId+"&module="+modules+"&subModule="+submodule;
  return this.http.get(url,this.jwt()).pipe(map((res) => res))
}

}
