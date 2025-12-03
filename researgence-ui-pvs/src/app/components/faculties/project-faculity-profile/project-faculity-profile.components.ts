
import { Component, ElementRef, HostListener, Input, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FacultiesService } from '../faculties.service'
import { switchMap } from 'rxjs/operators';
import { DocCount, FacultyList, DataModels, Article, Faculty } from '../../../shared/model/data.models';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { isPlatformBrowser } from '@angular/common';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Chart } from 'chart.js';
import { AnyObject } from 'chart.js/types/basic';
import * as am5 from "@amcharts/amcharts5"; 
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";



@Component({
  selector: '',
  templateUrl: './project-faculity-profile.components.html',
  styleUrls: ['./../../../../assets/given/selected.css', './../../../../assets/given/css/style-vit1.css', './../../../../assets/given/css/style-vit2.css', './../../../../assets/given/newcss/style.css', './../../../../assets/given/newcss/bootstrap.min.css'],

})
export class ProjectFaculityProfileComponent implements OnInit {
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
  yearorder: any;
  universityShortName: string;
  pdfStatus: boolean = false;
  enablePic: boolean=false;

  constructor( private zone: NgZone) {
  }
  opendropBoxEnable:boolean=false;
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
  collapsablesize: any;
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
    '/assets/given/facultyimagestmp/ISC001.jpg',
    '/assets/given/facultyimagestmp/ISC002.jpg',
    '/assets/given/facultyimagestmp/ISC003.jpg',
    '/assets/given/facultyimagestmp/ISC004.jpg',
    '/assets/given/facultyimagestmp/ISC005.jpg',
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
  startrow: number = 0;
  endrow: number = 20;
  viewarticle: any;
  userIdparam: any;
  updateview: any;
  pageview: boolean = false;
  views: any;
  selectedView: string = 'compact';

