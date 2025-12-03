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
import { NumencoderService } from 'src/app/shared/services/numencoder.service';

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
  ordervalue: any;
  ordervaluePatent:any;
  yearorder: any;
  universityShortName: string;
  pdfStatus: boolean = false;
  enablePic: boolean=false;
  project: boolean=true;
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
  constructor(private route: ActivatedRoute, private service: FacultiesService, private modalService: NgbModal,
    private menuService: MenuService, private search: CommonsearchService, private http: HttpClient,
    private routes: Router, private authservice: AuthService, private zone: NgZone,
    private renderer: Renderer2, private el: ElementRef, private encoderService: NumencoderService) {
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
  articlecount: any;
  imageSrc: any;
  articleUrl: any;
  orderSort = ['Ascending', 'Descending'];
  ascendValue = 'Descending';
  yearSort = ['Year', 'Month', 'Day']
  yearValue = 'Year';
  page: number = 1;
  queueId: Number = 0;
  pageSize = 20;
  pageSizecount = ["10", "20", "30", "40"];
  pageSizecountPat = ["10", "20", "30", "40"];
  pageSizePat=20;
  pagePat:number=1;
  collapsablesize: any;
  collapsablesizePat:any;
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
  readOnly: boolean = false;
  noDOI: boolean = false;
  rfsId: any;
  tech: any;
  rows = [];
  row = [];
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
  showDropdown = false;
  name = [];
  userDetail: any;
  roleId: Number;
  //add new
  enableBox: boolean = false;
  EnableDoi: boolean = false;
  enableAdd: boolean = false;
  enableUnmatch: boolean = false;
  enableChart: boolean = true;
  enableChartPat:boolean = false;
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
  totalPagesPat:number;
  startrow: number = 0;
  endrow: number = 20;
  startrowPat:number=0;
  endrowPat:number=20;
  viewarticle: any;
  userIdparam: any;
  updateview: any;
  pageview: boolean = false;
  views: any;
  selectedView: string = 'compact';
  selectedViewPatent:string= 'compact';
  publication:boolean=false;
  patent:boolean=false;
  hoverMessage: string = '';
  patentList:any;
  enableModule:string;
  subscribtionList:any;
  enableScore:boolean=false;
  requesturl: string; 
  searchQuery:string;
  checkRole:string;
  enbleAddNew:boolean=false;
  univId:any;
  moduleList:any;

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
    this.univId=parseInt(localStorage.getItem('initialUniv'))
    // this.authservice.RoleSelection(this.univId, this.userDetail.UserId).subscribe(x => {
    //   this.role = x;
    //   const data = this.role.filter(item => item.roleId == this.roleId);
    //   this.roleName = data[0].roleName;
    // });
    // this.service.getUnivSubscriptionModule(this.univId).subscribe(x=>{
    //     this.subscribtionList=x;
    //     const subList=this.subscribtionList.filter(x=>x.subscriptionModule=="Scorebook");
    //     console.log(subList);
    //     if(subList.length>0){
    //        this.enableScore=true;
    //     }
    //     else{
    //       this.enableScore=false;
    //     }
        
    // })

    this.route.params.subscribe(params => {
      //Profile API
      this.userIdparam = this.encoderService.decodeNumber(params.id);
      console.log(this.userIdparam);

      if(this.roleId==17){
        this.enbleAddNew=true;
      }
      else if(this.roleId==2){
           if(this.userIdparam === this.userDetail.UserId){
            this.enbleAddNew=true;
           }
      }
      this.service.GetBasicProfile(this.univId, this.userIdparam).subscribe((x: HttpResponse<any>)  => {
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
            this.faculty.profileFileName="/"+this.faculty.profileFileName;
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
      this.service.GetResearcherDocumentCounts(this.univId, this.userIdparam).subscribe(x => {
        this.docCount = x;  this.service.getUnivCheckModule(this.userDetail.UniversityId).subscribe(t=>{  
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
   
  }

  GetPublication() {

    //Publication API
    this.service.researcherPublicationDetails(this.univId, this.userIdparam).subscribe
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
              if (this.pubdetails[i].publicationDBCitation[t].name == "ABDC") {
                this.pubdetails[i].abdc = this.pubdetails[i].publicationDBCitation[t].value;
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
    this.service.pubValidation(pubId, this.userIdparam, '1').subscribe(res => {
      this.service.researcherPublicationDetails(this.univId, this.userIdparam).subscribe(x => {

      })
    });
  }

  confirm(pubId) {
    this.service.pubValidation(pubId, this.userIdparam, '0').subscribe(x => {
      this.service.researcherPublicationDetails(this.univId, this.userIdparam).subscribe(x => {
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

  enableDoi() {
    this.enableBox = true;
    this.enableAdd = false;
    this.EnableDoi = true;
    this.service.GetPath(this.univId, this.userIdparam, '2').subscribe(x => {
      this.pdfPath = x;
      console.log(this.pdfPath);
    })
  }

  //search record for rfs by doi or title
  searchMatch() {
    this.searchRfs();
    this.enableBox = true;
    this.enableAdd = false;
    this.EnableDoi = false;
    this.enableUnmatch = true;
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
          universityId: this.univId,
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
          this.service.SaveRFS(this.userIdparam, this.roleId, data).subscribe(x => {
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
          this.service.SaveRFS(this.userIdparam, this.roleId, data).subscribe(x => {
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
            universityId: this.univId,
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

        this.service.SaveRFS(this.userIdparam, this.roleId, data).subscribe(x => {
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

  //validate
  openbox(pubId) {
    this.pubID = pubId
    if (this.roleId != 6) {
      this.openvalidate = true;
      this.validateapprove = true;
      this.done = false;
      this.validatedeny = false;
      this.validateyesno = false;
    }
  }

  deletebox() {
    this.openvalidate = true;
    this.validateapprove = false;
    this.validatedeny = false;
    this.done = false;
    this.validateyesno = true;

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

  approvebox(pubid) {
    console.log(this.pubID);
    this.openvalidate = true;
    this.validateapprove = false;
    this.validateyesno = false;
    this.validatedeny = false;
    this.done = true;
    this.verified(this.pubID);

  }

  donebox() {
    this.openvalidate = false;
    this.done = false;
    location.reload();
  }
  closebox() {
    this.openvalidate = false;
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

  onSelectTitle(val) {
    this.searchData = val;
    console.log(this.searchData);
    this.titleEnable = false;
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
    this.service.getArticlechart(this.userIdparam, this.univId).subscribe(
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

  // ngOnDestroy() {
  //   // Clean up chart when the component is removed
  //   this.browserOnly(() => {
  //     if (this.chart) {
  //       this.chart.dispose();
  //     }
  //   });
  // }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        try {
          this.chart.dispose();
          this.chart = undefined; // Set chart to undefined after disposal
        } catch (error) {
          console.error("Error disposing chart:", error);
        }
      }
    });
  }

  affilliationPieChart() {
    const container = am4core.create('chartContainer', am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);

    const chart = container.createChild(am4charts.PieChart);

    chart.data = []; // Your data array goes here

    this.service.getAffiliationchart(this.userIdparam, this.univId).subscribe(
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
    this.service.getDatabasechart(this.userIdparam,this.univId).subscribe(
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
    this.routes.navigate(['/facultyProfiles/edit/screen/edit',this.univId,this.userDetail.UserId]);
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
      this.service.GetPath(this.univId, this.userIdparam, '4').subscribe(x => {
        this.pdfPath = x;
        console.log(this.pdfPath);    
      })
     })
  }
  updatebox(){
//     if(this.pdfconfirmation==false){
//       this.uploaddropFile().then(()=>{
//         if(!this.pdfStatus&&this.pdfEnable){
//         }
//         else{
//         if(this.dropfile){
         
        
//           this.pdfPostName="-"+this.file.name;
        
//           this.pdfLocation=this.pdfPath.folderPath+"\\"+this.userDetail.UserId+this.pdfPostName;
//           console.log(this.pdfLocation);
      
//          }
//          else{
//           this.pdfLocation=this.publevel.pubUserPDFLocation;
        
//          }
        
//     this.service.updatedropbox(this.publevel,this.userid,this.roleId).subscribe((Response)=>{
//       console.log("Updatedropbox",Response);
//       console.log(this.publevel.pubUserPDFLocation);
      
//       if(this.confirm){
//         alert("Update Sucessfully!");
//         this.opendropBoxEnable=false;
//       }
      
//     },
//   (Error)=>{
//     console.error("Error",Error);
//   })
  
// }
//     })
    
//   }
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
            //this.pdfLocation = this.publevel.pubUserPDFLocation;
          } else {
            this.publevel.pubUserPDFLocation = this.pdfLocation;
          }
        }
        console.log(this.publevel.pubUserPDFLocation);
        // rfsPublicationQueueId: this.queueId,
        // rfsPublicationLinkRequestId: 0,
        // universityId: parseInt(this.user.UniversityId),
        // userId: parseInt(this.user.UserId),
        // publicationId: this.publicationId,
        // publicationTitle: this.title,

        // const data = {
        //   publicationId: this.publevel.publicationId,
        //   userId: this.userDetail.UserId,
        //   scopusEID: this.publevel.scopusEID,
        //   wosAcessionID: this.publevel.wosAcessionID,
        //   pubMEDId: this.publevel.pubMEDId,
        //   pubUserPDFLocation: this.pdfLocation,
        //   isPubUserFileUploaded: this.publevel.isPubUserFileUploaded
        // };
        
        this.service.updatedropbox(this.publevel, this.userid, this.roleId,this.univId).subscribe(
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
  // } else  {
  //   this.pdfLocation = this.publevel.pubUserPDFLocation;

  //   this.service.updatedropbox(this.publevel, this.userid, this.roleId).subscribe(
  //     (response) => {
  //       console.log("Updatedropbox", response);
  //       console.log(this.publevel.pubUserPDFLocation);

  //       if (this.confirm) {
  //         alert("Update Successfully!");
  //         this.opendropBoxEnable = false;
  //         //window.location.reload();
  //       }
  //     },
  //     (error) => {
  //       console.error("Error", error);
  //     }
  //   );
  // }
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
    //this.pdfLocation=this.publevel.pubUserPDFLocation
  
   }
   console.log(this.pdfLocation);    
   this.service.updatedropbox(this.publevel, this.userid, this.roleId,this.univId).subscribe(
        (response) => {
          console.log("Updatedropbox", response);
          console.log(this.publevel.pubUserPDFLocation);
  
          if (this.confirm) {
            alert("Update Successfully!");
            this.opendropBoxEnable = false;
            //window.location.reload();
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
    //window.location.reload();
  }

  openDropBoxPub(){
    this.opendropBoxEnablePub=true;
  }

  closeDropboxPub(){
    this.opendropBoxEnablePub=false;
  }

  toScorebook(module:string,count:number){
    if(count>0){
      console.log("project",module);
      this.enableModule=module;
      if(module=="Projects"){
        this.hoverMessage = 'The module to be enabled soon';
      // this.project=false;
      // this.publication=true;
      // this.patent=false;
     }
     else if(module=="Publications"){
      this.hoverMessage = '';
      this.project=true;
      this.patent=false;
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
      this.hoverMessage ='';
     }
     else{
      this.hoverMessage = '';
     }
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

  onViewChangePatent(event: any) {
    const viewValue = event.target.value;
    this.selectedViewPatent = viewValue;
    this.updateSelectedScheme(viewValue);
  }

  opencitePatent(showModalPatent) {
    console.log('dialogbox button opened!');
    this.modalService.open(showModalPatent);
  }

 patentDetail(){
  this.service.getPatentDetailList(this.univId, this.userIdparam).subscribe(x=>{
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

onPageSizeChangePatent(size: string) {
  this.pagePat = 1;
  this.pageSizePat = Number(size);
  this.endrowPat = this.pageSizePat + this.startrowPat;
  // Apply sorting based on current sorting values
  if (this.ordervaluePatent === 'Ascending') {
    this.patentList.sort((a, b) => (a.patentTitle > b.patentTitle) ? 1 : ((b.patentTitle > a.patentTitle) ? -1 : 0));
  } else if (this.ordervalue === 'Descending') {
    this.patentList.sort((a, b) => (a.patentTitle < b.patentTitle) ? 1 : ((b.patentTitle < a.patentTitle) ? -1 : 0));
  } 
  // detailed or compact for the article
  this.pageview = true;
  const viewValue = this.selectedSchemePatent === 'compact' ? 'compact' : 'detailed';
  this.updateSelectedSchemePatent(viewValue);
  this.patentDetail();
}

showChartPatents() {
  this.enableChartPat = !this.enableChartPat;
  console.log('Chart visibility toggled:', this.enableChartPat);
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
          
          

}
