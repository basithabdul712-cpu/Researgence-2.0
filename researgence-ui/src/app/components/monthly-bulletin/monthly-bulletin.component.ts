import { FacultiesService } from 'src/app/components/faculties/faculties.service';
import { AuthService } from '../../shared/services/firebase/auth.service';
import { AdminclientService } from '../adminclient/adminclient.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-monthly-bulletin',
  templateUrl: './monthly-bulletin.component.html',
  styleUrls: ['./monthly-bulletin.component.scss', '.../../../../../assets/given/css/bootstrap.min.css','../../../assets/given/style.css']
})
export class MonthlyBulletinComponent implements OnInit,AfterViewInit {

  public universityList:any;
  public userName:string;
  public universityName:any;
  public universityId:string;
  public showDropdown:boolean=false;
  public fill:any;
  public user:any=[]
  isMenuOpen:boolean;
  univEnable:boolean=false;
  univId:any;
  univName:string="";
  fromDt:any;
  toDt:any;
  errormessage:boolean=false;
  @ViewChild('demoModal') demoModal: any; 
  enableResult:boolean=true;
  message:string="";
  listData:any;
  enablePic:boolean=false;
  @ViewChild('printSection', { static: false }) printSection!: ElementRef;
  @ViewChild('buttons') printButton!: ElementRef;
  publicationList:any=[];
  patentList:any=[];
  monthlyList:any=[];
  yearlyList:any=[];
  overaAllList:any=[];
  totalPublist:any;
  monthName:any;
  year:any;
  univLogo=[
    {id:43,value:"https://researgence.ai/univ-assets/icon/jisulogo.png"},
    {id:1009,value:"https://researgence.ai/univ-assets/icon/sgtu_Logo.png"},
    {id:4395,value:"https://researgence.ai/univ-assets/icon/ashoka-header-logo.png"},
    {id:6595,value:"https://researgence.ai/univ-assets/icon/gim-logo.png"},
    {id:17,value:"https://researgence.ai/univ-assets/icon/srmap_logo.png"},
    {id:141,value:"https://researgence.ai/univ-assets/icon/bits-pilani-logo.png"},
    {id:12,value:"https://researgence.ai/univ-assets/icon/nmims-logo.png"},
    {id:9,value:"https://researgence.ai/univ-assets/icon/jssuni-logo.png"},
    {id:251,value:"https://researgence.ai/univ-assets/icon/kluniversity-logo.png"},
    {id:2197,value:"https://researgence.ai/univ-assets/icon/acu-logo.png"},
    {id:2,value:"https://researgence.ai/univ-assets/icon/chitkara-logo.png"},
    {id:39,value:"https://researgence.ai/univ-assets/icon/kletech-logo.png"},
    {id:22,value:"https://researgence.ai/univ-assets/icon/msruas-logo.png"},
    {id:31,value:"https://researgence.ai/univ-assets/icon/maher-logo.png"},
    {id:41,value:"https://researgence.ai/univ-assets/icon/imt-logo.png"},
    {id:38,value:"https://researgence.ai/univ-assets/icon/avinuty-logo.png"},
    {id:7,value:"https://researgence.ai/univ-assets/icon/sriramachandra-logo.png"},
    {id:3932,value:"https://researgence.ai/univ-assets/icon/karnavatiuniversity-logo.png"},
    {id:1198,value:"https://researgence.ai/univ-assets/icon/bennett-logo.png"},
    {id:11,value:"https://researgence.ai/univ-assets/icon/drmgrdu-logo.png"},
    {id:6396,value:"https://researgence.ai/univ-assets/icon/anurag-logo.png"},
    {id:1111,value:"https://researgence.ai/univ-assets/icon/sathyabama-logo.png"},
    {id:6396,value:"https://researgence.ai/univ-assets/icon/anurag-logo.png"},
    {id:1111,value:"https://researgence.ai/univ-assets/icon/sathyabama-logo.png"},
    {id:26,value:"https://researgence.ai/univ-assets/icon/sbvu-logo.png"},
    {id:1363,value:"https://researgence.ai/univ-assets/icon/upes-logo.png"},
    {id:14220,value:"https://researgence.ai/univ-assets/icon/jssstuniv-logo.png"},
    {id:13367,value:"https://researgence.ai/univ-assets/icon/mitaoe-logo.png"},
    {id:24,value:"https://researgence.ai/univ-assets/icon/mmumullana-logo.png"},
    {id:1684,value:"https://researgence.ai/univ-assets/icon/mituniversity-logo.png"},
    {id:29341,value:"https://researgence.ai/univ-assets/icon/svkm-logo.png"},
    {id:1054,value:"https://researgence.ai/univ-assets/icon/smu-logo.png"},
    {id:5,value:"https://researgence.ai/univ-assets/icon/srmist-logo.png"},
    {id:35,value:"https://researgence.ai/univ-assets/icon/shctpt-logo.png"},
    {id:45366,value:"https://researgence.ai/univ-assets/icon/bschool-logo.png"},
    {id:2043,value:"https://researgence.ai/univ-assets/icon/dsu-logo.png"}
  ];
  logoImg:string;
  showMsgScreen:boolean=false;

