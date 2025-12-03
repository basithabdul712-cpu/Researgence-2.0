import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FacultiesService } from 'src/app/components/faculties/faculties.service';
import { PubSearchList } from 'src/app/shared/model/PostPayload';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { GeneralApiService } from 'src/app/components/general-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuService } from 'src/app/shared/services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ScorebookService } from '../../scorebook/scorebook.service';

@Component({
  selector: 'app-support-pub-mine-detail',
  templateUrl: './support-pub-mine-detail.component.html',
  styleUrls: ['./support-pub-mine-detail.component.scss','.../../../../../../assets/given/newcss/style.css','.../../../../../../assets/given/newcss/splide.min.css','.../../../../../../assets/given/selected.css', '.../../../../../../assets/given/css/style-vit1.css', '.../../../../../../assets/given/css/style-vit2.css','.../../../../../../assets/given/newcss/bootstrap.min.css']
})
export class SupportPubMineDetailComponent implements OnInit {

  backbuttonflag:any=2;
  enableMine:boolean=false;
  //pagination and sort
  orderSort=['Ascending','Descending'];
  ascendValue='Descending';
  yearSort=['Year','Month','Day']
  yearValue='Year';
  pageSizecount = ["10","20","50","100"];
  collapsablesize:any;
  pubList: any;authorList:any;
  user: any;
  roleId: any;
  universityName: any;
  mineData:any;
  enableFaculty:boolean=false;
  dataList: any;
  pubSearchList: PubSearchList[];
  page:number=1;
  pageSize:number=20;
  totalPages: number;
  download:number=0;
  startrow:number=0;
  endrow:number=20;
  userId:any;
  pageview: boolean = false;
  downloadEnable:boolean=false;
  ordervalue: any;
  yearorder: any;
  userDetail: any;
  isMenuOpen: boolean;
  isScrolled = false;
  public role:any;
  public roleName:any;
  Name:string;
  userRole:string;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  stickyEnable: boolean;
  selectdata: any;
  isDropdownOpen=false;
  scorebookXlData: any;
  enablePic:boolean=false;
  responseStatus: any;
  dataset: any;
  totalRowCount: any;
  totalsize: any;
  excelData:any;
  excelList:any;
  getList:any;
  mineDataPdf:any;
  dataListPdf:any;
  tempList:any=[];
  excelEnable:boolean;
  expandedItems: any[] = [];
  selectedTab: string;
  univId:string;

  constructor( private router:Router,private authService:AuthService,private scoreservice:ScorebookService,private modalService: NgbModal,
    private menuService:MenuService,private facultyservice: FacultiesService,private fb: FormBuilder,private gservice:GeneralApiService,private excel: ExcelExportService) {
     }

        ngOnInit(): void { 
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
            this.selectedTab = 'apa';
        } 

