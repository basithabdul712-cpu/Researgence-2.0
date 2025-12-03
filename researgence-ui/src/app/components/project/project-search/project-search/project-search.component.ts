import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FacultiesService } from 'src/app/components/faculties/faculties.service';
import { GeneralApiService } from 'src/app/components/general-api.service';
import { ScorebookService } from 'src/app/components/scorebook/scorebook.service';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['../../../../../assets/given/newcss/style.css','./project-search.component.scss']
})
export class ProjectSearchComponent implements OnInit {

  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  isMenuOpen: boolean;
  isScrolled = false;
  stickyEnable: boolean;
  user: any;
  roleId: any;
  universityName: any;
  public role:any;
  public roleName:any;
  Name:string;
  userRole:string;
  userId:any;
  isDropdownOpen:boolean=false;
  enablePic:boolean=false;
  startrow:number=0;
  endrow:number=20;
  minePatData:any;
  dataList:any;
  collapsablesize:any;
  pageSize:number=20;
  totalPages: number;
  page:number=1;
  totalsize: any;
  ordervalueProject: any;
  orderSort=['Ascending','Descending'];
  ascendValue='Descending';
  pageSizecount = ["10","20","50","100"];
  getList:any;
  excelData:any;
  excelList:any;
  downloadEnable:boolean=false;
  mineDataPdf:any;
  dataListPdf:any;
  excelEnable:boolean=false;

  constructor(private router:Router,private authService:AuthService,private scoreservice:ScorebookService,private modalService: NgbModal,
    private menuService:MenuService,private facultyservice: FacultiesService,private fb: FormBuilder,private gservice:GeneralApiService,private excel: ExcelExportService) { }

