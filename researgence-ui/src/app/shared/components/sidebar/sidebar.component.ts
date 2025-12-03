import { FacultiesService } from './../../../components/faculties/faculties.service';
import { AuthService } from './../../services/firebase/auth.service';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { NavService, Menu } from '../../services/nav.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {

  public editUrl:string;
  public menuItems: Menu[];
  public url: any;
  public fileurl: any;
  public user:any;
  public userName:string;
  public designation:string;
  public locationName:string;
  public schoolName:string;
  public instituteName:string;
  public departmentName:string;
  public role:string;
  public userRole:any;
  public children: any[];
  public responseData:any;
  public childrenToAdd:any;
  public imgUrl: any;
  public librarian=[1,2,3,4,5,6,7,8,9,10,11,12,13,15,16,18]
  public cisupport = [11];
  public Cisuperadmin = [5,2,3,4,10,6,7,8,9,11,15,16,17,18]; 
  public CisupportAdmin =[10]
  public scorebookrole = [5,12,11,13,17];
  public turnkey=[5,12,11,13,17];
  public commonrole = [5,2,3,4,10,6,7,8,9,11,13,15,16,17,18];
  public generalrole = [2,3,4,6,7,8,9,10,11,12,13,15,16,18];
  public clientadminrole = [2,3,4,6,7,8,9,10,11,13,15,16,18];
  public dashboardrole = [5,11,12,13,17];
  public facultyrole = [5,11,12,13,17];
  public dfsrole= [5,6,2,3,4,10,7,8,9,11,13,15,16,17,18];
  public rfsRole=[5,11,12,13,17];
  public subRole=[2,3,4,6,7,8,9,10,13,15,16,18]
  public rfsSupportAdminRole=[1,2,3,4,5,6,7,8,9,10,11,13,15,16,17,18];
  public hiddenScr=[1,2,3,4,5,6,7,8,9,10,11,12,13,15,16,17,18];
  public supportMenuRole=[1,4,5,6,8,9,10,11,12,13,16,17];
  public filterSupportTab=[2,3,18];
  userImage: string;
  imgPath:any;
  checkMenuAvailability:any=[];
  subscriptionmodule:any=[];
  dashboardLink:any={
    "path": "/Dashboard",
    "title": "Dashboard",
    "type": "link",
    "icon": "airplay",
    "onClick": "openCard"};
    public roleId: number;
    moduleList:any;

  constructor(private http: HttpClient,private router: Router, public navServices: NavService,public authService:AuthService,private location: Location,private service:FacultiesService) {
   this.role=this.authService.getProfileObs();
   this.roleId = parseInt(this.role);
    this.user=this.authService.getUserDetail();
    this.userName=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.designation=this.user['Designation'];
    this.locationName=this.user['LocationName'];
    this.schoolName=this.user['SchoolName'];
    this.instituteName=this.user['InstituteName'];
    this.departmentName=this.user['DepartmentName']

    if(this.role!=undefined){

    this.service.GetDashboard(this.user.UniversityId,this.role,this.user.UserId).subscribe(x=>{
      this.responseData=x;
      const children = this.responseData.map((data, index) => ({
        path: data.moduleName === 'Faculty' ? '/facultyProfiles' :
        // data.moduleName === 'Projects' ? '/facultyProfiles/Project/Dashboard':
        data.moduleName === 'Scholar' ? '/scholar':
        data.moduleName === 'Staff' ? '/Staff':
        data.moduleName === 'Student' ? '/Student':
        data.moduleName === 'Trademarks' ? '/Trademark/mineResult':
        data.moduleName === 'Edited Publications' ? '/scorebook/Publications/Mine/EditedPublication':
        data.moduleName === 'Patents' ? '/Patent':
        data.moduleName === 'Design Patent' ? '/scorebook/Publications/Mineresult/designpatent':
        data.moduleName === 'Copyrights' ? '/Copyrights/mineResult':
        data.moduleName === 'Publications' ? '/Publications/Dashboard' : `/Home`,
        title: data.moduleName=== 'Faculty' ? 'Faculty': data.moduleName,
        type: 'link',
        icon: 'airplay',
        onClick: 'openCard'
      }));
        this.childrenToAdd=children;

      this.navServices.items.subscribe(menuItems => {
        this.menuItems = menuItems;
        console.log(menuItems);
        if(this.subRole.includes(Number(this.role))){
        for(let i=0;i<this.menuItems.length;i++){
          if(this.menuItems[i].title=="My Profile"){
            this.menuItems[i].path="/facultyProfiles/"+this.user.UserId;
          }
          if(this.menuItems[i].title=="Research Outputs"){
            this.menuItems[i].children.push(this.dashboardLink);
            for(let j=0;j<this.childrenToAdd.length;j++){
              if(this.childrenToAdd[j].title=="Faculty"||this.childrenToAdd[j].title=="Scholar"||this.childrenToAdd[j].title=="Startups"||this.childrenToAdd[j].title=="Student Researchers"){
              }
              else{
                this.menuItems[i].children.push(this.childrenToAdd[j]);
              }
            }
          }

          if(this.menuItems[i].title=="Expert Profiles"){
            for(let k=0;k<this.childrenToAdd.length;k++){
              if(this.childrenToAdd[k].title=="Faculty"||this.childrenToAdd[k].title=="Scholar"||this.childrenToAdd[k].title=="Startups"||this.childrenToAdd[k].title=="Student Researchers"){
            this.menuItems[i].children.push(this.childrenToAdd[k]);
          }
            }
          }

        //   if(this.menuItems[i].title=="R+ Subscriptions"){
        //   this.service.getUnivSubscriptionModule(this.user.UniversityId).subscribe(x=>{
        //     this.checkMenuAvailability=x;
             
        //     for(let m=0;m<this.checkMenuAvailability.length;m++){
        //       if(this.checkMenuAvailability[m].subscriptionModule==="Public Visibility Suite"&&this.checkMenuAvailability[m].isApplicable==="0"){
        //     const indexToRemove = this.menuItems[i].children.findIndex(item => item.title === 'Public Visibility');
        //     if (indexToRemove !== -1) {
        //       this.menuItems[i].children.splice(indexToRemove, 1);
        //        }
        //      }
        //      if(this.checkMenuAvailability[m].subscriptionModule==="PerformanceAnalysis"&&this.checkMenuAvailability[m].isApplicable==="0"){
        //       const indexToRemove = this.menuItems[i].children.findIndex(item => item.title === 'Performance Analysis');
        //       if (indexToRemove !== -1) {
        //         this.menuItems[i].children.splice(indexToRemove, 1);
        //          }
        //        }
        //        if(this.checkMenuAvailability[m].subscriptionModule==="TurnkeyReports"&&this.checkMenuAvailability[m].isApplicable==="0"){
        //         const indexToRemove = this.menuItems[i].children.findIndex(item => item.title === 'Turnkey Reports');
        //         if (indexToRemove !== -1) {
        //           this.menuItems[i].children.splice(indexToRemove, 1);
        //            }
        //          }
        //          if(this.checkMenuAvailability[m].subscriptionModule==="Scorebook"&&this.checkMenuAvailability[m].isApplicable==="0"){
        //           const indexToRemove = this.menuItems[i].children.findIndex(item => item.title === 'Score Book');
        //           if (indexToRemove !== -1) {
        //             this.menuItems[i].children.splice(indexToRemove, 1);
        //              }
        //            }
        //            if(this.checkMenuAvailability[m].subscriptionModule==="Journalopedia"&&this.checkMenuAvailability[m].isApplicable==="0"){
        //             const indexToRemove = this.menuItems[i].children.findIndex(item => item.title === 'Journalopedia');
        //             if (indexToRemove !== -1) {
        //               this.menuItems[i].children.splice(indexToRemove, 1);
        //                }
        //              }
        //         }
        //     })      
        // }

      }   
    } 
      
            //logic for modifying the menuItems array
            if (this.scorebookrole.includes(Number(this.role))) {
              const index = menuItems.findIndex(item => item.path === '/scorebook');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            }
            if (this.turnkey.includes(Number(this.role))) {
              const index = menuItems.findIndex(item => item.path === '/turnkey');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            }
      
            if (this.dashboardrole.includes(Number(this.role))) {
              const index = menuItems.findIndex(item => item.path === '/Home');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            } 
            if (this.hiddenScr.includes(Number(this.role))) {
              const index = menuItems.findIndex(item => item.path === '/Dashboard');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            } 
            if (this.facultyrole.includes(Number(this.role))) {
              const index = menuItems.findIndex(item => item.path === '/facultyProfiles');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            } 
            if (this.rfsRole.includes(Number(this.role))) {
              const index = menuItems.findIndex(item => item.path === '/facultyProfiles/Support/MyAdditions');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            }
            if (this.clientadminrole.includes(Number(this.role)) ) {
              const index = menuItems.findIndex(item => item.path === '/clientadmin/user/screen');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            } 
            if(this.generalrole.includes(Number(this.role))) {
              const index = menuItems.findIndex(item => item.title === 'User Statistics');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            } 
            if(this.generalrole.includes(Number(this.role)) ) {
              const index = menuItems.findIndex(item => item.title === 'Admin Feeder System');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            } 
            if(this.generalrole.includes(Number(this.role))) {
              const index = menuItems.findIndex(item => item.title === 'Bulk Upload');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            } 
            if(this.generalrole.includes(Number(this.role))) {
              const index = menuItems.findIndex(item => item.title === 'User Data Validation');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            }

            //supportadmin menu show
           
            if(this.dfsrole.includes(Number(this.role)) ) {
              const index = menuItems.findIndex(item => item.path === '/clientadmin/universitySelect/DFS/add/addnew');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            } 
            if(this.dfsrole.includes(Number(this.role))) {
              const index = menuItems.findIndex(item => item.path === '/clientadmin/universitySelect/DFS/viewDfs/university');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            } 
            if(this.dfsrole.includes(Number(this.role))) {
              const index = menuItems.findIndex(item => item.path === '/clientadmin/admin-service-request');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            }
            if(this.rfsSupportAdminRole.includes(Number(this.role))) {
              const index = menuItems.findIndex(item => item.path === '/clientadmin/universitySelect/RFS/view/univ');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            }
            
            if (this.hiddenScr.includes(Number(this.role))) {
              const index = menuItems.findIndex(item => item.path === '/scorebook/Publications/InsightReports');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
            }
            if(this.dashboardrole.includes(Number(this.role))){
              const index = menuItems.findIndex(item => item.title === 'Research Outputs');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
          }
                  if(this.dashboardrole.includes(Number(this.role))){
                    const index = menuItems.findIndex(item => item.title === 'R+ Subscriptions');
                    if (index !== -1) {
                      menuItems.splice(index, 1);
                    }
                }
                if(this.dashboardrole.includes(Number(this.role))){
                  const index = menuItems.findIndex(item => item.title === 'Admin');
                  if (index !== -1) {
                    menuItems.splice(index, 1);
                  }
              }
            if(this.dashboardrole.includes(Number(this.role))){
              const index = menuItems.findIndex(item => item.title === 'Expert Profiles');
              if (index !== -1) {
                menuItems.splice(index, 1);
              }
          }
          if(this.supportMenuRole.includes(Number(this.role))){
            const index = menuItems.findIndex(item => item.title === 'My Profile');
            if (index !== -1) {
              menuItems.splice(index, 1);
            }
        }
          if(this.supportMenuRole.includes(Number(this.role))){
            const index = menuItems.findIndex(item => item.title === 'Support');
            if (index !== -1) {
              menuItems.splice(index, 1);
            }
        }
        if(this.clientadminrole.includes(Number(this.role))) {
          const index = menuItems.findIndex(item => item.path === '/clientadmin/report/clientusage');
          if (index !== -1) {
            menuItems.splice(index, 1);
          }
        }
        if(this.commonrole.includes(Number(this.role))) {
          const index = menuItems.findIndex(item => item.title === 'DFS Source Request');
          if (index !== -1) {
            menuItems.splice(index, 1);
          }
        }

        if(this.librarian.includes(Number(this.role))) {
          const index = menuItems.findIndex(item => item.title === 'Resolve Publication');
          if (index !== -1) {
            menuItems.splice(index, 1);
          }
        }

        // Superadmin menu show
        if(this.Cisuperadmin.includes(Number(this.role))) {
          const index = menuItems.findIndex(item => item.path === '/clientadmin/main/report');
          if (index !== -1) {
            menuItems.splice(index, 1);
          }
        }
        if(this.Cisuperadmin.includes(Number(this.role))) {
          const index = menuItems.findIndex(item => item.path === '/clientadmin/main/ACSR/report');
          if (index !== -1) {
            menuItems.splice(index, 1);
          }
        }
          this.menuItems= this.removeDuplicates(menuItems);
          for(let i=0;i<this.menuItems.length;i++){
             if(this.menuItems[i].title=="Expert Profiles"){
              this.menuItems[i].children= this.removeDuplicates(this.menuItems[i].children);
             }
             if(this.menuItems[i].title=="Research Outputs"){
              this.menuItems[i].children= this.removeDuplicates(this.menuItems[i].children);
             }
          }

      if(this.subRole.includes(Number(this.role))){
          for(let i=0;i<menuItems.length;i++){
            if (this.menuItems[i].title === "R+ Subscriptions") {

              const data = JSON.parse(localStorage.getItem('UnivSubcripModuleConsolidated'));
              // Guard: only proceed if data exists and has univSubscriptionModuleCheck
              if (!data || !data.univSubscriptionModuleCheck) {
                console.warn('UnivSubcripModuleConsolidated missing or invalid');
                continue;
              }
              // this.service.getUnivSubscriptionModule(this.user.UniversityId,this.role,this.user.UserId).subscribe((x) => {
                this.checkMenuAvailability = data.univSubscriptionModuleCheck;
                console.log(this.checkMenuAvailability);
            
                // Clear subscriptionmodule array to avoid duplicates
                this.subscriptionmodule = [];
            
                // Populate subscriptionmodule based on applicable modules
                for (let m = 0; m < this.checkMenuAvailability.length; m++) {
                  if (this.checkMenuAvailability[m].isApplicable === "1") {
                    let module = this.checkMenuAvailability[m].subscriptionModule;
                    switch (module) {
                      case "Public Visibility Suite":
                        this.subscriptionmodule.push("Public Visibility");
                        break;
                      case "PerformanceAnalysis":
                        this.subscriptionmodule.push("Performance Analysis");
                        break;
                      case "TurnkeyReports":
                        this.subscriptionmodule.push("Turnkey Reports");
                        break;
                      case "Scorebook":
                        this.subscriptionmodule.push("Score Book");
                        break;
                      case "Journalopedia":
                        this.subscriptionmodule.push("Journalopedia");
                        break;
                    }
                  }
                }
            
                // Remove items from children that are not in subscriptionmodule
                this.menuItems[i].children = this.menuItems[i].children.filter((child) =>
                  this.subscriptionmodule.includes(child.title)
                );
            
                console.log("Updated menu items:", this.menuItems[i].children);
              // });
            }
          }
        }

        if(this.filterSupportTab.includes(Number(this.role))){
            for(let i=0;i<menuItems.length;i++){
              if(this.menuItems[i].title ==="Support"){
                // this.service.getUnivCheckModule(this.user.UniversityId).subscribe(t=>{ 
                const data = (() => {
                        try {
                          return JSON.parse(localStorage.getItem('UnivSubcripModuleConsolidated'));
                        } catch (e) {
                          console.error('Failed to parse UnivSubcripModuleConsolidated from localStorage:', e);
                          return null;
                        }
                      })();

                   this.moduleList=data.univModuleCheck;
                  for(let k=0;k<this.moduleList.length;k++){

                    for(let j=0;j<this.menuItems[i].children[0].children.length;j++){
                    if(this.moduleList[k].moduleName==this.menuItems[i].children[0].children[j].title){

                          if(this.moduleList[k].isApplicable=="True"){

                          }
                          else{
                            this.menuItems[i].children[0].children.splice(j, 1);
                          }
                       }                
                    }
                  }
                // });
                console.log("Came support");
                  console.log(this.menuItems[i].children[0].children);
                
  
              }
            }
        }

          this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
              menuItems.filter(items => {
                if (items.path === event.url)
                  this.setNavActive(items)
                if (!items.children) return false
                items.children.filter(subItems => {
                  if (subItems.path === event.url)
                    this.setNavActive(subItems)
                  if (!subItems.children) return false
                  subItems.children.filter(subSubItems => {
                    if (subSubItems.path === event.url)
                      this.setNavActive(subSubItems)
                  })
                })
              })
            }
          })
      })
    })
  }


  }

  ngOnInit(){
    this.fetchImage();

  }
  
  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter(menuItem => {
      if (menuItem != item)
        menuItem.active = false
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true
            submenuItems.active = true
          }
        })
      }
    })
  }

  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach(a => {
        if (this.menuItems.includes(item))
          a.active = false
        if (!a.children) return false
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false
          }
        })
      });
    }
    item.active = !item.active
  }

  //Fileupload
  readUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  gotoedit(){
    this.user=this.authService.getUserDetail();
    console.log(this.user);
    this.userRole=this.authService.getProfileObs();
    if(this.userRole==2||this.userRole == 18){
    this.router.navigate(['/facultyProfiles/edit/screen/edit',this.user.UniversityId,this.user.UserId]);
    }
    else{
      alert("Only Faculty has access to edit profile..")
    }
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

Goto(val){
  if(val == "Insights"){
    this.router.navigate(["/scorebook/Publications/InsightReports"]);
  }else{
    this.router.navigate(["/scorebook/Publications/Mine"]);
  }
  
}

setDefaultPic() {
  this.imgUrl = "assets/images/user/default.png";
}

removeDuplicates(array) {
  const uniqueTitles = new Set();
  return array.filter(item => {
      if (!uniqueTitles.has(item.title)) {
          uniqueTitles.add(item.title);
          return true;
      }
      return false;
  });
}

}
