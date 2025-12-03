import { AuthService } from '../../shared/services/firebase/auth.service';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  doughnutData,
  vertical_stack_chart,
  multiData,
} from "../../shared/data/dashboard/project";
import * as graphoptions from "../../shared/data/dashboard/project";
import * as chartData from "../../shared/data/chart/chartist";
import { FacultiesService } from "../faculties/faculties.service";
import { ActivatedRoute, Router } from "@angular/router";
import { fromEvent, generate } from "rxjs";
import { debounceTime, map } from 'rxjs/operators';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { MenuService } from 'src/app/shared/services/menu.service';



@Component({
  selector: "app-dashboard-detail",
  templateUrl: "./dashboard-detail.component.html",
  styleUrls: ["../../../assets/given/newcss/style.css","./dashboard-detail.component.scss"],
  // "../../../assets/given/css/bootstrap.min.css",
  encapsulation: ViewEncapsulation.None,
})
export class DashboarddetailComponent implements OnInit,AfterViewInit {
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
  filteredItems: { moduleName: string;moduleGroup:string;totalCount: number; lineItem1Text: string; lineItem1Count: number; lineItem2Text: string; lineItem2Count: number;icon: string; enableModule:string }[] = [];
  counterMap: { [moduleName: string]: number } = {};
  filteredExperts: { moduleName: string;moduleGroup:string; totalCount: number; lineItem1Text: string; lineItem1Count: number; lineItem2Text: string; lineItem2Count: number;icon: string; enableModule:string }[] = [];
  counterMapExp: { [moduleName: string]: number } = {};
  private timers: { [moduleName: string]: number } = {};
  private timersExp: { [moduleName: string]: number } = {};
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;

  public doughnutData = doughnutData;
  public active1 = 1;
  public vertical_stack_chart = vertical_stack_chart;
  public chart7 = chartData.chart7;
  enableRor:boolean=false;
  enableExp:boolean=false;
  enableExp1:boolean=false;
  isMessageVisible:boolean = false;
  constructor(
    private route: Router,
    private service: FacultiesService,
    private search: CommonsearchService,
    private routes: ActivatedRoute, private authservice: AuthService,
     private menuService: MenuService
  ) {
    Object.assign(this, { doughnutData, vertical_stack_chart, multiData });
   
  }

  // doughnut
  public view = graphoptions.view;
  public doughnutChartColorScheme = graphoptions.doughnutChartcolorScheme;
  public doughnutChartShowLabels = graphoptions.doughnutChartShowLabels;
  public doughnutChartGradient = graphoptions.doughnutChartGradient;

  //vertical_stack_chart
  public verticalStackChartColorScheme = graphoptions.colorScheme;
  public verticalStackChartshowXAxis = graphoptions.showXAxis;
  public verticalStackChartshowYAxis = graphoptions.showYAxis;
  public verticalStackChartgradient = graphoptions.gradient;
  public verticalStackChartshowLegend = graphoptions.showLegend;
  public verticalStackChartshowXAxisLabel = graphoptions.showXAxisLabel;
  public verticalStackChartshowYAxisLabel = graphoptions.showYAxisLabel;

  public chart1 = graphoptions.chart1;
  public chart2 = graphoptions.chart2;
  public chart3 = graphoptions.chart3;
  public chart4 = graphoptions.chart4;
  public chart5 = graphoptions.chart5;
  public chart6 = graphoptions.chart6;

  public pieChart1 = graphoptions.pieChart1;
  public barChartSingle1 = graphoptions.barChartSingle1;
  public barChartSingle2 = graphoptions.barChartSingle2;
  public barChartSingle3 = graphoptions.barChartSingle3;
  moduleList:any;

