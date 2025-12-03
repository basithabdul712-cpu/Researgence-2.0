import { Component, OnInit, Output, EventEmitter, Inject , Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/firebase/auth.service';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CommonsearchService} from '../../services/commonsearch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import {Location} from '@angular/common';
import { FacultiesService } from 'src/app/components/faculties/faculties.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NumencoderService } from '../../services/numencoder.service';
import { UniversityidService } from '../../services/universityid.service';
var body = document.getElementsByTagName("body")[0];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public userChecked: boolean = false;
  public username;
  public checkSidebar:boolean=false;
  public menuItems: Menu[];
  public items: Menu[];
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public openNav: boolean = false
  public right_sidebar: boolean = false
  public text: string;
  public elem;
  public isOpenMobile: boolean = false
  public isOpenHelpContent: boolean = false
  public user:any=[];
  public roleList: any;
  public role:any;
  public universityName:any;
  showModal = false;
  loading = false;
  email = "";
  password = "";
  @Output() rightSidebarEvent = new EventEmitter<boolean>();
   values:string;
  roleValues: any;
  roleName: any;
  userDetail: any;
  intervalId;
  subscription: Subscription;
  time = new Date();
  userRole:any;
  public generalrole =[1,2,3,6,7,8,9,10,15,16];
  public admin = [5];
  public librarian= [17];
  public cisupport = [11];
  public CisupportAdmin = [12]; 
  public CisuperAdmin = [13];
  Name: any;
  enableNotify:boolean=false;
  notifyList:any=[];
  isViewed:boolean=false;
  rowid: any;
  notificationCount: any;
  notificationIds:any[]=[];
  enableNotification:boolean=false;
  imgUrl: any;
  imgPath: any;
  userImage: string;
  tempUnivName:any;
  univImage:any;
  univId: number;

  constructor(
    public navServices: NavService,private authservice: AuthService,
    @Inject(DOCUMENT) private document: any,
    private translate: TranslateService,private _location: Location,
    private modalService: NgbModal,
    public authService: AuthService,private router:Router,
    private advancesearch:CommonsearchService,
    private menuService:MenuService, private service:FacultiesService, private http: HttpClient,private encoderservice: NumencoderService,
    private encoderService: NumencoderService, private univservice: UniversityidService, private cdRef: ChangeDetectorRef, private route : ActivatedRoute) {
      
    // translate.setDefaultLang('en');
  }

  ngOnInit() {

    this.elem = document.documentElement;
    this.username=this.authService.getProfileObs(); 
    this.userDetail= this.authservice.getUserDetail();
    // this.userDetail = JSON.parse(localStorage.getItem('user'));
    // console.log(this.userDetail);
    this.tempUnivName= this.userDetail.University;
    // console.log(this.tempUnivName);

    // if (this.router.url.includes('/Home')){
    //   this.univId = this.encoderService.decodeNumber(this.router.url.slice(-16));
    //   console.log(this.univId);
    //   this.univImageSelect(this.univId);
    // }

    let endIndex=window.location.hostname.indexOf(".");
    let univName=window.location.hostname.slice(0, endIndex);
    if(univName.includes("pvsdev")||window.location.hostname==environment.commonIP){
      this.univservice.selectedId$.subscribe(id => {
        this.univId = id;
        console.log('Shared component received ID:', this.univId);
        if(this.univId==null){
        this.univId = parseInt(localStorage.getItem("initialUniv"));
        }
        this.univImageSelect(this.univId);
        this.cdRef.detectChanges();
  
       });
     }
     else{ 
          if(univName.includes("ashokapvs")){
            this.univId=4395;
          }
          else if(univName.includes("jisgrouppvs")){
            this.univId=43;
          }
          this.univImageSelect(this.univId);
          this.cdRef.detectChanges();
          console.log(this.univId);
      
     }
    
    // if(this.tempUnivName.includes("JIS Group")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/jisulogo.png";
    // }else if(this.tempUnivName.includes("SGT University")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/sgtu_Logo.png";
    // }
    // else if(this.tempUnivName.includes("Ashoka University")){
    //   this.univImage="https://researgence.ai/univ-assets/icon/ashoka-header-logo.png";
    // }else{
    //   this.univImage="assets/images/logo/cintel-logo-new.png";
    // }
    // else if(this.tempUnivName.includes("Goa Institute of Management")){
    //   this.univImage="https://researgence.ai/univ-assets/icon/gim-logo.png";
    // }
    // else if(this.tempUnivName.includes("SRM University AP")){
    //   this.univImage="https://researgence.ai/univ-assets/icon/srmap_logo.png";
    // }
    // else if(this.tempUnivName.includes("Birla Institute of Technology and Science")){
    //   this.univImage="https://researgence.ai/univ-assets/icon/bits-pilani-logo.png";
    // }
    // else  if(this.tempUnivName.includes("SVKMS NMIMS (Deemed to be University)")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/nmims-logo.png";
    // }
    // else  if(this.tempUnivName.includes("JSS Academy of Higher Education and Research")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/jssuni-logo.png";
    // }
    // else  if(this.tempUnivName.includes("Koneru Lakshmaiah Education Foundation")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/kluniversity-logo.png";
    // }
    // else  if(this.tempUnivName.includes("Adichunchanagiri University")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/acu-logo.png";
    // }
    // else  if(this.tempUnivName.includes("Chitkara University")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/chitkara-logo.png";
    // }
    // else  if(this.tempUnivName.includes("KLE Technological University")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/kletech-logo.png";
    // }
    // else  if(this.tempUnivName.includes("Ramaiah University of Applied Sciences")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/msruas-logo.png";
    // }
    // else  if(this.tempUnivName.includes("Meenakshi Academy of Higher Education and Research")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/maher-logo.png";
    // }
    // else  if(this.tempUnivName.includes("Institute of Management Technology, Ghaziabad")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/imt-logo.png";
    // }
    // else  if(this.tempUnivName.includes("Avinashilingam Institute for Home science and Higher Education for Women")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/avinuty-logo.png";
    // }
    // else  if(this.tempUnivName.includes("Sri Ramachandra Institute of Higher Education and Research")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/sriramachandra-logo.png";
    // }
    // else  if(this.tempUnivName.includes("Karnavati University")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/karnavatiuniversity-logo.png";
    // }
    // else  if(this.tempUnivName.includes("Bennett University")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/bennett-logo.png";
    // }
    // else  if(this.tempUnivName.includes("Dr.M.G.R Educational and Research Institute")){       
    //   this.univImage="https://researgence.ai/univ-assets/icon/drmgrdu-logo.png";
    // }
    // else{
    //    this.univImage="assets/images/logo/cintel-logo-new.png";
    // }
    console.log(this.userDetail);
    this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    
    this.navServices.collapseSidebar=true;    
    // if(this.username){
    //   //  this.timerSubscription = interval(300000) 
    //   //  .subscribe(() => {
    //   //    this.getNotification();
    //   //  });
    // } 
    // else{
    //   this.navServices.collapseSidebar=true;
    // }
    
    this.user=this.authService.getUserDetail();
    this.universityName= this.userDetail.University;
    
    
    this.navServices.items.subscribe(menuItems => {
      this.items = menuItems
    });

    this.search();

       // Using Basic Interval
       this.intervalId = setInterval(() => {
        this.time = new Date();
      }, 1000);   
      
      this.fetchImage();
  }


  ngOnDestroy() {
    this.removeFix();
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  univImageSelect(id){
    switch(id){
      case 43:
        this.univImage="https://researgence.ai/univ-assets/icon/jisulogo.png";
        break;
      case 1009:
        this.univImage="https://researgence.ai/univ-assets/icon/sgtu_Logo.png";
        break;
      case 4395:
        this.univImage="https://researgence.ai/univ-assets/icon/ashoka-header-logo.png";
        break;
      default:
        // this.univImage="assets/images/logo/cintel-logo-new.png";
        this.univImage="https://researgence.ai/univ-assets/icon/ashoka-header-logo.png";
        break;              
    }

  }

  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }
  toggleMenu(): void {
    this.menuService.toggleSidebar();
  }
  
  collapseSidebar() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar  
      this.menuService.toggleSidebar();
    // if (!this.navServices.collapseSidebar) {
    //   window.location.reload(); // Refresh the current page
    // }
  
  }

  collapseSidebar1(){
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar  
    // if (this.checkSidebar) {
      this.menuService.toggleSidebar();
    // }
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  public changeLanguage(lang) {
    this.translate.use(lang)
  }

  checkSearchResultEmpty(items) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    body.classList.add("offcanvas");
  }

  removeFix() {
    this.searchResult = false;
    body.classList.remove("offcanvas");
    this.text = "";
  }



  ngAfterViewChecked() {
    this.username=this.authService.getProfileObs(); 

  }
  
  searchQuery = '';
  search(){
    this.advancesearch.setSearchQuery(this.searchQuery);
  }


  fetchImage() {

  //   this.service.GetPath(this.user.UniversityId,this.user.UserId,'1').subscribe(x=>{
  //     this.imgPath=x;
  //     console.log(this.imgPath);  
  //     if(this.imgPath){  
  //     this.userImage=this.imgPath.folderPath+"\\"+this.user.UserId;
  //   console.log(this.userImage);
  //   const imageUrl = `${environment.nodeServerUrl}/getImage?userImage=${this.userImage}`;
  //   console.log(imageUrl);
  //   this.http.get(imageUrl, { responseType: 'text' }).subscribe(
  //     (response) => {
  //       this.imgUrl = imageUrl; // Update the imgUrl with the fetched image URL
  //       console.log('Fetched Image:', imageUrl);
  //     },
  //     (error) => {
  //       console.error('Error fetching Image:', error);
  //     });
  //   }
  // }) 

}

  setDefaultPic() {
    this.imgUrl = "assets/images/user/default.png";
  }
  toggleFullScreen() {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  toggleHelp(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then(
			() => {
				
			},
			() => {
			},
		);
  }
  

      getlandingpage(){
      
        localStorage.removeItem("setFaculty");
        console.log(this.userDetail.UniversityId);
        let data =this.encoderService.encodeNumber(Number(this.userDetail.UniversityId));
        if(this.generalrole.includes(Number(this.username))){
          this.router.navigate(["/Home"]);
        } 
    }

    backClicked() {
       
            this._location.back(); // Navigate to the previous page
      }
}
