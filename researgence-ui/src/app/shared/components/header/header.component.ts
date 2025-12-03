import { Component, OnInit, Output, EventEmitter, Inject , Input } from '@angular/core';
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
var body = document.getElementsByTagName("body")[0];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
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
  public generalrole =[1,2,3,6,7,8,9,10,15,16,18];
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

  constructor(
    public navServices: NavService,private authservice: AuthService,
    @Inject(DOCUMENT) private document: any,
    private translate: TranslateService,private _location: Location,
    private modalService: NgbModal,
    public authService: AuthService,private router:Router,
    private advancesearch:CommonsearchService,
    private menuService:MenuService, private service:FacultiesService, private http: HttpClient) {
      
    // translate.setDefaultLang('en');
  }


  ngOnDestroy() {
    this.removeFix();
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
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

  ngOnInit() {
    this.elem = document.documentElement;
    this.username=this.authService.getProfileObs(); 
    this.userDetail= this.authservice.getUserDetail();
    // To hide this line for demo 
    this.tempUnivName= this.userDetail.University;
    // To enable this line for demo
    // this.tempUnivName= "";
    
    if(this.tempUnivName.includes("JIS Group")){       
      this.univImage="https://researgence.ai/univ-assets/icon/jisulogo.png";
    }else if(this.tempUnivName.includes("SGT University")){       
      this.univImage="https://researgence.ai/univ-assets/icon/sgtu_Logo.png";
    }
    else if(this.tempUnivName.includes("Ashoka University")){
      this.univImage="https://researgence.ai/univ-assets/icon/ashoka-header-logo.png";
    }
    else if(this.tempUnivName.includes("Goa Institute of Management")){
      this.univImage="https://researgence.ai/univ-assets/icon/gim-logo.png";
    }
    else if(this.tempUnivName.includes("SRM University AP")){
      this.univImage="https://researgence.ai/univ-assets/icon/srmap_logo.png";
    }
    else if(this.tempUnivName.includes("Birla Institute of Technology and Science")){
      this.univImage="https://researgence.ai/univ-assets/icon/bits-pilani-logo.png";
    }
    else  if(this.tempUnivName.includes("SVKMS NMIMS (Deemed to be University)")){       
      this.univImage="https://researgence.ai/univ-assets/icon/nmims-logo.png";
    }
    else  if(this.tempUnivName.includes("JSS Academy of Higher Education and Research")){       
      this.univImage="https://researgence.ai/univ-assets/icon/jssuni-logo.png";
    }
    else  if(this.tempUnivName.includes("Koneru Lakshmaiah Education Foundation")){       
      this.univImage="https://researgence.ai/univ-assets/icon/kluniversity-logo.png";
    }
    else  if(this.tempUnivName.includes("Adichunchanagiri University")){       
      this.univImage="https://researgence.ai/univ-assets/icon/acu-logo.png";
    }
    else  if(this.tempUnivName.includes("Chitkara University")){       
      this.univImage="https://researgence.ai/univ-assets/icon/chitkara-logo.png";
    }
    else  if(this.tempUnivName.includes("KLE Technological University")){       
      this.univImage="https://researgence.ai/univ-assets/icon/kletech-logo.png";
    }
    else  if(this.tempUnivName.includes("Ramaiah University of Applied Sciences")){       
      this.univImage="https://researgence.ai/univ-assets/icon/msruas-logo.png";
    }
    else  if(this.tempUnivName.includes("Meenakshi Academy of Higher Education and Research")){       
      this.univImage="https://researgence.ai/univ-assets/icon/maher-logo.png";
    }
    else  if(this.tempUnivName.includes("Institute of Management Technology, Ghaziabad")){       
      this.univImage="https://researgence.ai/univ-assets/icon/imt-logo.png";
    }
    else  if(this.tempUnivName.includes("Avinashilingam Institute for Home science and Higher Education for Women")){       
      this.univImage="https://researgence.ai/univ-assets/icon/avinuty-logo.png";
    }
    else  if(this.tempUnivName.includes("Sri Ramachandra Institute of Higher Education and Research")){       
      this.univImage="https://researgence.ai/univ-assets/icon/sriramachandra-logo.png";
    }
    else  if(this.tempUnivName.includes("Karnavati University")){       
      this.univImage="https://researgence.ai/univ-assets/icon/karnavatiuniversity-logo.png";
    }
    else  if(this.tempUnivName.includes("Bennett University")){       
      this.univImage="https://researgence.ai/univ-assets/icon/bennett-logo.png";
    }
    else  if(this.tempUnivName.includes("Dr. MGR Educational and Research Institute")){       
      this.univImage="https://researgence.ai/univ-assets/icon/drmgrdu-logo.png";
    }
    else  if(this.tempUnivName.includes("Anurag University")){       
      this.univImage="https://researgence.ai/univ-assets/icon/anurag-logo.png";
    }
    else  if(this.tempUnivName.includes("Sathyabama Institute of Science and Technology")){       
      this.univImage="https://researgence.ai/univ-assets/icon/sathyabama-logo.png";
    }
    else  if(this.tempUnivName.includes("Sri Balaji Vidyapeeth University")){       
      this.univImage="https://researgence.ai/univ-assets/icon/sbvu-logo.png";
    }
    else  if(this.tempUnivName.includes("University of Petroleum and Energy Studies")){       
      this.univImage="https://researgence.ai/univ-assets/icon/upes-logo.png";
    }
    else  if(this.tempUnivName.includes("JSS Science and Technology University")){       
      this.univImage="https://researgence.ai/univ-assets/icon/jssstuniv-logo.png";
    }
    else if(this.tempUnivName.includes("MIT Academy of Engineering")){
      this.univImage="https://researgence.ai/univ-assets/icon/mitaoe-logo.png";
    }
    else if(this.tempUnivName.includes("Maharishi Markandeshwar University")){
      this.univImage="https://researgence.ai/univ-assets/icon/mmumullana-logo.png";
    }
    else if(this.tempUnivName.includes("MIT Art, Design and Technology University")){
      this.univImage="https://researgence.ai/univ-assets/icon/mituniversity-logo.png";
    }
    else if(this.tempUnivName.includes("SVKM Group")){
      this.univImage="https://researgence.ai/univ-assets/icon/svkm-logo.png";
    }
    else if(this.tempUnivName.includes("Sikkim Manipal University")){
      this.univImage="https://researgence.ai/univ-assets/icon/smu-logo.png";
    }
    else if(this.tempUnivName.includes("SRM Institute of Science and Technology")){
      this.univImage="https://researgence.ai/univ-assets/icon/srmist-logo.png";
    }
    else if(this.tempUnivName.includes("Sacred Heart College, Tirupattur")){
      this.univImage="https://researgence.ai/univ-assets/icon/shctpt-logo.png";
    }
    else if(this.tempUnivName.includes("CMS Business School")){
      this.univImage="https://researgence.ai/univ-assets/icon/bschool-logo.png";
    }
    else if(this.tempUnivName.includes("Dayananda Sagar University")){
      this.univImage="https://researgence.ai/univ-assets/icon/dsu-logo.png";
    }
    else if(this.tempUnivName.includes("Mahindra University")){
      this.univImage="https://researgence.ai/univ-assets/icon/mahindrauniversity-logo.png";
    }
    else{

      // For Prod and Dev
       this.univImage="assets/images/logo/cintel-logo-new.png";

      // For Demo
      //  this.univImage="assets/images/logo/temp-univ-logo.jpeg";
  
    }
    console.log(this.userDetail);
    this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    
        //For rolename getting

        this.role = JSON.parse(localStorage.getItem('RoleSelection'));
        console.log(this.role);
        

        // this.authservice.RoleSelection(this.userDetail.UniversityId,this.userDetail.UserId).subscribe(x=>{
        //    this.role=x;
           if(this.username && this.role && Array.isArray(this.role)){
            const data=this.role.filter(item=> item.roleId==this.username);
            if(data && data.length > 0) {
              this.roleName=data[0].roleName;
              console.log(this.roleName);
            }
            }
        //  })
    if(this.username){
       this.getNotification();
      //  this.timerSubscription = interval(300000) 
      //  .subscribe(() => {
      //    this.getNotification();
      //  });
    } 
    else{
      this.navServices.collapseSidebar=true;
    }
    
    this.user=this.authService.getUserDetail();
    this.universityName= this.userDetail.University;
    // this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
    //   this.role=x
    //   console.log(x)
    //  })

     this.role = JSON.parse(localStorage.getItem('RoleSelection'));

    
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

  ngAfterViewChecked() {
    this.username=this.authService.getProfileObs(); 

  }
  
  searchQuery = '';
  search(){
    this.advancesearch.setSearchQuery(this.searchQuery);
  }

  SignOut(){
    this.authService.SignOut().subscribe(arg => {
    
      });
  }

  fetchImage() {

    this.service.GetPath(this.user.UniversityId,this.user.UserId,'1').subscribe(x=>{
      this.imgPath=x;
      console.log(this.imgPath);  
      if(this.imgPath){  
        if(this.imgPath.proposedFileName!=null){
          this.userImage=this.imgPath.proposedFileName;
        }
        else{
          this.userImage=this.imgPath.folderPath+"\\"+this.user.UserId;
        }
    console.log(this.userImage);
    const imageUrl = `${environment.nodeServerUrl}/getImage?userImage=${this.userImage}`;
    console.log(imageUrl);
    this.http.get(imageUrl, { responseType: 'text' }).subscribe(
      (response) => {
        this.imgUrl = imageUrl; // Update the imgUrl with the fetched image URL
        console.log('Fetched Image:', imageUrl);
      },
      (error) => {
        console.error('Error fetching Image:', error);
      });
    }
  }) 

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
  
  switchRole(val, name) {
    localStorage.removeItem("setFaculty")
    if ( val == this.admin || val == this.cisupport) {
      const confirmation = confirm(' You should logout & login Again');
      if (confirmation) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("profile");
        this.router.navigate(['auth/login']);
      }
    }
    else if(val == this.CisupportAdmin){
      localStorage.removeItem('profile');
      this.authService.setProfileObs(val);
      alert("Role Switched to " + name);
      setTimeout(() => {
        this.router.navigate(['/cisupportadmin']);
        setTimeout(() => {
          window.location.reload();
        }, 100); 
      }, 100); 
    }
    else if(val == this.librarian){
      localStorage.removeItem('profile');
      this.authService.setProfileObs(val);
      alert("Role Switched to " + name);
      setTimeout(() => {
        this.router.navigate(['/clientlibrarian']);
        setTimeout(() => {
          window.location.reload();
        }, 100); 
      }, 100); 
    }
    else if(val == this.CisuperAdmin){
      localStorage.removeItem('profile');
      this.authService.setProfileObs(val);
      alert("Role Switched to " + name);
      setTimeout(() => {
        this.router.navigate(['/superadmin']);
        setTimeout(() => {
          window.location.reload();
        }, 100); 
      }, 100); 
    }
     else {
      console.log(val);
      localStorage.removeItem('profile');
      localStorage.removeItem('dashboardData');
      this.authService.setProfileObs(val);
      this.service.GetDashboard(this.user.UniversityId,val,this.user.UserId).subscribe(x=>{
            localStorage.setItem('dashboardData',JSON.stringify(x));
         });
      alert("Role Switched to " + name);
      setTimeout(() => {
        this.router.navigate(['/Home']);
        setTimeout(() => {
          window.location.reload();
        }, 100); 
      }, 100); 
    }
  }

    
      getlandingpage(){
      
        localStorage.removeItem("setFaculty");
        localStorage.removeItem("mineSearch");
        if(this.generalrole.includes(Number(this.username))){
          this.router.navigate(["/Home"])
        } 
        else if(this.admin.includes(Number(this.username))){
          this.router.navigate(["/clientadmin"])
        } 
        else if(this.cisupport.includes(Number(this.username))){    
            this.router.navigate(["/clientadmin/universitySelect"])
        }
        else if(this.CisupportAdmin.includes(Number(this.username))){
        this.router.navigate(["/cisupportadmin"])
        }
        else if(this.CisuperAdmin.includes(Number(this.username))){
          this.router.navigate(["/superadmin"])
          }
          else if(this.librarian.includes(Number(this.username))){
            this.router.navigate(["/clientlibrarian"])
            }
    }

    // For indivdual profile
    gotoMyprofile(){
      this.router.navigate(["/facultyProfiles/"+this.userDetail.UserId])
    }

      gotoedit(){
        if(this.username==2 || this.username==5 || this.username==12 || this.username==17|| this.username==18 ){
          this.router.navigate(['/facultyProfiles/edit/screen/edit',this.userDetail.UniversityId,this.userDetail.UserId]);
      }
      else{
       alert("Only Faculty has access to edit profile..");
      }
      }

      openNotify(val){
        this.enableNotify=!this.enableNotify;
        this.rowid=val;
      }

      markData(val){

        this.enableNotify=false;
        const data={
          notificationIds:[
            {
              notificationId:val
            }
          ]
        }
        
        this.authService.updateNotify(data,this.userDetail.UniversityId,this.username,this.userDetail.UserId).subscribe(x=>{
          console.log(x);
          this.getNotification();  
        })

      }

      markAll(){

              for(let i=0;i<this.notifyList.length;i++){
                  this.notificationIds.push({
                    notificationId:this.notifyList[i].notificationId
                  });
               }
               const data={
                notificationIds:this.notificationIds
              };
               console.log(data);
               
        this.authService.updateNotify(data,this.userDetail.UniversityId,this.username,this.userDetail.UserId).subscribe(x=>{
          console.log(x);
          this.getNotification();     
        })
      }

      showAllnotification(){
        console.log("came");
        this.router.navigate(["/scorebook/notification"]);
      }

      toRole(){
        localStorage.removeItem("profile");
        this.router.navigate(["/Landing"])
         .then(() => {
          window.location.reload();
        });
      }

      getNotification(){
        this.navServices.collapseSidebar=true; 
        this.checkSidebar=true;
   
           this.authService.getNotifyList(this.userDetail.UniversityId,this.username,this.userDetail.UserId).subscribe(x=>{
             this.notifyList=x;
             if(this.notifyList.length>0){
             for(let i=0;i<this.notifyList.length;i++){
                   this.notifyList[i].modifiedDate=this.authservice.formatDate(this.notifyList[i].modifiedDate);
             }
             let notifycount=this.notifyList.filter(x=>x.isViewed==0);
             this.notificationCount=notifycount.length;
             if(this.notifyList.length>2){
               this.enableNotification=true;
             }
           }
           else{
             this.notificationCount=0;
           }
             console.log(x);   
           })
      }
 
      backClicked() {
        this._location.back();
      }

}
