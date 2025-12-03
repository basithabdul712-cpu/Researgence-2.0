import { filter } from 'rxjs/operators';
import { FacultiesService } from 'src/app/components/faculties/faculties.service';
import { AuthService } from '../../../shared/services/firebase/auth.service';
import { AdminclientService } from '../adminclient.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { MenuService } from 'src/app/shared/services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import { ScorebookService } from './../../scorebook/scorebook.service';
import { PubSearchList } from 'src/app/shared/model/PostPayload';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Dfsedit } from '../../faculties/dfs-edit/dfsedit';
import { DfsPublication } from '../../faculties/feedersystem/dfsPublication';

@Component({
  selector: 'app-librarian-uncatogorypublication',
  templateUrl: './librarian-uncatogorypublication.component.html',
  styleUrls: ['./librarian-uncatogorypublication.component.scss', './../../../../assets/given/newcss/dfs-style/bootstrap.min.css','./../../../../assets/given/newcss/dfs-style/style.css']
})
export class LibrarianUncatogorypublicationComponent implements OnInit {
  user: any;
  isMenuOpen: boolean;
  isScrolled = false;
  public roleId: any;
  universityName: any;
  userId: any;
  public roleName: any;
  Name: string;
  userRole: string;
  role: any;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  stickyEnable: boolean;
  universityList: any;
  layerList: any;
  getList: any;
  startrow: number = 0;
  endrow: number = 20;
  mineData: any;
  dataList: any;
  layerIns: any;
  collapsablesize: any;
  totalPages: number;
  page: number = 1;
  dfsPublication: any;
  pageSize: number = 20;
  totalsize: any;
  ordervalue: any;
  yearorder: any;
  dataFilter: any;
  pageSizecount = ["10", "20", "50", "100"];
  enableViewPub: boolean = false;
  checkValues: Dfsedit;
  userdata:any;
  tempusers:any;
  dfsIndexing:any;
  feeders: any[] = [];
  editRowId: any;
  enableEdit:boolean=false;
  authForm: FormGroup;
  enableHome:boolean=false;
  enableAway:boolean=false;
  filteredList:any;
  uniqCountry:any;
  uniqState:any;
  uniqueLocationNames:any;
  layerSchool: any;
  layerDept:any;
  commonDropDown = [{ "key": 0, "value": "NO" },
  { "key": 1, "value": "YES" }];
  countryList:any;
  FilterCountry:any;
  filteredState:any;
  filterLocation:any;
  ipDepartmentDrop: boolean = false;
  departmentList:any;
  remarks:string="";
  isCorrect:Number=0;
  expandedItems: any[] = [];

  constructor(private router: Router, private authService: AuthService, private scoreservice: ScorebookService, private modalService: NgbModal,
    private menuService: MenuService, private facultyservice: FacultiesService, private fb: FormBuilder, private service: AdminclientService) {
      let indexForId = this.feeders.length + 1
      this.authForm = this.fb.group({
        universityId: [''],
        universityName: [''],
        userId: [''],
        fullName: [''],
        countryId: [''],
        countryName: [''],
        stateId: [''],
        stateName: [''],
        locationId: [''],
        locationName: [''],
        schoolName: [''],
        schoolId: [''],
        instituteId: [''],
        instituteName: [''],
        departmentId: [''],
        departmentName: [''],
        correspondingEmail: [''],
        corresAuthor: [''],
      });
    }

