import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { environment } from 'src/environments/environment';
import { AdminclientService } from '../../adminclient/adminclient.service';
import { FacultiesService } from '../../faculties/faculties.service';
import * as XLSX from 'xlsx';
import { ExcelExportService } from 'src/app/shared/services/excel.service';


@Component({
  selector: 'app-rfs-list-faculty',
  templateUrl: './rfs-list-faculty.component.html',
  styleUrls: ['./rfs-list-faculty.component.scss','./../../../../assets/given/selected.css','./../../../../assets/given/newcss/style.css'],

})
export class RfsListFacultyComponent implements OnInit {
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;

  public universityList:any;
  public userName:string;
  public universityName:any;
  public universityId:string="";
  public showDropdown:boolean=false;
  public fill:any;
  public user:any=[]
  isMenuOpen:boolean;
  dataList:any[]=[];
  masterSelected:boolean;
  checklist:any[]=[];
  checkedList:any;
  selectedDataList: any[] = [];
  supportAdmin="11";
  support="12";
  pdfNew:any;
  universityFilter:any;
  name: string;
  data: any;
  filteredData: any[];
universityShortName: any;
hideDrop:boolean=false;
filterTitle: any[]=[];
searchData: String="";
  university: any;
  page=1;
  pageSize = 20;
 collectionSize:number=0;
  pageSizes: any[] = ["10","15","20","100"]; 
  pdfPath:any;
  tempPdf:string;
   //sort
   currentSortColumn: string;
   currentSortDirection: string;
  isAscending: any;
  dateA:any;
  dateB:any;
  Name: any;
  AdvanceSearch:boolean=false;
  searchQuery:string="";
  startrow:number=0;
  endrow:number=20;
  totalPages: number;
roleName: any;
stickyEnable: any;
isScrolled: any;
role: any;
fileName: 'Rfs-Faculty.xlsx';

// edit and delete
queueId:Number=0;
  publicationId:Number=0;
  sourceId:Number=0;
  webLink: string="";
  rfsTypeId: number;
  sourcename: string="";
  pdfLocation: string="";
  doi: string="";
  title: string="";
  remark: string="";
  ActiontypeId: number=0;
  editFilter: any;
  filterdata: any;
  status: any;
  type: any;
  isReadOnly: boolean=false;
  conditiondata: any;
  editdata: any;
  requestid: number=0;
  requestuserDetail: any;
  linkrequestid: number=0;

  enableBox: boolean = false;
  enableAdd:boolean =false;
  enableUnmatch:boolean=false;
  EnableDoi:boolean=false;
  titleEnable:boolean=false;
  checkDTtitle:any;
  filterTitleAdd:any;
  searchDataAdd:string;
  publicationIdAdd:Number;
  pubSourceName:string;
  typeAdd:string;
  publicationTitle:string;
  userValues:any;
  messageValue:boolean=false;
  showData:boolean=false;
  checkValue:any;
  sourceIdAdd:Number;
  crossTitle:string;
  crossSourceName:string;
  readOnly:boolean=false;
  rfsId:any;
  pdfEnable:boolean=false;
  noDOI:boolean=false;
  popupAlert:string;
  crossRefValues:any;
  file: File | null = null;
  doiAdd:string;
  webLinkAdd:string="";
  rfsDone:boolean=false;
  pdfName: string | null = null;
  pdfStatus: boolean = false;
  pdfPostName:string;

  constructor(private service:AdminclientService, private authservice:AuthService,private route: ActivatedRoute,private search: CommonsearchService,
    private menuService:MenuService, private router:Router, private http: HttpClient, private facultyservice: FacultiesService,private excel:ExcelExportService) { 
    
    }

