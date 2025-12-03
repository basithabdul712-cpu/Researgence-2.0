import { AdminclientService } from './../../adminclient/adminclient.service';
import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailyFeeder } from 'src/app/shared/model/data.models';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { FacultiesService } from '../faculties.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from 'src/app/shared/services/menu.service';
import { DfsPublication } from '../feedersystem/dfsPublication';

@Component({
  selector: 'app-feedersystem',
  templateUrl: './feedersystem.component.html',
  styleUrls: ['./../../../../assets/given/css/style.css', './../../../../assets/given/css/bootstrap.min.css', './feedersystem.component.scss']
})
export class FeedersystemComponent implements OnInit {
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
  dfsPublication: DfsPublication;
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
  erromessage: any;
  enableType: boolean = false;
  articleDropdown: any;
  doiList: any;
  newfeed: any;
  filterdata: any;
  filterschool: boolean = false;
  stateList:any;
  layerSchool: any;
  layerIns: any;
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
  AliasUserId: string;
  universityparamId: any;
  aliasauthor: any;
  universityId: any;
  alias: any[];
  isalias: boolean=false;
  linkauthor: any;
  enableLink:any;
  activetab:any;

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

      corresAuthor: [''],
    });
  }

  ngOnInit() {

        this.route.params.subscribe(params => {    
          console.log('Route Params:', params);       
          this.universityparamId=params['sys'];
          console.log(this.universityparamId);
      });

    //for accessing menuopen 
    this.user = this.authservice.getUserDetail();

    this.roleId = this.authservice.getProfileObs();
    this.route.paramMap.subscribe(paramMap => {
      this.type = paramMap.get('sys');
      this.requestId = paramMap.get('requestId');
      this.rfsType = paramMap.get('rfsType');

      if (this.type == 'RFS') {
        this.universityparamId=localStorage.getItem("RfsUnivId");
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
    });
            this.menuService.isMenuOpen$.subscribe(isOpen => {
              this.isMenuOpen = isOpen;
            });
            this.facService.getAvailableCountry().subscribe(x=>{
              this.countryList=x;
            })
            this.getUniversity();
            this.getDataIndex();
            this.facService.getDropdown('Level').subscribe(x => {
              this.leveDropDownmn = x;
            })
            this.getAllPublisher();
            this.getSourceValueByName();

       }

  add() {
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

      this.feeders.push(newFeeder);
      // Reset form fields
      this.authForm.reset();
      console.log(this.feeders);
    }
  }

  toggle(val) {
    this.editRowId = val;
  }

  delete(index: any) {
    this.feeders.splice(index, 1)
  }

  getUniversity() {
    this.facService.SearchUniversity().subscribe(data => {
      this.runiversity = data;
      this.universityFilter = data;
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
        if (this.titleList.length == 0) {
          this.checkTitle = x;
          this.hideTitle = false;
        }
      })
    }
  }

  onSelectJournal(item: string) {
    this.title = item;
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
          this.feeders[val].linkName = linkname;
          this.feeders[val].correspondingEmail = cemail;
          this.feeders[val].stateId = stateId;
          this.feeders[val].stateName = state;
          this.feeders[val].schoolId = schoolId;
          this.feeders[val].schoolName = school;
          this.ipAutherDrop = false;
          console.log(this.feeders);
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
      this.publisherSource = this.sourceData[0].publisher;
      if (this.sourceData.length > 0) {
        if (this.checkValues.sourceName == null && this.checkValues.title == null) {
          this.publisherSource = this.sourceData[0].publisher;
          this.checkValues.eissn = this.sourceData[0].eissn;
          this.checkValues.pissn = this.sourceData[0].pissn;
          this.checkValues.level = this.sourceData[0].level; 
           if(this.sourceData[0].articleType==null||this.sourceData[0].articleType==""){
                  this.enableType=true;
           }
           else{
            this.checkValues.type = this.sourceData[0].articleType;
            this.enableType=false;
           }
        }
        for (let i = 0; i < this.indexData.length; i++) {
          for (let t = 0; t < this.sourceData.length; t++) {
            if (this.indexData[i].type == "SourceIndexing" && this.indexData[i].fieldName == this.sourceData[t].fieldName) {
              this.indexData[i].indexingValue = this.sourceData[t].sourceIndexingValue;
            }
          }
        }
      }
    })
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
      this.facService.getAvailableLocation(this.feeders[i].countryId,id).subscribe(x=>{
        this.filterLocation=x;     
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
    if (event == "") {
      this.ipSchoolDrop = false;
    }
    else {
      this.facService.NoncusUniversitySch(event).subscribe(x => {
        this.schoolList = x;
        if(this.schoolList.length>0){
          this.ipSchoolDrop = true;
        }     
        else{
          this.ipSchoolDrop = false;
          this.feeders[i].schoolId = 0;
          this.feeders[i].schoolName = event;
        }
      })
    }
  }

  //common list of institute
  SearchInstitute(event, i) {
    if (event == "") {
      this.ipInstituteDrop = false;
    }
    else {   
      this.facService.NoncusUniversityInst(event).subscribe(x => {
        this.instituteList = x;
        if(this.instituteList.length>0){
          this.ipInstituteDrop = true;
        }     
        else{
          this.ipInstituteDrop = false;
          this.feeders[i].instituteId = 0;
          this.feeders[i].instituteName = event;
        }
      })
    }
  }

  //common list of institute
  SearchDepartment(event, i) {
    if (event == "") {
      this.ipDepartmentDrop = false;
    }
    else {
      this.facService.NoncusUniversityDept(event).subscribe(x => {
        this.departmentList = x;
        if(this.instituteList.length>0){
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
    if (this.checkValues.authors != null) {
    const tempauthor = this.checkValues.authors;
    const authorSplit = tempauthor.split(',');
      this.AuthorName = authorSplit.filter(t => t.includes("(F)")).map(name => name.replace('.(F)', ''));
    }
     this.facService.AuthorSearch(this.universityparamId, name).subscribe(data => {
     this.linkauthor = data;
     this.isalias=true;
     this.feeders[i].linkname = name;
     this.feeders[i].AliasUserId = 0;
     })
  }

  Onlink(name,i,id){
    this.isalias=false;
    this.feeders[i].linkname = name;
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
    if (val.length >= 3) {
    this.facService.AuthorSearch(this.universityIP, val).subscribe(data => {
      this.Author = data;
      if (this.Author == "") {
        this.toggle(author);
      }
      else {
        this.toggle("editdisable");
      }
      this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
        this.filteredList = x;
        if (this.filteredList.length > 0) {
          this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
          this.layerSchool=Array.from(new Set(this.filteredList.map((item : any)=>item.schoolName)));
          this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
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
      }
    });
   }
  }

  baseDeptfilter(event, i) {
    const dept = this.filteredList.filter(d => d.departmentName == event)
    this.feeders[i].departmentId = dept[0].departmentId;
  }

  baseInstfilter(event, i) {
    const inst = this.filteredList.filter(d => d.instituteName == event)
    this.feeders[i].instituteId = inst[0].instituteId;
  }

  baseLocfilter(event, i) {
    const inst = this.filteredList.filter(d => d.locationName == event)
    this.feeders[i].locationId = inst[0].locationId;
  }

  baseSchfilter(event,i){
    const inst = this.filteredList.filter(d => d.schoolName == event)
    this.feeders[i].schoolId = inst[0].schoolId;
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
    })
  }

  //fetch data based on university
  onKeyIP(x, val, data) {
    this.ipDropdown = true;
    this.checkData = data;
    this.fill = this.universityFilter.filter(e =>
      e.name.toLowerCase().includes(val.toLowerCase())
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
    this.facService.crossCheckDFS(this.doi).subscribe(x => {
      this.checkValues = x;
      this.erromessage = this.checkValues.erromessage;
      if (this.checkValues) {
        this.crossTitle = this.checkValues.title;
        this.crossSourceName = this.checkValues.sourceName;
        this.crossType = this.checkValues.type;
        this.facService.GetRFSDoi(this.doi).subscribe(x => {
          this.doiList = x;
          if (this.doiList.length > 0) {
            this.erromessage = "DOI ALREADY EXISTS";
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
      if (this.checkValues.publishedDate == "0001-01-01" || this.checkValues.publishedDate == null) {
        this.formattedDate = null;
        this.checkValues.publishedDate = this.formattedDate;
      }
      const accpdate = new Date(this.checkValues.depositedDate);
      this.checkValues.depositedDate = this.datePipe.transform(accpdate, 'yyyy-MM-dd');
      if (this.checkValues.depositedDate == "0001-01-01" || this.checkValues.depositedDate == null) {
        this.checkValues.depositedDate = null;
      }
      
      const ondate = new Date(this.checkValues.onlineDate);
      this.checkValues.onlineDate = this.datePipe.transform(ondate, 'yyyy-MM-dd');
      if (this.checkValues.onlineDate == "0001-01-01") {
        this.checkValues.onlineDate = null;
      }
      const pubdate = new Date(this.checkValues.printDate);
      this.checkValues.printDate = this.datePipe.transform(pubdate, 'yyyy-MM-dd');
      if (this.checkValues.printDate == "0001-01-01" || this.checkValues.printDate == null) {
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

    if (this.level == undefined) {
      alert("Need to select level")
    }
    else if(this.checkValues.type==null){
      alert("Need to select type")
    }
    else if(this.checkValues.publishedDate==null&&this.checkValues.depositedDate==null&&this.checkValues.onlineDate==null&&this.checkValues.printDate==null&&this.checkValues.year==null){
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

      const level = this.leveDropDownmn.filter(item => item.value == this.level);
      this.levelid = level[0].id;
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
        this.checkValues.onlineDate = "9999-01-01";
      }
      const onlinedate = new DatePipe('en-US').transform(this.checkValues.onlineDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');

      // for publication object
      this.dfsPublication = new DfsPublication();
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
      this.dfsPublication.articleTypeId = this.articleId;
      this.dfsPublication.articleTypeName = this.checkValues.type;
      this.dfsPublication.year=this.checkValues.year;
      this.dfsPublication.pissn = this.checkValues.pissn;
      this.dfsPublication.eissn = this.checkValues.eissn;
      this.dfsPublication.pisbn = this.checkValues.pisbn;
      this.dfsPublication.eisbn = this.checkValues.eisbn;
      this.dfsPublication.abstract = this.checkValues.abstract;
      this.dfsPublication.authors = this.checkValues.authors;
      this.dfsPublication.authorAddress = this.checkValues.authorsAddress;
      this.dfsPublication.technologyArea = this.checkValues.technologyarea;

      for (let i = 0; i < this.indexData.length; i++) {
        this.indexData[i].indexingValue = this.indexData[i].indexingValue.toString();
        if (this.indexData[i].indexingValue == "") {
          this.indexData[i].IsApplicable = 0;
        }
        else {
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

      for (let i = 0; i < this.feeders.length; i++) {
        this.feeders[i].aliasUserUniversityId=parseInt(this.universityparamId);
        delete this.feeders[i].schoolEnable;
        delete this.feeders[i].linkname;
        // Convert correspondingAuthor to an integer
        if (this.feeders[i].correspondingAuthor != undefined) {
          this.feeders[i].correspondingAuthor = parseInt(this.feeders[i].correspondingAuthor);
        }
        else {
          this.feeders[i].correspondingAuthor = 0;
        }
        if (this.feeders[i].correspondingEmail==""){
          this.feeders[i].correspondingEmail=null;
        }
        // To handle null values in school 
        if (this.feeders[i].schoolId == undefined||this.feeders[i].schoolId==null||this.feeders[i].schoolId=="") {
          this.feeders[i].schoolId = 0;
          this.feeders[i].schoolName = null;
        }
        if (this.feeders[i].departmentId == undefined||this.feeders[i].departmentId==null||this.feeders[i].departmentId=="") {
          this.feeders[i].departmentId = 0;    
        }
        if (this.feeders[i].locationId == undefined||this.feeders[i].locationId==null||this.feeders[i].locationId=="") {
          this.feeders[i].locationId = 0;    
        }
        if (this.feeders[i].instituteId == undefined||this.feeders[i].instituteId==null||this.feeders[i].instituteId=="") {
          this.feeders[i].instituteId = 0;
        }

         if(this.feeders[i].stateId==null||this.feeders[i].stateId==undefined||this.feeders[i].stateId==""){
          this.feeders[i].stateId=0;
          this.feeders[i].stateName=null;
        }
        else{
          this.feeders[i].stateId = parseInt(this.feeders[i].stateId);
        }
        if(this.feeders[i].AliasUserId==null||this.feeders[i].AliasUserId==undefined||this.feeders[i].AliasUserId==""){
          this.feeders[i].AliasUserId=0;      
        }
        else{
          this.feeders[i].AliasUserId = parseInt(this.feeders[i].AliasUserId);
        }
      }

      const data = {
        "dfsPublication": this.dfsPublication,
        "dfsIndexing": this.indexData,
        "dfsAuthors": this.feeders
      }
      console.log(data);

      if (this.feeders.length > 0) {
        if (this.rfsEnable) {
          this.facService.SaveNewPub(data, this.user.UserId, this.roleId, this.requestId).subscribe(x => {
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
          this.facService.saveAll(data, this.user.UserId, this.roleId).subscribe(x => {
            const confirmation = confirm('Details Saved Successfully');
            if (confirmation) {
              this.router.navigate(['/clientadmin/universitySelect']);
            }
          },
            (error) => {
              console.error(error);
              alert("Failed to Add details. Please check.");
            })
        }
      }
      else {
        alert("Need to add atleast one author detail");
      }
     }
  }

  newStateModel(model:any){
    this.modalService.open(model);
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

}
