import { filter } from 'rxjs/operators';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { DfsPublication } from '../feedersystem/dfsPublication';
import { DailyFeeder } from 'src/app/shared/model/data.models';
import { FacultiesService } from '../faculties.service';
import { AdminclientService } from '../../adminclient/adminclient.service';
import { Dfsedit } from '../dfs-edit/dfsedit';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-dfs-edit',
  templateUrl: './dfs-edit.component.html',
  styleUrls: ['./dfs-edit.component.scss', './../../../../assets/given/newcss/dfs-style/style.css','./../../../../assets/given/newcss/dfs-style/bootstrap.min.css',]
})
export class DfsEditComponent implements OnInit {

  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  isMenuOpen: boolean;
  rfsEnable: any;
  checkValues: Dfsedit;
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
  schoolList: any;
  stateFilter: any;
  fill: any[];
  filterSelectUniv:any[];
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
  title: string = '';
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
  crossSourceName: string;
  crossType: string;
  publication: string;
  checkData: any;
  checkSelectUniv:any;
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
  ipCountryDrop: boolean = false;
  ipStateDrop: boolean = false;
  ipInstituteDrop: boolean = false;
  ipSchoolDrop: boolean = false;
  ipDepartmentDrop: boolean = false;
  uniqueLocationNames: any;
  instituteList: any;
  departmentList: any;
  titleList: any;
  type: string;
  typeName:any;
  dfsPublication: any;
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
  acceptedDate: string | null = null;
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
  stateList: any;
  publicationId: any;
  editdata: any;
  editFilter: any;
  publicationid: any;
  dfsAuthors: any;
  dfsIndexing: any;
  userdata: any;
  enableLink:any;
  schoolist: any;
  layerInsSchCamDep: any;
  layerSchool: any;
  QrankdropdownScs:any;
  layerIns: any;
  FilterCountry:any;
  filteredState:any;
  filterLocation:any;
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
  enableState:boolean=false;
  tempUnivId:any;
  enableSelectUniv:boolean=false;
  linkauthor:any;
  isalias:boolean=false;
  authorFilter:any;
  Name:string;
  role:any;
  roleName:any;
  stickyEnable:boolean=false;
  isScrolled = false;
  enableView:boolean=false;
  remarks:string="";
  isCorrect:Number=0;
  tempusers:any;
  enableHome:boolean=false;
  enableAway:boolean=false;
  srcUniversityId:any;
  filterHomeUniv:any;
  uniqCountry:any;
  uniqState:any;
  layerDept:any;
  fillNonCus:any[];
  nonCusUnivList:any;
  articleType:string;
  articleListValues:any;
  newDropArticleId:number;
  enableEdit:boolean=false;
  linkAuthorAllowedText:number=2;
  enableLinkAway:any;
  linkAuthorAllowedTextAway:number=2;
  allowedAliasUnivText:number=2;
  isaliasAway:boolean=false;
  isaliasUniv:boolean=false;
  linkauthorAway:any;
  filterHomeUnivTemp:any;
  aliasUnivfilter:any;
  allowedAliasUnivTextAway:number=2;
  aliasUnivfilterAway:any;
  isaliasUnivAway:boolean=false;

  constructor(private menuService: MenuService, private router: Router, private route: ActivatedRoute, private authService: AuthService,
    private fb: FormBuilder, private modalService: NgbModal,private datePipe: DatePipe, private facService: FacultiesService, private clientservice: AdminclientService) {
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

  ngOnInit(): void {

          this.route.paramMap.subscribe(paramMap => {
            const publicationIdString = paramMap.get('publicationId');
            this.tempUnivId=paramMap.get('univId');
            if (publicationIdString !== null) {
                this.publicationId = parseInt(publicationIdString, 10); // Parse string to number
                console.log(this.publicationId);
            }
            this.typeName=paramMap.get('type');
            console.log(this.typeName);
            
           });
   
          this.menuService.isMenuOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
          });

