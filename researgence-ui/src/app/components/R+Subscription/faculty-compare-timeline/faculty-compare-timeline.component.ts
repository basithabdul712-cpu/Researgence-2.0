import { AuthService } from '../../../shared/services/firebase/auth.service';
import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { FacultiesService } from '../../faculties/faculties.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import {ExcelExportService} from 'src/app/shared/services/excel.service';
import { FacultyTimelineData } from './facultytimelinedata';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { AgGridComponent } from '../../faculties/faculty-compare/ag-grid/ag-grid.component';

@Component({
  selector: 'app-faculty-compare-timeline',
  templateUrl: './faculty-compare-timeline.component.html',
  styleUrls:['./faculty-compare-timeline.component.scss','./../../../../assets/given/newcss/style.css', './../../../../assets/given/selected.css']

})
export class FacultyCompareTimelineComponent implements OnInit {

  @ViewChild(AgGridComponent) agGridComponent!: AgGridComponent;
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
    dbName:string;
    articleName:string;
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
    facultyCompareData: FacultyTimelineData = new FacultyTimelineData();
    num: number=0;
    filtercondition: any;
    fromMonthYear: any|null=null;
    toMonthYear: any|null=null;
    currentYear = new Date().getFullYear();
    maxDate: Date = new Date(this.currentYear,11,31);
    Name:string;
    role:any;
    roleName:any;
    isScrolled: any;
    tempUnivName:any;
    //For layer
    layerFilter:any;
    layerCampus:any;
    layerSchool:any;
    layerInst:any;
    layerDept:any;
    layerInsSchCamDep:any;
    locationFilterId:number|null=null;
    schoolFilterId:number|null=null;
    instituteFilterId:number|null=null;
    deptFilterId:number|null=null;
    publicationDBId:number|null=null;
    articleId:number|null=null;
    enablePic:boolean=false;
    layerList:any;
    databaseDropDown:any;
    typeDropDownList:any;
    tempList:any=[];
    enablSize:boolean=false;
    enableFilterText:boolean=false;
    deptGrpId:number| null =null;

  constructor(public service:FacultiesService, private router:Router,private comSearch:CommonsearchService,
    private route: ActivatedRoute,private authservice:AuthService,
    private menuService: MenuService,private excel:ExcelExportService) { }
  
  ngOnInit() {  

    this.user=this.authservice.getUserDetail();
    this.userRole=this.authservice.getProfileObs();
    this.userdetail=this.authservice.getUserDetail();
    this.tempUnivName=localStorage.getItem("clientUniv");
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
              const filterData = (data: any[]) => {
                return data.filter(item => item.locationName !== null);
              };
              this.layerCampus=filterData(this.layerCampus);
          }
          else if(this.layerType=='4LType2'||this.layerType=='3LType3'){
            this.layerInsSchCamDep=this.layerFilter;
            this.layerSchool=Array.from(new Set(this.layerFilter.map((item : any)=>item.schoolName)))
            const filterData = (data: any[]) => {
              return data.filter(item => item.schoolName !== null);
            };
            this.layerSchool=filterData(this.layerSchool);
          }
          else if(this.layerType=='2LType1'){
            this.layerInsSchCamDep=this.layerFilter;
            this.layerInst=Array.from(new Set(this.layerFilter.map((item : any)=>item.instituteName)))
            const filterData = (data: any[]) => {
              return data.filter(item => item.instituteName !== null);
            };
            this.layerInst=filterData(this.layerInst);
          }
          else if(this.layerType=='2LType2'){
            this.layerInsSchCamDep=this.layerFilter;
            this.layerDept=this.layerFilter;
            const filterData = (data: any[]) => {
              return data.filter(item => item.departmentName !== null);
            };
            this.layerDept=filterData(this.layerDept);
          }
        
        });

        this.service.getDropdown('publicationdb').subscribe(x=>{
          this.databaseDropDown=x;
        });

        this.service.getDropdown('ArticleType').subscribe(x=>{
          this.typeDropDownList=x;
        });
   
      //for accessing menuopen 
      this.menuService.isMenuOpen$.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
      });

       this.getFacultyCompareDetails()
      //  this.getCompareExcelData() ;

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

        downloadExcel() {
          this.enablePic=true;
          this.enableFilterText=false;
          this.getCompareExcelData().subscribe(() => {
            this.exportExcel(); 
            this.enablePic=false;
          });
      }

        getCompareExcelData(): Observable<any> {
          this.user = this.authservice.getUserDetail();
          this.roleId = this.authservice.getProfileObs();

          
          this.facultyCompareData.universityId = this.user.UniversityId;
          this.facultyCompareData.roleId = this.roleId;
          this.facultyCompareData.loginUserId = this.user.UserId;
          this.facultyCompareData.startRow = this.startrow;

          if (this.locationFilterId || this.schoolFilterId || this.instituteFilterId || this.deptFilterId) {
            this.facultyCompareData.download = 0;
            this.facultyCompareData.filter = 1;
            this.facultyCompareData.endRow = this.facultiespub.totalRowCount;
          } else {
            this.facultyCompareData.download = 1;
            this.facultyCompareData.filter = 0;
            this.facultyCompareData.endRow = this.endrow;
          }

          return this.service.researchTimeLineList(this.facultyCompareData).pipe(
            tap((x: any) => {
              this.excelList = x;
              this.excelvalue = this.excelList.dataList;
              this.tempList = []; 

              this.excelvalue.forEach(item => {
                this.tempList.push(item); 
              });

              console.log("Formatted Data for Export:", this.tempList);
            })
          );
        }

