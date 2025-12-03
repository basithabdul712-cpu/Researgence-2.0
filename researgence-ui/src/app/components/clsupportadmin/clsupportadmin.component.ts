import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { AdminclientService } from '../adminclient/adminclient.service';
import { ScorebookService } from '../scorebook/scorebook.service';

@Component({
  selector: 'app-clsupportadmin',
  templateUrl: './clsupportadmin.component.html',
  styleUrls: ['../../../assets/given/newcss/style.css','./clsupportadmin.component.scss',]
})
export class ClsupportadminComponent implements OnInit {
 
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
enableModel:boolean=false;
filteredItems: { moduleName: string; totalCount: number; lineItem1Text: string; lineItem1Count: number; lineItem2Text: string; lineItem2Count: number }[] = [];
counterMap: { [moduleName: string]: number } = {};
private timers: { [moduleName: string]: number } = {};
groupedTestimonials = [];
@ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  user: any;
  submitPRSEnable:boolean=false;
  enblePRSIp:boolean=false;
  month:any[];
  currentYear = new Date().getFullYear();
  maxDate: Date = new Date(this.currentYear,11,31);
  tempfromYear:string;
  fromYear: number; 
  temptoYear:string;
  toYear: number;
  cutoffDt:any;
  cutOffvalue:string;
  yearFrom:string;
  monthFrom:string;
  rangeFrom:string;
  yearTo:string;
  monthto:string;
  rangeTo:string;
  dateEnable:boolean=false;
  universityList:any;
  fill:any;
  universityName:any;
  showDropdown:boolean=false;
  universityId:string;
  journalPSRList:any;
  bookPSRList:any;
  bookChapterList:any;
  conferenceList:any;
  excelEnable: boolean = false;

  constructor(private menuService:MenuService,private router:Router,private authService:AuthService,private modalService: NgbModal,
    private scoreservice:ScorebookService,private service:AdminclientService,private excel: ExcelExportService) {

  }

  ngOnInit() {
    
    this.modalService.dismissAll();
      const grouped = this.testimonials.reduce((acc,testimonials) => {
        (acc[testimonials.group] = acc[testimonials.group] || []).push(testimonials);
        return acc
      },{});

      this.groupedTestimonials = Object.keys(grouped).map(key =>({
        id: key,
        items: grouped[key]
      }));

        //for accessing menuopen 
        this.menuService.isMenuOpen$.subscribe(isOpen => {
          this.isMenuOpen = isOpen;
        });
        localStorage.removeItem("patentDFS");
        localStorage.removeItem("clientUniv");
        localStorage.removeItem("ManagementUnivId");
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
      //  });

       this.service.GetUniversity(this.user.UserId,this.userName).subscribe(x=>{
        this.universityList=x;
        this.fill=this.universityList;
        console.log(x);        
    })
  
     }
        testimonials: any[] = [
          {
            id:1,
            module:'User Management',
            icon:"/assets/given/img/icon_user_management.png",
            group:4
          },
          {
            id:2,
            module:'DFS Publication',
            icon:"/assets/given/img/icon_add_dfs.png",
            group:1
          },
          {
            id:3,
            module:'DFS/RFS Quality Check',
            icon:"/assets/given/img/icon_view_publication.png",
            group:1
          },
          {
            id:4,
            module:'RFS Publication',
            icon:"/assets/given/img/icon_support_executive.png",
            group:1
          },
          {
            id:5,
            module:'Service Request',
            icon:"/assets/given/img/icon_service_request.png",
            group:4
          },
          {
            id:6,
            module:'Client Usage Report',
            icon:"/assets/given/img/icon_rfs_support.png",
            group:5
          },
          {
            id:7,
            module:'ACSR Report',
            icon:"/assets/given/img/icon_service_request.png",
            group:5
          },
          {
            id:8,
            module:'DFS Publication Source Request',
            icon:"/assets/given/img/icon_acs_deployment.png",
            group:6
          },
          {
            id:9,
            module:'Support Publication Mine',
            icon:"/assets/given/img/icon_support_exec_stats.png",
            group:1
          },
          {
            id:10,
            module:'Scorebook',
            icon:"/assets/given/img/icon_support_exec_stats.png",
            group:5
          },
          {
            id:11,
            module:'Faculty Compare',
            icon:"/assets/given/img/icon_add_dfs.png",
            group:4
          },
          {
            id:12,
            module:'PRS Report',
            icon:"/assets/given/img/icon_client_support.png",
            group:5
          },
          {
            id:13,
            module:'Publication Edit',
            icon:"/assets/given/img/icon_rfs_support.png",
            group:1
          },
          {
            id:14,
            module:'Monthly Bulletin',
            icon:"/assets/given/img/icon_support_exec_stats.png",
            group:5
          },
          {
            id:15,
            module:'DFS Patent',
            icon:"/assets/given/img/icon_support_exec_stats.png",
            group:2
          },
          {
            id:16,
            module:'RFS Patent',
            icon:"/assets/given/img/icon_support_exec_stats.png",
            group:2
          },
          {
            id:17,
            module:'DFS/RFS Patent QC & Approval',
            icon:"/assets/given/img/icon_support_exec_stats.png",
            group:2
          },
          {
            id:18,
            module:'Edit Patent',
            icon:"/assets/given/img/icon_support_exec_stats.png",
            group:2
          },
          //changed for project
           {
            id:19,
            module:'DFS/RFS Project QC & Approval',
            icon:"/assets/given/img/icon_view_publication.png",
            group:3
          },
          {
            id:20,
            module:'Project Edit',
            icon:"/assets/given/img/icon_support_exec_stats.png",
            group:3
          },
           {
            id:21,
            module:'Project ACS Download',
            icon:"/assets/given/img/icon_client_support.png",
            group:3
          }
        ]

