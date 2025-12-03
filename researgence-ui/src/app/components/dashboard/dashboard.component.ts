import { AuthService } from './../../shared/services/firebase/auth.service';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FacultiesService } from "../faculties/faculties.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonsearchService } from "src/app/shared/services/commonsearch.service";
import { MenuService } from 'src/app/shared/services/menu.service';
import { PubSearchList } from 'src/app/shared/model/PostPayload';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["../../../assets/given/newcss/style.css","./dashboard.component.css"],
  encapsulation: ViewEncapsulation.None,
})

export class DashboardComponent implements OnInit {
  models: any;
  public userName:string;
  public userDetail:any;
  searchboxfilter: string;
  isMenuOpen: boolean;
  isScrolled = false;
  public role:any;
  public roleName:any;
  pubSearchList: PubSearchList[];
  Name:string;
  filteredItems: { moduleName: string; totalCount: number; lineItem1Text: string; lineItem1Count: number; lineItem2Text: string; lineItem2Count: number;icon: string;enableModule: string }[] = [];
  subscription: any[]=[];
  newsub: any;
  subscriptionModule:string;
  department: any;
  location: any;
  school: any;
  institue:any;
  roleid: any;
  area: any;
  roleId: any;
  pubCount:number=0;
  patCount:number=0;
  editedPubCount:number=0;
  facCount:number=0;
  scholarCount:number=0;
  startupCount:number=0;
  studentCount:number=0;
  projectCount:number=0;
  constCount:number=0;
  dpCount:number=0;
  crCount:number=0;
  tmCount:number=0;
  hoverMessage: string = '';
  hoveredItem: any = null;
  newData = 'Module to be Enabled Soon';
  enableHex:boolean=true;
  moduleList:any;
  public topThreeModules: any[] = [];

  //SUBSCRIPTION ALERT 
  //  alertData: any;
  alertLevel: string = '';
  showModal = false;
  disableUI = false;
  showBanner = false;
   alertList: any[] = [];
  alertData: any = null;

  constructor(
    private route: Router,private service: FacultiesService,private search: CommonsearchService,private routes: ActivatedRoute, private authservice: AuthService,
     private menuService: MenuService) { }