  ngOnInit() {

      //for accessing menuopen 
    //   this.menuService.isMenuOpen$.subscribe(isOpen => {
    //     this.isMenuOpen = isOpen;
    // });

    // this.articleUrl = 'article/art/';
    // this.selectedTab = 'apa';
    // this.userDetail = this.authservice.getUserDetail();
    // console.log(this.userDetail);
    // this.universityName = this.userDetail.University;
    // this.roleId = this.authservice.getProfileObs();
    // this.universityShortName = this.userDetail.UniversityShortName;
    // this.Name = this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    // this.authservice.RoleSelection(this.userDetail.UniversityId, this.userDetail.UserId).subscribe(x => {
    //   this.role = x;
    //   const data = this.role.filter(item => item.roleId == this.roleId);
    //   this.roleName = data[0].roleName;
    // })

    // this.route.params.subscribe(params => {
    //   //Profile API
    //   this.userIdparam = params.id;
    //   this.service.GetBasicProfile(this.userDetail.UniversityId, this.userIdparam).subscribe((x: HttpResponse<any>)  => {
    //       console.log(x);
    //       if (x.status === 200) {
    //         this.faculty = x.body;
    //         console.log(x.status);
            
    //         this.enablePic = true;
    //         console.log(this.enablePic);
            
    //       } else {
    //         this.enablePic = false;
    //         console.log(this.enablePic);
            
    //       }
        
          

    //       this.userid = this.faculty.userid;
          
          
    //       //For Faculty
    //       if (this.imageToShow.find(x => x == this.faculty.empid)) {
    //         this.imageSrc = this.facultyimages;
    //       } 
    //       else if(this.faculty.profileFileName!=null){
    //         this.faculty.profileFileName=this.faculty.profileFileName.split('.');
    //         // console.log(Sample);
            
    //         const imageUrl = `${environment.nodeServerUrl}/getImage?userImage=${this.faculty.profileFileName[0]}`;
    //         console.log(imageUrl);
    //         this.http.get(imageUrl, { responseType: 'text' }).subscribe(
    //           (response) => {
    //             this.imageSrc = imageUrl; // Update the imgUrl with the fetched image URL
    //             console.log('Fetched Image:', imageUrl);
    //           },
    //           (error) => {
    //             console.error('Error fetching Image:', error);
    //             this.imageSrc = "assets/images/user/default.png";
    //           });
    //       }
    //       else{
    //             this.imageSrc="assets/images/user/default.png"; 
    //       }
    //     }, (error) => {
    //       this.enablePic = false; // Set enablePic to true in case of an error
    //     });
    //     console.log(this.enablePic);

      //document Api
    //   this.service.GetResearcherDocumentCounts(this.userDetail.UniversityId, this.userIdparam).subscribe(x => {
    //     this.docCount = x;
    //     console.log(x);
    //     })
    // });

    // this.navbar = this.el.nativeElement.querySelector('#profile-sticky-nav');
    // this.sticky = this.navbar.offsetTop;
   // this.GetPublication();

  }

//   GetPublication() {

//     //Publication API
//     this.service.researcherPublicationDetails(this.userDetail.UniversityId, this.userIdparam).subscribe
//       ((x:HttpResponse<any>) => {
//         if (x.status === 200) {
//           this.pubdetails = x.body;
//           console.log(x.status);
          
//           this.enablePic = true;
//           console.log(this.enablePic);
          
//         } else {
//           this.enablePic = false;
//           console.log(this.enablePic);
          
//         }
//         this.pubdetails = x.body;
//         console.log(this.pubdetails);
        
//         this.filteredItems = this.pubdetails;
//         this.pubCount = this.pubdetails.length;
//         this.collapsablesize = this.pubdetails.length;
//         console.log(this.collapsablesize);
//         this.totalPages = Math.ceil(this.collapsablesize / this.pageSize);
//         // Adjust Mpage to prevent it from exceeding totalpages
//         this.page = Math.max(1, Math.min(this.page, this.totalPages));

//         // Calculate the actual startRow and endRow based on Mpage and pageSize
//         this.startrow = (this.page - 1) * this.pageSize;
//         this.endrow = Math.min(this.startrow + this.pageSize, this.collapsablesize);
//         console.log(this.collapsablesize);
//         // Update the values used in the <h6> tag
//         this.page = this.page;
//         console.log(this.page);

//         for (let i = 0; i < this.pubdetails.length; i++) {
//           if(this.pubdetails[i].link!=null){
//            if(this.pubdetails[i].link.length>100){
//             this.pubdetails[i].link=[this.pubdetails[i].link.slice(0, 100), " ", this.pubdetails[i].link.slice(100)].join('');
//            }
//           }
           
//           if (this.pubdetails[i].articleType != null) {
//             this.pubdetails[i].articleType = this.pubdetails[i].articleType.toLowerCase();
//             if(this.pubdetails[i].articleType=="book chapter"){
//               this.pubdetails[i].articleType=this.pubdetails[i].articleType.replace(/\s/g, "");
//             }
//           }

//           if (this.pubdetails[i].technology_Areas != null) {
//             this.pubdetails[i].technology_Areas = this.pubdetails[i].technology_Areas.split(';');
//           }
//           if (this.pubdetails[i].publicationSourceDBMetrics != null) {
//             this.pubdetails[i].publicationSourceDBMetrics = this.pubdetails[i].publicationSourceDBMetrics.split(';');
//           }
//           if (this.pubdetails[i].publicationDBCitation != null) {
//             const publicationDBCitation = this.pubdetails[i].publicationDBCitation.split(';');

//             this.pubdetails[i].publicationDBCitation = publicationDBCitation.map(item => {
//               const [name, value] = item.split(':');
//               return { name, value };
//             });

//             // Assigning variable for showing values dynamically in honeycomp
//             for (let t = 0; t < this.pubdetails[i].publicationDBCitation.length; t++) {

//               if (this.pubdetails[i].publicationDBCitation[t].name == "SCOPUS") {
//                 this.pubdetails[i].scopus = this.pubdetails[i].publicationDBCitation[t].value;
//               }
//               if (this.pubdetails[i].publicationDBCitation[t].name == "GS") {
//                 this.pubdetails[i].gs = this.pubdetails[i].publicationDBCitation[t].value;
//               }
//               if (this.pubdetails[i].publicationDBCitation[t].name == "WOS") {
//                 this.pubdetails[i].wos = this.pubdetails[i].publicationDBCitation[t].value;
//               }
//               if (this.pubdetails[i].publicationDBCitation[t].name == "IEEE") {
//                 this.pubdetails[i].ieee = this.pubdetails[i].publicationDBCitation[t].value;
//               }
//               if (this.pubdetails[i].publicationDBCitation[t].name == "PUBMED") {
//                 this.pubdetails[i].pubmed = this.pubdetails[i].publicationDBCitation[t].value;
//               }
//               if (this.pubdetails[i].publicationDBCitation[t].name == "ABDC") {
//                 this.pubdetails[i].abdc = this.pubdetails[i].publicationDBCitation[t].value;
//               }
//             }


//           }

//           if(this.pubdetails[i].authorAffiliation!=null){
//           this.pubdetails[i].authorAffiliation = this.pubdetails[i].authorAffiliation.split('|');
//         }
//         }

//         //Name Filter
//         this.sortitems = this.pubdetails.publicationTitle;
//         this.order = this.sortitems;
//         console.log(this.pubdetails);

//         // Apply sorting based on current sorting values
//         if (this.ordervalue === 'Ascending') {
//           this.pubdetails.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
//         } else if (this.ordervalue === 'Descending') {
//           this.pubdetails.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
//         } else if (this.yearorder === 'Year') {
//           this.pubdetails.sort((a, b) => a.year - b.year);

//         }
//       });

//   }


//   //detail & compact view
//   selectedScheme = 'compact';
//   showshare(val, id, userid) {
//     this.showIcons = !this.showIcons;
//     this.editshare = val;
//     const shareUrl = environment.commonUrl + '/article/art';
//     const recordid = id;
//     const sno = userid;
//     this.fullUrl = `${shareUrl}/${recordid}/${sno}`;
//   }

//   updateSelectedScheme(viewValue: string) {
//     const elements = document.getElementsByTagName('article');

//     for (let i = 0; i < elements.length; i++) {
//       elements[i].classList.remove(this.selectedScheme);
//       elements[i].classList.add(viewValue);
//     }

//     this.selectedScheme = viewValue;
//   }

//   onViewChange(event: any) {
//     const viewValue = event.target.value;
//     this.selectedView = viewValue;
//     this.updateSelectedScheme(viewValue);
//     this.GetPublication();
//   }

//   //Transition set for triangle to square box
//   @HostListener('window:scroll', ['$event'])
//   onScroll() {
//     this.profileStickyFunction();
//   }

//   profileStickyFunction() {
//     if (window.pageYOffset >= 330) {
//       this.navbar.classList.add('sticky');
//     } else {
//       this.navbar.classList.remove('sticky');
//     }
//   }

//   //For Modal Box 
//   openModal() {
//     console.log('dialogbox button opened!');
//     this.showModal = true;

//   }
//   closeModal() {
//     console.log('Close button clicked!');
//     this.showModal = false;
//   }

//   //Filter for ascending &descending
//   changesOrder(values) {
//     console.log(values);
//     this.ordervalue = values;
//     if (values == 'Ascending') {
//       this.pubdetails.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
//     }
//     if (values == 'Descending') {
//       this.pubdetails.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
//     }
//   }

//   changeYear(values) {
//     console.log(values);
//     this.yearorder = values;
//     if (values == 'Year') {
//       this.pubdetails.sort((a, b) => b - a);
//     }
//   }

//   toggle() {
//     this.isCollapsed = !this.isCollapsed;
//   }

//   openArticle(url: string) {
//     window.open(url, '_blank');
//   }

//   getShareUrl(id: string, userid: any): string {
//     const shareUrl = environment.commonUrl + '/article/art';
//     const recordid = id;
//     const sno = userid;
//     let fullUrl = `${shareUrl}/${recordid}/${sno}`;
//     return fullUrl;
//   }

//   //To enable or disable validation or delete icon
//   validate(val) {
//     this.editRow = val;
//     this.validation = !this.validation;
//     if (this.roleId != 2) {
//       this.validation = false;
//     }
//     if (this.validation == false) {
//       this.editRow = null;
//       this.enableDelete = false;
//     }
//   }

//   //To verify publication
//   verified(pubId) {
//     this.service.pubValidation(pubId, this.userIdparam, '1').subscribe(res => {
//       this.service.researcherPublicationDetails(this.userDetail.UniversityId, this.userIdparam).subscribe(x => {

//       })
//     });
//   }

//   confirm(pubId) {
//     this.service.pubValidation(pubId, this.userIdparam, '0').subscribe(x => {
//       this.service.researcherPublicationDetails(this.userDetail.UniversityId, this.userIdparam).subscribe(x => {
//       })
//     })
//   }

//   //add new
//   resetForm() {
//     this.enableBox = true;
//     this.enableAdd = true;
//   }

//   enableDoi() {
//     this.enableBox = true;
//     this.enableAdd = false;
//     this.EnableDoi = true;
//     this.service.GetPath(this.userDetail.UniversityId, this.userIdparam, '2').subscribe(x => {
//       this.pdfPath = x;
//       console.log(this.pdfPath);
//     })
//   }

//   //search record for rfs by doi or title
//   searchMatch() {
//     this.searchRfs();
//     this.enableBox = true;
//     this.enableAdd = false;
//     this.EnableDoi = false;
//     this.enableUnmatch = true;
//   }

//   /// to submit rfs data
//   submitRfs() {
//     this.uploadFile().then(()=>{

//     if (!this.pdfStatus && this.pdfEnable) {
//     }

//     else {
//       if (this.file) {
//         if (this.rfsId == 1) {
//           let imgsplit = this.file.type.split("/");
//           console.log(imgsplit);
//           this.pdfPostName = "." + imgsplit[1];
//         }
//         else {
//           this.pdfPostName = "-" + this.file.name;
//         }
//         this.pdfLocation = this.pdfPath.folderPath + "\\" + this.userIdparam + this.pdfPostName;
//         console.log(this.pdfLocation);
//       }
    
//       const data = {
//         rfsPublicationQueue: {
//           rfsPublicationQueueId: this.queueId,
//           rfsPublicationLinkRequestId: 0,
//           universityId: parseInt(this.userDetail.UniversityId),
//           userId: parseInt(this.userIdparam),
//           publicationId: this.publicationId,
//           publicationTitle: this.crossTitle,
//           publicationSourceId: this.sourceId,
//           publicationSource: this.crossSourceName,
//           doi: this.doi,
//           pdFfileLocation: this.pdfLocation,
//           webLink: this.webLink,
//           rfsTypeId: this.rfsId,
//           swappedUserId: 0,
//           isUserAddressSame: true,
//           isCorrespondingAuthor: true,
//           actionTypeId: 0,
//           remark: null,
//           takenBy: 0,
//           verifiedBy: 0
//         },
//         rfsLinkAuthorAdd: {
//           universityId: 0,
//           universityName: "string",
//           userId: 0,
//           fullName: "string",
//           locationId: 0,
//           locationName: "string",
//           countryId: 0,
//           countryName: "string",
//           instituteId: 0,
//           instituteName: "string",
//           departmentId: 0,
//           departmentName: "string",
//           correspondingEmail: "string",
//           correspondingAuthor: 0
//         }
//       }
//       console.log(data);

//       if (this.rfsId == "3") {
//         if (this.pdfLocation != null && this.crossTitle != undefined && this.crossSourceName != undefined && this.webLink != undefined) {
//           this.service.SaveRFS(this.userIdparam, this.roleId, data).subscribe(x => {
//             alert('Details Saved Successfully');
//             this.enableBox = true;
//             this.enableAdd = false;
//             this.EnableDoi = false;
//             this.enableUnmatch = false;
//             this.rfsDone = true;
//           })
//         }
//         else {
//           alert("Need to fill mandatory fields")
//         }
//       }
//       else{

//       }
//   }
// });

//       if(this.rfsId!="3") {
//         const data = {
//           rfsPublicationQueue: {
//             rfsPublicationQueueId: this.queueId,
//             rfsPublicationLinkRequestId: 0,
//             universityId: parseInt(this.userDetail.UniversityId),
//             userId: parseInt(this.userIdparam),
//             publicationId: this.publicationId,
//             publicationTitle: this.crossTitle,
//             publicationSourceId: this.sourceId,
//             publicationSource: this.crossSourceName,
//             doi: this.doi,
//             pdFfileLocation: this.pdfLocation,
//             webLink: this.webLink,
//             rfsTypeId: this.rfsId,
//             swappedUserId: 0,
//             isUserAddressSame: true,
//             isCorrespondingAuthor: true,
//             actionTypeId: 0,
//             remark: null,
//             takenBy: 0,
//             verifiedBy: 0
//           },
//           rfsLinkAuthorAdd: {
//             universityId: 0,
//             universityName: "string",
//             userId: 0,
//             fullName: "string",
//             locationId: 0,
//             locationName: "string",
//             countryId: 0,
//             countryName: "string",
//             instituteId: 0,
//             instituteName: "string",
//             departmentId: 0,
//             departmentName: "string",
//             correspondingEmail: "string",
//             correspondingAuthor: 0
//           }
//         }
//         console.log(data);

//         this.service.SaveRFS(this.userIdparam, this.roleId, data).subscribe(x => {
//           alert('Details Saved Successfully');
//           this.enableBox = true;
//           this.enableAdd = false;
//           this.EnableDoi = false;
//           this.enableUnmatch = false;
//           this.rfsDone = true;
//         })
//       }
    
//   }


//   doneRFS() {
//     this.enableBox = false;
//     this.rfsDone = false;
//   }
//   closeAdd() {
//     this.enableBox = false;
//     this.enableUnmatch = false;
//   }



//   //validate
//   openbox(pubId) {
//     this.pubID = pubId
//     if (this.roleId != 6) {
//       this.openvalidate = true;
//       this.validateapprove = true;
//       this.done = false;
//       this.validatedeny = false;
//       this.validateyesno = false;
//     }
//   }

//   deletebox() {
//     this.openvalidate = true;
//     this.validateapprove = false;
//     this.validatedeny = false;
//     this.done = false;
//     this.validateyesno = true;

//   }

//   yesornobox(pubId) {
//     this.openvalidate = true;
//     this.validateapprove = false;
//     this.validateyesno = false;
//     this.done = false;
//     this.validatedeny = true;
//     console.log(this.pubID);

//     this.confirm(this.pubID);

//   }

//   approvebox(pubid) {
//     console.log(this.pubID);

//     this.openvalidate = true;
//     this.validateapprove = false;
//     this.validateyesno = false;
//     this.validatedeny = false;
//     this.done = true;
//     this.verified(this.pubID);

//   }

//   donebox() {
//     this.openvalidate = false;
//     this.done = false;
//     location.reload();
//   }
//   closebox() {
//     this.openvalidate = false;
//   }

//   showChart() {
//     this.enableChart = !this.enableChart;
//   }

//   closecite() {
//     this.opencitation = false;

//   }
//   opencite(showModal) {
//     console.log('dialogbox button opened!');
//     this.modalService.open(showModal);
//   }

//   //Enable checkbox based on DOI/Title
//   updateValues(data) {
//     if (this.checkDTtitle == "Doi") {
//       this.titleEnable = false;
//     }

//   }

//   changeTitle(x) {
//     if (this.checkDTtitle == 'Title') {
//       if (x.length > 4) {
//         this.titleEnable = true;
//         this.service.getTitleList(x).subscribe(data => {
//           this.filterTitle = data;
//           if (this.filterTitle.length == 0) {
//             this.searchData = x;
//             this.titleEnable = false;
//           }
//         })
//       }
//     }
//   }

//   onSelectTitle(val) {
//     this.searchData = val;
//     console.log(this.searchData);
//     this.titleEnable = false;
//   }

//   searchRfs() {
//     //check values based on title
//     if (this.checkDTtitle == 'Title') {
//       this.service.GetRFSTitle(this.searchData).subscribe(x => {
//         this.checkValue = x as any;
//         if (this.checkValue.length == 1) {
//           this.crossTitle = this.checkValue[0].publicationTitle;
//           this.crossSourceName = this.checkValue[0].publicationSourceName;
//           this.publicationId = this.checkValue[0].publicationId;
//           this.sourceId = this.checkValue[0].publicationSourceId;
//           this.publicationTitle = this.checkValue[0].publicationTitle;
//           this.type = "L";
//           this.readOnly = true;
//           this.rfsId = 1;
//           console.log(this.checkValue);
//           this.pdfEnable = false;
//           this.processData();
//         }
//         else {
//           this.type = "M";
//           this.service.GetPubValidate(this.userIdparam, this.publicationId, this.pubSourceName, this.type, this.searchData).subscribe(x => {
//             this.userValues = x;
//             if (this.userValues.messegeId != '5') {
//               this.noDOI = true;
//               this.pdfEnable = true;
//               this.publicationTitle = this.searchData;
//               this.rfsId = 3;
//               this.processData();
//             }
//             else {
//               this.noDOI = true;
//               this.pdfEnable = true;
//               this.popupAlert = "Title not present in RFS data, Do you want to proceed?";
//               this.rfsId = 3;
//               this.type = "M";
//               this.processData();
//             }
//           })
//         }

//       })
//     }
//     else if (this.checkDTtitle == 'Doi') {
//       //check values based on DOI number
//       this.service.GetRFSDoi(this.searchData).subscribe(x => {
//         this.checkValue = x;
//         if (this.checkValue.length == 1) {
//           this.crossTitle = this.checkValue[0].publicationTitle;
//           this.crossSourceName = this.checkValue[0].publicationSourceName;
//           this.publicationId = this.checkValue[0].publicationId;
//           this.sourceId = this.checkValue[0].publicationSourceId;
//           this.publicationTitle = this.checkValue[0].publicationTitle;
//           this.doi = this.searchData;
//           this.type = "L";
//           this.rfsId = 1;
//           this.readOnly = true;
//           console.log(this.checkValue);
//           this.pdfEnable = false;
//           this.processData();
//         }
//         else {
//           //get values from cross ref if data not found in RFS search
//           this.service.crossCheckDFS(this.searchData).subscribe(x => {
//             this.crossRefValues = x;
//             if (this.crossRefValues.doi != null) {
//               this.crossTitle = this.crossRefValues.title;
//               //get source name from cross ref values
//               this.crossSourceName = this.crossRefValues.sourceName[0];
//               this.publicationTitle = this.crossRefValues.title;
//               this.pubSourceName = this.crossSourceName;
//               this.doi = this.searchData;
//               this.readOnly = true;
//               this.type = "C";
//               this.rfsId = 2;
//               console.log(this.crossRefValues);
//               this.pdfEnable = true;
//               this.processData();
//             }
//             else {
//               this.noDOI = true;
//               this.pdfEnable = true;
//               this.popupAlert = "DOI not present in CrossRef and RFS data, Do you want to proceed?";
//               this.rfsId = 3;
//               this.type = "M";
//               this.processData();
//             }
//           })
//         }
//       })
//     }
//   }

//   processData() {
//     //To search user publication is already exists or not
//     this.service.GetPubValidate(this.userIdparam, this.publicationId, this.pubSourceName, this.type, this.publicationTitle).subscribe(x => {
//       this.userValues = x;
//       console.log(this.userValues);
//       if (this.userValues.messegeId == '5') {
//         console.log(this.userValues.messegeId);
//         this.messageValue = true;
//       }
//       this.showData = true;
//     })

//   }

//   file: File | null = null;
//   pdfPath: any;
//   pdfLocation: string | null = null;
//   pdfName: string | null = null;

//   selectFile(event) {
//     this.file = event.target.files[0] as File;
//     console.log(this.file);

//     if (this.file) {
//       const fileSize = this.file.size / 1024 / 1024; // Size in MB
//       const maxSize = 10; // Maximum allowed size in MB

//       if (fileSize <= maxSize) {
//         console.log(`Selected file size: ${fileSize} MB`);
//       } else {
//         alert("Please choose a file with file size below 10MB")
//         event.target.value = '';
//       }
//     }
//   }

//   uploadFile() {
//     return new Promise((resolve, reject) => {
//     if (!this.file) {
//       return;
//     }

//     if (this.file.type == 'application/pdf') {
//       const formData = new FormData();
//       formData.append('image', this.file);
//       if (this.rfsId == 1) {
//         this.pdfName = this.pdfPath.proposedFileName;
//       }
//       else {
//         let name = this.file.name.slice(0, this.file.name.lastIndexOf('.'));
//         console.log(name);
//         this.pdfName = this.userIdparam + "-" + name;
//       }

//       const uploadUrl = `${environment.nodeServerUrl}/uploadpdf?userId=${this.pdfName}&pdfPath=${this.pdfPath.folderPath}`;
//       console.log(uploadUrl);

//       this.http.post(uploadUrl, formData, { responseType: 'text' }).subscribe(
//         (response) => {
//           alert('PDF uploaded successfully!')
//           console.log('Response:', response);
//           this.pdfStatus = true;
//           resolve(response);
//         },
//         (error) => {
//           alert('Error uploading pdf');
//           console.error('Error uploading pdf:', error);
//           this.pdfStatus = false;
//           reject(error);
//         }
//       );
//     }
//       else {
//       alert("Please choose a file with file type pdf");
//       this.pdfStatus = false;
//        }
//      });
//   }

//   clearAll() {
//     location.reload();
//   }

//   articlePieChart() {

//     var chart = am4core.create("chartdivArt", am4charts.PieChart);
//     this.service.getArticlechart(this.userIdparam, this.userDetail.UniversityId).subscribe(
//       (x: any) => {
//         const data = x.map(item => ({
//           ArticleType: item.articleType,
//           Count: item.count,

//         }));
//         console.log(data);

//         chart.data = data;
//       }
//     );

//     //  pie series
//     var pieSeries = chart.series.push(new am4charts.PieSeries());
//     pieSeries.colors.list = [
//       am4core.color("#33CC33"),
//       am4core.color("blue"),
//       am4core.color("#FF6F91"),
//       am4core.color("#FF9671"),
//       am4core.color("#FFC75F"),
//       am4core.color("#F9F871")
//     ];
//     pieSeries.dataFields.value = "Count";
//     pieSeries.dataFields.category = "ArticleType";
//     pieSeries.slices.template.stroke = am4core.color("#fff");
//     pieSeries.labels.template.disabled = true;

//     chart.legend = new am4charts.Legend();
//     chart.legend.position = "right";

//     pieSeries.hiddenState.properties.opacity = this.DEFAULT_SLICE_OPACITY;
//     pieSeries.hiddenState.properties.endAngle = this.DEFAULT_ANIMATION_END_ANGLE;
//     pieSeries.hiddenState.properties.startAngle = this.DEFAULT_ANIMATION_START_ANGLE;

//   }

//   //chart
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
  
