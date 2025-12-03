import { Title } from '@angular/platform-browser';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError, retry } from 'rxjs/operators';
import { DocCount,Faculty,DataModels ,FacultyList, Article, dashboardModel, DailyFeeder} from '../../shared/model/data.models';
import { Observable, throwError } from 'rxjs';
import { Publication } from './faculties-detail/publication';


@Injectable({
    providedIn: 'root',
})

export class FacultiesService {
    cachedMenuItems: any;
    error:any;
  data: any;

    private jwt() {
        let headers = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        let options = {
            headers: headers
         }
		return options;
    }
    constructor(private http: HttpClient) {
      this.data=null;

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

    
                                 //  ---------- clienturl-------------                       

           GetDashboard(UniversityId,RoleId){
          
           const url=environment.commonUrl+"/api/Home/GetDashboard?UniversityId="+UniversityId+"&RoleId="+RoleId;          
           return this.http.get(url, this.jwt()).pipe(map((res) => res))         
          
           }
           GetPubFacultyList(universityId,roleId,loginUserId) {

             const url=environment.commonUrl+"/api/Researcher/GetResearcherList?universityId="+universityId+"&roleId="+roleId+"&loginUserId="+loginUserId;         
             return this.http.get(url, this.jwt()).pipe(catchError(this.error));       
             // map((res) => res))          
             }
       
          GetProfile(UniversityId,id:any) {
            const url=environment.commonUrl+"/api/Home/GetResearcher?UniversityId="+UniversityId+"&AuthorId="+id;
            return this.http.get(url,this.jwt()).pipe(
                  map((res) => res),
                    catchError(this.handleError)
               );
          }

          GetBasicProfile(UniversityId,id:any) {
            const url=environment.commonUrl+"/api/Home/GetResearcherBasicInfo?universityId="+UniversityId+"&userId="+id ;
            return this.http.get<any>(url, { observe: 'response' }); 
          }

         researcherPublicationDetails(UniversityId,id) {
          const url=environment.commonUrl+"/api/Home/GetResearcherPublications?universityId="+UniversityId+"&userId="+id;                // return this.http.get(url, this.jwt()).pipe(
                //   map((res) => res),
                //   catchError(this.handleError)
                // );
                return this.http.get<any>(url, { observe: 'response' }); 
              }
              
        GetArticleRecords(UniversityId,id:any){
          const url=environment.commonUrl+"/api/Researcher/GetResearcherArticleCounts?UniversityId="+UniversityId+"&AuthorId="+id;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }
  
        GetResearcherDocumentCounts(UniversityId,id:any){
         const url=environment.commonUrl+"/api/Home/GetResearcherDocumentCntByModule?universityId="+UniversityId+"&userId="+id ;
          return this.http.get(url,this.jwt()).pipe(catchError(this.error))                    
        }  
        // ResearcherCompare(universityId,roleId,loginUserId){
        //   const url=environment.commonUrl+"/api/Researcher/GetResearcherCompareWithPubMetrics?universityId="+universityId+"&roleId="+roleId+"&loginUserId="+loginUserId;
        //   return this.http.get(url,this.jwt()).pipe(map((res)=>res))
        // }
        //University getAll
        SearchUniversity()
        {
          const url=environment.commonUrl+"/api/Search/GetSearchForAutoComplete?SearchColumn=University&SearchString=";
          return this.http.get(url,this.jwt()).pipe(map((res)=>res))
        }
        
      AuthorSearch(id:any,key:any){
            const url=environment.commonUrl+"/api/Home/GetSearchAuthor?universityId="+id+"&SearchText="+key;
            return this.http.get(url,this.jwt()).pipe(map((res)=>res))
      }

      DropDownData(UniversityId)
      {
        const url=environment.commonUrl+"/api/Master/GetUnivLocInstDeparment?universityId="+UniversityId;
        return this.http.get(url,this.jwt()).pipe(map((res)=>res)) 
      }
      getProfileEdit(UniversityId,UserId){
        const url=environment.commonUrl+"/api/User/GetUserInfoForEdit?universityId="+UniversityId+"&userId="+UserId;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }
      // dropdown for Gender and designation
      getDropdown(type){
        const url=environment.commonUrl+"/api/Home/GetMasterDropDownValues?columnName="+type;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

      // dropdown for campus, institute, department
      getDropCID(universityId,role,userId){
        const url=environment.commonUrl+"/api/Master/GetUnivLocInstDeparment?universityId="+universityId+"&roleId="+role+"&loginUserId="+userId;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

      // get artricle index and source index
       getIndex(){
        const url=environment.commonUrl+"/api/Master/GetDBNameForDFS";
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
       }

       getPatentTitle(name){
        const url=environment.commonUrl+"/api/Search/GetSearchForAutoComplete?SearchColumn=PATENTTITLE&SearchString="+name;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
       }

       //get title or publication name
       getTitleList(name){     
        const url=environment.commonUrl+"/api/Search/GetSearchForAutoComplete?SearchColumn=Publication&SearchString="+name;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
       }
   
       // get journal or source name
      getJournal(name){
        const url=environment.commonUrl+"/api/Search/GetSearchForAutoComplete?SearchColumn=Journal&SearchString="+name;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

      // get list of publisher
      getPublisher(){
        const url=environment.commonUrl+"/api/Search/GetSearchForAutoComplete?SearchColumn=Publisher";
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

      //get university list
      getUnivertyList(){
      const url=environment.commonUrl+"/api/Search/GetSearchForAutoComplete?SearchColumn=University";
      return this.http.get(url,this.jwt()).pipe(map((res) => res));
    }
     
    //get userstaus list
    getUserStatusList(){
      const url=environment.commonUrl+"/api/Master/GetMasterDropDownValues?columnName=userstatus";
         return this.http.get(url,this.jwt()).pipe(map((res) => res));
     }

     //get title
     getTitle(){
      const url=environment.commonUrl+"/api/Master/GetMasterDropDownValues?columnName=Title";
         return this.http.get(url,this.jwt()).pipe(map((res) => res));
     }
  
      // update or add data in profile edit
      updateProfile(data:any,loginUserId,loginUserRoleId){        
        const url=environment.commonUrl+"/api/User/UpdateUserInfo?loginUserId="+loginUserId+"&loginUserRoleId="+loginUserRoleId;
        return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
      }

            //  add data in profile 
      addProfile(data:any,loginUserId,loginUserRoleId){        
        const url=environment.commonUrl+"/api/User/UpdateUserInfo?loginUserId="+loginUserId+"&loginUserRoleId="+loginUserRoleId;
        return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
      }

            // cross verfication for DFS
            crossCheckDFS(doi){
              const url=environment.commonUrl+"/api/Publication/GetCrossRefData?DOI="+doi;
              return this.http.get(url,this.jwt()).pipe(map((res) => res))
            }
      
            // sourceName for DFS 
            getSourceField(id){
               const url=environment.commonUrl+"/api/Search/GetPubSourceForAutoComplete?PublicationSourceId="+id;
               return this.http.get(url,this.jwt()).pipe(map((res) => res))
            }

            savePub(data:any,loginUserId,loginUserRoleId){
              const url=environment.commonUrl+"/api/publication/SavePublicationNew?loginUserId="+loginUserId+"&loginUserRoleId="+loginUserRoleId+"&source=DFS";
              return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
            }

            //save data for DFS 
            saveAll(data:any,loginUserId,loginUserRoleId){
            const url=environment.commonUrl+"/api/publication/SavePublication?loginUserId="+loginUserId+"&loginUserRoleId="+loginUserRoleId+"&source=DFS";
            return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
          }
          // update(data:any,loginUserId,loginUserRoleId){
          //   const url=environment.commonUrl+"/api/publication/SavePublication?loginUserId="+loginUserId+"&loginUserRoleId="+loginUserRoleId+"&source=DFS";
          //   return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
          // }

            //For RFS entry in dfs
            SaveNewPub(data:any,loginUserId,loginUserRoleId,rfsrequestqueue){
              const url=environment.commonUrl+"/api/publication/SavePublication?loginUserId="+loginUserId+"&loginUserRoleId="+loginUserRoleId+"&source=RFS&rfsRequestQueueId="+rfsrequestqueue;
              return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
            }

            savePubRFS(data:any,loginUserId,loginUserRoleId,rfsrequestqueue){
              const url=environment.commonUrl+"/api/publication/SavePublicationNew?loginUserId="+loginUserId+"&loginUserRoleId="+loginUserRoleId+"&source=RFS&rfsRequestQueueId="+rfsrequestqueue;
              return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
            }
        
          // Article type
          getArticleType(){
          const url=environment.commonUrl+"/api/Home/GetMasterDropDownValues?columnName=Articletype";
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        // Source Indexing values for Qrank,SCI,ABDC,UGCCare
        getSourceIndexingValue(value){
          const url=environment.commonUrl+"/api/Home/GetMasterDropDownValues?columnName="+value;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        // Faculty list Pagination
        getfacultyListPage(data){
          const url=environment.commonUrl+"/api/Home/PostResearcherList";
          //return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.post<any>(url, data, { headers, observe: 'response' });
          }

          getScholarList(data){
            const url=environment.commonUrl+"/api/Researcher/PostResearcherList?ResearcherType=Scholar";
            //return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            return this.http.post<any>(url, data, { headers, observe: 'response' });
          }

          //For Scholar compare
          ResearcherScholarCompare(data:any){
            const url=environment.commonUrl+"/api/Researcher/PostResearcherCompareWithPubMetrics?ResearcherType=Scholar";
            return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
            }

            // Staff List 
            getStaffList(data){
              const url=environment.commonUrl+"/api/Researcher/PostResearcherList?ResearcherType=Staff";
              //return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
              const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
              return this.http.post<any>(url, data, { headers, observe: 'response' });
            }

              //For Staff compare
          ResearcherStaffCompare(data:any){
            const url=environment.commonUrl+"/api/Researcher/PostResearcherCompareWithPubMetrics?ResearcherType=Staff";
            return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
            }

               // Student List 
               getStudentList(data){
                const url=environment.commonUrl+"/api/Researcher/PostResearcherList?ResearcherType=Student";
                //return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
                const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
                return this.http.post<any>(url, data, { headers, observe: 'response' });
              }
  
                //For Student compare
            ResearcherStudentCompare(data:any){
              const url=environment.commonUrl+"/api/Researcher/PostResearcherCompareWithPubMetrics?ResearcherType=Student";
              return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
              }

       //For country dropdown
         getCountryDropDown(country){
           const url= environment.commonUrl+"/api/Search/GetSearchForAutoComplete?SearchColumn=Country&SearchString="+country;
           return this.http.get(url,this.jwt()).pipe(map((res) => res))
         }

        // To get research area
        getResearchAreaList(){
          const url=environment.commonUrl+"/api/Master/GetMasterDropDownValues?Columnname=researcharea";
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }
         
        //facultycompare list
       
        ResearcherCompare(data:any){
          const url=environment.commonUrl+"/api/Researcher/PostResearcherCompareWithPubMetrics";
          return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
          }

        //RFS TITLE SEARCH
        GetRFSTitle(title){
          const url=environment.commonUrl+"/api/Search/GetPublicationForDOIorTitle?IsTitle=1&SearchText="+title;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        //RFS DOI SEARCH
        GetRFSDoi(doi){
          const url=environment.commonUrl+"/api/Search/GetPublicationForDOIorTitle?IsDOI=1&SearchText="+doi;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        //RFS VALIDATING PUBLICATIONS
        GetPubValidate(userId,pubId,pubsourceName,type,title){
          if(pubId==null){
            pubId="";
          }
          const url=environment.commonUrl+"/api/Search/GetRFSPublicationUserAvailability?userId="+userId+"&type="+type+"&publicationId="+pubId+"&publicationTitle="+title+"&publicationSource="+pubsourceName;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        //Save data in RFS
        SaveRFS(userId,roleId,data){
          const url=environment.commonUrl+"/api/Publication/SaveRFSPublicationQueue?loginUserId="+userId+"&loginUserRoleId="+roleId;
          return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
        }

        //delete data in rfs
        DeleteRfs(userId,roleId,data){
          const url=environment.commonUrl+"/api/Publication/SaveRFSPublicationQueue?loginUserId="+userId+"&loginUserRoleId="+roleId;
         return this.http.post(url,data,this.jwt()).pipe(map((res) => res))

        }

          //Non customer university with list of schoo;
          NoncusUniversitySch(name){
            const url=environment.commonUrl+"/api/Search/GetSearchForAutoComplete?SearchColumn=School&SearchString="+name;
            return this.http.get(url,this.jwt()).pipe(map((res) => res))
          }


        //Non customer university with list of institute
        NoncusUniversityInst(name){
          const url=environment.commonUrl+"/api/Search/GetSearchForAutoComplete?SearchColumn=Institute&SearchString="+name;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        //Non customer university with list of institute
        NoncusUniversityDept(name){
          const url=environment.commonUrl+"/api/Search/GetSearchForAutoComplete?SearchColumn=Department&SearchString="+name;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }


        //Get file path for upload
        GetPath(universityId,userId,documentTypeId){
          const url=environment.commonUrl+"/api/Master/GetFilePathForUpload?universityId="+universityId+"&userId="+userId+"&documentTypeId="+documentTypeId;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        //Validation publication based on profile
        pubValidation(PublicationId,userId,status){
          const url=environment.commonUrl+"/api/Publication/UpdateYTVStatus?PublicationId="+PublicationId+"&Userid="+userId+"&Status="+status;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        //For faculty rfs support list
        getRFSlist(roleId,userId,univId){
          const url=environment.commonUrl+"/api/Researcher/GetRFSPubResearcherRequestSearch?userid="+userId+"&loginUserId="+userId+"&LoginUserRoleId="+roleId;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        //get service request
      getServiceRequest(roleId,userId,univId){
        let url=environment.commonUrl+"/api/SRQNotIf/GetServiceRequests?roleId="+roleId+"&loginUserId="+userId;
        if(roleId!=12){
          url=url+"&UniversityId="+univId;
        }
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
       } 

       // Insert or New request

       updateServiceRequest(data,roleid,userid){
         let url = environment.commonUrl+"/api/SRQNotIf/InsUpdServiceRequests?RoleId="+roleid+"&LoginUserId="+userid;
         return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
       }

       /// PRIORITY LIST
        getPriorityList(){
          let url=environment.commonUrl+"/api/Master/GetMasterDropDownValues?columnName=PRIORITY";
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        // Type and Categories for given Type
        getTypeandCategory(){
          let url=environment.commonUrl+"/api/SRQNotIf/GetCategoriesForServiceType?ServiceType=SERVICEREQUEST";
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        getProfileDashboardCount(univid,roleid,levelid,locationid,schoolid,instituteid,deptid){
          let url=environment.commonUrl+"/api/Home/GetPubDashboardPubCntByLayerLevel?UniversityId="+univid+"&RoleId="+roleid+"&LevelId="+levelid;
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

        getProfileDbCount(univid,roleid,levelid,locationid,schoolid,instituteid,deptid){

          let url=environment.commonUrl+"/api/Home/GetPubDashboardPubCntByDBLayerLevel?UniversityId="+univid+"&RoleId="+roleid+"&LevelId="+levelid;
          if(locationid!=null||locationid!=null){
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
        getProfileCollabCount(univid,roleid,levelid,locationid,schoolid,instituteid,deptid){

          let url=environment.commonUrl+"/api/Home/GetDashboardPubCountByCntryCollaboration?UniversityId="+univid+"&RoleId="+roleid+"&LevelId="+levelid;
          if(locationid!=null||locationid!=null){
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

        // piechart and barchart
        getArticlechart(userId,univId){
          const url=environment.commonUrl+"/api/Home/GetPublicationCntByArticleType?universityId="+univId+"&userId="+userId;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }


        getAffiliationchart(userId,univId){
          const url=environment.commonUrl+"/api/Home/GetPublicationCntByInHouse?universityId="+univId+"&userId="+userId;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        getDatabasechart(userId,univId){
          const url=environment.commonUrl+"/api/Home/GetPublicationCntByDB?universityId="+univId+"&userId="+userId;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

       getrfseditdata(userid,roleid){
           const url=environment.commonUrl+"/api/Researcher/GetRFSPubResearcherRequestSearch?userid="+userid+"&loginUserId="+userid+"&LoginUserRoleId="+roleid;
           return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

      getUserAvailablity(value,univId){
        const url=environment.commonUrl+"/api/Master/GetUniquenessCheck?ColumnName=EMPLOYEEID&Value="+value+"&UniversityId="+univId;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

      // List of role for Admin/support Admin
      getRoleList(universityId,roleId){
        const url=environment.commonUrl+"/api/Master/GetRolesUserCreation?universityId="+universityId+"&RoleId="+roleId;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

      //Check layer type
      getLayerType(univId,roleId,userId){
        const url= environment.commonUrl+"/api/Account/GetUniversityInfo?universityId="+univId+"&roleId="+roleId+"&loginUserId="+userId;
        return this.http.get(url,this.jwt()).pipe(map((res) => res))
      }

    getUnivLocSchInstDept(univId,roleId,userId,locationid,schoolid,instituteid,deptid){
      // /api/Master/GetUnivLocSchInstDeparment?universityId=2&roleId=6&loginUserId=371
       let url=environment.commonUrl+"/api/Home/GetUnivLocSchInstDeparment?universityId="+univId+"&roleId="+roleId;
      if(locationid!=null||locationid!=undefined){
        url=url+"&locationid="+locationid;
      }
      if(schoolid!=null||schoolid!=undefined){
        url=url+"&schoolId="+schoolid;
      }
      if(instituteid!=null||instituteid!=undefined){
        url=url+"&instituteId="+instituteid;
      }
      if(deptid!=null||deptid!=undefined){
        url=url+"&departmentId="+deptid;
      }
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }

    getdfsedit(publicationid){
      let url=environment.commonUrl+"/api/Publication/GetPublicationForEdit?publicationId="+publicationid;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }

    getpublication(publicationid,univId)
    {
      let url=environment.commonUrl+"/api/Home/GetPublicationDetailsById?publicationId="+publicationid+"&UniversityId="+univId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }
    getHomeCmp(data){
      let url=environment.commonUrl+"/api/Home/PostDashboardMetricsCompare";
     return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
   }

   getUnivSubscriptionModule(univId){
    let url=environment.commonUrl+"/api/Account/GetUnivSubscriptionModuleCheck?universityId="+univId;
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
   }

   getresearcharea(univId,roleId){
    let url=environment.commonUrl+"/api/Home/GetDashboardPubCountByResearchArea?UniversityId="+univId+"&RoleId="+roleId;
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
   }

  //  DFS country list
  getAvailableCountry(){
    let url=environment.commonUrl+"/api/Master/GetCountry";
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
  }

  // Filter state by country
  getAvailableState(id){
    let url=environment.commonUrl+"/api/Master/GetStatesByCountry?countryId="+id;
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
  }

  //Filter location by state and country
  getAvailableLocation(id,stateId){
    let url=environment.commonUrl+"/api/Master/GetLocationsByCountryState?countryId="+id+"&stateId="+stateId;
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
  }

  //  Add new location or state
  newLocation(data,userId){
    let url=environment.commonUrl+"/api/Support/InsUpdLocationByStateCountry?LoginUserId="+userId;
     return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
  }

  getdropboxlevel(publicationid,userId){
    let url=environment.commonUrl+"/api/Publication/GetPubLevelDropbox?publicationId="+publicationid+"&Userid="+userId;
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
  }

  updatedropbox(data:Publication,userId,roleid,universityid){
    let url=environment.commonUrl+"/api/Publication/UpdatePubUserDropbox?loginUserId="+userId+"&loginUserRoleId="+roleid+"&universityId="+universityid;
    return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
  }

 getPatentDetailList(univId,userId){
    let url=environment.commonUrl+"/api/Patent/GetResearcherPatents?universityId="+univId+"&userId="+userId;
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
 }

 //SUBSCRIPTIONTYPE
  getSubType(){
    let url=environment.commonUrl+"/api/Master/GetMasterDropDownValues?columnName=SUBSCRIPTIONTYPE";
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
  } 

  // STREAM
  getStreamList(){
    let url=environment.commonUrl+"/api/Master/GetMasterDropDownValues?columnName=STREAM";
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
  }

  // Save DFS source 
 saveDFSSrcTitle(data:any,userId,roleId){
    let url=environment.commonUrl+"/api/Journal/SaveDFSPubSourceQueue?loginUserId="+userId+"&loginUserRoleId="+roleId;
    return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
  }

    getUnivCheckModule(id){
      let url=environment.commonUrl+"/api/Home/GetUnivModuleCheck?universityId="+id;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }
  
}