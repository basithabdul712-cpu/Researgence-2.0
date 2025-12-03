import { filter } from 'rxjs/operators';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { DailyFeeder } from 'src/app/shared/model/data.models';
import { AdminclientService } from '../../adminclient/adminclient.service';
import { Patentrfmodel } from './patentrfsmodel';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FacultiesService } from '../../faculties/faculties.service';
import { DfsPatent } from '../patent-feedersystem/dfsPatent';
import { DfsSourceTitleData } from '../patent-feedersystem/dfsSourceTitleData';
@Component({
  selector: 'app-patent-edit',
  templateUrl: './patent-edit.component.html',
  styleUrls: ['./patent-edit.component.scss', './../../../../assets/given/newcss/dfs-style/style.css','./../../../../assets/given/newcss/dfs-style/bootstrap.min.css']
})
export class PatentEditComponent implements OnInit {

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
  dfsPublication: DfsPatent;
  dfsSourceTitleData:DfsSourceTitleData;
  pubId: Number = 0;
  articleId: Number = 0;
  sameInvApp: Number = 0;
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
 appForm: FormGroup;
 openPickerIndex: number = 0;
 tempAppUsers: any=[];
 enableAppHome = false;
 enableAppAway = false;
 applicantFeeders: any[] = [];
 enableAppEdit = false;
 editAppRowId:any;
 patCountryList:any;
 domainList:any;
 appTypeList:any;
 hideApplicant:boolean=false;
 filingDtTemp:any;
 pubDtTemp:any;
 reqDtTemp:any;
 ferIssDtTemp:any;
 ferRplDtTemp:any;
 herDtTemp:any;
 granDtTemp:any;
 appStatusList:any;
 checkDFSorRFS:any;
 enableCheckBox:boolean=false;
 patentType:string;
 patId:any;
 entryType:any;
 univId:any;
 patEditList:any;
 filterHomeUnivTemp:any;
 allowedAliasUnivText:number;
 isaliasUniv:boolean=false;
 aliasUnivfilter:any;
 allowedAliasUnivTextAway:number;
 isaliasUnivAway:boolean=false;
 aliasUnivfilterAway:any;
 tempPubDt:any;
 tempFilDt:any;
 appInvTypeList:any;

