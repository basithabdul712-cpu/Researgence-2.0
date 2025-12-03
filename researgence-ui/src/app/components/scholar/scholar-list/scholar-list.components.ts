import { AuthService } from '../../../shared/services/firebase/auth.service';
import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Faculty } from '../../../shared/model/data.models';
import { environment } from 'src/environments/environment';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { Facultylist } from './scholarlist';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FacultiesService } from '../../faculties/faculties.service';
@Component({
    selector: '',
    templateUrl: 'scholar-list.components.html',
    styleUrls: ['./../../../../assets/given/selected.css', './../../../../assets/given/css/style-vit1.css', './../../../../assets/given/css/style-vit2.css', './../../../../assets/given/css/style.css','./../../../../assets/given/newcss/style.css']
})

export class ScholarListComponent implements OnInit {

    stickyEnable:boolean=false;
    data: Facultylist = new Facultylist();
    public cisupport = [11];
    public hod =[9];
    public hoi =[8];
    public hoc =[7];
    public management =[6];
    public faculty=[2];
    download:Number;
    facultiesList:any; 
    imageSrc:any; 
    uibaseurl: string; 
    facultyimages: string[] =[  
    '/assets/given/facultyimagestmp/ISC001.jpg', 
    '/assets/given/facultyimagestmp/ISC002.jpg', 
    '/assets/given/facultyimagestmp/ISC003.jpg', 
    '/assets/given/facultyimagestmp/ISC004.jpg', 
    '/assets/given/facultyimagestmp/ISC005.jpg',  
    ]; 
    imageToShow = ['ISC001', 'ISC002', 'ISC003', 'ISC004', 'ISC005'];
    //For Pagination 
     num: number=0;
    page :number = 1; 
    pageSize :number=20; 
    pageSizes: any[] = ["10","20","50","100"]; 
    collectionSize:any; 
    showDropdown: boolean = false; 
    compareurl: string;
    feederurl: string;
    userRole:any;
    userDetail:any;
    isMenuOpen: boolean;
    isScrolled = false;
    public role:any;
    public roleName:any;
    @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
    newuserurl: string;
    paginatelist:any;
    totalPages: number;
    tcollectionSize: number = 0;
    tpage: number = 1;
    tpageSize: number = 20;
    dynamicpage: any;
    dynamicpages:any;
    startrow:number=0;
    endrow:number=20;
    hidedownload: boolean=false;
    value: any;
    p: any;
    filteredItems:any; 
    size:any; 
    filter:Number=0;
    searchQuery:any;
    requesturl: string; 
    Name:string;
    userid: any;
    slNo: any;
    userProfilePicLocation: any;
    enablePic: boolean=false;
    totalItems = 100; // Total number of items
    itemsPerPage = 10; // Items per page
    currentPage = 1; // Current page number
    downloadEnable:boolean=false;
    layerType:string;
    filterDepart:string;
    filterInst:string;
    filterCamp:string;
    filterSchool:string;
    locationFilterId:number;
    schoolFilterId:number;
    instituteFilterId:number;
    deptFilterId:number;
    layerFilter:any;
    layerCampus:any;
    layerSchool:any;
    layerInst:any;
    layerDept:any;
    layerInsSchCamDep:any;
    pubDBEnable:boolean=false;
    patDBEnable:boolean=false;
    filterData:number=0;
    universityName:string;
    tempRole:any;
    deptGrpId:number | null = null;
  
    constructor(public service:FacultiesService, private router:Router, private menuService: MenuService,
        private search:CommonsearchService,private authservice: AuthService,private http:HttpClient){  
      } 
   
