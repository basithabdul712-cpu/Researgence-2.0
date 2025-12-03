import { AuthService } from '../../../shared/services/firebase/auth.service';
import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { FacultiesService } from '../faculties.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import {ExcelExportService} from 'src/app/shared/services/excel.service';
import { Location } from '@angular/common';
import { DashboardCompareData } from './dashboardcomparedata';


@Component({
  selector: 'app-dashboard-compare',
  templateUrl: './dashboard-compare.component.html',
  styleUrls:['./dashboard-compare.component.scss','./../../../../assets/given/newcss/style.css', './../../../../assets/given/selected.css']

})
export class DashboardCompareComponent implements OnInit {

    filterdata:boolean=false;
    isScrolled:any;
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
    compareData: DashboardCompareData = new DashboardCompareData();
    num: number=0;
    filtercondition: any;
    fromMonthYear: any;
    toMonthYear: any;
    currentYear = new Date().getFullYear();
    maxDate: Date = new Date(this.currentYear,11,31);
    Name:string;
    role:any;
    roleName:any;

    //For layer
    layerFilter:any;
    layerCampus:any;
    layerSchool:any;
    layerInst:any;
    layerDept:any;
    layerInsSchCamDep:any;
    locationFilterId:number|null= null;
    schoolFilterId:number| null =null;
    instituteFilterId:number| null=null;
    deptFilterId:number| null=null;
    departmentGroupId:number | null= null;

  constructor(public service:FacultiesService, private router:Router,private comSearch:CommonsearchService,
    private route: ActivatedRoute,private authservice:AuthService,private location: Location,
    private menuService: MenuService,private excel:ExcelExportService) { }
  
