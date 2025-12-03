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
import { ProjectBasicDetail, ProjectDetails } from 'src/app/shared/model/projectPayload.model';
import { GeneralApiService } from '../../general-api.service';
import { NumberToWordsService } from 'src/app/shared/services/numbertorupees.service';


@Component({
  selector: 'app-added-project-list',
  templateUrl: './added-project-list.component.html',
  styleUrls: ['./added-project-list.component.scss','./../../../../assets/given/selected.css','./../../../../assets/given/newcss/style.css'],

})
export class AddedProjectListComponent implements OnInit {
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
  enableBox:boolean=false;

    // Project Add Details
    enableProjectNum:boolean=false;
    enableProjectNew:boolean=false;
    projectBasicDl: ProjectBasicDetail;
    amount: any = '';
    projectStatusList:any;
    projectFundingType:any;
    projectFundingAgency:any;
    projectFundingAgencyType:any;
    projectPdfPath:any;
    fileProj: File | null = null;
    projectPdfName: string | null = null;
    projectpdfStatus:boolean=false;
    projectpdfPostName:string | null =null;
    projectpdfLocation:string | null =null;
    projectSubmitEnable:boolean = false;
    checkProjectTitle:any;
    enableProjectUniv:boolean = false;
    titleEnableProject:boolean=false;
    projectUnivId:any;
    searchUnivProj: string = "";
    enableProjectAdd:boolean=false;
    researchList:any;
    newTag: string = '';
    researchArea:string;
    tags = [];
    researchDrop:boolean=false;
    researchname:any;

