import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/firebase/auth.service';
import { FacultiesService } from '../../faculties/faculties.service';
import { ScorebookService } from '../../scorebook/scorebook.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralApiService } from '../../general-api.service';
import { ExcelExportService } from '../../../shared/services/excel.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MenuService } from '../../../shared/services/menu.service';
import { PubSearchList } from '../../../shared/model/PostPayload';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-trademark-mine-result',
  templateUrl: './trademark-mine-result.component.html',
  styleUrls: ['./trademark-mine-result.component.scss','../../../../../src/assets/given/newcss/style.css','../../../../../src/assets/given/newcss/splide.min.css','../../../../../src/assets/given/selected.css', '../../../../../src/assets/given/css/style-vit1.css', '../../../../../src/assets/given/css/style-vit2.css','../../../../../src/assets/given/newcss/bootstrap.min.css']
})
export class TrademarkMineResultComponent implements OnInit {

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
  ordervalueTM: any;
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

  constructor( private router:Router,private authService:AuthService,private scoreservice:ScorebookService,private modalService: NgbModal, private route:ActivatedRoute,private http:HttpClient,
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
        columnName: "TrademarkTitle",
        searchType: "Like",
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
    if (this.ordervalueTM === 'Ascending') {
      this.dataList.sort((a, b) => (a.trademarkTitle > b.trademarkTitle) ? 1 : ((b.trademarkTitle > a.trademarkTitle) ? -1 : 0));
    } else if (this.ordervalueTM === 'Descending') {
      this.dataList.sort((a, b) => (a.trademarkTitle < b.trademarkTitle) ? 1 : ((b.trademarkTitle < a.trademarkTitle) ? -1 : 0));
    }   
    ///detailed or compact for article
    this.fetchdata();
  }