  ngOnInit() {  
    this.location.replaceState('/Dashboard/Compare');
    this.user=this.authservice.getUserDetail();
    this.userRole=this.authservice.getProfileObs();
    this.userdetail=this.authservice.getUserDetail();
    this.layerType=this.userdetail.LayerType;
    this.Name = this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    // this.authservice.RoleSelection(this.user.UniversityId, this.user.UserId).subscribe(x => {
      this.role = JSON.parse(localStorage.getItem('RoleSelection'));
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
          str = str.replace(/\"universityName\":/g, '"University":');
          if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
            str = str.replace(/\"locationName\":/g, '"LOCATION ":');
          }
          if(this.layerType=='4LType1'||this.layerType=='4LType2'){
            str = str.replace(/\"schoolName\":/g, '"SCHOOL ":');
          }
          if(this.layerType=='2LType1'||this.layerType=='3LType1'||this.layerType=='3LType3'||this.layerType=='4LType1'||this.layerType=='4LType2'){
            str = str.replace(/\"instituteName\":/g, '"INSTITUTE":');

          }
          if(this.layerType=='2LType1'||this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='3LType3'||this.layerType=='2LType2'||this.layerType=='4LType1'||this.layerType=='4LType2'){
            str = str.replace(/\"departmentName\":/g, '"DEPARTMENT":');
            }
          
          str = str.replace(/\"publications\":/g, '"Publications":');
          str = str.replace(/\"projects\":/g, '"Projects":');
          str = str.replace(/\"consultancy\":/g, '"Consultancy":');
          str = str.replace(/\"faculty\":/g, '"Faculty":');
          str = str.replace(/\"scholars\":/g, '"Scholars":');
          str = str.replace(/\"startups\":/g, '"Startups":');
          str = str.replace(/\"patents\":/g, '"Patents":');
          str = str.replace(/\"copyrights\":/g, '"Copyrights ":');
          str = str.replace(/\"trademarks\":/g, '"Trademarks":');
          str = str.replace(/\"conferences\":/g, '"Conferences":');
          str = str.replace(/\"books\":/g, '"Books":');
          str = str.replace(/\"guideship\":/g, '"Guideship":');
          str = str.replace(/\"editorship\":/g, '"Editorship":');
          str = str.replace(/\"membership\":/g, '"Membership":');
          str = str.replace(/\"fellowships\":/g, '"Fellowships":');
          str = str.replace(/\"collaborations\":/g, '"Collaborations":');
          str = str.replace(/\"fdPs\":/g, '"FDPs":');
          str = str.replace(/\"clinicalTrials\":/g, '"Clinical Trials":');
          str = str.replace(/\"digitalLearning\":/g, '"Digital Learning":');
          str = str.replace(/\"extensionActivities\":/g, '"Extension Activities":');
          str = str.replace(/\"libraryResources\":/g, '"Library Resources":');
          str = str.replace(/\"perception\":/g, '"Perception":');
          str = str.replace(/\"sponsoredProjects\":/g, '"Sponsored Projects":');
          str = str.replace(/\"awardsRecognitions\":/g, '"Awards Recognitions":');
         
          this.excelvalue = JSON.parse(str);
          this.excelvalue.forEach((x) => {
            delete x.$$index;
            delete x.universityId;
            delete x.sNo;
            delete x.locationId;
            delete x.schoolId;
            delete x.instituteId;
            delete x.departmentId;
          });
      
          this.excel.exportAsExcelFile(this.excelvalue, "DASHBOARD COMPARE");

        }
    
        // Service for excel
    getCompareExcelData() {
      
      this.user=this.authservice.getUserDetail();
      console.log(this.user);
      this.roleId=this.authservice.getProfileObs();
      console.log(this.roleId);

      this.compareData.universityId = this.user.UniversityId;
      this.compareData.roleId = this.roleId;
      this.compareData.loginUserId = this.user.UserId;  
       this.compareData.startRow = this.startrow;
      
      if(this.locationFilterId!=null||this.schoolFilterId!=null||this.instituteFilterId!=null||this.deptFilterId!=null){
          this.compareData.download = 0;
          this.compareData.filter = 1;
          this.compareData.endRow = this.facultiespub.totalRowCount;
        }
      else{
          this.compareData.download = 1;
          this.compareData.filter = 0;
          this.compareData.endRow = this.endrow;
        }

      this.service.getHomeCmp(this.compareData)
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
        this.roleId=this.authservice.getProfileObs();

        this.compareData.universityId = this.user.UniversityId;
        this.compareData.roleId = this.roleId;
        this.compareData.loginUserId = this.user.UserId;  
        this.compareData.startRow = this.startrow;
        this.compareData.endRow = this.endrow;
        this.compareData.download = 0;
        this.compareData.filter = 0;

        console.log(this.compareData);
        this.service.getHomeCmp(this.compareData).subscribe(
          data => {
          this.facultiespubs = data;
          this.facultiespub=this.facultiespubs.dataList;
          this.facultiesListdata=this.facultiespub;
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
        }
    }

    onOpenCalendar(container) {
      container.monthSelectHandler = (event: any): void => {
        container._store.dispatch(container._actions.select(event.date));
      };     
      container.setViewMode('month');
    }

        getFromYear(data){
          console.log("In");
          
          var dateObject = new Date(this.fromMonthYear);
            var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
            var year = dateObject.getFullYear().toString();
            this.fromMonthYear = month + year;
            this.filters(data);
          
        }

        getToYear(data){
          var dateObject = new Date(this.toMonthYear);
          var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
          var year = dateObject.getFullYear().toString();
          this.toMonthYear = month + year;
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

          }  

        if(val=="loc"){
            
          this.departmentGroupId=null;
          if(this.filterCamp==""){
            this.locationFilterId=null;
           }
          else{
            const filterLoc=this.layerInsSchCamDep.filter(item => item.instituteName==this.filterCamp);
            this.locationFilterId=filterLoc[0].locationId;
          }
          this.schoolFilterId=null;
          this.instituteFilterId=null;
          this.deptFilterId=null;

          this.service.getUnivLocSchInstDept(this.user.UniversityId,this.userRole,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
            if(this.layerType=="3LType1"){
            this.layerInst=x;
            this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
            }
            else if(this.layerType=="3LType2"){
                this.layerDept=x;
            }
            else if(this.layerType=="4LType2"||this.layerType=="3LType3"||this.layerType=="4LType1"){
            this.layerSchool=x;
            this.layerSchool=Array.from(new Set(this.layerSchool.map((item : any)=>item.schoolName)))
           }
          });

        }

          if(val=="scl"){

            this.departmentGroupId=null;
            if(this.filterSchool==""){
              this.schoolFilterId=null;
            }
            else{
               const schoolfilter=this.layerInsSchCamDep.filter(item=> item.schoolName==this.filterSchool);
               this.schoolFilterId=schoolfilter[0].schoolId;
            }

            this.instituteFilterId=null;
            this.deptFilterId=null;

           this.service.getUnivLocSchInstDept(this.user.UniversityId,this.userRole,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
            this.layerInst=x;
            this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
          });          
      }   

          if(val=="inst"){

            this.departmentGroupId=null;
                if(this.filterInst==""){
                  this.instituteFilterId=null;
                }
              else{         
                
                const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName===this.filterInst)              
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
                const deptfilter=this.layerInsSchCamDep.filter(item=>item.departmentName==this.filterDepart)
                this.deptFilterId=deptfilter[0].departmentId;
                if(this.deptFilterId==0){
                  this.departmentGroupId= deptfilter[0].departmentGroupId;
                }
                else{
                  this.departmentGroupId=null;
                }
              
              }
              this.service.getUnivLocSchInstDept(this.user.UniversityId,this.userRole,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
              });
            }
            if(this.filterDepart==""&&this.filterInst==""&&this.filterCamp==""&&this.filterSchool==""&&this.fromMonthYear==null&&this.toMonthYear==null){
              this.compareData.filter = 0;
              this.endrow=this.pageSize
            }
            else{
              this.compareData.filter = 1;
            }
              if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){ 
                if(this.locationFilterId==null){
                  this.schoolFilterId=null;
                  this.filterSchool="";
                  this.instituteFilterId=null;
                  this.filterInst="";
                  this.deptFilterId=null;
                  this.filterDepart="";
                  this.compareData.filter = 0;
                }
              }

              if(this.layerType=='4LType2'||this.layerType=='3LType3'){
                  if(this.schoolFilterId==null){
                    this.instituteFilterId=null;
                    this.filterInst="";
                    this.deptFilterId=null;
                    this.filterDepart="";
                    this.compareData.filter = 0;
                  }
              }

              if(this.layerType=='2LType1'){
                if(this.instituteFilterId==null){
                  this.deptFilterId=null;
                  this.filterDepart="";
                  this.compareData.filter = 0;
                }
              }

              this.compareData.universityId = this.userdetail.UniversityId;
                this.compareData.roleId = this.roleId;
                this.compareData.loginUserId = this.userdetail.UserId;
                this.compareData.locationId= this.locationFilterId;
                this.compareData.schoolId=this.schoolFilterId;
                this.compareData.instituteId= this.instituteFilterId;
                this.compareData.departmentId= this.deptFilterId;  
                this.compareData.departmentGroupId= this.departmentGroupId;
                this.compareData.startRow = this.startrow;
                this.compareData.fromMonthYear=this.fromMonthYear;
                this.compareData.toMonthYear=this.toMonthYear;
            
                if(this.startrow==0){
                  this.compareData.endRow = this.pageSize;
                }
                else{
                  this.compareData.endRow = this.endrow;
                }
              
                this.compareData.download = 0;

              this.service.getHomeCmp(this.compareData).subscribe(
                data => {
                  this.facultiespub = data;
                this.facultiesListdata = this.facultiespub.dataList;
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