      groupTitles = {
        1: "Publications",
        2: "Patents",
        3: "Projects",
        4: "Client Support",
        5: "Reports",
        6: "Publication Source/Journal"
      }

      openmodele(name){
          if(name=="User Management")
          {
            this.router.navigate(['/clientadmin/user/screen'])

          }
          else if(name=="Service Request"){
            this.router.navigate(['/clientadmin/admin-service-request'])
          }
          else if(name=="DFS Publication"){
            this.router.navigate(['/clientadmin/universitySelect/DFS/add/addnew']);
          }
          else if(name=="DFS/RFS Quality Check"){
            this.router.navigate(['/clientadmin/universitySelect/DFS/viewDfs/university']);
          }
          else if(name=="DFS/RFS Quality Check-New"){
            this.router.navigate(['/clientadmin/universitySelect/DFS/view/support/publication/university']);
          }
          else if(name=="RFS Publication"){
            this.router.navigate(['/clientadmin/universitySelect/RFS/view/univ'])
          }
          else if(name=="Client Usage Report"){
            this.router.navigate(['/clientadmin/main/report'])
          }
          else if(name=="ACSR Report"){
            this.router.navigate(['/clientadmin/main/ACSR/report'])
          }
          else if(name=="DFS Publication Source Request"){
            this.router.navigate(['/clientadmin/DFS/SUPPORT/REQUEST']);
          }
          else if(name=="Support Publication Mine"){
            this.router.navigate(['/clientadmin/universitySelect/DFS/add/supportmine']);
          }
          else if(name=="Scorebook"){
            this.router.navigate(['/clientadmin/universitySelect/DFS/add/scorebook']);
          }
          else if(name=="Faculty Compare"){
            this.router.navigate(['/clientadmin/universitySelect/DFS/add/facultycompare']);
          }
          else if(name=="PRS Report"){
            // this.router.navigate(['/clientadmin/main/PSR/report']);
            // this.enablePrsReport();
          }
          else if(name == "Publication Edit"){
            this.router.navigate(['/clientadmin/PUBLICATION/MINESEARCH']);
          }
          else if(name == "Monthly Bulletin"){
            this.router.navigate(['/monlthly-bulletin-report']);
          }
          else if(name == "RFS Patent"){
            this.router.navigate(['/Patent/rfs/university']);
          }
          else if(name == "DFS Patent"){
            this.router.navigate(['/clientadmin/universitySelect/DFS/add/addpatent']);
          }
          else if(name == "DFS/RFS Patent QC & Approval"){
            this.router.navigate(['/Patent/Admin/QC/university']);
          }
          else if(name == "Edit Patent"){
            this.router.navigate(['/Patent/edit/mine/search']);
          } else if(name == "Project Edit"){
            this.router.navigate(['/Project/edit/mine/search']);
          }
           else if(name == "DFS/RFS Project QC & Approval"){
            this.router.navigate(['/Project/Admin/QC/university']);
          }

      }

