import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { Component, ElementRef, HostListener, Input, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FacultiesService } from '../faculties.service'
import { environment } from 'src/environments/environment';
import { MenuService } from 'src/app/shared/services/menu.service';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { isPlatformBrowser } from '@angular/common';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import{Publication} from './publication';
import { AdminclientService } from '../../adminclient/adminclient.service';
import { NumberToWordsService } from 'src/app/shared/services/numbertorupees.service';
import {ProjectBasicDetail, ProjectDetails} from '../../../shared/model/projectPayload.model';
import { GeneralApiService } from '../../general-api.service';
@Component({
  selector: '',
  templateUrl: './faculties-detail.components.html',
  styleUrls: ['./../../../../assets/given/selected.css', './../../../../assets/given/css/style-vit1.css', './../../../../assets/given/css/style-vit2.css', './../../../../assets/given/newcss/style.css', './../../../../assets/given/newcss/bootstrap.min.css'],
})
export class FacultiesDetailComponent implements OnInit {
  backbuttonflag: any = 1
  readonly DEFAULT_SLICE_OPACITY: number = 1;
  readonly DEFAULT_ANIMATION_START_ANGLE: number = -90;
  readonly DEFAULT_ANIMATION_END_ANGLE: number = -90;
  private chart: am4charts.XYChart;
  private modalRef: import("@ng-bootstrap/ng-bootstrap").NgbModalRef | null = null;
  currentFs: any;
  nextFs: any;
  previousFs: any;
  opacity: any;
  progressBarItems: any[];
  pubSourceName: string = "";
  userValues: any;
  customShareText: string;
  filteredItems: any;
  isScrolled = false;
  marginTop = '0px';
  ipAddress: string;
  selectedTab: string;
  selectedTabPatent:string;
  hideUser: boolean = false;
  userIP: any;
  isMenuOpen: boolean = false;
  validation: boolean = false;
  editRow: any;
  editshare: any;
  verify: boolean = false;
  message: string;
  enableDelete: boolean = false;
  fullUrl: string;
  navbar: any;
  sticky: any;
  platformId: Object;
  DEFAULT_SLICE_STROKE_WIDTH: number;
  checkValue: any;
  popupAlert: string;
  pdfPostName: string | null = null;
  universityName: any;
  userid: any;
  pubID: any;
  ordervalueEditPub:any;
  ordervalue: any;
  ordervaluePatent:any;
  ordervalueProject:any;
  ordervalueCpy:any;
  yearorder: any;
  yearorderEditPub:any;
  universityShortName: string;
  pdfStatus: boolean = false;
  patpdfStatus: boolean =false;s
  enablePic: boolean=false;
  project: boolean=true;
  enableCopyright: boolean=false;
  displayuser: any;
  publevel:Publication| null = null;
  filtercrosschart: any;
  data: any;
  pdfconfirmation: boolean=false;
  selectfilepath: any;
  pubidlevel: any;
  pubdropid: any;
  university: any;
  filetypename: any;
  countryCode:any;
  manualCountryCode:any;
  dataList: any;
  isDropdownOpen: any;
  ordervaluedesignPatent: any;
  constructor(private route: ActivatedRoute, private service: FacultiesService, private modalService: NgbModal, private gservice:GeneralApiService,
    private menuService: MenuService, private search: CommonsearchService, private http: HttpClient,private numtoWords:NumberToWordsService,
    private routes: Router, private authservice: AuthService, private zone: NgZone,private clientservice: AdminclientService,
    private renderer: Renderer2, private el: ElementRef) {

  }
  expandedItems: any[] = [];
  opendropBoxEnable:boolean=false;
  opendropBoxEnablePub:boolean=false;
  crossRefValues: any;
  pubrecord: any[] = [];
  filterTitle: any;
  faculty: any;
  pubdetails: any;
  docCount: any;
  searchData: string = "";
  researchDrop:boolean=false;
  articlecount: any;
  imageSrc: any;
  articleUrl: any;
  orderSort = ['Ascending', 'Descending'];
  ascendValue = 'Descending';
  ascendValueEditPub= 'Descending';
  ascendValueProj= 'Descending';
  ascendValueCpy='Descending';
  ascendValueTm='Descending';
  yearSort = ['Year', 'Month', 'Day']
  yearValue = 'Year';
  page: number = 1;
  pageEditPub: number =1;
  pageProj: number =1;
  queueId: Number = 0;
  pageSize = 20;
  pageSizeEditPub = 20;
  pageSizecountEditPub = ["10", "20", "30", "40"];
  pageSizecount = ["10", "20", "30", "40"];
  pageSizecountPat = ["10", "20", "30", "40"];
  pageSizecountdesignPat = ["10", "20", "30", "40"];
  pageSizePat=20;
  pageSizedesignPat=20;
  pageSizeCpy=20;
  pageSizeProj=20;
  pagePat:number=1;
  pagedesignPat:number=1;
  pageCpy:number=1;
  collapsablesize: any;
  collapsablesizePat:any;
  collapsablesizedesignPat:any;
  collapsablesizeEditPub:any;
  collapsablesizeProj:any;
  collapsablesizeTm:any;
  collapsablesizeCpy:any;
  searchFilter: string;
  filterValue: string;
  showModal = false;
  showShare = false;
  showIcons: any;
  authoraffiliation: any;
  reverse = false;
  datasample: any;
  affiliationrecord
  isCollapsed = true;
  values: string;
  order: any;
  orderEditPub:any;
  readOnly: boolean = false;
  enableProjectNum:boolean = false;
  noDOI: boolean = false;
  rfsId: any;
  newTag: string = '';
  researchArea:string;
  tags = [];
  tech: any;
  rows = [];
  row = [];
  designpatentdetails: any;
  facultyimages: string[] = [
    'https://researgence.ai/univ-assets/cssimage/facultyimage/ISC001.jpg', 
    'https://researgence.ai/univ-assets/cssimage/facultyimage/ISC002.jpg', 
    'https://researgence.ai/univ-assets/cssimage/facultyimage/ISC003.jpg', 
    'https://researgence.ai/univ-assets/cssimage/facultyimage/ISC004.jpg', 
    'https://researgence.ai/univ-assets/cssimage/facultyimage/ISC005.jpg',
  ]
  imageToShow = ['ISC001', 'ISC002', 'ISC003', 'ISC004', 'ISC005'];
  techarea: any;
  sortitems: any;
  sortitemsEditPub:any;
  showDropdown = false;
  name = [];
  userDetail: any;
  roleId: Number;
  researchname:any;
  researchList:any;
  //add new
  enableBox: boolean = false;
  EnableDoi: boolean = false;
  enableAdd: boolean = false;
  enableUnmatch: boolean = false;
  enableChart: boolean = true;
  enableChartTM:boolean = false;
  enableChartPat:boolean = false;
  enableChartCpy:boolean= false;
  enableChartEditedPub:boolean = false;
  enableChartdesignPat:boolean=false;
  rfsDone: boolean = false;
  messageValue: boolean = false;
  //validate
  openvalidate: boolean = false;
  validateapprove: boolean = false;
  validateyesno: boolean = false;
  validatedone: boolean = false;
  validatedeny: boolean = false;
  done: boolean = false;
  crossTitle: string;
  crossSourceName: string;
  publicationId: Number = 0;
  sourceId: Number = 0;
  type: string;
  publicationTitle: string;
  doi: string;
  webLink: string;
  pdfEnable: boolean = false;
  showData: boolean = false
  slno: any;
  //citation
  opencitation: boolean = false;
  opencontent: boolean = false;
  titleEnable: boolean = false;
  checkDTtitle: any;
  role: any;
  Name: string | null = null;
  roleName: string;
  pubCount: any;
  totalPages: number;
  totalPagesEditPub:number;
  totalPagesPat:number;
  totalPagesdesignPat:number;
  totalPagesProj:number;
  totalPagesCpy:number;
  startrow: number = 0;
  endrow: number = 20;
  endrowProj:number =20;
  endrowdesignPat:number=20;
  endrowCpy:number =20;
  startrowProj:number=0;
  startrowEditPub:number=0;
  endrowEditPub:number=20;
  startrowPat:number=0;
  startrowdesignPat:number=0;
  startrowCpy:number=0;
  endrowPat:number=20;
  viewarticle: any;
  userIdparam: any;
  updateview: any;
  pageview: boolean = false;
  pageviewProj:boolean = false;
  views: any;
  selectedView: string = 'compact';
  selectedViewPatent:string= 'compact';
  selectedViewProject:string = 'compact';
  selectedViewCpyRight:string = 'compact';
  selectedViewTM:string= 'compact';
  publication:boolean=false;
  patent:boolean=false;
  designpatent:boolean=false
  enableEditedPub:boolean=false;
  hoverMessage: string = '';
  patentList:any;
  cpyRightList:any;
  enableModule:string;
  subscribtionList:any;
  enableScore:boolean=false;
  requesturl: string; 
  searchQuery:string;
  checkRole:string;
  enableProjectNew:boolean=false;
  enbleAddNew:boolean=false;
  enablePatentBox:boolean=false;
  enablePatentAdd:boolean=false;
  enablePatentNum:boolean=false;
  searchPatentAppNum:string="";
  patCountryList:any;
  patPdfPath:any;
  patAppNo:any;
  patTitle:any;
  patPubEnable:any;
  patPubIndEnable:any;
  patentData:any;
  enablepatData:boolean=false;
  patSubmitEnable:boolean=false;
  patentId:number=0;
  patpdfPostName:string | null =null;
  patpdfLocation:string | null =null;
  patentOfficeId:string| null =null;
  checkPatAvailability:any;
  enableMessage:boolean=false;
  moduleList:any;
  editedPubList:any;
  projList:any;
  universityFilter: any;
  fill: any[];

  // Trademark
  trademarkTabenable:boolean=false;
  tradeList:any;
  ordervalueTM:any;
  totalPagesTm:number;
  pageTm:number=1;
  startrowTm:number=0;
  endrowTm:number=20;
  pageSizeTm=20;
  pageviewTM:boolean=false;

  // Project Add Details
  projectPayload:ProjectDetails;
  projectBasicDl:ProjectBasicDetail;
  amount: any = '';
  projectStatusList:any;
  projectFundingType:any;
  projectFundingAgency:any;
  projectFundingAgencyType:any;
  projectPdfPath:any;
  fileProj: File | null = null;
  projectPdfName: string | null = null;
  projectpdfStatus:boolean=false;
  projectpdfPostName:string | null =null;
  projectpdfLocation:string | null =null;
  projectSubmitEnable:boolean = false;
  checkProjectTitle:any;
  enableProjectUniv:boolean = false;
  titleEnableProject:boolean=false;
  projectUnivId:any;
  searchUnivProj: string = "";
  enableProjectAdd:boolean=false;

