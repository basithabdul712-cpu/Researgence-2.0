import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { ScorebookService } from 'src/app/components/scorebook/scorebook.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { GeneralApiService } from 'src/app/components/general-api.service';
import { FormBuilder } from '@angular/forms';
import { FacultiesService } from 'src/app/components/faculties/faculties.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-patent-edit-by-mine-detail',
  templateUrl: './patent-edit-by-mine-detail.component.html',
  styleUrls: ['./patent-edit-by-mine-detail.component.scss','../../../../../assets/given/selected.css',  '../../../../../assets/given/newcss/style.css', '../../../../../assets/given/newcss/bootstrap.min.css']
})
export class PatentEditByMineDetailComponent implements OnInit {
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
  ordervaluePatent: any;
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
  univId:string;

  constructor( private router:Router,private authService:AuthService,private scoreservice:ScorebookService,private modalService: NgbModal,
    private menuService:MenuService,private facultyservice: FacultiesService,private fb: FormBuilder,private gservice:GeneralApiService,private excel: ExcelExportService) {
     }

     ngOnInit() {

      this.user=this.authService.getUserDetail();
      this.roleId=this.authService.getProfileObs();
      this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      this.universityName=this.user.University;
      this.userId=this.user.UserId;
      // this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
      this.role=JSON.parse(localStorage.getItem('RoleSelection'));
       const data=this.role.filter(item=> item.roleId==this.roleId);
      this.roleName=data[0].roleName;
    // })
      this.menuService.isMenuOpen$.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
    });
    this.fetchdata();
       
    }
  
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
  
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
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
      if (this.ordervaluePatent === 'Ascending') {
        this.dataList.sort((a, b) => (a.patentTitle > b.patentTitle) ? 1 : ((b.patentTitle > a.patentTitle) ? -1 : 0));
      } else if (this.ordervaluePatent === 'Descending') {
        this.dataList.sort((a, b) => (a.patentTitle < b.patentTitle) ? 1 : ((b.patentTitle < a.patentTitle) ? -1 : 0));
      }   
      ///detailed or compact for article
      this.fetchdata();
    }
  
    fetchdata(){

      let storedTitle = localStorage.getItem('editPatMineSearch');
      let checkString=JSON.parse(storedTitle);
         console.log(checkString);
         checkString.endRow  =  this.endrow;
         checkString.startRow  =this.startrow;
         this.univId=checkString.universityId;
             this.getList=checkString;
          this.scoreservice.fetchPatentData(checkString).subscribe((x: HttpResponse<any>)=>{ 
            if (x.status === 200) {
              this.minePatData = x.body;
              this.enablePic = true;
            } else {
              this.enablePic = false;
            } 
            this.dataList=this.minePatData.dataList;
            console.log(this.dataList);
            for(let i=0;i<this.dataList.length;i++){
              if(this.dataList[i].applicantAffiliation!=null){
                this.dataList[i].applicantAffiliation = this.dataList[i].applicantAffiliation.split('|');  
                }
              if(this.dataList[i].inventorAffiliation!=null){
                  this.dataList[i].inventorAffiliation = this.dataList[i].inventorAffiliation.split('|');  
                  }
              if(this.dataList[i].filingDate!=null){
                this.dataList[i].filingDate=this.dataList[i].filingDate.split(' ')[0];
                }
              if(this.dataList[i].publishedDate!=null){
                  this.dataList[i].publishedDate=this.dataList[i].publishedDate.split(' ')[0];
                }
              if(this.dataList[i].grantDate!=null){
                 this.dataList[i].grantDate=this.dataList[i].grantDate.split(' ')[0];
                }
                if (this.dataList[i].patentStageLifeCycle != null) {
                  const patentStageLifeCycle = this.dataList[i].patentStageLifeCycle.split(',');
        
                  this.dataList[i].patentStageLifeCycle = patentStageLifeCycle.map(item => {
                    const [name, value] = item.split(':');
                    return { name, value };
                  });
        
                  // Assigning variable for showing values dynamically in honeycomp
                  for (let t = 0; t < this.dataList[i].patentStageLifeCycle.length; t++) {
        
                    if (this.dataList[i].patentStageLifeCycle[t].name == "Filed") {
                      this.dataList[i].filed = this.dataList[i].patentStageLifeCycle[t].value;
                    }
                    if (this.dataList[i].patentStageLifeCycle[t].name == "Published") {
                      this.dataList[i].published = this.dataList[i].patentStageLifeCycle[t].value;
                    }
                    if (this.dataList[i].patentStageLifeCycle[t].name == "FER Issued") {
                      this.dataList[i].ferIssued = this.dataList[i].patentStageLifeCycle[t].value;
                    }
                    if (this.dataList[i].patentStageLifeCycle[t].name == "FER Replied") {
                      this.dataList[i].ferReply = this.dataList[i].patentStageLifeCycle[t].value;
                    }
                    if (this.dataList[i].patentStageLifeCycle[t].name == "Hearing Notice") {
                      this.dataList[i].hearNotice = this.dataList[i].patentStageLifeCycle[t].value;
                    }
                    if (this.dataList[i].patentStageLifeCycle[t].name == "Granted") {
                      this.dataList[i].granted = this.dataList[i].patentStageLifeCycle[t].value;
                    }
                    if (this.dataList[i].patentStageLifeCycle[t].name == "Examined") {
                      this.dataList[i].examined = this.dataList[i].patentStageLifeCycle[t].value;
                      }
                    }
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
              // this.getPdfList();
              if (this.ordervaluePatent === 'Ascending') {
                this.dataList.sort((a, b) => (a.patentTitle > b.patentTitle) ? 1 : ((b.patentTitle > a.patentTitle) ? -1 : 0));
              } else if (this.ordervaluePatent === 'Descending') {
                this.dataList.sort((a, b) => (a.patentTitle < b.patentTitle) ? 1 : ((b.patentTitle < a.patentTitle) ? -1 : 0));
              }   
          },
          (error) => {
            this.enablePic = false; // Set enablePic to true in case of an error
          });         
    }
  
    changesOrder(values){
      console.log(values);
      this.ordervaluePatent=values;
      if(values=='Ascending'){
        this.dataList.sort((a, b) => (a.patentTitle > b.patentTitle) ? 1 : ((b.patentTitle > a.patentTitle) ? -1 : 0));
      }
      if(values=='Descending'){
        this.dataList.sort((a, b) => (a.patentTitle < b.patentTitle) ? 1 : ((b.patentTitle < a.patentTitle) ? -1 : 0));
      } 
    }
  
    onPageSizeChange(size: string){
      this.page = 1;
      this.pageSize = Number(size);
      this.endrow=this.pageSize+this.startrow;
                // Apply sorting based on current sorting values
       if (this.ordervaluePatent === 'Ascending') {
        this.dataList.sort((a, b) => (a.patentTitle > b.patentTitle) ? 1 : ((b.patentTitle > a.patentTitle) ? -1 : 0));
         } else if (this.ordervaluePatent === 'Descending') {
          this.dataList.sort((a, b) => (a.patentTitle < b.patentTitle) ? 1 : ((b.patentTitle < a.patentTitle) ? -1 : 0));
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
        return  this.scoreservice.fetchExportPatent(this.getList).pipe(
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
      str = str.replace(/\"patentId\":/g, "\"Patent ID\":");
      str = str.replace(/\"applicationNumber\":/g, "\"Application Number\":");
      str = str.replace(/\"patentNumber\":/g, "\"Patent Number\":");
      str = str.replace(/\"patentTitle\":/g, "\"Patent Title\":");
      str = str.replace(/\"filingDate\":/g, "\"Filing Date\":");
      str = str.replace(/\"publishedDate\":/g, "\"Published Date\":");
      str = str.replace(/\"examinationDate\":/g, "\"Examination Date\":");
      str = str.replace(/\"patentOfficeName\":/g, "\"Patent Office Name\":");
      str = str.replace(/\"inventorAffiliation\":/g, "\"Inventor Affiliation\":");
      str = str.replace(/\"applicantAffiliation\":/g, "\"Applicant Affiliation\":");
      str = str.replace(/\"patentStageId\":/g, "\"Patent Stage Id\":");
      str = str.replace(/\"patentStageName\":/g, "\"Patent Stage Name\":");
      str = str.replace(/\"abstract\":/g, "\"Abstract\":");
      str = str.replace(/\"domain\":/g, "\"Domain\":");
      str = str.replace(/\"patentStageLifeCycle\":/g, "\"Patent Stage Life Cycle\":");
      str = str.replace(/\"technologAreas\":/g, "\"Technology Area\":");
      this.excelList = JSON.parse(str);
      this.excelList.forEach((x) => {
        delete x.rowNumber;delete x.isInHouse;delete x.inventors;delete x.applicants;delete x.ferIssuedDate;delete x.ferReplyDate;delete x.hearingNoticeDate;delete x.grantDate;delete x.patentCountryId;
        delete x.correspondance;delete x.patentApplicantTypeId;delete x.patentApplicantTypeName;delete x.patentOfficeId;  
      });
      this.excel.exportAsExcelFile(this.excelList, "Patent_Mine");
      this.isDropdownOpen=false;
      this.excelEnable=false;
    }
  
    getPdfList(){
      this.getList.endRow=this.collapsablesize;
      this.scoreservice.fetchExportPatent(this.getList).subscribe(x=>{
        this.mineDataPdf=x;
        this.dataListPdf=this.mineDataPdf.dataList;
      });
  
    }
  
    captureAsPDF(val:number){
      
      if(val==1){
  
        if(this.dataListPdf.length>0){
          this.dataList=this.dataListPdf;
          for(let i=0;i<this.dataList.length;i++){
            if(this.dataList[i].applicantAffiliation!=null){
              this.dataList[i].applicantAffiliation = this.dataList[i].applicantAffiliation.split('|');  
              }
            if(this.dataList[i].inventorAffiliation!=null){
                this.dataList[i].inventorAffiliation = this.dataList[i].inventorAffiliation.split('|');  
                }
            if(this.dataList[i].filingDate!=null){
              this.dataList[i].filingDate=this.dataList[i].filingDate.split(' ')[0];
              }
            if(this.dataList[i].publishedDate!=null){
                this.dataList[i].publishedDate=this.dataList[i].publishedDate.split(' ')[0];
              }
            if(this.dataList[i].grantDate!=null){
               this.dataList[i].grantDate=this.dataList[i].grantDate.split(' ')[0];
              }
              if (this.dataList[i].patentStageLifeCycle != null) {
                const patentStageLifeCycle = this.dataList[i].patentStageLifeCycle.split(',');
      
                this.dataList[i].patentStageLifeCycle = patentStageLifeCycle.map(item => {
                  const [name, value] = item.split(':');
                  return { name, value };
                });
      
                // Assigning variable for showing values dynamically in honeycomp
                for (let t = 0; t < this.dataList[i].patentStageLifeCycle.length; t++) {
      
                  if (this.dataList[i].patentStageLifeCycle[t].name == "Filed") {
                    this.dataList[i].filed = this.dataList[i].patentStageLifeCycle[t].value;
                  }
                  if (this.dataList[i].patentStageLifeCycle[t].name == "Published") {
                    this.dataList[i].published = this.dataList[i].patentStageLifeCycle[t].value;
                  }
                  if (this.dataList[i].patentStageLifeCycle[t].name == "FER Issued") {
                    this.dataList[i].ferIssued = this.dataList[i].patentStageLifeCycle[t].value;
                  }
                  if (this.dataList[i].patentStageLifeCycle[t].name == "FER Replied") {
                    this.dataList[i].ferReply = this.dataList[i].patentStageLifeCycle[t].value;
                  }
                  if (this.dataList[i].patentStageLifeCycle[t].name == "Hearing Notice") {
                    this.dataList[i].hearNotice = this.dataList[i].patentStageLifeCycle[t].value;
                  }
                  if (this.dataList[i].patentStageLifeCycle[t].name == "Granted") {
                    this.dataList[i].granted = this.dataList[i].patentStageLifeCycle[t].value;
                  }
                  if (this.dataList[i].patentStageLifeCycle[t].name == "Examined") {
                    this.dataList[i].examined = this.dataList[i].patentStageLifeCycle[t].value;
                    }
                  }
                }
              }  
              this.collapsablesize=this.minePatData.totalRowCount;
              this.totalPages = Math.ceil(this.collapsablesize / this.pageSize); 
              // Adjust Mpage to prevent it from exceeding totalpages
            this.page = Math.max(1, Math.min(this.page, this.totalPages));
              // Calculate the actual startRow and endRow based on Mpage and pageSize
            this.startrow = 0;
            this.endrow =  this.collapsablesize;
            this.totalsize=this.minePatData.totalRowCount;
            if (this.ordervaluePatent === 'Ascending') {
              this.dataList.sort((a, b) => (a.patentTitle > b.patentTitle) ? 1 : ((b.patentTitle > a.patentTitle) ? -1 : 0));
            } else if (this.ordervaluePatent === 'Descending') {
              this.dataList.sort((a, b) => (a.patentTitle < b.patentTitle) ? 1 : ((b.patentTitle < a.patentTitle) ? -1 : 0));
            }   
              this.downloadEnable=true;
              alert("Pdf genereated successfully. Press download pdf");
            }
         }
         else if(val==0){
          var printContents = document.getElementById('printPatent').innerHTML;
    var popupWin = window.open(
      'Angular Large Table to pdf',
      '_blank',
      'width=768,height=auto'
    );
  
    popupWin.document.write(
      '<html><head>' +
        '<link rel="stylesheet" href="' +
        'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>' +
        '<style type="text/css">' +
        '.pageFooter {' +
        '    display: table-footer-group;' +
        '    counter-increment: page;' +
        '}' +
        '.pageFooter:after {' +
        '   content: "Page " counter(page)' +
        '}' +
        '</style>' +
        '<link rel="stylesheet" href="../../../../../assets/given/newcss/style.css"/>' +
        '<link rel="stylesheet" href="./patent-mine.component.scss"/>' +
        '<link rel="stylesheet" href="../../../../../assets/given/selected.css"/>' +
        '<link rel="stylesheet" href="../../../../../assets/given/newcss/bootstrap.min.css"/>' +
        '</head><body onload="window.print();window.close()">' +
        printContents +
        '</body></html>'
    );
    popupWin.document.close();
          this.downloadEnable=false;
          this.fetchdata();
         }
  
    }

    toEditPatent(patId){
      this.router.navigate(['/Patent/Edit/'+patId+'/'+"UI"+'/'+this.univId]);
    }
  
  }
  