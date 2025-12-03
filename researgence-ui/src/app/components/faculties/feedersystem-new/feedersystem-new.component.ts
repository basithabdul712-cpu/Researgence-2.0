import { AdminclientService } from '../../adminclient/adminclient.service';
import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailyFeeder } from 'src/app/shared/model/data.models';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { FacultiesService } from '../faculties.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from 'src/app/shared/services/menu.service';
import { DfsPublicationNew } from './dfsPublicationNew';
import {DfsSourceTitleData } from './dfsSourceTitleData';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-feedersystem-new',
  templateUrl: './feedersystem-new.component.html',
  styleUrls: ['./../../../../assets/given/newcss/dfs-style/style.css','./../../../../assets/given/newcss/dfs-style/bootstrap.min.css','./feedersystem-new.component.scss']
})
export class FeedersystemNewComponent implements OnInit {
  checkValues: any;
  doi: string;
  id: number;
  checkTitle: any;
  crossTitle: string = "";
  checkDataauthor: any;
  hideTitle: boolean = false;
  showData: boolean = false;
  enableIp: boolean = false;
  names: any;
  level: string;
  feeder: any;
  Author: any;
  universityid: any;
  universityIP: Number;
  searchAuthor: any;
  searchJournal: any;
  runiversity: any;
  schoolList:any;
  stateFilter:any;
  fill: any[];
  fillNonCus:any[];
  auth: any[];
  universityFilter: any;
  data: any[];
  authorName: string;
  newUniversityList = [];
  log = new DailyFeeder();
  name: string = '';
  university = '';
  showDropdown = false;
  showsDropdown = false;
  ipDropdown = false;
  ipAutherDrop = false;
  crossData = false;
  indexData: any = [];
  filterJournal: any;
  filterJournals: any;
  title: string = "";
  leveDropDownmn: any;
  commonDropDown = [{ "key": 0, "value": "NO" },
  { "key": 1, "value": "YES" }];
  scopus: any = [];
  publisherSource: any;
  feeders: any[] = [];
  authForm: FormGroup;
  showEditable: boolean = false;
  editRowId: any;
  sourceNameData: string;
  sourceNameOpen = false;
  sourceData: any;
  UGCdropdown: any;
  SCIdropdown: any;
  ABDCdropdown: any;
  Qrankdropdown: any;
  QrankdropdownScs: any;
  crossSourceName: string;
  crossType: string;
  isMenuOpen: boolean;
  checkData: any;
  crossValueDrop: string;
  crossRefCitation: Number;
  conferenceName: string | null = null;
  publisherList: any;
  articleList: any;
  user: any;
  roleId: any;
  AuthorName: any;
  filteredList: any;
  filterListDrop: boolean = false;
  countryList: any;
  FilterCountry:any;
  ipCountryDrop: boolean = false;
  ipStateDrop:boolean= false;
  ipInstituteDrop: boolean = false;
  ipSchoolDrop:boolean =false;
  ipDepartmentDrop: boolean = false;
  uniqueLocationNames: any;
  instituteList: any;
  departmentList: any;
  titleList: any;
  type: string;
  rfsEnable: boolean = false;
  dfsPublication: DfsPublicationNew;
  dfsSourceTitleData:DfsSourceTitleData;
  pubId: Number = 0;
  articleId: Number = 0;
  requestId: any;
  rfsType: any;
  rfsList: any;
  rfsTitle: any;
  rfsuserName: string = "";
  rfsDept: string = "";
  rfsPubTitle: string = "";
  rfsSource: string = "";
  rfsDoi: string = "";
  currentDate = new Date();
  formattedDate: string;
  formattedPubDate: string;
  printdate: string | null = null;
  publisheddate: string | null = null;
  crossrefDate:string| null = null;
  tempFlag: boolean = false;
  publisherid: any;
  levelid: any;
  erromessage: string="";
  enableType: boolean = false;
  articleDropdown: any;
  doiList: any;
  newfeed: any;
  filterdata: any;
  filterschool: boolean = false;
  stateList:any;
  layerSchool: any;
  layerIns: any;
  layerDept:any;
  filteredState:any;
  filterLocation:any;
  enableState:boolean=false;
  countryModel:string;
  countryModelId:number;
  filteredStateModel:any;
  FilterCountryModel:any;
  stateModel:string;
  stateModelId:number;
  stateModelEnable:boolean=false;
  filterStateList:any;
  newLocationName:string;
  newLocationId:number=0;
  allowedText:number=2;
  allowedAuthorText:number=2;
  linkAuthorAllowedText:number=2;
  linkAuthorAllowedTextAway:number=2;
  allowedTextDis:number=2;
  AliasUserId: string;
  universityparamId: any;
  aliasauthor: any;
  universityId: any;
  alias: any[];
  isalias: boolean=false;
  isaliasAway:boolean=false;
  linkauthor: any;
  linkauthorAway:any;
  enableLink:any;
  enableLinkAway:any;
  activetab:any;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  stickyEnable:boolean=false;
  isScrolled = false;
  enablemoreDetail:boolean=false;
  enableView:boolean=false;
  Name:string;
 tempusers:any=[];
 role:any;
 roleName:any;
 enableaddNew:boolean=false;
 remarks:string="";
 articleListValues:any;
 articleType:string="";
 articleTypeId:string;
 isCorrect:Number=0;
 newDropArticleId:Number;
 showUnivName:string;
 enableBox:boolean=false;
 pubSourceTypeName:any;
 pubSourceTitleDis:any;
 showPubTitle:boolean=false;
 filterDisplayTitle:any;
 pubSrcTitle:string;
 pubSrcId:Number;
 pubSrcDisp:any;
 showSourceTitleDis:boolean=false;
 filterJournalList:any;
 sourceTitleNew:string;
 sourceTitleId:Number;
 srcwebLink:string;
 srcLevel:any;
 srcLevelId:Number;
 srcCountryName:any;
 srcpIssn:string;
 srceIssn:string;
 srcpIsbn:string;
 srceIsbn:string;
 pubSrcCntId:Number;
 pubSrcArtcileId:any;
 sourceNameExists:boolean=false;
 enableHome:boolean=false;
 enableAway:boolean=false;
 nonCusUnivList:any;
 uniqCountry:any;
 uniqState:any;
 enableBook:boolean=false;
 remarksSource:string="";
 filterPublisher:any;
 sourceUnivFilter:any;
 sourceUnivId:any;
 enableEdit:boolean=false;
 titleId:any;
 enableViewPub:boolean=false;
 viewPubList:any;
 enableProceed:boolean=false;

  // year picker
  currentYear = new Date().getFullYear();
  maxDate: Date = new Date(this.currentYear,11,31);
  toYear:number;
  tempfromYear:string|null=null;

  constructor(public facService: FacultiesService, private menuService: MenuService, private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder, private modalService: NgbModal, private datePipe: DatePipe, private authservice: AuthService, private clientservice: AdminclientService) {

    let indexForId = this.feeders.length + 1
    this.authForm = this.fb.group({
      universityId: [''],
      universityName: [''],
      userId: [''],
      fullName: [''],
      countryId: [''],
      countryName: [''],
      stateId:[''],
      stateName:[''],
      locationId: [''],
      locationName: [''],
      schoolName: [''],
      schoolId:[''],
      instituteId: [''],
      instituteName: [''],
      departmentId: [''],
      departmentName: [''],
      correspondingEmail: [''],
      correspondingAuthor: [''],
    });
  }

