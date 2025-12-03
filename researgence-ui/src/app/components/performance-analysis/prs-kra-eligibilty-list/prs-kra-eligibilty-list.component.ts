import { AuthService } from './../../../shared/services/firebase/auth.service';
import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { FacultiesService } from '../../faculties/faculties.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import {ExcelExportService} from 'src/app/shared/services/excel.service';
import {FacultyCompareData} from '../../faculties/faculty-compare/facultycomparedata';
import { AgGridComponent } from '../../faculties/faculty-compare/ag-grid/ag-grid.component';

@Component({
  selector: 'app-prs-kra-eligibilty-list',
  templateUrl: './prs-kra-eligibilty-list.component.html',
  styleUrls: ['./prs-kra-eligibilty-list.component.scss','./../../../../assets/given/newcss/style.css', './../../../../assets/given/selected.css']
})
export class PRSKRAEligibiltyListComponent implements OnInit {

 
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
    facultyCompareData: FacultyCompareData = new FacultyCompareData();
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
    enablePic:boolean=false;
    layerList:any;
    enablSize:boolean=false;
    enableFilterText:boolean=false;
    deptGrpId:number|null =null;

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
                      console.log(this.layerFilter);
                      
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
                  
                  })
                //for accessing menuopen 
                this.menuService.isMenuOpen$.subscribe(isOpen => {
                  this.isMenuOpen = isOpen;
                });

                this.getFacultyCompareDetails()

  }
    

      getFacultyCompareDetails() {

          // this.facultiesListdata=this.facultiespub;
             this.service.GetPRSKRAEligiblityList(this.user.UniversityId,this.userRole,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId).subscribe(data=>{
                 this.facultiesListdata=data;
                 console.log(this.facultiesListdata);               
             });
      
      }

        filters(val){

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
                    }
                  }

                  if(this.layerType=='4LType2'||this.layerType=='3LType3'){
                      if(this.schoolFilterId==null){
                        this.instituteFilterId=null;
                        this.filterInst="";
                        this.deptFilterId=null;
                        this.deptGrpId=null;
                        this.filterDepart="";
                      }
                  }

                  if(this.layerType=='2LType1'){
                    if(this.instituteFilterId==null){
                      this.deptFilterId=null;
                      this.deptGrpId=null;
                      this.filterDepart="";
                    }
                  }

            }

        clearFilter(){      

            this.locationFilterId=null;
            this.schoolFilterId=null;
            this.instituteFilterId=null;
            this.deptFilterId=null;
            this.deptGrpId=null;
            this.filterCamp = "";
            this.filterSchool = "";
            this.filterInst = "";
            this.filterDepart = "";

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
                            console.log(this.layerFilter);
                            
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

                    this.getFacultyCompareDetails();       

             }

        filterRecords(){
           
          // Scroll to top
               window.scrollTo(0, 0);
              //  To enable page load icon
                this.enableFilterText=true;

                this.service.GetPRSKRAEligiblityList(this.user.UniversityId,this.userRole,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId).subscribe(data=>{
                     this.facultiesListdata=data;
                     console.log(this.facultiesListdata);               
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
          this.agGridComponent.exportToExcel('PRS - KRA Eligibility List');
        }  


}
