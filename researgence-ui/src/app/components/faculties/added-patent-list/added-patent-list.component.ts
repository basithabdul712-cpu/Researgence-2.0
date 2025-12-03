import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { environment } from 'src/environments/environment';
import { AdminclientService } from '../../adminclient/adminclient.service';
import { FacultiesService } from '../faculties.service';
import * as XLSX from 'xlsx';
import { ExcelExportService } from 'src/app/shared/services/excel.service';


@Component({
  selector: 'app-added-patent-list',
  templateUrl: './added-patent-list.component.html',
  styleUrls: ['./added-patent-list.component.scss','./../../../../assets/given/selected.css','./../../../../assets/given/newcss/style.css'],

})
export class AddedPatentListComponent implements OnInit {
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
  Name: any;
  searchQuery:string="";
  startrow:number=0;
  endrow:number=20;
  totalPages: number;
  roleName: any;
  stickyEnable: any;
  isScrolled: any;
  role: any;
  fileName: 'Patent-List.xlsx';

  pdfLocation: string="";
  ActiontypeId: number=0;
  status: any;
  type: any;
  isReadOnly: boolean=false;
  conditiondata: any;
  requestid: number=0;

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
  officeId:any;
  tempRfsId:number=0;
  pdfPostName:string;
  enablePatentAdd:boolean=false;
  enablePatentBox:boolean=false;
  enablePatentNum:boolean=false;
  patCountryList:any;
  countryCode:any;
  manualCountryCode:any;
  searchPatentAppNum:string="";
  patPdfPath:any;
  patentData:any;
  enablepatData:boolean=false;
  patSubmitEnable:boolean=false;
  patentId:number=0;
  patpdfPostName:string | null =null;
  patpdfLocation:string | null =null;
  patentOfficeId:string| null =null;
  patAppNo:any;
  patTitle:any;
  patPubEnable:any;
  patPubIndEnable:any;
  patPdfName: string | null = null;
  patpdfStatus: boolean =false;
  tempDataList:any;
  filterData:any;
  checkPatAvailability:any;
  enableMessage:boolean=false;

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
            //  this.authservice.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
              this.role=JSON.parse(localStorage.getItem('RoleSelection'));
              const data=this.role.filter(item=> item.roleId==this.userName);
              this.roleName=data[0].roleName;
              console.log(this.roleName)
              // }) 


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
            