          this.user = this.authService.getUserDetail();
          this.roleId = this.authService.getProfileObs();

          this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          // this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
            this.role=JSON.parse(localStorage.getItem('RoleSelection'));
            const data=this.role.filter(item=> item.roleId==this.roleId);
            this.roleName=data[0].roleName;
            console.log(this.roleName)
            // })

          this.facService.getDropdown('Level').subscribe(x => {
            this.leveDropDownmn = x;
          })

          this.facService.getDropdown('ArticleType').subscribe(x => {
            this.articleDropdown = x;
          })
          this.facService.getUnivertyList().subscribe(x=>{
            this.filterHomeUniv=x; 
          });

    this.facService.getdfsedit(this.publicationId,this.tempUnivId).subscribe(data => {
      this.userdata = data;
      console.log(this.userdata);
      if(this.userdata){
      this.tempusers = this.userdata.dfsAuthors;
      this.dfsIndexing = this.userdata.dfsIndexing;
       if(this.tempusers.length>0){
          for(let i=0;i<this.tempusers.length;i++){
            this.tempusers[i].tempId=i;
          }
       }
      
      this.checkValues = this.userdata.dfsPublicationNew;
      this.srcUniversityId= this.checkValues.srcUniversityId;
      const ondate = new Date(this.checkValues.onlineDate);
      this.checkValues.onlineDate = this.datePipe.transform(ondate, 'yyyy-MM-dd');

      if (this.checkValues.onlineDate == "0001-01-01"||this.checkValues.onlineDate == "1970-01-01") {
        this.checkValues.onlineDate = null;
      }

      const accpdate = new Date(this.checkValues.acceptedDate);
      this.checkValues.acceptedDate = this.datePipe.transform(accpdate, 'yyyy-MM-dd');
      if (this.checkValues.acceptedDate == "0001-01-01" || this.checkValues.acceptedDate == null || this.checkValues.acceptedDate == "1970-01-01") {
        this.checkValues.acceptedDate = null;
      }

      const date = new Date(this.checkValues.publishedDate);
      this.checkValues.publishedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      if (this.checkValues.publishedDate == "0001-01-01" || this.checkValues.publishedDate == null || this.checkValues.publishedDate == "1970-01-01") {
        this.checkValues.publishedDate = null;
      }

      const pubdate = new Date(this.checkValues.printDate);
          this.checkValues.printDate = this.datePipe.transform(pubdate, 'yyyy-MM-dd');
      if (this.checkValues.printDate == "0001-01-01" || this.checkValues.printDate == null || this.checkValues.printDate == "1970-01-01") {
         this.checkValues.printDate = null;
      }

       if(this.leveDropDownmn&&this.checkValues.levelId!=0){
            let levelname = this.leveDropDownmn.filter(x => x.id == this.checkValues.levelId)
            this.checkValues.level = levelname[0].value;
       }

      // this.clientservice.GetUniversity(this.user.UserId,this.roleId).subscribe(data => {
      //     this.runiversity = data;
      //     this.universityFilter = data;
      //   });

      this.facService.getUnivertyList().subscribe(x=>{
        this.filterHomeUnivTemp=x;       
      
      if(this.tempusers.length>0){   
        for(let i=0;i<this.tempusers.length;i++){

          this.tempusers[i].tempId=i;
          if(this.tempusers[i].aliasUserUniversityId!=null&&this.universityFilter){
            
            let filterName=this.filterHomeUnivTemp.filter(item=>item.id==this.tempusers[i].aliasUserUniversityId);
              let univName=filterName[0].name;
            this.tempusers[i].linkUnivName=univName;
            
            this.facService.AuthorSearch(this.tempusers[i].aliasUserUniversityId, "").subscribe((data:any) => {
              console.log("author");
              
              if(data.length>0){
                if(this.tempusers[i].aliasUserId!=null){
                  let univFilter=data.filter(x=>x.userId==this.tempusers[i].aliasUserId);
                  this.tempusers[i].linkName=univFilter[0].authorName;
                }
              }
                });
              }
            }
          console.log(this.tempusers); 
          }
        });
      }
    })

