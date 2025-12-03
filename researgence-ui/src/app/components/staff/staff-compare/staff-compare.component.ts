import { AuthService } from '../../../shared/services/firebase/auth.service';
import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { FacultiesService } from '../../faculties/faculties.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import {ExcelExportService} from 'src/app/shared/services/excel.service';
import {StaffCompareData} from './staffcomparedata';


@Component({
  selector: 'app-staff-compare',
  templateUrl: './staff-compare.component.html',
  styleUrls: ['./../../../../assets/given/newcss/style.css', './../../../../assets/given/selected.css']
})
export class StaffCompareComponent implements OnInit {

    filterdata:boolean=false;
    @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
    stickyEnable:any;
    selectedCamp:string="AllCampus";
    campus:any;
    facultiespub:any;
    searchText: string = '';
    //sort
    currentSortColumn: string;
    currentSortDirection: string;
    facultiesListdata: any;
    //paginate
    page:number=1;
    pageSize:number=20;
    pageSizes: any[] = ["10","15","20","100"];
    displayedFaculties: any;
    userdetail:any;
    layerType:any;
    userRole:any;
    user: any;
    filterDepart:string;
    filterInst:string;
    filterCamp:string;
    filterSchool:string;
    isMenuOpen: boolean;
    value:any;
    totalPages: number;
    tcollectionSize: number = 0;
    tpage: number = 1;
    startrow:number=0;
    endrow:number=20;
    download:number=0;
    excelList:any;
    excelvalue:any;
    facultiespubs: any;
    roleId: any;
    scholarCompareData: StaffCompareData = new StaffCompareData();
    num: number=0;
    filtercondition: any;
    fromMonthYear: any;
    toMonthYear: any;
    currentYear = new Date().getFullYear();
    maxDate: Date = new Date(this.currentYear,11,31);
    Name:string;
    role:any;
    roleName:any;
    isScrolled: any;

    //For layer
    layerFilter:any;
    layerCampus:any;
    layerSchool:any;
    layerInst:any;
    layerDept:any;
    layerInsSchCamDep:any;
    locationFilterId:number;
    schoolFilterId:number;
    instituteFilterId:number;
    deptFilterId:number;
    deptGrpId:number| null =null;

  constructor(public service:FacultiesService, private router:Router,private comSearch:CommonsearchService,
    private route: ActivatedRoute,private authservice:AuthService,
    private menuService: MenuService,private excel:ExcelExportService) { }
  