          enablePrsReport(model:any){
            this.enableModel=true;
            this.excelEnable=false;
            this.enblePRSIp=true;
            this.month=this.scoreservice.getMonths();
            this.tempfromYear=undefined;
            this.temptoYear=undefined;
            this.cutOffvalue=undefined;
            this.universityId=undefined;
            this.universityName=null;
            this.cutoffDt=null;
            this.monthFrom=undefined;
            this.monthto=undefined;
          }

          closeCross(){
            this.enableModel=false;
            this.excelEnable=false;
            this.enblePRSIp=false;
            this.tempfromYear=undefined;
            this.temptoYear=undefined;
            this.cutOffvalue=undefined;
            this.universityId=undefined;
            this.universityName=null;
            this.cutoffDt=null;
            this.monthFrom=undefined;
            this.monthto=undefined;
          }

          submitPRS(){
            this.enableModel=true;
            //  this.submitPRSEnable=true;
             this.enblePRSIp=false;

            if(this.universityId==undefined){
              alert("Please select university before submit")
               return;
            }
            
                if(this.tempfromYear!=undefined&&this.temptoYear!=undefined){
                      this.dateEnable=true;
                        const dateString= new Date(this.tempfromYear);
                        const year=dateString.getFullYear();
                        console.log(year);
                        
                        this.yearFrom=year.toString();
                          if(this.monthFrom!=undefined){
                              this.rangeFrom="01/"+this.monthFrom+"/"+this.yearFrom;
                            }
                            else{
                            this.rangeFrom="01/"+"01"+"/"+this.yearFrom;
                            }
                        
                          const dateObj=new Date(this.temptoYear);
                          const toyear=dateObj.getFullYear();
                          this.yearTo=toyear.toString();
                          
                          if(this.monthto!=undefined){
                          this.rangeTo="01/"+this.monthto+"/"+this.yearTo;
                          }
                          else{
                            this.rangeTo="31/"+"12"+"/"+this.yearTo;
                          }   
                    }
                    else{
                      this.dateEnable=false;
                    }

                    if(this.dateEnable||this.cutOffvalue!=undefined){
                        this.getRecords();
                    }
                    else if(this.dateEnable||this.cutOffvalue==undefined){
                       this.getRecords();
                    }
                    else if(!this.dateEnable||this.cutOffvalue!=undefined){
                      this.getRecords();
                    }
                    else{
                      alert("Please select Cutoff date or From date and To date");
                    }
            
          }

          usermanage(){
            this.router.navigate(['clientadmin/user/screen']);
          }

          addDFS(){
            this.router.navigate(['/clientadmin/universitySelect/DFS/addDfs']);
          }

          viewPub(){
            this.router.navigate(['/clientadmin/universitySelect/DFS/viewDfs/university']);
          }

          viewRFS(){
            this.router.navigate(['/clientadmin/universitySelect/RFS/view/univ'])
          }
          