    if (this.type == 'RFS') {
      this.rfsEnable = true;
      this.clientservice.getRFSSupportUserDetail(this.requestId, this.rfsType).subscribe(data => {
        this.rfsList = data;
        console.log(this.rfsList);
        this.rfsuserName = this.rfsList.userFullName;
        this.rfsDept = this.rfsList.departmentName;
        this.rfsPubTitle = this.rfsList.publicationTitle;
        this.rfsSource = this.rfsList.publicationSourceName;
        this.rfsDoi = this.rfsList.doi;
        console.log(this.rfsList);
      });
    }

    this.facService.getAvailableCountry().subscribe(x=>{
      this.countryList=x;
      this.clientservice.GetNonCusUniv(this.user.UserId,this.roleId).subscribe(x => {
        this.nonCusUnivList=x;
      });
    })

    this.getUniversity();
    this.getDataIndex();
    this.getAllPublisher();
    this.getSourceValueByName();
    this.facService.getDropdown('ArticleType').subscribe(x => {
      this.articleListValues = x;   
    })
    }

      toggle(val) {
        this.editRowId = val;
      }

      delete(index: any) {
        const confirmation = confirm('Are sure you want to delete author?');
          if (confirmation) {
            this.tempusers.splice(index, 1)
          }   
      }
      
      getUniversity() {
        this.clientservice.GetUniversity(this.user.UserId,this.roleId).subscribe(data => {
          this.runiversity = data;
          this.universityFilter = data;
          console.log(this.universityFilter);
        });
      }

      //for article index and source index
      getDataIndex() {
        this.facService.getIndex().subscribe((data: any) => {
          this.indexData = data.map(item => ({
            ...item,
            isApplicable: 0,
            indexingId: 0,
            indexingValue: ""
          }));
        });

      }

      add() {
        this.editRowId = true;

        for (let i = 0; i < this.dfsIndexing.length; i++) {

          if (this.dfsIndexing[i].isApplicable == 1 && this.dfsIndexing[i].indexingValue == "" && this.dfsIndexing[i].forDFSInputValue == 1) {
            alert("Add Citation in" + this.indexData[i].fieldDesc);
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
            stateId: this.authForm.value.stateId,
            stateName: this.authForm.value.stateName,
            locationId: this.authForm.value.locationId,
            locationName: this.authForm.value.locationName,
            schoolId: this.authForm.value.schoolId,
            schoolName: this.authForm.value.schoolName,
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

  changeJournal(x) {
    if (x.length > 4) {
      this.hideTitle = true;
      this.facService.getTitleList(x).subscribe(data => {
        this.titleList = data;
        if (this.titleList.length == 0) {
          this.checkTitle = x;
          this.hideTitle = false;
          console.log(this.checkTitle);
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
      console.log(data);
      this.newfeed = data;
      this.filterdata = this.newfeed.layerType;
      if (this.filterdata == "4LType1" || this.filterdata == "4LType2" || this.filterdata == "3LType3") {
        this.filterschool = true;
      }
      else {
        this.filterschool = false;
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
  onAutherClick(universityid, userid, name: string, deptid, dept: string, instid, inst: string, locationid, loca: string, countryid, coun: string, cemail: string, cauthor: Number, val,stateId,state:string,schoolId,school:string,linkid,linkname:string) {
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
    this.feeders[val].aliasUserId =linkid;
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
    console.log(val);

  }

  onselectCountry(name, id, i) {
    this.ipCountryDrop = false;
    this.feeders[i].countryId = id;
    this.feeders[i].countryName = name;
  }

  onselectState(name, id, i) {
    this.ipStateDrop = false;
    this.feeders[i].stateId = id;
    this.feeders[i].stateName = name;
  }

  onselectSchool(name, id, i) {
    this.ipSchoolDrop = false;
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

  editDetails(val){
    this.editRowId = val;
  }

  editDetailsHome(val,univId){
      this.editRowId = val;
      this.universityIP=univId;
      this.facService.getUnivLocSchInstDept(univId, this.roleId, this.user.UserId, null, null, null, null).subscribe(x => {
        this.filteredList = x;
        console.log(x);
        if (this.filteredList.length > 0) {
          this.uniqCountry= Array.from(new Set(this.filteredList.map(item => item.countryName)));
          this.uniqState= Array.from(new Set(this.filteredList.map(item => item.stateName)));
          this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
            this.layerSchool=Array.from(new Set(this.filteredList.map((item : any)=>item.schoolName)));
          this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
        }
        else {
          this.filterListDrop = true;
          console.log("enter");
        }
      })
  }

  //populate value based on source name
  onSelectSource(name, id) {
    this.sourceNameData = name;
    this.sourceNameOpen = false;
    this.searchJournal = id;

    this.facService.getSourceField(id).subscribe(x => {
      this.sourceData = x;
      console.log(x);
      this.publisherSource = this.sourceData[0].publisher;
      if (this.sourceData.length > 0) {
          this.publisherSource = this.sourceData[0].publisher;
          this.checkValues.articleTypeName = this.sourceData[0].articleType;
          this.checkValues.eissn = this.sourceData[0].eissn;
          this.checkValues.pissn = this.sourceData[0].pissn;
          this.checkValues.level = this.sourceData[0].level;
          this.checkValues.levelId = this.sourceData[0].levelId;

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

  //common list of country
  SearchCountry(event, i) {
    if (event == "") {
      this.ipCountryDrop = false;
    } else {
      this.ipCountryDrop = true;
      this.facService.getCountryDropDown(event).subscribe(x => {
        this.countryList = x;
      })
    }
  }

  SearchState(event, i) {
    if (event == "") {
      this.ipStateDrop = false;
    } else {
      this.ipStateDrop = true;
      this.facService.getDropdown('State').subscribe(x => {
        this.stateList = x;
        this.stateFilter = this.stateList.filter(item => item.value.toLowerCase().includes(event.toLowerCase()))

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

    if(val.length >= 3){
      this.facService.AuthorSearch(this.universityIP, val).subscribe(data => {
      this.Author = data;
      console.log(this.Author);
      if (this.Author == "") {
        this.toggle(author);
      }
      else {
        this.toggle("editdisable");
      }
      this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId, null, null, null, null).subscribe(x => {
        this.filteredList = x;
        console.log(x);
        if (this.filteredList.length > 0) {
          this.uniqCountry= Array.from(new Set(this.filteredList.map(item => item.countryName)));
          this.uniqState= Array.from(new Set(this.filteredList.map(item => item.stateName)));
          this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
        }
        else {
          this.filterListDrop = true;
          console.log("enter");
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

  baseDeptfilter(event, i) {
    this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,this.feeders[0].locationId,this.feeders[i].schoolId,this.feeders[i].instituteId,null).subscribe(x => {
      this.filteredList = x;
      const dept = this.filteredList.filter(d => d.departmentName == event)
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

  baseCounfilter(event, i) {
    console.log(event);
    const country = this.countryList.filter(d => d.name == event)
    this.feeders[i].countryId = country[0].id;
    console.log(country[0].id);

  }

  customFilter = function (university: any[], u: string): any[] {
    return university.filter(x => x.name.toLowerCase().startsWith(u.toLowerCase()));
  }

  //for edit button 
  check(i) {
    console.log("print");
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
      console.log(x);

    })
  }

  //get list of publisher
  getAllPublisher() {
    this.facService.getPublisher().subscribe(x => {
      this.publisherList = x;
      console.log(this.publisherList);

    })
  }

  //fetch data based on university
  onKeyIP(x, val, data) {
    console.log(val);
    this.ipDropdown = true;
    this.checkData = data;
    this.fill = this.universityFilter.filter(e =>
      e.universityName.toLowerCase().includes(val.toLowerCase())
    );
    console.log(this.fill);
    if(this.fill.length==0){
      this.ipDropdown = false;
      this.feeders[data].universityId=0;
      this.universityIP=0;

    }
  }

  // fetch data based on sourcename
  onKeySource(x, val) {

    this.sourceNameOpen = true;
    this.facService.getJournal(val).subscribe(x => {
      this.filterJournal = x;
      if (this.filterJournal.length == 0) {
        this.sourceNameOpen = false;
        this.searchJournal = 0;
        this.enableType = true;
        this.facService.getDropdown('ArticleType').subscribe(x => {
          this.articleDropdown = x;
        })
      }
    })
  }

  //for populating data based on crossRef
  processData() {

    if (this.checkValues || this.checkValues.title != null || this.checkValues.publicationSourceName != null || this.checkValues.articleTypeName != null) {
      console.log(this.checkValues);
      const date = new Date(this.checkValues.publishedDate);
      // this.checkValues.publishedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      if (this.checkValues.publishedDate == "0001-01-01" || this.checkValues.publishedDate == null) {
        this.formattedDate = null;
        this.checkValues.publishedDate = this.formattedDate;
      }
      const ondate = new Date(this.checkValues.onlineDate);
      // this.checkValues.onlineDate = this.datePipe.transform(ondate, 'yyyy-MM-dd');
      if (this.checkValues.onlineDate == "0001-01-01") {
        this.checkValues.onlineDate = null;
      }
      const pubdate = new Date(this.checkValues.printDate);
      // this.checkValues.printDate = this.datePipe.transform(pubdate, 'yyyy-MM-dd');
      if (this.checkValues.printDate == "0001-01-01" || this.checkValues.printDate == null) {
        this.formattedPubDate = null;
        this.checkValues.printDate = this.formattedPubDate;
      }

      this.crossData = true;
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
        if(this.checkValues.acceptedDate==""&&this.checkValues.onlineDate==""&&this.printdate==null&&this.checkValues.year==""){
          alert("Please select atleast one date ")
        }
        else{

          if(this.checkValues.acceptedDate==""&&this.checkValues.onlineDate==""&&this.printdate==null&&this.checkValues.year!=""){
            alert("Warning - No Dates selected. The date will be assigned as tne start date of the year entered!")
          }
      
          if(this.checkValues.pubSrcArticleTypeName==null){     
          } 
          else{    
            const article = this.articleListValues.filter(item => item.value ==this.checkValues.pubSrcArticleTypeName);
            this.checkValues.pubSrcArticleTypeId = article[0].id.toString();
          } 
            const tempArticle = this.articleDropdown.filter(item => item.value == this.checkValues.articleTypeName)
              this.articleId=tempArticle[0].id;

        if (this.checkValues.acceptedDate == null) {
          this.acceptedDate = null;
        }
        else {
          this.acceptedDate = new DatePipe('en-US').transform(this.checkValues.acceptedDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
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

        const onlinedate = (this.checkValues.onlineDate, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
        // for publication object
        this.dfsPublication = new DfsPublication();

        this.dfsPublication.publicationId = this.publicationId;
        this.dfsPublication.doi = this.checkValues.doi;
        this.dfsPublication.title = this.checkValues.title;
        this.dfsPublication.levelId =  this.checkValues.levelId;
        this.dfsPublication.level = this.checkValues.level;
        this.dfsPublication.volume = this.checkValues.volume;
        this.dfsPublication.issno = this.checkValues.issno;
        this.dfsPublication.bPage = this.checkValues.bPage;
        this.dfsPublication.ePage = this.checkValues.ePage;
        this.dfsPublication.acceptedDate = this.acceptedDate;
        this.dfsPublication.onlineDate = this.checkValues.onlineDate;
        this.dfsPublication.printDate = this.printdate;
        this.dfsPublication.CrossrefDate= this.checkValues.crossrefDate;
        this.dfsPublication.publishedDate = this.checkValues.publishedDate;
        this.dfsPublication.ConferenceName = this.checkValues.conferenceName;
        this.dfsPublication.webLink = this.checkValues.webLink;
        this.dfsPublication.publisherId = this.checkValues.publisherId;;
        this.dfsPublication.publisherName = this.checkValues.publisherName;
        this.dfsPublication.publicationSourceId = this.checkValues.publicationSourceId;
        this.dfsPublication.publicationSourceName = this.checkValues.publicationSourceName;
        this.dfsPublication.articleTypeId =this.articleId.toString();
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

        if(this.srcUniversityId==null){
          this.dfsPublication.SrcUniversityId=this.tempUnivId.toString();
        }
        else{
          this.dfsPublication.SrcUniversityId=this.srcUniversityId.toString();
        }

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
          if(this.tempusers[i].universityId==""||this.tempusers[i].universityId==null){
            this.tempusers[i].universityId=="0";
          }
          this.tempusers[i].aliasUserUniversityId=parseInt(this.tempusers[i].aliasUserUniversityId);
          delete this.tempusers[i].schoolEnable;
          delete this.tempusers[i].linkUnivName;
          delete this.tempusers[i].linkName;
          delete this.tempusers[i].tempId;
          delete this.tempusers[i].isHomeUniversity;
          delete this.tempusers[i].publicationUserMapId;
          delete this.tempusers[i].publicationUserSeqNoUI;
          delete this.tempusers[i].publicationUserSeqNoDB;
          // Convert correspondingAuthor to an integer
          if (this.tempusers[i].correspondingAuthor !=1) {
            this.tempusers[i].correspondingAuthor = 0;  
          }
          else {
            this.tempusers[i].correspondingAuthor =1;
          }
          // To handle null values in school 
          if (this.tempusers[i].schoolId == undefined || this.tempusers[i].schoolId == null|| this.tempusers[i].schoolId == "") {
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
          if(this.tempusers[i].aliasUserId==null||this.tempusers[i].aliasUserId==undefined||this.tempusers[i].aliasUserId==""){
            this.tempusers[i].aliasUserId=0;      
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

        if(this.typeName=="DFS"){
          this.facService.savePub(data, this.user.UserId, this.roleId).subscribe(x => {
            const confirmation = confirm('Update Details Successfully');
            if (confirmation) {
              if(this.roleId=="12"){  
                this.router.navigate(['/cisupportadmin']);
              }
              else{
                this.router.navigate(['/clientadmin/universitySelect/DFS/viewDfs/'+this.tempUnivId]);
              }
            }

          },
            (error) => {
              console.error(error);
              alert("Failed to Add details. Please check.");
            })
          }
          else{
            this.facService.savePubRFS(data, this.user.UserId, this.roleId,0).subscribe(x => {
              const confirmation = confirm('Update Details Successfully');
              if (confirmation) {
                if(this.roleId=="12"){  
                  this.router.navigate(['/clientadmin/universitySelect/DFS/viewDfs/university']);
                }
                else{
                  this.router.navigate(['/clientadmin/universitySelect/DFS/viewDfs/'+this.tempUnivId]);
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

  countryFilter(event, i){

    this.facService.getAvailableCountry().subscribe(x=>{
      this.FilterCountry=x;
      const country = this.FilterCountry.filter(item=> item.countryName===event);
      const id =country[0].countryId;
      console.log(id);
      this.feeders[i].countryId = id;
      this.feeders[i].countryName = event;
      this.facService.getAvailableState(id).subscribe(x=>{
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

newStateModel(model:any){
  this.modalService.open(model);
}

countryModelFilter(event:any){
  this.facService.getAvailableCountry().subscribe(x=>{
    this.FilterCountryModel=x;
    const country = this.FilterCountryModel.filter(item=> item.countryName===event);
    const id =country[0].countryId;
    console.log(id);
    this.countryModelId = id;
    if(event=="India"){
      this.enableState=true;
     }
     else{
       this.enableState=false;
     }
    this.facService.getAvailableState(this.countryModelId).subscribe(x=>{
    this.filteredStateModel=x;
      console.log(x);
    })
  })
}

        SearchStateModel(name){
          if(name.length>0){
            this.stateModelEnable=true;
            this.filterStateList=this.filteredStateModel?.filter(item => item.stateName.toLowerCase().includes(name.toLowerCase()));
            console.log(this.filterStateList);
              
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

      stateModelFilter(name){
        const stateFilter =this.filteredStateModel?.filter(item => item.stateName===name);
        this.stateModelId=stateFilter[0].stateId;
        this.stateModel=name;
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
        console.log(data);
        this.facService.newLocation(data,this.user.UserId).subscribe(x=>{
          console.log(x);
          alert("Details added successfully");
          this.modalService.dismissAll();
        })

      }

    searchUniv(name,val){
      this.enableSelectUniv = true;
      this.checkSelectUniv=val;
      this.filterSelectUniv = this.universityFilter.filter(e =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      console.log(this.filterSelectUniv);

      if(this.filterSelectUniv.length==0){
        this.feeders[val].aliasUserUniversityId=0;
       }
     }

     clickSelectUniv(item: string, id: number, val) {
        this.feeders[val].linkUnivName = item;
        this.feeders[val].aliasUserUniversityId = id;
        this.enableSelectUniv = false;
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


                viewDetail(){
                  this.enableView=!this.enableView;
               }

               checkNotCorrect(model:any){
                this.modalService.open(model);
              }

              updateRemark(){
                this.modalService.dismissAll();
                this.isCorrect=1;
                // this.enableaddNew=true;
              }

              onDrop(event: CdkDragDrop<string[]>) {
                moveItemInArray(this.tempusers, event.previousIndex, event.currentIndex);
                for(let i=0;i<this.tempusers.length;i++){
                  this.tempusers[i].tempId=i;
               }     
              }

              addHomeAuthor() {
                this.enableAway=false;
                this.enableHome=true;
                this.editRowId = true;
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

              addAwayAuthor(){
                this.enableAway=true;
                this.enableHome=false;
                this.editRowId = true;
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

              homeUniv(){

                this.feeders[0].universityId=this.srcUniversityId;
                let univFil=this.filterHomeUniv.filter(x=>x.id==this.srcUniversityId);
                this.feeders[0].universityName=univFil[0].name;
              
                // this.universityIP=parseInt(this.type);
                // this.feeders[0].universityName=this.showUnivName;
                this.facService.getUnivLocSchInstDept(this.srcUniversityId, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
                  this.filteredList = x;
                  console.log(this.filteredList);
                  
                  // if (this.filteredList.length > 0) {
                  //   this.uniqCountry= Array.from(new Set(this.filteredList.map(item => item.countryName)));
                  //   this.uniqState= Array.from(new Set(this.filteredList.map(item => item.stateName)));
                  //   this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
                  //   // this.layerSchool=Array.from(new Set(this.filteredList.map((item : any)=>item.schoolName)));
                  //   // this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
                  // }
                });

              }

              newEdit(val){
                console.log(val);
                this.feeders=[];
                console.log(this.tempusers[val]);
                this.editRowId = val;
                this.enableEdit=true;
                this.feeders.push(this.tempusers[val]);
                if(this.feeders[0].isHomeUniversity==1){
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

  // countryFilter(event, i){
  //   this.facService.getAvailableCountry().subscribe(x=>{
  //     this.FilterCountry=x;
  //     const country = this.FilterCountry.filter(item=> item.countryName===event);
  //     const id =country[0].countryId;
  //     this.feeders[i].countryId = id;
  //     this.feeders[i].countryName = event;
  //     this.facService.getAvailableState(id).subscribe(x=>{
  //     this.filteredState=x;
  //     })
  //   })
  // }

  leaveAuthor(){
    this.ipAutherDrop = false;
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

          aliasid(univId,name,i) {
            
                    this.enableLink=i;
                  if(name.length==0){
                    this.linkAuthorAllowedText=2;
                    this.isalias = false;
                  }
                  if(name.length>this.linkAuthorAllowedText){
                    this.isalias=true;
                    this.facService.AuthorSearch(univId, name).subscribe(data => {
                    this.linkauthor = data;
                    this.linkAuthorAllowedText=this.linkAuthorAllowedText+2;
                    this.isalias=true;
                    if (this.linkauthor.length == 0||this.linkauthor.length=="") {
                    this.isalias = false;
                    this.feeders[i].linkName = name;
                    this.feeders[i].aliasUserId = 0;
                      }
                    })
              }
        }

        Onlink(name,i,id){
          this.isalias=false;
          this.feeders[i].linkName = name;
          this.feeders[i].aliasUserId = id; 
        }

        aliasidAway(univId,name,i) {
    
          this.enableLinkAway=i;
         if(name.length==0){
           this.linkAuthorAllowedTextAway=2;
           this.isaliasAway = false;
         }
         if(name.length>this.linkAuthorAllowedText){
           this.isaliasAway=true;
          this.facService.AuthorSearch(univId, name).subscribe(data => {
          this.linkauthorAway = data;
          this.linkAuthorAllowedTextAway=this.linkAuthorAllowedTextAway+2;
          this.isaliasAway=true;
          if (this.linkauthorAway.length == 0||this.linkauthorAway.length=="") {
           this.isaliasAway = false;
           this.feeders[i].linkName = name;
           this.feeders[i].aliasUserId = 0;
            }
           });
         }
       }

       OnlinkAway(name,i,id){
        this.isaliasAway=false;
        this.feeders[i].linkName = name;
        this.feeders[i].aliasUserId = id; 
      }

       filterAliaseUniv(univName,val){

             this.enableLink=val;
             if(univName.length==0){
              this.allowedAliasUnivText=2;
              this.isaliasUniv = false;
            }
            if(univName.length>this.allowedAliasUnivText){
              this.isaliasUniv=true;

              this.aliasUnivfilter= this.universityFilter.filter(item => item.universityName.toLowerCase().includes(univName.toLowerCase()));

                this.allowedAliasUnivText=this.allowedAliasUnivText+2;
                if (this.aliasUnivfilter.length == 0) {
                  this.isaliasUniv = false;
                  this.feeders[val].linkUnivName = univName;
                  this.feeders[val].aliasUserUniversityId = 0;
                  }
            }

       }

       OnClickUnivAlias(name,val,id){
        this.isaliasUniv=false;
        this.feeders[val].linkUnivName = name;
        this.feeders[val].aliasUserUniversityId = id; 

       }

       filterAliaseUnivAway(univName,val){

            this.enableLinkAway=val;
            if(univName.length==0){
            this.allowedAliasUnivTextAway=2;
            this.isaliasUnivAway = false;
            }
          if(univName.length>this.allowedAliasUnivTextAway){
            this.isaliasUnivAway=true;

            this.aliasUnivfilterAway= this.universityFilter.filter(item => item.universityName.toLowerCase().includes(univName.toLowerCase()));

              this.allowedAliasUnivTextAway=this.allowedAliasUnivTextAway+2;
              if (this.aliasUnivfilterAway.length == 0) {
                this.isaliasUnivAway = false;
                this.feeders[val].linkUnivName = univName;
                this.feeders[val].aliasUserUniversityId = 0;
                }
            }
       }

       OnClickUnivAliasAway(name,val,id){

        this.isaliasUnivAway=false;
        this.feeders[val].linkUnivName = name;
        this.feeders[val].aliasUserUniversityId = id; 
       }

 }