  ngOnInit() {
    this.userName=this.authservice.getProfileObs();
    this.userDetail=this.authservice.getUserDetail();
    this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    //For rolename getting
    // this.authservice.RoleSelection(this.userDetail.UniversityId,this.userDetail.UserId).subscribe(x=>{
       this.role=JSON.parse(localStorage.getItem('RoleSelection'));
       
       const data=this.role.filter(item=> item.roleId==this.userName);
       this.roleName=data[0].roleName;
       console.log(this.roleName)
      //  })
    //for accessing menuopen 
    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });
    this.onWindowScroll();

    this.service.GetDashboard(this.userDetail.UniversityId,this.userName,this.userDetail.UserId).subscribe(
      (x) => {
      this.models = x;
      this.filteredItems = this.models;
      console.log(this.filteredItems);

      // this.service.getUnivCheckModule(this.userDetail.UniversityId).subscribe(t=>{  
        const data = (() => {
          try {
            return JSON.parse(localStorage.getItem('UnivSubcripModuleConsolidated'));
          } catch (e) {
            console.error('Failed to parse UnivSubcripModuleConsolidated from localStorage:', e);
            return null;
          }
        })();
        this.moduleList=data.univModuleCheck;
        for(let i=0;i<this.filteredItems.length;i++){
           if(this.moduleList.length>0){
              for(let j=0;j<this.moduleList.length;j++){
                   if(this.filteredItems[i].moduleName==this.moduleList[j].moduleName){
                       this.filteredItems[i].enableModule=this.moduleList[j].isApplicable
                   }
                }
             }
           }

      // });

      this.filteredExperts=this.filteredItems.filter(item => item.moduleName!="Publications"&&item.moduleName!="Projects"&&item.moduleName!="Consultancy"&&
      item.moduleName!="Faculty"&&item.moduleName!="Scholar"&&item.moduleName!="Startups"&&item.moduleName!="Edited Publications")
       console.log(this.filteredExperts);
       
        // for(let i=0;i<this.filteredItems.length;i++){
        //   if(this.filteredItems[i].moduleName=="Publications"){
        //     this.filteredItems[i].icon="ballot";
        //   }
        //   if(this.filteredItems[i].moduleName=="Faculty"){
        //     this.filteredItems[i].icon="chalkboard-user";
        //   }
        //   if(this.filteredItems[i].moduleName=="Scholar"){
        //     this.filteredItems[i].icon="graduation-cap";
        //   }
        //   if(this.filteredItems[i].moduleName=="Projects"){
        //     this.filteredItems[i].icon="budget-alt";
        //   }
        //   if(this.filteredItems[i].moduleName=="Consultancy"){
        //     this.filteredItems[i].icon="leadership-alt";
        //   }
        //   if(this.filteredItems[i].moduleName=="Startups"){
        //     this.filteredItems[i].icon="rocket-lunch";
        //   }
        //   if(this.filteredItems[i].moduleName=="Patents"){
        //     this.filteredItems[i].icon="license";
        //   }
        //   if(this.filteredItems[i].moduleName=="Copyrights"){
        //     this.filteredItems[i].icon="copyright";
        //   }
        //   if(this.filteredItems[i].moduleName=="Trademarks"){
        //     this.filteredItems[i].icon="trademark";
        //   }
        //   if(this.filteredItems[i].moduleName=="Conferences"){
        //     this.filteredItems[i].icon="videoconference";
        //   }
        //   if(this.filteredItems[i].moduleName=="Books"){
        //     this.filteredItems[i].icon="books";
        //   }
        //   if(this.filteredItems[i].moduleName=="Guideship"){
        //     this.filteredItems[i].icon="tour-guide-people";
        //   }
        //   if(this.filteredItems[i].moduleName=="Editorship"){
        //     this.filteredItems[i].icon="tool-marquee";
        //   }
        //   if(this.filteredItems[i].moduleName=="Membership"){
        //     this.filteredItems[i].icon="meeting-alt";
        //   }
        //   if(this.filteredItems[i].moduleName=="Fellowships"){
        //     this.filteredItems[i].icon="transporter-2";
        //   }
        //   if(this.filteredItems[i].moduleName=="Collaborations"){
        //     this.filteredItems[i].icon="team-check-alt";
        //   }
        //   if(this.filteredItems[i].moduleName=="FDPs"){
        //     this.filteredItems[i].icon="magic-wand";
        //   }
        //   if(this.filteredItems[i].moduleName=="Clinical Trials"){
        //     this.filteredItems[i].icon="tubes";
        //   }
        //   if(this.filteredItems[i].moduleName=="Digital Learning"){
        //     this.filteredItems[i].icon="e-learning";
        //   }
        //   if(this.filteredItems[i].moduleName=="Extension Activities"){
        //     this.filteredItems[i].icon="hands-clapping";
        //   }
        //   if(this.filteredItems[i].moduleName=="Library Resources"){
        //     this.filteredItems[i].icon="book-copy";
        //   }
        //   if(this.filteredItems[i].moduleName=="Perception"){
        //     this.filteredItems[i].icon="waveform-path";
        //   }
        //   if(this.filteredItems[i].moduleName=="Awards"){
        //     this.filteredItems[i].icon="award";
        //   }

        // }

        //For digital counter
      this.counterMap = {}; 
      this.filteredItems.forEach((module) => {
        this.counterMap[module.moduleName] = module.totalCount >= 1 ? 0 : module.totalCount;
        
      });
      this.startTimer();

      this.counterMapExp = {}; 
      this.filteredExperts.forEach((module) => {
        this.counterMapExp[module.moduleName] = module.totalCount >= 1 ? 0 : module.totalCount;   
      });
      this.startTimerExp();

       this.routes.fragment.subscribe(fragment => {
        if (fragment === 'Tab12') {
          this.openScholarSection();
        } else if (fragment === 'Tab13') {
          this.openSponsoredSection();
        }
      });
    },
      
      (error) => {
        const errorUrl = this.route.createUrlTree(['/apierror/error/handle'], { queryParams: { message: error.message } }).toString();
        const newWindow = window.open(errorUrl, '_blank');
        newWindow.document.title = "Error Handling";
      }
    );

    //For global search filter in dashboard
    this.search.getSearchQuery().subscribe((query) => {
      this.filteredItems = this.models?.filter((item) =>
        item.moduleName.toLowerCase().includes(query.toLowerCase())
      );
    });

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

    
  openScholarSection() {
    const element = document.getElementById('scholar-section');
    element.scrollIntoView({ behavior: 'smooth' });
  }

  openSponsoredSection() {
    const element = document.getElementById('sponsored-section');
    element.scrollIntoView({ behavior: 'smooth' });
  }
  private startTimer(): void {
    if(this.filteredItems.length>0){
    this.filteredItems.forEach((module) => {
      const maxForModule = module.totalCount;
      const moduleName = module.moduleName;
  
      if (maxForModule >= 1) {
        const timer = setInterval(() => {
          if(this.counterMap[moduleName]==200){
             this.counterMap[moduleName]=maxForModule;
          }
         else if(this.counterMap[moduleName]>50&&this.counterMap[moduleName]<199){
          this.counterMap[moduleName]=maxForModule;
         }          
        else{
          this.counterMap[moduleName]++;
        }
          if (this.counterMap[moduleName] === maxForModule) {
            clearInterval(this.timers[moduleName]);
          }
        }, 10);
  
        this.timers[moduleName] = timer;
      }
    });
   }
  }

  private startTimerExp(): void {
    this.filteredExperts.forEach((module) => {
      const maxForModule = module.totalCount;
      const moduleName = module.moduleName;
  
      if (maxForModule >= 1) {
        const timer = setInterval(() => {
          if(this.counterMapExp[moduleName]==200){
             this.counterMapExp[moduleName]=maxForModule;
          }
         else if(this.counterMapExp[moduleName]>50&&this.counterMapExp[moduleName]<199){
          this.counterMapExp[moduleName]=maxForModule;
         }          
        else{
          this.counterMapExp[moduleName]++;
        }
          if (this.counterMapExp[moduleName] === maxForModule) {
            clearInterval(this.timersExp[moduleName]);
          }
        }, 10);
  
        this.timersExp[moduleName] = timer;
      }
    });
  }
  
  ngOnDestroy(): void {
    this.stopTimers();
  }

  private stopTimers(): void {
    Object.values(this.timers).forEach((timer) => {
      clearInterval(timer);
    });
    Object.values(this.timersExp).forEach((timer) => {
      clearInterval(timer);
    });
  }

      ngAfterViewInit(){
    
        this.startTimer();
    
      }

      homeCmp(){
          this.route.navigate(['/facultyProfiles/compare/dashboard']);
      }

      enableRorInfo(){
        this.enableRor=!this.enableRor;
      }

      enableExpert(){
         this.enableExp=!this.enableExp;
      }

      enableExpert1(){
        this.enableExp1=!this.enableExp1;
      }

      showMessage() {
        this.isMessageVisible = true;
      }
    
      hideMessage() {
        this.isMessageVisible = false;
      }
     
        topatents(val:number){
          if(val>0){
          this.route.navigate(['/Patent']);
           }
         }

         subModules(name:string,val:number){
            if(val>0){
              if(name=="Staff"){
                this.route.navigate(['/Staff']);
              }   
              else if(name=="Student"){
                this.route.navigate(['/Student']);
              }
            }
         }

}
