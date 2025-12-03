import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { FacultiesService } from '../faculties/faculties.service';

@Component({
  selector: 'app-performance-analysis',
  templateUrl: './performance-analysis.component.html',
  styleUrls: ['../../../assets/given/newcss/style.css','./performance-analysis.component.scss',]
})
export class PerformanceAnalysisComponent implements OnInit {
 
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
groupedTestimonials = [];
@ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;

  user: any;
  univCheck:any;
  constructor(private menuService:MenuService,private router:Router,private authService:AuthService,private service: FacultiesService,) {

  }

  ngOnInit() {

        //for accessing menuopen 
        this.menuService.isMenuOpen$.subscribe(isOpen => {
          this.isMenuOpen = isOpen;
        });
          this.userName=this.authService.getProfileObs();
          this.user=this.authService.getUserDetail();
          this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          localStorage.removeItem('ManagementUnivId');
        //For rolename getting
        // this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
          this.role=JSON.parse(localStorage.getItem('RoleSelection'));
          const data=this.role.filter(item=> item.roleId==this.userName);
          this.roleName=data[0].roleName;
          console.log(this.roleName)
      //  })

        // this.service.getUnivSubscriptionModule(this.user.UniversityId,this.userName,this.user.UserId).subscribe((data:any)=>{
        var univSubList = JSON.parse(localStorage.getItem('UnivSubcripModuleConsolidated'));
                   let dataFilter =univSubList.univSubscriptionModuleCheck
                   this.univCheck = dataFilter.filter( (item:any) => item.subscriptionModule == "PerformanceAnalysis");     
                  
                  if(this.univCheck){
                        for(let i=0;i<this.testimonials.length;i++){
                              for(let j=0;j<this.univCheck.length;j++){
                                if(this.testimonials[i].subModuleName == this.univCheck[j].subSectionName){
                                  if(this.univCheck[j].isSubSectionApplicable=="0"){
                                            let index = this.testimonials.findIndex((item:any)=> item.id==this.testimonials[i].id)
                                            if(index !== -1){
                                                   this.testimonials.splice(index, 1)
                                            }
                                  }
                                    
                                      
                                }
                              }
                              
                        }
                        console.log(this.testimonials);
                        
                }

        // });
  
     }
        testimonials: any[] = [
          {
            id:1,
            module:'Faculty Compare - Metric View',
            icon:"/assets/given/img/icon_acs_deployment.png",
            subModuleName:'Faculty Compare - Metric View'
          },
          {
            id:2,
            module:'Faculty Compare - Timeline View',
            icon:"/assets/given/img/icon_support_exec_stats.png",
            subModuleName:'Faculty Compare - Metric View'
          }, {
            id:3,
            module:'PRS-KRA EligibiltyList',
            icon:"/assets/given/img/icon_support_exec_stats.png",
            subModuleName:'KRA-EligibilityList'
          }, {
            id:4,
            module:'PRS-KRA Scoring',
            icon:"/assets/given/img/icon_support_exec_stats.png",
            subModuleName:'KRA-Scoring'
          }
        ]

      openmodele(name){
          if(name=="Faculty Compare - Metric View")
          {
            this.router.navigate(['/facultyProfiles/compare/fac'])

          }
          else if(name=="Faculty Compare - Timeline View"){
            this.router.navigate(['/clientadmin/PERFORMANCEANALYSIS/TIMELINE']);
          }
          else if(name=="PRS-KRA EligibiltyList"){
            this.router.navigate(['/performance-analysis-dashboard/prs-kra-eligibility-list']);
          }
          else if(name=="PRS-KRA Scoring"){
            this.router.navigate(['/performance-analysis-dashboard/prs-kra-scoring']);
          }

      } 

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