  ngOnInit() {
    this.user = this.authService.getUserDetail();
    this.roleId = this.authService.getProfileObs();
    this.Name = this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.universityName = this.user.University;
    this.userId = this.user.UserId;
    // this.authService.RoleSelection(this.user.UniversityId, this.user.UserId).subscribe(x => {
      this.role = JSON.parse(localStorage.getItem('RoleSelection'));
      const data = this.role.filter(item => item.roleId == this.roleId);
      this.roleName = data[0].roleName;
    // })
    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });
    this.facultyservice.getAvailableCountry().subscribe(x=>{
      this.countryList=x;
    })
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

  fetchdata() {
    
    let storedTitle = localStorage.getItem('mineSearch');
    let checkString = JSON.parse(storedTitle);
    this.getList = checkString;
    checkString.endRow = this.endrow;
    checkString.startRow = this.startrow;

    this.service.fetchUncatogeryPub(checkString).subscribe((x: HttpResponse<any>) => {
      if (x.status === 200) {
        this.mineData = x.body;
        console.log(this.mineData);

        // this.enablePic = true;
      } else {
        // this.enablePic = false;
      }

      this.dataList = this.mineData.dataList;
      console.log(this.dataList);
      for (let i = 0; i < this.dataList.length; i++) {

        if (this.dataList[i].link != null) {
          if (this.dataList[i].link.length > 28) {
            this.dataList[i].link = [this.dataList[i].link.slice(0, 28), " ", this.dataList[i].link.slice(28)].join('');
          }
        }

        if (this.dataList[i].articleType != null) {
          this.dataList[i].articleType = this.dataList[i].articleType.toLowerCase();
          if (this.dataList[i].articleType == "book chapter") {
            this.dataList[i].articleType = this.dataList[i].articleType.replace(/\s/g, "");
          }
        }
        if (this.dataList[i].technology_Areas != null) {
          this.dataList[i].technology_Areas = this.dataList[i].technology_Areas.split(';');
        }
        if (this.dataList[i].publicationSourceDBMetrics != null) {
          this.dataList[i].publicationSourceDBMetrics = this.dataList[i].publicationSourceDBMetrics.split(';');
        }
        if (this.dataList[i].publicationDBCitation != null) {
          const publicationDBCitation = this.dataList[i].publicationDBCitation.split(';');

          this.dataList[i].publicationDBCitation = publicationDBCitation.map(item => {
            const [name, value] = item.split(':');
            return { name, value };
          });

          // Assigning variable for showing values dynamically in honeycomp
          for (let t = 0; t < this.dataList[i].publicationDBCitation.length; t++) {

            if (this.dataList[i].publicationDBCitation[t].name == "SCOPUS") {
              this.dataList[i].scopus = this.dataList[i].publicationDBCitation[t].value;
            }
            if (this.dataList[i].publicationDBCitation[t].name == "WOS") {
              this.dataList[i].wos = this.dataList[i].publicationDBCitation[t].value;
            }
            if (this.dataList[i].publicationDBCitation[t].name == "GS") {
              this.dataList[i].gs = this.dataList[i].publicationDBCitation[t].value;
            }
            if (this.dataList[i].publicationDBCitation[t].name == "IEEE") {
              this.dataList[i].ieee = this.dataList[i].publicationDBCitation[t].value;
            }
            if (this.dataList[i].publicationDBCitation[t].name == "PUBMED") {
              this.dataList[i].pubmed = this.dataList[i].publicationDBCitation[t].value;
            }
            if (this.dataList[i].publicationDBCitation[t].name == "ABDC") {
              this.dataList[i].abdc = this.dataList[i].publicationDBCitation[t].value;
            }
          }
        }
        if (this.dataList[i].authorAffiliation != null) {
          this.dataList[i].authorAffiliation = this.dataList[i].authorAffiliation.split('|');
        }
      }
      // this.enableFaculty=true;
      this.collapsablesize = this.mineData.totalRowCount;
      this.totalPages = Math.ceil(this.collapsablesize / this.pageSize);
      // Adjust Mpage to prevent it from exceeding totalpages
      this.page = Math.max(1, Math.min(this.page, this.totalPages));
      // Calculate the actual startRow and endRow based on Mpage and pageSize
      this.startrow = (this.page - 1) * this.pageSize;
      this.endrow = Math.min(this.startrow + this.pageSize, this.collapsablesize);
      this.totalsize = this.mineData.totalRowCount;
      // if(this.download==1){
      //     this.mineData.download=1;
      //     // this.downloadEnable=true;
      // }
      // else{
      this.mineData.download = 0;
      // }  
      if (this.ordervalue === 'Ascending') {
        this.dataList.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
      } else if (this.ordervalue === 'Descending') {
        this.dataList.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
      } else if (this.yearorder === 'Year') {
        this.dataList.sort((a, b) => a.year - b.year);
      }
      // this.enableFaculty=true;
      // this.enableMine=true;
    },
      (error) => {
        // this.enablePic = false; 
      });

  }

      edit(id) {

        this.facultyservice.getdfsedit(id,this.user.UniversityId).subscribe(data => {
          this.userdata = data;
          console.log(this.userdata);
          if(this.userdata){
          this.tempusers = this.userdata.dfsAuthors;
          this.dfsIndexing = this.userdata.dfsIndexing;
          if(this.tempusers.length>0){
              for(let i=0;i<this.tempusers.length;i++){
                this.tempusers[i].tempId=i;
                this.facultyservice.getLayerType(this.tempusers[i].universityId,this.roleId,this.user.UserId).subscribe(x=>{
                      this.layerList=x;
                      this.tempusers[i].layerType=this.layerList.layerType;
                });
              }
          }    
          this.checkValues = this.userdata.dfsPublicationNew;
          console.log(this.checkValues);
          console.log(this.tempusers);
          this.enableViewPub = true;
          }
        });
        
      }

        onPageChange(page: number) {
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
          // this.pageview=true;
          this.fetchdata();
        }

          onPageSizeChange(size: string) {
            this.page = 1;
            this.pageSize = Number(size);
            this.endrow = this.pageSize + this.startrow;
            // Apply sorting based on current sorting values
            if (this.ordervalue === 'Ascending') {
              this.dataList.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
            } else if (this.ordervalue === 'Descending') {
              this.dataList.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
            } else if (this.yearorder === 'Year') {
              this.dataList.sort((a, b) => a.year - b.year);
            }
            // detailed or compact for the article
            //  this.pageview = true;
            this.fetchdata();
          }

          closePubDetail() {
            this.enableViewPub = false;
          }

          addNewDetails(val){
            if(val=="away"){
              this.feeders[0].isHomeUniversity=0;
            }
            else if(val=="home"){
              this.feeders[0].isHomeUniversity=1;
            }
            if(!this.enableEdit){    
              this.feeders[0].tempId=this.tempusers.length;
              this.tempusers.push(this.feeders[0]);       
            }
            else{
              this.tempusers.splice(this.feeders[0].tempId, 0, this.feeders[0]);
            }
            if(this.feeders.length>0){
              this.feeders=[];
            }
            this.enableAway=false;
            this.enableHome=false; 
            this.enableEdit=false;
          }

          newEdit(val){
            console.log(val);
            this.feeders=[];
            console.log(this.tempusers[0]);
            this.editRowId = val;
            this.enableEdit=true;
            this.feeders.push(this.tempusers[val]);
            if(this.feeders[0].isHomeUniversity==1){
                this.enableHome=true;
                this.enableAway=false;
                this.facultyservice.getUnivLocSchInstDept(this.feeders[0].universityId, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
                  this.filteredList = x;
                  if (this.filteredList.length > 0) {
                    this.uniqCountry= Array.from(new Set(this.filteredList.map(item => item.countryName)));
                    this.uniqState= Array.from(new Set(this.filteredList.map(item => item.stateName)));
                    this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
                    this.layerSchool= Array.from(new Set(this.filteredList.map(item => item.schoolName)));
                    this.layerIns= Array.from(new Set(this.filteredList.map(item => item.instituteName)));
                    this.layerDept= Array.from(new Set(this.filteredList.map(item => item.departmentName)));
                  }
                });
            }
            else{
              this.enableHome=false;
              this.enableAway=true;
            }

            if( this.enableAway==true){
              this.facultyservice.getAvailableState(this.feeders[0].countryId).subscribe(x=>{
                this.filteredState=x;
                  console.log(x);
                })
                this.facultyservice.getAvailableLocation(this.feeders[0].countryId,this.feeders[0].stateId).subscribe((x:any)=>{
                  this.filterLocation=x;      
                })
            }
            this.tempusers.splice(val, 1)
            console.log(this.feeders);  
        }

            deleteData(index: any) {
                  this.tempusers.splice(index, 1)
                }

                countryFilterHome(event,i,univId){
                  this.facultyservice.getUnivLocSchInstDept(univId, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
                    this.filteredList = x;
                    const inst = this.filteredList.filter(d => d.countryName == event)
                  this.feeders[i].countryId = inst[0].countryId;
                  let filterCountry=this.filteredList.filter(x => x.countryName==event)
                  console.log(this.filteredList);
                  this.uniqState= Array.from(new Set(filterCountry.map(item => item.stateName)));
                  });
                }

                stateFiltersHome(event,i,univId){
                  this.facultyservice.getUnivLocSchInstDept(univId, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
                    this.filteredList = x;
                    const inst = this.filteredList.filter(d => d.stateName == event)
                  this.feeders[i].stateId = inst[0].stateId;

                  this.filteredList=this.filteredList.filter(x => x.stateName==event)
                  console.log(this.filteredList);
                  this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
                  });
                }

                baseLocfilter(event, i,univId) {
                  this.facultyservice.getUnivLocSchInstDept(univId, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
                  const inst = this.filteredList.filter(d => d.locationName == event)
                  this.feeders[i].locationId = inst[0].locationId;
                  this.facultyservice.getUnivLocSchInstDept(univId, this.roleId, this.user.UserId,this.feeders[i].locationId,null,null,null).subscribe(x => {
                    this.filteredList=x;
                  this.layerSchool=Array.from(new Set(this.filteredList.map((item : any)=>item.schoolName)));
                  this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
                  this.layerDept=Array.from(new Set(this.filteredList.map((item : any)=>item.departmentName)));
                  });
                  });
                }

                baseSchfilter(event,i,univId){
                  this.facultyservice.getUnivLocSchInstDept(univId, this.roleId, this.user.UserId,this.feeders[0].locationId,null,null,null).subscribe(x => {
                    this.filteredList = x;
                    const inst = this.filteredList.filter(d => d.schoolName == event&&d.locationId==this.feeders[0].locationId);
                    this.feeders[i].schoolId = inst[0].schoolId;
                    this.facultyservice.getUnivLocSchInstDept(univId, this.roleId, this.user.UserId,this.feeders[i].locationId,this.feeders[i].schoolId,null,null).subscribe(x => {
                      this.filteredList=x;
                      this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));  
                      this.layerDept=Array.from(new Set(this.filteredList.map((item : any)=>item.departmentName)));
                      const filterData = (data: any[]) => {
                        return data.filter(item => item.departmentName !== null);
                      };
                      this.layerDept=filterData(this.layerDept);
                      const filterDataInst = (data: any[]) => {
                        return data.filter(item => item.instituteName !== null);
                      };
                      this.layerIns=filterDataInst(this.layerIns);
                    });
                  });
                }

                baseInstfilter(event, i, univId) {
                  this.facultyservice.getUnivLocSchInstDept(univId, this.roleId, this.user.UserId,this.feeders[0].locationId,this.feeders[i].schoolId,null,null).subscribe(x => {
                    this.filteredList = x;
                    if(this.feeders[i].schoolEnable!=false){
                      const inst = this.filteredList.filter(d => d.instituteName == event&&d.locationId==this.feeders[0].locationId&&d.schoolId==this.feeders[i].schoolId);      
                      this.feeders[i].instituteId = inst[0].instituteId; 
                    }
                    else{
                      const inst = this.filteredList.filter(d => d.instituteName == event&&d.locationId==this.feeders[0].locationId);      
                      this.feeders[i].instituteId = inst[0].instituteId; 
                    }
                    this.facultyservice.getUnivLocSchInstDept(univId, this.roleId, this.user.UserId,this.feeders[0].locationId,this.feeders[i].schoolId,this.feeders[i].instituteId,null).subscribe(x => {
                      this.filteredList = x;
                      this.layerDept=Array.from(new Set(this.filteredList.map((item : any)=>item.departmentName)));   
                      const filterData = (data: any[]) => {
                        return data.filter(item => item.departmentName !== null);
                      };
                      this.layerDept=filterData(this.layerDept);
                    });
                    
                  });
                }

                baseDeptfilter(event, i, univId) {
                  this.facultyservice.getUnivLocSchInstDept(univId, this.roleId, this.user.UserId,this.feeders[0].locationId,this.feeders[i].schoolId,this.feeders[i].instituteId,null).subscribe(x => {
                    this.filteredList = x;
                    const dept = this.filteredList.filter(d => d.departmentName == event)
                    this.feeders[i].departmentId = dept[0].departmentId;
                  });
              
                }

                corresAuthor(val: string, i) {
                  this.feeders[i].correspondingAuthor = val;
                  console.log(val);
              
                }

                countryFilter(event, i){

                  this.facultyservice.getAvailableCountry().subscribe(x=>{
                    this.FilterCountry=x;
                    const country = this.FilterCountry.filter(item=> item.countryName===event);
                    const id =country[0].countryId;
                    console.log(id);
                    this.feeders[i].countryId = id;
                    this.feeders[i].countryName = event;
                    this.facultyservice.getAvailableState(id).subscribe(x=>{
                    this.filteredState=x;
                      console.log(x);
                    })
                  })
                }
              
                stateFilters(event,i){
                  const state=this.filteredState.filter(x=>x.stateName===event)
                  let id=state[0].stateId;
                  this.feeders[i].stateId = id;  
                  this.feeders[i].stateName = event;
                  this.facultyservice.getAvailableLocation(this.feeders[i].countryId,id).subscribe((x:any)=>{
                    this.filterLocation=x;      
                  })
                }

                LocationFilter(event,i){
                  const location=this.filterLocation.filter(x=> x.locationName===event)
                  this.feeders[i].locationName=event;
                  let id=location[0].locationId;
                  this.feeders[i].locationId = id;  
                }

                SearchSchool(event, i){
                  this.feeders[i].schoolId = 0;
                  this.feeders[i].schoolName = event;
              }

              SearchInstitute(event, i) {
                this.feeders[i].instituteId = 0;
                this.feeders[i].instituteName = event;
            }

            SearchDepartment(event, i) {
              if (event == "") {
                this.ipDepartmentDrop = false;
              }
              else {
                this.facultyservice.NoncusUniversityDept(event).subscribe(x => {
                  this.departmentList = x;
                  if(this.departmentList.length>0){
                    this.ipDepartmentDrop = true;
                  }     
                  else{
                    this.ipDepartmentDrop = false;
                    this.feeders[i].departmentId = 0;
                    this.feeders[i].departmentName = event;
                  }
                })
              }
            }

            onselectDepartment(name, id, i) {
              this.ipDepartmentDrop = false;
              this.feeders[i].departmentId = id;
              this.feeders[i].departmentName = name;
            }


            submitAll() {
              if(this.enableHome==true||this.enableAway==true){
                alert("Please add author details before submit");
                if(this.feeders[0].universityName==""||this.feeders[0].universityName==null){
                  this.feeders=[];
                  this.enableAway=false;
                  this.enableHome=false;
                }
              }
              else{
                
                  // for publication object
                  this.dfsPublication = new DfsPublication();
                  this.dfsPublication.publicationId = this.checkValues.publicationId;
                  this.dfsPublication.doi = this.checkValues.doi;
                  this.dfsPublication.title = this.checkValues.title;
                  this.dfsPublication.levelId =  this.checkValues.levelId;
                  this.dfsPublication.level = this.checkValues.level;
                  this.dfsPublication.volume = this.checkValues.volume;
                  this.dfsPublication.issno = this.checkValues.issno;
                  this.dfsPublication.bPage = this.checkValues.bPage;
                  this.dfsPublication.ePage = this.checkValues.ePage;
                  this.dfsPublication.acceptedDate = this.checkValues.acceptedDate;
                  this.dfsPublication.onlineDate = this.checkValues.onlineDate;
                  this.dfsPublication.printDate = this.checkValues.printDate;
                  this.dfsPublication.CrossrefDate= this.checkValues.crossrefDate;
                  this.dfsPublication.publishedDate = this.checkValues.publishedDate;
                  this.dfsPublication.ConferenceName = this.checkValues.conferenceName;
                  this.dfsPublication.webLink = this.checkValues.webLink;
                  this.dfsPublication.publisherId = this.checkValues.publisherId;;
                  this.dfsPublication.publisherName = this.checkValues.publisherName;
                  this.dfsPublication.publicationSourceId = this.checkValues.publicationSourceId;
                  this.dfsPublication.publicationSourceName = this.checkValues.publicationSourceName;
                  this.dfsPublication.articleTypeId =this.checkValues.articleTypeId;
                  this.dfsPublication.articleTypeName = this.checkValues.articleTypeName;
                  this.dfsPublication.Year = this.checkValues.year;
                  this.dfsPublication.pissn = this.checkValues.pissn;
                  this.dfsPublication.eissn = this.checkValues.eissn;
                  this.dfsPublication.pisbn = this.checkValues.pisbn;
                  this.dfsPublication.eisbn = this.checkValues.eisbn;
                  this.dfsPublication.abstract = this.checkValues.abstract;
                  this.dfsPublication.authors = this.checkValues.authors;
                  this.dfsPublication.authorAddress = this.checkValues.authorAddress;
                  this.dfsPublication.technologyArea = this.checkValues.technologyArea;
                  this.dfsPublication.isPubSrcCorrect=this.isCorrect;
                  this.dfsPublication.pubSrcRemark=this.remarks;
                  this.dfsPublication.pubSrcArticleTypeId=this.checkValues.pubSrcArticleTypeId;
                  this.dfsPublication.pubSrcArticleTypeName=this.checkValues.pubSrcArticleTypeName;
                  this.dfsPublication.SrcUniversityId=this.checkValues.srcUniversityId;
          
                  for (let i = 0; i < this.dfsIndexing.length; i++) {
                    if (this.dfsIndexing[i].indexingValue==null) {
                      this.dfsIndexing[i].isApplicable = 0; 
                    }
                    else {
                      this.dfsIndexing[i].isApplicable = 1;
                      this.dfsIndexing[i].indexingValue=this.dfsIndexing[i].indexingValue.toString();
                    }
                  }
          
                  this.dfsIndexing = this.dfsIndexing.map((item) => {
                    const { type, ...rest } = item;
                    return {
                      indexingType: type,
                      ...rest,
                    };
                  });
          
                  for (let i = 0; i < this.tempusers.length; i++) {
                    this.tempusers[i].aliasUserUniversityId=parseInt(this.tempusers[0].aliasUserUniversityId);
                    delete this.tempusers[i].schoolEnable;
                    delete this.tempusers[i].linkUnivName;
                    delete this.tempusers[i].linkname;
                    delete this.tempusers[i].tempId;
                    delete this.tempusers[i].isHomeUniversity;
                    delete this.tempusers[i].layerType;
                    // Convert correspondingAuthor to an integer
                    if (this.tempusers[i].correspondingAuthor !=1) {
                      this.tempusers[i].correspondingAuthor = 0;  
                    }
                    else {
                      this.tempusers[i].correspondingAuthor =1;
                    }
                    // To handle null values in school 
                    if (this.tempusers[i].schoolId == undefined || this.tempusers[i].schoolId == null) {
                      this.tempusers[i].schoolId = 0;
                    }
          
                    //  Convert to number
                    if (typeof this.tempusers[i].stateId === 'string') {
                      this.tempusers[i].stateId = parseInt(this.tempusers[i].stateId);
                    }
                    else if (this.tempusers[i].stateId == null || this.tempusers[i].stateId == undefined) {
                      this.tempusers[i].stateId = 0;
                      this.tempusers[i].statename = null;
                    }
                    if(this.tempusers[i].AliasUserId==null||this.tempusers[i].AliasUserId==undefined||this.tempusers[i].AliasUserId==""){
                      this.tempusers[i].AliasUserId=0;      
                    }
                    // else{
                    //   this.tempusers[i].AliasUserId = 0;
                    // }
          
                  }
          
                  const data = {
                    "dfsPublicationNew": this.dfsPublication,
                    "dfsIndexing": this.dfsIndexing,
                    "dfsAuthors": this.tempusers
                  }
                  console.log(data);
          
                    this.facultyservice.savePub(data, this.user.UserId, this.roleId).subscribe(x => {
                      const confirmation = confirm('Update Details Successfully');
                      if (confirmation) {
                        this.enableViewPub=false;
                        this.ngOnInit();
                      }
          
                    },
                      (error) => {
                        console.error(error);
                        alert("Failed to Add details. Please check.");
                      })
                    
              
                  }
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
          
}
