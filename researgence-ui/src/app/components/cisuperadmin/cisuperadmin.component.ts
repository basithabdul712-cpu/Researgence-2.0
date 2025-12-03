import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-clsupportadmin',
  templateUrl: './cisuperadmin.component.html',
  styleUrls: ['../../../assets/given/newcss/style.css','./cisuperadmin.component.scss',]
})
export class CisuperadminComponent implements OnInit,AfterViewInit  {


  
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
  user: any;
  roleNameLoaded: boolean = false;
viewLoaded: boolean = false;
testimonials:any[];

  constructor(private menuService:MenuService,private router:Router,private authService:AuthService) {

  }

  ngOnInit() {
      //for accessing menuopen 
      this.menuService.isMenuOpen$.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
      });
      this.userName=this.authService.getProfileObs();
      this.user=this.authService.getUserDetail();
      this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
     
    //For rolename getting
    // this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
      this.role=JSON.parse(localStorage.getItem('RoleSelection'));
      const data=this.role.filter(item=> item.roleId==this.userName);
      this.roleName=data[0].roleName;
            this.roleNameLoaded = true;
      console.log(this.roleName)
            this.runTestimonialsIfReady();

      // })
  
  }

  ngAfterViewInit() {
  this.viewLoaded = true;
  console.log("View Loaded");

 if (this.roleNameLoaded && this.viewLoaded) {
    this.loadTestimonials();
  }}

runTestimonialsIfReady() {
  if (this.roleNameLoaded && this.viewLoaded) {
    this.loadTestimonials();
  }
}

loadTestimonials() {
  this.testimonials = [
    {
      id: 1,
      module: 'Subcription Plan Summary',
      icon: "/assets/given/img/icon_user_management.png"
    },
  ];

  console.log("Testimonials Loaded:", this.testimonials);
}


  // testimonials: any[] = [
  //   {
  //     id:1,
  //     module:'Subcription Plan Summary',
  //     icon:"/assets/given/img/icon_user_management.png"
  //   },
  //   // {
  //   //   id:2,
  //   //   module:'Usage Status',
  //   //   icon:"/assets/given/img/icon_support_executive.png"
  //   // },
  //   // {
  //   //   id:3,
  //   //   module:'Client Usage Report',
  //   //   icon:"/assets/given/img/icon_support_exec_stats.png"
  //   // },
  //   // {
  //   //   id:4,
  //   //   module:'ACSR Report',
  //   //   icon:"/assets/given/img/icon_support_exec_stats.png"
  //   // }
  // ]

  openmodele(name)
  {
  if(name=="Subcription Plan Summary")
  {
    this.router.navigate(['/clientadmin/subcription/report'])

  }
  else if(name=="Usage Status"){
    this.router.navigate(['/superadmin'])
  }
  else if(name=="Client Usage Report"){
    this.router.navigate(['/clientadmin/main/report']);
  }
  else if(name=="ACSR Report"){
    this.router.navigate(['/clientadmin/main/ACSR/report']);
  }
  
  }

  // usermanage()
  // {
  //   this.router.navigate(['clientadmin/user/screen']);
  // }

  // addDFS(){
  //   this.router.navigate(['/clientadmin/universitySelect/DFS/addDfs']);
  // }

  // viewPub(){
  //   this.router.navigate(['/clientadmin/universitySelect/DFS/viewDfs/university']);
  // }

  // viewRFS(){
  //   this.router.navigate(['/clientadmin/universitySelect/RFS/view/univ'])
  // }
  // request(){
  //   this.router.navigate(['/clientadmin/admin-service-request'])
  // }

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
}