  ngOnInit() {  

    this.user=this.authservice.getUserDetail();
    this.userRole=this.authservice.getProfileObs();
    this.userdetail=this.authservice.getUserDetail();
    this.layerType=this.userdetail.LayerType;
    this.Name = this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      //For rolename getting
      // this.authservice.RoleSelection(this.user.UniversityId, this.user.UserId).subscribe(x => {
          this.role=JSON.parse(localStorage.getItem('RoleSelection'));
        const data = this.role.filter(item => item.roleId == this.userRole);
        this.roleName = data[0].roleName;
        console.log(this.roleName)
      // })
    this.service.getUnivLocSchInstDept(this.user.UniversityId,this.userRole,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
      this.layerFilter=x;
      console.log(x);  
      if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
          this.layerInsSchCamDep=this.layerFilter;
           this.layerCampus=Array.from(new Set(this.layerFilter.map((item : any)=>item.locationName)))
      }
      else if(this.layerType=='4LType2'||this.layerType=='3LType3'){
        this.layerInsSchCamDep=this.layerFilter;
        this.layerSchool=Array.from(new Set(this.layerFilter.map((item : any)=>item.schoolName)))
      }
      else if(this.layerType=='2LType1'){
        this.layerInsSchCamDep=this.layerFilter;
        this.layerInst=Array.from(new Set(this.layerFilter.map((item : any)=>item.instituteName)))
      }
      else if(this.layerType=='2LType2'){
        this.layerInsSchCamDep=this.layerFilter;
        this.layerDept=this.layerFilter;
      }
     
    })
    
      //for accessing menuopen 
      this.menuService.isMenuOpen$.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
      });

       this.getFacultyCompareDetails()
       this.getCompareExcelData() ;

  }
    
    sort(columnName: string) {
      if (this.currentSortColumn === columnName) {
        this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.currentSortDirection = 'asc';
      }
      this.currentSortColumn = columnName;
      this.facultiesListdata.sort((a, b) => {
        if (a[columnName] < b[columnName]) {
          return this.currentSortDirection === 'asc' ? -1 : 1;
        } else if (a[columnName] > b[columnName]) {
          return this.currentSortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }

        exportExcel() {

          this.getCompareExcelData();
          let str = JSON.stringify(this.excelvalue);
          str = str.replace(/\"rowNumber\":/g, '"Sl No.":');  
          str = str.replace(/\"employeeId\":/g, '"Emp ID":');
          str = str.replace(/\"authorName\":/g, '"Author":');
          str = str.replace(/\"totalPubCount\":/g, '"Total":');
          str = str.replace(/\"scopusPubCount\":/g, '"SCS":');
          str = str.replace(/\"wosPubcount\":/g, '"WOS":');
          str = str.replace(/\"sciPubCount\":/g, '"SCI":');
          str = str.replace(/\"pubmedPubCount\":/g, '"PMD ":');
          str = str.replace(/\"ieeePubcount\":/g, '"IEEE":');
          str = str.replace(/\"abdcPubCount\":/g, '"ABDC":');
          str = str.replace(/\"ugccarePubcount\":/g, '"UGC CARE ":');
          str = str.replace(/\"ugccareGp1Pubcount\":/g, '"UGC CARE1":');
          str = str.replace(/\"gsPubCount\":/g, '"GSC":');
          str = str.replace(/\"scopusCitation\":/g, '"Citations SCS":');
          str = str.replace(/\"wosCitation\":/g, '"Citations WOS":');
          str = str.replace(/\"gsCitation\":/g, '"Citations GCS":');
          str = str.replace(/\"scopusHindex\":/g, '"h-Index SCS":');
          str = str.replace(/\"wosHindex\":/g, '"h-Index WOS":');
          str = str.replace(/\"gsHindex\":/g, '"h-Index GSC":');
          str = str.replace(/\"scopusI10index\":/g, '"i10 SCS ":');
          str = str.replace(/\"wosI10index\":/g, '"i10 WOS":');
          str = str.replace(/\"gsI10Index\":/g, '"i10 GSC ":');
          str = str.replace(/\"scopusAvgSNIP\":/g, '"Scopus Snip (AVG)":');
          str = str.replace(/\"scopusAvgCiteScore\":/g, '"Cite-Score SCS":');
          str = str.replace(/\"wosAvgImpFactor\":/g, '"Impact Factor WOS ":');
          str = str.replace(/\"scopusQ1\":/g, '"Q1 SCS ":');
          str = str.replace(/\"scopusQ2\":/g, '"Q2 SCS":');
          str = str.replace(/\"wosQ1\":/g, '"Q1 WOS ":');
          str = str.replace(/\"wosQ2\":/g, '"Q2 WOS":');
          str = str.replace(/\"journalCount\":/g, '"Journal":');
          str = str.replace(/\"conferenceCount\":/g, '"Conference" :');
          str = str.replace(/\"bookCount\":/g, '"Book":');
          str = str.replace(/\"bookChapterCount\":/g, '"Book-Chapter":');
          if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
            str = str.replace(/\"location\":/g, '"Location ":');
          }
          if(this.layerType=='4LType1'||this.layerType=='4LType2'){
            str = str.replace(/\"school\":/g, '"School ":');
          }
          if(this.layerType=='2LType1'||this.layerType=='3LType1'||this.layerType=='3LType3'||this.layerType=='4LType1'||this.layerType=='4LType2'){
            str = str.replace(/\"institute\":/g, '"Institute":');

          }
          if(this.layerType=='2LType1'||this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='3LType3'||this.layerType=='2LType2'||this.layerType=='4LType1'||this.layerType=='4LType2'){
            str = str.replace(/\"department\":/g, '"Department":');
            }  
         
          this.excelvalue = JSON.parse(str);
          this.excelvalue.forEach((x) => {
            delete x.$$index;delete x.universityId;delete x.sNo;delete x.userId;delete x.department;delete x.institute;delete x.location;
            delete x.employeeId;delete x.authorName;
          });
      
          this.excel.exportAsExcelFile(this.excelvalue, "FACULTY COMPARE");

        }
    
        // Service for excel
    getCompareExcelData() {
      
      this.user=this.authservice.getUserDetail();
      console.log(this.user);
      this.roleId=this.authservice.getProfileObs();
      console.log(this.roleId);

      this.scholarCompareData.universityId = this.user.UniversityId;
      this.scholarCompareData.roleId = this.roleId;
      this.scholarCompareData.loginUserId = this.user.UserId;  
       this.scholarCompareData.startRow = this.startrow;
      
      if(this.locationFilterId!=null||this.schoolFilterId!=null||this.instituteFilterId!=null||this.deptFilterId!=null){
          this.scholarCompareData.download = 0;
          this.scholarCompareData.filter = 1;
          this.scholarCompareData.endRow = this.facultiespub.totalRowCount;
        }
      else{
          this.scholarCompareData.download = 1;
          this.scholarCompareData.filter = 0;
          this.scholarCompareData.endRow = this.endrow;
        }

      this.service.ResearcherStaffCompare(this.scholarCompareData)
        .subscribe(x => {
          this.excelList = x;
          this.excelvalue = this.excelList.dataList;
          console.log(this.excelvalue);
          
        });
    }
    
      dropvalue(e){
        console.log(e);
        this.pageSize=Number(e);
      }

      //For previous & next page
      onPaginationChange(page: number){
        this.page = page;
        this.updateDisplayedFaculties();
      }

      updateDisplayedFaculties(){
        const startIndex = (this.page - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.displayedFaculties = this.facultiesListdata.slice(startIndex, endIndex);
      }

      getFacultyCompareDetails() {

        this.user=this.authservice.getUserDetail();
        console.log(this.user);
        this.roleId=this.authservice.getProfileObs();
        console.log(this.roleId);

        this.scholarCompareData.universityId = this.user.UniversityId;
        this.scholarCompareData.roleId = this.roleId;
        this.scholarCompareData.loginUserId = this.user.UserId;  
        this.scholarCompareData.startRow = this.startrow;
        this.scholarCompareData.endRow = this.endrow;
        this.scholarCompareData.download = 0;
        this.scholarCompareData.filter = 0;

        console.log(this.scholarCompareData);
        this.service.ResearcherStaffCompare(this.scholarCompareData).subscribe(
          data => {
            console.log(data)
          this.facultiespubs = data;
          this.facultiespub=this.facultiespubs.dataList;
          this.facultiesListdata=this.facultiespub;
          console.log(this.facultiesListdata); 
          this.tcollectionSize = this.facultiespubs.totalRowCount;
          if(this.tcollectionSize==0){
            this.num=0;
           }
           else{
            this.num=1;
           }
          this.totalPages = Math.ceil(this.tcollectionSize / this.pageSize); 
          // Adjust Mpage to prevent it from exceeding totalpages
         this.tpage = Math.max(1, Math.min(this.tpage, this.totalPages));
          // Calculate the actual startRow and endRow based on Mpage and pageSize
         this.startrow = (this.tpage - 1) * this.pageSize;
         this.endrow = Math.min(this.startrow + this.pageSize, this.tcollectionSize);
          console.log(this.page);
          
        },
        (error) => {
          const errorUrl = this.router.createUrlTree(['/apierror/error/handle'], { queryParams: { message: error.message } }).toString();
          const newWindow = window.open(errorUrl, '_blank');
          newWindow.document.title = "Error Handling";
        });
      }

      onPageSizeChange(size: string){
        this.page = 1; 
        this.pageSize = Number(size);
        this.endrow=this.pageSize+this.startrow;
        if(this.filterdata==false){
        this.getFacultyCompareDetails();
        }
        else{
          this.filters(this.filtercondition);
        }
      }
    
      onPageChange(page: number) {
        this.tpage = Math.max(1, Math.min(page, this.totalPages)); 
        
        if (this.tpage == 1) {
          this.startrow = 0;
        } else {
          this.startrow = (this.tpage - 1) * this.pageSize; 
        }
        this.endrow = Math.min(this.startrow + this.pageSize, this.tcollectionSize);  

        if(this.filterdata==false){
          this.getFacultyCompareDetails();   
        }
        else
        {
          this.filters(this.filtercondition);
          console.log(this.filtercondition);    
        }
    }

    onOpenCalendar(container) {
      container.monthSelectHandler = (event: any): void => {
        container._store.dispatch(container._actions.select(event.date));
      };     
      container.setViewMode('month');
    }

        getFromYear(data){
          var dateObject = new Date(this.fromMonthYear);
            var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
            var year = dateObject.getFullYear().toString();
            this.fromMonthYear = month + year;
            console.log(this.fromMonthYear); 
            this.filters(data);
          
        }

        getToYear(data){
          var dateObject = new Date(this.toMonthYear);
          var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
          var year = dateObject.getFullYear().toString();
          this.toMonthYear = month + year;
          console.log(this.toMonthYear); 
          this.filters(data);
        }

        filters(val){

          if(val=="from"||val=="to"){
            if(this.fromMonthYear==null||this.fromMonthYear==undefined){
              this.fromMonthYear=null;
            }
            if(this.toMonthYear==null||this.toMonthYear==undefined){
              this.toMonthYear=null;
            }  
            console.log(this.fromMonthYear);
            
              }  

        if(val=="loc"){
          this.deptGrpId=null;
          if(this.filterCamp==""){
            this.locationFilterId=null;
           }
          else{
            const filterLoc=this.layerInsSchCamDep.filter(item => item.locationName===this.filterCamp);
            this.locationFilterId=filterLoc[0].locationId;
          }
          this.schoolFilterId=null;
          this.instituteFilterId=null;
          this.deptFilterId=null;

          this.service.getUnivLocSchInstDept(this.user.UniversityId,this.userRole,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
            console.log(x);
            if(this.layerType=="3LType1"){
            this.layerInst=x;
            this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
            }
            else if(this.layerType=="3LType2"){
                this.layerDept=x;
            }
            else if(this.layerType=="4LType2"||this.layerType=="3LType3"){
            this.layerSchool=x;
            this.layerSchool=Array.from(new Set(this.layerSchool.map((item : any)=>item.schoolName)))
           }
          });

          }

          if(val=="scl"){

            this.deptGrpId=null;
            if(this.filterSchool==""){
              this.schoolFilterId=null;
            }
            else{
               const schoolfilter=this.layerInsSchCamDep.filter(item=> item.schoolName===this.filterSchool);
               this.schoolFilterId=schoolfilter[0].schoolId;        
            }
            
            this.instituteFilterId=null;
            this.deptFilterId=null;

           this.service.getUnivLocSchInstDept(this.user.UniversityId,this.userRole,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
            console.log(x);
            this.layerInst=x;
            this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
          });          
      }   

          if(val=="inst"){

               this.deptGrpId=null;
                if(this.filterInst==""){
                  this.instituteFilterId=null;
                }
              else{      
                   
                const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName===this.filterInst);
                this.instituteFilterId=instfilter[0].instituteId;
                }

                this.deptFilterId=null;

              this.service.getUnivLocSchInstDept(this.user.UniversityId,this.userRole,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
                this.layerDept=x;
              });

          }

          if(val=="dept"){
            
                if(this.filterDepart==""){
                  this.deptFilterId=null;
                }
              else{
                console.log(this.layerInsSchCamDep);
                const deptfilter=this.layerInsSchCamDep.filter(item=>item.departmentName==this.filterDepart)
                this.deptFilterId=deptfilter[0].departmentId;
                if(this.deptFilterId==0){
                  this.deptGrpId= deptfilter[0].departmentGroupId;
                }
                else{
                  this.deptGrpId=null;
                }
              }
              this.service.getUnivLocSchInstDept(this.user.UniversityId,this.userRole,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
                console.log(x);
              });
            }
            if(this.filterDepart==""&&this.filterInst==""&&this.filterCamp==""&&this.filterSchool==""){
              this.scholarCompareData.filter = 0;
              this.endrow=this.pageSize;
            }
            else{
              this.scholarCompareData.filter = 1;
            }
              if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){ 
                if(this.locationFilterId==null){
                  this.schoolFilterId=null;
                  this.filterSchool="";
                  this.instituteFilterId=null;
                  this.filterInst="";
                  this.deptFilterId=null;
                  this.deptGrpId=null;
                  this.filterDepart="";
                  this.scholarCompareData.filter = 0;
                }
              }

              if(this.layerType=='4LType2'||this.layerType=='3LType3'){
                  if(this.schoolFilterId==null){
                    this.instituteFilterId=null;
                    this.filterInst="";
                    this.deptFilterId=null;
                    this.deptGrpId=null;
                    this.filterDepart="";
                    this.scholarCompareData.filter = 0;
                  }
              }

              if(this.layerType=='2LType1'){
                if(this.instituteFilterId==null){
                  this.deptFilterId=null;
                  this.deptGrpId=null;
                  this.filterDepart="";
                  this.scholarCompareData.filter = 0;
                }
              }

              this.scholarCompareData.universityId = this.userdetail.UniversityId;
                this.scholarCompareData.roleId = this.roleId;
                this.scholarCompareData.loginUserId = this.userdetail.UserId;
                this.scholarCompareData.locationId= this.locationFilterId;
                this.scholarCompareData.schoolId=this.schoolFilterId;
                this.scholarCompareData.instituteId= this.instituteFilterId;
                this.scholarCompareData.departmentId= this.deptFilterId;  
                this.scholarCompareData.departmentGroupId = this.deptGrpId;
                this.scholarCompareData.startRow = this.startrow;
                this.scholarCompareData.fromMonthYear=this.fromMonthYear;
                this.scholarCompareData.toMonthYear=this.toMonthYear;
            
                if(this.startrow==0){
                  this.scholarCompareData.endRow = this.pageSize;
                }
                else{
                  this.scholarCompareData.endRow = this.endrow;
                }
              
                this.scholarCompareData.download = 0;
                console.log(this.scholarCompareData);

              this.service.ResearcherStaffCompare(this.scholarCompareData).subscribe(
                data => {
                  this.facultiespub = data;
                this.facultiesListdata = this.facultiespub.dataList;
                console.log(this.facultiesListdata);
                this.tcollectionSize = this.facultiespub.totalRowCount;
                if(this.tcollectionSize==0){
                  this.num=0;
                }
                else{
                  this.num=1;
                }
                
              this.totalPages = Math.ceil(this.tcollectionSize / this.pageSize); 
              this.tpage = Math.max(1, Math.min(this.tpage, this.totalPages));
              this.startrow = (this.tpage - 1) * this.pageSize;
              this.endrow = Math.min(this.startrow + this.pageSize, this.tcollectionSize);
                console.log(this.page);
                this.getCompareExcelData();
              
                });
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

}