  fetchdata(){
 
        this.gservice.fetchTrademarkDB(this.getList).subscribe((x: HttpResponse<any>)=>{ 
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

            if(this.dataList[i].filingDate!=null){
              this.dataList[i].filingDate=this.dataList[i].filingDate.split(' ')[0];
              }

            if(this.dataList[i].registeredDate!=null){
                this.dataList[i].registeredDate=this.dataList[i].registeredDate.split(' ')[0];
              }

            if(this.dataList[i].expiryDate!=null){
               this.dataList[i].expiryDate=this.dataList[i].expiryDate.split(' ')[0];
              }

              if (this.dataList[i].trademarkStageLifeCycle != null) {
                const trademarkStageLifeCycle = this.dataList[i].trademarkStageLifeCycle.split(',');
      
                this.dataList[i].trademarkStageLifeCycle = trademarkStageLifeCycle.map(item => {
                  const [name, value] = item.split(':');
                  return { name, value };
                });
      
                // Assigning variable for showing values dynamically in honeycomp
                for (let t = 0; t < this.dataList[i].trademarkStageLifeCycle.length; t++) {
      
                    if (this.dataList[i].trademarkStageLifeCycle[t].name == "Filed") {
                      this.dataList[i].filed = this.dataList[i].trademarkStageLifeCycle[t].value;
                    }
                    if (this.dataList[i].trademarkStageLifeCycle[t].name == "Examined") {
                      this.dataList[i].examined = this.dataList[i].trademarkStageLifeCycle[t].value;
                    }
                    if (this.dataList[i].trademarkStageLifeCycle[t].name == "Registered") {
                      this.dataList[i].registered = this.dataList[i].trademarkStageLifeCycle[t].value;
                    }
                    if (this.dataList[i].trademarkStageLifeCycle[t].name == "Expired") {
                      this.dataList[i].expired = this.dataList[i].trademarkStageLifeCycle[t].value;
                    }
                  }
                }

                if(this.dataList[i].trademarkImagePath!=null||this.dataList[i].trademarkImagePath!=""){

                  const tradeImgLoc: string[] = this.dataList[i].trademarkImagePath;
                  let imageUrl = `${environment.nodeServerUrl}/getImage?userImage=${tradeImgLoc}`;
                  this.http.get(imageUrl, { responseType: 'text' }).subscribe(
                    (response) => {
                        this.dataList[i].trademarkImagePath = imageUrl; // Update the imgUrl with the fetched image URL
                        this.dataList[i].enableTradeImage=true;
                    },
                    (error) => {
                        this.dataList[i].enableTradeImage=false;
                        
                    });
                }
                else{
                      this.dataList[i].enableTradeImage=false;
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
            if (this.ordervalueTM === 'Ascending') {
              this.dataList.sort((a, b) => (a.trademarkTitle > b.trademarkTitle) ? 1 : ((b.trademarkTitle > a.trademarkTitle) ? -1 : 0));
            } else if (this.ordervalueTM === 'Descending') {
              this.dataList.sort((a, b) => (a.trademarkTitle < b.trademarkTitle) ? 1 : ((b.trademarkTitle < a.trademarkTitle) ? -1 : 0));
            }   
        },
        (error) => {
          this.enablePic = false; // Set enablePic to true in case of an error
        });         
  }

        changesOrder(values){
          console.log(values);
          this.ordervalueTM=values;
          if(values=='Ascending'){
            this.dataList.sort((a, b) => (a.trademarkTitle > b.trademarkTitle) ? 1 : ((b.trademarkTitle > a.trademarkTitle) ? -1 : 0));
          }
          if(values=='Descending'){
            this.dataList.sort((a, b) => (a.trademarkTitle < b.trademarkTitle) ? 1 : ((b.trademarkTitle < a.trademarkTitle) ? -1 : 0));
          } 
        }

        onPageSizeChange(size: string){
          this.page = 1;
          this.pageSize = Number(size);
          this.endrow=this.pageSize+this.startrow;
                    // Apply sorting based on current sorting values
          if (this.ordervalueTM === 'Ascending') {
            this.dataList.sort((a, b) => (a.trademarkTitle > b.trademarkTitle) ? 1 : ((b.trademarkTitle > a.trademarkTitle) ? -1 : 0));
            } else if (this.ordervalueTM === 'Descending') {
              this.dataList.sort((a, b) => (a.trademarkTitle < b.trademarkTitle) ? 1 : ((b.trademarkTitle < a.trademarkTitle) ? -1 : 0));
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
            return  this.gservice.fetchExportTrademark(this.getList).pipe(
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
          str = str.replace(/\"trademarkId\":/g, "\"Trademark ID\":");
          str = str.replace(/\"applicationNumber\":/g, "\"Application Number\":");
          str = str.replace(/\"trademarkNumber\":/g, "\"Trademark Number\":");
          str = str.replace(/\"trademarkTitle\":/g, "\"Trademark Title\":");
          str = str.replace(/\"trademarkOfficeName\":/g, "\"Trademark Office Name\":");
          str = str.replace(/\"filingDate\":/g, "\"Filing Date\":");
          str = str.replace(/\"registeredDate\":/g, "\"Registered Date\":");
          str = str.replace(/\"expiryDate\":/g, "\"Expiry Date\":");
          str = str.replace(/\"trademarkTypeName\":/g, "\"Trademark Type Name\":");
          str = str.replace(/\"trademarkStageName\":/g, "\"Trademark Stage Name\":");
          str = str.replace(/\"trademarkStatusName\":/g, "\"Trademark Status Name\":");
          str = str.replace(/\"trademarkStageLifeCycle\":/g, "\"Trademark Stage Life Cycle\":");
          str = str.replace(/\"applicantAffiliation\":/g, "\"Applicant Affiliation\":");
          this.excelList = JSON.parse(str);

          this.excelList.forEach((x) => {
            delete x.isInHouse;delete x.trademarkName;delete x.trademarkOfficeId;delete x.trademarkClassId;delete x.trademarkClassName;
            delete x.trademarkTypeId;delete x.examinationDate;delete x.trademarkStageId;delete x.trademarkStatusId;delete x.trademarkImagePath;delete x.applicants;
          });

          this.excel.exportAsExcelFile(this.excelList, "Trademarks_Mine_Result");
          this.isDropdownOpen=false;
          this.excelEnable=false;
          
        }


}