      ngOnInit() {
      
        
            this.menuService.isMenuOpen$.subscribe(isOpen => {
              this.isMenuOpen = isOpen;
            });
        
            this.user=this.authservice.getUserDetail();
            console.log(this.user);
            this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            this.userName=this.authservice.getProfileObs();
             //For rolename getting
             this.authservice.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
              this.role=x;
              const data=this.role.filter(item=> item.roleId==this.userName);
              this.roleName=data[0].roleName;
              console.log(this.roleName)
              }) 


            if(this.userName==this.supportAdmin){
            this.route.params.subscribe(params => {     
              this.universityId=params.univ;  
            });
          }
          
            this.getList();
            this.service.getUniversitytitle(this.user.UserId).subscribe(data => {
              this.data = data;
              console.log(this.data)
              if(this.userName==this.supportAdmin){
              this.university = this.data.filter(item => item.universityId == this.universityId);
              console.log(this.university);
                this.name = this.university[0].universityName;
                console.log(this.name)
              }        
            });  
        }

          getList() {
            
            this.facultyservice.getRFSlist(this.userName,this.user.UserId,this.universityId).subscribe(x => {
              this.dataList = x as any;

            
            this.conditiondata = this.dataList.map((item) => {
              return {
                  status: item.status,
                  rfstype: item.rfstYpe
              };
             
          }
          );

          this.editdata=this.conditiondata.status;
          console.log(this.editdata);
          
           

           if(this.conditiondata.rfstype=='Linked' && this.conditiondata.status=='New' )
           {
            this.isReadOnly=true;
           }
          else if(this.conditiondata.rfstype=='Linked' && this.conditiondata.status=='Open' )
           {
            this.isReadOnly=true;
           }
           else if(this.conditiondata.rfstype=='Linked' && this.conditiondata.status=='Completed' )
           {
            this.isReadOnly=true;
           }
           else if(this.conditiondata.rfstype=='Linked' && this.conditiondata.status=='Closed' )
           {
            this.isReadOnly=true;
           }
           else if(this.conditiondata.rfstype=="Manual" && this.conditiondata.status=="Completed" )
           {
            this.isReadOnly=true;
           }
           else if(this.conditiondata.rfstype=="Manual" && this.conditiondata.status=='Closed' )
           {
            this.isReadOnly=true;
           }
           else if(this.conditiondata.rfstype=='CrossRef' && this.conditiondata.status=='Closed' )
           {
            this.isReadOnly=true;
           }
           else if(this.conditiondata.rfstype=='CrossRef' && this.conditiondata.status=='Completed' )
           {
            this.isReadOnly=true;
           }

            console.log(this.isReadOnly);
            

                          
              console.log(this.dataList);        
              this.collectionSize=this.dataList.length;
      this.totalPages = Math.ceil(this.collectionSize / this.pageSize); 
      
     this.page = Math.max(1, Math.min(this.page, this.dataList.length));
     
     this.startrow = (this.page - 1) * this.pageSize;
     this.endrow = Math.min(this.startrow + this.pageSize, this.collectionSize);
      console.log(this.page);  
      
      
              
            });          
          
          }

          testNew(pdfLoc){
            
            if(pdfLoc!=null && pdfLoc.trim() !== ''){
            pdfLoc=pdfLoc.slice(0, pdfLoc.lastIndexOf('.'));
            console.log(pdfLoc);
              
              this.tempPdf=pdfLoc;
              console.log(this.tempPdf);  
              const pdfurl=`${environment.nodeServerUrl}/api/pdf?pdfPath=${this.tempPdf}`;
              this.http.get(pdfurl, { responseType: 'blob' }).subscribe((blob: Blob) => {
                const pdfUrl = URL.createObjectURL(blob);
                window.open(pdfUrl, '_blank');
              });
            }
            else{
              alert("Pdf not found");
            }
            
          }

        changeTitle(x:String) {

            this.hideDrop=true;
            this.filterTitle = this.data.filter(e =>
              e.universityName.toLowerCase().includes(x.toLowerCase())
            );
            if (this.filterTitle.length === 0) {
                  this.searchData = x;
              this.hideDrop=false;
              }
              this.hideDrop = this.searchData.length > 0;
          
          }

        onSelectTitle(universityId: number, universityName: string) {
              this.searchData = universityName;
              this.hideDrop=false;
              const matchedUniversity = this.dataList.filter(item => item.universityId === universityId);
              this.dataList=matchedUniversity

              console.log(matchedUniversity);
            
            }

          sort(columnName: string) {
              if (this.currentSortColumn === columnName) {
                this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
              } else {
                this.currentSortDirection = 'asc';
              }
              this.currentSortColumn = columnName;
              this.dataList.sort((a, b) => {
                if (a[columnName] < b[columnName]) {
                  return this.currentSortDirection === 'asc' ? -1 : 1;
                } else if (a[columnName] > b[columnName]) {
                  return this.currentSortDirection === 'asc' ? 1 : -1;
                } else {
                  return 0;
                }
              });
          }

          sortdate(columnName: string) {
            if (this.currentSortColumn === columnName) {
              this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
            } else {
              this.currentSortDirection = 'asc';
            }
            this.currentSortColumn = columnName;
          
            this.dataList.sort((a, b) => {
              const dateA = new Date(a[columnName]);
              const dateB = new Date(b[columnName]);
          
              if (dateA < dateB) {
                return this.currentSortDirection === 'asc' ? -1 : 1;
              } else if (dateA > dateB) {
                return this.currentSortDirection === 'asc' ? 1 : -1;
              } else {
                return 0;
              }
            });
          }

      newRequest()
      {
        this.router.navigate(['/facultyProfiles/faculty/rfs']);

      }

      searchTab(){
  
        this.dataList = this.dataList.filter(item => {
              if (item.publicationTitle!=null) {
                return item.publicationTitle.toLowerCase().includes(this.searchQuery.toLowerCase());
              }
            });
        if(this.searchQuery==""){
          this.getList();
        }
         this.collectionSize=this.dataList.length;
      }

      getPagedData(): any[] {
        const startIndex = (this.page - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.dataList.slice(startIndex, endIndex);
      }
      calculateIndex(indexOnPage: number): number {
        return indexOnPage + 1 + (this.page - 1) * this.pageSize;
      }
    
      onPageSizeChange(size: string){
        this.page = 1; 
        this.pageSize = Number(size);
        this.endrow=this.pageSize+this.startrow;
        this.getList();
      }
    
      onPageChange(page: number) {
        this.page = Math.max(1, Math.min(page, this.totalPages)); 
        
        if (this.page == 1) {
          this.startrow = 0;
        } else {
          this.startrow = (this.page - 1) * this.pageSize; 
        }
        this.endrow = Math.min(this.startrow + this.pageSize, this.collectionSize);  

        // if(this.filterdata==false){
        //   this.getList();   
        // }
        // else
        // {
        //   this.filtertable();
        // }
    }


 @HostListener('window:scroll')
 onWindowScroll() {
         const scrollY = window.scrollY;
     
         if (this.blueheader) {
           const element = this.blueheader.nativeElement;
           
           if (scrollY >=20) {
             element.classList.remove('bluebar_expand');
             element.classList.add('bluebar_collapse');
             this.stickyEnable=true;
           } else {
             element.classList.remove('bluebar_collapse');
             element.classList.add('bluebar_expand');
             this.stickyEnable=false;
           }
         }
 }

 
 exportexcel() {
  this.facultyservice.getRFSlist(this.userName,this.user.UserId,this.universityId).subscribe(x => {
    this.dataList = x as any;

    for(let i=0;i<this.dataList.length;i++){    
      this.dataList[i].Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
}
  
      console.log(this.dataList);

      // Process data and export to Excel
      this.processAndExportToExcel();
    });
}

processAndExportToExcel() {
  // Make modifications to the data
  this.dataList.forEach((x, index) => {
    x["SL.NO"] = index + 1;
   
  });
  
  // Create a new object with the desired column order
  const modifiedDataList = this.dataList.map(({ employeeId, Name, publicationTitle, publicationSourceName, doi, rfstYpe, remark, status, createdBy, createdDate }, index) => {
    // Declare index here, if needed
    return {
      "SL.NO": index + 1,
      "EmployeeId": employeeId,
      "Author Details": Name,
      "Publication Details": "Title :"+ publicationTitle +",Source Name :"+ publicationSourceName +",DOI :"+ doi ,
      "RFS Type": rfstYpe,
      "Remark": remark,
      "Status": status,
      "CreatedBy": createdBy,
      "CreatedDate": createdDate
    };
  });
  
console.log(modifiedDataList);

  
  

  // Export the modified data to Excel
  this.excel.exportAsExcelFile(modifiedDataList, "RfsList");
}


gotoedit(requestId){
  console.log(this.isReadOnly);
  this.router.navigate(['/facultyProfiles/faculty/rfs-edit',requestId]);
}

delete(id){
  this.facultyservice.getRFSlist(this.userName,this.user.UserId,this.universityId).subscribe(x => {
    this.dataList = x as any;

    this.editFilter=this.dataList.filter(item => item.requestId==id);
    console.log(this.editFilter);
    this.filterdata=this.editFilter[0];
    console.log(this.filterdata);
    this.type=this.filterdata.rfstYpe;
    this.requestid=id;

console.log(this.type);


  if(this.type=="Linked"){
    this.rfsTypeId=1;
   }
   if(this.type=="Manual"){
    this.rfsTypeId=3;

   }
   if(this.type=="CrossRef"){
    this.rfsTypeId=2;

   }

   this.service.getRFSSupportUserDetail(this.requestid,this.rfsTypeId).subscribe(item => {
    this.requestuserDetail = item as any;
    console.log(this.requestuserDetail);
    this.linkrequestid=this.requestuserDetail.rfsPublicationLinkRequestId;
  
  console.log(this.linkrequestid);
  console.log(this.requestid);
  

  this.ActiontypeId=5;

const data={
  rfsPublicationQueue: {
    rfsPublicationQueueId: this.requestid,
    rfsPublicationLinkRequestId: this.linkrequestid,
    universityId: parseInt(this.user.UniversityId),
    userId: parseInt(this.user.UserId),
    publicationId: this.publicationId,
    publicationTitle: this.title,
    publicationSourceId: this.sourceId,
    publicationSource: this.sourcename,
    doi: this.doi,
    pdFfileLocation: this.pdfLocation,
    webLink: this.webLink,
    rfsTypeId: this.rfsTypeId,
    swappedUserId: 0,
    isUserAddressSame: true,
    isCorrespondingAuthor: true,
    actionTypeId: this.ActiontypeId,
    remark: this.remark,
    takenBy: 0,
    verifiedBy: 0
  },
  rfsLinkAuthorAdd: {
    universityId: 0,
    universityName: "string",
    userId: 0,
    fullName: "string",
    locationId: 0,
    locationName: "string",
    countryId: 0,
    countryName: "string",
    instituteId: 0,
    instituteName: "string",
    departmentId: 0,
    departmentName: "string",
    correspondingEmail: "string",
    correspondingAuthor: 0
  }
}
console.log(data);

const confirmation = confirm('Confirm to Delete');

   if(confirmation){
this.facultyservice.DeleteRfs(this.user.UserId,this.userName,data).subscribe(x=>{
  const confirmation = confirm('Deleted  Successfully');
  if (confirmation) {
    this.ngOnInit();
  }
});

}

});

});
}

    closeAdd() {
      this.enableBox = false;
      this.enableUnmatch = false;
    }

      //add new
      resetForm() {
        this.enableBox = true;
        this.enableAdd = true;
        this.pdfLocation=null;
        this.crossTitle="";
        this.crossSourceName="";
        this.doiAdd="";
        this.webLinkAdd="";
        this.searchDataAdd="";
      }

      enableDoi() {
        this.enableBox = true;
        this.enableAdd = false;
        this.EnableDoi = true;
        this.facultyservice.GetPath(this.user.UniversityId, this.user.UserId, '2').subscribe(x => {
          this.pdfPath = x;
          console.log(this.pdfPath);
        })
      }

      //Enable checkbox based on DOI/Title
      updateValues(data) {
        console.log(this.checkDTtitle);
        
        if (this.checkDTtitle == "Doi") {
          this.titleEnable = false;
        }
      }

      changeTitleAdd(x) {
        if (this.checkDTtitle == 'Title') {
          if (x.length > 4) {
            this.titleEnable = true;
            this.facultyservice.getTitleList(x).subscribe(data => {
              this.filterTitleAdd = data;
              if (this.filterTitleAdd.length == 0) {
                this.searchDataAdd = x;
                this.titleEnable = false;
              }
            })
          }
        }
      }

      onSelectTitleAdd(val) {
        this.searchDataAdd = val;
        console.log(this.searchDataAdd);
        this.titleEnable = false;
      }


      processData() {
        //To search user publication is already exists or not
        this.facultyservice.GetPubValidate(this.user.UserId, this.publicationIdAdd, this.pubSourceName, this.typeAdd, this.publicationTitle).subscribe(x => {
          this.userValues = x;
          console.log(this.userValues);
          if (this.userValues.messegeId == '5') {
            console.log(this.userValues.messegeId);
            this.messageValue = true;
          }
          this.showData = true;
        })
    
      }


      searchRfs() {
        //check values based on title
        if (this.checkDTtitle == 'Title') {
          this.facultyservice.GetRFSTitle(this.searchDataAdd).subscribe(x => {
            this.checkValue = x as any;
            if (this.checkValue.length == 1) {
              this.crossTitle = this.checkValue[0].publicationTitle;
              this.crossSourceName = this.checkValue[0].publicationSourceName;
              this.publicationIdAdd = this.checkValue[0].publicationId;
              this.sourceIdAdd = this.checkValue[0].publicationSourceId;
              this.publicationTitle = this.checkValue[0].publicationTitle;
              this.typeAdd = "L";
              this.readOnly = true;
              this.rfsId = 1;
              console.log(this.checkValue);
              this.pdfEnable = false;
              this.processData();
            }
            else {
              this.typeAdd = "M";
              this.facultyservice.GetPubValidate(this.user.UserId, this.publicationIdAdd, this.pubSourceName, this.typeAdd, this.searchDataAdd).subscribe(x => {
                this.userValues = x;
                if (this.userValues.messegeId != '5') {
                  this.noDOI = true;
                  this.pdfEnable = true;
                  this.publicationTitle = this.searchDataAdd;
                  this.rfsId = 3;
                  this.processData();
                }
                else {
                  this.noDOI = true;
                  this.pdfEnable = true;
                  this.popupAlert = "Title not present in RFS data, Do you want to proceed?";
                  this.rfsId = 3;
                  this.typeAdd = "M";
                  this.publicationIdAdd=null;
                  this.pubSourceName=""; 
                  this.publicationTitle="";
                  this.processData();
                }
              })
            }
    
          })
        }
        else if (this.checkDTtitle == 'Doi') {
          //check values based on DOI number
          this.facultyservice.GetRFSDoi(this.searchDataAdd).subscribe(x => {
            this.checkValue = x;
            if (this.checkValue.length == 1) {
              this.crossTitle = this.checkValue[0].publicationTitle;
              this.crossSourceName = this.checkValue[0].publicationSourceName;
              this.publicationIdAdd = this.checkValue[0].publicationId;
              this.sourceIdAdd = this.checkValue[0].publicationSourceId;
              this.publicationTitle = this.checkValue[0].publicationTitle;
              this.doiAdd = this.searchDataAdd;
              this.typeAdd = "L";
              this.rfsId = 1;
              this.readOnly = true;
              console.log(this.checkValue);
              this.pdfEnable = false;
              this.processData();
            }
            else {
              //get values from cross ref if data not found in RFS search
              this.facultyservice.crossCheckDFS(this.searchDataAdd).subscribe(x => {
                this.crossRefValues = x;
                if (this.crossRefValues.doi != null) {
                  this.crossTitle = this.crossRefValues.title;
                  //get source name from cross ref values
                  this.crossSourceName = this.crossRefValues.sourceName[0];
                  this.publicationTitle = this.crossRefValues.title;
                  this.pubSourceName = this.crossSourceName;
                  this.doiAdd = this.searchDataAdd;
                  this.readOnly = true;
                  this.typeAdd = "C";
                  this.rfsId = 2;
                  console.log(this.crossRefValues);
                  this.pdfEnable = true;
                  this.processData();
                }
                else {
                  this.noDOI = true;
                  this.pdfEnable = true;
                  this.popupAlert = "DOI not present in CrossRef and RFS data, Do you want to proceed?";
                  this.rfsId = 3;
                  this.typeAdd = "M";
                  this.publicationIdAdd=null;
                  this.pubSourceName=""; 
                  this.publicationTitle="";
                  this.processData();
                }
              })
            }
          })
        }
      }

        //search record for rfs by doi or title
  searchMatch() {
    this.searchRfs();
    this.enableBox = true;
    this.enableAdd = false;
    this.EnableDoi = false;
    this.enableUnmatch = true;
  }

  selectFile(event) {
    this.file = event.target.files[0] as File;
    console.log(this.file);

    if (this.file) {
      const fileSize = this.file.size / 1024 / 1024; // Size in MB
      const maxSize = 10; // Maximum allowed size in MB

      if (fileSize <= maxSize) {
        console.log(`Selected file size: ${fileSize} MB`);
      } else {
        alert("Please choose a file with file size below 10MB")
        event.target.value = '';
      }
    }
  }
  enableDoiAdd() {
    this.enableBox = true;
    this.enableAdd = false;
    this.EnableDoi = true;
    this.facultyservice.GetPath(this.user.UniversityId, this.user.UserId, '2').subscribe(x => {
      this.pdfPath = x;
      console.log(this.pdfPath);
    })
  }

  clearAll() {
    location.reload();
  }

  doneRFS() {
    this.enableBox = false;
    this.rfsDone = false;
    location.reload();
  }

  uploadFile() {
    return new Promise((resolve, reject) => {
    if (!this.file) {
      return;
    }

    if (this.file.type == 'application/pdf') {
      const formData = new FormData();
      formData.append('image', this.file);
      if (this.rfsId == 1) {
        this.pdfName = this.pdfPath.proposedFileName;
      }
      else {
        let name = this.file.name.slice(0, this.file.name.lastIndexOf('.'));
        console.log(name);
        this.pdfName = this.user.UserId + "-" + name;
      }

      const uploadUrl = `${environment.nodeServerUrl}/uploadpdf?userId=${this.pdfName}&pdfPath=${this.pdfPath.folderPath}`;
      console.log(uploadUrl);

      this.http.post(uploadUrl, formData, { responseType: 'text' }).subscribe(
        (response) => {
          alert('PDF uploaded successfully!')
          console.log('Response:', response);
          this.pdfStatus = true;
          resolve(response);
        },
        (error) => {
          alert('Error uploading pdf');
          console.error('Error uploading pdf:', error);
          this.pdfStatus = false;
          reject(error);
        }
      );
    }
      else {
      alert("Please choose a file with file type pdf");
      this.pdfStatus = false;
       }
     });
  }

  submitRfs() {
                    this.uploadFile().then(()=>{

                    if (!this.pdfStatus && this.pdfEnable) {
                    }

                    else {
                      if (this.file) {
                        if (this.rfsId == 1) {
                          let imgsplit = this.file.type.split("/");
                          console.log(imgsplit);
                          this.pdfPostName = "." + imgsplit[1];
                        }
                        else {
                          this.pdfPostName = "-" + this.file.name;
                        }
                        this.pdfLocation = this.pdfPath.folderPath + "\\" + this.user.UserId + this.pdfPostName;
                        console.log(this.pdfLocation);
                      }
                    
                      const data = {
                        rfsPublicationQueue: {
                          rfsPublicationQueueId: this.queueId,
                          rfsPublicationLinkRequestId: 0,
                          universityId: parseInt(this.user.UniversityId),
                          userId: parseInt(this.user.UserId),
                          publicationId: this.publicationIdAdd,
                          publicationTitle: this.crossTitle,
                          publicationSourceId: this.sourceIdAdd,
                          publicationSource: this.crossSourceName,
                          doi: this.doiAdd,
                          pdFfileLocation: this.pdfLocation,
                          webLink: this.webLinkAdd,
                          rfsTypeId: this.rfsId,
                          swappedUserId: 0,
                          isUserAddressSame: true,
                          isCorrespondingAuthor: true,
                          actionTypeId: 0,
                          remark: null,
                          takenBy: 0,
                          verifiedBy: 0
                        },
                        rfsLinkAuthorAdd: {
                          universityId: 0,
                          universityName: "string",
                          userId: 0,
                          fullName: "string",
                          locationId: 0,
                          locationName: "string",
                          countryId: 0,
                          countryName: "string",
                          instituteId: 0,
                          instituteName: "string",
                          departmentId: 0,
                          departmentName: "string",
                          correspondingEmail: "string",
                          correspondingAuthor: 0
                        }
                      }
                      console.log(data);

                      if (this.rfsId == "3") {
                        if (this.pdfLocation != null && this.crossTitle != undefined && this.crossSourceName != undefined && this.webLinkAdd != undefined) {
                          this.facultyservice.SaveRFS(this.user.UserId, this.userName, data).subscribe(x => {
                            const confirmation = confirm('Details Saved Successfully');
                            this.enableBox = true;
                            this.enableAdd = false;
                            this.EnableDoi = false;
                            this.enableUnmatch = false;
                            this.rfsDone = true;
                          })
                        }
                        else {
                          alert("Need to fill mandatory fields")
                        }
                      }
                      else if(this.rfsId == "2"){
                        this.facultyservice.SaveRFS(this.user.UserId, this.userName, data).subscribe(x => {
                          const confirmation = confirm('Details Saved Successfully');
                          this.enableBox = true;
                          this.enableAdd = false;
                          this.EnableDoi = false;
                          this.enableUnmatch = false;
                          this.rfsDone = true;
                        })
                      }
                  }
                });

                      if(this.rfsId=="1") {
                        const data = {
                          rfsPublicationQueue: {
                            rfsPublicationQueueId: this.queueId,
                            rfsPublicationLinkRequestId: 0,
                            universityId: parseInt(this.user.UniversityId),
                            userId: parseInt(this.user.UserId),
                            publicationId: this.publicationIdAdd,
                            publicationTitle: this.crossTitle,
                            publicationSourceId: this.sourceIdAdd,
                            publicationSource: this.crossSourceName,
                            doi: this.doiAdd,
                            pdFfileLocation: this.pdfLocation,
                            webLink: this.webLinkAdd,
                            rfsTypeId: this.rfsId,
                            swappedUserId: 0,
                            isUserAddressSame: true,
                            isCorrespondingAuthor: true,
                            actionTypeId: 0,
                            remark: null,
                            takenBy: 0,
                            verifiedBy: 0
                          },
                          rfsLinkAuthorAdd: {
                            universityId: 0,
                            universityName: "string",
                            userId: 0,
                            fullName: "string",
                            locationId: 0,
                            locationName: "string",
                            countryId: 0,
                            countryName: "string",
                            instituteId: 0,
                            instituteName: "string",
                            departmentId: 0,
                            departmentName: "string",
                            correspondingEmail: "string",
                            correspondingAuthor: 0
                          }
                        }
                        console.log(data);

                        this.facultyservice.SaveRFS(this.user.UserId, this.userName, data).subscribe(x => {
                          const confirmation = confirm('Details Saved Successfully');
                          this.enableBox = true;
                          this.enableAdd = false;
                          this.EnableDoi = false;
                          this.enableUnmatch = false;
                          this.rfsDone = true;
                        })
                      }
      
            }

}