    this.affilliationPieChart();
    // this.dbBarChart();
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
    let root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
let chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    endAngle: 270
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
let series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    endAngle: 270
  })
);

series.states.create("hidden", {
  endAngle: -90
});

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([{
  category: "Lithuania",
  value: 501.9
}, {
  category: "Czechia",
  value: 301.9
}, {
  category: "Ireland",
  value: 201.1
}, {
  category: "Germany",
  value: 165.8
}, {
  category: "Australia",
  value: 139.9
}, {
  category: "Austria",
  value: 128.3
}, {
  category: "UK",
  value: 99
}]);

series.appear(1000, 100)
    // const container = am4core.create('chartContainer', am4core.Container);
    // container.width = am4core.percent(100);
    // container.height = am4core.percent(100);

    // const chart = container.createChild(am4charts.PieChart);

    // chart.data = []; // Your data array goes here

    // this.service.getAffiliationchart(this.userIdparam, this.userDetail.UniversityId).subscribe(
    //   (x: any) => {
    //     const data = x
    //     console.log(data);

    //     const newData = this.transformData(data);
    //     console.log(newData);

    //     console.log(data);

    //     // Add data to the chart
    //     chart.data = newData;

    //     //  pie series
    //     var pieSeries = chart.series.push(new am4charts.PieSeries());
    //     pieSeries.colors.list = [
    //       am4core.color("#FF6F91"),
    //       am4core.color("blue"),
    //       am4core.color("#33CC33"),
    //       am4core.color("#FF9671"),
    //       am4core.color("#FFC75F"),
    //       am4core.color("#F9F871")
    //     ];
    //     pieSeries.dataFields.value = "value";
    //     pieSeries.dataFields.category = "countname";
    //     pieSeries.slices.template.stroke = am4core.color("#fff");
    //     pieSeries.labels.template.disabled = true;

    //     chart.legend = new am4charts.Legend();
    //     chart.legend.position = "right";

    //     pieSeries.hiddenState.properties.opacity = this.DEFAULT_SLICE_OPACITY;
    //     pieSeries.hiddenState.properties.endAngle = this.DEFAULT_ANIMATION_END_ANGLE;
    //     pieSeries.hiddenState.properties.startAngle = this.DEFAULT_ANIMATION_START_ANGLE;

    //   }
    // );
  }