          fetchdata(){
            let storedTitle = localStorage.getItem('editPubMineSearch');
            let checkString=JSON.parse(storedTitle);
            this.getList=checkString;
            checkString.endRow  =  this.endrow;
            checkString.startRow  =this.startrow;
              this.univId=checkString.universityId;
           
            this.scoreservice.fetchSupportMine(checkString).subscribe((x: HttpResponse<any>)=>{ 
              if (x.status === 200) {
                console.log(x.body);
                
                this.mineData = x.body;
                this.enablePic = true;
              } else {
                this.enablePic = false;
              }           
            this.dataList=this.mineData.dataList;
              for (let i = 0; i < this.dataList.length; i++) {

                if(this.dataList[i].link!=null){
                  if(this.dataList[i].link.length>100){
                   this.dataList[i].link=[this.dataList[i].link.slice(0, 100), " ", this.dataList[i].link.slice(100)].join('');
                  }
                 }

                if(this.dataList[i].articleType!=null){
                  this.dataList[i].articleType=this.dataList[i].articleType.toLowerCase();
                  if(this.dataList[i].articleType=="book chapter"){
                    this.dataList[i].articleType=this.dataList[i].articleType.replace(/\s/g, "");
                  }
                }
                if( this.dataList[i].technology_Areas!=null){
                this.dataList[i].technology_Areas = this.dataList[i].technology_Areas.split(';');
                }
                if(this.dataList[i].publicationSourceDBMetrics!=null){
                  this.dataList[i].publicationSourceDBMetrics=this.dataList[i].publicationSourceDBMetrics.split(';');
                }
                if(this.dataList[i].publicationDBCitation!=null){
                  const publicationDBCitation=this.dataList[i].publicationDBCitation.split(';');

                  this.dataList[i].publicationDBCitation=publicationDBCitation.map(item => {
                      const [name, value] = item.split(':');
                      return { name, value };
                    });

            // Assigning variable for showing values dynamically in honeycomp
              for(let t=0;t<this.dataList[i].publicationDBCitation.length;t++){

                      if(this.dataList[i].publicationDBCitation[t].name=="SCOPUS"){
                        this.dataList[i].scopus=this.dataList[i].publicationDBCitation[t].value;
                      }
                      if(this.dataList[i].publicationDBCitation[t].name=="WOS"){
                        this.dataList[i].wos=this.dataList[i].publicationDBCitation[t].value;
                      }
                      if(this.dataList[i].publicationDBCitation[t].name=="GS"){
                        this.dataList[i].gs=this.dataList[i].publicationDBCitation[t].value;
                      }                
                      if(this.dataList[i].publicationDBCitation[t].name=="IEEE"){
                        this.dataList[i].ieee=this.dataList[i].publicationDBCitation[t].value;
                      }
                      if(this.dataList[i].publicationDBCitation[t].name=="PUBMED"){
                        this.dataList[i].pubmed=this.dataList[i].publicationDBCitation[t].value;
                      }
                      if(this.dataList[i].publicationDBCitation[t].name=="ABDC"){
                        this.dataList[i].abdc=this.dataList[i].publicationDBCitation[t].value;
                      }
                  }
                }
                if(this.dataList[i].authorAffiliation!=null){
                this.dataList[i].authorAffiliation = this.dataList[i].authorAffiliation.split('|');
              }
              }
              this.enableFaculty=true;
              this.collapsablesize=this.mineData.totalRowCount;
              this.totalPages = Math.ceil(this.collapsablesize / this.pageSize); 
              // Adjust Mpage to prevent it from exceeding totalpages
            this.page = Math.max(1, Math.min(this.page, this.totalPages));
              // Calculate the actual startRow and endRow based on Mpage and pageSize
            this.startrow = (this.page - 1) * this.pageSize;
            this.endrow = Math.min(this.startrow + this.pageSize, this.collapsablesize);
            this.totalsize=this.mineData.totalRowCount;
              if(this.download==1){
                  this.mineData.download=1;
                  this.downloadEnable=true;
              }
              else{
                this.mineData.download=0;
              }  
              if (this.ordervalue === 'Ascending') {
                this.dataList.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
                  } else if (this.ordervalue === 'Descending') {
                  this.dataList.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
                  } else if (this.yearorder === 'Year') {
                    this.dataList.sort((a, b) => a.year - b.year);
                  }
                  this.enableFaculty=true;
                  this.enableMine=true;
            },
            (error) => {
              this.enablePic = false; 
            });
           
          }

          toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
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

          //Filter for ascending &descending
          changesOrder(values){
            console.log(values);
            this.ordervalue=values;
            if(values=='Ascending'){
                this.dataList.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
            }
            if(values=='Descending'){
              this.dataList.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
            } 
          }