  ngOnInit() {

        this.route.params.subscribe(params => {    
          // console.log('Route Params:', params);       
          this.universityparamId=params['sys'];
          console.log(this.universityparamId);
      });
      
    this.showUnivName=localStorage.getItem("clientUniv");
    this.roleId = this.authservice.getProfileObs();
    this.user = this.authservice.getUserDetail();
    this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    // this.authservice.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
      this.role=JSON.parse(localStorage.getItem('RoleSelection'));
      const dataRole=this.role.filter(item=> item.roleId==this.roleId);
      this.roleName=dataRole[0].roleName;
      console.log(this.roleName)
      // })
  
    this.route.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      
      this.type = paramMap.get('sys');
      this.requestId = paramMap.get('requestId');
      this.rfsType = paramMap.get('rfsType');

      if (this.type == 'RFS') {
        this.universityparamId=localStorage.getItem("RfsUnivId");
        this.sourceUnivId=this.universityparamId;

        this.clientservice.GetUniversity(this.user.UserId,this.roleId).subscribe(data => {
          this.runiversity = data;
          this.universityFilter = data;
          this.sourceUnivFilter = data;
          let univFilter= this.sourceUnivFilter.filter(x => x.universityId==this.sourceUnivId);       
          this.showUnivName=univFilter[0].universityName;      
        });

        this.rfsEnable = true;
        this.clientservice.getRFSSupportUserDetail(this.requestId, this.rfsType).subscribe(data => {
          this.rfsList = data;
          this.rfsuserName = this.rfsList.userFullName;
          this.rfsDept = this.rfsList.departmentName;
          this.rfsPubTitle = this.rfsList.publicationTitle;
          this.rfsSource = this.rfsList.publicationSourceName;
          this.rfsDoi = this.rfsList.doi;
        });
      }
      else{
        this.getUniversity();
      }
    });
            this.menuService.isMenuOpen$.subscribe(isOpen => {
              this.isMenuOpen = isOpen;
            });
            this.facService.getAvailableCountry().subscribe(x=>{
              this.countryList=x;
              this.clientservice.GetNonCusUniv(this.user.UserId,this.roleId).subscribe(x => {
                this.nonCusUnivList=x;
              });
            })
           
            this.getDataIndex();
            this.facService.getDropdown('Level').subscribe(x => {
              this.leveDropDownmn = x;
            })
            this.getAllPublisher();
            this.getSourceValueByName();
            this.facService.getDropdown('ArticleType').subscribe(x => {
              this.articleListValues = x;   
            })
       }

  addHomeAuthor() {
    this.enableAway=false;
    this.enableHome=true;
    this.editRowId = true;
    for (let i = 0; i < this.indexData.length; i++) {
      if (this.indexData[i].IsApplicable == 1 && this.indexData[i].indexingValue === "" && this.indexData[i].forDFSInputValue == 1) {
        alert("Add Citation in " + this.indexData[i].fieldDesc);
        this.tempFlag = false;
        break;
      }
      else {
        this.tempFlag = true;
      }
    }

    if (this.tempFlag) {
      const newFeeder = {
        universityId: this.authForm.value.universityId,
        universityName: this.authForm.value.universityName,
        userId: this.authForm.value.userId,
        fullName: this.authForm.value.fullName,
        countryId: this.authForm.value.countryId,
        countryName: this.authForm.value.countryName,
        stateId:this.authForm.value.stateId,
        stateName:this.authForm.value.stateName,
        locationId: this.authForm.value.locationId,
        locationName: this.authForm.value.locationName,
        schoolId:this.authForm.value.schoolId,
        schoolName:this.authForm.value.schoolName, 
        instituteId: this.authForm.value.instituteId,
        instituteName: this.authForm.value.instituteName,
        departmentId: this.authForm.value.departmentid,
        departmentName: this.authForm.value.departmentName,
        correspondingEmail: this.authForm.value.correspondingEmail,
        correspondingAuthor: this.authForm.value.correspondingAuthor
      };
      if(this.feeders.length<1){
        this.feeders.push(newFeeder);
        // Reset form fields
        this.authForm.reset();
        console.log(this.feeders);
      }
      else if(this.feeders.length==1){
        this.feeders[0].universityName = "";
        this.feeders[0].universityId = "";
        this.feeders[0].fullName = "";
        this.feeders[0].userId = "";
        this.feeders[0].departmentId= "";
        this.feeders[0].departmentName = "";
        this.feeders[0].instituteId ="";
        this.feeders[0].instituteName = "";
        this.feeders[0].locationId ="";
        this.feeders[0].locationName = "";
        this.feeders[0].countryId ="";
        this.feeders[0].countryName = "";
        this.feeders[0].correspondingEmail="";
        this.feeders[0].correspondingAuthor="";
      }
    }
  }

  toggle(val) {
    this.editRowId = val;
  }

  delete(index: any) {
    this.tempusers.splice(index, 1)
  }

  getUniversity() {

      this.clientservice.GetUniversity(this.user.UserId,this.roleId).subscribe(data => {
        this.runiversity = data;
        this.universityFilter = data;
        this.sourceUnivFilter = data;
        let univFilter= this.sourceUnivFilter.filter(x => x.universityName==this.showUnivName);       
        this.sourceUnivId=univFilter[0].universityId;      
      });

  }

  //for article index and source index
  getDataIndex() {
    this.facService.getIndex().subscribe((data: any) => {
      this.indexData = data.map(item => ({
        ...item,
        IsApplicable: 0,
        indexingId: 0,
        indexingValue: ""
      }));
    });
  }

  changeJournal(x) {
    if (x.length > 4) {
      this.hideTitle = true;
      this.facService.getTitleList(x).subscribe(data => {
        this.titleList = data;
        console.log(this.titleList);
        
        if (this.titleList.length == 0) {
          this.checkTitle = x;
          this.hideTitle = false;
        }
      })
    }
  }

  onSelectJournal(item: string,id) {
    this.title = item;
    this.titleId= id;
    this.checkTitle = item;
    this.hideTitle = false;
  }

  // check title before adding 
  startAdd() {

    this.facService.getTitleList(this.checkTitle).subscribe(data => {
      this.titleList = data;
      if (this.titleList.length == 0) {
        console.log(this.checkTitle);
        this.showData = true;
      }
      else {
        this.showData = false;
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

  onInput(item: string, id: number, val) {
    this.facService.getLayerType(id, this.roleId, this.user.UserId).subscribe(data => {
      this.newfeed = data;
      this.filterdata = this.newfeed.layerType;
      if(this.filterdata=="4LType1"||this.filterdata=="4LType2"||this.filterdata=="3LType3"){
        this.filterschool = true;
      }
      else{
        this.filterschool=false;
      }
      this.feeders[val].schoolEnable = this.filterschool;
      this.feeders[val].universityName = item;
      this.feeders[val].universityId = id;
      this.ipDropdown = false;
      this.universityIP = id;
      this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
        this.filteredList = x;
        if (this.filteredList.length > 0) {
          this.uniqCountry= Array.from(new Set(this.filteredList.map(item => item.countryName)));
          this.uniqState= Array.from(new Set(this.filteredList.map(item => item.stateName)));
          this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
          // this.layerSchool=Array.from(new Set(this.filteredList.map((item : any)=>item.schoolName)));
          // this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
        }
      });
    })

  }

        //populate value based on author select
        onAutherClick(universityid,userid,name: string,deptid, dept: string,instid, inst: string,locationid, loca: string,countryid, coun: string, cemail: string,cauthor:Number, val,stateId,state:string,schoolId,school:string,linkid,linkname:string) {
          this.feeders[val].universityId=universityid;
          this.feeders[val].fullName = name;
          this.feeders[val].userId = userid;
          this.feeders[val].departmentId= deptid;
          this.feeders[val].departmentName = dept;
          this.feeders[val].instituteId =instid;
          this.feeders[val].instituteName = inst;
          this.feeders[val].locationId =locationid;
          this.feeders[val].locationName = loca;
          this.feeders[val].countryId =countryid;
          this.feeders[val].countryName = coun;
          this.feeders[val].AliasUserId =linkid;
            if(linkname==undefined||linkname==null){
            this.feeders[val].linkName = "";
            }
           else{
            this.feeders[val].linkName =linkname;
           }
          this.feeders[val].correspondingEmail = cemail;
          this.feeders[val].stateId = stateId;
          this.feeders[val].stateName = state;
          this.feeders[val].schoolId = schoolId;
          this.feeders[val].schoolName = school;
          this.ipAutherDrop = false;
          console.log(this.feeders);
          this.toggle("editdisable");
          this.facService.getAvailableState(countryid).subscribe(x=>{
            this.filteredState=x;
       })    
    }

  //Capture values in corres author
  corresAuthor(val: string, i) {
    this.feeders[i].correspondingAuthor = val;
  }

  onselectCountry(name, id, i) {
    this.ipCountryDrop = false;
    this.feeders[i].countryId = id;
    this.feeders[i].countryName = name;
  }

  onselectState(name, id, i){
   this.ipStateDrop= false;
   this.feeders[i].stateId = id;
   this.feeders[i].stateName = name;
  }

  onselectSchool(name, id, i){
    this.ipSchoolDrop=false;
    this.feeders[i].schoolId = id;
    this.feeders[i].schoolName = name;
  }

  onselectInstitute(name, id, i) {
    this.ipInstituteDrop = false;
    this.feeders[i].instituteId = id;
    this.feeders[i].instituteName = name;
  }

  onselectDepartment(name, id, i) {
    this.ipDepartmentDrop = false;
    this.feeders[i].departmentId = id;
    this.feeders[i].departmentName = name;
  }

  //populate value based on source name
  onSelectSource(name, id) {
    this.sourceNameData = name;
    this.sourceNameOpen = false;
    this.searchJournal = id;
    this.facService.getSourceField(id).subscribe(x => {
      this.sourceData = x;
      if (this.sourceData.length > 0) {
        this.publisherSource = this.sourceData[0].publisher;
        if(this.sourceData[0].articleType==null||this.sourceData[0].articleType==""){
          this.enableType=true;
          }
          else{
            this.checkValues.type = this.sourceData[0].articleType;
            this.enableType=false;
          }
          this.publisherSource = this.sourceData[0].publisher;
          this.checkValues.pisbn= this.sourceData[0].pisbn;
          this.checkValues.eisbn= this.sourceData[0].eisbn;
          this.checkValues.eissn = this.sourceData[0].eissn;
          this.checkValues.pissn = this.sourceData[0].pissn;
          this.level = this.sourceData[0].level; 
          this.levelid = this.sourceData[0].levelId;
        
        for (let i = 0; i < this.indexData.length; i++) {
          for (let t = 0; t < this.sourceData.length; t++) {
            if (this.indexData[i].type == "SourceIndexing" && this.indexData[i].fieldName == this.sourceData[t].fieldName) {
              this.indexData[i].indexingValue = this.sourceData[t].sourceIndexingValue;
            }
          }
        }
      }
      else{
        this.enableaddNew=true;
      }
    });
  }

  countryFilter(event, i){
    this.facService.getAvailableCountry().subscribe(x=>{
      this.FilterCountry=x;
      const country = this.FilterCountry.filter(item=> item.countryName===event);
      const id =country[0].countryId;
      this.feeders[i].countryId = id;
      this.feeders[i].countryName = event;
      this.facService.getAvailableState(id).subscribe(x=>{
      this.filteredState=x;
      })
    })
  }

  stateFilters(event,i){
      const state=this.filteredState.filter(x=>x.stateName===event)
      let id=state[0].stateId;
      this.feeders[i].stateId = id;  
      this.feeders[i].stateName = event;
      this.facService.getAvailableLocation(this.feeders[i].countryId,id).subscribe((x:any)=>{
        this.filterLocation=x;
        // this.uniqueLocationNamesAway=x.map(item => item.locationName);        
      })
    }

  LocationFilter(event,i){
    const location=this.filterLocation.filter(x=> x.locationName===event)
    this.feeders[i].locationName=event;
    let id=location[0].locationId;
    this.feeders[i].locationId = id;  
  }

  SearchState(event,i){
    if (event == "") {
      this.ipStateDrop = false;
    } else {
      this.ipStateDrop = true;
      this.facService.getDropdown('State').subscribe(x => {
        this.stateList = x;
        this.stateFilter=this.stateList.filter(item => item.value.toLowerCase().includes(event.toLowerCase()))
      })
    }
  }

  SearchSchool(event, i){
          this.feeders[i].schoolId = 0;
          this.feeders[i].schoolName = event;
  }

  //common list of institute
  SearchInstitute(event, i) {
          this.feeders[i].instituteId = 0;
          this.feeders[i].instituteName = event;
  }

  //common list of institute
  SearchDepartment(event, i) {
    if (event == "") {
      this.ipDepartmentDrop = false;
    }
    else {
      this.facService.NoncusUniversityDept(event).subscribe(x => {
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

  //for non customer university]
  nonCustLocation(name, i) {
    this.feeders[i].locationId = 0;
    this.feeders[i].locationName = name;
  }

  aliasid(name,i) {
    
     this.enableLink=i;
    if(name.length==0){
      this.linkAuthorAllowedText=2;
      this.isalias = false;
    }
    if(name.length>this.linkAuthorAllowedText){
      this.isalias=true;
     this.facService.AuthorSearch(this.universityparamId, name).subscribe(data => {
     this.linkauthor = data;
     this.linkAuthorAllowedText=this.linkAuthorAllowedText+2;
     this.isalias=true;
     if (this.linkauthor.length == 0||this.linkauthor.length=="") {
      this.isalias = false;
      this.feeders[i].linkName = name;
      this.feeders[i].AliasUserId = 0;
       }
      })
    }
  }

  aliasidAway(name,i) {
    
    this.enableLinkAway=i;
   if(name.length==0){
     this.linkAuthorAllowedTextAway=2;
     this.isaliasAway = false;
   }
   if(name.length>this.linkAuthorAllowedText){
     this.isaliasAway=true;
    this.facService.AuthorSearch(this.universityparamId, name).subscribe(data => {
    this.linkauthorAway = data;
    this.linkAuthorAllowedTextAway=this.linkAuthorAllowedTextAway+2;
    this.isaliasAway=true;
    if (this.linkauthorAway.length == 0||this.linkauthorAway.length=="") {
     this.isaliasAway = false;
     this.feeders[i].linkName = name;
     this.feeders[i].AliasUserId = 0;
      }
     })
   }
 }

  Onlink(name,i,id){
    this.isalias=false;
    this.feeders[i].linkName = name;
    this.feeders[i].AliasUserId = id; 
  }

  OnlinkAway(name,i,id){
    this.isaliasAway=false;
    this.feeders[i].linkName = name;
    this.feeders[i].AliasUserId = id; 
  }

  //get values based on university and author
  SearchIPData(text: string, val, author) {
    //for assign yes to first author
    const tempauthor = this.checkValues.authors;
    if (this.checkValues.authors != null) {
      const authorSplit = tempauthor.split(',');
      this.AuthorName = authorSplit.filter(t => t.includes("(F)")).map(name => name.replace('.(F)', ''));
      if (val == this.AuthorName) {
        this.feeders[author].correspondingAuthor = 1;
      }
      else {
        this.feeders[author].correspondingAuthor = 0;
      }
    }
    if(val.length==0){
      this.allowedAuthorText=2;
      this.ipAutherDrop = false;
    }
    if (val.length >this.allowedAuthorText) {
    this.facService.AuthorSearch(this.universityIP, val).subscribe(data => {
      this.Author = data;
      this.allowedAuthorText=this.allowedAuthorText+2;
      if (this.Author == "") {
        this.toggle(author);
      }
      else {
        this.toggle("editdisable");
      }
      this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
        this.filteredList = x;
        if (this.filteredList.length > 0) {
          this.uniqCountry= Array.from(new Set(this.filteredList.map(item => item.countryName)));
          this.uniqState= Array.from(new Set(this.filteredList.map(item => item.stateName)));
          this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
          // this.layerSchool=Array.from(new Set(this.filteredList.map((item : any)=>item.schoolName)));
          // this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
        }
        else {
          this.filterListDrop = true;
          this.checkDataauthor = author;
        }
      })
      if (this.Author) {
        this.ipAutherDrop = true;
        this.checkDataauthor = author;
      }
      if (this.Author == "") {
        this.ipAutherDrop = false;
        this.checkDataauthor = author;
        this.feeders[author].fullName = val;
        this.feeders[author].userId = 0;
        this.feeders[author].countryName="";
        this.feeders[author].stateName="";
        this.feeders[author].locationName="";
        this.feeders[author].schoolName="";
        this.feeders[author].instituteName="";
        this.feeders[author].departmentName="";
        this.feeders[author].correspondingAuthor="";
      }
    });
   }
  }

  onLeaveAuthor(name,index){
    this.ipAutherDrop = false;
    this.toggle(index);
    console.log(this.feeders);
    if(this.feeders[index].userId!=0){
      this.toggle("editdisable");
    }
    else{
      this.feeders[index].fullName = name;
      this.feeders[index].userId = 0;
      this.feeders[index].countryName="";
      this.feeders[index].stateName="";
      this.feeders[index].locationName="";
      this.feeders[index].schoolName="";
      this.feeders[index].instituteName="";
      this.feeders[index].departmentName="";
      this.feeders[index].correspondingAuthor="";
       this.toggle(index);
    }
    
  }

  onLeaveAuthorIp(name,index){
    console.log(this.feeders);
    
    if(this.feeders[0].unviversityId!=""||this.feeders[0].unviversityId!=null){
      if(this.feeders[0].userId==0&&this.feeders[0].countryName!=""){

      }
    else if(this.feeders[0].userId==0||this.feeders[0].userId==null||this.feeders[0].userId==""){
      this.feeders[0].fullName = name;
       this.feeders[0].userId = 0;
       this.feeders[index].countryName="";
       this.feeders[index].stateName="";
       this.feeders[index].locationName="";
       this.feeders[index].schoolName="";
       this.feeders[index].instituteName="";
       this.feeders[index].departmentName="";
       this.feeders[index].correspondingAuthor="";
       this.toggle(0);
    }
    else{      
       this.toggle("editdisable");
    }
  }
  }

  leaveAuthor(){
    this.ipAutherDrop = false;
  }

  baseDeptfilter(event, i) {
    this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,this.feeders[0].locationId,this.feeders[i].schoolId,this.feeders[i].instituteId,null).subscribe(x => {
      this.filteredList = x;
      const dept = this.filteredList.filter(d => d.departmentName == event);
      this.feeders[i].departmentId = dept[0].departmentId;
    });
 
  }

  baseInstfilter(event, i) {
    this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,this.feeders[0].locationId,this.feeders[i].schoolId,null,null).subscribe(x => {
      this.filteredList = x;

       if(this.feeders[i].schoolEnable!=false){
        const inst = this.filteredList.filter(d => d.instituteName == event&&d.locationId==this.feeders[0].locationId&&d.schoolId==this.feeders[i].schoolId);      
        this.feeders[i].instituteId = inst[0].instituteId; 
       }
       else{
        const inst = this.filteredList.filter(d => d.instituteName == event&&d.locationId==this.feeders[0].locationId);      
        this.feeders[i].instituteId = inst[0].instituteId; 
       }

      this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,this.feeders[0].locationId,this.feeders[i].schoolId,this.feeders[i].instituteId,null).subscribe(x => {
        this.filteredList = x;
        this.layerDept=Array.from(new Set(this.filteredList.map((item : any)=>item.departmentName)));   
      });
      
    });
    // const inst = this.filteredList.filter(d => d.instituteName == event)
    // this.feeders[i].instituteId = inst[0].instituteId;
    // this.filteredList=this.filteredList.filter(x => x.instituteName==event)
  }

  baseLocfilter(event, i) {
    this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
    const inst = this.filteredList.filter(d => d.locationName == event)
    this.feeders[i].locationId = inst[0].locationId;
    // let filterLocation=this.filteredList.filter(x => x.locationName==event)

    this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,this.feeders[i].locationId,null,null,null).subscribe(x => {
      this.filteredList=x;
    this.layerSchool=Array.from(new Set(this.filteredList.map((item : any)=>item.schoolName)));
    this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
      });
    });
  }

  baseSchfilter(event,i){
    this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,this.feeders[0].locationId,null,null,null).subscribe(x => {
      this.filteredList = x;
      const inst = this.filteredList.filter(d => d.schoolName == event&&d.locationId==this.feeders[0].locationId);
      this.feeders[i].schoolId = inst[0].schoolId;

      this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,this.feeders[i].locationId,this.feeders[i].schoolId,null,null).subscribe(x => {
        this.filteredList=x;
        this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));  
      });
      
    });
  }

  countryFilterHome(event,i){
    this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
      this.filteredList = x;
      const inst = this.filteredList.filter(d => d.countryName == event)
    this.feeders[i].countryId = inst[0].countryId;
    let filterCountry=this.filteredList.filter(x => x.countryName==event)
    console.log(this.filteredList);
    this.uniqState= Array.from(new Set(filterCountry.map(item => item.stateName)));
    });
  }

  stateFiltersHome(event,i){
    this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
      this.filteredList = x;
      const inst = this.filteredList.filter(d => d.stateName == event)
    this.feeders[i].stateId = inst[0].stateId;

    this.filteredList=this.filteredList.filter(x => x.stateName==event)
    console.log(this.filteredList);
    this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
    });
  }

  baseCounfilter(event, i) {
    const country = this.countryList.filter(d => d.name == event)
    this.feeders[i].countryId = country[0].id;
  }

  customFilter = function (university: any[], u: string): any[] {
    return university.filter(x => x.name.toLowerCase().startsWith(u.toLowerCase()));
  }

  //for edit button 
  check(i) {
    this.feeders[i] = [];
    this.enableIp = true;
  }

  //for getting list of publication or title
  getTitle() {
    this.facService.getTitleList(this.title).subscribe(x => {
      this.titleList = x;
    })
  }

  //get sourceIndexing values
  getSourceValueByName() {
    this.facService.getSourceIndexingValue('UGCCare').subscribe(x => {
      this.UGCdropdown = x;
    })
    this.facService.getSourceIndexingValue('SCI').subscribe(x => {
      this.SCIdropdown = x;
    })
    this.facService.getSourceIndexingValue('ABDC').subscribe(x => {
      this.ABDCdropdown = x;
    })
    this.facService.getSourceIndexingValue('QRankWOS').subscribe(x => {
      this.Qrankdropdown = x;
    })
    this.facService.getSourceIndexingValue('QRankSCS').subscribe(x => {
      this.QrankdropdownScs = x;
    })
  }

  //get Article List
  getArticle() {
    this.facService.getArticleType().subscribe(x => {
      this.articleList = x;
    })
  }

  //get list of publisher
  getAllPublisher() {
    this.facService.getPublisher().subscribe(x => {
      this.publisherList = x;
      this.filterPublisher=x;
      
    })
  }

  //fetch data based on university
  onKeyIP(x, val, data) {
    this.ipDropdown = true;
    this.checkData = data;
    this.fill = this.universityFilter.filter(e =>
      e.universityName.toLowerCase().includes(val.toLowerCase())
    );
    if(this.fill.length==0){
      this.ipDropdown = false;
      this.feeders[data].universityId=0;
      this.universityIP=0;
    }
  }

  // fetch data based on sourcename
  onKeySource(x, val) {

    this.facService.getDropdown('ArticleType').subscribe(x => {
      this.articleDropdown = x;   
    })
    this.enableType=true;
    if(val.length==0){
      this.allowedText=2;
      this.sourceNameOpen = false;
    }
     if(val.length>this.allowedText){
    this.sourceNameOpen = true;
    this.facService.getJournal(val).subscribe(x => {
      this.filterJournal = x;
      this.allowedText=this.allowedText+2;
      if (this.filterJournal.length == 0||this.filterJournal.length=="") {
        this.sourceNameOpen = false;
        this.searchJournal = 0;
        this.enableType = true;
       }
     })
   }
  }

  //for checking Doi or crossRef
  crossRefData(modal: any) {

    this.doiList=[];
    this.crossTitle = "";
    this.crossSourceName = "";
    this.crossType = "";
    this.erromessage="";

    if(this.doi.includes("https://")){
        let doiIndex=this.doi.split("org/");
        let splitedDoi = doiIndex[1];
        this.doi=splitedDoi;
    }
    
    this.facService.crossCheckDFS(this.doi).subscribe(x => {
      this.checkValues = x;
      if (this.checkValues) {
        this.crossTitle = this.checkValues.title;
        this.crossSourceName = this.checkValues.sourceName;
        this.crossType = this.checkValues.type;
        if(this.checkValues.year!=null||this.checkValues.year!=""||this.checkValues.year!=undefined){
          this.tempfromYear=this.checkValues.year;
          }
          else{
            this.checkValues.year=null;
          }
        this.facService.GetRFSDoi(this.doi).subscribe(x => {
          this.doiList = x;
          if (this.doiList.length > 0) {
            this.erromessage = "DOI ALREADY EXISTS";
            this.enableProceed=false;
          }
          else{
            this.erromessage = this.checkValues.erromessage;
            this.enableProceed=true;
          }
        })
       }
    })
    if (this.doi) {
      this.modalService.open(modal);
    }
  }

  //for populating data based on crossRef
  processData() {
    if (this.checkValues || this.checkValues.title != null || this.checkValues.sourceName != null || this.checkValues.type != null) {
      const date = new Date(this.checkValues.publishedDate);
      this.checkValues.publishedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      if (this.checkValues.publishedDate == "0001-01-01"|| this.checkValues.publishedDate == "1970-01-01" || this.checkValues.publishedDate == null) {
        this.formattedDate = null;
        this.checkValues.publishedDate = this.formattedDate;
      }
      const accpdate = new Date(this.checkValues.depositedDate);
      this.checkValues.depositedDate = this.datePipe.transform(accpdate, 'yyyy-MM-dd');
      if (this.checkValues.depositedDate == "0001-01-01" || this.checkValues.depositedDate == "1970-01-01" || this.checkValues.depositedDate == null) {
        this.checkValues.depositedDate = null;
      }
      
      const ondate = new Date(this.checkValues.onlineDate);
      this.checkValues.onlineDate = this.datePipe.transform(ondate, 'yyyy-MM-dd');
      if (this.checkValues.onlineDate == "0001-01-01"||this.checkValues.onlineDate == "1970-01-01") {
        this.checkValues.onlineDate = null;
      }
      const pubdate = new Date(this.checkValues.printDate);
      this.checkValues.printDate = this.datePipe.transform(pubdate, 'yyyy-MM-dd');
      if (this.checkValues.printDate == "0001-01-01"|| this.checkValues.printDate == "1970-01-01" || this.checkValues.printDate == null) {
        this.formattedPubDate = null;
        this.checkValues.printDate = this.formattedPubDate;
      }

      if (this.checkValues.isreferencedbycount == 0 || this.checkValues.isreferencedbycount == null) {
        if (this.indexData.fieldName == "CROSSREF") {
          this.indexData.IsApplicable = 0;
        }
      }
      else {
        this.crossRefCitation = this.checkValues.isreferencedbycount;
        this.indexData = this.indexData.map(item => {
          if (item.fieldName === 'CROSSREF') {
            return {
              ...item,
              IsApplicable: 1,
              indexingId: 0,
              indexingValue: this.crossRefCitation
            };
          }
          return item;
        });
      }
      this.crossData = true;
      this.showData=true;
      this.activetab="BIBLIOGRAPHICS";
      this.modalService.dismissAll();
      // TO REMOVE TAG IN ABSTRACT
      if (this.checkValues.abstract != null && this.checkValues.abstract.includes("<")) {
        this.checkValues.abstract = this.checkValues.abstract.replace(/<[^>]*>/g, '');
      }
    }
  }

  //for clear data in popup menu
  clearPopUP() {
    this.crossTitle = "";
    this.crossSourceName = "";
    this.crossType = "";
  }

  //for refresh all data
  clearAll() {
    location.reload();
  }

  // for save data
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

            if (this.level == undefined) {
              this.level=null;
            }
            if(this.articleType==null||this.articleType==""){
              alert("Need to select Articletype")
            }
            if(this.sourceNameData==""||this.sourceNameData==null){
              alert("Please fill the source title")
            }
            if(this.checkValues.type===null){
              alert("Need to select Sourcetype")
            }
          
            if(this.checkValues.publishedDate==null&&this.checkValues.depositedDate==null&&this.checkValues.onlineDate==null&&this.checkValues.printDate==null&&this.checkValues.year==null){
              alert("Please select atleast one date ")
            }
            else {

              if(this.checkValues.publishedDate==null&&this.checkValues.depositedDate==null&&this.checkValues.onlineDate==null&&this.checkValues.printDate==null&&this.checkValues.year!=null){
                alert("Warning - No Dates selected. The date will be assigned as tne start date of the year entered!")
              }
              
              if (this.publisherSource == undefined) {
                this.publisherid = 0;
                this.publisherSource = "";
              }
              else {
                const pubid = this.publisherList.filter(t => t.name == this.publisherSource);
                if(pubid.length>0){
                  this.publisherid = pubid[0].id;
                }
                else{
                  this.publisherid = 0;
                }  
              }

              const article = this.articleListValues.filter(item => item.value == this.articleType);
              this.newDropArticleId = article[0].id;

              if (this.filterJournal.length == 0) {
                const articleId = this.articleDropdown.filter(item => item.value == this.checkValues.type);
                this.articleId = articleId[0].id;
              }

              if (this.checkValues.depositedDate == null) {
                this.publisheddate = null;
              }
              else {
                this.publisheddate = new DatePipe('en-US').transform(this.checkValues.depositedDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
              }
              if (this.checkValues.publishedDate == null) {
                this.crossrefDate = null;
              }
              else {
                this.crossrefDate = new DatePipe('en-US').transform(this.checkValues.publishedDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
                  console.log(this.crossrefDate);
              }
              if (this.checkValues.printDate == null) {
                this.printdate = null;
              }
              else {
                this.printdate = new DatePipe('en-US').transform(this.checkValues.printDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
              }

              //to convert date format
              if (this.checkValues.onlineDate == null) {
                this.checkValues.onlineDate = null;
              }
              const onlinedate = new DatePipe('en-US').transform(this.checkValues.onlineDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');

              // for publication object
              this.dfsPublication = new DfsPublicationNew();
              this.dfsPublication.publicationId = this.pubId;
              this.dfsPublication.doi = this.checkValues.doi;
              this.dfsPublication.title = this.checkValues.title;
              this.dfsPublication.levelId = this.levelid;
              this.dfsPublication.level = this.level;
              this.dfsPublication.volume = this.checkValues.volumeNumber;
              this.dfsPublication.issno = this.checkValues.issueNumber;
              this.dfsPublication.bPage = this.checkValues.bPage;
              this.dfsPublication.ePage = this.checkValues.ePage;
              this.dfsPublication.acceptedDate = this.publisheddate;
              this.dfsPublication.onlineDate = onlinedate;
              this.dfsPublication.printDate = this.printdate;
              this.dfsPublication.publishedDate = this.crossrefDate;
              this.dfsPublication.CrossrefDate = this.crossrefDate;
              this.dfsPublication.ConferenceName = this.conferenceName;
              this.dfsPublication.webLink = this.checkValues.weblink;
              this.dfsPublication.publisherId = this.publisherid;
              this.dfsPublication.publisherName = this.publisherSource;
              this.dfsPublication.publicationSourceId = this.searchJournal;
              this.dfsPublication.publicationSourceName = this.sourceNameData;
              this.dfsPublication.articleTypeId = this.newDropArticleId;
              this.dfsPublication.articleTypeName = this.articleType;
              this.dfsPublication.year=this.checkValues.year;
              this.dfsPublication.pissn = this.checkValues.pissn;
              this.dfsPublication.eissn = this.checkValues.eissn;
              this.dfsPublication.pisbn = this.checkValues.pisbn;
              this.dfsPublication.eisbn = this.checkValues.eisbn;
              this.dfsPublication.abstract = this.checkValues.abstract;
              this.dfsPublication.authors = this.checkValues.authors;
              this.dfsPublication.authorAddress = this.checkValues.authorsAddress;
              this.dfsPublication.technologyArea = this.checkValues.technologyarea;
              this.dfsPublication.isPubSrcCorrect=this.isCorrect;
              this.dfsPublication.pubSrcRemark=this.remarks;
              this.dfsPublication.pubSrcArticleTypeId=this.articleId.toString();
              this.dfsPublication.pubSrcArticleTypeName=this.checkValues.type;
              this.dfsPublication.SrcUniversityId=this.sourceUnivId.toString();

              for (let i = 0; i < this.indexData.length; i++) {
                if(this.indexData[i].indexingValue!=null){
                this.indexData[i].indexingValue = this.indexData[i].indexingValue.toString();
                }
                else{
                  this.indexData[i].indexingValue="";
                }
                
                if (this.indexData[i].indexingValue == "") {
                  this.indexData[i].IsApplicable = 0;
                }
                else{
                  this.indexData[i].IsApplicable = 1;
                }
          
              }

              this.indexData = this.indexData.map((item) => {
                const { type, ...rest } = item;
                return {
                  indexingType: type,
                  ...rest,
                };
              });

              for (let i = 0; i < this.tempusers.length; i++) {
                this.tempusers[i].aliasUserUniversityId=parseInt(this.universityparamId);
                this.tempusers[i].publicationUserMapId=0;
                delete this.tempusers[i].schoolEnable;
                delete this.tempusers[i].linkName;
                delete this.tempusers[i].enableAway;
                delete this.tempusers[i].enableHome;
                delete this.tempusers[i].tempId;
                
                // Convert correspondingAuthor to an integer
                if (this.tempusers[i].correspondingAuthor !=1) {
                  this.tempusers[i].correspondingAuthor = 0;  
                }
                else {
                  this.tempusers[i].correspondingAuthor =1;
                }
                if (this.tempusers[i].correspondingEmail==""){
                  this.tempusers[i].correspondingEmail=null;
                }
                // To handle null values in school 
                if (this.tempusers[i].schoolId == undefined||this.tempusers[i].schoolId==null||this.tempusers[i].schoolId=="") {
                  this.tempusers[i].schoolId = 0;
                  this.tempusers[i].schoolName = null;
                }
                if (this.tempusers[i].departmentId == undefined||this.tempusers[i].departmentId==null||this.tempusers[i].departmentId=="") {
                  this.tempusers[i].departmentId = 0;    
                }
                if (this.tempusers[i].locationId == undefined||this.tempusers[i].locationId==null||this.tempusers[i].locationId=="") {
                  this.tempusers[i].locationId = 0;    
                }
                if (this.tempusers[i].instituteId == undefined||this.tempusers[i].instituteId==null||this.tempusers[i].instituteId=="") {
                  this.tempusers[i].instituteId = 0;
                }

                if(this.tempusers[i].stateId==null||this.tempusers[i].stateId==undefined||this.tempusers[i].stateId==""){
                  this.tempusers[i].stateId=0;
                  this.tempusers[i].stateName=null;
                }
                else{
                  this.tempusers[i].stateId = parseInt(this.tempusers[i].stateId);
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
                "dfsIndexing": this.indexData,
                "dfsAuthors": this.tempusers
              }
              console.log(data);
              if(this.tempusers.length > 0){  
                  if (this.rfsEnable) {
                    this.facService.savePubRFS(data, this.user.UserId, this.roleId, this.requestId).subscribe(x => {
                      const confirmation = confirm('Details Saved Successfully');
                      if (confirmation) {
                        if (this.roleId == '12') {
                          this.router.navigate(['/clientadmin/universitySelect/RFS/view/univ']);
                        }
                        else {
                          const id = localStorage.getItem("universityId");
                          this.router.navigate(['/clientadmin/universitySelect/RFS/view/' + id]);
                        }
                      }
                    },
                      (error) => {
                        console.error(error);
                        alert("Failed to Add details. Please check.");
                        this.ngOnInit();
                      })
                  }
                  else {
                    this.facService.savePub(data, this.user.UserId, this.roleId).subscribe(x => {
                      const confirmation = confirm('Details Saved Successfully');
                      if (confirmation) {
                        if (this.roleId == '12') {
                        this.router.navigate(['/clientadmin/universitySelect/DFS/add/addnew']);
                        }
                        else{
                          this.router.navigate(['/clientadmin/universitySelect']);
                        }
                      }
                    },
                      (error) => {
                        console.error(error);
                        alert("Failed to Add details. Please check.");
                      })
                  }
                  
                }
              }
    }
  }

  newStateModel(model:any){
    this.modalService.open(model);
    this.countryModel="";
    this.stateModel="";
    this.newLocationName="";
  }

  countryModelFilter(event:any){
    this.facService.getAvailableCountry().subscribe(x=>{
      this.FilterCountryModel=x;
      const country = this.FilterCountryModel.filter(item=> item.countryName===event);
      if(event=="India"){
       this.enableState=true;
      }
      else{
        this.enableState=false;
      }
      const id =country[0].countryId;
      this.countryModelId = id;
      this.facService.getAvailableState(this.countryModelId).subscribe(x=>{
      this.filteredStateModel=x;
      })
    })
  }

  stateModelFilter(name){
        const stateFilter =this.filteredStateModel?.filter(item => item.stateName===name);
        this.stateModelId=stateFilter[0].stateId;
        this.stateModel=name;
  }

  SearchStateModel(name){
    if(name.length>0){
      this.stateModelEnable=true;
      this.filterStateList=this.filteredStateModel?.filter(item => item.stateName.toLowerCase().includes(name.toLowerCase()));
      if(this.filterStateList.length==0){
        this.stateModelEnable=false;
        this.stateModelId=0;
        this.stateModel=name;
       }
      } 
      else{
        this.stateModelEnable=false;
      }  
    }

    selectStateModel(name,id){
      this.stateModelEnable=false;
      this.stateModel=name;
      this.stateModelId=id;
    }

  addLocation(){
    const data={
      countryId:this.countryModelId,
      countryName:this.countryModel,
      stateId:this.stateModelId,
      stateName:this.stateModel,
      locationId:this.newLocationId,
      locationName:this.newLocationName
    }
     this.facService.newLocation(data,this.user.UserId).subscribe(x=>{
      console.log(x);
      alert("Details added successfully");
      this.modalService.dismissAll();

     })
  }

  levelChange(){
    this.sourceNameOpen=false;
  }
  chaneTypes(){
    this.sourceNameOpen=false;
  }

  onTabClick(val){
   this.activetab=val;
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tempusers, event.previousIndex, event.currentIndex);
    for(let i=0;i<this.tempusers.length;i++){
       this.tempusers[i].tempId=i;
    }
  }

  viewDetail(){
     this.enableView=!this.enableView;
  }

  addMoreDetail(){
    this.enableBox=true;
    this.pubSrcDisp="";
    this.pubSourceTypeName=undefined;
    this.pubSourceTitleDis="";
    this.srcCountryName=undefined;
    this.srcLevel=undefined;
    this.srcwebLink="";
    this.srcpIssn="";
    this.srceIssn="";
    this.srcpIsbn="";
    this.srceIsbn="";
    this.remarksSource="";
     // this.enablemoreDetail=!this.enablemoreDetail;
  }

  closeAdd(){
    this.enableBox=false;
  }

  closePubDetail(){
    this.enableViewPub=false;
  }

  addNewDetails(val){
        if(val=="away"){
          this.feeders[0].enableAway=true;
          this.feeders[0].enableHome=false;
        }
        else if(val=="home"){
          this.feeders[0].enableAway=false;
          this.feeders[0].enableHome=true;
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
        this.linkAuthorAllowedText=2;
        this.allowedAuthorText=2;   
        this.enableEdit=false;
      }

  newEdit(val){
      console.log(val);
      this.feeders=[];
      this.editRowId = val;
      this.enableEdit=true;
      this.feeders.push(this.tempusers[val]);
      if(this.feeders[0].enableHome==true){
          this.enableHome=true;
          this.enableAway=false;
          this.facService.getUnivLocSchInstDept(this.feeders[0].universityId, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
            this.filteredList = x;
            if (this.filteredList.length > 0) {
              this.uniqCountry= Array.from(new Set(this.filteredList.map(item => item.countryName)));
              this.uniqState= Array.from(new Set(this.filteredList.map(item => item.stateName)));
              this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
            }
          });
      }
      else{
        this.enableHome=false;
        this.enableAway=true;
      }
      this.tempusers.splice(val, 1)
      console.log(this.feeders);
      
  }

  checkNotCorrect(model:any){
    this.modalService.open(model);
  }

  updateRemark(){
    this.modalService.dismissAll();
    this.isCorrect=1;
    // this.enableaddNew=true;
  }
  clearDetails(){
    this.feeders=[{
      "universityId": null,
      "universityName": "",
      "userId": 0,
      "fullName": "",
      "countryId": null,
      "countryName": "",
      "stateId": null,
      "stateName": "",
      "locationId": null,
      "locationName": "",
      "schoolId": null,
      "schoolName": "",
      "instituteId": null,
      "instituteName": "",
      "departmentName": null,
      "correspondingEmail": null
      }];
  }

  homeUniv(){

    this.feeders[0].universityId=this.sourceUnivId;
    this.universityIP=parseInt(this.sourceUnivId);    
    this.feeders[0].universityName=this.showUnivName;
    this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
      this.filteredList = x;
      if (this.filteredList.length > 0) {
        this.uniqCountry= Array.from(new Set(this.filteredList.map(item => item.countryName)));
        this.uniqState= Array.from(new Set(this.filteredList.map(item => item.stateName)));
        this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
        // this.layerSchool=Array.from(new Set(this.filteredList.map((item : any)=>item.schoolName)));
        // this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
      }
    });

  }

  changePubSrcTitle(val){   
    this.filterDisplayTitle=this.publisherList.filter(item => item.displayName.toLowerCase().includes(val.toLowerCase()));
    this.showPubTitle=true;
    if(val==""){
      this.showPubTitle=false;
    }
    if(this.filterDisplayTitle.length==0){
       this.pubSrcTitle=val;
       this.pubSrcId=0;
       this.showPubTitle=false;
    }
  }

  onSelectPubSrcTitle(dispname,name,id){
    this.pubSourceTitleDis=dispname;
    this.pubSrcTitle=name;
    this.pubSrcId=id;
    this.showPubTitle=false;
  }

  srcTitleLeave(val){
    this.showSourceTitleDis = false;
    this.allowedTextDis=2;
    this.sourceTitleNew=val;
    this.sourceTitleId=0;
  }

  onKeySourcePubSrc(val) {
    if(val.length==0){
      this.allowedTextDis=2;
      this.showSourceTitleDis = false;
    }
     if(val.length>this.allowedTextDis){
    this.showSourceTitleDis = true;
    this.facService.getJournal(val).subscribe(x => {
      this.filterJournalList = x;
      this.allowedTextDis=this.allowedTextDis+2;
      if (this.filterJournalList.length == 0||this.filterJournalList.length=="") {
        this.showSourceTitleDis = false;
        this.sourceTitleNew=val;
        this.sourceTitleId=0;
       }
     })
   }
  }

  onSelectSourcePubSrc(dispname,name, id) {
    this.pubSrcDisp=dispname;
    this.sourceTitleNew = name;
    this.showSourceTitleDis = false;
    this.sourceTitleId = id;
    this.facService.getSourceField(id).subscribe(x => {
      this.sourceData = x;
      if (this.sourceData.length > 0) {
        this.pubSourceTypeName = this.sourceData[0].articleType;
        this.pubSrcArtcileId=this.sourceData[0].articleTypeId;
        this.pubSourceTitleDis = this.sourceData[0].publisher;
        this.srceIssn = this.sourceData[0].eissn;
        this.srcpIssn= this.sourceData[0].pissn;
        this.sourceNameExists=true;
      }
        else{
          this.sourceNameExists=false;
        }
    });
  }

     submitSrcData(){
      if(this.sourceTitleNew==""||this.pubSrcTitle==""||this.pubSrcTitle==null||this.sourceTitleNew==null){
        alert("Source Title or Publisher name cannot be empty..");
      }
      else{
        if(this.pubSourceTypeName=="Book"){
          this.enableBook=true;     
        }
        else if(this.pubSourceTypeName=="Book Chapter"){
          this.enableBook=true;
        }
      
        if(this.pubSrcDisp!=undefined&&this.pubSourceTypeName!=""&&this.pubSourceTitleDis!=undefined&&this.srcLevel!=undefined){
          
          if(this.srceIssn==""&&this.srcpIssn==""&&this.pubSourceTypeName=="Journal"){
            alert("Issn value cannot be empty")
            
          }
          else if(this.srceIssn==this.srcpIssn&&this.pubSourceTypeName=="Journal"){
            alert("Issn and EIssn values cannot be same")
          }
          else if(this.srcpIsbn==""&&this.srceIsbn==""&&this.enableBook){
              alert("Isbn value cannot be empty")
             
          }
          else if(this.srcpIsbn==this.srceIsbn&&this.enableBook){
            alert("Isbn and EIsbn values cannot be same")
          }
          else{

          if(this.pubSourceTypeName!=null||this.pubSourceTypeName!=undefined){
            const pubSrcId=this.articleListValues.filter(item=> item.value==this.pubSourceTypeName);
            this.pubSrcArtcileId=pubSrcId[0].id;
          }
          else{
            this.pubSrcArtcileId=0;
            this.pubSourceTypeName="";
          }
          if(this.srcCountryName!=undefined||this.srcCountryName!=null){
          const countId=this.countryList.filter(x=>x.countryName==this.srcCountryName);
          this.pubSrcCntId=countId[0].countryId;
          }
          else{
            this.pubSrcCntId=0;
          }
          if(this.srcLevel!=undefined||this.srcLevel!=null){
              const levelFil=this.leveDropDownmn.filter(x=>x.value==this.srcLevel);
                this.srcLevelId=levelFil[0].id;
          }
          else{
            this.srcLevelId=0;
          }
            
          this.dfsSourceTitleData= new DfsSourceTitleData();
          this.dfsSourceTitleData.dfsPubSourceQueueId=0;
          this.dfsSourceTitleData.universityId=1;
          this.dfsSourceTitleData.userId=parseInt(this.user.UserId);
          this.dfsSourceTitleData.publisherId=this.pubSrcId;
          this.dfsSourceTitleData.publisherName=this.pubSrcTitle;
          this.dfsSourceTitleData.publisherCountryId=this.pubSrcCntId;
          this.dfsSourceTitleData.publicationSourceId=this.sourceTitleId;
          this.dfsSourceTitleData.publicationSourceName=this.sourceTitleNew;
          this.dfsSourceTitleData.levelId=this.srcLevelId;
          this.dfsSourceTitleData.levelName=this.srcLevel;
          this.dfsSourceTitleData.webLink=this.srcwebLink;
          this.dfsSourceTitleData.articleTypeId=parseInt(this.pubSrcArtcileId);
          this.dfsSourceTitleData.articleTypeName=this.pubSourceTypeName;
          this.dfsSourceTitleData.issn=this.srcpIssn;
          this.dfsSourceTitleData.eissn=this.srceIssn;
          this.dfsSourceTitleData.isbn=this.srcpIsbn;
          this.dfsSourceTitleData.eisbn=this.srceIsbn;
          this.dfsSourceTitleData.actionTypeId=2;
          this.dfsSourceTitleData.remark=this.remarksSource;
          this.dfsSourceTitleData.takenBy=0;
          this.dfsSourceTitleData.verifiedBy=0;

            console.log(this.dfsSourceTitleData);
            const confirmation = confirm('Please confirm to save detail');
            if (confirmation) {
                this.facService.saveDFSSrcTitle(this.dfsSourceTitleData,this.user.UserId,this.roleId).subscribe(x=>{
                  this.enableBox=false;
                })
              }
              else{ }
             }
           
         }
          else{
              alert("Please fill all fields");
          }
        }
      } 

  clearSrcData(){
    this.pubSrcDisp="";
    this.sourceTitleNew="";
    this.sourceTitleId=null;
    this.pubSourceTypeName=undefined;
    this.pubSrcTitle="";
    this.pubSrcId=null;
    this.pubSourceTitleDis="";
    this.pubSrcTitle="";
    this.pubSrcId=null;
    this.srcCountryName=undefined;
    this.pubSrcCntId=undefined;
    this.srcLevel=undefined;
    this.srcwebLink="";
    this.srcpIssn="";
    this.srceIssn="";
    this.srcpIsbn="";
    this.srceIsbn="";
    this.sourceNameExists=false;
    this.sourceData=[];
  }

  editDetailsHome(val){
    this.editRowId = val;
    this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
      this.filteredList = x;
      if (this.filteredList.length > 0) {
        this.uniqCountry= Array.from(new Set(this.filteredList.map(item => item.countryName)));
        this.uniqState= Array.from(new Set(this.filteredList.map(item => item.stateName)));
        this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
        this.layerSchool=Array.from(new Set(this.filteredList.map((item : any)=>item.schoolName)));
        this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
        this.layerDept=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
      }
    });
  }

  editDetails(val){
    this.editRowId = val;
  }

  // For away author
  addAwayAuthor(){
    this.enableAway=true;
    this.enableHome=false;
    this.editRowId = true;
    for (let i = 0; i < this.indexData.length; i++) {
      if (this.indexData[i].IsApplicable == 1 && this.indexData[i].indexingValue === "" && this.indexData[i].forDFSInputValue == 1) {
        alert("Add Citation in " + this.indexData[i].fieldDesc);
        this.tempFlag = false;
        break;
      }
      else {
        this.tempFlag = true;
      }
    }

    if (this.tempFlag) {
      const newFeeder = {
        universityId: this.authForm.value.universityId,
        universityName: this.authForm.value.universityName,
        userId: this.authForm.value.userId,
        fullName: this.authForm.value.fullName,
        countryId: this.authForm.value.countryId,
        countryName: this.authForm.value.countryName,
        stateId:this.authForm.value.stateId,
        stateName:this.authForm.value.stateName,
        locationId: this.authForm.value.locationId,
        locationName: this.authForm.value.locationName,
        schoolId:this.authForm.value.schoolId,
        schoolName:this.authForm.value.schoolName, 
        instituteId: this.authForm.value.instituteId,
        instituteName: this.authForm.value.instituteName,
        departmentId: this.authForm.value.departmentid,
        departmentName: this.authForm.value.departmentName,
        correspondingEmail: this.authForm.value.correspondingEmail,
        correspondingAuthor: this.authForm.value.correspondingAuthor
      };
      if(this.feeders.length<1){
        this.feeders.push(newFeeder);
        // Reset form fields
        this.authForm.reset();
        console.log(this.feeders);
      }
      else if(this.feeders.length==1){
        this.feeders[0].universityName = "";
        this.feeders[0].universityId = "";
        this.feeders[0].fullName = "";
        this.feeders[0].userId = "";
        this.feeders[0].departmentId= "";
        this.feeders[0].departmentName = "";
        this.feeders[0].instituteId ="";
        this.feeders[0].instituteName = "";
        this.feeders[0].locationId ="";
        this.feeders[0].locationName = "";
        this.feeders[0].countryId ="";
        this.feeders[0].countryName = "";
        this.feeders[0].correspondingEmail="";
        this.feeders[0].correspondingAuthor="";
      }
    }
  }

    //fetch data based on away university
    onKeyIPAway(x, val, data) {
      this.ipDropdown = true;
      this.checkData = data;
      this.fillNonCus = this.nonCusUnivList.filter(e =>
        e.universityName.toLowerCase().includes(val.toLowerCase())
      );
      if(this.fillNonCus.length==0){
        this.ipDropdown = false;
        this.feeders[data].universityId=0;
        this.universityIP=0;
      }
    }

    onInputAway(item: string, id: number, val){
      this.facService.getLayerType(id, this.roleId, this.user.UserId).subscribe(data => {
        this.newfeed = data;
        this.filterdata = this.newfeed.layerType;
        if(this.filterdata=="4LType1"||this.filterdata=="4LType2"||this.filterdata=="3LType3"){
          this.filterschool = true;
        }
        else{
          this.filterschool=false;
        }
        this.feeders[val].schoolEnable = this.filterschool;
        this.feeders[val].universityName = item;
        this.feeders[val].universityId = id;
        this.ipDropdown = false;
        this.universityIP = id;
    });
  }

  //get values based on university and author
  SearchIPDataAway(text: string, val, author) {
        this.toggle(author);
        this.feeders[author].fullName = val;
        this.feeders[author].userId = 0;
        this.feeders[author].countryName="";
        this.feeders[author].stateName="";
        this.feeders[author].locationName="";
        this.feeders[author].schoolName="";
        this.feeders[author].instituteName="";
        this.feeders[author].departmentName="";
        this.feeders[author].correspondingAuthor="";
    }

    fetchPubDetail(){

      if(this.titleId!=undefined){
          this.facService.getpublication(this.titleId,this.sourceUnivId).subscribe(x=>{    
            this.viewPubList=x;   
            if (this.viewPubList.publicationSourceDBMetrics != null) {
              this.viewPubList.publicationSourceDBMetrics = this.viewPubList.publicationSourceDBMetrics.split(';');
            }
            if (this.viewPubList.authorAffiliation != null) {
              this.viewPubList.authorAffiliation = this.viewPubList.authorAffiliation.split('|');
            }
            console.log(this.viewPubList);
            this.enableViewPub=true;   
          });
      }
      
    }

    onSelectYear(val){
      const dateString= new Date(this.tempfromYear);
      const year=dateString.getFullYear();
      this.checkValues.year=year.toString();
      
     }

}