          request(){
            this.router.navigate(['/clientadmin/admin-service-request'])
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

        changeCutOff(val){
            let tempCutoff=this.formatDate(val);
            this.cutOffvalue= tempCutoff;
        }

        formatDate(input: string): string {
          const date = new Date(input);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }


  onKeyUp(x){

    this.showDropdown = this.universityName.length > 0;
    this.fill = this.universityList.filter(e => e.universityName.toLowerCase().includes(this.universityName.toLowerCase())

    );
    console.log(this.fill);

 }

      onItemClick(item: string,id: string) {

        this.universityName = item;
        this.universityId = id;
        this.showDropdown = false;

      }

      exportExcelReportData(data,name) {

        let str = JSON.stringify(data);
        str = str.replace(/\"employeeId\":/g, '"EMP ID":');  
        str = str.replace(/\"journal\":/g, '"JOURNAL":');
        str = str.replace(/\"journalTitle\":/g, '"JOURNAL TITLE":');
        str = str.replace(/\"quartileOfJournal\":/g, '"QUARTILE OF JOURNAL":');
        str = str.replace(/\"bookTitle\":/g, '"BOOK TITLE":');
        str = str.replace(/\"chapterTitle\":/g, '"CHAPTER TITLE":');
        str = str.replace(/\"publisher\":/g, '"PUBLISHER":');
        str = str.replace(/\"bookChapters\":/g, '"BOOK CHAPTER":');
        str = str.replace(/\"conferenceName\":/g, '"CONFERENCE NAME":');
        str = str.replace(/\"conferenceTitle\":/g, '"CONFERENCE TITLE":');
        str = str.replace(/\"month\":/g, '"MONTH ":');
        str = str.replace(/\"year\":/g, '"YEAR":');
        str = str.replace(/\"snip\":/g, '"SNIP":');
        str = str.replace(/\"openAccess\":/g, '"OPEN ACCESS":');
        str = str.replace(/\"impactfactor\":/g, '"IMPACT FACTOR":');
        str = str.replace(/\"authors\":/g, '"AUTHOR":');
        str = str.replace(/\"collaboration\":/g, '"COLLABRATION":');
        str = str.replace(/\"publicationId\":/g, '"PUBLICATION ID":');
          data = JSON.parse(str);
    
        this.excel.exportAsExcelFile(data, name);
    
      }

      getRecords(){
             this.excelEnable = true;
              this.service.getListForPSRJournal(this.universityId,this.rangeFrom,this.rangeTo,this.cutOffvalue).subscribe(x=>{
                this.journalPSRList=x;
              if(this.journalPSRList){
                this.exportExcelReportData(this.journalPSRList,this.universityName+"-PRS-REPORT-JOURNAL");
                this.excelEnable = false;
                this.enableModel=false;
              }
                });
                this.service.getListForPSRBook(this.universityId,this.rangeFrom,this.rangeTo,this.cutOffvalue).subscribe(x=>{
                    this.bookPSRList=x;
                    if(this.bookPSRList){
                      this.exportExcelReportData(this.bookPSRList,this.universityName+"-PRS-REPORT-BOOK");
                    }
                });
                this.service.getListForPSRBookchapter(this.universityId,this.rangeFrom,this.rangeTo,this.cutOffvalue).subscribe(x=>{
                      this.bookChapterList=x;
                      if(this.bookChapterList){
                        this.exportExcelReportData(this.bookChapterList,this.universityName+"-PRS-REPORT-BOOK-CHAPTER");
                      }
                });
              this.service.getListForPSRConference(this.universityId,this.rangeFrom,this.rangeTo,this.cutOffvalue).subscribe(x=>{
                      this.conferenceList=x;
                      if(this.conferenceList){
                        this.exportExcelReportData(this.conferenceList,this.universityName+"-PRS-REPORT-CONFERENCE");
                      }
                      
              });
           }

}
