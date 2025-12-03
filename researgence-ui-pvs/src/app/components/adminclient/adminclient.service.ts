import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
     const url=environment.commonUrl+"/api/Home/GetCustomerUniversity?loginUserid="+UserId+"&roleId="+roleId;
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

               //get RFS support evaluation
      getRFSSupportUserDetail(rfsPubQueueId,type)
      {
        const url=environment.commonUrl+"/api/Support/GetRFSRequestedUserDetails?RFSRequestId="+rfsPubQueueId+"&RFSTypeId="+type;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }
      
      getRFSSupportAuthorDetail(rfsPubQueueId,pubid)
      {
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
   
}
