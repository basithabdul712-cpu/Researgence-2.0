
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { AdminclientService } from '../adminclient.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { HttpClient } from '@angular/common/http';
import { FacultiesService } from '../../faculties/faculties.service';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-subcription-report',
  templateUrl: './subcription-report.component.html',
  styleUrls: ['./subcription-report.component.scss','./../../../../assets/given/newcss/style.css']
})
export class SubcriptionReportComponent implements OnInit {

@ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
 
  public universityList:any;
  public userName:string;
  public universityName:any;
  public universityId:string="";
  public fill:any;
  public user:any=[]
  isMenuOpen:boolean;
dataList:any;
  list:any[]=[];
  masterSelected:boolean;
  checklist:any[]=[];
  checkedList:any;
  selectedDataList: any[] = [];
superadmin="13";
  // support="12";
  pdfNew:any;
  universityFilter:any;
  name: string;
  data: any;
  university: any;
  page=1;
  pageSize = 10;
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
startrow:number=0;
endrow:number=0;
totalPages: number;
roleName: any;
stickyEnable: any;
isScrolled: any;
role: any;
ActiontypeId: number=0;
isReadOnly: boolean=false;
enableBox: boolean = false;
popupAlert:string;
crossRefValues:any;
file: File | null = null;
  searchData: String="";
hideDrop:boolean=false;
  filterTitle: any;
  
userStatusFilter:any;
  filterdata: any = [];
 
  
  
 
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
 
 
            if(this.userName==this.superadmin){
            this.route.params.subscribe(params => {     
              this.universityId=params.univId;  
            });
          }
          // this.getList();
          // this.getItem();
          this.loadData();
          this.facultyservice.getSummarylist(this.userName, this.user.UserId).subscribe(x => {
          this.dataList = x ;
          this.filterdata=this.dataList;
          console.log(this.dataList);
          this.collectionSize=this.dataList.length;
          this.totalPages = Math.ceil(this.collectionSize / this.pageSize);
          
         this.page = Math.max(1, Math.min(this.page, this.dataList.length));
         
         this.startrow = (this.page - 1) * this.pageSize;
         this.endrow = Math.min(this.startrow + this.pageSize, this.collectionSize);
          console.log(this.page);  
        });
            
            this.service.getUniversitytitle(this.user.UserId).subscribe(data => {
              this.data = data;
              console.log(this.data)
              if(this.userName==this.superadmin){
              this.university = this.data.filter(item => item.universityId == this.universityId);
              console.log(this.university);
                this.name = this.university[0].universityName;
                console.log(this.name)
              }        
            });  
             this.service.getServiceStatus().subscribe(response => {
      this.userStatusFilter = response;
      console.log(response);
    });
 
            
        }
loadData() {
  forkJoin({
    summary: this.facultyservice.getSummary(this.userName, this.user.UserId),
    detailed: this.facultyservice.getSummarylist(this.userName, this.user.UserId)
  }).subscribe((result: { summary: any; detailed: any[] }) => {
 
    // Wrap the single object into an array for the first table
    this.list = result.summary ? [result.summary] : [];
 
    this.dataList = result.detailed || [];
 
    // this.collectionSize = Math.max(this.list.length, this.dataList.length);
    this.collectionSize = this.dataList.length;
    this.page = 1;
    this.startrow = 0;
    this.endrow = Math.min(this.pageSize, this.collectionSize);
 
    console.log("Summary data:", this.list);
    console.log("Detailed data:", this.dataList);
  });
}
 
 
  onPageChange(page: number) {
    this.page = page;
    this.startrow = (page - 1) * this.pageSize;
    this.endrow = Math.min(this.startrow + this.pageSize, this.collectionSize);
  }
 
  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollY = window.scrollY;
    if (this.blueheader) {
      const element = this.blueheader.nativeElement;
      if (scrollY >= 20) {
        element.classList.remove('bluebar_expand');
        element.classList.add('bluebar_collapse');
        this.stickyEnable = true;
      } else {
        element.classList.remove('bluebar_collapse');
        element.classList.add('bluebar_expand');
        this.stickyEnable = false;
      }
    }
  }
 
  exportexcel() {
    const workbook = XLSX.utils.book_new();
 
    // Convert summary list (first table)
    // const summarySheet = XLSX.utils.json_to_sheet(this.list.map(sum => ({
    //   TotalAlerts: sum.totalAlerts,
    //   ExpiredCount: sum.expiredCount,
    //   CriticalCount: sum.criticalCount,
    //   HighCount: sum.highCount,
    //   MediumCount: sum.mediumCount,
    //   LowCount: sum.lowCount,
    //   NextExpiryDate: sum.nextExpiryDate,
    //   NextExpiryDays: sum.nextExpiryDays
    // })));
 
    // Convert detailed list (second table)
    const detailedSheet = XLSX.utils.json_to_sheet(this.dataList.map(item => ({
      UniversityId: item.universityId,
      UniversityName: item.universityName,
      PlanTypeId: item.planTypeId,
      DaysLeft: item.daysLeft,
      AlertLevel: item.alertLevel,
      AlertColor: item.alertColor,
      AlertMessage: item.alertMessage,
      IsExpired: item.isExpired,
      IsCritical: item.isCritical,
      StartDate: item.startDate,
      EndDate: item.endDate,
      CurrentDate: item.currentDate
    })));
 
    //XLSX.utils.book_append_sheet(workbook, summarySheet, 'Rfs_Summary_List');
    XLSX.utils.book_append_sheet(workbook, detailedSheet, 'Rfs_Detailed_List');
    XLSX.writeFile(workbook, 'Subscription_Summary_Report.xlsx');
  }
  clearFilter() {
  this.searchData = "";
  this.hideDrop = false;
 
  // Restore complete detailed list
  this.dataList = [...this.filterdata];
 
  // Recalc pagination
  this.collectionSize = this.dataList.length;
  this.page = 1;
  this.startrow = 0;
  this.endrow = Math.min(this.pageSize, this.collectionSize);
}
 
  filterRecords() {
 
  // If Support User → filter by selected university name (searchData)
  if (this.userName == this.superadmin) {
 
    const keyword = this.searchData?.trim().toLowerCase();
 
    if (keyword) {
      this.dataList = this.filterdata.filter(x =>
        x.universityName.toLowerCase().includes(keyword)
      );
    } else {
      this.dataList = [...this.filterdata];
    }
  }
 
  // If Support Admin → filter by fixed universityId
  else if (this.userName == this.superadmin) {
 
    if (this.universityId) {
      this.dataList = this.filterdata.filter(x =>
        x.universityId == this.universityId
      );
    } else {
      this.dataList = [...this.filterdata];
    }
  }
 
  // Recalculate Records Count
  this.collectionSize = this.dataList.length;
  this.page = 1;
  this.startrow = 0;
  this.endrow = Math.min(this.pageSize, this.collectionSize);
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
 
   onPageSizeChange(size: string){
    this.page = 1;
    this.pageSize = Number(size);
    this.endrow=this.pageSize+this.startrow;
    this.loadData();
    
  }
   changeTitle(x:String) {
 
    if(x==""){  
        this.hideDrop=false;
  
    }
    else{
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
 
}
 
  onSelectTitle(universityId: string, universityName: string) {
 
    this.searchData = universityName;
    this.hideDrop=false;
  
  }
}

