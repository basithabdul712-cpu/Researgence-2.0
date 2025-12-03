import { AuthService } from '../../../shared/services/firebase/auth.service';
import { AdminclientService } from '../adminclient.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-adddfs',
  templateUrl: './rfsuniversity.component.html',
  styleUrls: ['./rfsuniversity.component.scss','../../../../assets/given/newcss/style.css']
})
export class RfsuniversityComponent implements OnInit {

  public universityList:any;
  public userName:string;
  public universityName:any;
  public universityId:string;
  public showDropdown:boolean=false;
  public fill:any;
  stickyEnable:boolean=false;
  isScrolled = false;
  public user:any=[]
  isMenuOpen:boolean;
  Name:any;
  showUnivName:any;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  role:any;
  roleName:string;
  public universityparamId:Number;
  groupedTestimonials = [];

  constructor(private service:AdminclientService, private authservice:AuthService,
    private menuService:MenuService, private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {

    const grouped = this.testimonials.reduce((acc,testimonials) => {
      (acc[testimonials.group] = acc[testimonials.group] || []).push(testimonials);
      return acc
    },{});

    this.groupedTestimonials = Object.keys(grouped).map(key =>({
      id: key,
      items: grouped[key]
    }));

        //for accessing menuopen Name
        this.menuService.isMenuOpen$.subscribe(isOpen => {
          this.isMenuOpen = isOpen;
        });

        this.route.params.subscribe(params => {           
            this.universityparamId=params.university;
        });
        this.showUnivName=localStorage.getItem("clientUniv");
        
        this.user=this.authservice.getUserDetail();
        this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        this.userName=this.authservice.getProfileObs();
        // this.authservice.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
          this.role=JSON.parse(localStorage.getItem('RoleSelection'));
          const data=this.role.filter(item=> item.roleId==this.userName);
          this.roleName=data[0].roleName;
          console.log(this.roleName)
          // }) 

          console.log(this.universityparamId);
   }

          testimonials: any[] = [
        
            {
              id:1,
              module:'ADD Publication',
              icon:"/assets/given/img/icon_add_dfs.png",
              group:1
            },
            {
              id:2,
              module:'DFS/RFS Quality Check',
              icon:"/assets/given/img/icon_view_publication.png",
              group:1
            },
            {
              id:3,
              module:'RFS Publication',
              icon:"/assets/given/img/icon_support_executive.png",
              group:1
            },
            {
              id:4,
              module:'SERVICE REQUEST',
              icon:"/assets/given/img/icon_service_request.png",
              group:3
            },
            {
              id:5,
              module:'Support Publication Mine',
              icon:"/assets/given/img/icon_support_exec_stats.png",
              group:1
            },
            {
              id:6,
              module:'DFS Patent',
              icon:"/assets/given/img/icon_support_exec_stats.png",
              group:2
            },
            {
              id:7,
              module:'RFS Patent',
              icon:"/assets/given/img/icon_support_exec_stats.png",
              group:2
            },
            {
              id:8,
              module:'DFS/RFS Patent QC & Approval',
              icon:"/assets/given/img/icon_support_exec_stats.png",
              group:2
            },           
            {
              id:9,
              module:'DFS Publication Source Request',
              icon:"/assets/given/img/icon_acs_deployment.png",
              group:4
            }
          ]

        groupTitles = {
          1: "Publications",
          2: "Patents",
          3: "Client Support",
          4: "Publication Source/Journal"
        }


        openmodele(name){
                if(name=="ADD Publication"){
                  this.router.navigate(['/facultyProfiles/feeder/new/'+this.universityparamId+'/requestid/rfstype'])
                }
                else if(name=="DFS/RFS Quality Check"){
                  this.router.navigate(['/clientadmin/universitySelect/DFS/viewDfs/'+this.universityparamId]);
                }
                else if(name=="RFS Publication"){
                  this.router.navigate(['/clientadmin/universitySelect/RFS/view/'+this.universityparamId]);
                }
                else if(name=="SERVICE REQUEST"){
                  this.router.navigate(['/clientadmin/service-request/'+this.universityparamId]);
                }
                else if(name=="DFS Publication Source Request"){
                  this.router.navigate(['/clientadmin/DFS/SUPPORT/REQUEST']);
                }    
                else if(name=="Support Publication Mine"){
                  this.router.navigate(['/scorebook/Publications/Mine']);
                }     
                else if(name=="RFS Patent"){
                  this.router.navigate(['/Patent/rfs/'+this.universityparamId]);
                }   
                else if(name=="DFS Patent"){
                  this.router.navigate(['/Patent/add/dfs/patent/ext/res/ai/'+this.universityparamId+'/temp']);
                }   
                else if(name=="DFS/RFS Patent QC & Approval"){
                  this.router.navigate(['/Patent/Admin/QC/'+this.universityparamId]);
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

}