  constructor(private service:AdminclientService, private authservice:AuthService,private route: ActivatedRoute,private search: CommonsearchService,private gservice:GeneralApiService,
    private menuService:MenuService,private numtoWords:NumberToWordsService, private router:Router, private http: HttpClient, private facultyservice: FacultiesService,private excel:ExcelExportService) { 
    
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
            
            this.facultyservice.getProjectList(this.user.UniversityId,this.user.UserId,this.userName).subscribe(x => {
              this.dataList = x as any;
                    
              console.log(this.dataList);        
              this.collectionSize=this.dataList.length;
                this.totalPages = Math.ceil(this.collectionSize / this.pageSize); 
                
              this.page = Math.max(1, Math.min(this.page, this.dataList.length));
              
              this.startrow = (this.page - 1) * this.pageSize;
              this.endrow = Math.min(this.startrow + this.pageSize, this.collectionSize);
                console.log(this.page);  
              
            });          
          
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

     

      searchTab(){
  
        this.dataList = this.dataList.filter(item => {
              if (item.projectTitle!=null) {
                return item.projectTitle.toLowerCase().includes(this.searchQuery.toLowerCase());
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
            this.facultyservice.getProjectList(this.user.UniversityId,this.user.UserId,this.userName).subscribe(x => {
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
              const modifiedDataList = this.dataList.map(({  fullName, projectTitle, projectFundingType, projectFundingAgency, projectFundingAgencyType, projectStatus, projectStartDate, projectEndDAte, createdBy,completionDate,projectEntryCompletionPercentage }, index) => {
                // Declare index here, if needed
                return {
                  "SL.NO": index + 1,
                  "Author Name": fullName,
                  "Project Details": "Title :"+ projectTitle +",Project Funding Type :"+ projectFundingType +",Project Funding Agency :"+ projectFundingAgency+",Project Funding Agency Type :"+ projectFundingAgencyType ,
                  "Project Status": projectStatus,
                  "Start Date": projectStartDate,
                  "End Date": projectEndDAte,
                  "CreatedBy": createdBy,
                  "Completion Date": completionDate,
                  "project Detailing": projectEntryCompletionPercentage
                };
              });
              
            console.log(modifiedDataList);

              // Export the modified data to Excel
              this.excel.exportAsExcelFile(modifiedDataList, "Project List");
    }


        gotoedit(id){
         
          this.router.navigate(['/Project/user/details/'+id]);
        }

        closeProject(){
          this.enableProjectNew = false;
          this.enableProjectNum = false;
          this.projectSubmitEnable =false;
          this.projectBasicDl= new ProjectBasicDetail();
       }

       updateValuesProject(){

        if(this.checkProjectTitle == "No"){
           this.enableProjectUniv=true;
        }
        else{
          this.enableProjectUniv=false;
        }
          
      }

      changeTitleProject(x){
        this.titleEnableProject=true;
        this.fill = this.universityFilter.filter(e =>
          e.universityName.toLowerCase().includes(x.toLowerCase())
        );
      }

      onSelectUnivProj(name,id){

        this.titleEnableProject=false;
        this.searchUnivProj=name;
        this.projectUnivId=id;
    }

      searchBasic(){
        this.enableProjectNew=true;
        this.enableProjectAdd=false;
        this.enableProjectNum=true;
      
    }

        newProject(){

          this.enableProjectNew=true;
          this.enableProjectAdd=true;

          this.service.GetUniversity(this.user.UserId,this.userName).subscribe(data => {
            this.universityFilter = data;
            });

            this.projectBasicDl= new ProjectBasicDetail();

            this.gservice.getProjectDrop('PROJECTSTATUS').subscribe(x=>{
              this.projectStatusList=x;
            });

            this.gservice.getProjectDrop('PROJECTFUNDINGTYPE').subscribe(x=>{
              this.projectFundingType=x;           
            });

            this.gservice.getProjectDrop('PROJECTFUNDINGAGENCY').subscribe(x=>{
              this.projectFundingAgency=x;           
            });

            this.gservice.getProjectDrop('PROJECTFUNDINGAGENCYTYPE').subscribe(x=>{
              this.projectFundingAgencyType=x;           
            });

            this.facultyservice.getResearchAreaList().subscribe(x=>{
              this.researchList=x;    
            })

            this.facultyservice.GetPath(this.user.UniversityId, this.user.UserId, '3').subscribe(x => {
              this.projectPdfPath = x;
              console.log(this.projectPdfPath);    
            });

        }


        changeStatus(val){
          if(val!=null||val!=undefined){
            let tempStatus = this.projectStatusList.filter(item => item.value==val);
            this.projectBasicDl.projectStatusId = parseInt(tempStatus[0].id);
          } 
          else{
            this.projectBasicDl.projectStatusId = 0;
            this.projectBasicDl.projectStatusName = "";
          }      
       }

      changeFundAgencyType(val){
        if(val!=null||val!=undefined){
            let tempFundAgencyType = this.projectFundingAgencyType.filter(item => item.value==val);
            this.projectBasicDl.projectFundingAgencyTypeId= parseInt(tempFundAgencyType[0].id);
        } 
        else{
          this.projectBasicDl.projectFundingAgencyTypeId=0;
          this.projectBasicDl.projectFundingAgencyTypeName="";
        }            
      }

      changeFundType(val){
        if(val!=null||val!=undefined){
            let tempFundType = this.projectFundingType.filter(item => item.value==val);
            this.projectBasicDl.projectFundingTypeId= parseInt(tempFundType[0].id);
        } 
        else{
          this.projectBasicDl.projectFundingTypeId=0;
          this.projectBasicDl.projectFundingTypeName="";
        }            
      }

      changeFundAgency(val){
        if(val!=null||val!=undefined){
            let tempFundAgency = this.projectFundingAgency.filter(item => item.value==val);
            this.projectBasicDl.projectFundingAgencyId= parseInt(tempFundAgency[0].id);
        } 
        else{
          this.projectBasicDl.projectFundingAgencyId=0;
          this.projectBasicDl.projectFundingAgencyName="";
        }              
      }

      calcDuration(){
    
          if(this.projectBasicDl.projectStartDate!=undefined&&this.projectBasicDl.projectEndDate!=undefined){
              const date1 = new Date(this.projectBasicDl.projectStartDate);
              const date2 = new Date(this.projectBasicDl.projectEndDate);
              // Get difference in milliseconds
              const diffMs = date2.getTime() - date1.getTime();

              const diffDays = diffMs / (1000 * 60 * 60 * 24);

              const diffYears = diffDays / 365.25; 
              
              const diffYearsRounded = parseFloat(diffYears.toFixed(1));
              console.log(diffYearsRounded);
              this.projectBasicDl.projectDurationInYears=diffYearsRounded;
          }
         
      }

      addTag(tag?: string) {
        const tagToAdd = tag ? tag : this.newTag.trim();
        if (tagToAdd && !this.tags.includes(tagToAdd)) {
          this.tags.push(tagToAdd);
          this.researchArea=this.tags.toString();   
          console.log(this.researchArea);
              
        }
        this.newTag = '';
      }

      onResearcher(data){    
        if(data==""||data==null){
          this.researchDrop=false;    
         }
         else{
        this.researchname=this.researchList.filter(e =>
          e.value.toLowerCase().includes(data.toLowerCase()));
          this.researchDrop=true;
        }
      }

      onInputTag(value){  
        this.researchDrop=false;     
        this.tags.push(value);
        if(this.tags.length==1){
          this.researchArea=this.tags[0];
        }
        else{
        this.researchArea=this.tags.join(',');
        }     
      }

      removeTag(tag: string) {
        const index = this.tags.indexOf(tag);
        if (index !== -1) {
          this.tags.splice(index, 1);
          this.researchArea=this.tags.toString();
        }
      }

      onAmountChange() {
        if(this.projectBasicDl.projectSanctionedAmount>0){
        const num = parseFloat(this.projectBasicDl.projectSanctionedAmount.toString());
              if (!isNaN(num)) {
                this.projectBasicDl.projectSanctionedAmountInWords = this.numtoWords.convertToRupeesWords(num);
              } else {
                this.projectBasicDl.projectSanctionedAmountInWords = '';
              }
             }
              else{
                this.projectBasicDl.projectSanctionedAmountInWords = ''
              }
       }

       selectFileProject(event){
        this.fileProj = event.target.files[0] as File;
        console.log(this.fileProj);
    
        if (this.fileProj) {
          const fileSize = this.fileProj.size / 1024 / 1024; // Size in MB
          const maxSize = 10; // Maximum allowed size in MB
    
          if (fileSize <= maxSize) {
            console.log(`Selected file size: ${fileSize} MB`);
          } else {
            alert("Please choose a file with file size below 10MB")
            event.target.value = '';
          }
        }

      }

      doneProject(){
        this.projectSubmitEnable=false;
        this.enableProjectAdd=false;   
        this.enableProjectNew = false;
        this.enableProjectNum = false; 

      }
    

      saveProjectDetail(){

        if(this.projectBasicDl.projectFundingTypeName==""||this.projectBasicDl.projectFundingTypeName==null||this.projectBasicDl.projectFundingTypeName==undefined){
          alert("Please select Funding Type")
        return;
      }

      if(this.projectBasicDl.projectFundingAgencyName==""||this.projectBasicDl.projectFundingAgencyName==null||this.projectBasicDl.projectFundingAgencyName==undefined){
        alert("Please select Funding Agency")
        return;
      }

      if(this.projectBasicDl.projectFundingAgencyTypeName==""||this.projectBasicDl.projectFundingAgencyTypeName==null||this.projectBasicDl.projectFundingAgencyTypeName==undefined){
        alert("Please select Agency Type")
        return;
      }

      if(this.projectBasicDl.projectTitle==""||this.projectBasicDl.projectTitle==null||this.projectBasicDl.projectTitle==undefined){
        alert("Please enter the Project Title")
        return;
      }

      if(this.projectBasicDl.projectDescription==""||this.projectBasicDl.projectDescription==null||this.projectBasicDl.projectDescription==undefined){
        alert("Please enter the Project Description")
        return;
      }

      if(this.projectBasicDl.projectSanctionedAmount==0||this.projectBasicDl.projectSanctionedAmount==null||this.projectBasicDl.projectSanctionedAmount==undefined){
        alert("Please enter the Sanctioned Amount")
        return;
      }

      if(this.projectBasicDl.projectStartDate==""||this.projectBasicDl.projectStartDate==null||this.projectBasicDl.projectStartDate==undefined){
        alert("Please select project start date")
        return;
      }

      if(this.projectBasicDl.projectEndDate==""||this.projectBasicDl.projectEndDate==null||this.projectBasicDl.projectEndDate==undefined){
        alert("Please select project end date")
        return;
      }

      if(this.projectBasicDl.projectStatusName==""||this.projectBasicDl.projectStatusName==null||this.projectBasicDl.projectStatusName==undefined){
        alert("Please select status")
        return;
      }

      if(this.projectBasicDl.projectCompletionDate==""||this.projectBasicDl.projectCompletionDate==null||this.projectBasicDl.projectCompletionDate==undefined){
        alert("Please select completion date")
        return;
      }

        // this.uploadFileProject().then(()=>{
              // let imgsplit = this.fileProj.type.split("/");
              // console.log(imgsplit);
              // this.projectpdfPostName = "." + imgsplit[1];
              // this.projectpdfLocation = this.projectPdfPath.folderPath + "\\" + this.projectPdfName + this.projectpdfPostName;
              this.projectBasicDl.projectSanctionedDocPath=null;
              this.projectBasicDl.projectTechnologyAreas=this.researchArea;
              if(this.projectUnivId!=null||this.projectUnivId!=undefined){
                this.projectBasicDl.sourceUniversityId=parseInt(this.projectUnivId);
               }
               else{
                this.projectBasicDl.sourceUniversityId=parseInt(this.user.UniversityId);
               }

              const data={
                    projectBasicDetail: this.projectBasicDl,
                    projectGrantDisbursement: [],
                    projectInvestigators: [],
                    projectOutcome: []
              }

              console.log(data);
            
          this.facultyservice.addNewProject(data,this.user.UserId,this.userName).subscribe(x=>{
            console.log("Data save suceessfully");
            this.projectSubmitEnable=true;
            this.enableProjectAdd=false;   
            this.enableProjectNew = true;
            this.enableProjectNum = false; 
            this.getList();
          });      
        // });
     }

     uploadFileProject() {
              
      return new Promise((resolve, reject) => {
      if (!this.fileProj) {
        return;
      }
  
      if (this.fileProj.type == 'application/pdf') {
        const formData = new FormData();
        formData.append('image', this.fileProj);

          let name = this.fileProj.name.slice(0, this.fileProj.name.lastIndexOf('.'));
          console.log(name);
          this.projectPdfName = this.user.UserId + "-" + name;
  
        const uploadUrl = `${environment.nodeServerUrl}/uploadpdf?userId=${this.projectPdfName}&pdfPath=${this.projectPdfPath.folderPath}`;
        console.log(uploadUrl);
  
        this.http.post(uploadUrl, formData, { responseType: 'text' }).subscribe(
          (response) => {
            alert('PDF uploaded successfully!')
            console.log('Response:', response);
            this.projectpdfStatus = true;
            resolve(response);
          },
          (error) => {
            alert('Error uploading pdf');
            console.error('Error uploading pdf:', error);
            this.projectpdfStatus = false;
            reject(error);
          }
        );
      }
        else {
        alert("Please choose a file with file type pdf");
        this.projectpdfStatus = false;
         }
       });
    }

}
