import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FacultiesService } from 'src/app/components/faculties/faculties.service';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss','./../../../../assets/given/selected.css','./../../../../assets/given/newcss/login-style.css','./../../../../assets/given/newcss/bootstrap.min.css','./../../../../assets/given/newcss/style.css',
'./../../../../assets/given/newcss/custom.css','./../../../../assets/given/newcss/responsive.css','./../../../../assets/given/newcss/testimonial-slider.css','./../../../../assets/given/newcss/owl.carousel.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class RolesComponent implements OnInit {
//slideshow
  currentIndex: number = 2; // Starting index (0-based) of the active slide
  testimonials: any[] = [
      {
       name: 'P. J. Abdul Kalam',
       image: 'https://researgence.ai/univ-assets/cssimage/roleimage/apj.jpg',
       text: 'Innovate with patents, publish your findings, and propel humanity forward. Every researcher has a role in nation-building.' 
      },
      {
        name: 'N. R. Rao',
        image: 'https://researgence.ai/univ-assets/cssimage/roleimage/Rao.jpg',
        text: 'Publications are not just about sharing research but are a testament to the scientific spirit of a nation. Each publication adds a brick to the edifice of science.' 
       },
       {
        name: 'Venkatraman Ramakrishnan',
        image: 'https://researgence.ai/univ-assets/cssimage/roleimage/Venkatraman Ramakrishnan.jpg',
        text: 'Scientific discoveries become meaningful only when they are shared. Publications and patents are crucial for this dissemination.' 
       }, 
       {
        name: 'Vikram Sarabhai',
        image: 'https://researgence.ai/univ-assets/cssimage/roleimage/Vikram Sarabhai.jpg',
        text: 'Sponsored projects and consultancy are not merely avenues for funding; they are collaborations that push the frontiers of science and technology. They allow us to apply theoretical knowledge to practical problems, thereby catalyzing innovation and real-world impact.' 
       },
       {
        name: 'G. N. Ramachandran',
        image: 'https://researgence.ai/univ-assets/cssimage/roleimage/Ramachandran.jpg',
        text: 'The essence of science is not just to discover but also to communicate. Effective patents and publications are the conduits through which knowledge flows.' 
       },
    ]; 
  enableContent:boolean=false;
  dots: boolean[] = Array(this.testimonials.length).fill(false);
  role:any;
  public roleValues:any=[];
  public roleData:any=[];
  public authorRole:any=[]; 
  public user:any=[];
  universityName: any;
  rolesImage: any;
  isCollapsed: boolean= false;
  univImage:any;
  ashokaQuoteImg:any;
  enableAshoka:boolean=false;

  @ViewChild('slideOut') slideOut: ElementRef;

  constructor(private authService:AuthService , private router:Router,private service:FacultiesService) {
   }

  ngOnInit() {
 
  this.user=this.authService.getUserDetail();
   this.universityName= this.user.University;
   if(this.universityName.includes("JIS Group")){       
    this.univImage="https://researgence.ai/univ-assets/icon/jis-logo-white.png";
  } 
  else   if(this.universityName.includes("SGT University")){       
    this.univImage="https://researgence.ai/univ-assets/icon/SGT-logo-white.png";
    // this.enableContent=true;
  }
  else  if(this.universityName.includes("Ashoka University")){       
    this.univImage="https://researgence.ai/univ-assets/icon/ashoka-white-logo.png";
    this.ashokaQuoteImg="https://researgence.ai/univ-assets/cssimage/ashoka-qoute.jpeg"
    this.enableAshoka=true;
  }
  else  if(this.universityName.includes("Goa Institute of Management")){       
    this.univImage="https://researgence.ai/univ-assets/icon/gimbluelogo.png";
  }
  else  if(this.universityName.includes("SRM University AP")){       
    this.univImage="https://researgence.ai/univ-assets/icon/srmap_white.png";
  }
  else  if(this.universityName.includes("Birla Institute of Technology and Science")){       
    this.univImage="https://researgence.ai/univ-assets/icon/bits-pilani-white.png";
  }
  else  if(this.universityName.includes("SVKMS NMIMS (Deemed to be University)")){       
    this.univImage="https://researgence.ai/univ-assets/icon/nmims-logo-white.png";
  }
  else  if(this.universityName.includes("JSS Academy of Higher Education and Research")){       
    this.univImage="https://researgence.ai/univ-assets/icon/jssuni-logo-white.png";
  }
  else  if(this.universityName.includes("Koneru Lakshmaiah Education Foundation")){       
    this.univImage="https://researgence.ai/univ-assets/icon/kluniversity-logo-white.png";
  }
  else  if(this.universityName.includes("Adichunchanagiri University")){       
    this.univImage="https://researgence.ai/univ-assets/icon/acu-logo-white.png";
  }
  else  if(this.universityName.includes("Chitkara University")){       
    this.univImage="https://researgence.ai/univ-assets/icon/chitkara-white.png";
  }
  else  if(this.universityName.includes("KLE Technological University")){       
    this.univImage="https://researgence.ai/univ-assets/icon/kletech-white.png";
  }
  else  if(this.universityName.includes("Ramaiah University of Applied Sciences")){       
    this.univImage="https://researgence.ai/univ-assets/icon/msruas-white.png";
  }
  else  if(this.universityName.includes("Meenakshi Academy of Higher Education and Research")){       
    this.univImage="https://researgence.ai/univ-assets/icon/maher-white.png";
  }
  else  if(this.universityName.includes("Institute of Management Technology, Ghaziabad")){       
    this.univImage="https://researgence.ai/univ-assets/icon/imt-white.png";
  }
  else  if(this.universityName.includes("Avinashilingam Institute for Home science and Higher Education for Women")){       
    this.univImage="https://researgence.ai/univ-assets/icon/avinuty-white.png";
  }
  else  if(this.universityName.includes("Sri Ramachandra Institute of Higher Education and Research")){       
    this.univImage="https://researgence.ai/univ-assets/icon/sriramachandra-white.png";
  }
  else  if(this.universityName.includes("Karnavati University")){       
    this.univImage="https://researgence.ai/univ-assets/icon/karnavatiuniversity-white.png";
  }
  else  if(this.universityName.includes("Bennett University")){       
    this.univImage="https://researgence.ai/univ-assets/icon/bennett-white.png";
  }
  else  if(this.universityName.includes("Dr. MGR Educational and Research Institute")){       
    this.univImage="https://researgence.ai/univ-assets/icon/drmgrdu-white.png";
  }
  else  if(this.universityName.includes("Anurag University")){       
    this.univImage="https://researgence.ai/univ-assets/icon/anurag-white.png";
  }
  else  if(this.universityName.includes("Sathyabama Institute of Science and Technology")){       
    this.univImage="https://researgence.ai/univ-assets/icon/sathyabama-white.png";
  }
  else  if(this.universityName.includes("Sri Balaji Vidyapeeth University")){       
    this.univImage="https://researgence.ai/univ-assets/icon/sbvu-white.png";
  }
  else  if(this.universityName.includes("University of Petroleum and Energy Studies")){       
    this.univImage="https://researgence.ai/univ-assets/icon/upes-white.png";
  }
  else  if(this.universityName.includes("JSS Science and Technology University")){       
    this.univImage="https://researgence.ai/univ-assets/icon/jssstuniv-white.png";
  }
  else if(this.universityName.includes("MIT Academy of Engineering")){
    this.univImage="https://researgence.ai/univ-assets/icon/mitaoe-white.png";
  }
  else if(this.universityName.includes("Maharishi Markandeshwar University")){
    this.univImage="https://researgence.ai/univ-assets/icon/mmumullana-white.png";
  }
  else if(this.universityName.includes("MIT Art, Design and Technology University")){
    this.univImage="https://researgence.ai/univ-assets/icon/mituniversity-white.png";
  }
  else if(this.universityName.includes("SVKM Group")){
    this.univImage="https://researgence.ai/univ-assets/icon/svkm-white.png";
  }
  else if(this.universityName.includes("Sikkim Manipal University")){
    this.univImage="https://researgence.ai/univ-assets/icon/smu-white.png";
  }
  else if(this.universityName.includes("SRM Institute of Science and Technology")){
    this.univImage="https://researgence.ai/univ-assets/icon/srmist-white.png";
  }
  else if(this.universityName.includes("Sacred Heart College, Tirupattur")){
    this.univImage="https://researgence.ai/univ-assets/icon/shctpt-white.png";
  }
  else if(this.universityName.includes("CMS Business School")){
    this.univImage="https://researgence.ai/univ-assets/icon/bschool-white.png";
  }
  else if(this.universityName.includes("Dayananda Sagar University")){
    this.univImage="https://researgence.ai/univ-assets/icon/dsu-white.png";
  }
  else if(this.universityName.includes("Mahindra University")){
    this.univImage="https://researgence.ai/univ-assets/icon/mahindrauniversity-white.png";
  }
  else{

    // For Prod and Dev
    this.univImage="assets/images/logo/cint-logo.png";

    //For Demo 
    // this.univImage="assets/images/logo/temp-univ-logo.jpeg";
  }
   this.role=this.authService.getProfileObs();
   if(this.role!=null){
     localStorage.removeItem("profile")
     location.reload();
   }
    this.selectRole();

    this.dots[this.currentIndex] = true; // Set the initial dot as active

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
      this.updateDots();

    }, 3000);

  }

  selectRole(){
    this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x => {
      this.roleValues = x;
       localStorage.setItem('RoleSelection',JSON.stringify(x));
      console.log(this.roleValues);
      const imageUrls = {
        "Faculty": "https://researgence.ai/univ-assets/roleIdImage/Faculty.png",
        "Management": "https://researgence.ai/univ-assets/roleIdImage/Management.png",
        "Student": "https://researgence.ai/univ-assets/roleIdImage/student.png",
        "Scholar":"https://researgence.ai/univ-assets/roleIdImage/scholar.png",
        "HOI": "https://researgence.ai/univ-assets/roleIdImage/Hoc.png",
        "HOD": "https://researgence.ai/univ-assets/roleIdImage/Hod.png",
        "HOC": "https://researgence.ai/univ-assets/roleIdImage/Hoc.png",
        "HOS": "https://researgence.ai/univ-assets/roleIdImage/Hos.png",
        "Admin": "https://researgence.ai/univ-assets/roleIdImage/Admin.png",
        "CISupport":"https://researgence.ai/univ-assets/roleIdImage/Cisupport.png",
        "CISupportAdmin":"https://researgence.ai/univ-assets/roleIdImage/CisupportAdmin.png",
        "CISuperAdmin":"https://researgence.ai/univ-assets/roleIdImage/CisuperAdmin.png",
        "Staff": "https://researgence.ai/univ-assets/roleIdImage/Admin.png",
        "Librarian":"https://researgence.ai/univ-assets/roleIdImage/scholar.png",
        "University": "https://researgence.ai/univ-assets/roleIdImage/Hoc.png",
        "PostDoctoral": "https://researgence.ai/univ-assets/roleIdImage/Faculty.png"
      };

      const imagew ={
        "Faculty": "https://researgence.ai/univ-assets/roleIdImage/role-faculty-white.png",
        "Management": "https://researgence.ai/univ-assets/roleIdImage/Management-white.png",
        "Student": "https://researgence.ai/univ-assets/roleIdImage/Student-white.png",
        "Scholar":"https://researgence.ai/univ-assets/roleIdImage/scholar-white.png",
        "HOI": "https://researgence.ai/univ-assets/roleIdImage/Hoc-white.png",
        "HOD": "https://researgence.ai/univ-assets/roleIdImage/Hod-white.png",
        "HOC": "https://researgence.ai/univ-assets/roleIdImage/Hoc-white.png",
        "HOS": "https://researgence.ai/univ-assets/roleIdImage/Hos-white.png",
        "Admin": "https://researgence.ai/univ-assets/roleIdImage/Admin-white.png",
        "CISupport":"https://researgence.ai/univ-assets/roleIdImage/Cisupport-white.png",
        "CISupportAdmin":"https://researgence.ai/univ-assets/roleIdImage/CisupportAdmin-white.png",
        "CISuperAdmin":"https://researgence.ai/univ-assets/roleIdImage/CisuperAdmin-white.png",
        "Staff": "https://researgence.ai/univ-assets/roleIdImage/Admin-white.png",
        "Librarian":"https://researgence.ai/univ-assets/roleIdImage/scholar-white.png",
        "University": "https://researgence.ai/univ-assets/roleIdImage/Hoc-white.png",
        "PostDoctoral": "https://researgence.ai/univ-assets/roleIdImage/role-faculty-white.png"
      }
      
      this.rolesImage = this.roleValues.map(role => {
        return {
          ...role,
          imageUrl: imageUrls[role.roleName],
          imagewhite: imagew[role.roleName]
        };
      });
      
   console.log(this.rolesImage);
  
    })
  } 
    
    subUser(val,id,landingpage){
      console.log(val);
         this.authService.setProfileObs(id);
          
             if(landingpage=="/universityselect"){
                landingpage="/clientadmin/universitySelect";
                }
                else if(landingpage=="/dashboard"){
                  landingpage="/Home";
                }
                // Ensure we wait for the dashboard API to complete (take(1))
                // this.service.GetDashboard(this.user.UniversityId, id, this.user.UserId)
                //   .pipe(take(1))
                //   .subscribe({
                //     next: (x) => {
                //       // API returned data; persist then navigate
                //       localStorage.setItem('DashboardData', JSON.stringify(x));
                      this.router.navigate([landingpage])
                        .then(() => {
                          window.location.reload();
                        })
                        // .catch(navErr => {
                  //         console.error('Navigation error after GetDashboard:', navErr);
                  //       });
                  //   },
                  //   error: (err) => {
                  //     console.error('GetDashboard error:', err);
                  //     // Decide whether to still navigate on error; we'll navigate to landingpage to avoid blocking UX
                  //     this.router.navigate([landingpage])
                  //       .then(() => window.location.reload())
                  //       .catch(navErr => console.error('Navigation error after GetDashboard failure:', navErr));
                  //   }
                  // });
        
    }

///slideshow for paragraph
    showSlide(index: number): void {
     this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;

      this.updateDots();
    }
  
    nextSlide(): void {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
      this.updateDots();
    }
  
    prevSlide(): void {
      this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
      this.updateDots();
    }
  
    updateDots(): void {
      this.dots.fill(false);
      this.dots[this.currentIndex] = true;
    }

    toggleCollapse() {

      this.isCollapsed = !this.isCollapsed;
      console.log(this.isCollapsed);
    }

    SignOut(){
      this.authService.SignOut().subscribe(arg => {   
        });
    }
    
}