    ngOnInit() {  

        this.uibaseurl='/scholar'; 
        this.compareurl='/scholar/compare/sch';
        this.feederurl='/facultyProfiles/feeder/sys/requestid/rfstype';
        this.requesturl='/facultyProfiles/Support/MyRequests';
        this.userRole = this.authservice.getProfileObs();
        console.log(this.userRole);
        this.tempRole = this.authservice.getProfileObs();
        this.userDetail= this.authservice.getUserDetail();
        this.universityName = this.userDetail.University;
        this.fetchData();
        this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        this.layerType=this.userDetail.LayerType;
        //for accessing menuopen 
        this.menuService.isMenuOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
        });

      //For rolename getting
          // this.authservice.RoleSelection(this.userDetail.UniversityId,this.userDetail.UserId).subscribe(x=>{
            this.role=JSON.parse(localStorage.getItem('RoleSelection'));
            const data=this.role.filter(item=> item.roleId==this.tempRole);
            this.roleName=data[0].roleName;
            console.log(this.roleName)
            // })       
           this.onWindowScroll();      
           this.service.getUnivLocSchInstDept(this.userDetail.UniversityId,this.userRole,this.userDetail.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
            this.layerFilter=x;
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
           
          } 

            // For stickey blue bar changes
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
                  this.showDropdown = !this.showDropdown; 
              } 

              fetchData() {
                this.data.universityId = this.userDetail.UniversityId;
                if(this.userRole==17){
                  this.userRole=6;
                }
                this.data.roleId = this.userRole;
                this.data.loginUserId = this.userDetail.UserId;
                this.data.startRow = this.startrow;
                this.data.endRow = this.endrow;
                this.data.download = 0;
                if(this.filterData==1){
                  this.data.filter = 1; 
                }
                else{
                  this.data.filter = 0;
                }
                
                console.log(this.data);

                this.service.getScholarList(this.data)
                  .subscribe((x:HttpResponse<any>) => {
                    console.log('Response:', x);
                    if (x.status === 200) {
                      this.dynamicpage = x.body;
                      console.log(x.status);
                      
                      this.enablePic = true;
                      console.log(this.enablePic);
                      
                    } else {
                      this.enablePic = false;
                      console.log(this.enablePic);
                      
                    }
                    
                    //this.dynamicpage = x;
                    this.dynamicpages = this.dynamicpage.dataList;
                    this.filteredItems = this.dynamicpages;
            
                    console.log(this.userProfilePicLocation);
                 
                    for (let i = 0; i < this.filteredItems.length; i++) {

                      if(this.filteredItems[i].location==null){
                        this.filteredItems[i].location="NULL";
                      }
                      if(this.filteredItems[i].school==null){
                        this.filteredItems[i].school="NULL";
                      }
                      if(this.filteredItems[i].institution==null){
                        this.filteredItems[i].institution="NULL";
                      }
                      if(this.filteredItems[i].department==null){
                        this.filteredItems[i].department="NULL";
                      }
                     
                      if(this.filteredItems[i].pubCountDBWise==null){
                        this.filteredItems[i].pubDBEnable=false;
                      }
                      else{
                        this.filteredItems[i].pubDBEnable=true;
                        if(this.filteredItems[i].pubCountDBWise&&this.filteredItems[i].pubCountDBWise.includes(";")){
                          this.filteredItems[i].pubCountDBWise=this.filteredItems[i].pubCountDBWise.replace(/;/g, '; ');
                        }
                      }
                      if(this.filteredItems[i].patCountStageWise==null){
                        this.filteredItems[i].patDBEnable=false;
                      }
                      else{
                        this.filteredItems[i].patDBEnable=true;
                        if(this.filteredItems[i].patCountStageWise&&this.filteredItems[i].patCountStageWise.includes(";")){
                          this.filteredItems[i].patCountStageWise=this.filteredItems[i].patCountStageWise.replace(/;/g, '; ');
                        }
                      }
                      // Check if filteredItems is an array and has userProfilePicLocation property
                      if (Array.isArray(this.filteredItems) && this.filteredItems[i].hasOwnProperty('userProfilePicLocation')) {
                          this.filteredItems[i].seriesNo = i + 1;
                          if (this.imageToShow.find(x => x == this.filteredItems[i].empId)) {
                              this.filteredItems[i].userProfilePicLocation = this.facultyimages;
                          } else if (this.filteredItems[i].userProfilePicLocation != null && this.filteredItems[i].userProfilePicLocation.length > 0) {
                              const userProfilePicLocation: string[] = this.filteredItems[i].userProfilePicLocation;
                              let imageUrl = `${environment.nodeServerUrl}/getImage?userImage=${userProfilePicLocation}`;
                              // let imageUrlWithoutExtension = imageUrl.substring(0, imageUrl.lastIndexOf('.'));
                              this.http.get(imageUrl, { responseType: 'text' }).subscribe(
                                  (response) => {
                                      this.filteredItems[i].userProfilePicLocation = imageUrl; // Update the imgUrl with the fetched image URL
                                      console.log('Fetched Image:', this.filteredItems[i].userProfilePicLocation);
                                  },
                                  (error) => {
                                      console.error('Error fetching Image:', error);
                                      this.filteredItems[i].userProfilePicLocation = "assets/images/user/default.png";
                                  });
                          }
                      } else {
                        this.filteredItems[i].userProfilePicLocation ="assets/images/user/default.png"; 
                          console.error('filteredItems or userProfilePicLocation is not defined or in incorrect format.');
                      }

                      if(this.filteredItems[i].userProfilePicLocation==null){
                        this.filteredItems[i].userProfilePicLocation = "assets/images/user/default.png";
                      }
                  
                  }
                    console.log(this.filteredItems);
                  
                    this.tcollectionSize = this.dynamicpage.dataList.length;
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
                    console.log(this.tcollectionSize);
                    // Update the values used in the <h6> tag
                    this.page = this.tpage;
                    console.log(this.page);               
            
                  },
                  );
                }       
            
              onPageSizeChange(size: string){
                  this.page = 1; 
                  this.pageSize = Number(size);
                  this.endrow=this.pageSize+this.startrow;
                  if(this.filterCamp!=undefined||this.filterSchool!=undefined||this.filterInst!=undefined||this.filterDepart!=undefined){
                  this.filterData=1;
                   }
                   else{
                    this.filterData=0;
                   }
                  this.fetchData();
                }
              
                onPageChange(page: number) {
                  this.page = Math.max(1, Math.min(page, this.totalPages)); 
                  
                  if (this.page == 1) {
                    this.startrow = 0;
                  } else {
                    this.startrow = (this.page - 1) * this.pageSize; 
                  }
                  this.endrow = Math.min(this.startrow + this.pageSize, this.tcollectionSize);  
                }

              searchData(value){
                this.filteredItems = this.dynamicpages?.filter(item => item.facultyName.toLowerCase().includes(value.toLowerCase())||item.empId.toLowerCase().includes(value.toLowerCase()));
                console.log(this.filteredItems);
                
                this.tcollectionSize=this.filteredItems.length;
                if(this.tcollectionSize<this.pageSize){
                  this.endrow=this.tcollectionSize;
                }
                else{
                  this.endrow=this.pageSize;
                }
              }

              captureAsPDF(val:number) {
                if(val==1){
                if(this.filteredItems.length>0){
                for (let i = 0; i < this.filteredItems.length; i++) {
                  // Check if filteredItems is an array and has userProfilePicLocation property
                  if (Array.isArray(this.filteredItems) && this.filteredItems[i].hasOwnProperty('userProfilePicLocation')) {
                      this.filteredItems[i].seriesNo = i + 1;
                      if (this.imageToShow.find(x => x == this.filteredItems[i].empId)) {
                          this.filteredItems[i].userProfilePicLocation = this.facultyimages;
                      } else if (this.filteredItems[i].userProfilePicLocation != null && this.filteredItems[i].userProfilePicLocation.length > 0) {
                          const userProfilePicLocation: string[] = this.filteredItems[i].userProfilePicLocation;
                          let imageUrl = `${environment.nodeServerUrl}/getImage?userImage=${userProfilePicLocation}`;
                          // let imageUrlWithoutExtension = imageUrl.substring(0, imageUrl.lastIndexOf('.'));
                          // console.log(imageUrlWithoutExtension);
                          this.http.get(imageUrl, { responseType: 'text' }).subscribe(
                              (response) => {
                                  this.filteredItems[i].userProfilePicLocation = imageUrl; // Update the imgUrl with the fetched image URL
                                  console.log('Fetched Image:', this.filteredItems[i].userProfilePicLocation);
                              },
                              (error) => {
                                  console.error('Error fetching Image:', error);
                                  this.filteredItems[i].userProfilePicLocation = "assets/images/user/default.png";
                              });
                      }
                  } else {
                    this.filteredItems[i].userProfilePicLocation ="assets/images/user/default.png"; 
                      console.error('filteredItems or userProfilePicLocation is not defined or in incorrect format.');
                  }
              
              }
                console.log(this.filteredItems);
              
                this.tcollectionSize = this.dynamicpage.dataList.length;
                if(this.tcollectionSize==0){
                  this.num=0;
                }
                else{
                  this.num=1;
                }
                this.totalPages = 1; 
                // Adjust Mpage to prevent it from exceeding totalpages
                this.tpage = 1;

                // Calculate the actual startRow and endRow based on Mpage and pageSize
                  this.startrow = 0;
                  this.endrow = this.tcollectionSize;
                  this.pageSize=this.tcollectionSize;
                console.log(this.tcollectionSize);
                // Update the values used in the <h6> tag
                this.page = this.tpage;
                console.log(this.page);  
                alert("PDF generated sucessfully. Please click download")             
                 this.downloadEnable=true;
              }
            }
              else if(val==0){
                var printContents = document.getElementById('printform').innerHTML;
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
                    '<link rel="stylesheet" href="./../../../../assets/given/selected.css"/>' +
                    '<link rel="stylesheet" href="./../../../../assets/given/css/style-vit1.css"/>' +
                    '<link rel="stylesheet" href="./../../../../assets/given/css/style-vit2.css"/>' +
                    '<link rel="stylesheet" href="./../../../../assets/given/css/style.css"/>' +
                    '</head><body onload="window.print();window.close()">' +
                    printContents +
                    '</body></html>'
                );
                popupWin.document.close();
                  this.downloadEnable=false;
               console.log("FacultyList");
               this.fetchData();
               this.downloadEnable=false;
              }
             
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
  
            this.service.getUnivLocSchInstDept(this.userDetail.UniversityId,this.userRole,this.userDetail.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
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
  
             this.service.getUnivLocSchInstDept(this.userDetail.UniversityId,this.userRole,this.userDetail.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
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
  
                this.service.getUnivLocSchInstDept(this.userDetail.UniversityId,this.userRole,this.userDetail.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
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
                  console.log(this.deptFilterId);
                  if(this.deptFilterId==0){
                    this.deptGrpId= deptfilter[0].departmentGroupId;
                  }
                  else{
                    this.deptGrpId=null;
                  }
                  
                }
                this.service.getUnivLocSchInstDept(this.userDetail.UniversityId,this.userRole,this.userDetail.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
                  console.log(x);
                });
              }
              if(this.filterDepart==""&&this.filterInst==""&&this.filterCamp==""&&this.filterSchool==""){
                this.data.filter = 0;
                this.endrow=this.pageSize
              }
              else{
                this.data.filter = 1;
              }          

                this.data.universityId = this.userDetail.UniversityId;
                if(this.userRole==17){
                  this.userRole=6;
                }
                  this.data.roleId = this.userRole;
                  this.data.loginUserId = this.userDetail.UserId;
                  this.data.locationId= this.locationFilterId;
                  this.data.schoolId=this.schoolFilterId;
                  this.data.instituteId= this.instituteFilterId;
                  this.data.departmentId= this.deptFilterId; 
                  this.data.departmentGroupId= this.deptGrpId; 
                  this.data.startRow = this.startrow;
              
                  if(this.startrow==0){
                    this.data.endRow = this.pageSize;
                  }
                  else{
                    this.data.endRow = this.endrow;
                  }
                
                  this.data.download = 0;
                  console.log(this.data);
                  if(this.data.locationId==null||this.data.locationId==undefined){
                    this.data.locationId=0;
                  }
                  if(this.data.schoolId==null||this.data.schoolId==undefined){
                    this.data.schoolId=0;
                  }
                  if(this.data.instituteId==null||this.data.instituteId==undefined){
                    this.data.instituteId=0;
                  }
                  // if(this.data.departmentId==null||this.data.departmentId==undefined){
                  //   this.data.departmentId=0;
                  // }
  
                  this.service.getScholarList(this.data)
                  .subscribe((x:HttpResponse<any>) => {
                    console.log('Response:', x);
                    if (x.status === 200) {
                      this.dynamicpage = x.body;   
                    } else {
                      this.enablePic = false;    
                    }               
                    //this.dynamicpage = x;
                    this.dynamicpages = this.dynamicpage.dataList;
                    this.filteredItems = this.dynamicpages;
            
                    console.log(this.userProfilePicLocation);
                 
                    for (let i = 0; i < this.filteredItems.length; i++) {          
                     
                      if(this.filteredItems[i].pubCountDBWise==null){
                        this.filteredItems[i].pubDBEnable=false;
                      }
                      else{
                        this.filteredItems[i].pubDBEnable=true;
                        if(this.filteredItems[i].pubCountDBWise&&this.filteredItems[i].pubCountDBWise.includes(";")){
                          this.filteredItems[i].pubCountDBWise=this.filteredItems[i].pubCountDBWise.replace(/;/g, '; ');
                        }
                      }
                      if(this.filteredItems[i].patCountStageWise==null){
                        this.filteredItems[i].patDBEnable=false;
                      }
                      else{
                        this.filteredItems[i].patDBEnable=true;
                        if(this.filteredItems[i].patCountStageWise&&this.filteredItems[i].patCountStageWise.includes(";")){
                          this.filteredItems[i].patCountStageWise=this.filteredItems[i].patCountStageWise.replace(/;/g, '; ');
                        }
                      }
                      // Check if filteredItems is an array and has userProfilePicLocation property
                      if (Array.isArray(this.filteredItems) && this.filteredItems[i].hasOwnProperty('userProfilePicLocation')) {
                          this.filteredItems[i].seriesNo = i + 1;
                          if (this.imageToShow.find(x => x == this.filteredItems[i].empId)) {
                              this.filteredItems[i].userProfilePicLocation = this.facultyimages;
                          } else if (this.filteredItems[i].userProfilePicLocation != null && this.filteredItems[i].userProfilePicLocation.length > 0) {
                              const userProfilePicLocation: string[] = this.filteredItems[i].userProfilePicLocation;
                              let imageUrl = `${environment.nodeServerUrl}/getImage?userImage=${userProfilePicLocation}`;
                              // let imageUrlWithoutExtension = imageUrl.substring(0, imageUrl.lastIndexOf('.'));
                              // console.log(imageUrlWithoutExtension);
                              this.http.get(imageUrl, { responseType: 'text' }).subscribe(
                                  (response) => {
                                      this.filteredItems[i].userProfilePicLocation = imageUrl; // Update the imgUrl with the fetched image URL
                                      console.log('Fetched Image:', this.filteredItems[i].userProfilePicLocation);
                                  },
                                  (error) => {
                                      console.error('Error fetching Image:', error);
                                      this.filteredItems[i].userProfilePicLocation = "assets/images/user/default.png";
                                  });
                          }
                      } else {
                        this.filteredItems[i].userProfilePicLocation ="assets/images/user/default.png"; 
                          console.error('filteredItems or userProfilePicLocation is not defined or in incorrect format.');
                      }
                  
                  }
                    console.log(this.filteredItems);
                  
                    this.tcollectionSize = this.dynamicpage.dataList.length;
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
                    console.log(this.tcollectionSize);
                    // Update the values used in the <h6> tag
                    this.page = this.tpage;
                    console.log(this.page);               
            
                  },);
          }
  

    }