  constructor(private service:AdminclientService, private authservice:AuthService,private modalService: NgbModal,private facService: FacultiesService,
    private menuService:MenuService, private router:Router) { }

  ngOnInit() {

          //for accessing menuopen 
          this.menuService.isMenuOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
          });
  
          this.user=this.authservice.getUserDetail();
          this.userName=this.authservice.getProfileObs();

          this.service.GetUniversity(this.user.UserId,this.userName).subscribe(x=>{
              this.universityList=x;
              this.fill=this.universityList;
              console.log(x);        
          });    
          this.openModal();
          this.enablePic=true;
          this.enableResult=false;

        }

        ngAfterViewInit() {
            this.openModal();
            this.enablePic=true;
            this.enableResult=false;
          
        }

        clearPopup(){

          this.univName = "";
          this.fromDt = undefined;
          this.toDt = undefined;

        }

        openModal() {
          if (this.demoModal) {
            const modalRef = this.modalService.open(this.demoModal);
        
            // Reset form fields
            this.univName = "";
            this.fromDt = undefined;
            this.toDt = undefined;
        
            modalRef.result.then(
              () => {},  // Do nothing if modal closes normally (via submit)
              (reason) => {              
                if (reason !== 'submit') {  
                  this.router.navigate(['/monlthly-bulletin-report']); // Navigate only if dismissed (backdrop click, ESC)
                }
              }
            );
          }
        }

        closeCross() {
          this.modalService.dismissAll();
          setTimeout(() => {
            if (!this.modalService.hasOpenModals()) {
              this.router.navigate(['/cisupportadmin']);
            }
          }, 100);
        }


        SearchUnivName(univname){

          this.univEnable=true;
          if(univname==""){
          this.univEnable=false;
          }
          this.fill=this.universityList.filter(x=>x.universityName.toLowerCase().includes(univname.toLowerCase()));
          if(this.fill.length==0){
              this.univEnable=false;
          }

     }

     onSelectUniv(name,id){

      this.univId=id;
      this.univName=name;
      this.univEnable=false;

   }

   submit() {
    console.log(this.fromDt);
    let imgUrl=this.univLogo.filter(x=>x.id == this.univId);
    this.logoImg=imgUrl[0].value;
    
    if (this.univName === "" || this.fromDt === undefined || this.toDt === undefined) {
      this.errormessage = true;
      this.message="Please fill all the fields";

    } 
    else { 

      let result = this.compareDates(this.fromDt, this.toDt);

        const date = new Date(this.fromDt);

         this.year = date.getFullYear();
         this.monthName = date.toLocaleString('default', { month: 'long' }); 

          if (result < 0) {
            let fromdt=this.formatDate(this.fromDt);
            let todt=this.formatDate(this.toDt);
            this.enablePic = false; 
            this.facService.GetDashboard(this.univId,'6',this.user.UserId).subscribe(x=>{
                 this.totalPublist=x;
                 console.log(x);
            });
            this.service.getMonthlyList(this.user.UserId,this.univId,fromdt,todt).subscribe((response: HttpResponse<any>)=>{
              if (response.status === 200) {
                this.listData = response.body;   
                console.log(this.listData);    
                if(this.listData.mothlyBulletinResult!=null){
                  for(let i=0; i<this.listData.mothlyBulletinResult.length;i++){
                      if(this.listData.mothlyBulletinResult[i].moduleType=="Publication"){
                        this.publicationList.push(this.listData.mothlyBulletinResult[i]);    
                      }
                      if(this.listData.mothlyBulletinResult[i].moduleType=="Patent"){
                        this.patentList.push(this.listData.mothlyBulletinResult[i]);    
                      }
                   }
                 }  

                if(this.listData.mothlyBulletinResultTechArea!=null){
                  for(let i=0; i<this.listData.mothlyBulletinResultTechArea.length;i++){
                      if(this.listData.mothlyBulletinResultTechArea[i].resultType=="Monthly"){
                        this.monthlyList.push(this.listData.mothlyBulletinResultTechArea[i]);    
                      }
                      if(this.listData.mothlyBulletinResultTechArea[i].resultType=="Yearly"){
                        this.yearlyList.push(this.listData.mothlyBulletinResultTechArea[i]);    
                      }
                      if(this.listData.mothlyBulletinResultTechArea[i].resultType=="Overall"){
                        this.overaAllList.push(this.listData.mothlyBulletinResultTechArea[i]);    
                      }
                   }
                 } 

                console.log("pub-"+this.publicationList);
                console.log("month-"+this.monthlyList);
                console.log("year-"+this.yearlyList);
                console.log("overall-"+this.overaAllList);
                
                
                if(this.listData.mothlyBulletinResult==null&&this.listData.mothlyBulletinResultTechArea==null){
                  this.enablePic = true;      
                  this.enableResult = false;
                  this.errormessage = true;
                  // this.message="No records found ..";
                  this.showMsgScreen=true;
                }
                else{
                  this.enablePic = true;      
                  this.enableResult = true;             
                }  
                
              } else {
                this.enablePic = false;       
              }
                    
            });
            this.errormessage = false;
            this.modalService.dismissAll(); 
          } 
          else{
            this.errormessage = true;
            this.message="FromDate to be less than ToDate";
          }
       }
    }

  formatDate(inputDate: string): string {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    
    const [year, month, day] = inputDate.split('-');
    const shortYear = year.slice(-2);
    const monthName = months[parseInt(month, 10) - 1];
  
    return `${day}-${monthName}-${shortYear}`;
  }

  compareDates(fromDt: string, toDt: string): number {
    const date1 = new Date(fromDt);
    const date2 = new Date(toDt);
  
    if (date1 > date2) return 1;  
    if (date1 < date2) return -1; 
    return 0;                    
  }

  async generatePDF() {
    try {

    const contentWrapper = document.querySelector('.content_wrapper') as HTMLElement;
    const originalWidth = contentWrapper.style.width; // Store original width

    // Increase width for better PDF formatting
    contentWrapper.style.width = '1200px';

      // Hide elements before capturing
      if (this.printButton) {
        this.printButton.nativeElement.style.display = 'none';
      }
  
      // Capture the body
      html2canvas(document.body, { scrollY: 0 }).then((canvas) => {
        // Define custom page size (A3 or wider)
        const pdfWidth = 210; // Increase width (A3 width)
        const pdfHeight = 297; // A3 height
        const imgWidth = pdfWidth - 20; // Keep some margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
  
        const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]); // Custom page size
        let position = 10;
        const img = canvas.toDataURL('image/png');
  
        pdf.addImage(img, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
  
        while (heightLeft > 0) {
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(img, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
  
        pdf.save('MonthlyBulletinReport.pdf');
        contentWrapper.style.width = originalWidth;
  
        // Restore hidden elements
        if (this.printButton) {
          this.printButton.nativeElement.style.display = 'block';
        }
      }).catch(error => {
        console.error("Error capturing PDF:", error);
        const contentWrapper = document.querySelector('.content_wrapper') as HTMLElement;
        if (contentWrapper) {
          contentWrapper.style.width = '1000px';
        }
        // Restore hidden elements on error
        if (this.printButton) {
          this.printButton.nativeElement.style.display = 'block';
        }
      });
  
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  } 

}