//   private transformData(originalData: any): any[] {
//     return Object.keys(originalData[0])
//       .filter(key => key !== 'userId' && key !== 'totalCount')
//       .map(key => ({
//         countname: key, value: originalData[0][key]
//       }));

//   }

//   dbBarChart() {
//     am4core.useTheme(am4themes_animated);

//     let chart = am4core.create("chartdiv", am4charts.XYChart);
//     this.service.getDatabasechart(this.userIdparam, this.userDetail.UniversityId).subscribe(
//       (x: any) => {
//         const data = x.map(item => ({
//           PubDataBase: item.publicationDB,
//           Count: item.count,
//         }));
//         console.log(data);

//         chart.data = data;
//       }
//     );

//     // Create axes
//     let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
//     categoryAxis.dataFields.category = "PubDataBase";
//     categoryAxis.renderer.grid.template.location = 0;
//     categoryAxis.renderer.minGridDistance = 0;
//     categoryAxis.renderer.labels.template.fontSize = 8; // Set your desired font size here
//     categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
//       return dy;
//     });

//     let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

//     // Create series
//     let series = chart.series.push(new am4charts.ColumnSeries());
//     series.dataFields.valueY = "Count";
//     series.dataFields.categoryX = "PubDataBase";
//     series.name = "PubDataBase";
//     series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
//     series.columns.template.fillOpacity = .8;

