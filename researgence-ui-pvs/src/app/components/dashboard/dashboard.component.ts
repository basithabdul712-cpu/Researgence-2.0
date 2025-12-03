import { AuthService } from './../../shared/services/firebase/auth.service';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FacultiesService } from "../faculties/faculties.service";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { CommonsearchService } from "src/app/shared/services/commonsearch.service";
import { MenuService } from 'src/app/shared/services/menu.service';
import { NumencoderService } from 'src/app/shared/services/numencoder.service';
import { UniversityidService } from 'src/app/shared/services/universityid.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["../../../assets/given/newcss/style.css", "./dashboard.component.css"],
  encapsulation: ViewEncapsulation.None,
})

export class DashboardComponent implements OnInit {
  models: any;
  public userName: string;
  public userDetail: any;
  searchboxfilter: string;
  isMenuOpen: boolean;
  isScrolled = false;
  public role: any;
  public roleName: any;
  Name: string;
  filteredItems: { moduleName: string; totalCount: number; lineItem1Text: string; lineItem1Count: number; lineItem2Text: string; lineItem2Count: number; icon: string,enableModule: string }[] = [];
  subscription: any[] = [];
  newsub: any;
  subscriptionModule: string;
  department: any;
  location: any;
  school: any;
  institue: any;
  roleid: any;
  area: any;
  roleId: any;
  pubCount: number = 0;
  patCount: number = 0;
  facCount: number = 0;
  scholarCount: number = 0;
  startupCount: number = 0;
  studentCount: number = 0;
  projectCount: number = 0;
  constCount: number = 0;
  hoverMessage: string = '';
  hoveredItem: any = null;
  newData = 'Module to be Enabled Soon';
  enableHex: boolean = true;
  univId: any;
  moduleList:any;

  constructor(
    private route: Router, private service: FacultiesService, private search: CommonsearchService, private routes: ActivatedRoute, private authservice: AuthService,
    private menuService: MenuService, private encoderservice: NumencoderService ,private univservice: UniversityidService) { }