  constructor(private menuService: MenuService, private router: Router, private route: ActivatedRoute, private authservice: AuthService,
    private fb: FormBuilder, private modalService: NgbModal,private datePipe: DatePipe, private facService: FacultiesService, private clientservice: AdminclientService) {
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
      aliasUserId: [''], 
      aliasUserUniversityId: [''], 
      patentInventorMapId: [''], 
      patentInventorSeq: [''], 
      patentApplicantMapId: [''], 
      patentApplicantSeq: [''], 
      isUserAddressSame: [''], 
      PatentAplicntInvntrTypeId:[''],
    });

    this.appForm = this.fb.group({
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
      aliasUserId: [''], 
      aliasUserUniversityId: [''], 
      patentInventorMapId: [''], 
      patentInventorSeq: [''],
      patentApplicantMapId: [''], 
      patentApplicantSeq: [''], 
      isUserAddressSame: [''], 
      PatentAplicntInvntrTypeId:[''],
    });

     this.dfsPublication=new DfsPatent();
  }

  ngOnInit() {

    this.route.params.subscribe(params => {    

        this.patId=params['patentId'];
        this.entryType=params['type'];   
        this.univId=params['univId'];
        this.sourceUnivId=this.univId;      
        this.universityparamId=this.sourceUnivId;
      });

     this.roleId = this.authservice.getProfileObs();
     this.user = this.authservice.getUserDetail();
     this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    //  this.authservice.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
          this.role=JSON.parse(localStorage.getItem('RoleSelection'));
          const data=this.role.filter(item=> item.roleId==this.roleId);
          this.roleName=data[0].roleName;
          console.log(this.roleName)
      // });

      this.facService.patentEditRecord(this.patId,this.univId,this.user.UserId,this.roleId).subscribe(t=>{
          this.patEditList=t;
          console.log(t);
          this.dfsPublication=this.patEditList.dfsrfsPatent;
          if(this.dfsPublication.filingDate!=null){
              this.filingDtTemp= this.initialFormatDt(this.dfsPublication.filingDate);
              
           }
           else{
            this.filingDtTemp=undefined;
           }
           
           if(this.dfsPublication.publishedDate!=null){
            this.pubDtTemp=this.initialFormatDt(this.dfsPublication.publishedDate);
            }
            else{
              this.pubDtTemp=undefined;
            }

            if(this.dfsPublication.examinationDate!=null){
              this.reqDtTemp=this.initialFormatDt(this.dfsPublication.examinationDate);
              }
              else{
                this.reqDtTemp=undefined;
              }

              if(this.dfsPublication.ferIssuedDate!=null){
                this.ferIssDtTemp=this.initialFormatDt(this.dfsPublication.ferIssuedDate);
                }
                else{
                  this.ferIssDtTemp=undefined;
                }

                if(this.dfsPublication.ferReplyDate!=null){
                  this.ferRplDtTemp=this.initialFormatDt(this.dfsPublication.ferReplyDate);
                  }
                  else{
                    this.ferRplDtTemp=undefined;
                  }

                if(this.dfsPublication.hearingNoticeDate!=null){
                  this.herDtTemp=this.initialFormatDt(this.dfsPublication.hearingNoticeDate);
                  }
                  else{
                    this.herDtTemp=undefined;
                  }

                  if(this.dfsPublication.grantDate!=null){
                    this.granDtTemp=this.initialFormatDt(this.dfsPublication.grantDate);
                    }
                    else{
                      this.granDtTemp=undefined;
                    }

                    this.tempusers=this.patEditList.dfsrfsPatentInventors;
                    this.tempAppUsers=this.patEditList.dfsrfsPatentApplicants;

            }); 

            this.facService.getUnivertyList().subscribe(x=>{
              this.filterHomeUnivTemp=x;       
            
            if(this.tempusers.length>0){   
              for(let i=0;i<this.tempusers.length;i++){
                 
                this.tempusers[i].tempId=i;
                this.tempusers[i].PatentAplicntInvntrTypeId=String(this.tempusers[i].patentAplicntInvntrTypeId);
                delete this.tempusers[i].patentAplicntInvntrTypeId;
                delete this.tempusers[i].patentInventorSeqNoUI;

                if(this.tempusers[i].aliasUserUniversityId!=null&&this.universityFilter){
                  
                  let filterName=this.filterHomeUnivTemp.filter(item=>item.id==this.tempusers[i].aliasUserUniversityId);
                    let univName=filterName[0].name;
                  this.tempusers[i].linkUnivName=univName;
                  
                  this.facService.AuthorSearch(this.tempusers[i].aliasUserUniversityId, "").subscribe((data:any) => {
                    console.log("author");
                    
                        if(data.length>0){
                          if(this.tempusers[i].aliasUserId!=null){
                            let univFilter=data.filter(x=>x.userId==this.tempusers[i].aliasUserId);
                            if(univFilter.length>0){
                              this.tempusers[i].linkName=univFilter[0].authorName;
                            }
                          }
                        }
                      });
                    }
                  }
                console.log(this.tempusers); 
                }

                if(this.tempAppUsers.length>0){   
                  for(let j=0;j<this.tempAppUsers.length;j++){

                    delete this.tempAppUsers[j].patentApplicantSeqNoUI;
                    this.tempAppUsers[j].PatentAplicntInvntrTypeId=String(this.tempAppUsers[j].patentAplicntInvntrTypeId);
                    this.tempAppUsers[j].tempId=j;
                    delete this.tempAppUsers[j].patentAplicntInvntrTypeId;
                    
                    if(this.tempAppUsers[j].aliasUserUniversityId!=null&&this.universityFilter){
                      
                      let filterName=this.filterHomeUnivTemp.filter(item=>item.id==this.tempAppUsers[j].aliasUserUniversityId);
                        let univName=filterName[0].name;
                      this.tempAppUsers[j].linkUnivName=univName;
                      
                      this.facService.AuthorSearch(this.tempAppUsers[j].aliasUserUniversityId, "").subscribe((data:any) => {
                        console.log("author");
                        
                              if(data.length>0){
                                if(this.tempAppUsers[j].aliasUserId!=null){
                                  let univFilter=data.filter(x=>x.userId==this.tempAppUsers[j].aliasUserId);
                                  if(univFilter.length>0){
                                    this.tempAppUsers[j].linkName=univFilter[0].authorName;
                                  }
                                }
                              }
                          });
                        }
                      }
                    console.log(this.tempAppUsers); 
                    }
              });

              this.facService.patentCountry().subscribe(x=>{
                this.patCountryList=x;
                });

            this.checkDFSorRFS=localStorage.getItem("patentDFS");
            console.log(this.checkDFSorRFS);

            if(this.checkDFSorRFS!=null){
                  this.rfsEnable = true;
                  this.clientservice.getPatentEval(this.checkDFSorRFS).subscribe((data:any) => {
                    this.rfsList=data.rfsPatRequestedUserDetail;
                  });
                }
                  this.facService.getAppStatusList().subscribe(x => {
                    this.appStatusList = x;   
                    console.log(x);
                  });

                  this.getUniversity();
                  this.menuService.isMenuOpen$.subscribe(isOpen => {
                    this.isMenuOpen = isOpen;
                  });
                  this.facService.getAvailableCountry().subscribe(x=>{
                    this.countryList=x;
                    console.log(this.countryList);
                    this.clientservice.GetNonCusUniv(this.user.UserId,this.roleId).subscribe(x => {
                      this.nonCusUnivList=x;
                    });
                  });

                  this.facService.getDropdown('ArticleType').subscribe(x => {
                    this.articleListValues = x;   
                  });

                  this.facService.getDropdown('PATENTDOMAIN').subscribe(x => {
                    this.domainList = x;   
                  });

                  this.facService.getDropdown('PATENTAPPLICANTTYPE').subscribe(x => {
                    this.appTypeList = x;   
                  });

                  this.facService.getDropdown('PATENTINVENTORTYPE').subscribe(x => {
                    this.appInvTypeList = x;   
                  });
              
            }

        addHomeAuthor(val) {
          
            if(val == "Inventors"){
              this.enableAway=false;
              this.enableHome=true;
              this.editRowId = true;
              this.addAuthAwayOrHome();
            }else {
              console.log("Applicants clicked to add new applicants");
              this.enableAppAway = false;
              this.enableAppHome = true;
              this.editRowId = true;
              // this.editAppRowId = true;
              this.addAppAwayOrHome();
            }
          
        }

        toggle(val) {
          this.editRowId = val;
        }

        delete(index: any) {    
          this.tempusers.splice(index, 1);
        }

        deleteApp(index: any){
          this.tempAppUsers.splice(index, 1);
        }

        getUniversity() {

            this.clientservice.GetUniversity(this.user.UserId,this.roleId).subscribe(data => {
              this.runiversity = data;
              this.universityFilter = data;
              console.log(this.universityFilter);
              this.sourceUnivFilter = data;
              // let univFilter= this.sourceUnivFilter.filter(x => x.universityName==this.showUnivName);       
              // this.sourceUnivId=univFilter[0].universityId;      
            });

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

                    onInput(item: string, id: number, val, desc) {
                      this.facService.getLayerType(id, this.roleId, this.user.UserId).subscribe(data => {
                        this.newfeed = data;
                        this.filterdata = this.newfeed.layerType;
                        if(this.filterdata=="4LType1"||this.filterdata=="4LType2"||this.filterdata=="3LType3"){
                          this.filterschool = true;
                        }
                        else{
                          this.filterschool=false;
                        }

                        const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;

                        targetArray[val].schoolEnable = this.filterschool;
                        targetArray[val].universityName = item;
                        targetArray[val].universityId = id;
                        
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
                      });

                    }

                      //populate value based on author select
                      onAutherClick(universityid,userid,name: string,deptid, dept: string,instid, inst: string,locationid, loca: string,countryid, coun: string, cemail: string,cauthor:Number, val,stateId,state:string,schoolId,school:string, desc,linkid,linkname:string) {
                        const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                        targetArray[val].universityId=universityid;
                        targetArray[val].fullName = name;
                        targetArray[val].userId = userid;
                        targetArray[val].departmentId= deptid;
                        targetArray[val].departmentName = dept;
                        targetArray[val].instituteId =instid;
                        targetArray[val].instituteName = inst;
                        targetArray[val].locationId =locationid;
                        targetArray[val].locationName = loca;
                        targetArray[val].countryId =countryid;
                        targetArray[val].countryName = coun;
                        targetArray[val].aliasUserId =linkid;
                        if(linkname==undefined||linkname==null){
                        targetArray[val].linkName = "";
                        }
                      else{
                        targetArray[val].linkName =linkname;
                      }
                        targetArray[val].correspondingEmail = "";
                        targetArray[val].correspondingAuthor=false;
                        targetArray[val].stateId = stateId;
                        targetArray[val].stateName = state;
                        targetArray[val].schoolId = schoolId;
                        targetArray[val].schoolName = school;
                        this.ipAutherDrop = false;
                        console.log(targetArray);
                        this.toggle("editdisable");
                        this.facService.getAvailableState(countryid).subscribe(x=>{
                          this.filteredState=x;
                    });    
                  }

                  //Capture values in corres author
                  corresAuthor(val: string, i,desc) {
                    const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                    targetArray[i].correspondingAuthor = val;
                  }

                  onselectCountry(name, id, i,desc) {
                    const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                    this.ipCountryDrop = false;
                    targetArray[i].countryId = id;
                    targetArray[i].countryName = name;
                  }

                  onselectState(name, id, i,desc){
                  const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders; 
                  this.ipStateDrop= false;
                  targetArray[i].stateId = id;
                  targetArray[i].stateName = name;
                  }

                  onselectSchool(name, id, i,desc){
                    const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                    this.ipSchoolDrop=false;
                    targetArray[i].schoolId = id;
                    targetArray[i].schoolName = name;
                  }

                  onselectInstitute(name, id, i,desc) {
                    const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                    this.ipInstituteDrop = false;
                    targetArray[i].instituteId = id;
                    targetArray[i].instituteName = name;
                  }

                  onselectDepartment(name, id, i,desc) {
                    const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                    this.ipDepartmentDrop = false;
                    targetArray[i].departmentId = id;
                    targetArray[i].departmentName = name;
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

              countryFilter(event, i,desc){
                const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                this.facService.getAvailableCountry().subscribe(x=>{
                  this.FilterCountry=x;
                  const country = this.FilterCountry.filter(item=> item.countryName===event);
                  const id =country[0].countryId;
                  targetArray[i].countryId = id;
                  targetArray[i].countryName = event;
                  this.facService.getAvailableState(id).subscribe(x=>{
                  this.filteredState=x;
                  });
                });
              }

              stateFilters(event,i,desc){

                const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                  const state=this.filteredState.filter(x=>x.stateName===event)
                  let id=state[0].stateId;
                  targetArray[i].stateId = id;  
                  targetArray[i].stateName = event;
                  this.facService.getAvailableLocation(targetArray[i].countryId,id).subscribe((x:any)=>{
                    this.filterLocation=x;
                    // this.uniqueLocationNamesAway=x.map(item => item.locationName);        
                  });
                }

                LocationFilter(event,i,desc){
                  const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                  const location=this.filterLocation.filter(x=> x.locationName===event)
                  targetArray[i].locationName=event;
                  let id=location[0].locationId;
                  targetArray[i].locationId = id;  
                }

                SearchState(event,i){
                  if (event == "") {
                    this.ipStateDrop = false;
                  } else {
                    this.ipStateDrop = true;
                    this.facService.getDropdown('State').subscribe(x => {
                      this.stateList = x;
                      this.stateFilter=this.stateList.filter(item => item.value.toLowerCase().includes(event.toLowerCase()))
                    });
                  }
                }

                SearchSchool(event, i,desc){
                  const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                  targetArray[i].schoolId = 0;
                  targetArray[i].schoolName = event;
                }

                //common list of institute
                SearchInstitute(event, i,desc) {
                  const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;    
                  targetArray[i].instituteId = 0;
                  targetArray[i].instituteName = event;
                }

                  //common list of institute
                  SearchDepartment(event, i,desc) {
                    const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
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
                          targetArray[i].departmentId = 0;
                          targetArray[i].departmentName = event;
                        }
                      });
                    }
                  }

                //for non customer university]
                nonCustLocation(name, i,desc) {
                  const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                  targetArray[i].locationId = 0;
                  targetArray[i].locationName = name;
                }

                filterAliaseUniv(univName,val,desc){
                        const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
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
                                  targetArray[val].linkUnivName = univName;
                                  targetArray[val].aliasUserUniversityId = 0;
                                    }
                              }
                    }

                    filterAliaseUnivAway(univName,val,desc){
                      const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                      this.enableLinkAway=val;
                      if(univName.length==0){
                          this.allowedAliasUnivTextAway=2;
                          this.isaliasUnivAway = false;
                        }
                            if(univName.length>this.allowedAliasUnivText){
                          this.isaliasUnivAway=true;

                          this.aliasUnivfilterAway= this.universityFilter.filter(item => item.universityName.toLowerCase().includes(univName.toLowerCase()));

                            this.allowedAliasUnivTextAway=this.allowedAliasUnivTextAway+2;
                                if (this.aliasUnivfilterAway.length == 0) {
                                  this.isaliasUnivAway = false;
                                  targetArray[val].linkUnivName = univName;
                                  targetArray[val].aliasUserUniversityId = 0;
                                  }
                              }
                    }

                aliasid(name,i,desc) {
                  const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
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
                    targetArray[i].linkName = name;
                    targetArray[i].aliasUserId = 0;
                    }
                    })
                  }
                }

                      aliasidAway(name,i,desc) {
                        const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
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
                        targetArray[i].linkName = name;
                        targetArray[i].aliasUserId = 0;
                          }
                        })
                      }
                    }

                  OnClickUnivAlias(name,val,id,desc){
                    const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                    this.isaliasUniv=false;
                    targetArray[val].linkUnivName = name;
                    targetArray[val].aliasUserUniversityId = id; 

                  }

                  OnClickUnivAliasAway(name,val,id,desc){
                          const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                          this.isaliasUnivAway=false;
                          targetArray[val].linkUnivName = name;
                          targetArray[val].aliasUserUniversityId = id; 
                  }

                  Onlink(name,i,id,desc){
                    const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                    this.isalias=false;
                    targetArray[i].linkName = name;
                    targetArray[i].aliasUserId = id; 
                  }

                    OnlinkAway(name,i,id,desc){
                      const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                      this.isaliasAway=false;
                      targetArray[i].linkName = name;
                      targetArray[i].aliasUserId = id; 
                    }

              //get values based on university and author
              SearchIPData(text: string, val, author, desc) {
                //for assign yes to first author
                // const tempauthor = this.checkValues.authors;
                // console.log(tempauthor);
                console.log(author);
                const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;

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
                      console.log(this.uniqCountry);
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
                    targetArray[author].fullName = val;
                    targetArray[author].userId = 0;
                    targetArray[author].countryName="";
                    targetArray[author].stateName="";
                    targetArray[author].locationName="";
                    targetArray[author].schoolName="";
                    targetArray[author].instituteName="";
                    targetArray[author].departmentName="";
                    targetArray[author].correspondingAuthor=false;
                    
                  }
                  if(targetArray[author].aliasUserId!=null||targetArray[author].aliasUserId!=""){
                  }
                  else{
                    targetArray[author].aliasUserId=0;
                  }
                });
              }
              }

                  onLeaveAuthor(name,index,desc){
                    const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                    this.ipAutherDrop = false;
                    this.toggle(index);
                    console.log(this.feeders);
                    if(targetArray[index].userId!=0){
                      this.toggle("editdisable");
                    }
                    else{
                      targetArray[index].fullName = name;
                      targetArray[index].userId = 0;
                      targetArray[index].countryName="";
                      targetArray[index].stateName="";
                      targetArray[index].locationName="";
                      targetArray[index].schoolName="";
                      targetArray[index].instituteName="";
                      targetArray[index].departmentName="";
                      targetArray[index].correspondingAuthor=false;
                      this.toggle(index);
                    }
                    
                  }

                  onLeaveAuthorIp(name,index,desc){
                    console.log(this.feeders);
                    console.log(this.applicantFeeders);
                    const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                    if(targetArray[0].unviversityId!=""||targetArray[0].unviversityId!=null){
                      if(targetArray[0].userId==0&&targetArray[0].countryName!=""){

                      }
                    else if(targetArray[0].userId==0||targetArray[0].userId==null||targetArray[0].userId==""){
                      targetArray[0].fullName = name;
                      targetArray[0].userId = 0;
                      targetArray[index].countryName="";
                      targetArray[index].stateName="";
                      targetArray[index].locationName="";
                      targetArray[index].schoolName="";
                      targetArray[index].instituteName="";
                      targetArray[index].departmentName="";
                      targetArray[index].correspondingauthor=false;
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

              baseDeptfilter(event, i,desc) {
                const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,targetArray[0].locationId,targetArray[i].schoolId,targetArray[i].instituteId,null).subscribe(x => {
                  this.filteredList = x;
                  const dept = this.filteredList.filter(d => d.departmentName == event);
                  targetArray[i].departmentId = dept[0].departmentId;
                });
            
              }

              baseInstfilter(event, i,desc) {
                const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,targetArray[0].locationId,targetArray[i].schoolId,null,null).subscribe(x => {
                  this.filteredList = x;

                  if(targetArray[i].schoolEnable!=false){
                    const inst = this.filteredList.filter(d => d.instituteName == event&&d.locationId==targetArray[0].locationId&&d.schoolId==targetArray[i].schoolId);      
                    targetArray[i].instituteId = inst[0].instituteId; 
                  }
                  else{
                    const inst = this.filteredList.filter(d => d.instituteName == event&&d.locationId==targetArray[0].locationId);      
                    targetArray[i].instituteId = inst[0].instituteId; 
                  }

                  this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,targetArray[0].locationId,targetArray[i].schoolId,targetArray[i].instituteId,null).subscribe(x => {
                    this.filteredList = x;
                    this.layerDept=Array.from(new Set(this.filteredList.map((item : any)=>item.departmentName)));   
                  });
                  
                });
                // const inst = this.filteredList.filter(d => d.instituteName == event)
                // this.feeders[i].instituteId = inst[0].instituteId;
                // this.filteredList=this.filteredList.filter(x => x.instituteName==event)
              }

              baseLocfilter(event, i,desc) {
                const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
                const inst = this.filteredList.filter(d => d.locationName == event)
                targetArray[i].locationId = inst[0].locationId;
                // let filterLocation=this.filteredList.filter(x => x.locationName==event)

                this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,targetArray[i].locationId,null,null,null).subscribe(x => {
                  this.filteredList=x;
                this.layerSchool=Array.from(new Set(this.filteredList.map((item : any)=>item.schoolName)));
                this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
                  });
                });
              }

              baseSchfilter(event,i,desc){
                const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,targetArray[0].locationId,null,null,null).subscribe(x => {
                  this.filteredList = x;
                  const inst = this.filteredList.filter(d => d.schoolName == event&&d.locationId==targetArray[0].locationId);
                  targetArray[i].schoolId = inst[0].schoolId;

                  this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,targetArray[i].locationId,targetArray[i].schoolId,null,null).subscribe(x => {
                    this.filteredList=x;
                    this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));  
                  });
                  
                });
              }

            countryFilterHome(event,i,desc){
              const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
              this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
                this.filteredList = x;
                const inst = this.filteredList.filter(d => d.countryName == event)
                targetArray[i].countryId = inst[0].countryId;
              let filterCountry=this.filteredList.filter(x => x.countryName==event)
              console.log(this.filteredList);
              this.uniqState= Array.from(new Set(filterCountry.map(item => item.stateName)));
              });
            }

            stateFiltersHome(event,i,desc){
              const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
              this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
                this.filteredList = x;
                const inst = this.filteredList.filter(d => d.stateName == event)
              targetArray[i].stateId = inst[0].stateId;

              this.filteredList=this.filteredList.filter(x => x.stateName==event)
              console.log(this.filteredList);
              this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
              });
            }

            baseCounfilter(event, i,desc) {
              const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
              const country = this.countryList.filter(d => d.name == event)
              targetArray[i].countryId = country[0].id;
            }

            customFilter = function (university: any[], u: string): any[] {
              return university.filter(x => x.name.toLowerCase().startsWith(u.toLowerCase()));
            }

            //for edit button 
            check(i,desc) {
              const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
              targetArray[i] = [];
              this.enableIp = true;
            }

              //fetch data based on university
              onKeyIP(x, val, data,desc) {
                const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                this.ipDropdown = true;
                this.checkData = data;
                this.fill = this.universityFilter.filter(e => {
                  return e.universityName.toLowerCase().includes(val.toLowerCase())
                });
                if(this.fill.length==0){
                  this.ipDropdown = false;
                  targetArray[data].universityId=0;
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


              //for refresh all data
              clearAll() {
                location.reload();
              }


      submitAll() {

          if(this.dfsPublication.applicationNumber==null){
            return;
          }

          if(this.dfsPublication.patentOfficeName==null){
            return;
          }

          if(this.dfsPublication.patentTitle==null){
            return;
          }

          if(this.dfsPublication.filingDate==null){
            return;
          }

          if(this.dfsPublication.patentStatusName==null){
            return;
          }

          if (this.enableHome || this.enableAway) {
            alert("Please add inventor details before submit");
            if (!this.feeders[0].universityName) {
              this.feeders = [];
              this.enableAway = false;
              this.enableHome = false;
            }
            return;
          }

          this.dfsPublication = this.prepareDfsPublication();
          const inventors = this.prepareInventors();  

          if(inventors.length==0&&this.tempAppUsers.length==0){
            alert("Please add atleast one applicant and inventor detail before submit");
            return;
          }

          //  For inventor
                const inventorList = [];
                for (let i = 0; i < inventors.length; i++) {
                  inventorList.push(inventors[i].fullName);
                }
                this.dfsPublication.inventors = inventorList.join(',');

                //  For applicant 
                  //  For inventor
                  const applicantList = [];
                  for (let i = 0; i < this.tempAppUsers.length; i++) {
                    applicantList.push(this.tempAppUsers[i].fullName);
                  }
                  this.dfsPublication.applicants = applicantList.join(',');


          for(let i=0; i< this.tempAppUsers.length; i++){

            if(this.tempAppUsers[i].aliasUserUniversityId==""||this.tempAppUsers[i].aliasUserUniversityId==null){
              this.tempAppUsers[i].aliasUserUniversityId=0;
            }
            else{
              this.tempAppUsers[i].aliasUserUniversityId=parseInt( this.tempAppUsers[i].aliasUserUniversityId);
            }
    
              if(this.enableCheckBox){
                this.tempAppUsers[i].isUserAddressSame=true;
              }
              else{
                this.tempAppUsers[i].isUserAddressSame=false;
              }
             
              this.tempAppUsers[i].patentApplicantMapId=this.tempAppUsers[i].patentApplicantMapId ?? 0;
              this.tempAppUsers[i].patentApplicantSeq=this.tempAppUsers[i].patentApplicantSeq ?? 0;
              this.tempAppUsers[i].correspondingAuthor=false;

              if(this.tempAppUsers[i].patentApplicantMapId==null||this.tempAppUsers[i].patentApplicantMapId==""){
                this.tempAppUsers[i].patentApplicantMapId=0;
              }

              if(this.tempAppUsers[i].patentApplicantSeq==null||this.tempAppUsers[i].patentApplicantSeq==""){
                this.tempAppUsers[i].patentApplicantSeq=0;
              }

              if(this.tempAppUsers[i].locationId==null||this.tempAppUsers[i].locationId==""){
                this.tempAppUsers[i].locationId=0;
              }

              if(this.tempAppUsers[i].locationName==""||this.tempAppUsers[i].locationName==undefined){
                this.tempAppUsers[i].locationName=null;
             }
      
              if(this.tempAppUsers[i].schoolId==null||this.tempAppUsers[i].schoolId==""){
                this.tempAppUsers[i].schoolId=0;
              }

              if(this.tempAppUsers[i].schoolName==""||this.tempAppUsers[i].schoolName==undefined){
                this.tempAppUsers[i].schoolName=null;
               }
               
              if(this.tempAppUsers[i].instituteId==null||this.tempAppUsers[i].instituteId==""){
                this.tempAppUsers[i].instituteId=0;
               }

               if(this.tempAppUsers[i].instituteName==""||this.tempAppUsers[i].instituteName==undefined){
                this.tempAppUsers[i].instituteName=null;
               }

              if(this.tempAppUsers[i].departmentId==null||this.tempAppUsers[i].departmentId==""){
                this.tempAppUsers[i].departmentId=0;
               }

               if(this.tempAppUsers[i].departmentName==""||this.tempAppUsers[i].departmentName==undefined){
                this.tempAppUsers[i].departmentName=null;
               }

              if(this.tempAppUsers[i].aliasUserId==null||this.tempAppUsers[i].aliasUserId==""){
                this.tempAppUsers[i].aliasUserId=0;
              }

              if (this.tempAppUsers[i].patentApplicantSeqNoDB === undefined) {
                this.tempAppUsers[i].patentApplicantSeqNoDB = 0;
              }

              this.tempAppUsers[i].patentApplicantSeqNoUI=this.tempAppUsers[i].tempId+1;

              delete this.tempAppUsers[i].correspondingauthor;
              delete this.tempAppUsers[i].enableAppAway;
              delete this.tempAppUsers[i].enableAppHome;
              delete this.tempAppUsers[i].enableAway;
              delete this.tempAppUsers[i].enableHome;
              delete this.tempAppUsers[i].schoolEnable;
              delete this.tempAppUsers[i].tempId;
              delete this.tempAppUsers[i].patentInventorMapId;
              delete this.tempAppUsers[i].patentInventorSeq;
              delete this.tempAppUsers[i].linkName;
              delete this.tempAppUsers[i].isHomeUniversity;
              delete this.tempAppUsers[i].linkUnivName;
          }

          for(let j=0; j<inventors.length; j++){

            if(inventors[j].aliasUserUniversityId==""||inventors[j].aliasUserUniversityId==null){
              inventors[j].aliasUserUniversityId=0;
            }

              inventors[j].correspondingAuthor=false;
              if(this.enableCheckBox){
                inventors[j].isUserAddressSame=true;
              }
               else{
                inventors[j].isUserAddressSame=false;
               }
          
              inventors[j].patentInventorMapId= inventors[j].patentInventorMapId ?? 0;
              inventors[j].patentInventorSeq= inventors[j].patentInventorSeq ?? 0;

              if(inventors[j].patentInventorMapId==null||inventors[j].patentInventorMapId==""){
                inventors[j].patentInventorMapId=0;
              }
              if(inventors[j].patentInventorSeq==null||inventors[j].patentInventorSeq==""){
                inventors[j].patentInventorSeq=0;
              }

            if(inventors[j].locationId==null||inventors[j].locationId==""){
              inventors[j].locationId=0;
            }

            if(inventors[j].locationName==""||inventors[j].locationName==undefined){
              inventors[j].locationName=null;
             }

            if(inventors[j].schoolId==null||inventors[j].schoolId==""){
              inventors[j].schoolId=0;
            }

            if(inventors[j].schoolName==""||inventors[j].schoolName==undefined){
              inventors[j].schoolName=null;
            }

            if(inventors[j].instituteId==null||inventors[j].instituteId==""){
                inventors[j].instituteId=0;
            }

            if(inventors[j].instituteName==""||inventors[j].instituteName==undefined){
              inventors[j].instituteName=null;
             }

            if(inventors[j].departmentId==null||inventors[j].departmentId==""){
                inventors[j].departmentId=0;
            }

            if(inventors[j].departmentName==""||inventors[j].departmentName==undefined){
              inventors[j].departmentName=null;
             }

            if(inventors[j].aliasUserId==null||inventors[j].aliasUserId==""){
              inventors[j].aliasUserId=0;
            }

            inventors[j].patentInventorSeqNoUI= inventors[j].tempId+1;

            if (inventors[j].patentInventorSeqNoDB === undefined) {
              inventors[j].patentInventorSeqNoDB = 0;
            }

              delete inventors[j].correspondingauthor;
              delete inventors[j].enableAway;
              delete inventors[j].enableHome;
              delete inventors[j].enableAppAway;
              delete inventors[j].enableAppHome;    
              delete inventors[j].schoolEnable;
              delete inventors[j].tempId;
              delete inventors[j].patentApplicantMapId;
              delete inventors[j].patentApplicantSeq;
              delete inventors[j].linkName;
              delete inventors[j].isHomeUniversity;
              delete inventors[j].linkUnivName;
          }

          const data = {
            dfsrfsPatent: this.dfsPublication,
            dfsrfsPatentInventors: inventors, 
            dfsrfsPatentApplicants: this.tempAppUsers
          };
 
          console.log(data);
          if(this.hideApplicant==true){
              this.sameInvApp=1;
          }

          if (inventors.length > 0) {
            this.facService.savePatentDFS(data, this.user.UserId, this.roleId, null,this.sameInvApp,this.entryType).subscribe(x => {
              const confirmation = confirm('Details Saved Successfully');
              if (confirmation) {
                if (this.roleId == '12') {
                  this.router.navigate(['/cisupportadmin']);
                }
                else {
                  const id = localStorage.getItem("universityId");
                  this.router.navigate(['/clientadmin/universitySelect/RFS/'+id]);
                 }
                }
               },
                (error) => {
                  console.error(error);
                  alert("Failed to Add details. Please check.");
                    // location.reload();
                    this.tempusers=[];
                    this.tempAppUsers=[];
                    this.hideApplicant=false;
                    this.enableCheckBox=false;
                });
              }
              else{
                alert("Need to add atleast one inventor before submit")
              }
          }

              prepareDfsPublication() {
                const pub = this.dfsPublication;
                pub.patentId=this.patId;
                pub.applicationNumber=this.dfsPublication.applicationNumber;
                pub.patentNumber=this.dfsPublication.patentNumber;
                pub.patentTitle=this.dfsPublication.patentTitle;
                pub.inventors=this.dfsPublication.inventors;
                pub.applicants=this.dfsPublication.applicants;
                pub.filingDate=this.dfsPublication.filingDate;
                pub.publishedDate=this.dfsPublication.publishedDate === "" ? null : this.dfsPublication.publishedDate;
                pub.examinationDate=this.dfsPublication.examinationDate === "" ? null : this.dfsPublication.examinationDate;
                pub.ferIssuedDate=this.dfsPublication.ferIssuedDate === "" ? null : this.dfsPublication.ferIssuedDate;
                pub.ferReplyDate=this.dfsPublication.ferReplyDate === "" ? null : this.dfsPublication.ferReplyDate;
                pub.hearingNoticeDate=this.dfsPublication.hearingNoticeDate === "" ? null : this.dfsPublication.hearingNoticeDate;
                pub.grantDate=this.dfsPublication.grantDate === "" ? null : this.dfsPublication.grantDate;
                pub.patentStageId=this.dfsPublication.patentStageId;
                pub.patentStageName=this.dfsPublication.patentStageName;
                pub.patentStatusId=this.dfsPublication.patentStatusId;
                pub.patentStatusName=this.dfsPublication.patentStatusName;
                pub.patentOfficeId=this.dfsPublication.patentOfficeId;
                pub.patentOfficeName=this.dfsPublication.patentOfficeName;
                pub.patentCountryId=0;
                pub.correspondance=this.dfsPublication.correspondance??"";
                pub.domain=this.dfsPublication.domain;
                pub.abstract=this.dfsPublication.abstract;
                pub.srcUniversityId=parseInt(this.universityparamId);
                pub.patentDomainId=this.dfsPublication.patentDomainId;
                pub.patentDomainName=this.dfsPublication.patentDomainName;
                return pub;
              }

        prepareInventors() {
          return this.tempusers.map(user => {
            return {
              ...user,
              aliasUserUniversityId: user.aliasUserUniversityId ? parseInt(user.aliasUserUniversityId) : null,
              correspondingAuthor: user.correspondingAuthor === 1 ? 1 : 0,
              correspondingEmail: user.correspondingEmail || null,
              schoolId: user.schoolId || 0,
              schoolName: user.schoolName || null,
              departmentId: user.departmentId || 0,
              locationId: user.locationId || 0,
              instituteId: user.instituteId || 0,
              stateId: user.stateId ? parseInt(user.stateId) : 0,
              stateName: user.stateName || null,
              aliasUserId: user.aliasUserId || 0
             };
           });
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

          onDropApp(event: CdkDragDrop<string[]>){
            moveItemInArray(this.tempAppUsers, event.previousIndex, event.currentIndex);
            for(let i=0;i<this.tempAppUsers.length;i++){
               this.tempAppUsers[i].tempId=i;
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

            if(this.feeders[0].PatentAplicntInvntrTypeId==""){
              alert("Please select Type before Add")
              return;
            }

              if(val=="away"){
                this.feeders[0].enableAway=true;
                this.feeders[0].enableHome=false;
                this.feeders[0].isHomeUniversity=0;
              }
              else if(val=="home"){
                this.feeders[0].enableAway=false;
                this.feeders[0].enableHome=true;
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
              this.linkAuthorAllowedText=2;
              this.allowedAuthorText=2;   
              this.enableEdit=false;

            }

            addNewApplicantDetails(val: 'home' | 'away') {

              if(this.applicantFeeders[0].PatentAplicntInvntrTypeId==""){
                alert("Please select Type before Add")
              return;
            }

              if (val === 'away') {
                this.applicantFeeders[0].enableAppAway = true;
                this.applicantFeeders[0].enableAppHome = false;
                this.applicantFeeders[0].isHomeUniversity=0;
              }
               else if (val === 'home') {
                this.applicantFeeders[0].enableAppAway = false;
                this.applicantFeeders[0].enableAppHome = true;
                this.applicantFeeders[0].isHomeUniversity=1;
              }

              if(this.applicantFeeders[0].aliasUserUniversityId==""){
                this.applicantFeeders[0].aliasUserUniversityId=="0";
              }
            
              if (!this.enableAppEdit) {
                this.applicantFeeders[0].tempId = this.tempAppUsers.length;
                this.tempAppUsers.push(this.applicantFeeders[0]);
              } else {
                this.tempAppUsers.splice(this.applicantFeeders[0].tempId, 0, this.applicantFeeders[0]);
              }
            
              // Reset
              this.applicantFeeders = [];
              this.enableAppAway = false;
              this.enableAppHome = false;
              this.enableAppEdit = false;
              this.editRowId = null;
            }   

            newEdit(val,desc){

              this.feeders=[];
              const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
                console.log(val);
                this.editRowId = val;
                this.enableEdit=true;
                if(desc === 'Inventors'){
                targetArray.push(this.tempusers[val]);
                }
                else{
                  targetArray.push(this.tempAppUsers[val]);
                }
                
                if(targetArray[0].isHomeUniversity==1){
                    if(desc === 'Inventors'){
                      this.enableHome=true;
                      this.enableAway=false;
                    }
                    else{
                      this.enableAppAway=false;
                      this.enableAppHome=true;
                    }

                    this.universityIP=targetArray[0].universityId;

                    this.facService.getUnivLocSchInstDept(targetArray[0].universityId, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
                      this.filteredList = x;
                      console.log(this.filteredList);
                      
                      if (this.filteredList.length > 0) {
                        this.uniqCountry= Array.from(new Set(this.filteredList.map(item => item.countryName)));
                        this.uniqState= Array.from(new Set(this.filteredList.map(item => item.stateName)));
                        this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
                        this.layerSchool=Array.from(new Set(this.filteredList.map((item : any)=>item.schoolName)));
                        this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
                        this.layerDept=Array.from(new Set(this.filteredList.map((item : any)=>item.departmentName)));
                      }
                    });
                }
                else{

                  this.facService.getAvailableState(targetArray[0].countryId).subscribe(x=>{
                    this.filteredState=x;
                    });
      
                    this.facService.getAvailableLocation(targetArray[0].countryId,targetArray[0].stateId).subscribe((x:any)=>{
                      this.filterLocation=x;
                      // this.uniqueLocationNamesAway=x.map(item => item.locationName);        
                    });
                  if(desc === 'Inventors'){
                      this.enableHome=false;
                      this.enableAway=true;
                  }
                  else{
                    this.enableAppAway=true;
                    this.enableAppHome=false;
                  }
                }
                if(desc === 'Inventors'){
                  this.tempusers.splice(val, 1)
                }
                else{
                  this.tempAppUsers.splice(val,1)
                }
                
                console.log(targetArray);
                
            }

            checkNotCorrect(model:any){
              this.modalService.open(model);
            }

            updateRemark(){
              this.modalService.dismissAll();
              this.isCorrect=1;
              // this.enableaddNew=true;
            }

            clearDetails(desc,val){

              const targetArray=[{
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
                "correspondingEmail": null,
                "correspondingAuthor": null,
                "aliasUserId": 0,
                "patentInventorMapId": 0,
                "patentInventorSeq": 0,
                "PatentAplicntInvntrTypeId":"",
                "tempId":desc=='Inventors'?this.feeders[val].tempId:this.applicantFeeders[val].tempId
                }];
      
                if (desc === 'Inventors') {
                  this.feeders = targetArray;
                } else {
                  this.applicantFeeders = targetArray;
                }
               
            }

          homeUniv(desc){
          const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;

          targetArray[0].universityId=this.sourceUnivId;
          this.universityIP=parseInt(this.sourceUnivId);    
          targetArray[0].universityName=this.showUnivName;
          this.facService.getUnivLocSchInstDept(this.universityIP, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
            this.filteredList = x;
            if (this.filteredList.length > 0) {
              this.uniqCountry= Array.from(new Set(this.filteredList.map(item => item.countryName)));
              console.log(this.uniqCountry);
              this.uniqState= Array.from(new Set(this.filteredList.map(item => item.stateName)));
              this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
              // this.layerSchool=Array.from(new Set(this.filteredList.map((item : any)=>item.schoolName)));
              // this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
            }
          });

          }


          editDetailsHome(val,desc,universityId){
          if(desc == 'Inventors'){
            this.editRowId = val;
          }else{
            this.editRowId = val;
          }
          this.facService.getUnivLocSchInstDept(universityId, this.roleId, this.user.UserId,null,null,null,null).subscribe(x => {
            this.filteredList = x;
            if (this.filteredList.length > 0) {
              this.uniqCountry= Array.from(new Set(this.filteredList.map(item => item.countryName)));
              this.uniqState= Array.from(new Set(this.filteredList.map(item => item.stateName)));
              this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName)));
              this.layerSchool=Array.from(new Set(this.filteredList.map((item : any)=>item.schoolName)));
              this.layerIns=Array.from(new Set(this.filteredList.map((item : any)=>item.instituteName)));
              this.layerDept=Array.from(new Set(this.filteredList.map((item : any)=>item.departmentName)));
             }
            });
          }

          editDetails(val,desc,countryId,stateId,stateName){

          if(desc == 'Inventors'){
            this.editRowId = val;
            this.feeders[val].stateName=stateName;
          }else{
            this.editRowId = val;
            this.applicantFeeders[val].stateName=stateName;
           }
          }  

          // For away author
          addAwayAuthor(val){
          if(val == "Inventors"){
            this.enableAway=true;
            this.enableHome=false;
            this.editRowId = true;
            this.addAuthAwayOrHome();
          }else {
            console.log("Applicants 'away' clicked to add new applicants");
            this.enableAppAway=true;
            this.enableAppHome=false;
            this.editRowId = true;
            this.addAppAwayOrHome();
          }
          }

          addAuthAwayOrHome(){

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
              correspondingAuthor: this.authForm.value.correspondingAuthor,
              aliasUserId: this.authForm.value.aliasUserId,
              aliasUserUniversityId: this.authForm.value.aliasUserUniversityId,
              patentInventorMapId: this.authForm.value.patentInventorMapId,
              patentInventorSeq: this.authForm.value.patentInventorSeq,
              isUserAddressSame:this.authForm.value.isUserAddressSame,
              PatentAplicntInvntrTypeId:""
            };
            if(this.feeders.length<1){
              this.feeders.push(newFeeder);
              // Reset form fields
              this.authForm.reset();
              console.log(this.feeders);
            }
            else if(this.feeders.length==1){
              this.feeders[0] = { ...newFeeder };
            }

          }

          addAppAwayOrHome() {

            const newFeeder = {
              universityId: this.appForm.value.universityId,
              universityName: this.appForm.value.universityName,
              userId: this.appForm.value.userId,
              fullName: this.appForm.value.fullName,
              countryId: this.appForm.value.countryId,
              countryName: this.appForm.value.countryName,
              stateId: this.appForm.value.stateId,
              stateName: this.appForm.value.stateName,
              locationId: this.appForm.value.locationId,
              locationName: this.appForm.value.locationName,
              schoolId: this.appForm.value.schoolId,
              schoolName: this.appForm.value.schoolName,
              instituteId: this.appForm.value.instituteId,
              instituteName: this.appForm.value.instituteName,
              departmentId: this.appForm.value.departmentid,
              departmentName: this.appForm.value.departmentName,
              correspondingEmail: this.appForm.value.correspondingEmail,
              correspondingAuthor: this.appForm.value.correspondingAuthor,
              aliasUserId: this.appForm.value.aliasUserId,
              aliasUserUniversityId: this.appForm.value.aliasUserUniversityId,
              patentApplicantMapId: this.appForm.value.patentInventorMapId,
              patentApplicantSeq: this.appForm.value.patentInventorSeq,
              isUserAddressSame:this.appForm.value.isUserAddressSame,
              PatentAplicntInvntrTypeId: ""
            };

            if (this.applicantFeeders.length < 1) {
              this.applicantFeeders.push(newFeeder);
              this.appForm.reset();
              console.log(this.applicantFeeders);
            } else if (this.applicantFeeders.length === 1) {
              this.applicantFeeders[0] = { ...newFeeder };
            }

          }


          //fetch data based on away university
          onKeyIPAway(x, val, data, desc) {
            const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
            this.ipDropdown = true;
            this.checkData = data;
            this.fillNonCus = this.nonCusUnivList.filter(e =>
              e.universityName.toLowerCase().includes(val.toLowerCase())
            );
            if(this.fillNonCus.length==0){
              this.ipDropdown = false;
              targetArray[data].universityId=0;
              this.universityIP=0;
            }
          }

          onInputAway(item: string, id: number, val,desc){
            this.facService.getLayerType(id, this.roleId, this.user.UserId).subscribe(data => {
              this.newfeed = data;
              this.filterdata = this.newfeed.layerType;
              if(this.filterdata=="4LType1"||this.filterdata=="4LType2"||this.filterdata=="3LType3"){
                this.filterschool = true;
              }
              else{
                this.filterschool=false;
              }
              const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
              targetArray[val].schoolEnable = this.filterschool;
              targetArray[val].universityName = item;
              targetArray[val].universityId = id;
              this.ipDropdown = false;
              this.universityIP = id;
          });
          }

          //get values based on university and author
          SearchIPDataAway(text: string, val, author,desc) {
              const targetArray = desc === 'Inventors' ? this.feeders : this.applicantFeeders;
              this.toggle(author);
              targetArray[author].fullName = val;
              targetArray[author].userId = 0;
              targetArray[author].countryName="";
              targetArray[author].stateName="";
              targetArray[author].locationName="";
              targetArray[author].schoolName="";
              targetArray[author].instituteName="";
              targetArray[author].departmentName="";
              targetArray[author].correspondingAuthor=false;
              if(targetArray[author].aliasUserId!=null||targetArray[author].aliasUserId!=""){
              }
              else{
                targetArray[author].aliasUserId=0;
              }
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

          onCalendarShown(index: number) {
            this.openPickerIndex = index;
          }

          onCalendarHidden() {
            this.openPickerIndex = -1;
          }

          addInventorAsApplicant(val){
            
                if(val==true){

                      if (this.tempusers.length === 1) {
                        const filterTempUsers = this.filterUsers();
                        if (this.tempAppUsers.length === 0) {
                          const inventors = this.UserApplicantUpdate([this.tempusers[0]]);
                          this.tempAppUsers.push(...inventors);
                          this.hideApplicant=true;
                        } else {
                          const inventors = this.UserApplicantUpdate(filterTempUsers);
                          if (inventors.length === 0) {
                            alert("This Inventor detail is already there in the applicant");
                          } else {
                            this.tempAppUsers.push(...inventors);
                            this.hideApplicant=true;
                          }
                        }
                      } else if (this.tempusers.length > 1) {
                        const filterTempUsers = this.filterUsers();
                        const inventors = this.UserApplicantUpdate(filterTempUsers);
                        if (inventors.length === 0) {
                          alert("This Inventor detail is already there in the applicant");
                        } else {
                          this.tempAppUsers.push(...inventors);
                          this.hideApplicant=true;
                        }
                      } else {
                        alert("Inventors list is empty! You can't apply same Applicant");
                      }
                  }
                  else{
                    this.tempAppUsers=[];
                    this.hideApplicant=false;
                    }
              
          }

          filterUsers(){
            let filterTempUsers = this.tempusers.filter(user => {
              return !this.tempAppUsers.some(appUser =>
                user.universityName === appUser.universityName &&
                user.fullName === appUser.fullName && 
                user.locationName == appUser.locationName &&
                user.stateName == appUser.stateName &&
                user.schoolName == appUser.schoolName &&
                user.instituteName == appUser.instituteName &&
                user.departmentName == appUser.departmentName &&
                user.correspondingEmail === appUser.correspondingEmail
              );
            });
            return filterTempUsers;
          }

          UserApplicantUpdate(filterTempUsers){
            const formattedUsers = filterTempUsers.map(user => {
              const newUser = { ...user };      
              newUser.enableAppHome = newUser.enableHome;
              newUser.enableAppAway = newUser.enableAway;
            
              delete newUser.enableHome;
              delete newUser.enableAway;  
              return newUser;
            });
            return formattedUsers;
          }

        changeFilDt(val){
          console.log(val);
          
          let tempPFilDt=this.formatDate(val);
          this.dfsPublication.filingDate=val;
          this.tempFilDt=tempPFilDt;
          console.log(tempPFilDt);
          
        }

        changePubDt(val){
          let tempPubDt=this.formatDate(val);
          this.dfsPublication.publishedDate=val;
          this.tempPubDt=tempPubDt;
          console.log(tempPubDt);
          const date1 = new Date(tempPubDt);
          const date2 = new Date( this.tempFilDt);
          if(date1>date2){
            this.dfsPublication.publishedDate=val;
          }
          else{
            alert("Published Date to be greater than Filing Date")
          this.pubDtTemp=null
          }
        
        }

        changeReqDt(val){
          let tempreqDt=this.formatDate(val);
          console.log(tempreqDt);
          this.dfsPublication.examinationDate=tempreqDt;
        }

        changeFerIssDt(val){
          // let tempFerIssDt=this.formatDate(val);
          // console.log(tempFerIssDt);
          this.dfsPublication.ferIssuedDate=val;
        }

        changeRplDt(val){
          // let tempRplDt=this.formatDate(val);
          // console.log(tempRplDt);   
          this.dfsPublication.ferReplyDate=val;
        }

        changeHerDt(val){
          // let tempHerDt=this.formatDate(val);
          // console.log(tempHerDt);
          this.dfsPublication.hearingNoticeDate=val;
        }

        changeGranDt(val){
          // let tempGranDt=this.formatDate(val);
          // console.log(tempGranDt); 
          this.dfsPublication.grantDate=val;
        }

        initialFormatDt(input: string): string{
          return input.split("T")[0];
        }

      formatDate(input: string): string {
            const date = new Date(input);
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const day = String(date.getUTCDate()).padStart(2, '0');
            const formatted = `${day}/${month}/${year} 00:00:00`;
            return formatted;
      }

        changetype(val){
          console.log(val);
          let filterCountry=this.patCountryList.filter(x=>x.value==val);
          this.dfsPublication.patentOfficeId=filterCountry[0].id;
        }

        changeDomain(val){
          let filterDomain = this.domainList.filter(x=>x.value==val);
          this.dfsPublication.patentDomainId=filterDomain[0].id;
        }

      changeAppStatus(val){
        let filterStatus = this.appStatusList.filter(x => x.applicationStatus==val);
        this.dfsPublication.patentStatusId=filterStatus[0].applicationStatusId;
        this.dfsPublication.patentStageId=filterStatus[0].patentStageId;
        this.dfsPublication.patentStageName=filterStatus[0].patentStage;
      }

        @ViewChild('appNo') appNo!: NgModel;
        @ViewChild('patNo') patNo!: NgModel;
        @ViewChild('ofzCode') ofzCode!: NgModel;
        @ViewChild('titleInv') titleInv!: NgModel;
        @ViewChild('appStatus') appStatus!: NgModel;
        @ViewChild('filingDt') filingDt!: NgModel;
 
        markTouchedIfEmpty() {
          // If the field is empty and untouched, mark it as touched
          if (!this.dfsPublication.applicationNumber && this.appNo && !this.appNo.touched) {
            this.appNo.control.markAsTouched();
          }
          if (!this.dfsPublication.patentOfficeId && this.ofzCode && !this.ofzCode.touched) {
            this.ofzCode.control.markAsTouched();
          }
          if (!this.dfsPublication.patentTitle && this.titleInv && !this.titleInv.touched) {
            this.titleInv.control.markAsTouched();
          }
          if (!this.dfsPublication.patentStatusId && this.appStatus && !this.appStatus.touched) {
            this.appStatus.control.markAsTouched();
          }
          if (!this.filingDtTemp && this.filingDt && !this.filingDt.touched) {
            this.filingDt.control.markAsTouched();
          }
        }


}