          changeYear(values){
            console.log(values);
            this.yearorder=values;
            if(values=='Year'){
                this.dataList.sort((a,b) => b - a);
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
          if (this.ordervalue === 'Ascending') {
          this.dataList.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
          } else if (this.ordervalue === 'Descending') {
          this.dataList.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
          } else if (this.yearorder === 'Year') {
            this.dataList.sort((a, b) => a.year - b.year);
          }
          ///detailed or compact for article
          this.pageview=true;
          this.fetchdata();
        }

          onPageSizeChange(size: string){
            this.page = 1;
            this.pageSize = Number(size);
            this.endrow=this.pageSize+this.startrow;
                      // Apply sorting based on current sorting values
            if (this.ordervalue === 'Ascending') {
            this.dataList.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
              } else if (this.ordervalue === 'Descending') {
                this.dataList.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
              } else if (this.yearorder === 'Year') {
                this.dataList.sort((a, b) => a.year - b.year);
              }
              // detailed or compact for the article
              this.pageview = true;
            this.fetchdata();
          }

      setExcel():Observable<any>{

        const formattedList=[
        "publicationId","authors","homeAuthors","homeDepartment",
        "homeInstitute","publicationTitle","scs","wos","sci","pm","ieee","gs","ugc","ugcCare","abdc","sourcePublication","level","articleType","year","month","onlineDate","printDate","authorAffiliation",
        "homeSchool","homeLocation","volumeNumber","issueNumber","bPage","ePage","snip","sjr","if","citescore","qranksc","qrankwos","issn","eissn","isbn","eisbn","abstract","technologyAreas","link","doi",
        "isInHouse","authorVerifiedStatus","authorAffiliationHTML","publicationDBCitation","publicationSourceDBMetrics"
        ];

        this.getList.endRow=this.collapsablesize;
            return  this.scoreservice.fetchSupportMine1(this.getList).pipe(
              tap((x: any) => {      
                this.excelData=x;     
              this.excelList=this.excelData.dataList;
              for(let j=0;j<this.excelList.length;j++){
              if(this.excelList[j].publicationDBCitation!=null){
                const publicationDBCitation=this.excelList[j].publicationDBCitation.split(';');
        
                this.excelList[j].publicationDBCitation=publicationDBCitation.map(item => {
                    const [name, value] = item.split(':');
                    return { name, value };
                  });
        
          // Assigning variable for showing values dynamically in honeycomp
            for(let t=0;t<this.excelList[j].publicationDBCitation.length;t++){
        
                    if(this.excelList[j].publicationDBCitation[t].name=="SCOPUS"){
                      this.excelList[j].scs=this.excelList[j].publicationDBCitation[t].value;
                    }
                    if(this.excelList[j].publicationDBCitation[t].name=="WOS"){
                      this.excelList[j].wos=this.excelList[j].publicationDBCitation[t].value;
                    }
                    if(this.excelList[j].publicationDBCitation[t].name=="GS"){
                      this.excelList[j].gs=this.excelList[j].publicationDBCitation[t].value;
                    }                
                    if(this.excelList[j].publicationDBCitation[t].name=="IEEE"){
                      this.excelList[j].ieee=this.excelList[j].publicationDBCitation[t].value;
                    }
                    if(this.excelList[j].publicationDBCitation[t].name=="PUBMED"){
                      this.excelList[j].pm=this.excelList[j].publicationDBCitation[t].value;
                    }
                }
              }
              if(this.excelList[j].publicationSourceDBMetrics!=null){
                // this.excelList[j].publicationSourceDBMetrics=this.excelList[j].publicationSourceDBMetrics.split(';');
                const publicationSourceDBMetrics=this.excelList[j].publicationSourceDBMetrics.split(';');
        
                this.excelList[j].publicationSourceDBMetrics=publicationSourceDBMetrics.map(item => {
                    const [name, value] = item.split(':');
                    return { name, value };
                  });
        
          // Assigning variable for showing values dynamically in honeycomp
            for(let k=0;k<this.excelList[j].publicationSourceDBMetrics.length;k++){
        
                    if(this.excelList[j].publicationSourceDBMetrics[k].name=="SNIP"){
                      this.excelList[j].snip=this.excelList[j].publicationSourceDBMetrics[k].value;
                    }
                    if(this.excelList[j].publicationSourceDBMetrics[k].name=="SJR"){
                      this.excelList[j].sjr=this.excelList[j].publicationSourceDBMetrics[k].value;
                    }
                    if(this.excelList[j].publicationSourceDBMetrics[k].name=="UGCCareGroup1"){
                      this.excelList[j].ugcCare=this.excelList[j].publicationSourceDBMetrics[k].value;
                    }
                    if(this.excelList[j].publicationSourceDBMetrics[k].name=="UGC"){
                      this.excelList[j].ugc=this.excelList[j].publicationSourceDBMetrics[k].value;
                    }
                    if(this.excelList[j].publicationSourceDBMetrics[k].name=="Cite Score"){
                      this.excelList[j].citescore=this.excelList[j].publicationSourceDBMetrics[k].value;
                    }
                    if(this.excelList[j].publicationSourceDBMetrics[k].name=="ABDC"){
                      this.excelList[j].abdc=this.excelList[j].publicationSourceDBMetrics[k].value;
                    }
                    if(this.excelList[j].publicationSourceDBMetrics[k].name=="WOS Quartile"){
                      this.excelList[j].qrankwos=this.excelList[j].publicationSourceDBMetrics[k].value;
                    }
                    if(this.excelList[j].publicationSourceDBMetrics[k].name=="SCS Quartile"){
                      this.excelList[j].qranksc=this.excelList[j].publicationSourceDBMetrics[k].value;
                    }
                    if(this.excelList[j].publicationSourceDBMetrics[k].name=="SCI"){
                      this.excelList[j].sci=this.excelList[j].publicationSourceDBMetrics[k].value;
                    }
                    if(this.excelList[j].publicationSourceDBMetrics[k].name=="Impact Factor"){
                      this.excelList[j].if=this.excelList[j].publicationSourceDBMetrics[k].value;
                    }                
                }
              }
            }
              for(let i=0;i<this.excelList.length;i++){
                const reorderedResponse = {};
              formattedList.forEach(key => {
                reorderedResponse[key] = this.excelList[i][key] !== undefined ? this.excelList[i][key] : "";
            });
            this.tempList.push(reorderedResponse)
          }
          console.log(this.tempList);
                if(this.tempList.length>0){
                  this.excelEnable=false;
                  console.log(this.excelEnable);
                  
                }
        
              this.tempList.forEach(publication => { 
                if (typeof publication.publicationId === 'string'&& publication.publicationId!=null) {
                  publication.publicationId = Number(publication.publicationId);
                }
                if(typeof publication.publicationSourceId==='string'&&publication.publicationSourceId!=null){
                  publication.publicationSourceId = Number(publication.publicationSourceId);
                }
                if(typeof publication.year==='string'&&publication.year!=null){
                  publication.year = Number(publication.year);
                }
                if(typeof publication.month==='string'&&publication.month!=null){
                  publication.month = Number(publication.month);
                }
                if(typeof publication.volumeNumber==='string'&&publication.volumeNumber!=null){
                  publication.volumeNumber = Number(publication.volumeNumber);
                }
                if(typeof publication.issueNumber==='string'&&publication.issueNumber!=null){
                  publication.issueNumber = Number(publication.issueNumber);
                }
                if(typeof publication.bPage==='string'&&publication.bPage!=null){
                  publication.bPage = Number(publication.bPage);
                }
                if(typeof publication.ePage==='string'&&publication.ePage!=null){
                  publication.ePage = Number(publication.ePage);
                }
              });
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
            let str = JSON.stringify(this.tempList);  
            str = str.replace(/\"publicationId\":/g, "\"PUB ID\":");
            str = str.replace(/\"authors\":/g, "\"AUTHORS\":");
            str = str.replace(/\"homeAuthors\":/g, "\"HOME AUTHORS\":");
            str = str.replace(/\"homeDepartment\":/g, "\"HOME AUTHOR DEPARTMENT\":");
            str = str.replace(/\"homeInstitute\":/g, "\"HOME AUTHOR INSTITUTE\":");
            str = str.replace(/\"publicationTitle\":/g, "\"PUBLICATION TITLE\":");
            str = str.replace(/\"scs\":/g, "\"SCS\":");
            str = str.replace(/\"wos\":/g, "\"WOS\":");
            str = str.replace(/\"sci\":/g, "\"SCI\":");
            str = str.replace(/\"pm\":/g, "\"PM\":");
            str = str.replace(/\"ieee\":/g, "\"IEEE\":");
            str = str.replace(/\"gs\":/g, "\"GS\":");
            str = str.replace(/\"ugc\":/g, "\"UGC\":");
            str = str.replace(/\"ugcCare\":/g, "\"UGC GROUP1\":");
            str = str.replace(/\"abdc\":/g, "\"ABDC\":");
            str = str.replace(/\"sourcePublication\":/g, "\"SOURCE PUBLICATION\":");
            str = str.replace(/\"level\":/g, "\"LEVEL\":");
            str = str.replace(/\"articleType\":/g, "\"ARTICLE TYPE\":");
            str = str.replace(/\"year\":/g, "\"YEAR\":");
            str = str.replace(/\"month\":/g, "\"MONTH\":");
            str = str.replace(/\"onlineDate\":/g, "\"ONLINE DATE\":");
            str = str.replace(/\"printDate\":/g, "\"PRINT DATE\":");
            str = str.replace(/\"authorAffiliation\":/g, "\"AUTHOR ADDRESS\":");
            str = str.replace(/\"homeSchool\":/g, "\"HOME AUTHOR SCHOOL\":");
            str = str.replace(/\"homeLocation\":/g, "\"HOME AUTHOR LOCATION\":");
            str = str.replace(/\"volumeNumber\":/g, "\"VOL NO\":");
            str = str.replace(/\"issueNumber\":/g, "\"ISS NO\":");
            str = str.replace(/\"bPage\":/g, "\"B PAGE\":");
            str = str.replace(/\"ePage\":/g, "\"E PAGE\":");
            str = str.replace(/\"snip\":/g, "\"SNIP\":");
            str = str.replace(/\"sjr\":/g, "\"SJR\":");
            str = str.replace(/\"if\":/g, "\"IF\":");
            str = str.replace(/\"citescore\":/g, "\"CITE SCORE\":");
            str = str.replace(/\"qranksc\":/g, "\"Q RANK(SCS)\":");
            str = str.replace(/\"qrankwos\":/g, "\"Q RANK(WOS)\":");
            str = str.replace(/\"issn\":/g, "\"P ISSN\":");
            str = str.replace(/\"eissn\":/g, "\"E ISSN\":");
            str = str.replace(/\"isbn\":/g, "\"P ISBN\":");
            str = str.replace(/\"eisbn\":/g, "\"E ISBN\":");
            str = str.replace(/\"abstract\":/g, "\"ABSTRACT\":");
            str = str.replace(/\"technologyAreas\":/g, "\"TECHNOLOGYAREAS\":");
            str = str.replace(/\"link\":/g, "\"LINK\":");
            str = str.replace(/\"doi\":/g, "\"DOI\":");
            this.tempList = JSON.parse(str);
            this.tempList.forEach((x) => {
              delete x.authorAffiliationHTML;delete x.authorVerifiedStatus;delete x.isInHouse;delete x.publicationSourceDBMetrics;delete x.publicationDBCitation;
              delete x.homeUniversity;
            });
            this.excel.exportPubMineExcel(this.tempList, "Pub_Mine");
          }

  exportToExcel() {
    this.excelEnable=true;
 
      this.setExcel().subscribe(() => {
      });
  }

   toReport(){
      this.router.navigate(['/scorebook/Publications/InsightReports']);
    }

   getNameWithoutBrackets(author: string): string {
    if (typeof author === 'string') {
      return author.replace(/\[\d+\]/, '').split(',')[0];
    }
    return '';
  }
  
  getAffiliationWithoutBrackets(author: string): string {
    if (typeof author === 'string') {
      const parts = author.replace(/\[\d+\]/, '').split(',');
      if (parts.length > 2) {
        return `${parts[1]}, ${parts[2]}`;
      }
    }
    return '';
  }
  
  printNumber(author: string) {
    if (typeof author === 'string') {
      const match = author.match(/\[(\d+)\]/);
      if (match) {
        console.log(match[1]);
        this.router.navigate(["/facultyProfiles/"+match[1]]);
      }
    }
  }
  
  hasBrackets(author: string): boolean {
    return /\[\d+\]/.test(author);
  }

  toggleExpansion(item: any): void {
    const index = this.expandedItems.indexOf(item);
    if (index > -1) {
      // If already expanded, collapse it
      this.expandedItems.splice(index, 1);
    } else {
      // Otherwise, expand it
      this.expandedItems.push(item);
    }
  }

    opencite(showModal) {
      console.log('dialogbox button opened!');
      this.modalService.open(showModal);
    }

    toEditPub(pubId){

      this.router.navigate(['/clientadmin/dfs-editor/editor/'+pubId+'/'+"DFS"+'/'+this.univId]);

    }

    toEditPubNew(pubId){
      this.router.navigate(['/clientadmin/dfs-editor/editor/support/new/'+pubId+'/'+"DFS"+'/'+this.univId]);
    }

}