  ngOnInit() {
    localStorage.removeItem('mineSearch');
    localStorage.removeItem('setFaculty');
    localStorage.removeItem('viewScore');
    this.authservice.setProfileObs('6');
    this.userName = this.authservice.getProfileObs();
    console.log(this.userName);
  
    this.roleId = this.authservice.getProfileObs();

    if (this.roleId == 2 || this.roleId == 3) {
      this.enableHex = false;
    }
    
    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
      console.log(this.isMenuOpen);
    });

    console.log(window.location.hostname);
    let endIndex=window.location.hostname.indexOf(".");
    let univName=window.location.hostname.slice(0, endIndex);
    if(univName.includes("pvsdev")||window.location.hostname==environment.commonIP){
      this.univId=localStorage.getItem("initialUniv");
      this.getdata();
     }
     else{
      localStorage.removeItem("initialUniv");
      if(univName.includes("ashokapvs")){
        this.univId=4395;
      }
      else if(univName.includes("jisgrouppvs")){
        this.univId=43;
      }
      localStorage.setItem("initialUniv",this.univId);
      this.getdata();
     }

    console.log(this.univId);

  }

  getdata() {
    this.service.GetDashboard(this.univId, this.userName).subscribe(
      (x) => {
        this.models = x;
        this.filteredItems = this.reorderModules(this.models);
        this.service.getUnivCheckModule(this.univId).subscribe(t=>{  
          this.moduleList=t;
        console.log(this.filteredItems);
        for (let i = 0; i < this.filteredItems.length; i++) {

          if(this.moduleList.length>0){
            for(let j=0;j<this.moduleList.length;j++){
                 if(this.filteredItems[i].moduleName==this.moduleList[j].moduleName){
                     this.filteredItems[i].enableModule=this.moduleList[j].isApplicable
                 }
               }
          }

          if (this.filteredItems[i].moduleName === "Publications") {
            if (this.filteredItems[i].totalCount > 0) {
              var pubCountStopper = setInterval(() => {
                this.pubCount++;
                if (this.pubCount >= 250) {
                  this.pubCount = this.filteredItems[i].totalCount;
                }
                if (this.pubCount == this.filteredItems[i].totalCount) {
                  clearInterval(pubCountStopper);
                }
              }, 10)
            }
            else {
              this.pubCount = this.filteredItems[i].totalCount;
            }
          }
          if (this.filteredItems[i].moduleName === "Patents") {
            if (this.filteredItems[i].totalCount > 0) {
              var pubCountStopperPat = setInterval(() => {
                this.patCount++;
                if (this.patCount >= 250) {
                  this.patCount = this.filteredItems[i].totalCount;
                }
                if (this.patCount == this.filteredItems[i].totalCount) {
                  clearInterval(pubCountStopperPat);
                }
              }, 10)
            }
            else {
              this.pubCount = this.filteredItems[i].totalCount;
            }
          }
          if (this.filteredItems[i].moduleName === "Faculty") {
            if (this.filteredItems[i].totalCount > 0) {
              var facCountStopper = setInterval(() => {
                this.facCount++;
                if (this.facCount >= 250) {
                  this.facCount = this.filteredItems[i].totalCount;
                }
                if (this.facCount == this.filteredItems[i].totalCount) {
                  clearInterval(facCountStopper);
                }
              }, 10)
            }
            else {
              this.facCount = this.filteredItems[i].totalCount;
            }
          }
          if (this.filteredItems[i].moduleName == "Scholar") {
            if (this.filteredItems[i].totalCount > 0) {
              var scholarCountStopper = setInterval(() => {
                this.scholarCount++;
                if (this.scholarCount >= 250) {
                  this.scholarCount = this.filteredItems[i].totalCount;
                }
                if (this.scholarCount == this.filteredItems[i].totalCount) {
                  clearInterval(scholarCountStopper);
                }
              }, 10)
            }
            else {
              this.scholarCount = this.filteredItems[i].totalCount;
            }
          }
          if (this.filteredItems[i].moduleName == "Staff") {
            if (this.filteredItems[i].totalCount > 0) {
              var startupCountStopper = setInterval(() => {
                this.startupCount++;
                if (this.startupCount >= 250) {
                  this.startupCount = this.filteredItems[i].totalCount;
                }
                if (this.startupCount == this.filteredItems[i].totalCount) {
                  clearInterval(startupCountStopper);
                }
              }, 10)
            }
            else {
              this.startupCount = this.filteredItems[i].totalCount;
            }
          }
          if (this.filteredItems[i].moduleName == "Student") {
            if (this.filteredItems[i].totalCount > 0) {
              var studentCountStopper = setInterval(() => {
                this.studentCount++;
                if (this.studentCount >= 250) {
                  this.studentCount = this.filteredItems[i].totalCount;
                }
                if (this.studentCount == this.filteredItems[i].totalCount) {
                  clearInterval(studentCountStopper);
                }
              }, 10)
            }
            else {
              this.studentCount = this.filteredItems[i].totalCount;
            }
          }
          if (this.filteredItems[i].moduleName == "Projects") {
            if (this.filteredItems[i].totalCount > 0) {
              var projectCountStopper = setInterval(() => {
                this.projectCount++;
                if (this.projectCount >= 250) {
                  this.projectCount = this.filteredItems[i].totalCount;
                }
                if (this.projectCount == this.filteredItems[i].totalCount) {
                  clearInterval(projectCountStopper);
                }
              }, 10)
            }
            else {
              this.projectCount = this.filteredItems[i].totalCount;
            }
          }
          if (this.filteredItems[i].moduleName == "Consultancy") {
            if (this.filteredItems[i].totalCount > 0) {
              var constCountStopper = setInterval(() => {
                this.constCount++;
                if (this.constCount >= 250) {
                  this.constCount = this.filteredItems[i].totalCount;
                }
                if (this.constCount == this.filteredItems[i].totalCount) {
                  clearInterval(constCountStopper);
                }
              }, 10)
            }
            else {
              this.constCount = this.filteredItems[i].totalCount;
            }
          }
        }
       });
      });
      
    console.log(this.filteredItems);
    this.service.getresearcharea(this.univId, this.userName).subscribe(data => {
      this.area = data;
      console.log(this.area);
     });
    
  }



  toDetail() {
    this.route.navigate(['/Dashboard']);
  }

  toPubDetail() {
    this.route.navigate(['/Publications/Dashboard']);
  }

  toFaculty() {
    this.route.navigate(['/facultyProfiles']);
    if (this.roleId == 2) {
      localStorage.setItem("setFaculty", "faculty")
    }
  }

  toScholar() {
    this.route.navigate(['/scholar']);
  }

  toStaff() {
    this.route.navigate(['/Staff']);
  }

  toStudent() {
    this.route.navigate(['/Student']);
  }

  toScorebook(subscriptionModule: string) {
    console.log("scorebook", subscriptionModule);
    if (subscriptionModule == "Scorebook") {
      this.route.navigate(['/scorebook']);
    } else if (subscriptionModule == "TurnkeyReports") {
      this.route.navigate(['/turnkey']);
    } else if (subscriptionModule == "Journalopedia") {
      this.route.navigate(['/journal-search']);
    } else if (subscriptionModule == "PerformanceAnalysis") {
      if (this.roleId == 6 || this.roleId == 7 || this.roleId == 8 || this.roleId == 9 || this.roleId == 10 || this.roleId == 16) {
        this.route.navigate(['/facultyProfiles/compare/fac']);
      }
      else {
        this.hoverMessage = 'The module to be enabled soon';
      }
    } else {
      this.hoverMessage = 'The module to be enabled soon';
    }
  }

  toproject() {
    this.route.navigate(['/facultyProfiles/Project/Dashboard']);
  }

  topatents(val: number) {
    if (val > 0) {
      this.route.navigate(['/Patent']);
    }
  }

  toInfo(type) {
    this.route.navigate(['/Info/' + type + '/' + this.userDetail.University]);
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
      return { backgroundColor: 'black', color: 'white', cursor: 'default' };
    } else {
      return {};
    }
  }

  toMyprofile() {
    this.route.navigate(["/facultyProfiles/" + this.userDetail.UserId])
  }

  
  reorderModules(modules: any[]): any[] {
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

}
