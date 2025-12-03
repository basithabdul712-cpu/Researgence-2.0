import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { FacultiesService } from '../faculties/faculties.service';

@Component({
  selector: 'app-clientlibrarian',
  templateUrl: './clientlibrarian.component.html',
  styleUrls: ['../../../assets/given/newcss/style.css','./clientlibrarian.component.scss',]
})
export class ClientlibrarianComponent implements OnInit {
  testimonials: any[] = [
    {
      id:1,
      module:'USER MANAGEMENT',
      icon:"/assets/given/img/icon_user_management.png"
    },
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
    {
      id:4,
      module:'EXPERT PROFILE',
      icon:"/assets/given/img/icon_client_support.png"
    },
    {
      id:5,
      module:'RESOLVE UNCATEGORIZED PUBLICATION',
      icon:"/assets/given/img/icon_acs_deployment.png"
    }
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
  enableExpList:boolean=false;
  expList:any;

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
      // });
      
      localStorage.removeItem("mineSearch");

    }

  openmodele(name){

        if(name=="USER MANAGEMENT")
        {
          this.router.navigate(['/clientadmin/user/screen'])
        }
        else if(name=="SERVICE REQUEST"){
          this.router.navigate(['/clientadmin/service-request/'+this.user.UniversityId])
        }
        else if(name=="CLIENT USAGE REPORT"){
          this.router.navigate(['/clientadmin/report/clientusage']);    
        }
        else if(name=="EXPERT PROFILE"){
          this.service.GetDashboard(this.user.UniversityId,'6',this.user.UserId).subscribe(x=>{
                this.expList=x;
                this.enableExpList=true;
          });
        }
        else if(name=="RESOLVE UNCATEGORIZED PUBLICATION"){
          this.router.navigate(['/scorebook/Publications/Mine']);
          // this.router.navigate(['/clientadmin/LIBRARIAN/PUBLICATION']); 
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

    selectExp(name,count:number){
        if(name=="Faculty"&&count>0){
          this.router.navigate(['/facultyProfiles']);
        }
        else if(name=="Scholar"&&count>0){
          this.router.navigate(['/scholar']);
        }
        else if(name=="Student"&&count>0){
          this.router.navigate(['/Student']);
        }
        else if(name=="Staff"&&count>0){
          this.router.navigate(['/Staff']);
        }
    }

}