exportExcel() {

  const columnHeaders = [
    { key: "rowNumber", label: "SNo." },
    { key: "employeeId", label: "Emp ID" },
    { key: "authorName", label: "Name of Faculty" },
    { key: "totalPubCount", label: "Total" },
    { key: "year1", label: "2025" }, { key: "year2", label: "2024" }, { key: "year3", label: "2023" },
    { key: "year4", label: "2022" }, { key: "year5", label: "2021" }, { key: "year6", label: "2020" },
    { key: "year7", label: "2019" }, { key: "year8", label: "2018" }, { key: "year9", label: "2017" },
    { key: "year10", label: "2016" }, { key: "otherYears", label: "<2016 Year" },
    { key: "articleTypeName", label: "Article Type" },
    { key: "publicationDBName", label: "Publication DB" },
    { key: "location", label: this.layerType.match(/3LType1|3LType2|4LType1/) ? "Location" : null },
    { key: "school", label: this.layerType.match(/4LType1|4LType2/) ? "School" : null },
    { key: "institute", label: this.layerType.match(/2LType1|3LType1|3LType3|4LType1|4LType2/) ? "Institute" : null },
    { key: "department", label: this.layerType.match(/2LType1|3LType1|3LType2|3LType3|2LType2|4LType1|4LType2/) ? "Department" : null }
  ].filter(h => h.label !== null); 

  const headerRow = columnHeaders.map(header => header.label);

  const formattedData = this.tempList.map(item => {
    return columnHeaders.map(header => item[header.key] !== undefined ? item[header.key] : "");
  });

  const finalExcelData = [headerRow, ...formattedData];

  console.log("Final Data for Excel Export:", finalExcelData);

  this.excel.exportAsExcelFileTimeline(finalExcelData, "Faculty Compare Timeline View");
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
    
          this.facultyCompareData.universityId = this.user.UniversityId;
          this.facultyCompareData.roleId = this.roleId;  
        this.facultyCompareData.loginUserId = this.user.UserId;  
        this.facultyCompareData.startRow = this.startrow;
        this.facultyCompareData.endRow = 0;
        this.facultyCompareData.download = 0;
        this.facultyCompareData.filter = 0;

        console.log(this.facultyCompareData);
        this.service.researchTimeLineList(this.facultyCompareData).subscribe(
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
        this.enablSize=true;
        if(Number(size)>100){
          this.facultyCompareData.endRow=this.tcollectionSize;
          this.page = 1; 
          this.pageSize = Number(size);
       }
        else{
          this.page = 1; 
          this.pageSize = Number(size);
          this.facultyCompareData.endRow=this.pageSize+this.startrow;
        }
       
      }
    
      onPageChange(page: number) {
        this.tpage = Math.max(1, Math.min(page, this.totalPages)); 
        if (this.tpage == 1) {
          this.facultyCompareData.startRow = 0;
        } else {
          this.facultyCompareData.startRow = (this.tpage - 1) * this.pageSize; 
        }
        this.facultyCompareData.endRow= Math.min(this.facultyCompareData.startRow + this.pageSize, this.tcollectionSize); 
        console.log(this.endrow);

        this.filterRecord();
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
        //   if(val=="from"||val=="to"){
        //     if(this.fromMonthYear==null||this.fromMonthYear==undefined){
        //       this.fromMonthYear=null;
        //     }
        //     if(this.toMonthYear==null||this.toMonthYear==undefined){
        //       this.toMonthYear=null;
        //     }  
        //     console.log(this.fromMonthYear);
            
        // }  


        if(val=="database"){
              if(this.dbName==""){
                this.publicationDBId=null;
              }
              else{
                const filterDb= this.databaseDropDown.filter(x=>x.value==this.dbName);
                this.publicationDBId=filterDb[0].id;
                console.log(this.publicationDBId);
                
              }   
         }  

         if(val=="article"){
              if(this.articleName==""){
                this.articleId=null;
              }
              else{
                const filterArticle= this.typeDropDownList.filter(x=>x.value==this.articleName);
                this.articleId=filterArticle[0].id;
                console.log(this.articleId);
                
              }   
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
            const filterData = (data: any[]) => {
              return data.filter(item => item.instituteName !== null);
            };
            this.layerInst=filterData(this.layerInst);
            }
            else if(this.layerType=="3LType2"){
                this.layerDept=x;
                const filterData = (data: any[]) => {
                  return data.filter(item => item.departmentName !== null);
                };
                this.layerDept=filterData(this.layerDept);
            }
            else if(this.layerType=="4LType2"||this.layerType=="3LType3"){
            this.layerSchool=x;
            this.layerSchool=Array.from(new Set(this.layerSchool.map((item : any)=>item.schoolName)))
            const filterData = (data: any[]) => {
              return data.filter(item => item.schoolName !== null);
            };
            this.layerSchool=filterData(this.layerSchool);
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
            const filterData = (data: any[]) => {
              return data.filter(item => item.instituteName !== null);
            };
            this.layerInst=filterData(this.layerInst);
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
                const filterData = (data: any[]) => {
                  return data.filter(item => item.departmentName !== null);
                };
                this.layerDept=filterData(this.layerDept);
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
              this.facultyCompareData.filter = 0;
              this.endrow=this.pageSize
            }
            else{
              this.facultyCompareData.filter = 1;
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
                  this.facultyCompareData.filter = 0;
                }
              }

              if(this.layerType=='4LType2'||this.layerType=='3LType3'){
                  if(this.schoolFilterId==null){
                    this.instituteFilterId=null;
                    this.filterInst="";
                    this.deptFilterId=null;
                    this.deptGrpId=null;
                    this.filterDepart="";
                    this.facultyCompareData.filter = 0;
                  }
              }

              if(this.layerType=='2LType1'){
                if(this.instituteFilterId==null){
                  this.deptFilterId=null;
                  this.deptGrpId=null;
                  this.filterDepart="";
                  this.facultyCompareData.filter = 0;
                }
              }

                this.facultyCompareData.universityId = this.userdetail.UniversityId;
                this.facultyCompareData.roleId = this.roleId;         
                this.facultyCompareData.loginUserId = this.userdetail.UserId;
                this.facultyCompareData.locationId= this.locationFilterId;
                this.facultyCompareData.schoolId=this.schoolFilterId;
                this.facultyCompareData.instituteId= this.instituteFilterId;
                this.facultyCompareData.departmentId= this.deptFilterId;  
                this.facultyCompareData.departmentGroupId= this.deptGrpId;
                this.facultyCompareData.startRow = this.startrow;
                this.facultyCompareData.fromMonthYear=this.fromMonthYear;
                this.facultyCompareData.toMonthYear=this.toMonthYear;
                this.facultyCompareData.publicationDBId=this.publicationDBId;
                this.facultyCompareData.articleTypeId=this.articleId;
                this.facultyCompareData.endRow = 0;
              
                this.facultyCompareData.download = 0;
                console.log(this.facultyCompareData);

        }

        clearFilter(){

          this.locationFilterId=null;
          this.schoolFilterId=null;
          this.instituteFilterId=null;
          this.deptFilterId=null;
          this.deptGrpId=null;
          this.fromMonthYear=null;
          this.toMonthYear=null;
          this.publicationDBId=null;
          this.articleId=null;

          this.dbName="";
          this.articleName="";
          this.filterCamp="";
          this.filterSchool="";
          this.filterInst="";
          this.filterDepart="";

          this.facultyCompareData.universityId = this.userdetail.UniversityId;
          this.facultyCompareData.roleId = this.roleId;         
          this.facultyCompareData.loginUserId = this.userdetail.UserId;
          this.facultyCompareData.locationId= this.locationFilterId;
          this.facultyCompareData.schoolId=this.schoolFilterId;
          this.facultyCompareData.instituteId= this.instituteFilterId;
          this.facultyCompareData.departmentId= this.deptFilterId;  
          this.facultyCompareData.departmentGroupId= this.deptGrpId;
          this.facultyCompareData.startRow = this.startrow;
          this.facultyCompareData.fromMonthYear=this.fromMonthYear;
          this.facultyCompareData.toMonthYear=this.toMonthYear;
          this.facultyCompareData.publicationDBId=this.publicationDBId;
          this.facultyCompareData.articleTypeId=this.articleId;
          this.facultyCompareData.endRow = 0;
          this.facultyCompareData.filter = 0;
          this.facultyCompareData.download = 0;

             // Scroll to top
             window.scrollTo(0, 0);
             //  To enable page load icon
               this.enablePic=true;
               this.enableFilterText=true;
   
             this.service.filterResearchTimeLine(this.facultyCompareData).subscribe(
               (data:HttpResponse<any>) => {
                 if (data.status === 200) {
                   this.facultiespub = data.body;
                   console.log(data.status);
                   
                   this.enablePic = false;
                   console.log(this.enablePic);
                   
                 } else {
                   this.enablePic = true;
                   console.log(this.enablePic);
                   
                 }
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
             
            });

        }

        filterRecord(){
          // Scroll to top
          window.scrollTo(0, 0);
          //  To enable page load icon
            this.enablePic=true;
            this.enableFilterText=true;

          this.service.filterResearchTimeLine(this.facultyCompareData).subscribe(
            (data:HttpResponse<any>) => {
              if (data.status === 200) {
                this.facultiespub = data.body;
                console.log(data.status);
                
                this.enablePic = false;
                console.log(this.enablePic);
                
              } else {
                this.enablePic = true;
                console.log(this.enablePic);
                
              }
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

        downloadCsv(): void {
          this.agGridComponent.exportToExcelTimeLine('Faculty Compare Timeline View');
        }  

}