  ngOnInit() {

    localStorage.removeItem('mineSearch');
    localStorage.removeItem('setFaculty');
    localStorage.removeItem('viewScore');
    this.userName=this.authservice.getProfileObs();
    this.userDetail=this.authservice.getUserDetail(); 
    this.roleId=this.authservice.getProfileObs();
     if(this.roleId==2||this.roleId==3||this.roleId==18){  
        this.enableHex=false
     }
    
    this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    //For rolename getting
    // this.authservice.RoleSelection(this.userDetail.UniversityId,this.userDetail.UserId).subscribe(x=>{
       this.role=JSON.parse(localStorage.getItem('RoleSelection'));
       console.log(this.role);
       
       const dataRole=this.role.filter(item=> item.roleId==this.userName);
       this.roleid=dataRole[0].roleId;
       this.roleName=dataRole[0].roleName.toUpperCase();
      //  })
    //for accessing menuopen 
    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });
           
        this.service.GetDashboard(this.userDetail.UniversityId,this.userName,this.userDetail.UserId).subscribe((x) => {
          this.models = x;

      // Ensure we pass an array to reorderModules to avoid null errors
      this.filteredItems = this.reorderModules(this.models);

      const data = (() => {
        try {
          return JSON.parse(localStorage.getItem('UnivSubcripModuleConsolidated'));
        } catch (e) {
          console.error('Failed to parse UnivSubcripModuleConsolidated from localStorage:', e);
          return null;
        }
      })();
      // this.service.getUnivCheckModule(this.userDetail.UniversityId).subscribe(t=>{  
        this.moduleList=data.univModuleCheck;
        console.log(this.filteredItems);

      for(let i=0;i<this.filteredItems.length;i++){

        if(this.moduleList.length>0){
            for(let j=0;j<this.moduleList.length;j++){
                 if(this.filteredItems[i].moduleName==this.moduleList[j].moduleName){
                     this.filteredItems[i].enableModule=this.moduleList[j].isApplicable;
                 }
            }
          }
         if(this.filteredItems[i].moduleName==="Publications"){
          if(this.filteredItems[i].totalCount>0){
             var pubCountStopper = setInterval(()=>{
              this.pubCount++;
              if(this.pubCount>=250){
               this.pubCount=this.filteredItems[i].totalCount;
              }
              if(this.pubCount==this.filteredItems[i].totalCount){
                 clearInterval(pubCountStopper);
              }
             },10)
            }
            else{
              this.pubCount=this.filteredItems[i].totalCount;
            }
           }
           if(this.filteredItems[i].moduleName==="Patents"){
            if(this.filteredItems[i].totalCount>0){
               var patCountStopperPat = setInterval(()=>{
                this.patCount++;
                if(this.patCount>=250){
                 this.patCount=this.filteredItems[i].totalCount;
                }
                if(this.patCount==this.filteredItems[i].totalCount){
                   clearInterval(patCountStopperPat);
                }
               },10)
              }
              else{
                this.pubCount=this.filteredItems[i].totalCount;
              }
             }

             if(this.filteredItems[i].moduleName==="Edited Publications"){
              if(this.filteredItems[i].totalCount>0){
                 var editpubCountStopperPat = setInterval(()=>{
                  this.editedPubCount++;
                  if(this.editedPubCount>=250){
                   this.editedPubCount=this.filteredItems[i].totalCount;
                  }
                  if(this.editedPubCount==this.filteredItems[i].totalCount){
                     clearInterval(editpubCountStopperPat);
                  }
                 },10)
                }
                else{
                  this.editedPubCount=this.filteredItems[i].totalCount;
                }
               }

           if(this.filteredItems[i].moduleName==="Faculty"){
            if(this.filteredItems[i].totalCount>0){
            var facCountStopper = setInterval(()=>{
             this.facCount++;
             if(this.facCount>=250){
               this.facCount=this.filteredItems[i].totalCount;
              }
             if(this.facCount==this.filteredItems[i].totalCount){
                clearInterval(facCountStopper);
             }
            },10)
           }
           else{
            this.facCount=this.filteredItems[i].totalCount;
           }
          }
          if(this.filteredItems[i].moduleName=="Scholar"){
            if(this.filteredItems[i].totalCount>0){
            var scholarCountStopper = setInterval(()=>{
             this.scholarCount++;
             if(this.scholarCount>=250){
               this.scholarCount=this.filteredItems[i].totalCount;
              }
             if(this.scholarCount==this.filteredItems[i].totalCount){
                clearInterval(scholarCountStopper);
             }
            },10)
           }
           else{
            this.scholarCount=this.filteredItems[i].totalCount;
           }
          }
          if(this.filteredItems[i].moduleName=="Staff"){
            if(this.filteredItems[i].totalCount>0){
            var startupCountStopper = setInterval(()=>{
             this.startupCount++;
             if(this.startupCount>=250){
               this.startupCount=this.filteredItems[i].totalCount;
              }
             if(this.startupCount==this.filteredItems[i].totalCount){
                clearInterval(startupCountStopper);
             }
            },10)
           }
           else{
            this.startupCount=this.filteredItems[i].totalCount;
           }
          }
          if(this.filteredItems[i].moduleName=="Student"){
            if(this.filteredItems[i].totalCount>0){
            var studentCountStopper = setInterval(()=>{
             this.studentCount++;
             if(this.studentCount>=250){
               this.studentCount=this.filteredItems[i].totalCount;
              }
             if(this.studentCount==this.filteredItems[i].totalCount){
                clearInterval(studentCountStopper);
             }
            },10)
           }
           else{
            this.studentCount=this.filteredItems[i].totalCount;
           }
          }
          if(this.filteredItems[i].moduleName=="Projects"){
            if(this.filteredItems[i].totalCount>0){
            var projectCountStopper = setInterval(()=>{
             this.projectCount++;
             if(this.projectCount>=250){
               this.projectCount=this.filteredItems[i].totalCount;
              }
             if(this.projectCount==this.filteredItems[i].totalCount){
                clearInterval(projectCountStopper);
             }
            },10)
           }
           else{
            this.projectCount=this.filteredItems[i].totalCount;
           }
          }

          if(this.filteredItems[i].moduleName=="Design Patent"){
            if(this.filteredItems[i].totalCount>0){
            var dpCountStopper = setInterval(()=>{
             this.dpCount++;
             if(this.dpCount>=250){
               this.dpCount=this.filteredItems[i].totalCount;
              }
             if(this.dpCount==this.filteredItems[i].totalCount){
                clearInterval(dpCountStopper);
             }
            },10)
           }
           else{
            this.dpCount=this.filteredItems[i].totalCount;
           }
          }

          if(this.filteredItems[i].moduleName=="Copyrights"){
            if(this.filteredItems[i].totalCount>0){
            var crCountStopper = setInterval(()=>{
             this.crCount++;
             if(this.crCount>=250){
               this.crCount=this.filteredItems[i].totalCount;
              }
             if(this.crCount==this.filteredItems[i].totalCount){
                clearInterval(crCountStopper);
             }
            },10)
           }
           else{
            this.crCount=this.filteredItems[i].totalCount;
           }
          }

          if(this.filteredItems[i].moduleName=="Trademarks"){
            if(this.filteredItems[i].totalCount>0){
            var tmCountStopper = setInterval(()=>{
             this.tmCount++;
             if(this.tmCount>=250){
               this.tmCount=this.filteredItems[i].totalCount;
              }
             if(this.tmCount==this.filteredItems[i].totalCount){
                clearInterval(tmCountStopper);
             }
            },10)
           }
           else{
            this.tmCount=this.filteredItems[i].totalCount;
           }
          }

          if(this.filteredItems[i].moduleName=="Consultancy"){
            if(this.filteredItems[i].totalCount>0){
            var constCountStopper = setInterval(()=>{
             this.constCount++;
             if(this.constCount>=250){
               this.constCount=this.filteredItems[i].totalCount;
              }
             if(this.constCount==this.filteredItems[i].totalCount){
                clearInterval(constCountStopper);
             }
            },10)
           }
           else{
            this.constCount=this.filteredItems[i].totalCount;
           }
          }
         }

         const enabledModules = this.filteredItems.filter(item =>
          item.enableModule === 'True' &&
          !['Faculty', 'Scholar', 'Staff', 'Student', 'Consultancy'].includes(item.moduleName)
        );
          console.log(enabledModules);

        this.topThreeModules = enabledModules.slice(0, 3); // still picking top 3
        });

      this.getdata();
      this.getresearcher();

      
    //  this.service.GetUniversityPlanExpiryAlerts(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId)
    //   .subscribe({
    //     next: (res: any) => {
    //       if (!res) return;
    //       this.alertData = res;

    //       // Example mapping (depends on your API response)
    //       const level = res.alertLevel?.toUpperCase();
    //       this.alertLevel = level;

    //       if (level === 'EXPIRED') {
    //         this.showModal = true;
    //         this.disableUI = true;
    //       } else if (level === 'CRITICAL' || level === 'HIGH') {
    //         this.showModal = true;
    //       } else if (level === 'MEDIUM' || level === 'LOW') {
    //         this.showBanner = true;
    //       }
    //     },
    //     error: (err) => {
    //       console.error('Error fetching alert:', err);
    //     }
    //   });

    


    // this.service.GetUniversityPlanExpiryAlerts(this.userDetail.UniversityId,this.userName, this.userDetail.UserId)
    //   .subscribe({
    //     next: (res: any) => {
    //       console.log('🔹 Alert API Response:', res);
    //       // if (!Array.isArray(res) || res.length === 0) return;

    //        // If response is empty or not an array, treat it as expired
    //   if (!Array.isArray(res) || res.length === 0) {
    //     console.warn('⚠️ No alerts found — treating as expired.');
    //     this.alertData = {
    //       alertLevel: '1',
    //       message: 'Your university plan has expired.',
    //       isExpired: '1'
    //     };
    //     this.showModal = true;
    //     this.disableUI = true;
    //     return;
    //   }

    //       this.alertList = res;

    //       // Filter only the alert for this user’s universityId if needed:
    //       // const alert = res.find(a => a.universityId === univId.toString());
    //       // if (!alert) return;

    //       // --- For Management (RoleId 6), check CRITICAL/HIGH/LOW etc ---
    //       // Find the highest-priority alert
    //       const critical = res.find(a => a.alertLevel.toUpperCase() === 'CRITICAL' || a.alertLevel.toUpperCase() === 'HIGH');
    //       const expired  = res.find(a => a.isExpired === '1');
    //       const mediumLow = res.find(a => a.alertLevel.toUpperCase() === 'LOW' || a.alertLevel.toUpperCase() === 'MEDIUM');

    //       if (expired) {
    //         this.alertData = expired;
    //         this.showModal = true;
    //         this.disableUI = true;
    //       } else if (critical) {
    //         this.alertData = critical;
    //         this.showModal = true;
    //       } else if (mediumLow) {
    //         this.alertData = mediumLow;
    //         this.showBanner = true;
    //       }
    //     },
    //     error: (err) => {
    //       console.error('❌ Error fetching alerts:', err);
    //     }
    //   });
  


    // this.service.GetUniversityPlanExpiryAlerts(this.userDetail.UniversityId,this.userName,this.userDetail.UserId).subscribe({
    // next: (res: any) => {
      let res=JSON.parse(localStorage.getItem('UnivSubcripModuleConsolidated'));
      console.log('🔹 Alert API Response:', res);

      // Only process alerts when res is an array with elements. Otherwise skip alert logic.
      if (!Array.isArray(res) || res.length === 0) {
        console.info('No alert array available — skipping alert modal and leaving UI enabled.');
        this.alertList = [];
        this.showModal = false;
        this.showBanner = false;
        this.disableUI = false;
      } else {
        // Save the alerts list for any other use
        this.alertList = res;

        // Look for priority alerts
        const expired  = res.find(a => a.isExpired === '1');
        const critical = res.find(a => a.alertLevel?.toUpperCase() === 'CRITICAL' || a.alertLevel?.toUpperCase() === 'HIGH');
        const mediumLow = res.find(a => a.alertLevel?.toUpperCase() === 'MEDIUM' || a.alertLevel?.toUpperCase() === 'LOW');

        if (expired) {
          // Expired → block entire UI
          this.alertData = expired;
          this.showModal = true;
          this.disableUI = true;
        } else if (critical) {
          // Critical → show modal but UI not blocked
          this.alertData = critical;
          this.showModal = true;
          this.disableUI = false;
        } else if (mediumLow) {
          // Medium/Low → scrolling banner
          this.alertData = mediumLow;
          this.showBanner = true;
          this.disableUI = false;
        } else {
          // No alerts → normal UI
          this.showModal = false;
          this.showBanner = false;
          this.disableUI = false;
        }
      }
      
    // ,
    // error: (err) => {
    //   console.error('❌ Error fetching alerts:', err);
    //   // On error, optionally disable UI
    //   this.alertData = {
    //     alertLevel: 'CRITICAL',
    //     alertMessage: 'Unable to fetch alerts. UI temporarily disabled.',
    //     isExpired: '0'
    //   };
    //   this.showModal = true;
    //   this.disableUI = true;
    // }
  // });

  
      
   }

   
  closeModal() {
    this.showModal = false;
  }


      getdata(){

          const data = JSON.parse(localStorage.getItem('UnivSubcripModuleConsolidated'));
        // this.service.getUnivSubscriptionModule(this.userDetail.UniversityId,this.userName,this.userDetail.UserId).subscribe((data:any)=>{
          this.subscription = data.univSubscriptionModuleCheck;
          console.log(this.subscription);
          
          this.newsub = this.subscription.filter(x => x.isApplicable !== "0"&&x.subscriptionModule!=="ROR"&&x.subscriptionModule!=="Experts"&&x.subscriptionModule!=="ResearchTrends");
         
          if(this.newsub.length>1){
            for(let i=0;i<this.newsub.length;i++){
                if(this.newsub[i].subscriptionModule=="Scorebook"){
                  this.newsub[i].routeUrl="/scorebook";
                }
                else if(this.newsub[i].subscriptionModule=="TurnkeyReports"){
                  this.newsub[i].routeUrl="/turnkey";
                }
                else if(this.newsub[i].subscriptionModule=="Journalopedia"){
                  this.newsub[i].routeUrl="/journal-search";
                }
                else if(this.newsub[i].subscriptionModule=="PerformanceAnalysis"){
                  if(this.roleId==6||this.roleId==7||this.roleId==8||this.roleId==9||this.roleId==10||this.roleId==16){
                      this.newsub[i].routeUrl="/performance-analysis-dashboard";
                  }
                  else{
                    this.newsub[i].routeUrl="/Home";
                    // delete this.newsub[i].subscriptionModule;
                    this.newsub.splice(i, 1)
                  }
                }
                else{
                  this.newsub[i].routeUrl="/Home";
                }
            }
          } 

           // ✅ Remove duplicate subscriptionModule names
          this.newsub = this.newsub.filter(
            (obj, index, self) =>
              index === self.findIndex((t) => t.subscriptionModule === obj.subscriptionModule)
          );
          
          console.log(this.newsub);
        // })
      }



      getresearcher(){
        this.service.getresearcharea(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.location,this.school,this.institue,this.department).subscribe(data =>{
         this.area=data;
         console.log(this.area);
         })
      }

     toDetail(){
        this.route.navigate(['/Dashboard']);
       }   

      toPubDetail(){
        this.route.navigate(['/Publications/Dashboard']);
      }

      toFaculty(){
        this.route.navigate(['/facultyProfiles']);
        if(this.roleId==2||this.roleId==18){
        localStorage.setItem("setFaculty","faculty")
        }
      }

      toScholar(){
        this.route.navigate(['/scholar']);
      }

      toStaff(){
        this.route.navigate(['/Staff']);
      }

      toStudent(){
        this.route.navigate(['/Student']);
      }

      toScorebook(subscriptionModule: string){
        console.log("scorebook",subscriptionModule);
        if(subscriptionModule=="Scorebook"){
        this.route.navigate(['/scorebook' ]);
         }else if(subscriptionModule=="TurnkeyReports"){
          this.route.navigate(['/turnkey' ]);
         }else if(subscriptionModule=="Journalopedia"){
          this.route.navigate(['/journal-search' ]);
         }else if(subscriptionModule=="PerformanceAnalysis"){
          if(this.roleId==6||this.roleId==7||this.roleId==8||this.roleId==9||this.roleId==10||this.roleId==16){
          this.route.navigate(['/facultyProfiles/compare/fac']);  
            }
            else{
              this.hoverMessage = 'The module to be enabled soon';
            } 
         }else{
          this.hoverMessage = 'The module to be enabled soon';
         }
       }

       toproject(){
        this.route.navigate(['/facultyProfiles/Project/Dashboard']);
       }

       topatents(val:number){
        if(val>0){
        this.route.navigate(['/Patent']);
         }
       }
       
       toInfo(type){        
         this.route.navigate(['/Info/'+type+'/'+this.userDetail.University]);         
       }

       onHover(item: any) {
        if (item.subscriptionModule === 'PerformanceAnalysis' || item.subscriptionModule === 'Public Visibility Suite') {
          this.hoveredItem = item;
        }
      }
    
      onLeave() {
        this.hoveredItem = null;
      }
    
      shouldDisplayNewData(item: any): boolean {
        return (item.subscriptionModule === 'Public Visibility Suite') && item === this.hoveredItem;
      }

      getStyle(item: any): any {
        if (item === this.hoveredItem && (item.subscriptionModule === 'Public Visibility Suite')) {
          return { backgroundColor: 'black', color: 'white',cursor:'default' };
        } else {
          return {};
        }
      }

      toMyprofile(){
        this.route.navigate(["/facultyProfiles/"+this.userDetail.UserId])
      }

     reorderModules(modules: any[]): any[] {
    if (!modules || !Array.isArray(modules)) {
      console.warn('reorderModules called with invalid modules:', modules);
      return [];
    }

    const publicationsIndex = modules.findIndex(m => m.moduleName === "Publications");
    const patentsIndex = modules.findIndex(m => m.moduleName === "Patents");
    
        if (publicationsIndex !== -1 && patentsIndex !== -1 && patentsIndex !== publicationsIndex + 1) {
            // Remove "Patents" from its current position
            const [patentsModule] = modules.splice(patentsIndex, 1);
            // Insert "Patents" right after "Publications"
            modules.splice(publicationsIndex + 1, 0, patentsModule);
        }
    
        return modules;
      }

      
      getCount(moduleName: string): number {
        switch (moduleName) {
          case 'Publications':
            return this.pubCount;
          case 'Patents':
            return this.patCount;
          case 'Edited Publications':
            return this.editedPubCount;
          case 'Projects':
            return this.projectCount;
          case 'Faculty':
            return this.facCount;
          case 'Scholar':
            return this.scholarCount;
          case 'Staff':
            return this.startupCount;
          case 'Student':
            return this.studentCount;
          case 'Design Patent':
            return this.dpCount;
          case 'Copyrights':
            return this.crCount;
          case 'Consultancy':
            return this.constCount;
          case 'Trademarks':
            return this.tmCount;
          default:
            return 0;
        }
      }


      getRouterLink(moduleName: string): string {
          switch (moduleName) {
            case 'Publications':
              return '/Publications/Dashboard';
            case 'Patents':
              return '/Patent';
            case 'Edited Publications':
              return '/scorebook/Publications/Mine/EditedPublication';
            case 'Projects':
              return '/Project/Dashboard';
              case 'Design Patent':
              return '/scorebook/Publications/Mineresult/designpatent';
              case 'Copyrights':
              return '/Copyrights/mineResult';
              case 'Trademarks':
              return '/Trademark/mineResult';
            default:
              return '';
          }
        }

    }
