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

           GetDashboard(UniversityId,RoleId,Userid){
          
           const url=environment.commonUrl+"/api/Home/GetDashboard?UniversityId="+UniversityId+"&RoleId="+RoleId+"&LoginUserid="+Userid;          
           return this.http.get(url, this.jwt()).pipe(map((res) => res))         
          
           }
           GetPubFacultyList(universityId,roleId,loginUserId) {

             const url=environment.commonUrl+"/api/Researcher/GetResearcherList?universityId="+universityId+"&roleId="+roleId+"&loginUserId="+loginUserId;         
             return this.http.get(url, this.jwt()).pipe(catchError(this.error));       
             // map((res) => res))          
             }
       
          GetProfile(UniversityId,id:any) {
            const url=environment.commonUrl+"/api/Researcher/GetResearcher?UniversityId="+UniversityId+"&AuthorId="+id;
            return this.http.get(url,this.jwt()).pipe(
                  map((res) => res),
                    catchError(this.handleError)
               );
          }

          GetBasicProfile(UniversityId,id:any,roleId,loginUserId) {
            const url=environment.commonUrl+"/api/Researcher/GetResearcherBasicInfo?universityId="+UniversityId+"&userId="+id +"&LoginUserRoleId="+roleId+"&loginUserId="+loginUserId ;
            return this.http.get<any>(url, { observe: 'response' }); 
          }

         researcherPublicationDetails(UniversityId,id,roleId,loginUserId) {
          const url=environment.commonUrl+"/api/Researcher/GetResearcherPublications?universityId="+UniversityId+"&userId="+id +"&LoginUserRoleId="+roleId+"&loginUserId="+loginUserId;
                // return this.http.get(url, this.jwt()).pipe(
                //   map((res) => res),
                //   catchError(this.handleError)
                // );
                return this.http.get<any>(url, { observe: 'response' }); 
              }
              
        GetArticleRecords(UniversityId,id:any){
          const url=environment.commonUrl+"/api/Researcher/GetResearcherArticleCounts?UniversityId="+UniversityId+"&AuthorId="+id;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }
  
        GetResearcherDocumentCounts(UniversityId,id:any,roleId,loginUserId){
         const url=environment.commonUrl+"/api/Researcher/GetResearcherDocumentCntByModule?universityId="+UniversityId+"&userId="+id+"&LoginUserRoleId="+roleId+"&loginUserId="+loginUserId;
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
          // const url="https://researgence.ai:81/api/Search/GetSearchForAutoComplete?SearchColumn=University&SearchString=";
          return this.http.get(url,this.jwt()).pipe(map((res)=>res))
        }
        
      AuthorSearch(id:any,key:any){
            //  const url="https://researgence.ai:81/api/Search/GetSearchAuthor?universityId="+id+"&SearchText="+key;
            const url=environment.commonUrl+"/api/Search/GetSearchAuthor?universityId="+id+"&SearchText="+key;
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
        const url=environment.commonUrl+"/api/Master/GetMasterDropDownValues?columnName="+type;
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

      // get AppNo for patent
      getAppNoList(name){     
        const url=environment.commonUrl+"/api/Search/GetSearchForAutoComplete?SearchColumn=APPLICATIONNUMBER&SearchString="+name;
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
        // const url="https://researgence.ai:81/api/Search/GetSearchForAutoComplete?SearchColumn=University";
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
      updateProfile(data:any,loginUserId,loginUserRoleId,userId){        
        let url=environment.commonUrl+"/api/User/UpdateUserInfo?loginUserId="+loginUserId+"&loginUserRoleId="+loginUserRoleId;
        if(loginUserRoleId==17){
          url=url+"&behalfUserId="+userId;
        }
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

            savePublicationNew(data:any,loginUserId,loginUserRoleId){
              const url=environment.commonUrl+"/api/publication/SavePublicationWithAuthSeqOrder?loginUserId="+loginUserId+"&loginUserRoleId="+loginUserRoleId+"&source=DFS";
              return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
            }

            savePubNewRFS(data:any,loginUserId,loginUserRoleId,rfsrequestqueue){
              const url=environment.commonUrl+"/api/publication/SavePublicationWithAuthSeqOrder?loginUserId="+loginUserId+"&loginUserRoleId="+loginUserRoleId+"&source=RFS&rfsRequestQueueId="+rfsrequestqueue;
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
          const url=environment.commonUrl+"/api/Master/GetMasterDropDownValues?columnName=Articletype";
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        // Source Indexing values for Qrank,SCI,ABDC,UGCCare
        getSourceIndexingValue(value){
          const url=environment.commonUrl+"/api/Master/GetMasterDropDownValues?columnName="+value;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        // Faculty list Pagination
        getfacultyListPage(data){
          const url=environment.commonUrl+"/api/Researcher/PostResearcherList";
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
          
          // report for prs kra
        GetPRSKRAEligiblityList(univId,roleId,userId,location,school,institute,department,deptgrpId){
          let url=environment.commonUrl+"/api/Report/GetPRSKRAEligiblityList?UniversityId="+univId+"&RoleId="+roleId+"&LoginUserId="+userId;
           if(location!=null||location!=undefined){
            url = url+"&Locationid="+location;
           }
           if(school!=null||school!=undefined){
            url = url+"&SchoolId="+school;
           }
           if(institute!=null||institute!=undefined){
            url = url+"&InstituteId="+institute;
           }
           if(department!=null||department!=undefined){
            url = url+"&DepartmentId="+department;
           }
           if(deptgrpId!=null||deptgrpId!=undefined){
            url = url+"&DepartmentGroupId="+deptgrpId;
           }
    
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }
 
        //  API for prs-kra-scoring
         GetPRSKRAScoring(univId,roleId,userId,location,school,institute,department,deptgrpId){
          let url=environment.commonUrl+"/api/Report/GetPRSKRAScoring?UniversityId="+univId+"&RoleId="+roleId+"&LoginUserId="+userId;
           if(location!=null||location!=undefined){
            url = url+"&Locationid="+location;
           }
           if(school!=null||school!=undefined){
            url = url+"&SchoolId="+school;
           }
           if(institute!=null||institute!=undefined){
            url = url+"&InstituteId="+institute;
           }
           if(department!=null||department!=undefined){
            url = url+"&DepartmentId="+department;
           }
           if(deptgrpId!=null||deptgrpId!=undefined){
            url = url+"&DepartmentGroupId="+deptgrpId;
           }
    
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        } 
          

          filterResearchTimeLine(data:any){
            const url=environment.commonUrl+"/api/Researcher/PostResearcherlistWithTimeline";
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
           return this.http.post<any>(url, data, { headers, observe: 'response' });
          }

          researchTimeLineList(data:any){
            const url=environment.commonUrl+"/api/Researcher/PostResearcherlistWithTimeline";
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
        SaveRFS(userId,roleId,data,behalfUserId){
          let url=environment.commonUrl+"/api/Publication/SaveRFSPublicationQueue?loginUserId="+userId+"&loginUserRoleId="+roleId;
          if(roleId==17){
            url=url+"&behalfUserId="+behalfUserId;
          }
          return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
        }

        //delete data in rfs
        DeleteRfs(userId,roleId,data,behalfUserId){
          let url=environment.commonUrl+"/api/Publication/SaveRFSPublicationQueue?loginUserId="+userId+"&loginUserRoleId="+roleId;
          if(roleId==17){
            url=url+"&behalfUserId="+behalfUserId;
          }
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
        pubValidation(PublicationId,userId,status,roleId,currUserId){
          let url=environment.commonUrl+"/api/Publication/UpdateYTVStatus?PublicationId="+PublicationId+"&Userid="+userId+"&Status="+status;
          if(roleId==17){
            url=url+"&behalfUserId="+currUserId;
          }
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        // Validation for Patent
        patValidation(patId,userId,status,roleId,currUserId){
          let url=environment.commonUrl+"/api/Patent/UpdatePatentYTVStatus?PatentId="+patId+"&Userid="+userId+"&Status="+status;
          if(roleId==17){
            url=url+"&behalfUserId="+currUserId;
          }
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        //For faculty rfs support list
        getRFSlist(roleId,userId,univId){
          const url=environment.commonUrl+"/api/Researcher/GetRFSPubResearcherRequestSearch?userid="+userId+"&loginUserId="+userId+"&LoginUserRoleId="+roleId;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        // List of project
        getProjectList(univId,userId,roleId){
          const url=environment.commonUrl+"/api/Projects/GetRFSProjectCreatedList?universityId="+univId+"&loginUserId="+userId+"&LoginUserRoleId="+roleId;
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

        getProfileDashboardCount(univid,roleid,userid,levelid,locationid,schoolid,instituteid,deptid,groupId){
          let url=environment.commonUrl+"/api/Home/GetPubDashboardPubCntByLayerLevel?UniversityId="+univid+"&RoleId="+roleid+"&LoginUserId="+userid+"&LevelId="+levelid;
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
          if(groupId!=null||groupId!=undefined){
            url=url+"&DepartmentGroupId="+groupId;
          }
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        getProfileDbCount(univid,roleid,userid,levelid,locationid,schoolid,instituteid,deptid,groupId){

          let url=environment.commonUrl+"/api/Home/GetPubDashboardPubCntByDBLayerLevel?UniversityId="+univid+"&RoleId="+roleid+"&LoginUserId="+userid+"&LevelId="+levelid;
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
          if(groupId!=null||groupId!=undefined){
            url=url+"&DepartmentGroupId="+groupId;
          }
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }
        getProfileCollabCount(univid,roleid,userid,levelid,locationid,schoolid,instituteid,deptid,groupId){

          let url=environment.commonUrl+"/api/Home/GetDashboardPubCountByCntryCollaboration?UniversityId="+univid+"&RoleId="+roleid+"&LoginUserId="+userid+"&LevelId="+levelid;
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
          if(groupId!=null||groupId!=undefined){
            url=url+"&DepartmentGroupId="+groupId;
          }
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        // piechart and barchart
        getArticlechart(univId,userId,roleId,loginUserId){
          const url=environment.commonUrl+"/api/Researcher/GetPublicationCntByArticleType?universityId="+univId+"&userId="+userId+"&LoginUserRoleId="+roleId+"&loginUserId="+loginUserId;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }


        getAffiliationchart(userId,univId,roleId,loginUserId){
          const url=environment.commonUrl+"/api/Researcher/GetPublicationCntByInHouse?universityId="+univId+"&userId="+userId+"&LoginUserRoleId="+roleId+"&loginUserId="+loginUserId;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

        getDatabasechart(userId,univId,roleId,loginUserId){
          const url=environment.commonUrl+"/api/Researcher/GetPublicationCntByDB?universityId="+univId+"&userId="+userId+"&LoginUserRoleId="+roleId+"&loginUserId="+loginUserId;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }

       getrfseditdata(userId,roleId){
           const url=environment.commonUrl+"/api/Researcher/GetRFSPubResearcherRequestSearch?userid="+userId+"&loginUserId="+userId+"&LoginUserRoleId="+roleId;
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
       let url=environment.commonUrl+"/api/Master/GetUnivLocSchInstDeparment?universityId="+univId+"&roleId="+roleId+"&loginUserId="+userId;
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

    getUncategoryUnivLocSchInstDept(univId,roleId,userId,locationid,schoolid,instituteid,deptid){
       let url=environment.commonUrl+"/api/Master/GetUncategorizedDepartments?universityId="+univId+"&roleId="+roleId+"&loginUserId="+userId;
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

    getdfsedit(publicationid,univId){
      let url=environment.commonUrl+"/api/Publication/GetPublicationForEdit?publicationId="+publicationid+"&UniversityId="+univId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }

    getpublication(publicationid,univId)
    {
      let url=environment.commonUrl+"/api/Publication/GetPublicationDetailsById?publicationId="+publicationid+"&UniversityId="+univId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }
    getHomeCmp(data){
      let url=environment.commonUrl+"/api/Home/PostDashboardMetricsCompare";
     return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
   }

   getUnivSubscriptionModule(univId,roleId,userId){
    let url=environment.commonUrl+"/api/Account/GetUnivSubscriptionModuleCheck?universityId="+univId+"&roleId="+roleId+"&loginUserId="+userId;
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
   }

   getresearcharea(univId,roleId,userId,locationid,schoolid,instituteid,deptid){
    let url=environment.commonUrl+"/api/Home/GetDashboardPubCountByResearchArea?UniversityId="+univId+"&RoleId="+roleId+"&LoginUserId="+userId;
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

  updatedropbox(data:Publication,userId,roleid,universityid,behalfUserId){
    let url=environment.commonUrl+"/api/Publication/UpdatePubUserDropbox?loginUserId="+userId+"&loginUserRoleId="+roleid+"&universityId="+universityid;
    if(roleid==17){
      url=url+"&behalfUserId="+behalfUserId;
    }
    return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
  }

 getPatentDetailList(univId,userId,loginUserId,roleId){
    let url=environment.commonUrl+"/api/Patent/GetResearcherPatents?universityId="+univId+"&userId="+userId+"&loginUserId="+loginUserId+"&LoginUserRoleId="+roleId;
    return this.http.get(url,this.jwt()).pipe(map((res) => res))
 }

//  Individual Profile list for Edited publications

    getEditedPubList(univId,userId,roleId,loginUserId){
      let url=environment.commonUrl+"/api/Researcher/GetResearcherEditedPublications?universityId="+univId+"&userId="+userId+"&LoginUserRoleId="+roleId+"&loginUserId="+loginUserId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }

    // Project Details
    getProjectDetails(univId,userId,roleId,loginUserId){
      let url=environment.commonUrl+"/api/Projects/GetResearcherProjects?universityId="+univId+"&userId="+userId+"&LoginUserRoleId="+roleId+"&loginUserId="+loginUserId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
    }

   // Copyright list 
     getCopyrightList(univId,userId,loginUserId,roleId){
      let url=environment.commonUrl+"/api/Copyright/GetResearcherCopyrights?universityId="+univId+"&userId="+userId+"&loginUserId="+loginUserId+"&LoginUserRoleId="+roleId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
     }

     //designpatent list
     getdesignPatentDetailList(univId,userId,loginUserId,roleId){
      let url=environment.commonUrl+"/api/DesignPatent/GetResearcherDesignPatents?universityId="+univId+"&userId="+userId+"&loginUserId="+loginUserId+"&LoginUserRoleId="+roleId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res))
     }

      //Trademark list
      getTrademarkDetailList(univId,userId,loginUserId,roleId){
        let url=environment.commonUrl+"/api/Trademark/GetResearcherTrademarks?universityId="+univId+"&userId="+userId+"&loginUserId="+loginUserId+"&LoginUserRoleId="+roleId;
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

  // Patent country
  patentCountry(){
     let url=environment.commonUrl+"/api/Master/GetMasterDropDownValues?columnName=PATENTOFFICE";
     return this.http.get(url,this.jwt()).pipe(map((res) => res))
  } 

  getPatentByAppNo(appNo,id){
    let url= environment.commonUrl+"/api/Patent/GetPatentByApplicationNumber?ApplicationNumber="+appNo+"&PatentenOfficeId="+id;
    return this.http.get(url,this.jwt()).pipe(map((res) => res));
  }

  // Patent RFS Queue
  savePatent(data,userId,roleId){
    let url= environment.commonUrl+"/api/Patent/SaveRFSPatentQueue?loginUserId="+userId+"&loginUserRoleId="+roleId;
    return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
  }

  // for patent list
   getAddedPatentList(userId,loginUserId,roleId){
      let url= environment.commonUrl+"/api/Patent/GetRFSPatRequestedUserDetails?UserId="+userId+"&LoginUserId="+loginUserId+"&LoginUserRoleId="+roleId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res));
   }

  // patent availability
   getPatentAvailability(userId,type,title,appno,officeId){
    let url= environment.commonUrl+"/api/Patent/GetRFPatentUserAvailability?userId="+userId+"&type="+type+"&PatentId=0&patentTitle="+title+"&ApplicationNumber="+appno+"&PatentOfficeId="+officeId;
    return this.http.get(url,this.jwt()).pipe(map((res) => res)); 
  }

  // Module check based on university
  getUnivCheckModule(univId){
    let url= environment.commonUrl+"/api/Account/GetUnivModuleCheck?universityId="+univId;
    return this.http.get(url,this.jwt()).pipe(map((res) => res)); 
  }

    // Patent RFS Queue link
    savePatentLink(data,userId,roleId){
      let url= environment.commonUrl+"/api/Patent/SaveRFSPatentLinkQueue?loginUserId="+userId+"&loginUserRoleId="+roleId;
      return this.http.post(url,data,this.jwt()).pipe(map((res) => res));
    }

    // Application status list
    getAppStatusList(){
      let url= environment.commonUrl+"/api/Patent/GetPatentStatusAndStage";
      return this.http.get(url,this.jwt()).pipe(map((res) => res)); 
    }

    savePatentDFS(data:any,loginUserId,loginUserRoleId,rfsrequestqueue,inv,type){
      let url=environment.commonUrl+"/api/Patent/SavePatent?loginUserId="+loginUserId+"&loginUserRoleId="+loginUserRoleId;
      if(rfsrequestqueue!=null){
       url=url+"&RFSPatentQueueId="+rfsrequestqueue;
      }
      url=url+"&IsApplicantInventorSame="+inv+"&LoadSource="+type;
      return this.http.post(url,data,this.jwt()).pipe(map((res) => res))
    }

    //Get record for edit patent
    patentEditRecord(id,univId,userId,roleId){
      let url= environment.commonUrl+"/api/Patent/GetPatentForEdit?patentId="+id+"&UniversityId="+univId+"&loginUserId="+userId+"&LoginUserRoleId="+roleId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res));
    }

    // projectDetailList
    getListProject(id,univId){
      let url= environment.commonUrl+"/api/Projects/GetProjectDetailsById?ProjectId="+id+"&UniversityId="+univId;
      return this.http.get(url,this.jwt()).pipe(map((res) => res));
    }

    // Save new project
    addNewProject(data,userId,roleId){
      let url= environment.commonUrl+"/api/Projects/SaveProject?loginUserId="+userId+"&loginUserRoleId="+roleId+"&LoadSource=RFS&RFSProjectQueueId=0";
      return this.http.post(url,data,this.jwt()).pipe(map((res) => res));
    }

    getExistingAppNo(appNo){
      let url= environment.commonUrl+"/api/Patent/GetPatentByApplicationNumber?ApplicationNumber="+appNo;
      return this.http.get(url,this.jwt()).pipe(map((res) => res));
    }

    // ------------------- SUBSCRIPTION REMINDER / ALERTS -------------------

    // 🔹 For Client (Part A)
    GetUniversityPlanExpiryAlerts(univId, roleId, loginUserId) {
      const url = environment.commonUrl + 
        "/api/Account/GetUniversityPlanExpiryAlerts?universityId=" + univId +
        "&roleId=" + roleId + 
        "&loginUserId=" + loginUserId;

      return this.http.get(url, this.jwt()).pipe(
        map((res) => res),
        catchError(this.handleError)
      );
    }

    // 🔹 For Super Admin (Part B - Summary)
    GetUniversityPlanExpirySummary(roleId, loginUserId) {
      const url = environment.commonUrl + 
        "/api/Account/GetUniversityPlanExpirySummary?roleId=" + roleId +
        "&loginUserId=" + loginUserId;

      return this.http.get(url, this.jwt()).pipe(
        map((res) => res),
        catchError(this.handleError)
      );
    }

    getSummarylist(roleId,userId){
          const url=environment.commonUrl+"/api/Account/GetUniversityPlanExpiryAlerts?userid="+userId+"&loginUserId="+userId+"&LoginUserRoleId="+roleId;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }
          getSummary(roleId,userId){
          const url=environment.commonUrl+"/api/Account/GetUniversityPlanExpirySummary?userid="+userId+"&loginUserId="+userId+"&LoginUserRoleId="+roleId;
          return this.http.get(url,this.jwt()).pipe(map((res) => res))
        }


}
