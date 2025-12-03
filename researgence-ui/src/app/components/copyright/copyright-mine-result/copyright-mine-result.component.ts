import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/firebase/auth.service';
import { FacultiesService } from '../../faculties/faculties.service';
import { ScorebookService } from '../../scorebook/scorebook.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralApiService } from '../../general-api.service';
import { ExcelExportService } from '../../../shared/services/excel.service';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MenuService } from '../../../shared/services/menu.service';
import { PubSearchList } from '../../../shared/model/PostPayload';



@Component({
  selector: 'app-copyright-mine-result',
  templateUrl: './copyright-mine-result.component.html',
  styleUrls: ['./copyright-mine-result.component.scss','../../../../../src/assets/given/newcss/style.css','../../../../../src/assets/given/newcss/splide.min.css','../../../../../src/assets/given/selected.css', '../../../../../src/assets/given/css/style-vit1.css', '../../../../../src/assets/given/css/style-vit2.css','../../../../../src/assets/given/newcss/bootstrap.min.css']
})
export class CopyrightMineResultComponent implements OnInit {

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
  ordervalueCP: any;
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
  pubSearchList: PubSearchList[];

  constructor( private router:Router,private authService:AuthService,private scoreservice:ScorebookService,private modalService: NgbModal, private route:ActivatedRoute,
    private menuService:MenuService,private facultyservice: FacultiesService,private fb: FormBuilder,private gservice:GeneralApiService,private excel: ExcelExportService) {
    {
      
    } }

  ngOnInit(): void { 
      this.user=this.authService.getUserDetail();
      this.roleId=this.authService.getProfileObs();
      console.log(this.roleId);
      this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      this.universityName=this.user.University;
      this.userId=this.user.UserId;
      this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
      this.role=x;
       const data=this.role.filter(item=> item.roleId==this.roleId);
      this.roleName=data[0].roleName;


      });
      this.menuService.isMenuOpen$.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
      });

      this.pubSearchList=[  {
        columnName: null,
        searchType: null,
        searchId: null,
        searchValue: null,
        rangeFrom: null,
        rangeTo: null,
       }];

       this.getList={
        universityId: this.user.UniversityId,
        roleId: this.roleId,
        loginUserId: this.user.UserId,
        sortColumnName: null,
        sortType: null,
        startRow: this.startrow,
        endRow: this.endrow,
        download: 0,
        filter: 0,
        searchList:this.pubSearchList
      };

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
    if (this.ordervalueCP === 'Ascending') {
      this.dataList.sort((a, b) => (a.copyrightTitle > b.copyrightTitle) ? 1 : ((b.copyrightTitle > a.copyrightTitle) ? -1 : 0));
    } else if (this.ordervalueCP === 'Descending') {
      this.dataList.sort((a, b) => (a.copyrightTitle < b.copyrightTitle) ? 1 : ((b.copyrightTitle < a.copyrightTitle) ? -1 : 0));
    }   
    ///detailed or compact for article
    this.fetchdata();
  }

  fetchdata(){
 
        this.gservice.fetchCopyrightsDB(this.getList).subscribe((x: HttpResponse<any>)=>{ 
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
            if(this.dataList[i].rocDate!=null){
                this.dataList[i].rocDate=this.dataList[i].rocDate.split(' ')[0];
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
            if (this.ordervalueCP === 'Ascending') {
              this.dataList.sort((a, b) => (a.copyrightTitle > b.copyrightTitle) ? 1 : ((b.copyrightTitle > a.copyrightTitle) ? -1 : 0));
            } else if (this.ordervalueCP === 'Descending') {
              this.dataList.sort((a, b) => (a.copyrightTitle < b.copyrightTitle) ? 1 : ((b.copyrightTitle < a.copyrightTitle) ? -1 : 0));
            }   
        },
        (error) => {
          this.enablePic = false; // Set enablePic to true in case of an error
        });         
  }

        changesOrder(values){
          console.log(values);
          this.ordervalueCP=values;
          if(values=='Ascending'){
            this.dataList.sort((a, b) => (a.copyrightTitle > b.copyrightTitle) ? 1 : ((b.copyrightTitle > a.copyrightTitle) ? -1 : 0));
          }
          if(values=='Descending'){
            this.dataList.sort((a, b) => (a.copyrightTitle < b.copyrightTitle) ? 1 : ((b.copyrightTitle < a.copyrightTitle) ? -1 : 0));
          } 
        }

        onPageSizeChange(size: string){
          this.page = 1;
          this.pageSize = Number(size);
          this.endrow=this.pageSize+this.startrow;
                    // Apply sorting based on current sorting values
          if (this.ordervalueCP === 'Ascending') {
            this.dataList.sort((a, b) => (a.copyrightTitle > b.copyrightTitle) ? 1 : ((b.copyrightTitle > a.copyrightTitle) ? -1 : 0));
            } else if (this.ordervalueCP === 'Descending') {
              this.dataList.sort((a, b) => (a.copyrightTitle < b.copyrightTitle) ? 1 : ((b.copyrightTitle < a.copyrightTitle) ? -1 : 0));
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
            return  this.gservice.fetchExportCopyrights(this.getList).pipe(
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
          str = str.replace(/\"copyrightId\":/g, "\"Copyright ID\":");
          str = str.replace(/\"applicationNumber\":/g, "\"Application Number\":");
          str = str.replace(/\"rocNumber\":/g, "\"ROC Number\":");
          str = str.replace(/\"copyrightTitle\":/g, "\"Copyright Title\":");
          str = str.replace(/\"filingDate\":/g, "\"Filing Date\":");
          str = str.replace(/\"rocDate\":/g, "\"ROC Date\":");
          str = str.replace(/\"copyrightTypeName\":/g, "\"Copyrights Type Name\":");
          str = str.replace(/\"copyrightStatusName\":/g, "\"Copyrights Status Name\":");
          str = str.replace(/\"copyrightOfficeName\":/g, "\"Copyrights Office Name\":");
          str = str.replace(/\"inventorAffiliation\":/g, "\"Inventor Affiliation\":");
          str = str.replace(/\"applicantAffiliation\":/g, "\"Applicant Affiliation\":");
          this.excelList = JSON.parse(str);

          this.excelList.forEach((x) => {
            delete x.rowNumber;delete x.isInHouse;delete x.inventors;delete x.applicants;delete x.uniqueIdLegacy;
            delete x.copyrightTypeId;delete x.copyrightStatusId;delete x.copyrightOfficeId;
          });

          this.excel.exportAsExcelFile(this.excelList, "Copyrights_Mine_Result");
          this.isDropdownOpen=false;
          this.excelEnable=false;
          
        }


}
