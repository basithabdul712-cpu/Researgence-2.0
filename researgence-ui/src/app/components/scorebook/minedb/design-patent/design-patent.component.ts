import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FacultiesService } from 'src/app/components/faculties/faculties.service';
import { PubSearchList } from 'src/app/shared/model/PostPayload';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { ScorebookService } from '../../scorebook.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { GeneralApiService } from 'src/app/components/general-api.service';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DesignPatent } from './design-patent';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-design-patent',
  templateUrl: './design-patent.component.html',
  styleUrls: ['./design-patent.component.scss','../../../../../assets/given/newcss/style.css','../../../../../assets/given/newcss/splide.min.css','../../../../../assets/given/selected.css', '../../../../../assets/given/css/style-vit1.css', '../../../../../assets/given/css/style-vit2.css','../../../../../assets/given/newcss/bootstrap.min.css']
})
export class DesignPatentComponent implements OnInit {

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
   designpattern: DesignPatent[];
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
  fetchdata: any;
 
   constructor( private router:Router,private authService:AuthService,private scoreservice:ScorebookService,private modalService: NgbModal,private http:HttpClient,
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
      
    this.pubSearchList = [{
        columnName: null,
        searchType: null,
        searchId: null,
        searchValue: null,
        rangeFrom: null,
        rangeTo: null
      }];

      // Load paginated data
      this.GetDesignPatentSearchDetails();
    });
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
    if (this.ordervalue === 'Ascending') {
      this.dataList.sort((a, b) => (a.designPatentTitle > b.designPatentTitle) ? 1 : ((b.designPatentTitle > a.designPatentTitle) ? -1 : 0));
    } else if (this.ordervalue === 'Descending') {
      this.dataList.sort((a, b) => (a.designPatentTitle < b.designPatentTitle) ? 1 : ((b.designPatentTitle < a.designPatentTitle) ? -1 : 0));
    }   
    ///detailed or compact for article
    this. GetDesignPatentSearchDetails();
  }


  GetDesignPatentSearchDetails(): void {
    const requestPayload = {
      universityId: this.user.UniversityId,
      roleId: this.roleId,
      loginUserId: this.userId,
      startRow: this.startrow,
      endRow: this.endrow,
      sortColumnName: null,
      sortType: null,
      download: 0,
      filter: 0,
      searchList: this.pubSearchList
    };

   this.getList=requestPayload;

    // Now call the API
    this.scoreservice.GetDesignPatentSearchDetails(requestPayload).subscribe((res: HttpResponse<any>) => {
      // Handle response here
      console.log('Design Patent Response:', res);

                if (res.status === 200) {
                  this.mineData = res.body;
                  this.enablePic = true;
                } else {
                  this.enablePic = false;
                } 
           
      this.dataList=this.mineData.dataList;
      console.log(this.dataList)
      
           this.dataList=this.mineData.dataList;
                     console.log(this.dataList);
                     for(let i=0;i<this.dataList.length;i++){

                       if(this.dataList[i].applicantAffiliation!=null){
                         this.dataList[i].applicantAffiliation = this.dataList[i].applicantAffiliation.split('|');  
                         }

                       if(this.dataList[i].filingDate!=null){
                         this.dataList[i].filingDate=this.dataList[i].filingDate.split(' ')[0];
                         }

                       if(this.dataList[i].acceptedDate!=null){
                           this.dataList[i].acceptedDate=this.dataList[i].acceptedDate.split(' ')[0];
                         }

                       if(this.dataList[i].renewalDate!=null){
                          this.dataList[i].renewalDate=this.dataList[i].renewalDate.split(' ')[0];
                         }

                         if (this.dataList[i].designPatentStageLifeCycle != null) {
                           const designPatentStageLifeCycle = this.dataList[i].designPatentStageLifeCycle.split(',');
                 
                           this.dataList[i].designPatentStageLifeCycle = designPatentStageLifeCycle.map(item => {
                             const [name, value] = item.split(':');
                             return { name, value };
                           });
                 
                           // Assigning variable for showing values dynamically in honeycomp
                           for (let t = 0; t < this.dataList[i].designPatentStageLifeCycle.length; t++) {
                 
                                if (this.dataList[i].designPatentStageLifeCycle[t].name == "Filed") {
                                  this.dataList[i].filed = this.dataList[i].designPatentStageLifeCycle[t].value;
                                }
                                if (this.dataList[i].designPatentStageLifeCycle[t].name == "Accepted") {
                                  this.dataList[i].Accepted = this.dataList[i].designPatentStageLifeCycle[t].value;
                                }
                             }
                           }

                           if(this.dataList[i].designPatentImagePath!=null||this.dataList[i].designPatentImagePath!=""){

                            const tradeImgLoc: string[] = this.dataList[i].designPatentImagePath;
                            let imageUrl = `${environment.nodeServerUrl}/getImage?userImage=${tradeImgLoc}`;
                            if(tradeImgLoc!=null){
                            this.http.get(imageUrl, { responseType: 'text' }).subscribe(
                              (response) => {
                                  this.dataList[i].designPatentImagePath = imageUrl; // Update the imgUrl with the fetched image URL
                                  this.dataList[i].enabledesignImage=true;
                              },
                              (error) => {
                                  this.dataList[i].enabledesignImage=false;
                                  
                              });
                            }
                          }
                            else{
                                  this.dataList[i].enabledesignImage=false;
                            }
                         }    
             
                       this.collapsablesize=this.mineData.totalRowCount;
                       this.totalPages = Math.ceil(this.collapsablesize / this.pageSize); 
                         // Adjust Mpage to prevent it from exceeding totalpages
                       this.page = Math.max(1, Math.min(this.page, this.totalPages));
                         // Calculate the actual startRow and endRow based on Mpage and pageSize
                       this.startrow = (this.page - 1) * this.pageSize;
                       this.endrow = Math.min(this.startrow + this.pageSize, this.collapsablesize);
                       this.totalsize=this.mineData.totalRowCount;
                      //  this.getPdfList();
                       
                       if (this.ordervalue === 'Ascending') {
                         this.dataList.sort((a, b) => (a.designPatentTitle > b.designPatentTitle) ? 1 : ((b.designPatentTitle > a.designPatentTitle) ? -1 : 0));
                       } else if (this.ordervalue === 'Descending') {
                         this.dataList.sort((a, b) => (a.designPatentTitle < b.designPatentTitle) ? 1 : ((b.designPatentTitle < a.designPatentTitle) ? -1 : 0));
                       }   
                   },
                   (error) => {
                     this.enablePic = false; // Set enablePic to true in case of an error
                   });         
             }
           
             changesOrder(values){
               console.log(values);
               this.ordervalue=values;
               if(values=='Ascending'){
                 this.dataList.sort((a, b) => (a.designPatentTitle > b.designPatentTitle) ? 1 : ((b.designPatentTitle > a.designPatentTitle) ? -1 : 0));
               }
               if(values=='Descending'){
                 this.dataList.sort((a, b) => (a.designPatentTitle < b.designPatentTitle) ? 1 : ((b.designPatentTitle < a.designPatentTitle) ? -1 : 0));
               } 
             }
           
             onPageSizeChange(size: string){
               this.page = 1;
               this.pageSize = Number(size);
               this.endrow=this.pageSize+this.startrow;
                         // Apply sorting based on current sorting values
                if (this.ordervalue === 'Ascending') {
                 this.dataList.sort((a, b) => (a.designPatentTitle > b.designPatentTitle) ? 1 : ((b.designPatentTitle > a.designPatentTitle) ? -1 : 0));
                  } else if (this.ordervalue === 'Descending') {
                   this.dataList.sort((a, b) => (a.designPatentTitle < b.designPatentTitle) ? 1 : ((b.designPatentTitle < a.designPatentTitle) ? -1 : 0));
                  }
                this. GetDesignPatentSearchDetails();
             }
           
             exportToExcel() {
               this.excelEnable=true;
               this.setExcel().subscribe(() => {
               });
             }
           
             setExcel():Observable<any>{
               this.getList.endRow=this.collapsablesize;
                 return  this.scoreservice.fetchExportdesignPatent(this.getList).pipe(
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
               str = str.replace(/\"designPatentId\":/g, "\"DesignPatent Id\":");
               str = str.replace(/\"cbrNumber\":/g, "\"CBR No\":");
               str = str.replace(/\"designPatentNumber\":/g, "\"DesignPatent Number\":");
               str = str.replace(/\"designPatentTitle\":/g, "\"Patent Title\":");
               str = str.replace(/\"filingDate\":/g, "\"Filing Date\":");
               str = str.replace(/\"acceptedDate\":/g, "\"Accepted Date\":");
               str = str.replace(/\"renewalDate\":/g, "\"Renewal Date\":");
               str = str.replace(/\"designPatentOfficeName\":/g, "\"DesignPatent Office Name\":");        
               str = str.replace(/\"applicantAffiliation\":/g, "\"Applicant Affiliation\":");
               str = str.replace(/\"designPatentStageId\":/g, "\"DesignPatent Stage Id\":");
               str = str.replace(/\"designPatentStageName\":/g, "\"DesignPatent Stage Name\":");
               str = str.replace(/\"designPatentLacarnoSubClassName\":/g, "\"DesignPatent Sub Class Name\":");
               str = str.replace(/\"designPatentLacarnoMainClassName\":/g, "\"DesignPatent Main Class Name\":");
               str = str.replace(/\"designPatentStageLifeCycle\":/g, "\"Patent Stage Life Cycle\":");
               str = str.replace(/\"technologAreas\":/g, "\"Technology Area\":");
               this.excelList = JSON.parse(str);
               this.excelList.forEach((x) => {
                 delete x.rowNumber;delete x.applicantSNo;delete x.designPatentLacarnoSubClassId;delete x.designPatentLacarnoMainClassId;delete x.designPatentStageId;
                 delete x.designPatentStatusId;delete x.designPatentOfficeId;delete x.applicationStatusText;delete x.designPatentImagePath;delete x.applicants;delete x.isInHouse;  
               });
               this.excel.exportAsExcelFile(this.excelList, "DesignPatent_Mine");
               this.isDropdownOpen=false;
               this.excelEnable=false;
             }
           
             getPdfList(){
               this.getList.endRow=this.collapsablesize;
               this.scoreservice. fetchExportdesignPatent(this.getList).subscribe(x=>{
                 this.mineDataPdf=x;
                 this.dataListPdf=this.mineDataPdf.dataList;
               });
           
             }
           

           changeYear(values){
            console.log(values);
            this.yearorder=values;
            if(values=='Year'){
                this.dataList.sort((a,b) => b - a);
            }    
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

          }
        
           