  ngOnInit() {
    
      //for accessing menuopen 
      this.menuService.isMenuOpen$.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
    });
    
    this.articleUrl = 'article/art/';
    this.requesturl='/facultyProfiles/Support/MyRequests';
    this.selectedTab = 'apa';
    this.selectedTabPatent='apa'
    this.userDetail = this.authservice.getUserDetail();
    console.log(this.userDetail);
    this.universityName = this.userDetail.University;
    this.roleId = this.authservice.getProfileObs();
    this.checkRole=localStorage.getItem("setFaculty");
    console.log(localStorage.getItem("setFaculty"));
    
    this.universityShortName = this.userDetail.UniversityShortName;
    this.Name = this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    // this.authservice.RoleSelection(this.userDetail.UniversityId, this.userDetail.UserId).subscribe(x => {
      this.role = JSON.parse(localStorage.getItem('RoleSelection'));
      const dataRole = this.role.filter(item => item.roleId == this.roleId);
      this.roleName = dataRole[0].roleName;
    // });

    const data = JSON.parse(localStorage.getItem('UnivSubcripModuleConsolidated'));
    this.subscribtionList=data.univSubscriptionModuleCheck;
    // this.service.getUnivSubscriptionModule(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId).subscribe(x=>{
        
        const subList=this.subscribtionList.filter(x=>x.subscriptionModule=="Scorebook");
        console.log(subList);
        if(subList.length>0){
           this.enableScore=true;
        }
        else{
          this.enableScore=false;
        }
        
    // })

    this.route.params.subscribe(params => {
      //Profile API
      this.userIdparam = params.id;

      if(this.roleId==17){
        this.enbleAddNew=true;
      }
      else if(this.roleId==2||this.roleId==18){
           if(this.userIdparam === this.userDetail.UserId){
            this.enbleAddNew=true;
           }
      }
      this.service.GetBasicProfile(this.userDetail.UniversityId, this.userIdparam,this.roleId,this.userDetail.UserId).subscribe((x: HttpResponse<any>)  => {
          console.log(x);
          if (x.status === 200) {
            this.faculty = x.body;
            console.log(x.status);
            
          } else {
            
          }  
          
          this.university= this.faculty.universityId;
          this.userid = this.faculty.userid;
             
          //For Faculty
          if (this.imageToShow.find(x => x == this.faculty.empid)) {
            this.imageSrc = this.facultyimages;
          } 
          else if(this.faculty.profileFileName!=null){
            // this.faculty.profileFileName=this.faculty.profileFileName.split('.');
            // console.log(Sample);
            
            const imageUrl = `${environment.nodeServerUrl}/getImage?userImage=${this.faculty.profileFileName}`;
            console.log(imageUrl);
            this.http.get(imageUrl, { responseType: 'text' }).subscribe(
              (response) => {
                this.imageSrc = imageUrl; // Update the imgUrl with the fetched image URL
                console.log('Fetched Image:', imageUrl);
              },
              (error) => {
                console.error('Error fetching Image:', error);
                this.imageSrc = "assets/images/user/default.png";
              });
          }
          else{
                this.imageSrc="assets/images/user/default.png"; 
          }
        }, (error) => {
          this.enablePic = false; // Set enablePic to true in case of an error
        });
        console.log(this.enablePic);
        this.GetPublication();
      //document Api
      this.service.GetResearcherDocumentCounts(this.userDetail.UniversityId, this.userIdparam,this.roleId,this.userDetail.UserId).subscribe(x => {
        this.docCount = x;
        this.service.getUnivCheckModule(this.userDetail.UniversityId).subscribe(t=>{  
          this.moduleList=t;
          if(this.docCount.length>0&&this.moduleList.length>0){
            for(let i=0;i<this.docCount.length;i++){
          
                  for(let j=0;j<this.moduleList.length;j++){
                       if(this.docCount[i].module==this.moduleList[j].moduleName){
                          this.docCount[i].enableModule=this.moduleList[j].isApplicable
                       }
                    }
                }
              }
              this.displayuser=this.docCount.filter( item => item.enableModule == 'True');
              console.log(this.displayuser);
           });       
        })
    });
 
    this.navbar = this.el.nativeElement.querySelector('#profile-sticky-nav');
    this.sticky = this.navbar.offsetTop;

    this.clientservice.GetUniversity(this.userDetail.UserId,this.roleId).subscribe(data => {
            this.universityFilter = data;
    });
   
  }

  GetPublication() {

    //Publication API

    this.service.researcherPublicationDetails(this.userDetail.UniversityId, this.userIdparam,this.roleId,this.userDetail.UserId).subscribe
      ((x:HttpResponse<any>) => {
        if (x.status === 200) {
          this.pubdetails = x.body;
          this.enablePic = true;
        } else {
          this.enablePic = false;  
        }
        
        this.pubdetails = x.body;
        this.filteredItems = this.pubdetails;
        this.pubCount = this.pubdetails.length;
        this.collapsablesize = this.pubdetails.length;
        this.totalPages = Math.ceil(this.collapsablesize / this.pageSize);
        // Adjust Mpage to prevent it from exceeding totalpages
        this.page = Math.max(1, Math.min(this.page, this.totalPages));
        // Calculate the actual startRow and endRow based on Mpage and pageSize
        this.startrow = (this.page - 1) * this.pageSize;
        this.endrow = Math.min(this.startrow + this.pageSize, this.collapsablesize);
        // Update the values used in the <h6> tag
        this.page = this.page;

        for (let i = 0; i < this.pubdetails.length; i++) {
          if(this.pubdetails[i].link!=null){
           if(this.pubdetails[i].link.length>100){
            this.pubdetails[i].link=[this.pubdetails[i].link.slice(0, 100), " ", this.pubdetails[i].link.slice(100)].join('');
           }
          }
           
          if (this.pubdetails[i].articleType != null) {
            this.pubdetails[i].articleType = this.pubdetails[i].articleType.toLowerCase();
            if(this.pubdetails[i].articleType=="book chapter"){
              this.pubdetails[i].articleType=this.pubdetails[i].articleType.replace(/\s/g, "");
            }
          }

          if (this.pubdetails[i].technology_Areas != null) {
            this.pubdetails[i].technology_Areas = this.pubdetails[i].technology_Areas.split(';');
          }
          if (this.pubdetails[i].publicationSourceDBMetrics != null) {
            this.pubdetails[i].publicationSourceDBMetrics = this.pubdetails[i].publicationSourceDBMetrics.split(';');
          }
          if (this.pubdetails[i].publicationDBCitation != null) {
            const publicationDBCitation = this.pubdetails[i].publicationDBCitation.split(';');

            this.pubdetails[i].publicationDBCitation = publicationDBCitation.map(item => {
              const [name, value] = item.split(':');
              return { name, value };
            });

            // Assigning variable for showing values dynamically in honeycomp
            for (let t = 0; t < this.pubdetails[i].publicationDBCitation.length; t++) {

              if (this.pubdetails[i].publicationDBCitation[t].name == "SCOPUS") {
                this.pubdetails[i].scopus = this.pubdetails[i].publicationDBCitation[t].value;
              }
              if (this.pubdetails[i].publicationDBCitation[t].name == "GS") {
                this.pubdetails[i].gs = this.pubdetails[i].publicationDBCitation[t].value;
              }
              if (this.pubdetails[i].publicationDBCitation[t].name == "WOS") {
                this.pubdetails[i].wos = this.pubdetails[i].publicationDBCitation[t].value;
              }
              if (this.pubdetails[i].publicationDBCitation[t].name == "IEEE") {
                this.pubdetails[i].ieee = this.pubdetails[i].publicationDBCitation[t].value;
              }
              if (this.pubdetails[i].publicationDBCitation[t].name == "PUBMED") {
                this.pubdetails[i].pubmed = this.pubdetails[i].publicationDBCitation[t].value;
              }
              if (this.pubdetails[i].publicationDBCitation[t].name == "CROSSREF") {
                this.pubdetails[i].abdc = this.pubdetails[i].publicationDBCitation[t].value;
              }
              if (this.pubdetails[i].publicationDBCitation[t].name == "SD") {
                this.pubdetails[i].sd = this.pubdetails[i].publicationDBCitation[t].value;
              }
            }
          }

          if(this.pubdetails[i].authorAffiliation!=null){
          this.pubdetails[i].authorAffiliation = this.pubdetails[i].authorAffiliation.split('|');  
          }
        }
       
        //Name Filter
        this.sortitems = this.pubdetails.publicationTitle;
        this.order = this.sortitems;

        // Apply sorting based on current sorting values
        if (this.ordervalue === 'Ascending') {
          this.pubdetails.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
        } else if (this.ordervalue === 'Descending') {
          this.pubdetails.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
        } else if (this.yearorder === 'Year') {
          this.pubdetails.sort((a, b) => a.year - b.year);
        }
      });

  }

  //detail & compact view
  selectedScheme = 'compact';
  showshare(val, id, userid) {
    this.showIcons = !this.showIcons;
    this.editshare = val;
    const shareUrl = environment.commonUrl + '/article/art';
    const recordid = id;
    const sno = userid;
    this.fullUrl = `${shareUrl}/${recordid}/${sno}`;
  }

  updateSelectedScheme(viewValue: string) {
    const elements = document.getElementsByTagName('article');

    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(this.selectedScheme);
      elements[i].classList.add(viewValue);
    }

    this.selectedScheme = viewValue;
  }

  onViewChange(event: any) {
    const viewValue = event.target.value;
    this.selectedView = viewValue;
    this.updateSelectedScheme(viewValue);
    this.GetPublication();
  }

  //Transition set for triangle to square box
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.profileStickyFunction();
  }

  profileStickyFunction() {
    if (window.pageYOffset >= 330) {
      this.navbar.classList.add('sticky');
    } else {
      this.navbar.classList.remove('sticky');
    }
  }

  //For Modal Box 
  openModal() {
    console.log('dialogbox button opened!');
    this.showModal = true;

  }
  closeModal() {
    console.log('Close button clicked!');
    this.showModal = false;
  }

  //Filter for ascending &descending
  changesOrder(values) {
    console.log(values);
    this.ordervalue = values;
    if (values == 'Ascending') {
      this.pubdetails.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
    }
    if (values == 'Descending') {
      this.pubdetails.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
    }
  }

  changeYear(values) {
    console.log(values);
    this.yearorder = values;
    if (values == 'Year') {
      this.pubdetails.sort((a, b) => b - a);
    }
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }

  getShareUrl(id: string, userid: any): string {
    const shareUrl = environment.commonUrl + '/article/art';
    const recordid = id;
    const sno = userid;
    let fullUrl = `${shareUrl}/${recordid}/${sno}`;
    return fullUrl;
  }

  //To enable or disable validation or delete icon
  validate(val) {
    this.editRow = val;
    this.validation = !this.validation;
    if (this.roleId != 2) {
      this.validation = false;
    }
    if (this.validation == false) {
      this.editRow = null;
      this.enableDelete = false;
    }
  }

  //To verify publication
  verified(pubId) {
    this.service.pubValidation(pubId, this.userIdparam, '1',this.roleId,this.userDetail.UserId).subscribe(res => {

      this.service.researcherPublicationDetails(this.userDetail.UniversityId, this.userIdparam,this.roleId,this.userDetail.UserId).subscribe(x => {

      })
    });
  }

    //To verify Patent
    verifiedPatent(patId) {
      this.service.patValidation(patId, this.userIdparam, '1',this.roleId,this.userDetail.UserId).subscribe(res => {
        this.service.getPatentDetailList(this.userDetail.UniversityId, this.userIdparam,this.userDetail.UserId,this.roleId).subscribe(x => {
        });
      });
    }

  confirm(pubId) {
    this.service.pubValidation(pubId, this.userIdparam, '0',this.roleId,this.userDetail.UserId).subscribe(x => {
      this.service.researcherPublicationDetails(this.userDetail.UniversityId, this.userIdparam,this.roleId,this.userDetail.UserId).subscribe(x => {
      })
    })
  }

  confirmPat(patId) {
    this.service.pubValidation(patId, this.userIdparam, '0',this.roleId,this.userDetail.UserId).subscribe(x => {
      this.service.getPatentDetailList(this.userDetail.UniversityId, this.userIdparam,this.userDetail.UserId,this.roleId).subscribe(x => {
      })
    })
  }

  //add new
  resetForm() {
    this.enableBox = true;
    this.enableAdd = true;
    this.pdfLocation=null;
    this.searchData="";
    this.crossTitle="";
    this.crossSourceName="";
    this.webLink="";
    this.doi="";
    this.file=null;
  }

        enableAddPatent(){
          this.enablePatentBox = true;
          this.enablePatentAdd = true;
        }

            enableAddProject(){
                    this.enableProjectNew = true;
                    this.enableProjectAdd = true;
                    this.projectBasicDl= new ProjectBasicDetail();

                    this.gservice.getProjectDrop('PROJECTSTATUS').subscribe(x=>{
                      this.projectStatusList=x;
                    });

                    this.gservice.getProjectDrop('PROJECTFUNDINGTYPE').subscribe(x=>{
                      this.projectFundingType=x;           
                    });

                    this.gservice.getProjectDrop('PROJECTFUNDINGAGENCY').subscribe(x=>{
                      this.projectFundingAgency=x;           
                    });

                    this.gservice.getProjectDrop('PROJECTFUNDINGAGENCYTYPE').subscribe(x=>{
                      this.projectFundingAgencyType=x;           
                    });

                    this.service.getResearchAreaList().subscribe(x=>{
                      this.researchList=x;    
                    })

                    this.service.GetPath(this.userDetail.UniversityId, this.userIdparam, '3').subscribe(x => {
                      this.projectPdfPath = x;
                      console.log(this.projectPdfPath);    
                    })

            }

            changeStatus(val){
                if(val!=null||val!=undefined){
                  let tempStatus = this.projectStatusList.filter(item => item.value==val);
                  this.projectBasicDl.projectStatusId = parseInt(tempStatus[0].id);
                  this.projectBasicDl.projectStatusName=val;
                } 
                else{
                  this.projectBasicDl.projectStatusId = 0;
                  this.projectBasicDl.projectStatusName = "";
                }      
             }

            changeFundAgencyType(val){
              if(val!=null||val!=undefined){
                  let tempFundAgencyType = this.projectFundingAgencyType.filter(item => item.value==val);
                  this.projectBasicDl.projectFundingAgencyTypeId= parseInt(tempFundAgencyType[0].id);
                  this.projectBasicDl.projectFundingAgencyTypeName=val;
              } 
              else{
                this.projectBasicDl.projectFundingAgencyTypeId=0;
                this.projectBasicDl.projectFundingAgencyTypeName="";
              }            
            }

            changeFundType(val){
              if(val!=null||val!=undefined){
                  let tempFundType = this.projectFundingType.filter(item => item.value==val);
                  this.projectBasicDl.projectFundingTypeId= parseInt(tempFundType[0].id);
                  this.projectBasicDl.projectFundingTypeName=val;
              } 
              else{
                this.projectBasicDl.projectFundingTypeId=0;
                this.projectBasicDl.projectFundingTypeName="";
              }            
            }

            changeFundAgency(val){
              if(val!=null||val!=undefined){
                  let tempFundAgency = this.projectFundingAgency.filter(item => item.value==val);
                  this.projectBasicDl.projectFundingAgencyId= parseInt(tempFundAgency[0].id);
                  this.projectBasicDl.projectFundingAgencyName=val;
              } 
              else{
                this.projectBasicDl.projectFundingAgencyId=0;
                this.projectBasicDl.projectFundingAgencyName="";
              }              
            }

            calcDuration(){
          
                if(this.projectBasicDl.projectStartDate!=undefined&&this.projectBasicDl.projectEndDate!=undefined){
                    const date1 = new Date(this.projectBasicDl.projectStartDate);
                    const date2 = new Date(this.projectBasicDl.projectEndDate);
                    // Get difference in milliseconds
                    const diffMs = date2.getTime() - date1.getTime();

                    const diffDays = diffMs / (1000 * 60 * 60 * 24);

                    const diffYears = diffDays / 365.25; 
                    
                    const diffYearsRounded = parseFloat(diffYears.toFixed(1));
                    console.log(diffYearsRounded);
                    this.projectBasicDl.projectDurationInYears=diffYearsRounded;
                }
               
            }

      enableDoi() {
        this.enableBox = true;
        this.enableAdd = false;
        this.EnableDoi = true;
        this.service.GetPath(this.userDetail.UniversityId, this.userIdparam, '2').subscribe(x => {
          this.pdfPath = x;
          console.log(this.pdfPath);
        });
      }

      enablePatentAppNum(){
        this.enablePatentAdd = false;
        this.enablePatentBox = true;
        this.enablePatentNum =true;
        this.countryCode=null;
        this.searchPatentAppNum="";
        this.service.patentCountry().subscribe(x=>{
              this.patCountryList=x;
        });

      }

        //search record for rfs by doi or title
        searchMatch() {
          this.searchRfs();
          this.enableBox = true;
          this.enableAdd = false;
          this.EnableDoi = false;
          this.enableUnmatch = true;
        }

        searchBasic(){
            this.enableProjectNew=true;
            this.enableProjectAdd=false;
            this.enableProjectNum=true;
          
        }

  /// to submit rfs data
  submitRfs() {
    this.uploadFile().then(()=>{

    if (!this.pdfStatus && this.pdfEnable) {
    }

    else {
      if (this.file) {
        if (this.rfsId == 1) {
          let imgsplit = this.file.type.split("/");
          console.log(imgsplit);
          this.pdfPostName = "." + imgsplit[1];
        }
        else {
          this.pdfPostName = "-" + this.file.name;
        }
        this.pdfLocation = this.pdfPath.folderPath + "\\" + this.userIdparam + this.pdfPostName;
        console.log(this.pdfLocation);
      }
    
      const data = {
        rfsPublicationQueue: {
          rfsPublicationQueueId: this.queueId,
          rfsPublicationLinkRequestId: 0,
          universityId: parseInt(this.userDetail.UniversityId),
          userId: parseInt(this.userIdparam),
          publicationId: this.publicationId,
          publicationTitle: this.crossTitle,
          publicationSourceId: this.sourceId,
          publicationSource: this.crossSourceName,
          doi: this.doi,
          pdFfileLocation: this.pdfLocation,
          webLink: this.webLink,
          rfsTypeId: this.rfsId,
          swappedUserId: 0,
          isUserAddressSame: true,
          isCorrespondingAuthor: true,
          actionTypeId: 0,
          remark: null,
          takenBy: 0,
          verifiedBy: 0
        },
        rfsLinkAuthorAdd: {
          universityId: 0,
          universityName: "string",
          userId: 0,
          fullName: "string",
          locationId: 0,
          locationName: "string",
          countryId: 0,
          countryName: "string",
          instituteId: 0,
          instituteName: "string",
          departmentId: 0,
          departmentName: "string",
          correspondingEmail: "string",
          correspondingAuthor: 0
        }
      }
      console.log(data);

      if (this.rfsId == "3") {
        if (this.pdfLocation != null && this.crossTitle != undefined && this.crossSourceName != undefined && this.webLink != undefined) {
          this.service.SaveRFS(this.userIdparam, this.roleId, data,this.userDetail.UserId).subscribe(x => {
            alert('Details Saved Successfully');
            this.enableBox = true;
            this.enableAdd = false;
            this.EnableDoi = false;
            this.enableUnmatch = false;
            this.rfsDone = true;
          })
        }
        else {
          alert("Need to fill mandatory fields")
        }
      }
        else if(this.rfsId=="2"){
          this.service.SaveRFS(this.userIdparam, this.roleId, data,this.userDetail.UserId).subscribe(x => {
            alert('Details Saved Successfully');
            this.enableBox = true;
            this.enableAdd = false;
            this.EnableDoi = false;
            this.enableUnmatch = false;
            this.rfsDone = true;
          })
        }
      }
   });

      if(this.rfsId=="1") {
        const data = {
          rfsPublicationQueue: {
            rfsPublicationQueueId: this.queueId,
            rfsPublicationLinkRequestId: 0,
            universityId: parseInt(this.userDetail.UniversityId),
            userId: parseInt(this.userIdparam),
            publicationId: this.publicationId,
            publicationTitle: this.crossTitle,
            publicationSourceId: this.sourceId,
            publicationSource: this.crossSourceName,
            doi: this.doi,
            pdFfileLocation: this.pdfLocation,
            webLink: this.webLink,
            rfsTypeId: this.rfsId,
            swappedUserId: 0,
            isUserAddressSame: true,
            isCorrespondingAuthor: true,
            actionTypeId: 0,
            remark: null,
            takenBy: 0,
            verifiedBy: 0
          },
          rfsLinkAuthorAdd: {
            universityId: 0,
            universityName: "string",
            userId: 0,
            fullName: "string",
            locationId: 0,
            locationName: "string",
            countryId: 0,
            countryName: "string",
            instituteId: 0,
            instituteName: "string",
            departmentId: 0,
            departmentName: "string",
            correspondingEmail: "string",
            correspondingAuthor: 0
          }
        }
        console.log(data);

        this.service.SaveRFS(this.userIdparam, this.roleId, data,this.userDetail.UserId).subscribe(x => {
          alert('Details Saved Successfully');
          this.enableBox = true;
          this.enableAdd = false;
          this.EnableDoi = false;
          this.enableUnmatch = false;
          this.rfsDone = true;
        })
      }
    
  }


  doneRFS() {
    this.enableBox = false;
    this.rfsDone = false;
  }
  closeAdd() {
    this.enableBox = false;
    this.enableUnmatch = false;
  }

  closePatent(){
    this.enablePatentBox = false;
  }

  closeProject(){
       this.enableProjectNew = false;
       this.enableProjectNum = false;
       this.projectSubmitEnable =false;
       this.projectBasicDl= new ProjectBasicDetail();
  }

  //validate
  openbox(pubId) {
    this.pubID = pubId
    if (this.roleId == 6 || this.roleId == 16) { 
    }
    else{
      this.openvalidate = true;
      this.validateapprove = true;
      this.done = false;
      this.validatedeny = false;
      this.validateyesno = false;
    }
  }

  patId:any;
  openvalidatePatent: boolean = false;
  validateapprovePatent: boolean = false;
  validateyesnoPatent: boolean = false;
  validatedenyPatent: boolean = false;
  donePat: boolean = false;
  openboxPatent(patId){

    this.patId = patId;
    if (this.roleId == 6 || this.roleId == 16) { 
    }
    else{
      this.openvalidatePatent = true;
      this.validateapprovePatent = true;
      this.donePat = false;
      this.validatedenyPatent = false;
      this.validateyesnoPatent = false;
    }

  }

  deletebox() {
    this.openvalidate = true;
    this.validateapprove = false;
    this.validatedeny = false;
    this.done = false;
    this.validateyesno = true;

  }

  deleteboxPatent(){
    this.openvalidatePatent = true;
    this.validateapprovePatent = false;
    this.validatedenyPatent = false;
    this.donePat = false;
    this.validateyesnoPatent = true;
  }

  yesornobox(pubId) {
    this.openvalidate = true;
    this.validateapprove = false;
    this.validateyesno = false;
    this.done = false;
    this.validatedeny = true;
    console.log(this.pubID);
    this.confirm(this.pubID);
  }

  yesornoboxPatent(patId) {
    this.openvalidatePatent = true;
    this.validateapprovePatent = false;
    this.validateyesnoPatent = false;
    this.donePat = false;
    this.validatedenyPatent = true;
    console.log(this.patId);
    this.confirmPat(this.patId);
  }

  approvebox(pubid) {
    console.log(this.pubID);
    this.openvalidate = true;
    this.validateapprove = false;
    this.validateyesno = false;
    this.validatedeny = false;
    this.done = true;
    this.verified(this.pubID);

  }

  // patent 
  approveboxPatent(patid) {
    console.log(this.patId);
    this.openvalidatePatent = true;
    this.validateapprovePatent = false;
    this.validateyesnoPatent = false;
    this.validatedenyPatent = false;
    this.donePat = true;
    this.verifiedPatent(this.patId);

  }

  donebox() {
    this.openvalidate = false;
    this.done = false;
    // location.reload();
    this.GetPublication();
  }

  doneboxPatent() {
    this.openvalidatePatent = false;
    this.donePat = false;
    // location.reload();
    this.patentDetail();
  }

  closebox() {
    this.openvalidate = false;
  }

  closeboxPatent(){
    this.openvalidatePatent = false;
  }

  showChart() {
    this.enableChart = !this.enableChart;
    console.log('Chart visibility toggled:', this.enableChart);
  }

  closecite() {
    this.opencitation = false;

  }
  opencite(showModal) {
    console.log('dialogbox button opened!');
    this.modalService.open(showModal);
  }

  //Enable checkbox based on DOI/Title
  updateValues(data) {
    if (this.checkDTtitle == "Doi") {
      this.titleEnable = false;
    }

  }

  updateValuesProject(){

    if(this.checkProjectTitle == "No"){
       this.enableProjectUniv=true;
    }
    else{
      this.enableProjectUniv=false;
    }
      
  }

        changeTitle(x) {
          if (this.checkDTtitle == 'Title') {
            if (x.length > 4) {
              this.titleEnable = true;
              this.service.getTitleList(x).subscribe(data => {
                this.filterTitle = data;
                if (this.filterTitle.length == 0) {
                  this.searchData = x;
                  this.titleEnable = false;
                }
              })
            }
          }
        }

        changeTitleProject(x){
          this.titleEnableProject=true;
          this.fill = this.universityFilter.filter(e =>
            e.universityName.toLowerCase().includes(x.toLowerCase())
          );
        }

      onSelectTitle(val) {
        this.searchData = val;
        console.log(this.searchData);
        this.titleEnable = false;
      }

      onSelectUnivProj(name,id){

          this.titleEnableProject=false;
          this.searchUnivProj=name;
          this.projectUnivId=id;
      }

  searchRfs() {
    //check values based on title
    if (this.checkDTtitle == 'Title') {
      this.service.GetRFSTitle(this.searchData).subscribe(x => {
        this.checkValue = x as any;
        if (this.checkValue.length == 1) {
          this.crossTitle = this.checkValue[0].publicationTitle;
          this.crossSourceName = this.checkValue[0].publicationSourceName;
          this.publicationId = this.checkValue[0].publicationId;
          this.sourceId = this.checkValue[0].publicationSourceId;
          this.publicationTitle = this.checkValue[0].publicationTitle;
          this.type = "L";
          this.readOnly = true;
          this.rfsId = 1;
          console.log(this.checkValue);
          this.pdfEnable = false;
          this.processData();
        }
        else {
          this.type = "M";
          this.service.GetPubValidate(this.userIdparam, this.publicationId, this.pubSourceName, this.type, this.searchData).subscribe(x => {
            this.userValues = x;
            if (this.userValues.messegeId != '5') {
              this.noDOI = true;
              this.pdfEnable = true;
              this.publicationTitle = this.searchData;
              this.rfsId = 3;
              this.processData();
            }
            else {
              this.noDOI = true;
              this.pdfEnable = true;
              this.popupAlert = "Title not present in RFS data, Do you want to proceed?";
              this.rfsId = 3;
              this.type = "M";
              this.processData();
            }
          })
        }

      })
    }
    else if (this.checkDTtitle == 'Doi') {
      //check values based on DOI number
      this.service.GetRFSDoi(this.searchData).subscribe(x => {
        this.checkValue = x;
        if (this.checkValue.length == 1) {
          this.crossTitle = this.checkValue[0].publicationTitle;
          this.crossSourceName = this.checkValue[0].publicationSourceName;
          this.publicationId = this.checkValue[0].publicationId;
          this.sourceId = this.checkValue[0].publicationSourceId;
          this.publicationTitle = this.checkValue[0].publicationTitle;
          this.doi = this.searchData;
          this.type = "L";
          this.rfsId = 1;
          this.readOnly = true;
          console.log(this.checkValue);
          this.pdfEnable = false;
          this.processData();
        }
        else {
          //get values from cross ref if data not found in RFS search
          this.service.crossCheckDFS(this.searchData).subscribe(x => {
            this.crossRefValues = x;
            if (this.crossRefValues.doi != null) {
              this.crossTitle = this.crossRefValues.title;
              //get source name from cross ref values
              this.crossSourceName = this.crossRefValues.sourceName[0];
              this.publicationTitle = this.crossRefValues.title;
              this.pubSourceName = this.crossSourceName;
              this.doi = this.searchData;
              this.readOnly = true;
              this.type = "C";
              this.rfsId = 2;
              console.log(this.crossRefValues);
              this.pdfEnable = true;
              this.processData();
            }
            else {
              this.noDOI = true;
              this.pdfEnable = true;
              this.popupAlert = "DOI not present in CrossRef and RFS data, Do you want to proceed?";
              this.rfsId = 3;
              this.type = "M";
              this.processData();
            }
          })
        }
      })
    }
  }

  processData() {
    //To search user publication is already exists or not
    this.service.GetPubValidate(this.userIdparam, this.publicationId, this.pubSourceName, this.type, this.publicationTitle).subscribe(x => {
      this.userValues = x;
      console.log(this.userValues);
      if (this.userValues.messegeId == '5') {
        console.log(this.userValues.messegeId);
        this.messageValue = true;
      }
      this.showData = true;
    })

  }

  file: File | null = null;
  pdfPath: any;
  pdfLocation: string | null = null;
  pdfName: string | null = null;
  dropfile: File| null = null;
  patPdfName: string | null = null;

  pdfdropbox(event){
    if(this.selectfilepath!=null){
      const confirmation = confirm('Do you want Replace pdf file!');
      
    if(confirmation){
      this.pdfconfirmation=false;
    this.dropfile = event.target.files[0] as File;
    console.log(this.dropfile);
                 
    if (this.dropfile) {
      const fileSize = this.dropfile.size / 1024 / 1024; // Size in MB
      const maxSize = 10; // Maximum allowed size in MB
  
      if (fileSize <= maxSize) {
        console.log(`Selected file size: ${fileSize} MB`);
      } else {
       alert("Please choose a file with file size below 10MB")
        event.target.value = '';
      }
    }  
    if(!this.dropfile){
      this.uploaddropFile();
  
    }
  }
  else{
    this.pdfconfirmation=true;
    const inputElement = event.target;
    // Reset the value of the input element to clear the selected file
    inputElement.value = null;
   }
  }  
  
  else{
    this.dropfile = event.target.files[0] as File;
    console.log(this.dropfile);             
    if (this.dropfile) {
      const fileSize = this.dropfile.size / 1024 / 1024; // Size in MB
      const maxSize = 10; // Maximum allowed size in MB
      if (fileSize <= maxSize) {
        console.log(`Selected file size: ${fileSize} MB`);
      } else {
       alert("Please choose a file with file size below 10MB")
        event.target.value = '';
      }
    }
  } 
  
  //   if(this.publevel.pubUserPDFLocation!=null){
  //     const confirmation = confirm('Do you want Replace pdf file!');
      
  //   if(confirmation){
  //     this.pdfconfirmation=false;
  //   this.dropfile = event.target.files[0] as File;
  //   console.log(this.dropfile);
                 
  //   if (this.dropfile) {
  //     const fileSize = this.dropfile.size / 1024 / 1024; // Size in MB
  //     const maxSize = 10; // Maximum allowed size in MB
  
  //     if (fileSize <= maxSize) {
  //       console.log(`Selected file size: ${fileSize} MB`);
  //     } else {
  //      alert("Please choose a file with file size below 10MB")
  //       event.target.value = '';
  //     }
  //   }  
  //   if(!this.dropfile){
  //     this.uploaddropFile();
  
  //   }
  // }
  // else{
  //   this.pdfconfirmation=true;
  //   const inputElement = event.target;
  // // Reset the value of the input element to clear the selected file
  // inputElement.value = null;
  
  // }
  
  // }  
  
  // else{
  //   this.dropfile = event.target.files[0] as File;
  //   console.log(this.dropfile);
                 
  //   if (this.dropfile) {
  //     const fileSize = this.dropfile.size / 1024 / 1024; // Size in MB
  //     const maxSize = 10; // Maximum allowed size in MB
  
  //     if (fileSize <= maxSize) {
  //       console.log(`Selected file size: ${fileSize} MB`);
  //     } else {
  //      alert("Please choose a file with file size below 10MB")
  //       event.target.value = '';
  //     }
  //   }
  //   this.uploaddropFile();
  // } 
  }
  uploaddropFile(){
    return new Promise((resolve, reject) => {

      if (!this.dropfile) {
        return "Please select a file";
      }
    
      if (this.dropfile.type == 'application/pdf') {         
      const formData = new FormData();
      formData.append('image', this.dropfile);
     
      
        let name=this.dropfile.name.slice(0, this.dropfile.name.lastIndexOf('.'));
        console.log(name);
        //this.pdfName=this.userIdparam;
        this.pdfName=this.publevel.publicationId+"-"+this.userDetail.UserId+"-"+name;
  
    
      const uploadUrl = `${environment.nodeServerUrl}/uploadpdf?userId=${this.pdfName}&pdfPath=${this.pdfPath.folderPath}`;
    
      console.log(uploadUrl);  
      
      this.http.post(uploadUrl, formData, { responseType: 'text' }).subscribe(
        (response) => {
          alert('PDF uploaded successfully!');
          console.log('Response:', response);
          this.pdfStatus=true;
          resolve(response);
        },
        (error) => {
          alert('Error uploading pdf');
          console.error('Error uploading pdf:', error);
          this.pdfStatus=false;
          reject(error);
        }
      );
      }
      else {
        alert("Please choose a file with file type pdf");
        this.pdfStatus=false;
      }
    });


  }

  selectFile(event) {
    this.file = event.target.files[0] as File;
    console.log(this.file);

    if (this.file) {
      const fileSize = this.file.size / 1024 / 1024; // Size in MB
      const maxSize = 10; // Maximum allowed size in MB

      if (fileSize <= maxSize) {
        console.log(`Selected file size: ${fileSize} MB`);
      } else {
        alert("Please choose a file with file size below 10MB")
        event.target.value = '';
      }
    }
  }

  uploadFile() {
    return new Promise((resolve, reject) => {
    if (!this.file) {
      return;
    }

    if (this.file.type == 'application/pdf') {
      const formData = new FormData();
      formData.append('image', this.file);
      if (this.rfsId == 1) {
        this.pdfName = this.pdfPath.proposedFileName;
      }
      else {
        let name = this.file.name.slice(0, this.file.name.lastIndexOf('.'));
        console.log(name);
        this.pdfName = this.userIdparam + "-" + name;
      }

      const uploadUrl = `${environment.nodeServerUrl}/uploadpdf?userId=${this.pdfName}&pdfPath=${this.pdfPath.folderPath}`;
      console.log(uploadUrl);

      this.http.post(uploadUrl, formData, { responseType: 'text' }).subscribe(
        (response) => {
          alert('PDF uploaded successfully!')
          console.log('Response:', response);
          this.pdfStatus = true;
          resolve(response);
        },
        (error) => {
          alert('Error uploading pdf');
          console.error('Error uploading pdf:', error);
          this.pdfStatus = false;
          reject(error);
        }
      );
    }
      else {
      alert("Please choose a file with file type pdf");
      this.pdfStatus = false;
       }
     });
  }

  clearAll() {
    location.reload();
  }

  articlePieChart() {

    var chart = am4core.create("chartdivArt", am4charts.PieChart);
    this.service.getArticlechart(this.userDetail.UniversityId,this.userIdparam,this.roleId,this.userDetail.UserId).subscribe(
      (x: any) => {
        const data = x.map(item => ({
          ArticleType: item.articleType,
          Count: item.count,

        }));
        console.log(data);

        chart.data = data;
      }
    );

    //  pie series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.colors.list = [
      am4core.color("#33CC33"),
      am4core.color("blue"),
      am4core.color("#FF6F91"),
      am4core.color("#FF9671"),
      am4core.color("#FFC75F"),
      am4core.color("#F9F871")
    ];
    pieSeries.dataFields.value = "Count";
    pieSeries.dataFields.category = "ArticleType";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.labels.template.disabled = true;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";

    pieSeries.hiddenState.properties.opacity = this.DEFAULT_SLICE_OPACITY;
    pieSeries.hiddenState.properties.endAngle = this.DEFAULT_ANIMATION_END_ANGLE;
    pieSeries.hiddenState.properties.startAngle = this.DEFAULT_ANIMATION_START_ANGLE;

  }

  
  //chart
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.articlePieChart();
    this.affilliationPieChart();
    this.dbBarChart();
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  affilliationPieChart() {
    const container = am4core.create('chartContainer', am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);

    const chart = container.createChild(am4charts.PieChart);

    chart.data = []; // Your data array goes here

    this.service.getAffiliationchart(this.userIdparam, this.userDetail.UniversityId,this.roleId,this.userDetail.UserId).subscribe(
      (x: any) => {
        const data = x
        console.log(data);

        const newData = this.transformData(data);
        console.log(newData);

        console.log(data);

        // Add data to the chart
        chart.data = newData;

        //  pie series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.colors.list = [
          am4core.color("#FF6F91"),
          am4core.color("blue"),
          am4core.color("#33CC33"),
          am4core.color("#FF9671"),
          am4core.color("#FFC75F"),
          am4core.color("#F9F871")
        ];
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "countname";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.labels.template.disabled = true;

        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";

        pieSeries.hiddenState.properties.opacity = this.DEFAULT_SLICE_OPACITY;
        pieSeries.hiddenState.properties.endAngle = this.DEFAULT_ANIMATION_END_ANGLE;
        pieSeries.hiddenState.properties.startAngle = this.DEFAULT_ANIMATION_START_ANGLE;

      }
    );
    console.log("Enter");
    
  }

  private transformData(originalData: any): any[] {
    return Object.keys(originalData[0])
      .filter(key => key !== 'userId' && key !== 'totalCount')
      .map(key => ({
        countname: key, value: originalData[0][key]
      }));

  }

  dbBarChart() {
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create("chartdiv", am4charts.XYChart);
    this.service.getDatabasechart(this.userIdparam, this.userDetail.UniversityId,this.roleId,this.userDetail.UserId).subscribe(
      (x: any) => {
        console.log(x);
        
        this.filtercrosschart = x.filter(item => item.publicationDB !== 'CROSSREF' && item.publicationDB !== 'ICI');
        this.data = this.filtercrosschart.map(item => ({
          PubDataBase: item.publicationDB,
          Count: item.count,
        }));
        console.log(this.data);

        chart.data = this.data;
      }
    );

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "PubDataBase";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 0;
    categoryAxis.renderer.labels.template.fontSize = 8; // Set your desired font size here
    categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
      return dy;
    });

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "Count";
    series.dataFields.categoryX = "PubDataBase";
    series.name = "PubDataBase";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 1;
    columnTemplate.strokeOpacity = 1;
  }

  removeUser() {
    this.hideUser = true;
  }

  onPageChangeEditPub(page: number) {
    this.pageEditPub = Math.max(1, Math.min(page, this.totalPagesEditPub));

    if (this.pageEditPub == 1) {
      this.startrowEditPub = 0;
    } else {
      this.startrowEditPub = (this.pageEditPub - 1) * this.pageSizeEditPub;
    }
    this.endrowEditPub = Math.min(this.startrowEditPub + this.pageSizeEditPub, this.collapsablesizeEditPub);
    // Apply sorting based on current sorting values
    if (this.ordervalueEditPub === 'Ascending') {
      this.editedPubList.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
    } else if (this.ordervalueEditPub === 'Descending') {
      this.editedPubList.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
    } else if (this.yearorderEditPub === 'Year') {
      this.editedPubList.sort((a, b) => a.year - b.year);
    }
    ///detailed or compact for article
    // this.pageview = true;
    // const viewValue = this.selectedScheme === 'compact' ? 'compact' : 'detailed';
    // this.updateSelectedScheme(viewValue);
    this.editedPubDetail();
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
      this.pubdetails.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
    } else if (this.ordervalue === 'Descending') {
      this.pubdetails.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
    } else if (this.yearorder === 'Year') {
      this.pubdetails.sort((a, b) => a.year - b.year);
    }
    ///detailed or compact for article
    this.pageview = true;
    const viewValue = this.selectedScheme === 'compact' ? 'compact' : 'detailed';
    this.updateSelectedScheme(viewValue);
    this.GetPublication();
  }

          onPageSizeChange(size: string) {
            this.page = 1;
            this.pageSize = Number(size);
            this.endrow = this.pageSize + this.startrow;

            // Apply sorting based on current sorting values
            if (this.ordervalue === 'Ascending') {
              this.pubdetails.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
            } else if (this.ordervalue === 'Descending') {
              this.pubdetails.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
            } else if (this.yearorder === 'Year') {
              this.pubdetails.sort((a, b) => a.year - b.year);
            }

            // detailed or compact for the article
            this.pageview = true;
            const viewValue = this.selectedScheme === 'compact' ? 'compact' : 'detailed';
            this.updateSelectedScheme(viewValue);
            this.GetPublication();

          }

            toEdit(){
              this.routes.navigate(['/facultyProfiles/edit/screen/edit',this.userDetail.UniversityId,this.userDetail.UserId]);
            }

            openDropBox(pubID,userid){
              this.opendropBoxEnable = true;
              console.log('publicationId:', pubID);
              console.log('userid:', userid);

              this.service.getdropboxlevel(pubID,userid).subscribe( (x: Publication) => {
                this.publevel = x;
                console.log(this.publevel);

                this.publevel.publicationId == this.pubdropid;
                console.log(this.publevel.publicationId);

                this.selectfilepath=this.publevel.pubUserPDFLocation;
                console.log(this.publevel.pubUserPDFLocation);
                console.log(this.selectfilepath);
                      if(this.selectfilepath){
                      const parts = this.selectfilepath.split('-');
                      if (parts.length >= 2) {
                        // Extract the second half after the hyphen
                      this.filetypename=parts.slice(3).join('-').trim();
                      console.log( this.filetypename);

                      }
                    }
                this.service.GetPath(this.userDetail.UniversityId, this.userIdparam, '4').subscribe(x => {
                  this.pdfPath = x;
                  console.log(this.pdfPath);    
                })
              })
            }

       updatebox(){

            if (this.pdfconfirmation==false) {
                this.uploaddropFile()
                  .then(() => {
                    if (!this.dropfile) {
                      this.pdfLocation = this.publevel.pubUserPDFLocation;
                      // Handle the condition where pdfStatus is false and pdfEnable is true
                    } else {
                    
                      if (this.dropfile) {
                        let imgsplit=this.dropfile.type.split("/");
                        console.log(imgsplit);
                        console.log(this.publevel.publicationId);
                          this.pdfPostName="."+imgsplit[1];
                        this.pdfPostName = "-" + this.dropfile.name; // Use this.dropfile instead of this.file
                        this.publevel.pubUserPDFLocation = this.pdfPath.folderPath + "\\" +this.publevel.publicationId+"-"+ this.userDetail.UserId + this.pdfPostName;
                        console.log(this.pdfLocation);
                      } else {
                        this.publevel.pubUserPDFLocation = this.pdfLocation;
                      }
                    }
                    console.log(this.publevel.pubUserPDFLocation);
                    
                    this.service.updatedropbox(this.publevel, this.userid, this.roleId,this.userDetail.UniversityId,this.userDetail.UserId).subscribe(
                      (response) => {
                        console.log("Updatedropbox", response);
                        console.log(this.publevel);

                        if (this.confirm) {
                          alert("Update Successfully!");
                          this.opendropBoxEnable = false;
                          
                        }
                      },
                      (error) => {
                        console.error("Error", error);
                      }
                    );
                  })
                  .catch((error) => {
                    console.error("Error during file upload", error);
                  });
                }
              if(this.pdfconfirmation==true || !this.dropfile){

                if(!this.pdfStatus&&this.pdfEnable){
              }
              else{
              if(this.dropfile){
              
                let imgsplit=this.dropfile.type.split("/");
                console.log(imgsplit);
                  this.pdfPostName="."+imgsplit[1];
                this.pdfPostName="-"+this.dropfile.name;
              
                this.pdfLocation=this.pdfPath.folderPath+"\\"+this.userDetail.UserId+this.pdfPostName;
                console.log(this.pdfLocation);
                this.pdfLocation=this.publevel.pubUserPDFLocation;
              }
              else{

              }
              console.log(this.pdfLocation);    
              this.service.updatedropbox(this.publevel, this.userid, this.roleId,this.userDetail.UniversityId,this.userDetail.UserId).subscribe(
                    (response) => {
                      console.log("Updatedropbox", response);
                      console.log(this.publevel.pubUserPDFLocation);
              
                      if (this.confirm) {
                        alert("Update Successfully!");
                        this.opendropBoxEnable = false;
                      }
                    },
                    (error) => {
                      console.error("Error", error);
                    }
                  );
                }
              }
 
        }

          closeDropbox(){
            this.opendropBoxEnable=false;
          }

          openDropBoxPub(){
            this.opendropBoxEnablePub=true;
          }

          closeDropboxPub(){
            this.opendropBoxEnablePub=false;
          }

        toEnableModules(module:string,count:number){
            console.log("project",module);
            this.enableModule=module;
            if(module=="Projects"){
              // this.hoverMessage = 'The module to be enabled soon';
            this.project=false;
            this.publication=true;
            this.enableCopyright=false;
            this.patent=false;
            this.enableEditedPub=false;
            this.trademarkTabenable=false;
            this.designpatent=false;
            this.projectDetail();

          }
          else if(module=="Publications"){
            this.hoverMessage = '';
            this.project=true;
            this.patent=false;
            this.designpatent=false;
            this.enableCopyright=false;
            this.enableEditedPub=false;
            this.trademarkTabenable=false;
            this.publication=false;
            setTimeout(()=>{
              this.affilliationPieChart();
              this.dbBarChart();
              this.articlePieChart();
            },100)
          }
          else if(module=="Patents"){
            this.patentDetail();
            this.patent=true;
            this.publication=false;
            this.project=false;
            this.enableEditedPub=false;
            this.enableCopyright=false;
            this.designpatent=false;
            this.trademarkTabenable=false;
            this.hoverMessage ='';
          }
          else if(module=="Edited Publications"){
            this.editedPubDetail();
            this.patent=false;
            this.publication=false;
            this.designpatent=false;
            this.project=false;
            this.enableEditedPub=true;
            this.trademarkTabenable=false;
            this.enableCopyright=false;
            this.hoverMessage ='';
          }
          else if(module=="Copyrights"){
            this.copyrightDetail();
            this.patent=false;
            this.publication=false;
            this.project=false;
            this.designpatent=false;
            this.enableEditedPub=false;
            this.trademarkTabenable=false;
            this.enableCopyright=true;
            this.hoverMessage ='';
          }
          else if(module=="Design Patent"){
            this.GetDesignpatents();
          this.designpatent=true;
          this.patent=false;
          this.publication=false;
          this.project=false;
          this.trademarkTabenable=false;
          this.enableEditedPub=false;
          this.enableCopyright=false;
          this.hoverMessage ='';
        }
        else if(module=="Trademarks"){
          this.getTrademarkDetail();
          this.trademarkTabenable=true;
          this.designpatent=false;
          this.patent=false;
          this.publication=false;
          this.project=false;
          this.enableEditedPub=false;
          this.enableCopyright=false;
          this.hoverMessage ='';
      }
          else{
            this.hoverMessage = '';
          }
          
          
        }

        nullid(i){
          alert("ID not available. Kindly enter")
        }

  selectedSchemePatent = 'compact';
  updateSelectedSchemePatent(viewValue: string) {
    const elements = document.getElementsByTagName('article');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(this.selectedSchemePatent);
      elements[i].classList.add(viewValue);
    }
    this.selectedSchemePatent = viewValue;
  }

  selectedSchemeDP = 'compact';
  updateSelectedSchemeDP(viewValue: string) {
    const elements = document.getElementsByTagName('article');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(this.selectedSchemeDP);
      elements[i].classList.add(viewValue);
    }
    this.selectedSchemeDP = viewValue;
  }

  selectedSchemeCpy = 'compact';
  updateSelectedSchemeCpy(viewValue: string) {
    const elements = document.getElementsByTagName('article');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(this.selectedSchemeCpy);
      elements[i].classList.add(viewValue);
    }
    this.selectedSchemeCpy = viewValue;
  }

  selectedSchemeProject='compact';
  updateSelectedSchemeProject(viewValue: string){
    const elements = document.getElementsByTagName('article');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(this.selectedSchemeProject);
      elements[i].classList.add(viewValue);
    }
    this.selectedSchemeProject = viewValue;
  }

  onViewChangePatent(event: any) {
    const viewValue = event.target.value;
    this.selectedViewPatent = viewValue;
    this.updateSelectedSchemePatent(viewValue);
  }

  onViewChangeCpy(event: any) {
    const viewValue = event.target.value;
    this.selectedViewCpyRight = viewValue;
    this.updateSelectedSchemeCpy(viewValue);
  }

  onViewChangeProject(event: any) {
    const viewValue = event.target.value;
    this.selectedViewProject = viewValue;
    this.updateSelectedSchemeProject(viewValue);
  }

  openciteProject(showModalPatent) {
    console.log('dialogbox button opened!');
    this.modalService.open(showModalPatent);
  }

  

 patentDetail(){
  this.service.getPatentDetailList(this.userDetail.UniversityId, this.userIdparam,this.userDetail.UserId,this.roleId).subscribe(x=>{
    console.log(x);
    this.patentList=x;
    this.collapsablesizePat = this.patentList.length;
    this.totalPagesPat = Math.ceil(this.collapsablesizePat / this.pageSizePat);
    // Adjust Mpage to prevent it from exceeding totalpages
    this.pagePat = Math.max(1, Math.min(this.pagePat, this.totalPagesPat));
    // Calculate the actual startRow and endRow based on Mpage and pageSize
    this.startrowPat = (this.pagePat - 1) * this.pageSizePat;
    this.endrowPat = Math.min(this.startrowPat + this.pageSizePat, this.collapsablesizePat);
    // Update the values used in the <h6> tag
    this.pagePat = this.pagePat;

    for(let i=0;i<this.patentList.length;i++){
      if(this.patentList[i].applicantAffiliation!=null){
        this.patentList[i].applicantAffiliation = this.patentList[i].applicantAffiliation.split('|');  
        }
      if(this.patentList[i].inventorAffiliation!=null){
          this.patentList[i].inventorAffiliation = this.patentList[i].inventorAffiliation.split('|');  
          }
      if(this.patentList[i].filingDate!=null){
        this.patentList[i].filingDate=this.patentList[i].filingDate.split(' ')[0];
        }
      if(this.patentList[i].publishedDate!=null){
          this.patentList[i].publishedDate=this.patentList[i].publishedDate.split(' ')[0];
        }
      if(this.patentList[i].grantDate!=null){
         this.patentList[i].grantDate=this.patentList[i].grantDate.split(' ')[0];
        }
        if (this.patentList[i].patentStageLifeCycle != null) {
          const patentStageLifeCycle = this.patentList[i].patentStageLifeCycle.split(',');

          this.patentList[i].patentStageLifeCycle = patentStageLifeCycle.map(item => {
            const [name, value] = item.split(':');
            return { name, value };
          });

          // Assigning variable for showing values dynamically in honeycomp
          for (let t = 0; t < this.patentList[i].patentStageLifeCycle.length; t++) {

            if (this.patentList[i].patentStageLifeCycle[t].name == "Filed") {
              this.patentList[i].filed = this.patentList[i].patentStageLifeCycle[t].value;
            }
            if (this.patentList[i].patentStageLifeCycle[t].name == "Published") {
              this.patentList[i].published = this.patentList[i].patentStageLifeCycle[t].value;
            }
            if (this.patentList[i].patentStageLifeCycle[t].name == "FER Issued") {
              this.patentList[i].ferIssued = this.patentList[i].patentStageLifeCycle[t].value;
            }
            if (this.patentList[i].patentStageLifeCycle[t].name == "FER Replied") {
              this.patentList[i].ferReply = this.patentList[i].patentStageLifeCycle[t].value;
            }
            if (this.patentList[i].patentStageLifeCycle[t].name == "Hearing Notice") {
              this.patentList[i].hearNotice = this.patentList[i].patentStageLifeCycle[t].value;
            }
            if (this.patentList[i].patentStageLifeCycle[t].name == "Granted") {
              this.patentList[i].granted = this.patentList[i].patentStageLifeCycle[t].value;
            }
            if (this.patentList[i].patentStageLifeCycle[t].name == "Examined") {
              this.patentList[i].examined = this.patentList[i].patentStageLifeCycle[t].value;
              }
            }
          }
        }
      });
        if (this.ordervaluePatent === 'Ascending') {
          this.patentList.sort((a, b) => (a.patentTitle > b.patentTitle) ? 1 : ((b.patentTitle > a.patentTitle) ? -1 : 0));
        } else if (this.ordervaluePatent === 'Descending') {
          this.patentList.sort((a, b) => (a.patentTitle < b.patentTitle) ? 1 : ((b.patentTitle < a.patentTitle) ? -1 : 0));
        }   
        
    }

            //Filter for ascending &descending
            changesOrderPatent(values) {
              console.log(values);
              this.ordervaluePatent = values;
              if (values == 'Ascending') {
                this.patentList.sort((a, b) => (a.patentTitle > b.patentTitle) ? 1 : ((b.patentTitle > a.patentTitle) ? -1 : 0));
              }
              if (values == 'Descending') {
                this.patentList.sort((a, b) => (a.patentTitle < b.patentTitle) ? 1 : ((b.patentTitle < a.patentTitle) ? -1 : 0));
              }
            }

            changesOrderProject(values){
              this.ordervalueProject = values;
              if (values == 'Ascending') {
                this.projList.sort((a, b) => (a.projectTitle > b.projectTitle) ? 1 : ((b.projectTitle > a.projectTitle) ? -1 : 0));
              }
              if (values == 'Descending') {
                this.projList.sort((a, b) => (a.projectTitle < b.projectTitle) ? 1 : ((b.projectTitle < a.projectTitle) ? -1 : 0));
              }
            }

            changesOrderEditPub(values) {
              console.log(values);
              this.ordervalueEditPub = values;
              if (values == 'Ascending') {
                this.editedPubList.sort((a, b) => (a.publicationTitle > b.publicationTitle) ? 1 : ((b.publicationTitle > a.publicationTitle) ? -1 : 0));
              }
              if (values == 'Descending') {
                this.editedPubList.sort((a, b) => (a.publicationTitle < b.publicationTitle) ? 1 : ((b.publicationTitle < a.publicationTitle) ? -1 : 0));
              }
            }

          onPageChangePatent(page: number) {
            this.pagePat = Math.max(1, Math.min(page, this.totalPagesPat));

            if (this.pagePat == 1) {
              this.startrowPat = 0;
            } else {
              this.startrowPat = (this.pagePat - 1) * this.pageSizePat;
            }
            this.endrowPat = Math.min(this.startrowPat + this.pageSizePat, this.collapsablesizePat);
            // Apply sorting based on current sorting values
            if (this.ordervaluePatent === 'Ascending') {
              this.patentList.sort((a, b) => (a.patentTitle > b.patentTitle) ? 1 : ((b.patentTitle > a.patentTitle) ? -1 : 0));
            } else if (this.ordervalue === 'Descending') {
              this.patentList.sort((a, b) => (a.patentTitle < b.patentTitle) ? 1 : ((b.patentTitle < a.patentTitle) ? -1 : 0));
            } 
            ///detailed or compact for article
            this.pageview = true;
            const viewValue = this.selectedSchemePatent === 'compact' ? 'compact' : 'detailed';
            this.updateSelectedSchemePatent(viewValue);
            this.patentDetail();
          }

          onPageChangeCpy(page: number) {
            this.pageCpy = Math.max(1, Math.min(page, this.totalPagesCpy));

            if (this.pageCpy == 1) {
              this.startrowCpy = 0;
            } else {
              this.startrowCpy = (this.pageCpy - 1) * this.pageSizeCpy;
            }
            this.endrowCpy = Math.min(this.startrowCpy + this.pageSizeCpy, this.collapsablesizeCpy);
            // Apply sorting based on current sorting values
            if (this.ordervalueCpy === 'Ascending') {
              this.cpyRightList.sort((a, b) => (a.copyrightTitle > b.copyrightTitle) ? 1 : ((b.copyrightTitle > a.copyrightTitle) ? -1 : 0));
            } else if (this.ordervalueCpy === 'Descending') {
              this.cpyRightList.sort((a, b) => (a.copyrightTitle < b.copyrightTitle) ? 1 : ((b.copyrightTitle < a.copyrightTitle) ? -1 : 0));
            } 
            ///detailed or compact for article
            this.pageview = true;
            const viewValue = this.selectedSchemeCpy === 'compact' ? 'compact' : 'detailed';
            this.updateSelectedSchemeCpy(viewValue);
            this.copyrightDetail();
          }

          onPageChangeProject(page: number) {
            this.pageProj = Math.max(1, Math.min(page, this.totalPagesProj));

            if (this.pageProj == 1) {
              this.startrowProj = 0;
            } else {
              this.startrowProj = (this.pageProj - 1) * this.pageSizeProj;
            }
            this.endrowProj = Math.min(this.startrowProj + this.pageSizeProj, this.collapsablesizeProj);
            // Apply sorting based on current sorting values
            if (this.ordervalueProject === 'Ascending') {
              this.projList.sort((a, b) => (a.projectTitle > b.projectTitle) ? 1 : ((b.projectTitle > a.projectTitle) ? -1 : 0));
            } else if (this.ordervalueProject === 'Descending') {
              this.projList.sort((a, b) => (a.projectTitle < b.projectTitle) ? 1 : ((b.projectTitle < a.projectTitle) ? -1 : 0));
            } 
            ///detailed or compact for article
            this.pageviewProj = true;
            const viewValue = this.selectedSchemeProject === 'compact' ? 'compact' : 'detailed';
            this.updateSelectedSchemeProject(viewValue);
            this.projectDetail();
          }

          onPageSizeChangePatent(size: string) {
            this.pagePat = 1;
            this.pageSizePat = Number(size);
            this.endrowPat = this.pageSizePat + this.startrowPat;
            // Apply sorting based on current sorting values
            if (this.ordervaluePatent === 'Ascending') {
              this.patentList.sort((a, b) => (a.patentTitle > b.patentTitle) ? 1 : ((b.patentTitle > a.patentTitle) ? -1 : 0));
            } else if (this.ordervaluePatent === 'Descending') {
              this.patentList.sort((a, b) => (a.patentTitle < b.patentTitle) ? 1 : ((b.patentTitle < a.patentTitle) ? -1 : 0));
            } 
            // detailed or compact for the article
            this.pageview = true;
            const viewValue = this.selectedSchemePatent === 'compact' ? 'compact' : 'detailed';
            this.updateSelectedSchemePatent(viewValue);
            this.patentDetail();
          }

          onPageSizeChangeCpy(size: string) {
            this.pageCpy = 1;
            this.pageSizeCpy = Number(size);
            this.endrowCpy = this.pageSizeCpy + this.startrowCpy;
            // Apply sorting based on current sorting values
            if (this.ordervalueCpy === 'Ascending') {
              this.cpyRightList.sort((a, b) => (a.copyrightTitle > b.copyrightTitle) ? 1 : ((b.copyrightTitle > a.copyrightTitle) ? -1 : 0));
            } else if (this.ordervaluePatent === 'Descending') {
              this.cpyRightList.sort((a, b) => (a.copyrightTitle < b.copyrightTitle) ? 1 : ((b.copyrightTitle < a.copyrightTitle) ? -1 : 0));
            } 
            // detailed or compact for the article
            this.pageview = true;
            const viewValue = this.selectedSchemeCpy === 'compact' ? 'compact' : 'detailed';
            this.updateSelectedSchemeCpy(viewValue);
            this.copyrightDetail();
          }

          onPageSizeChangeProject(size: string){
            this.pageProj = 1;
            this.pageSizeProj = Number(size);
            this.endrowProj = this.pageSizeProj + this.startrowProj;
            // Apply sorting based on current sorting values
            if (this.ordervalueProject === 'Ascending') {
              this.projList.sort((a, b) => (a.projectTitle > b.projectTitle) ? 1 : ((b.projectTitle > a.projectTitle) ? -1 : 0));
            } else if (this.ordervalueProject === 'Descending') {
              this.projList.sort((a, b) => (a.projectTitle < b.projectTitle) ? 1 : ((b.projectTitle < a.projectTitle) ? -1 : 0));
            } 
            // detailed or compact for the article
            this.pageviewProj = true;
            const viewValue = this.selectedSchemeProject === 'compact' ? 'compact' : 'detailed';
            this.updateSelectedSchemeProject(viewValue);
            this.projectDetail();
          }

          onPageSizeChangeEditPub(size: string) {
            this.pageEditPub = 1;
            this.pageSizeEditPub = Number(size);
            this.endrowEditPub = this.pageSizeEditPub + this.startrowEditPub;
            // Apply sorting based on current sorting values
            if (this.ordervalueEditPub === 'Ascending') {
              this.editedPubList.sort((a, b) => (a.publicationTitle > b.publicationTitle) ? 1 : ((b.publicationTitle > a.publicationTitle) ? -1 : 0));
            } else if (this.ordervalue === 'Descending') {
              this.editedPubList.sort((a, b) => (a.publicationTitle < b.publicationTitle) ? 1 : ((b.publicationTitle < a.publicationTitle) ? -1 : 0));
            } 
            // detailed or compact for the article
            // this.pageview = true;
            // const viewValue = this.selectedSchemePatent === 'compact' ? 'compact' : 'detailed';
            // this.updateSelectedSchemePatent(viewValue);
            this.editedPubDetail();
          }

          showChartPatents() {
            this.enableChartPat = !this.enableChartPat;
            console.log('Chart visibility toggled:', this.enableChartPat);
          }

          showChartCopyright() {
            this.enableChartCpy = !this.enableChartCpy;
            console.log('Chart visibility toggled:', this.enableChartCpy);
          }

          showChartEditedPub(){
            this.enableChartEditedPub =! this.enableChartEditedPub;
          }

          getNameWithoutBrackets(author: string): string {
            if (typeof author === 'string') {
              return author.replace(/\[\d+\]/, '').split(',')[0];
            }
            return '';
          }

          getAffiliationWithoutBrackets(author: string): string {
            if (typeof author === 'string') {
              const parts = author.replace(/\[\d+\]/, '').split(',');
              if (parts.length > 2) { 
                if(parts[3]==" Not Available"){
                  return `${parts[1]}, ${parts[2]}`;
                }
                else{
                  return `${parts[1]}, ${parts[2]}, ${parts[3]}`;
                }    
              }
            }
            return '';
          }

          printNumber(author: string) {
            if (typeof author === 'string') {
              const match = author.match(/\[(\d+)\]/);
              if (match) {
                console.log(match[1]);
                this.routes.navigate(["/facultyProfiles/"+match[1]]);
              }
            }
          }

        hasBrackets(author: string): boolean {
          return /\[\d+\]/.test(author);
        }

        viewScores(){
          localStorage.setItem("viewScore",this.userIdparam)
          this.routes.navigate(['/scorebook' ]);
        }

    searchGlobalData(value){

      this.filteredItems = this.pubdetails?.filter(item => 
        String(item.publicationTitle || '').toLowerCase().includes(value.toLowerCase()) ||
        String(item.authorAffiliation || '').toLowerCase().includes(value.toLowerCase()) ||
        String(item.articleType || '').toLowerCase().includes(value.toLowerCase()) ||
        String(item.year || '').toLowerCase().includes(value.toLowerCase()) ||
        String(item.sourcePublication || '').toLowerCase().includes(value.toLowerCase()) ||
        String(item.authorVerifiedStatus || '').toLowerCase().includes(value.toLowerCase())
      );
                console.log(this.filteredItems);
                
                this.collapsablesize=this.filteredItems.length;
                if(this.collapsablesize<this.pageSize){
                  this.endrow=this.collapsablesize;
                }
                else{
                  this.endrow=this.pageSize;
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

          searchPatentNum(){

            if(this.countryCode==null){
                alert("Please select Office before search")
            }
            else{
              this.enableMessage=false;
              this.patPubEnable=undefined;
              this.patPubIndEnable=undefined;
            this.enablePatentBox = true;
            this.enablePatentAdd = false;
            this.enablePatentNum = false;
            this.file=null;
            this.enableUnmatch = true;
            this.service.GetPath(this.userDetail.UniversityId, this.userIdparam, '5').subscribe(x => {
              this.patPdfPath = x;
              console.log(this.patPdfPath);    
            });

            this.service.getPatentByAppNo(this.searchPatentAppNum,this.countryCode).subscribe(x=>{
                     console.log(x);
                     this.patentData=x;
                     if(this.patentData.length>0){
                        this.enablepatData=true;     
                        this.patAppNo=this.patentData[0].applicationNumber;
                        this.patTitle=this.patentData[0].patentTitle;    
                        this.patentId=this.patentData[0].patentId;    
                        this.patentOfficeId = this.patentData[0].patentOfficeId;      
                     }                   
                 });
              }

          }

          returnToSearch(){
            this.enablePatentBox = true;
            this.enablePatentAdd = false;
            this.enablePatentNum = true;
            this.enableUnmatch = false;
            this.patentData=[];
            this.patAppNo="";
            this.patTitle=""; 
            this.patentOfficeId="";
            this.patentId=0;  
            this.enableMessage=false;
            this.patPubEnable=undefined;
            this.patPubIndEnable=undefined;
          }

          linkPatent(){

            this.service.getPatentAvailability(this.userIdparam,'L',this.patTitle,this.patAppNo,this.patentOfficeId).subscribe(x=>{
              this.checkPatAvailability=x;
              if(this.checkPatAvailability){
                if(this.checkPatAvailability.messegeId==4){
                  const data={
                    rfsPatentQueue: {
                      rfsPatentQueueId: 0, 
                      universityId: this.userDetail.UniversityId,
                      userId: this.userIdparam,
                      applicationNumber: this.patAppNo,   
                      patentId: this.checkPatAvailability.patentId,
                      patentTitle: this.patTitle,
                      patentOfficeId:this.patentOfficeId,
                      webLink: null,
                      pdFfileLocation: null,
                      rfsTypeId: 1,
                      actionTypeId: 0,
                      remark: null,
                      workflowstatusId: 6,
                      swappedInventorUserId: 0,
                      swappedApplicantUserId: 0,
                      takenBy: 0,
                      verifiedBy: 0
                    }
                  }
                    this.service.savePatent(data,this.userIdparam,this.roleId).subscribe(x=>{
                           console.log("Data save suceessfully");
                           this.patSubmitEnable=true;
                           this.enableUnmatch=false;  
                           this.enablePatentBox = true;
                           this.enablePatentAdd = false;
                           this.enablePatentNum = false;    
                           this.patAppNo="";
                           this.patTitle=""; 
                           this.patentOfficeId="";
                           this.patentId=0;    
                    });
                 }
                else{    
                  this.enableMessage=true;
                }
              }
            });

          }

          donePatent(){
            this.patSubmitEnable=false;
            this.enableUnmatch=false;   
            this.enablePatentBox = false;
            this.enablePatentAdd = false;
            this.enablePatentNum = false;
            this.patentData=[];
            this.patAppNo="";
            this.patTitle="";  
            this.patentOfficeId="";  
            this.patentId=0;       
          }


          selectFilePatent(event) {
            this.file = event.target.files[0] as File;
            console.log(this.file);
        
            if (this.file) {
              const fileSize = this.file.size / 1024 / 1024; // Size in MB
              const maxSize = 10; // Maximum allowed size in MB
        
              if (fileSize <= maxSize) {
                console.log(`Selected file size: ${fileSize} MB`);
              } else {
                alert("Please choose a file with file size below 10MB")
                event.target.value = '';
              }
            }
          }

          uploadFilePatent() {
            console.log(this.patPubEnable);
            
            return new Promise((resolve, reject) => {
            if (!this.file) {
              return;
            }
        
            if (this.file.type == 'application/pdf') {
              const formData = new FormData();
              formData.append('image', this.file);
              if (this.rfsId == 1) {
                this.patPdfName = this.patPdfPath.proposedFileName;
              }
              else {
                let name = this.file.name.slice(0, this.file.name.lastIndexOf('.'));
                console.log(name);
                this.patPdfName = this.userIdparam + "-" + name;
              }
        
              const uploadUrl = `${environment.nodeServerUrl}/uploadpdf?userId=${this.patPdfName}&pdfPath=${this.patPdfPath.folderPath}`;
              console.log(uploadUrl);
        
              this.http.post(uploadUrl, formData, { responseType: 'text' }).subscribe(
                (response) => {
                  alert('PDF uploaded successfully!')
                  console.log('Response:', response);
                  this.patpdfStatus = true;
                  resolve(response);
                },
                (error) => {
                  alert('Error uploading pdf');
                  console.error('Error uploading pdf:', error);
                  this.patpdfStatus = false;
                  reject(error);
                }
              );
            }
              else {
              alert("Please choose a file with file type pdf");
              this.patpdfStatus = false;
               }
             });
          }

          submitPatentDetail(){   

            if(this.patPubEnable!=undefined){

              this.service.getPatentAvailability(this.userIdparam,'M',this.patTitle,this.patAppNo,this.manualCountryCode).subscribe(x=>{
                console.log(x);
                this.checkPatAvailability=x;
                if(this.checkPatAvailability){
                  if(this.checkPatAvailability.messegeId==4){
                      if(this.patPubIndEnable=='yes'&&this.patPubEnable=='yes'&&this.file==null){                        
                        const data={
                          rfsPatentQueue: {
                            rfsPatentQueueId: 0, 
                            universityId: this.userDetail.UniversityId,
                            userId: this.userIdparam,
                            applicationNumber: this.patAppNo,   
                            patentId: this.patentId,
                            patentTitle: this.patTitle,
                            patentOfficeId:this.manualCountryCode,
                            webLink: null,
                            pdFfileLocation: null,
                            rfsTypeId: 3,
                            actionTypeId: 0,
                            remark: null,
                            workflowstatusId: 6,
                            swappedInventorUserId: 0,
                            swappedApplicantUserId: 0,
                            takenBy: 0,
                            verifiedBy: 0
                          }
                        }
                          this.service.savePatent(data,this.userIdparam,this.roleId).subscribe(x=>{
                            console.log("Data save suceessfully");
                            this.patSubmitEnable=true;
                            this.enableUnmatch=false;   
                            this.enablePatentBox = true;
                            this.enablePatentAdd = false;
                            this.enablePatentNum = false;  
                            this.patentData=[];   
                            this.patAppNo="";
                            this.patTitle="";    
                            this.patentId=0;    
                        });      
                      }
                      else if(this.patPubIndEnable=='yes'&&this.patPubEnable=='yes'&&this.file!=null){
                        this.uploadFilePatent().then(()=>{
    
                          let imgsplit = this.file.type.split("/");
                          console.log(imgsplit);
                          this.patpdfPostName = "." + imgsplit[1];
                          this.patpdfLocation = this.patPdfPath.folderPath + "\\" + this.patPdfName + this.patpdfPostName;
                          console.log(this.patpdfLocation);
                        const data={
                          rfsPatentQueue: {
                            rfsPatentQueueId: 0, 
                            universityId: this.userDetail.UniversityId,
                            userId: this.userIdparam,
                            applicationNumber: this.patAppNo,   
                            patentId: this.patentId,
                            patentTitle: this.patTitle,
                            patentOfficeId:this.manualCountryCode,
                            webLink: null,
                            pdFfileLocation: this.patpdfLocation,
                            rfsTypeId: 3,
                            actionTypeId: 0,
                            remark: null,
                            workflowstatusId: 6,
                            swappedInventorUserId: 0,
                            swappedApplicantUserId: 0,
                            takenBy: 0,
                            verifiedBy: 0
                          }
                        }
                          this.service.savePatent(data,this.userIdparam,this.roleId).subscribe(x=>{
                            console.log("Data save suceessfully");
                            this.patSubmitEnable=true;
                            this.enableUnmatch=false;   
                            this.enablePatentBox = true;
                            this.enablePatentAdd = false;
                            this.enablePatentNum = false;  
                            this.patentData=[];   
                            this.patAppNo="";
                            this.patTitle="";    
                            this.patentId=0;    
                         });      
                       });
                      }
    
                      else{
                        
                        this.uploadFilePatent().then(()=>{
                          let imgsplit = this.file.type.split("/");
                          console.log(imgsplit);
                          this.patpdfPostName = "." + imgsplit[1];
                          this.patpdfLocation = this.patPdfPath.folderPath + "\\" + this.patPdfName + this.patpdfPostName;
                          console.log(this.patpdfLocation);
                        const data={
                          rfsPatentQueue: {
                            rfsPatentQueueId: 0, 
                            universityId: this.userDetail.UniversityId,
                            userId: this.userIdparam,
                            applicationNumber: this.patAppNo,   
                            patentId: this.patentId,
                            patentTitle: this.patTitle,
                            patentOfficeId:this.manualCountryCode,
                            webLink: null,
                            pdFfileLocation: this.patpdfLocation,
                            rfsTypeId: 3,
                            actionTypeId: 0,
                            remark: null,
                            workflowstatusId: 6,
                            swappedInventorUserId: 0,
                            swappedApplicantUserId: 0,
                            takenBy: 0,
                            verifiedBy: 0
                          }
                        }
                          this.service.savePatent(data,this.userIdparam,this.roleId).subscribe(x=>{
                            console.log("Data save suceessfully");
                            this.patSubmitEnable=true;
                            this.enableUnmatch=false;   
                            this.enablePatentBox = true;
                            this.enablePatentAdd = false;
                            this.enablePatentNum = false;  
                            this.patentData=[];   
                            this.patAppNo="";
                            this.patTitle="";    
                            this.patentId=0;    
                         });      
                       });
                    }
                 }
                  else{    
                    this.enableMessage=true;
                  }
                }
              });
            }
          else{
            alert("Please answer below question before submit.")
          }
        }

        editedPubDetail(){

              this.service.getEditedPubList(this.userDetail.UniversityId, this.userIdparam,this.roleId,this.userDetail.UserId).subscribe(x=>{
                console.log(x);
                 this.editedPubList=x;
                this.collapsablesizeEditPub=this.editedPubList.length;
                this.totalPagesEditPub = Math.ceil(this.collapsablesizeEditPub / this.pageSizeEditPub);
                // Adjust Mpage to prevent it from exceeding totalpages
                this.pageEditPub = Math.max(1, Math.min(this.pageEditPub, this.totalPagesEditPub));
                // Calculate the actual startRow and endRow based on Mpage and pageSize
                this.startrowEditPub = (this.pageEditPub - 1) * this.pageSizeEditPub;
                this.endrowEditPub = Math.min(this.startrowEditPub + this.pageSizeEditPub, this.collapsablesizeEditPub);
                // Update the values used in the <h6> tag
                this.pageEditPub = this.pageEditPub;

                for (let i = 0; i < this.editedPubList.length; i++) {
                  if(this.editedPubList[i].link!=null){
                   if(this.editedPubList[i].link.length>100){
                    this.editedPubList[i].link=[this.editedPubList[i].link.slice(0, 100), " ", this.editedPubList[i].link.slice(100)].join('');
                   }
                  }
                   
                  if (this.editedPubList[i].articleType != null) {
                    this.editedPubList[i].articleType = this.editedPubList[i].articleType.toLowerCase();
                    if(this.editedPubList[i].articleType=="book chapter"){
                      this.editedPubList[i].articleType=this.editedPubList[i].articleType.replace(/\s/g, "");
                    }
                  }
        
                  if (this.editedPubList[i].technology_Areas != null) {
                    this.editedPubList[i].technology_Areas = this.editedPubList[i].technology_Areas.split(';');
                  }
                  if (this.editedPubList[i].publicationSourceDBMetrics != null) {
                    this.editedPubList[i].publicationSourceDBMetrics = this.editedPubList[i].publicationSourceDBMetrics.split(';');
                  }
                  if (this.editedPubList[i].publicationDBCitation != null) {
                    const publicationDBCitation = this.editedPubList[i].publicationDBCitation.split(';');
        
                    this.editedPubList[i].publicationDBCitation = publicationDBCitation.map(item => {
                      const [name, value] = item.split(':');
                      return { name, value };
                    });
        
                    // Assigning variable for showing values dynamically in honeycomp
                    for (let t = 0; t < this.editedPubList[i].publicationDBCitation.length; t++) {
        
                      if (this.editedPubList[i].publicationDBCitation[t].name == "SCOPUS") {
                        this.editedPubList[i].scopus = this.editedPubList[i].publicationDBCitation[t].value;
                      }
                      if (this.editedPubList[i].publicationDBCitation[t].name == "GS") {
                        this.editedPubList[i].gs = this.editedPubList[i].publicationDBCitation[t].value;
                      }
                      if (this.editedPubList[i].publicationDBCitation[t].name == "WOS") {
                        this.editedPubList[i].wos = this.editedPubList[i].publicationDBCitation[t].value;
                      }
                      if (this.editedPubList[i].publicationDBCitation[t].name == "IEEE") {
                        this.editedPubList[i].ieee = this.editedPubList[i].publicationDBCitation[t].value;
                      }
                      if (this.editedPubList[i].publicationDBCitation[t].name == "PUBMED") {
                        this.editedPubList[i].pubmed = this.editedPubList[i].publicationDBCitation[t].value;
                      }
                      if (this.editedPubList[i].publicationDBCitation[t].name == "ABDC") {
                        this.editedPubList[i].abdc = this.editedPubList[i].publicationDBCitation[t].value;
                      }
                    }
                  }
        
                  if(this.editedPubList[i].authorAffiliation!=null){
                  this.editedPubList[i].authorAffiliation = this.editedPubList[i].authorAffiliation.split('|');  
                  }

                  if(this.editedPubList[i].editorAffiliation!=null&&this.editedPubList[i].isEditedPublication=="1"){
                    this.editedPubList[i].editorAffiliation = this.editedPubList[i].editorAffiliation.split('|');  
                  }
                }
               
                //Name Filter
                this.sortitemsEditPub = this.editedPubList.publicationTitle;
                this.orderEditPub = this.sortitemsEditPub;
        
                // Apply sorting based on current sorting values
                if (this.ordervalueEditPub === 'Ascending') {
                  this.editedPubList.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
                } else if (this.ordervalueEditPub === 'Descending') {
                  this.editedPubList.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
                } else if (this.yearorderEditPub === 'Year') {
                  this.editedPubList.sort((a, b) => a.year - b.year);
                }
              });
        }

        projectDetail(){
          
          this.service.getProjectDetails(this.userDetail.UniversityId, this.userIdparam,this.roleId,this.userDetail.UserId).subscribe(x=>{
               this.projList=x;
               console.log(this.projList);

               this.collapsablesizeProj = this.projList.length;
               this.totalPagesProj = Math.ceil(this.collapsablesizeProj / this.pageSizeProj);
               // Adjust Mpage to prevent it from exceeding totalpages
               this.pageProj = Math.max(1, Math.min(this.pageProj, this.totalPagesProj));
               // Calculate the actual startRow and endRow based on Mpage and pageSize
               this.startrowProj = (this.pageProj - 1) * this.pageSizeProj;
               this.endrowProj = Math.min(this.startrowProj + this.pageSizeProj, this.collapsablesizeProj);
               // Update the values used in the <h6> tag
               this.pageProj = this.pageProj;

               for(let i=0;i<this.projList.length;i++){

                  if(this.projList[i].projectTeam!=null){
                   this.projList[i].projectTeam = this.projList[i].projectTeam.split('|');  
                  }

                  if(this.projList[i].principalInvestigator!=null){
                    this.projList[i].principalInvestigator = this.projList[i].principalInvestigator.split('|');  
                   }

                   if(this.projList[i].coInvestigator!=null){
                    this.projList[i].coInvestigator = this.projList[i].coInvestigator.split('|');  
                   }

                   if (this.projList[i].projectOutcomes != null) {
                    const projectOutcomes = this.projList[i].projectOutcomes.split(',');
        
                    this.projList[i].projectOutcomes = projectOutcomes.map(item => {
                      const [name, value] = item.split(':');
                      return { name, value };
                    });
        
                    // Assigning variable for showing values dynamically in honeycomp
                    for (let t = 0; t < this.projList[i].projectOutcomes.length; t++) {
        
                      if (this.projList[i].projectOutcomes[t].name == "Publications") {
                        this.projList[i].publication = this.projList[i].projectOutcomes[t].value;
                      }
                      if (this.projList[i].projectOutcomes[t].name == "Patent") {
                        this.projList[i].Patent = this.projList[i].projectOutcomes[t].value;
                      }
                      if (this.projList[i].projectOutcomes[t].name == "Conference") {
                        this.projList[i].Conference = this.projList[i].projectOutcomes[t].value;
                      }
                      if (this.projList[i].projectOutcomes[t].name == "Product") {
                        this.projList[i].Product = this.projList[i].projectOutcomes[t].value;
                      }
                     
                    }
                  }

                   this.projList[i].headers = [];
                   this.projList[i].values = [];
                          const cleaned = this.projList[i].grantTimeline.trim().replace(/;$/, ''); // remove trailing semicolon
                          const keyValuePairs = cleaned.split(',');

                          keyValuePairs.forEach(pair => {
                            const [key, value] = pair.split(':').map(item => item.trim());
                            if (key && value) {
                              this.projList[i].headers.push(key);
                              this.projList[i].values.push(value);
                            }
                          });

               }           
          })
          if (this.ordervalueProject === 'Ascending') {
            this.projList.sort((a, b) => (a.projectTitle > b.projectTitle) ? 1 : ((b.projectTitle > a.projectTitle) ? -1 : 0));
          } else if (this.ordervaluePatent === 'Descending') {
            this.projList.sort((a, b) => (a.projectTitle < b.projectTitle) ? 1 : ((b.projectTitle < a.projectTitle) ? -1 : 0));
          }   

        }


        copyrightDetail(){

          this.service.getCopyrightList(this.userDetail.UniversityId, this.userIdparam,this.userDetail.UserId,this.roleId).subscribe(x=>{
            console.log(x);
            this.cpyRightList=x;
            this.collapsablesizeCpy = this.cpyRightList.length;
            this.totalPagesCpy = Math.ceil(this.collapsablesizeCpy / this.pageSizeCpy);
            // Adjust Mpage to prevent it from exceeding totalpages
            this.pageCpy = Math.max(1, Math.min(this.pageCpy, this.totalPagesCpy));
            // Calculate the actual startRow and endRow based on Mpage and pageSize
            this.startrowCpy = (this.pageCpy - 1) * this.pageSizeCpy;
            this.endrowCpy = Math.min(this.startrowCpy + this.pageSizePat, this.collapsablesizeCpy);
            // Update the values used in the <h6> tag
            this.pageCpy = this.pageCpy;
        
            for(let i=0;i<this.cpyRightList.length;i++){

              if(this.cpyRightList[i].applicantAffiliation!=null){
                this.cpyRightList[i].applicantAffiliation = this.cpyRightList[i].applicantAffiliation.split('|');  
                }
              if(this.cpyRightList[i].inventorAffiliation!=null){
                  this.cpyRightList[i].inventorAffiliation = this.cpyRightList[i].inventorAffiliation.split('|');  
                  }
              if(this.cpyRightList[i].filingDate!=null){
                this.cpyRightList[i].filingDate=this.cpyRightList[i].filingDate.split(' ')[0];
                }
              if(this.cpyRightList[i].rocDate!=null){
                  this.cpyRightList[i].rocDate=this.cpyRightList[i].rocDate.split(' ')[0];
                }
              
                }
              });
                if (this.ordervalueCpy === 'Ascending') {
                  this.cpyRightList.sort((a, b) => (a.copyrightTitle > b.copyrightTitle) ? 1 : ((b.copyrightTitle > a.copyrightTitle) ? -1 : 0));
                } else if (this.ordervalueCpy === 'Descending') {
                  this.cpyRightList.sort((a, b) => (a.copyrightTitle < b.copyrightTitle) ? 1 : ((b.copyrightTitle < a.copyrightTitle) ? -1 : 0));
                }   

        }

        changesOrderCpy(values) {
          console.log(values);
          this.ordervalueCpy = values;
          if (values == 'Ascending') {
            this.cpyRightList.sort((a, b) => (a.copyrightTitle > b.copyrightTitle) ? 1 : ((b.copyrightTitle > a.copyrightTitle) ? -1 : 0));
          }
          if (values == 'Descending') {
            this.cpyRightList.sort((a, b) => (a.copyrightTitle < b.copyrightTitle) ? 1 : ((b.copyrightTitle < a.copyrightTitle) ? -1 : 0));
          }
        }

        GetDesignpatents(){

          this.service.getdesignPatentDetailList(this.userDetail.UniversityId, this.userIdparam,this.userDetail.UserId,this.roleId).subscribe(x=>{
          console.log(x);
          this.dataList=x;
          this.collapsablesizedesignPat = this.dataList.length;
          this.totalPagesdesignPat = Math.ceil(this.collapsablesizedesignPat / this.pageSizedesignPat);
          // Adjust Mpage to prevent it from exceeding totalpages
          this.pagedesignPat = Math.max(1, Math.min(this.pagedesignPat, this.totalPagesdesignPat));
          // Calculate the actual startRow and endRow based on Mpage and pageSize
          this.startrowdesignPat = (this.pagedesignPat - 1) * this.pageSizedesignPat;
          this.endrowdesignPat = Math.min(this.startrowdesignPat + this.pageSizedesignPat, this.collapsablesizedesignPat);
         
          this.pagedesignPat = this.pagedesignPat;
      
              for(let i=0;i<this.dataList.length;i++){

                             if(this.dataList[i].applicantAffiliation!=null){
                               this.dataList[i].applicantAffiliation = this.dataList[i].applicantAffiliation.split('|');  
                               }

                             if(this.dataList[i].filingDate!=null){
                               this.dataList[i].filingDate=this.dataList[i].filingDate.split(' ')[0];
                               }

                             if(this.dataList[i].acceptedDate!=null){
                                 this.dataList[i].acceptedDate=this.dataList[i].acceptedDate.split(' ')[0];
                               }

                             if(this.dataList[i].renewalDate!=null){
                                this.dataList[i].renewalDate=this.dataList[i].renewalDate.split(' ')[0];
                               }

                               if (this.dataList[i].designPatentStageLifeCycle != null) {
                                 const designPatentStageLifeCycle = this.dataList[i].designPatentStageLifeCycle.split(',');
                       
                                 this.dataList[i].designPatentStageLifeCycle = designPatentStageLifeCycle.map(item => {
                                   const [name, value] = item.split(':');
                                   return { name, value };
                                 });
                       
                                 // Assigning variable for showing values dynamically in honeycomp
                                 for (let t = 0; t < this.dataList[i].designPatentStageLifeCycle.length; t++) {
                       
                                   if (this.dataList[i].designPatentStageLifeCycle[t].name == "Filed") {
                                     this.dataList[i].filed = this.dataList[i].designPatentStageLifeCycle[t].value;
                                   }
                                   if (this.dataList[i].designPatentStageLifeCycle[t].name == "Accepted") {
                                     this.dataList[i].Accepted = this.dataList[i].designPatentStageLifeCycle[t].value;
                                   }
                               
                         
                                   }
                                 }
 
                                 if(this.dataList[i].designPatentImagePath!=null||this.dataList[i].designPatentImagePath!=""){

                                      const tradeImgLoc: string[] = this.dataList[i].designPatentImagePath;
                                      let imageUrl = `${environment.nodeServerUrl}/getImage?userImage=${tradeImgLoc}`;
                                      
                                      if(tradeImgLoc!=null){
                                      this.http.get(imageUrl, { responseType: 'text' }).subscribe(
                                        (response) => {
                                            this.dataList[i].designPatentImagePath = imageUrl; // Update the imgUrl with the fetched image URL
                                            this.dataList[i].enabledesignImage=true;
                                        },
                                        (error) => {
                                            this.dataList[i].enabledesignImage=false;
                                            
                                        });
                                      }
                                    }
                                  else{
                                        this.dataList[i].enabledesignImage=false;
                                  }

                  }
             
              //Name Filter
              this.sortitems = this.dataList.designPatentTitle;
              this.order = this.sortitems;
      
              // Apply sorting based on current sorting values
             if (this.ordervalue === 'Ascending') {
                               this.dataList.sort((a, b) => (a.designPatentTitle > b.designPatentTitle) ? 1 : ((b.designPatentTitle > a.designPatentTitle) ? -1 : 0));
                             } else if (this.ordervalue === 'Descending') {
                               this.dataList.sort((a, b) => (a.designPatentTitle < b.designPatentTitle) ? 1 : ((b.designPatentTitle < a.designPatentTitle) ? -1 : 0));
                             }     
            });
        
      }
              showChartdesignPatents() {
                    this.enableChartdesignPat = !this.enableChartdesignPat;
                    console.log('Chart visibility toggled:', this.enableChartdesignPat);
               }


      changesOrderdesignPatent(values) {
        console.log(values);
        this.ordervaluedesignPatent = values;
       if (this.ordervalue === 'Ascending') {
                               this.dataList.sort((a, b) => (a.designPatentTitle > b.designPatentTitle) ? 1 : ((b.designPatentTitle > a.designPatentTitle) ? -1 : 0));
                             } else if (this.ordervalue === 'Descending') {
                               this.dataList.sort((a, b) => (a.designPatentTitle < b.designPatentTitle) ? 1 : ((b.designPatentTitle < a.designPatentTitle) ? -1 : 0));
                             }
      }

      onViewChangedesignPatent(event: any) {
          const viewValue = event.target.value;
          this.selectedViewPatent = viewValue;
          this.updateSelectedSchemeDP(viewValue);
         
        }
            
              onPageSizeChangedesignPatent(size: string) {
              this.pagedesignPat = 1;
              this.pageSizedesignPat = Number(size);
              this.endrowdesignPat = this.pageSizedesignPat + this.startrowdesignPat;
              // Apply sorting based on current sorting values
            if (this.ordervalue === 'Ascending') {
                                    this.dataList.sort((a, b) => (a.designPatentTitle > b.designPatentTitle) ? 1 : ((b.designPatentTitle > a.designPatentTitle) ? -1 : 0));
                                  } else if (this.ordervalue === 'Descending') {
                                    this.dataList.sort((a, b) => (a.designPatentTitle < b.designPatentTitle) ? 1 : ((b.designPatentTitle < a.designPatentTitle) ? -1 : 0));
                                  }
              // detailed or compact for the article
              this.pageview = true;
            
              this.GetDesignpatents();
            }
       
         toggleDropdown() {
          this.isDropdownOpen = !this.isDropdownOpen;
        }

                onPageChangedesignPatent(page: number) {
                this.pagedesignPat = Math.max(1, Math.min(page, this.totalPagesdesignPat));
              
                if (this.pagedesignPat == 1) {
                  this.startrowdesignPat = 0;
                } else {
                  this.startrowdesignPat = (this.pagedesignPat - 1) * this.pageSizedesignPat;
                }
                this.endrowdesignPat = Math.min(this.startrowdesignPat + this.pageSizedesignPat, this.collapsablesizedesignPat);
                // Apply sorting based on current sorting values
                if (this.ordervalue === 'Ascending') {
                                      this.dataList.sort((a, b) => (a.designPatentTitle > b.designPatentTitle) ? 1 : ((b.designPatentTitle > a.designPatentTitle) ? -1 : 0));
                                    } else if (this.ordervalue === 'Descending') {
                                      this.dataList.sort((a, b) => (a.designPatentTitle < b.designPatentTitle) ? 1 : ((b.designPatentTitle < a.designPatentTitle) ? -1 : 0));
                                    }
                // detailed or compact for the article
                this.pageview = true;
              
                this.GetDesignpatents();
              }
      
            getTrademarkDetail(){

              this.service.getTrademarkDetailList(this.userDetail.UniversityId, this.userIdparam,this.userDetail.UserId,this.roleId).subscribe(x=>{
                this.tradeList=x;
                console.log(this.tradeList);
 
                this.collapsablesizeTm = this.tradeList.length;
                this.totalPagesTm = Math.ceil(this.collapsablesizeTm / this.pageSizeProj);
                // Adjust Mpage to prevent it from exceeding totalpages
                this.pageTm = Math.max(1, Math.min(this.pageTm, this.totalPagesTm));
                // Calculate the actual startRow and endRow based on Mpage and pageSize
                this.startrowTm = (this.pageTm - 1) * this.pageSizeTm;
                this.endrowTm = Math.min(this.startrowTm + this.pageSizeTm, this.collapsablesizeTm);
                // Update the values used in the <h6> tag
                this.pageTm = this.pageTm;
 
                for(let i=0;i<this.tradeList.length;i++){

                  if(this.tradeList[i].applicantAffiliation!=null){
                    this.tradeList[i].applicantAffiliation = this.tradeList[i].applicantAffiliation.split('|');  
                    }

                  if(this.tradeList[i].filingDate!=null){
                    this.tradeList[i].filingDate=this.tradeList[i].filingDate.split(' ')[0];
                    }
                  if(this.tradeList[i].registeredDate!=null){
                      this.tradeList[i].registeredDate=this.tradeList[i].registeredDate.split(' ')[0];
                    }
                  if(this.tradeList[i].expiryDate!=null){
                     this.tradeList[i].expiryDate=this.tradeList[i].expiryDate.split(' ')[0];
                    }

                    if (this.tradeList[i].trademarkStageLifeCycle != null) {
                      const trademarkStageLifeCycle = this.tradeList[i].trademarkStageLifeCycle.split(',');
            
                      this.tradeList[i].trademarkStageLifeCycle = trademarkStageLifeCycle.map(item => {
                        const [name, value] = item.split(':');
                        return { name, value };
                      });
            
                      // Assigning variable for showing values dynamically in honeycomp
                      for (let t = 0; t < this.tradeList[i].trademarkStageLifeCycle.length; t++) {
            
                            if (this.tradeList[i].trademarkStageLifeCycle[t].name == "Filed") {
                              this.tradeList[i].filed = this.tradeList[i].trademarkStageLifeCycle[t].value;
                            }
                            if (this.tradeList[i].trademarkStageLifeCycle[t].name == "Examined") {
                              this.tradeList[i].Examined = this.tradeList[i].trademarkStageLifeCycle[t].value;
                            }    
                            if (this.tradeList[i].trademarkStageLifeCycle[t].name == "Registered") {
                              this.tradeList[i].Registered = this.tradeList[i].trademarkStageLifeCycle[t].value;
                            }
                            if (this.tradeList[i].trademarkStageLifeCycle[t].name == "Expired") {
                              this.tradeList[i].Expired = this.tradeList[i].trademarkStageLifeCycle[t].value;
                            }
                         }
                      }

                      if(this.tradeList[i].trademarkImagePath!=null||this.tradeList[i].trademarkImagePath!=""){

                        const tradeImgLoc: string[] = this.tradeList[i].trademarkImagePath;
                        let imageUrl = `${environment.nodeServerUrl}/getImage?userImage=${tradeImgLoc}`;

                        if(tradeImgLoc!=null){
                          this.http.get(imageUrl, { responseType: 'text' }).subscribe(
                            (response) => {
                                this.tradeList[i].trademarkImagePath = imageUrl; // Update the imgUrl with the fetched image URL
                                this.tradeList[i].enableTradeImage=true;
                            },
                            (error) => {
                                this.tradeList[i].enableTradeImage=false;
                            });
                        }
                      }
                      else{
                        this.tradeList[i].enableTradeImage=false;
                      }

                   }         
             })

           if (this.ordervalueTM === 'Ascending') {
             this.tradeList.sort((a, b) => (a.trademarkTitle > b.trademarkTitle) ? 1 : ((b.trademarkTitle > a.trademarkTitle) ? -1 : 0));
           } else if (this.ordervalueTM === 'Descending') {
             this.tradeList.sort((a, b) => (a.trademarkTitle < b.trademarkTitle) ? 1 : ((b.trademarkTitle < a.trademarkTitle) ? -1 : 0));
           }   

        }

        changesOrderTm(values) {
          console.log(values);
          this.ordervalueTM = values;
          if (values == 'Ascending') {
            this.tradeList.sort((a, b) => (a.trademarkTitle > b.trademarkTitle) ? 1 : ((b.trademarkTitle > a.trademarkTitle) ? -1 : 0));
          }
          if (values == 'Descending') {
            this.tradeList.sort((a, b) => (a.trademarkTitle < b.trademarkTitle) ? 1 : ((b.trademarkTitle < a.trademarkTitle) ? -1 : 0));
          }
        }

        onViewChangeTm(event: any) {
          const viewValue = event.target.value;
          this.selectedViewTM = viewValue;
          this.updateSelectedSchemeTM(viewValue);
        }

        selectedSchemeTM = 'compact';
        updateSelectedSchemeTM(viewValue: string) {
          const elements = document.getElementsByTagName('article');
      
          for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove(this.selectedSchemeTM);
            elements[i].classList.add(viewValue);
          }
      
          this.selectedSchemeTM = viewValue;
        }

        onPageSizeChangeTM(size: string) {
          this.pageTm = 1;
          this.pageSizeTm = Number(size);
          this.endrowTm = this.pageSizeTm + this.startrowTm;
      
          // detailed or compact for the article
          this.pageview = true;
          const viewValue = this.selectedSchemeTM === 'compact' ? 'compact' : 'detailed';
          this.updateSelectedSchemeTM(viewValue);
          this.getTrademarkDetail();
      
        }
         

        onPageChangeTM(page: number) {
          this.pageTm = Math.max(1, Math.min(page, this.totalPagesTm));
        
          if (this.pageTm == 1) {
            this.startrowTm = 0;
          } else {
            this.startrowTm = (this.pageTm - 1) * this.pageSizeTm;
          }
          this.endrowTm = Math.min(this.startrowTm + this.pageSizeTm, this.collapsablesizeTm);
          // Apply sorting based on current sorting values
          if (this.ordervalueTM === 'Ascending') {
                this.tradeList.sort((a, b) => (a.trademarkTitle > b.trademarkTitle) ? 1 : ((b.trademarkTitle > a.trademarkTitle) ? -1 : 0));
             } else if (this.ordervalueTM === 'Descending') {
                 this.tradeList.sort((a, b) => (a.trademarkTitle < b.trademarkTitle) ? 1 : ((b.trademarkTitle < a.trademarkTitle) ? -1 : 0));
            }
          // detailed or compact for the article
          this.pageview = true;
        
          this.getTrademarkDetail();
        }

        showChartTM() {
          this.enableChartTM = !this.enableChartTM;
          console.log('Chart visibility toggled:', this.enableChartTM);
        }


        // Number to word in rupees
        onAmountChange() {
              if(this.projectBasicDl.projectSanctionedAmount>0){
              const num = parseFloat(this.projectBasicDl.projectSanctionedAmount.toString());
                    if (!isNaN(num)) {
                      this.projectBasicDl.projectSanctionedAmountInWords = this.numtoWords.convertToRupeesWords(num);
                    } else {
                      this.projectBasicDl.projectSanctionedAmountInWords = '';
                    }
                   }
                    else{
                      this.projectBasicDl.projectSanctionedAmountInWords = ''
                    }
             }

             addTag(tag?: string) {
              const tagToAdd = tag ? tag : this.newTag.trim();
              if (tagToAdd && !this.tags.includes(tagToAdd)) {
                this.tags.push(tagToAdd);
                this.researchArea=this.tags.toString();   
                console.log(this.researchArea);
                    
              }
              this.newTag = '';
            }

            onResearcher(data){    
              if(data==""||data==null){
                this.researchDrop=false;    
               }
               else{
              this.researchname=this.researchList.filter(e =>
                e.value.toLowerCase().includes(data.toLowerCase()));
                this.researchDrop=true;
              }
            }

            onInputTag(value){  
              this.researchDrop=false;     
              this.tags.push(value);
              if(this.tags.length==1){
                this.researchArea=this.tags[0];
              }
              else{
              this.researchArea=this.tags.join(',');
              }     
            }

            removeTag(tag: string) {
              const index = this.tags.indexOf(tag);
              if (index !== -1) {
                this.tags.splice(index, 1);
                this.researchArea=this.tags.toString();
              }
            }

            selectFileProject(event){
              this.fileProj = event.target.files[0] as File;
              console.log(this.fileProj);
          
              if (this.fileProj) {
                const fileSize = this.fileProj.size / 1024 / 1024; // Size in MB
                const maxSize = 10; // Maximum allowed size in MB
          
                if (fileSize <= maxSize) {
                  console.log(`Selected file size: ${fileSize} MB`);
                } else {
                  alert("Please choose a file with file size below 10MB")
                  event.target.value = '';
                }
              }
  
            }
  
            uploadFileProject() {
              
              return new Promise((resolve, reject) => {
              if (!this.fileProj) {
                return;
              }
          
              if (this.fileProj.type == 'application/pdf') {
                const formData = new FormData();
                formData.append('image', this.fileProj);

                  let name = this.fileProj.name.slice(0, this.fileProj.name.lastIndexOf('.'));
                  console.log(name);
                  this.projectPdfName = this.userIdparam + "-" + name;
          
                const uploadUrl = `${environment.nodeServerUrl}/uploadpdf?userId=${this.projectPdfName}&pdfPath=${this.projectPdfPath.folderPath}`;
                console.log(uploadUrl);
          
                this.http.post(uploadUrl, formData, { responseType: 'text' }).subscribe(
                  (response) => {
                    alert('PDF uploaded successfully!')
                    console.log('Response:', response);
                    this.projectpdfStatus = true;
                    resolve(response);
                  },
                  (error) => {
                    alert('Error uploading pdf');
                    console.error('Error uploading pdf:', error);
                    this.projectpdfStatus = false;
                    reject(error);
                  }
                );
              }
                else {
                alert("Please choose a file with file type pdf");
                this.projectpdfStatus = false;
                 }
               });
            }

            saveProjectDetail(){

                          if(this.projectBasicDl.projectFundingTypeName==""||this.projectBasicDl.projectFundingTypeName==null||this.projectBasicDl.projectFundingTypeName==undefined){
                              alert("Please select Funding Type")
                            return;
                          }

                          if(this.projectBasicDl.projectFundingAgencyName==""||this.projectBasicDl.projectFundingAgencyName==null||this.projectBasicDl.projectFundingAgencyName==undefined){
                            alert("Please select Funding Agency")
                            return;
                          }

                          if(this.projectBasicDl.projectFundingAgencyTypeName==""||this.projectBasicDl.projectFundingAgencyTypeName==null||this.projectBasicDl.projectFundingAgencyTypeName==undefined){
                            alert("Please select Agency Type")
                            return;
                          }

                          if(this.projectBasicDl.projectTitle==""||this.projectBasicDl.projectTitle==null||this.projectBasicDl.projectTitle==undefined){
                            alert("Please enter the Project Title")
                            return;
                          }

                          if(this.projectBasicDl.projectDescription==""||this.projectBasicDl.projectDescription==null||this.projectBasicDl.projectDescription==undefined){
                            alert("Please enter the Project Description")
                            return;
                          }

                          if(this.projectBasicDl.projectSanctionedAmount==0||this.projectBasicDl.projectSanctionedAmount==null||this.projectBasicDl.projectSanctionedAmount==undefined){
                            alert("Please enter the Sanctioned Amount")
                            return;
                          }

                          if(this.projectBasicDl.projectStartDate==""||this.projectBasicDl.projectStartDate==null||this.projectBasicDl.projectStartDate==undefined){
                            alert("Please select project start date")
                            return;
                          }

                          if(this.projectBasicDl.projectEndDate==""||this.projectBasicDl.projectEndDate==null||this.projectBasicDl.projectEndDate==undefined){
                            alert("Please select project end date")
                            return;
                          }

                          if(this.projectBasicDl.projectStatusName==""||this.projectBasicDl.projectStatusName==null||this.projectBasicDl.projectStatusName==undefined){
                            alert("Please select status")
                            return;
                          }

                          if(this.projectBasicDl.projectCompletionDate==""||this.projectBasicDl.projectCompletionDate==null||this.projectBasicDl.projectCompletionDate==undefined){
                            alert("Please select completion date")
                            return;
                          }

                      // this.uploadFileProject().then(()=>{
                            // let imgsplit = this.fileProj.type.split("/");
                            // console.log(imgsplit);
                            // this.projectpdfPostName = "." + imgsplit[1];
                            // this.projectpdfLocation = this.projectPdfPath.folderPath + "\\" + this.projectPdfName + this.projectpdfPostName;
                            this.projectBasicDl.projectSanctionedDocPath=null;
                            this.projectBasicDl.projectTechnologyAreas=this.researchArea;

                             if(this.projectUnivId!=null||this.projectUnivId!=undefined){
                              this.projectBasicDl.sourceUniversityId=parseInt(this.projectUnivId);
                             }
                             else{
                              this.projectBasicDl.sourceUniversityId=parseInt(this.userDetail.UniversityId);
                             }
                             
                            const data={
                                  projectBasicDetail: this.projectBasicDl,
                                  projectGrantDisbursement: [],
                                  projectInvestigators: [],
                                  projectOutcome: []
                            }

                            console.log(data);
                          
                          this.service.addNewProject(data,this.userIdparam,this.roleId).subscribe(x=>{
                            console.log("Data save suceessfully");
                            this.projectSubmitEnable=true;
                            this.enableProjectAdd=false;   
                            this.enableProjectNew = true;
                            this.enableProjectNum = false; 
                          });      
                    // });
            }

            doneProject(){
              this.projectSubmitEnable=false;
              this.enableProjectAdd=false;   
              this.enableProjectNew = false;
              this.enableProjectNum = false; 
    
            }
  
            toEditProject(id){
               this.routes.navigate(['/Project/user/details/edit/'+id]);
            }

      }
      
