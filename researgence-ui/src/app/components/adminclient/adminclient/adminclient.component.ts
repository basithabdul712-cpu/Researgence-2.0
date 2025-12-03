import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { Router } from '@angular/router';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';
import { FacultiesService } from '../../faculties/faculties.service';

@Component({
  selector: 'app-adminclient',
  templateUrl: './adminclient.component.html',
  styleUrls: ['./adminclient.component.scss','../../../../assets/given/newcss/style.css']
})
export class AdminclientComponent implements OnInit {
  testimonials: any[] = [
    {
      id:1,
      module:'USER MANAGEMENT',
      icon:"/assets/given/img/icon_user_management.png"
    },
    // {
    //   id:2,
    //   module:'USER STATISTICS',
    //   icon:"/assets/given/img/icon_support_exec_stats.png"
    // },
    // {
    //   id:3,
    //   module:'ADMIN FEEDER SYSTEM',
    //   icon:"/assets/given/img/icon_client_support.png"
    // },
    // {
    //   id:4,
    //   module:'BULK UPLOAD',
    //   icon:"/assets/given/img/icon_acs_deployment.png"
    // },
    // {
    //   id:5,
    //   module:'USER DATA VALIDATION',
    //   icon:"/assets/given/img/icon_support_data_evaluation.png"
    // },
    {
      id:2,
      module:'SERVICE REQUEST',
      icon:"/assets/given/img/icon_service_request.png"
    },
    {
      id:3,
      module:'CLIENT USAGE REPORT',
      icon:"/assets/given/img/icon_support_exec_stats.png"
    },
  ]
  
  stickyEnable:boolean=false;
  models: any;
  public userName:string;
  public userDetail:any;
  searchboxfilter: string;
  isMenuOpen: boolean;
  isScrolled = false;
  public role:any;
  public roleName:any;
  Name:string;
  filteredItems: { moduleName: string; totalCount: number; lineItem1Text: string; lineItem1Count: number; lineItem2Text: string; lineItem2Count: number }[] = [];
  counterMap: { [moduleName: string]: number } = {};
  private timers: { [moduleName: string]: number } = {};
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;

  
  user:any;
  hideUser: boolean=false;
  univid: any;
  constructor(private menuService:MenuService,private router:Router,private authService:AuthService,private service: FacultiesService,) { }

  ngOnInit() {
     //for accessing menuopen 
     this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });
    this.onWindowScroll();
    this.userName=this.authService.getProfileObs();
    this.user=this.authService.getUserDetail();
    this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

  //For rolename getting
  // this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
    this.role=JSON.parse(localStorage.getItem('RoleSelection'));
    const data=this.role.filter(item=> item.roleId==this.userName);
    this.roleName=data[0].roleName;
    console.log(this.roleName)
    // })  
  }


  openmodele(name)
  {
  if(name=="USER MANAGEMENT")
  {
    this.router.navigate(['/clientadmin/user/screen'])

  }
  else if(name=="SERVICE REQUEST"){
    this.router.navigate(['/clientadmin/service-request/'+this.user.UniversityId])
  }
  else if(name=="CLIENT USAGE REPORT"){
    console.log("Enter");
    this.router.navigate(['/clientadmin/report/clientusage']);
    
  }
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
   removeUser(){
    this.hideUser=true;
 }

}