//     let columnTemplate = series.columns.template;
//     columnTemplate.strokeWidth = 1;
//     columnTemplate.strokeOpacity = 1;
//   }

//   removeUser() {
//     this.hideUser = true;
//   }

//   onPageChange(page: number) {
//     this.page = Math.max(1, Math.min(page, this.totalPages));

//     if (this.page == 1) {
//       this.startrow = 0;
//     } else {
//       this.startrow = (this.page - 1) * this.pageSize;
//     }
//     this.endrow = Math.min(this.startrow + this.pageSize, this.collapsablesize);
//     // Apply sorting based on current sorting values
//     if (this.ordervalue === 'Ascending') {
//       this.pubdetails.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
//     } else if (this.ordervalue === 'Descending') {
//       this.pubdetails.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
//     } else if (this.yearorder === 'Year') {
//       this.pubdetails.sort((a, b) => a.year - b.year);
//     }
//     ///detailed or compact for article
//     this.pageview = true;
//     const viewValue = this.selectedScheme === 'compact' ? 'compact' : 'detailed';
//     this.updateSelectedScheme(viewValue);
//     this.GetPublication();
//   }

//   onPageSizeChange(size: string) {
//     this.page = 1;
//     this.pageSize = Number(size);
//     this.endrow = this.pageSize + this.startrow;

//     // Apply sorting based on current sorting values
//     if (this.ordervalue === 'Ascending') {
//       this.pubdetails.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
//     } else if (this.ordervalue === 'Descending') {
//       this.pubdetails.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
//     } else if (this.yearorder === 'Year') {
//       this.pubdetails.sort((a, b) => a.year - b.year);
//     }

//     // detailed or compact for the article
//     this.pageview = true;
//     const viewValue = this.selectedScheme === 'compact' ? 'compact' : 'detailed';
//     this.updateSelectedScheme(viewValue);
//     this.GetPublication();

//   }

//   toEdit(){
//     this.routes.navigate(['/facultyProfiles/edit/screen/edit',this.userDetail.UniversityId,this.userDetail.UserId]);
//   }
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

  openDropBox(){
     this.opendropBoxEnable=true;
  }

  closeDropbox(){
    this.opendropBoxEnable=false;
  }

}