            this.facultyservice.getAddedPatentList(this.user.UserId,this.user.UserId,this.userName).subscribe(x => {
              this.dataList = x as any;
              
            this.conditiondata = this.dataList.map((item) => {
              return {
                  status: item.status,
                  rfstype: item.rfsType
              };  
          });

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
              if (item.patentTitle!=null) {
                return item.patentTitle.toLowerCase().includes(this.searchQuery.toLowerCase());
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
        this.facultyservice.getAddedPatentList(this.user.UserId,this.user.UserId,this.userName).subscribe(x => {
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
  const modifiedDataList = this.dataList.map(({ employeeId, Name, patentTitle, patentOffice, applicationNumber,rfsType, remark, status, createdBy, createdDate }, index) => {
    // Declare index here, if needed
    return {
      "SL.NO": index + 1,
      "EmployeeId": employeeId,
      "Author Details": Name,
      "Publication Details": "Title :"+ patentTitle +",Office :"+ patentOffice +",App. No :"+ applicationNumber,
      "RFS Type": rfsType,
      "Remark": remark,
      "Status": status,
      "CreatedBy": createdBy,
      "CreatedDate": createdDate
    };
  });
  
    console.log(modifiedDataList);

  // Export the modified data to Excel
  this.excel.exportAsExcelFile(modifiedDataList, "Patent-List");
}

    closeAdd() {
      this.enableBox = false;
      this.enableUnmatch = false;
    }

      //add new
      resetForm() {
        this.enablePatentBox = true;
        this.enablePatentAdd = true;
        this.patpdfLocation=null;
        this.searchPatentAppNum="";
        this.countryCode=null;
      }

      selectFilePatent(event) {
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

    clearAll() {
      location.reload();
    }

  enablePatentAppNum(){
    this.enablePatentAdd = false;
    this.enablePatentBox = true;
    this.enablePatentNum =true;
    this.countryCode = null;
    this.searchDataAdd = "";
    this.facultyservice.patentCountry().subscribe(x=>{
          this.patCountryList=x;
    });

  }

  searchPatentNum(){

            if(this.countryCode==null){
              alert("Please select Office before search")
              }
              else{
                this.manualCountryCode=null;
                this.patAppNo="";
                this.patTitle="";
                this.patPubEnable=undefined;
                this.file=null;
                this.patPubIndEnable=undefined;
                this.enablePatentBox = true;
                this.enablePatentAdd = false;
                this.enablePatentNum = false;
                this.enableUnmatch = true;
                this.facultyservice.GetPath(this.user.UniversityId, this.user.UserId, '5').subscribe(x => {
                  this.patPdfPath = x;
                  console.log(this.patPdfPath);    
                });

                this.facultyservice.getPatentByAppNo(this.searchPatentAppNum,this.countryCode).subscribe(x=>{
                        console.log(x);
                        this.patentData=x;
                        if(this.patentData.length>0){
                          this.enablepatData=true;   
                            this.patAppNo=this.patentData[0].applicationNumber;
                            this.patTitle=this.patentData[0].patentTitle;    
                            this.patentId=this.patentData[0].patentId;    
                            this.patentOfficeId = this.patentData[0].patentOfficeId;      
                        }                   
                      });
                    }
          }

            returnToSearch(){
              this.enablePatentBox = true;
              this.enablePatentAdd = false;
              this.enablePatentNum = true;
              this.enableUnmatch = false;
              this.patentData=[];
              this.patAppNo="";
              this.patTitle=""; 
              this.patentOfficeId="";
               this.enableMessage=false;
              this.patentId=0;  
              this.patPubEnable=undefined;
              this.patPubIndEnable=undefined;
            }

            linkPatent(){
                      
              this.facultyservice.getPatentAvailability(this.user.UserId,'L',this.patTitle,this.patAppNo,this.patentOfficeId).subscribe(x=>{
                this.checkPatAvailability=x;
                if(this.checkPatAvailability){
                  if(this.checkPatAvailability.messegeId==4){
              const data={
                rfsPatentQueue: {
                  rfsPatentQueueId: 0, 
                  universityId: this.user.UniversityId,
                  userId: this.user.UserId,
                  applicationNumber: this.patAppNo,   
                  patentId: this.checkPatAvailability.patentId,
                  patentTitle: this.patTitle,
                  patentOfficeId:this.patentOfficeId,
                  webLink: null,
                  pdFfileLocation: null,
                  rfsTypeId: 1,
                  actionTypeId: 0,
                  remark: null,
                  workflowstatusId: 6,
                  swappedInventorUserId: 0,
                  swappedApplicantUserId: 0,
                  takenBy: 0,
                  verifiedBy: 0
                }
              }
                this.facultyservice.savePatent(data,this.user.UserId,this.userName).subscribe(x=>{
                      console.log("Data save suceessfully");
                      this.patSubmitEnable=true;
                      this.enableUnmatch=false;  
                      this.enablePatentBox = true;
                      this.enablePatentAdd = false;
                      this.enablePatentNum = false;    
                      this.patAppNo="";
                      this.patTitle=""; 
                      this.patentOfficeId="";
                      this.patentId=0;    
                      this.getList();
                });
              }
                else{    
                  this.enableMessage=true;
                }
              }
            });


            }

            closePatent(){
              this.enablePatentBox = false;
              this.patentData=[];
              this.patAppNo=null;
              this.patTitle=null;    
              this.patentId=null;    
              this.patentOfficeId = null;  
              this.countryCode=null;
              this.manualCountryCode=null;
              this.searchDataAdd=null;
            }

            donePatent(){
              this.patSubmitEnable=false;
              this.enableUnmatch=false;   
              this.enablePatentBox = false;
              this.enablePatentAdd = false;
              this.enablePatentNum = false;
              this.patentData=[];
              this.patAppNo="";
              this.patTitle="";  
              this.patentOfficeId="";  
              this.patentId=0;       
            }


            submitPatentDetail(){

              if(this.patPubEnable!=undefined){

                this.facultyservice.getPatentAvailability(this.user.UserId,'M',this.patTitle,this.patAppNo,this.manualCountryCode).subscribe(x=>{
                  console.log(x);
                  this.checkPatAvailability=x;
                  if(this.checkPatAvailability){
                    if(this.checkPatAvailability.messegeId==4){
                        if(this.patPubIndEnable=='yes'&&this.patPubEnable=='yes'&&this.file==null){
                          const data={
                            rfsPatentQueue: {
                              rfsPatentQueueId: 0, 
                              universityId: this.user.UniversityId,
                              userId: this.user.UserId,
                              applicationNumber: this.patAppNo,   
                              patentId: this.patentId,
                              patentTitle: this.patTitle,
                              patentOfficeId:this.manualCountryCode,
                              webLink: null,
                              pdFfileLocation: null,
                              rfsTypeId: 3,
                              actionTypeId: 0,
                              remark: null,
                              workflowstatusId: 6,
                              swappedInventorUserId: 0,
                              swappedApplicantUserId: 0,
                              takenBy: 0,
                              verifiedBy: 0
                            }
                          }
                            this.facultyservice.savePatent(data,this.user.UserId,this.userName).subscribe(x=>{
                              console.log("Data save suceessfully");
                              this.patSubmitEnable=true;
                              this.enableUnmatch=false;   
                              this.enablePatentBox = true;
                              this.enablePatentAdd = false;
                              this.enablePatentNum = false;  
                              this.patentData=[];   
                              this.patAppNo="";
                              this.patTitle="";    
                              this.patentId=0;  
                              this.getList();  
                          });      
                        }

                        else if(this.patPubIndEnable=='yes'&&this.patPubEnable=='yes'&&this.file!=null){
                          this.uploadFilePatent().then(()=>{
      
                            let imgsplit = this.file.type.split("/");
                            console.log(imgsplit);
                            this.patpdfPostName = "." + imgsplit[1];
                            this.patpdfLocation = this.patPdfPath.folderPath + "\\" + this.patPdfName + this.patpdfPostName;
                            console.log(this.patpdfLocation);
                           const data={
                             rfsPatentQueue: {
                              rfsPatentQueueId: 0, 
                              universityId: this.user.UniversityId,
                              userId: this.user.UserId,
                              applicationNumber: this.patAppNo,   
                              patentId: this.patentId,
                              patentTitle: this.patTitle,
                              patentOfficeId:this.manualCountryCode,
                              webLink: null,
                              pdFfileLocation: this.patpdfLocation,
                              rfsTypeId: 3,
                              actionTypeId: 0,
                              remark: null,
                              workflowstatusId: 6,
                              swappedInventorUserId: 0,
                              swappedApplicantUserId: 0,
                              takenBy: 0,
                              verifiedBy: 0
                            }
                          }
                            this.facultyservice.savePatent(data,this.user.UserId,this.userName).subscribe(x=>{
                              console.log("Data save suceessfully");
                              this.patSubmitEnable=true;
                              this.enableUnmatch=false;   
                              this.enablePatentBox = true;
                              this.enablePatentAdd = false;
                              this.enablePatentNum = false;  
                              this.patentData=[];   
                              this.patAppNo="";
                              this.patTitle="";    
                              this.patentId=0;   
                              this.getList(); 
                           });      
                         });
                        }

                        else{
                          this.uploadFilePatent().then(()=>{
      
                            let imgsplit = this.file.type.split("/");
                            console.log(imgsplit);
                            this.patpdfPostName = "." + imgsplit[1];
                            this.patpdfLocation = this.patPdfPath.folderPath + "\\" + this.patPdfName + this.patpdfPostName;
                            console.log(this.patpdfLocation);
                           const data={
                             rfsPatentQueue: {
                              rfsPatentQueueId: 0, 
                              universityId: this.user.UniversityId,
                              userId: this.user.UserId,
                              applicationNumber: this.patAppNo,   
                              patentId: this.patentId,
                              patentTitle: this.patTitle,
                              patentOfficeId:this.manualCountryCode,
                              webLink: null,
                              pdFfileLocation: this.patpdfLocation,
                              rfsTypeId: 3,
                              actionTypeId: 0,
                              remark: null,
                              workflowstatusId: 6,
                              swappedInventorUserId: 0,
                              swappedApplicantUserId: 0,
                              takenBy: 0,
                              verifiedBy: 0
                            }
                          }
                            this.facultyservice.savePatent(data,this.user.UserId,this.userName).subscribe(x=>{
                              console.log("Data save suceessfully");
                              this.patSubmitEnable=true;
                              this.enableUnmatch=false;   
                              this.enablePatentBox = true;
                              this.enablePatentAdd = false;
                              this.enablePatentNum = false;  
                              this.patentData=[];   
                              this.patAppNo="";
                              this.patTitle="";    
                              this.patentId=0;   
                              this.getList(); 
                           });      
                         });
                      }
                   }
                    else{    
                      this.enableMessage=true;
                    }
                  }
                });
              }
            else{
              alert("Please answer below question before submit.")
            }
                      
          }

          uploadFilePatent() {
            return new Promise((resolve, reject) => {
            if (!this.file) {
              return;
            }

            if (this.file.type == 'application/pdf') {
              const formData = new FormData();
              formData.append('image', this.file);
              if (this.rfsId == 1) {
                this.patPdfName = this.patPdfPath.proposedFileName;
              }
              else {
                let name = this.file.name.slice(0, this.file.name.lastIndexOf('.'));
                console.log(name);
                this.patPdfName = this.user.UserId + "-" + name;
              }

              const uploadUrl = `${environment.nodeServerUrl}/uploadpdf?userId=${this.patPdfName}&pdfPath=${this.patPdfPath.folderPath}`;
              console.log(uploadUrl);

              this.http.post(uploadUrl, formData, { responseType: 'text' }).subscribe(
                (response) => {
                  alert('PDF uploaded successfully!')
                  console.log('Response:', response);
                  this.patpdfStatus = true;
                  resolve(response);
                },
                (error) => {
                  alert('Error uploading pdf');
                  console.error('Error uploading pdf:', error);
                  this.patpdfStatus = false;
                  reject(error);
                }
              );
            }
              else {
              alert("Please choose a file with file type pdf");
              this.patpdfStatus = false;
              }
            });
          }

          delete(id){
           this.tempDataList=this.dataList;

           this.tempDataList= this.tempDataList.filter(item => item.requestId==id);
           if(this.tempDataList.length>0){
           this.filterData=this.tempDataList[0];
           console.log(this.filterData);
           if(this.filterData.rfsType=="Linked"){
              this.tempRfsId=1;
           }
           else if(this.filterData.rfsType=="Manual"){
            this.tempRfsId=3;
           }
  
           if(this.filterData.patentOffice==null){
              this.officeId="";
           }
           else{
            this.facultyservice.patentCountry().subscribe(x=>{
              this.patCountryList=x;
              let tempOfficeId = this.patCountryList.filter(item => item.value.toLowerCase().includes(this.filterData.patentOffice.toLowerCase()));                
              this.officeId=tempOfficeId[0].id;
        });
           
           }
            const data={
                rfsPatentQueue: {
                  rfsPatentQueueId: this.filterData.requestId, 
                  universityId: this.user.UniversityId,
                  userId: this.user.UserId,
                  applicationNumber: this.filterData.applicationNumber,   
                  patentId: null,
                  patentTitle: this.filterData.patentTitle,
                  patentOfficeId:this.officeId,
                  webLink: null,
                  pdFfileLocation: null,
                  rfsTypeId: this.tempRfsId,
                  actionTypeId: 5,
                  remark: null,
                  workflowstatusId: 6,
                  swappedInventorUserId: 0,
                  swappedApplicantUserId: 0,
                  takenBy: 0,
                  verifiedBy: 0
                }
              }

              console.log(data);
              const confirmation = confirm('Please confirm to delete patent');
              if(confirmation){
                this.facultyservice.savePatent(data,this.user.UserId,this.userName).subscribe(x=>{
                  this.getList();
                });
              }
              else{}            
           }
        
          }

          gotoedit(requestId){
            console.log(this.isReadOnly);
            this.router.navigate(['/facultyProfiles/faculty/rfs-edit',requestId,'patent']);
          }

}