  ngOnInit(): void {

     //for accessing menuopen 
     this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });

    this.user=this.authService.getUserDetail();
    this.roleId=this.authService.getProfileObs();
    this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    // this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
      this.role=JSON.parse(localStorage.getItem('RoleSelection'));
       console.log(this.role);
       const data=this.role.filter(item=> item.roleId==this.roleId);
       this.roleName=data[0].roleName;
       console.log(this.roleName)
      //  });
    
      this.onWindowScroll();   
      this.fetchdata();
   
  }

  // For stickey blue bar changes
  @HostListener('window:scroll')
  onWindowScroll() {
          const scrollY = window.scrollY;
      
          if (this.blueheader) {
            const element = this.blueheader.nativeElement;            
            if (scrollY >= 10) {
              element.classList.remove('bluebar_expand');
              element.classList.add('bluebar_collapse');
              this.stickyEnable=true;
            } else {
              element.classList.remove('bluebar_collapse');
              element.classList.add('bluebar_expand');
              this.stickyEnable=false
            }
        }
    }

  
    onPageChange(page: number){
      this.page = Math.max(1, Math.min(page, this.totalPages));
      if (this.page == 1) {
        this.startrow = 0;
      } else {
        this.startrow = (this.page - 1) * this.pageSize;
      }
      this.endrow = Math.min(this.startrow + this.pageSize, this.collapsablesize);
      // Apply sorting based on current sorting values
      if (this.ordervalueProject === 'Ascending') {
        this.dataList.sort((a, b) => (a.projectTitle > b.projectTitle) ? 1 : ((b.projectTitle > a.projectTitle) ? -1 : 0));
      } else if (this.ordervalueProject === 'Descending') {
        this.dataList.sort((a, b) => (a.projectTitle < b.projectTitle) ? 1 : ((b.projectTitle < a.projectTitle) ? -1 : 0));
      }   
      ///detailed or compact for article
      this.fetchdata();
    }
  
    fetchdata(){
      let storedTitle = localStorage.getItem('mineSearchProj');
      let checkString=JSON.parse(storedTitle);
         console.log(checkString);
         checkString.endRow  =  this.endrow;
         checkString.startRow  =this.startrow;
             this.getList=checkString;
          this.scoreservice.fetchProjectData(checkString).subscribe((x: HttpResponse<any>)=>{ 
            if (x.status === 200) {
              this.minePatData = x.body;
              this.enablePic = true;
            } else {
              this.enablePic = false;
            } 
            this.dataList=this.minePatData.dataList;
            console.log(this.dataList);

            for(let i=0;i<this.dataList.length;i++){

              if(this.dataList[i].projectTeam!=null){
               this.dataList[i].projectTeam = this.dataList[i].projectTeam.split('|');  
              }

              if(this.dataList[i].principalInvestigator!=null){
                this.dataList[i].principalInvestigator = this.dataList[i].principalInvestigator.split('|');  
               }

               if(this.dataList[i].coInvestigator!=null){
                this.dataList[i].coInvestigator = this.dataList[i].coInvestigator.split('|');  
               }
           }     
    
                this.collapsablesize=this.minePatData.totalRowCount;
                this.totalPages = Math.ceil(this.collapsablesize / this.pageSize); 
                // Adjust Mpage to prevent it from exceeding totalpages
              this.page = Math.max(1, Math.min(this.page, this.totalPages));
                // Calculate the actual startRow and endRow based on Mpage and pageSize
              this.startrow = (this.page - 1) * this.pageSize;
              this.endrow = Math.min(this.startrow + this.pageSize, this.collapsablesize);
              this.totalsize=this.minePatData.totalRowCount;
              this.getPdfList();
              if (this.ordervalueProject === 'Ascending') {
                this.dataList.sort((a, b) => (a.projectTitle > b.projectTitle) ? 1 : ((b.projectTitle > a.projectTitle) ? -1 : 0));
              } else if (this.ordervalueProject === 'Descending') {
                this.dataList.sort((a, b) => (a.projectTitle < b.projectTitle) ? 1 : ((b.projectTitle < a.projectTitle) ? -1 : 0));
              }   
          },
          (error) => {
            this.enablePic = false; // Set enablePic to true in case of an error
          });         
    }
  
    changesOrder(values){
      console.log(values);
      this.ordervalueProject=values;
      if(values=='Ascending'){
        this.dataList.sort((a, b) => (a.projectTitle > b.projectTitle) ? 1 : ((b.projectTitle > a.projectTitle) ? -1 : 0));
      }
      if(values=='Descending'){
        this.dataList.sort((a, b) => (a.projectTitle < b.projectTitle) ? 1 : ((b.projectTitle < a.projectTitle) ? -1 : 0));
      } 
    }

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  
    onPageSizeChange(size: string){
      this.page = 1;
      this.pageSize = Number(size);
      this.endrow=this.pageSize+this.startrow;
                // Apply sorting based on current sorting values
       if (this.ordervalueProject === 'Ascending') {
        this.dataList.sort((a, b) => (a.projectTitle > b.projectTitle) ? 1 : ((b.projectTitle > a.projectTitle) ? -1 : 0));
         } else if (this.ordervalueProject === 'Descending') {
          this.dataList.sort((a, b) => (a.projectTitle < b.projectTitle) ? 1 : ((b.patentTitle < a.projectTitle) ? -1 : 0));
         }
       this.fetchdata();
    }
  
    exportToExcel() {
      this.excelEnable=true;
      this.setExcel().subscribe(() => {
      });
    }
  
    setExcel():Observable<any>{
      this.getList.endRow=this.collapsablesize;
        return  this.scoreservice.fetchExportProject(this.getList).pipe(
          tap((x: any) => {
            console.log(x);       
            this.excelData=x;     
                   this.excelList=this.excelData.dataList;
           console.log(this.excelList);  
                    this.exportexcel();  
                 
              }),
            catchError(error => {
                const errorUrl = this.router.createUrlTree(['/apierror/error/handle'], { queryParams: { message: error.message } }).toString();
                const newWindow = window.open(errorUrl, '_blank');
                newWindow.document.title = "Error Handling";    
              return of(null);
         }));
       }
    
     exportexcel(){
      let str = JSON.stringify(this.excelList);  
      str = str.replace(/\"projectId\":/g, "\"Patent ID\":");
      str = str.replace(/\"projectTitle\":/g, "\"Application Number\":");
      str = str.replace(/\"projectDescription\":/g, "\"Patent Number\":");
      str = str.replace(/\"projectFundingTypeName\":/g, "\"Patent Title\":");
      str = str.replace(/\"projectFundingAgencyName\":/g, "\"Filing Date\":");
      str = str.replace(/\"projectFundingAgencyTypeName\":/g, "\"Published Date\":");
      str = str.replace(/\"sanctionedAmount\":/g, "\"Examination Date\":");
      str = str.replace(/\"projectStatusName\":/g, "\"Patent Office Name\":");
      str = str.replace(/\"completionDate\":/g, "\"Inventor Affiliation\":");
      str = str.replace(/\"projectTeam\":/g, "\"Applicant Affiliation\":");
      str = str.replace(/\"principalInvestigator\":/g, "\"Patent Stage Id\":");
      str = str.replace(/\"coInvestigator\":/g, "\"Patent Stage Name\":");
      str = str.replace(/\"sanctionedDate\":/g, "\"Abstract\":");
      str = str.replace(/\"projectPeriod\":/g, "\"Domain\":");
      str = str.replace(/\"grantReceived\":/g, "\"Patent Stage Life Cycle\":");
      str = str.replace(/\"grantTimeline\":/g, "\"Patent Stage Life Cycle\":");
      str = str.replace(/\"technologyAreas\":/g, "\"Technology Area\":");
      this.excelList = JSON.parse(str);
      this.excelList.forEach((x) => {
        delete x.rowNumber;delete x.projectFundingTypeId;delete x.projectFundingAgencyId;delete x.projectFundingAgencyTypeId;
        delete x.projectStatusId;delete x.projectURL;delete x.investigatorAffiliation; 
      });
      this.excel.exportAsExcelFile(this.excelList, "Project_Mine");
      this.isDropdownOpen=false;
      this.excelEnable=false;
    }
  
    getPdfList(){
      this.getList.endRow=this.collapsablesize;
      this.scoreservice.fetchExportProject(this.getList).subscribe(x=>{
        this.mineDataPdf=x;
        this.dataListPdf=this.mineDataPdf.dataList;
      });
  
    }

}


