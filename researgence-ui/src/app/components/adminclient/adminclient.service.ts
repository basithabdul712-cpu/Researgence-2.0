import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminclientService {

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
 
  GetUniversity(UserId,roleId){
     const url=environment.commonUrl+"/api/Search/GetCustomerUniversity?loginUserid="+UserId+"&roleId="+roleId;
    return this.http.get(url, this.jwt()).pipe(map((res) => res))
}

// List of Noncustomer University

GetNonCusUniv(UserId,roleId){
  const url=environment.commonUrl+"/api/Search/GetNonCustomerUniversity?loginUserid="+UserId+"&roleId="+roleId;
  return this.http.get(url, this.jwt()).pipe(map((res) => res))
}

GetUserList(data){
  const url=environment.commonUrl+"/api/User/PostUserListByUniversity";
  return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
  }
         //List of Publication entry
          getDFSPublicationList(roleId,loginUserId,UniversityId){
            let url=environment.commonUrl+"/api/Support/GetSupportPublicationsById?roleId="+roleId+"&loginUserId="+loginUserId;
            if(roleId==11){
             url=url+"&UniversityId="+UniversityId;
            }
            return this.http.get(url,this.jwt()).pipe(map((res) => res))
          }

         //For RFS pending approval list
         getRFSapproval(roleId,userId,univId){
          let url=environment.commonUrl+"/api/Support/GetRFSSupportRequests?roleId="+roleId+"&loginUserId="+userId;
          if(roleId==11){
            url=url+"&universityId="+univId;
        }
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
         } 

         //For RFS Patent pending approval list
         getRFSPatentList(roleId,userId,univId){
          let url=environment.commonUrl+"/api/Patent/GetRFSPatentRequestDetails?LoginUserId="+userId+"&LoginUserRoleId="+roleId;
          if(roleId==11){
            url=url+"&UniversityId="+univId;
        }
        console.log(url);
        
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
         } 

     //get RFS support evaluation
      getRFSSupportUserDetail(rfsPubQueueId,type){
        const url=environment.commonUrl+"/api/Support/GetRFSRequestedUserDetails?RFSRequestId="+rfsPubQueueId+"&RFSTypeId="+type;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

    //Get patent evaluation 
    getPatentEval(id){
      const url=environment.commonUrl+"/api/Patent/GetRFSPatentInvAppUserDetails?RFSPatRequestId="+id;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }
      
      getRFSSupportAuthorDetail(rfsPubQueueId,pubid){
      const url=environment.commonUrl+"/api/Support/GetRFSPubAuthorDetails?RFSRequestId="+rfsPubQueueId+"&PublicationId="+pubid;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

      //Save data in RFS
      SaveRFSApproval(userId,roleId,data){
        const url=environment.commonUrl+"/api/Publication/SaveRFSPublicationQueue?loginUserId="+userId+"&loginUserRoleId="+roleId;
        return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
      }
      getUniversitytitle(userId){
        let url=environment.commonUrl+"/api/Search/GetCustomerUniversity?loginUserid="+userId+"&roleId=12";
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

      rfsSearch(data,userId,roleId,univId){  
        let url=environment.commonUrl+"/api/Support/PostRFSPubSupportRequestSearch?loginUserId="+userId+"&LoginUserRoleId="+roleId;
        if(roleId==11){
          url=url+"&UniversityId="+univId;
        }
        return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
      }

      // Patent advance search
      patentAdvSearch(data,userId,roleId,univId){
        let url=environment.commonUrl+"/api/Patent/PostRFSPatentRequestAdvSearch?LoginUserId="+userId+"&LoginUserRoleId="+roleId;
        if(roleId==11){
          url=url+"&UniversityId="+univId;
        }
        return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
      }

      getAssignedTo(univId){
        let url=environment.commonUrl+"/api/SRQNotIf/GetAssignedToForSRQ?UniversityId="+univId;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
       } 

     ///status
     getServiceStatus(){
      let url=environment.commonUrl+"/api/Master/GetMasterDropDownValues?columnName=SRQSTATUS";
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
     }

     //advance search for service request
     searchReq(data,roleId,userId){
        let url=environment.commonUrl+"/api/SRQNotIf/PostServiceRequestsSearch?RoleId="+roleId+"&LoginUserId="+userId;
        return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
     }

     rfsApproval(data,userId,roleId,status){  
      let url=environment.commonUrl+"/api/Support/UpdatePubReviewStatus?LoginUserId="+userId+"&LoginRoleId="+roleId+"&Status="+status;
     
      return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
    }
    getdfsedit(publicationid){
      let url=environment.commonUrl+"/api/Publication/GetPublicationForEdit?publicationId="+publicationid;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }
    getClientUsageReport(roleId,userId,univId){
      let url=environment.commonUrl+"/api/Support/GetClientUsageReport?roleId="+roleId+"&loginUserId="+userId+"&universityId="+univId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }
    getPubACSR1Format(roleId,userId,univId){
      let url=environment.commonUrl+"/api/Support/GetPubACSR1Format?roleId="+roleId+"&loginUserId="+userId+"&universityId="+univId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }

    // DFS source request list
    getDfsSourceRequest(roleId,userId){
      let url=environment.commonUrl+"/api/Support/GetDFSPubSrcSupportRequests?roleId="+roleId+"&loginUserId="+userId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }

    // To view source request detail
    viewDfsSourceRequest(queueId,sourceId){
      let url=environment.commonUrl+"/api/Journal/GetDFSPubSrcForEdit?DFSPubSourceQueueId="+queueId+"&publicationSourceId="+sourceId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }

    // To approve/reject request
    saveDFSSourceRequest(data,userId,roleId,queueId){  
    let url=environment.commonUrl+"/api/Journal/SavePublicationSource?loginUserId="+userId+"&loginUserRoleId="+roleId+"&DFSPubSrcQueueId="+queueId;
    return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
   }

    //  To view history of source request
     viewSourceListHistory(roleId,userId,univ){
        let url=environment.commonUrl+"/api/Support/GetDFSPubSrcSupportRequests?roleId="+roleId+"&loginUserId="+userId+"&universityId="+univ+"&isHistory=1";
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
     }

    //  To get list for publication edit in librarian role
     fetchUncatogeryPub(data:any): Observable<HttpResponse<any>>{
      const url=environment.commonUrl+"/api/Publication/PostUncategorizedPublications";
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(url, data, { headers, observe: 'response' });
   }

   getListForPSRJournal(univ,fromDt,toDt,postDt){
    let url=environment.commonUrl+"/api/Report/GetPRSReportWithFilter?UniversityId="+univ+"&ArticleType=JOURNAL";
        if(fromDt!=null||fromDt!=undefined){
          url=url+"&FromMonthYear="+fromDt;
        }
        if(toDt!=null||toDt!=undefined){
          url=url+"&ToMonthYear="+toDt;
        }
        if(postDt!=null||postDt!=undefined){
          url=url+"&PostCutOffDate="+postDt;
        }
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
   }

   getListForPSRBook(univ,fromDt,toDt,postDt){
    let url=environment.commonUrl+"/api/Report/GetPRSReportWithFilter?UniversityId="+univ+"&ArticleType=BOOK";
        if(fromDt!=null||fromDt!=undefined){
          url=url+"&FromMonthYear="+fromDt;
        }
        if(toDt!=null||toDt!=undefined){
          url=url+"&ToMonthYear="+toDt;
        }
        if(postDt!=null||postDt!=undefined){
          url=url+"&PostCutOffDate="+postDt;
        }
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
   }

   getListForPSRBookchapter(univ,fromDt,toDt,postDt){
    let url=environment.commonUrl+"/api/Report/GetPRSReportWithFilter?UniversityId="+univ+"&ArticleType=BOOK CHAPTER";
        if(fromDt!=null||fromDt!=undefined){
          url=url+"&FromMonthYear="+fromDt;
        }
        if(toDt!=null||toDt!=undefined){
          url=url+"&ToMonthYear="+toDt;
        }
        if(postDt!=null||postDt!=undefined){
          url=url+"&PostCutOffDate="+postDt;
        }
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
   }

   getListForPSRConference(univ,fromDt,toDt,postDt){
    let url=environment.commonUrl+"/api/Report/GetPRSReportWithFilter?UniversityId="+univ+"&ArticleType=CONFERENCE";
        if(fromDt!=null||fromDt!=undefined){
          url=url+"&FromMonthYear="+fromDt;
        }
        if(toDt!=null||toDt!=undefined){
          url=url+"&ToMonthYear="+toDt;
        }
        if(postDt!=null||postDt!=undefined){
          url=url+"&PostCutOffDate="+postDt;
        }
    return this.http.get(url,this.jwt()).pipe(map((res) => res));
   }
   
   getMonthlyList(userId,univId,fromDt,toDt){
     let url=environment.commonUrl+"/api/Report/GetMothlyBulletinByUniversity?UniversityId="+univId+"&RoleId=12&LoginUserId="+userId+"&FromDate="+fromDt+"&ToDate="+toDt;
    //  return this.http.get(url,this.jwt()).pipe(map((res) => res));
     return this.http.get<any>(url, { observe: 'response' }); 
    }

     //List of Publication entry
      getpatentApprovalList(roleId,loginUserId,UniversityId){
        let url=environment.commonUrl+"/api/Patent/GetSupportPatentDetailsForQCCheck?roleId="+roleId+"&loginUserId="+loginUserId+"&isHistory=0";
         if(roleId==11){
          url=url+"&universityId="+UniversityId;
          }
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

      // Patent QC approval or reject
      patentQcApproval(data,userId,roleId,status){  
        let url=environment.commonUrl+"/api/Patent/UpdatePatentReviewStatus?LoginUserId="+userId+"&LoginRoleId="+roleId+"&Status="+status;  
        return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
      }

      //Get patent evaluation list by patent id 
        getPatentEvalById(id,patId){
          const url=environment.commonUrl+"/api/Patent/GetRFSPatentInvAppUserDetails?RFSPatRequestId="+id+"&PatentId="+patId;
            return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

          //List of Publication entry (Changed for Project QC)
          getprojectApprovalList(roleId,loginUserId,UniversityId){
            let url=environment.commonUrl+"/api/Projects/GetSupportProjectDetailsForQCCheck?roleId="+roleId+"&loginUserId="+loginUserId+"&isHistory=0";
             if(roleId==11){
              url=url+"&universityId="+UniversityId;
              }
            return this.http.get(url,this.jwt()).pipe(map((res) => res))
          }
     
            // Patent QC approval or reject(Changed for Project QC)
            projectQcApproval(data,userId,roleId,status){  
            let url=environment.commonUrl+"/api/Projects/UpdateProjectReviewStatus?LoginUserId="+userId+"&LoginRoleId="+roleId+"&Status="+status;  
            return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
          }

    //       GetUniversityPlanExpiryAlerts(){
    //     // let url=environment.commonUrl+"/api/Account/GetUniversityPlanExpirySummary?roleId="+roleId+"&loginUserId="+userId;
    //     let url=environment.commonUrl+"/api/Account/GetUniversityPlanExpiryAlerts?roleId=6&loginUserId=12123";
    //     return this.http.get(url,this.jwt()).pipe(map((res) => res))
    //  }


}
