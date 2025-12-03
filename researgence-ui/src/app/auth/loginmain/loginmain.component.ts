import { EncryptService } from './../../shared/services/encrypt.service';
import { Subscription, timer } from 'rxjs';
import { Component, HostListener, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../../shared/services/firebase/auth.service";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { image } from "html2canvas/dist/types/css/types/image";
import { ThisReceiver } from "@angular/compiler";

type UserFields = "email" | "password";
type FormErrors = { [u in UserFields]: string };
@Component({
  selector: 'app-loginmain',
  templateUrl: './loginmain.component.html',
  styleUrls: ['./loginmain.component.scss','./../../../../src/assets/given/newcss/style.css','./styles/owl.carousel.css','./styles/custom.css','./styles/login-style.css','./styles/responsive.css','./../../../../src/assets/given/newcss/bootstrap.min.css']
})
export class LoginmainComponent implements OnInit {
  testimonials: any[] = [
    { image: 'assets/images/university/Image1.jpg' },
    { image: 'assets/images/university/Image2.jpg' },
    { image: 'assets/images/university/Image3.jpg' },
  ];

  currentIndex: number = 0;
  message: string;
  mailVaue: any;
  dots: boolean[] = Array(this.testimonials.length).fill(false);
  role: null;
  user: any;
  enableAdd: boolean=false;
  
  UserExits:boolean=false;
  enablePassword:boolean=false;
  responseId:any;
  updateMail:boolean=false;
  checkPassword:boolean=false;
  userCredential:any;
  newOTP:string;
  validateOTP:string;
  newPassword:string;
  confirmPassword:string;
  UserDetail:any;
  username:string;
  userid:any;
  newMail:boolean=false;
  forgotpwdResponse:boolean=false;
  loginTime:number=0;
  emailData = {
   to: '',
   subject: '',
   text: ''
 };
 mailValue:any;
 univNameList:string;
 showPassword:boolean = false;
  enableUnmatch:boolean=false;
  newopt: any[]=[];
  maskedEmail: string;
  univImage:any;
  enableRes:boolean=false;
  univName:string;
  clicked = false;
  universityId: any;
  enableLoad:boolean=true;
  copyRightDate:any;
  countDown:Subscription;
  counter:number= 90;
  forgothide:boolean=true


  ngOnInit() {
    const messages = localStorage.getItem("message");
    if(messages){
      this.message = messages;
      localStorage.removeItem("message");
    }
    let d= new Date();
    this.copyRightDate= d.getFullYear();

    console.log(window.location.hostname);
      
    let endIndex=window.location.hostname.indexOf(".");
    let univName=window.location.hostname.slice(0, endIndex);
     console.log(univName);
    //  this.univNameList=univName.toUpperCase();
    this.univNameList=univName;
       
    if(univName.includes("jisgroup")){       
      for(var i=1;i<4;i++){
        this.testimonials.push({image:"https://researgence.ai/univ-assets/jisgroup/jisgroup"+i+".jpg"})
      }
    this.testimonials=this.testimonials.filter(item=> item.image.includes('jisgroup'));
      this.univImage="https://researgence.ai/univ-assets/icon/jis-logo-white.png";
      this.univName="JIS GROUP";
      this.universityId=43;
    } else if(univName.includes("sgtuniversity")){  
      for(var i=3;i<6;i++){
        this.testimonials.push({image:"https://researgence.ai/univ-assets/sgtgroup/sgtgroup"+i+".jpg"})
      }     
      this.testimonials=this.testimonials.filter(item=> item.image.includes('sgtgroup'));
        this.univImage="https://researgence.ai/univ-assets/icon/SGT-logo-white.png";
        this.univName="SGT University";
        this.universityId=1009;
      }
      else if(univName.includes("ashoka")){    
        for(var i=1;i<5;i++){
          this.testimonials.push({image:"https://researgence.ai/univ-assets/ashoka/ashoka"+i+".jpeg"})
        }     
        this.testimonials=this.testimonials.filter(item=> item.image.includes('ashoka'));
          this.univImage="https://researgence.ai/univ-assets/icon/ashoka-white-logo.png";
          this.univName="ASHOKA University";
          this.universityId=4395;
        }
        else if(univName.includes("gim")){      
          for(var i=1;i<4;i++){
            this.testimonials.push({image:"https://researgence.ai/univ-assets/gim/gim"+i+".jpg"})
          }  
          this.testimonials=this.testimonials.filter(item=> item.image.includes('gim'));
            this.univImage="https://researgence.ai/univ-assets/icon/gimbluelogo.png";
            this.univName="Goa Institute of Management";
            this.universityId=6595;
          }
          else if(univName.includes("srmap")){ 
            for(var i=1;i<5;i++){
              this.testimonials.push({image:"https://researgence.ai/univ-assets/srmap/srmap"+i+".jpg"})
            }      
            this.testimonials=this.testimonials.filter(item=> item.image.includes('srmap'));
              this.univImage="https://researgence.ai/univ-assets/icon/srmap_white.png";
              this.univName="SRM University AP";
              this.universityId=17;
            }
            else if(univName.includes("bits-pilani")){     
              for(var i=1;i<5;i++){
                this.testimonials.push({image:"https://researgence.ai/univ-assets/bits-pilani/bits-pilani"+i+".jpg"})
              }    
              this.testimonials=this.testimonials.filter(item=> item.image.includes('bits-pilani'));
                this.univImage="https://researgence.ai/univ-assets/icon/bits-pilani-white.png";
                this.univName="Birla Institute of Technology and Science";
                this.universityId=141;
              }
              else if(univName.includes("nmims")){   
                for(var i=1;i<6;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/nmims/nmims"+i+".jpeg"})
                }      
                this.testimonials=this.testimonials.filter(item=> item.image.includes('nmims'));
                  this.univImage="https://researgence.ai/univ-assets/icon/nmims-logo-white.png";
                  this.univName="SVKMS NMIMS (Deemed to be University)";
                  this.universityId=12;
              }
              else if(univName.includes("jssuni")){   
                for(var i=1;i<6;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/jssuni/jssuni"+i+".jpeg"})
                }    
                this.testimonials=this.testimonials.filter(item=> item.image.includes('jssuni'));
                  this.univImage="https://researgence.ai/univ-assets/icon/jssuni-logo-white.png";
                  this.univName="JSS Academy of Higher Education and Research";
                  this.universityId=9;
              }
              // else if(univName.includes("kluniversity")){  
              //   for(var i=1;i<4;i++){
              //     this.testimonials.push({image:"https://researgence.ai/univ-assets/kluniversity/kluniversity"+i+".jpg"})
              //   }       
              //   this.testimonials=this.testimonials.filter(item=> item.image.includes('kluniversity'));
              //     this.univImage="https://researgence.ai/univ-assets/icon/kluniversity-logo-white.png";
              //     this.univName="KL University";
              //     this.universityId=251;
              // }
              else if(univName.includes("acu")){     
                for(var i=1;i<4;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/acu/acu"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('acu'));
                  this.univImage="https://researgence.ai/univ-assets/icon/acu-logo-white.png";
                  this.univName="Adichunchanagiri University";
                  this.universityId=2197;
              }
              
              else if(univName.includes("chitkara")){     
                for(var i=1;i<4;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/chitkara/chitkara"+i+".jpeg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('chitkara'));
                  this.univImage="https://researgence.ai/univ-assets/icon/chitkara-white.png";
                  this.univName="Chitkara University";
                  this.universityId=2;
              }

              // 
              else if(univName.includes("kletech")){     
                for(var i=1;i<7;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/kletech/kletech"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('kletech'));
                  this.univImage="https://researgence.ai/univ-assets/icon/kletech-white.png";
                  this.univName="KLE Technological University";
                  this.universityId=39;
              }
              else if(univName.includes("msruas")){     
                for(var i=1;i<7;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/msruas/msruas"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('msruas'));
                  this.univImage="https://researgence.ai/univ-assets/icon/msruas-white.png";
                  this.univName="Ramaiah University of Applied Sciences";
                  this.universityId=22;
              }
              else if(univName.includes("maher")){     
                for(var i=1;i<7;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/maher/maher"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('maher'));
                  this.univImage="https://researgence.ai/univ-assets/icon/maher-white.png";
                  this.univName="Meenakshi Academy of Higher Education and Research";
                  this.universityId=31;
              }
              else if(univName.includes("imt")){     
                for(var i=1;i<5;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/imt/imt"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('imt'));
                  this.univImage="https://researgence.ai/univ-assets/icon/imt-white.png";
                  this.univName="Institute of Management Technology, Ghaziabad";
                  this.universityId=41;
              }
              else if(univName.includes("avinuty")){     
                for(var i=1;i<7;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/avinuty/avinuty"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('avinuty'));
                  this.univImage="https://researgence.ai/univ-assets/icon/avinuty-white.png";
                  this.univName="Avinashilingam Institute for Home science and Higher Education for Women";
                  this.universityId=38;
              }
              else if(univName.includes("sriramachandra")){     
                for(var i=1;i<5;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/sriramachandra/sriramachandra"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('sriramachandra'));
                  this.univImage="https://researgence.ai/univ-assets/icon/sriramachandra-white.png";
                  this.univName="Sri Ramachandra Institute of Higher Education and Research";
                  this.universityId=7;
              }
              else if(univName.includes("karnavatiuniversity")){     
                for(var i=1;i<5;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/karnavatiuniversity/karnavatiuniversity"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('karnavatiuniversity'));
                  this.univImage="https://researgence.ai/univ-assets/icon/karnavatiuniversity-white.png";
                  this.univName="Karnavati University";
                  this.universityId=3932;
              }
              else if(univName.includes("bennett")){     
                for(var i=1;i<5;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/bennett/bennett"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('bennett'));
                  this.univImage="https://researgence.ai/univ-assets/icon/bennett-white.png";
                  this.univName="Bennett University";
                  this.universityId=1198;
              }
              else if(univName.includes("drmgrdu")){     
                for(var i=1;i<3;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/drmgrdu/drmgrdu"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('drmgrdu'));
                  this.univImage="https://researgence.ai/univ-assets/icon/drmgrdu-white.png";
                  this.univName="Dr.M.G.R Educational and Research Institute";
                  this.universityId=11;
              }
              else if(univName.includes("anurag")){     
                for(var i=1;i<6;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/anurag/anurag"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('anurag'));
                  this.univImage="https://researgence.ai/univ-assets/icon/anurag-white.png";
                  this.univName="Anurag University";
                  this.universityId=6396;
              }
              else if(univName.includes("sathyabama")){     
                for(var i=1;i<5;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/sathyabama/sathyabama"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('sathyabama'));
                  this.univImage="https://researgence.ai/univ-assets/icon/sathyabama-white.png";
                  this.univName="Sathyabama Institute of Science and Technology";
                  this.universityId=1111;
              }
              else if(univName.includes("sbvu")){     
                for(var i=1;i<6;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/sbvu/sbvu"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('sbvu'));
                  this.univImage="https://researgence.ai/univ-assets/icon/sbvu-white.png";
                  this.univName="Sri Balaji Vidyapeeth University";
                  this.universityId=26;
              }
              else if(univName.includes("upes")){     
                for(var i=1;i<6;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/upes/upes"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('upes'));
                  this.univImage="https://researgence.ai/univ-assets/icon/upes-white.png";
                  this.univName="UPES – University of Tomorrow";
                  this.universityId=1363;
              }
              else if(univName.includes("jssstuniv")){     
                for(var i=1;i<6;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/jssstuniv/jssstuniv"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('jssstuniv'));
                  this.univImage="https://researgence.ai/univ-assets/icon/jssstuniv-white.png";
                  this.univName="JSS Science and Technology University";
                  this.universityId=14220;
              }

              else if(univName.includes("mitaoe")){     
                for(var i=1;i<6;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/mitaoe/mitaoe"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('mitaoe'));
                  this.univImage="https://researgence.ai/univ-assets/icon/mitaoe-white.png";
                  this.univName="MIT Academy of Engineering";
                  this.universityId=13367;
              }

              else if(univName.includes("mmumullana")){     
                for(var i=1;i<6;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/mmumullana/mmumullana"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('mmumullana'));
                  this.univImage="https://researgence.ai/univ-assets/icon/mmumullana-white.png";
                  this.univName="Maharishi Markandeshwar University";
                  this.universityId=24;
              }

              else if(univName.includes("mituniversity")){     
                for(var i=1;i<7;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/mituniversity/mituniversity"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('mituniversity'));
                  this.univImage="https://researgence.ai/univ-assets/icon/mituniversity-white.png";
                  this.univName="MIT Art, Design and Technology University";
                  this.universityId=1684;
              }

              else if(univName.includes("svkm")){     
                for(var i=1;i<4;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/svkm/svkm"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('svkm'));
                  this.univImage="https://researgence.ai/univ-assets/icon/svkm-white.png";
                  this.univName="SVKM Group";
                  this.universityId=29341;
              }

              else if(univName.includes("smu")){     
                for(var i=1;i<6;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/smu/smu"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('smu'));
                  this.univImage="https://researgence.ai/univ-assets/icon/smu-white.png";
                  this.univName="Sikkim Manipal University";
                  this.universityId=1054;
              }
              else if(univName.includes("srmist")){     
                for(var i=1;i<6;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/srmist/srmist"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('srmist'));
                  this.univImage="https://researgence.ai/univ-assets/icon/srmist-white.png";
                  this.univName="SRM Institute of Science and Technology";
                  this.universityId=5;
              }
              else if(univName.includes("shctpt")){     
                for(var i=1;i<5;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/shctpt/shctpt"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('shctpt'));
                  this.univImage="https://researgence.ai/univ-assets/icon/shctpt-white.png";
                  this.univName="Sacred Heart College, Tirupattur";
                  this.universityId=35;
              }
              else if(univName.includes("bschool-cms")){     
                for(var i=1;i<6;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/bschool/bschool"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('bschool'));
                  this.univImage="https://researgence.ai/univ-assets/icon/bschool-white.png";
                  this.univName="CMS Business School";
                  this.universityId=45366;
              }

              else if(univName.includes("dsu")){     
                for(var i=1;i<6;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/dsu/dsu"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('dsu'));
                  this.univImage="https://researgence.ai/univ-assets/icon/dsu-white.png";
                  this.univName="Dayananda Sagar University";
                  this.universityId=2043;
              }

              else if(univName.includes("mahindrauniversity")){     
                for(var i=1;i<5;i++){
                  this.testimonials.push({image:"https://researgence.ai/univ-assets/mahindrauniversity/mahindrauniversity"+i+".jpg"})
                }  
                this.testimonials=this.testimonials.filter(item=> item.image.includes('mahindrauniversity'));
                  this.univImage="https://researgence.ai/univ-assets/icon/mahindrauniversity-white.png";
                  this.univName="Mahindra University";
                  this.universityId=6123;
              }

              else
              {
                this.enableRes=true;
                this.testimonials=this.testimonials.filter(item=> item.image.includes('Image'));

                // For Prod and Dev
                this.univImage="assets/images/logo/cint-logo.png";
                this.univName="Cintelligence";

                // For Demo
                // this.univImage="assets/images/logo/temp-univ-logo-white.png";
                // this.univName="Your Institution Name";
              
                this.universityId=null;
              }
          this.dots[this.currentIndex] = true;
          setInterval(() => {
            this.nextSlide();
      
          }, 5000);
          localStorage.removeItem("currentUser");
          localStorage.removeItem("profile");    
   }

  public newUser = false;
 
  public loginForm: FormGroup;
  public formErrors: FormErrors = {
    email: "",
    password: "",
  };
  public errorMessage: any;
  enableBox:boolean=false;
  loading = false;
  email = "";
  password = "";
  applicantionCode: string = "";
  data;
  msg: any;
  Alertmsg: any;
  returnUrl: string;
  // Encp
  title = "";
  loginData:any;
  loginResponse:any;

  constructor( public authService: AuthService,private fb: FormBuilder, config: NgbCarouselConfig, private router: Router,private renderer: Renderer2, private encrypt:EncryptService) {
    this.renderer.setStyle(document.body, "overflow", "hidden");

    this.loginForm = fb.group({
      email: [[Validators.required]],
      password: [Validators.required],
    });
  }

  login() {
        
          if(!navigator.onLine){
            window.location.reload();
            return;
          }
          localStorage.clear();
          localStorage.removeItem("currentUser");
          localStorage.removeItem("profile");
          localStorage.removeItem("message");
          localStorage.removeItem("userName");
          this.enableLoad=false;
          let obj = JSON.stringify({ userName: this.email, password: this.password,universityId: this.universityId});
          console.log(obj);
          
          const timeout = setTimeout(()=>{
              localStorage.setItem('message',"Please try again");
              window.location.reload()
          },10000);
          this.authService.logins(obj).subscribe((arg:any) => {
            clearTimeout(timeout);
            this.loading = false;
            this.Alertmsg = { type: "danger", text: "Login" };  
            console.log(arg);
            this.loginResponse = arg;

            // Ensure RoleSelection completes and subscription data is fetched before proceeding
            this.authService.RoleSelection(this.loginResponse.UniversityId, this.loginResponse.UserId).subscribe({
              next: (roles) => {
                localStorage.setItem('RoleSelection', JSON.stringify(roles));
               }
             });

              // Roles API
    
            if(arg['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']!=null ){
              setTimeout(() => {
                this.enableLoad = true;
               }, 3000);
             }
            else{
              setTimeout(() => {
                this.enableLoad = true;
              }, 5000);
            }
            this.loginData=arg;
          
            if (arg && arg.ResponseCode === "6"&& arg.UserId||arg.ResponseCode==="5") {
              
              this.enableBox=true;
              
              this.enableAdd=true;
            
              
              this.new1User();
              
              // this.updateMail=true;
            } else {
              
              this.updateMail = false;
            }
            this.message=localStorage.getItem("message");   
          
            
          });
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  
  
  }
  changeSlide(index: number): void {
    this.currentIndex = index;
  }
  redirect() {
    this.router.navigate(["/Home/default"]);
  }

  forgotPassword(){
    this.newUser=true;
  }

  reload(){
    this.newUser=false;
  }
  closeAdd(){
    this.enableBox=false;
    this.enableUnmatch=false;
    this.newUser=false;
    window.location.reload();
  }

  submitUser(val){
    // this.encrypt.removeItem('random')
    this.forgothide=false;
    this.enablePassword=false;
    console.log(val);
    this.message='';
        if(val){
        this.authService.getMailByName(val,this.universityId).subscribe((x:any[])=>{
          this.forgothide=true
          console.log(x);
          
          this.mailVaue=x;
          if(this.mailVaue.value==null||this.mailVaue.value==""){
          this.enableBox=true;
          }
          else{
            this.mailValue=val;
            console.log(val);
            
            this.enableBox=true;
            this.enableAdd=true;
          }
          this.new1User();
        },error=>{
          this.forgothide=true
        })
      }
      else{
         this.message="Please enter your username";
         this.forgothide=true
      }
    
  }

  new1User(){
    // this.encrypt.removeItem('random')
    this.authService.getMailByName(this.email,this.universityId).subscribe(x=>{
     this.forgothide=true 
     this.mailValue=x;
        if(this.mailValue.value==""||this.mailValue.value==null){
           console.log(x);
           this.updateMail=true;
           this.UserExits=false;
         this.forgotpwdResponse=true;
         this.userid=this.mailValue.id;

        }
        else{
          let message: string = "OTP has been sent to your Email Id. Please be patient till the OTP arrives.";
         alert(message);
         this.countDown = timer(0,1000).subscribe(()=>{
            --this.counter;
            if(this.counter ===0){
               this.countDown.unsubscribe();
            }
         });
         this.updateMail=false;
         this.UserExits=false;
         this.forgotpwdResponse=true;
         this.userid=this.mailValue.id;
         this.emailData.to=this.mailValue.value;
         this.emailData.subject="One Time Password of Forgot password for Researgence";
        //  this.emailData.text=this.authService.generateOTP();
         console.log(this.emailData.to);
        //  this.encrypt.setItem('random',this.emailData.text);  
         const visiblePart = this.emailData.to.slice(0, 3);
        const maskedPart = '*'.repeat(this.emailData.to.length - 7); // Subtract 4 for @ and 3 for the first three characters
        this.maskedEmail = visiblePart + maskedPart + this.emailData.to.slice(this.emailData.to.indexOf('@'));
        console.log(this.maskedEmail);
          this.sendOTPMail();

        }
    },error=>{
      this.forgothide=true
    })
  }

  sendOTPMail(){
    this.authService.sendEmail(this.emailData).subscribe(
      (response) => {
        console.log('Email sent successfully');
        this.UserExits=false;
        this.updateMail=false
        // this.authService.getSentEmails().subscribe(
        //   (emails) => {
        //     this.validateOTP=emails[0].text;
            
        //   },
        //   (error) => {
        //     console.error('Error getting sent emails:', error);
        //   }
        // );
      },
      (error) => {
        console.error('Error sending email:', error);
      }
    );
   
   }

   validateOtp(){

    this.newPassword="";
    this.confirmPassword="";

    if (!this.newOTP) {
      alert("Please enter OTP");
      return;
    }

    this.authService.validateOTP(this.emailData.to, this.newOTP).subscribe({
      next: (res) => {
        if (res.success) {
          alert("OTP verified successfully");
          this.enablePassword = true;
        } else {
          alert("Invalid OTP");
        }
      },
      error: (err) => {
        console.error("Error validating OTP:", err);
        alert("Something went wrong while verifying OTP");
      }
    });
}

resendOTP(){
  // this.encrypt.removeItem('random')
  // this.emailData.text= this.authService.generateOTP();
  // this.encrypt.setItem('random',this.emailData.text);
  this.sendOTPMail();
  this.counter=90;
    this.countDown = timer(0,1000).subscribe(()=>{
      --this.counter;
      if(this.counter ===0){
        this.countDown.unsubscribe();
      }
  });
}

updatePassword(){
       
  if(this.newPassword==this.confirmPassword){
    this.checkPassword=false;      
    if(!this.forgotpwdResponse){
      this.userid=this.loginData.UserId;
    }
    console.log(this.emailData.to);
    console.log(this.confirmPassword);
    this.loginTime=1;
    this.authService.updateMail(this.userid,this.confirmPassword,this.emailData.to,this.loginTime).subscribe(x=>{
      const confirmation = confirm('Password changed successfully');
      if (confirmation) {
        this.enableBox=false;
    this.enableUnmatch=false;
      }
    })
  }
  else{
     this.checkPassword=true;
  }        
}

toggleShowPassword(){
  this.showPassword = !this.showPassword;
}

onKeyUp(event: Event): void {
  const input = event.target as HTMLInputElement;
  const inputValue = input.value;

  // Check if the input is a valid email address
  if (this.isValidEmail(inputValue)) {
    const [localPart, domain] = inputValue.split('@');
    const maskedLocalPart = localPart.length > 4
      ? `${localPart.substring(0, 2)}${'*'.repeat(localPart.length - 4)}${localPart.substring(localPart.length - 3)}`
      : localPart;
    const maskedDomain = '*'.repeat(5);
    input.type = 'text';

    // Form the masked email address
    input.value = `${maskedLocalPart}@${maskedDomain}.com`;
  } else {
    input.type = 'text';
  }
}

 isValidEmail(email: string): boolean {
// A simple email format validation
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{5,5}$/;
return emailPattern.test(email);
}

updatenewMail(){
        
        // this.emailData.text=this.authService.generateOTP();
        console.log(this.emailData);
        if(!this.forgotpwdResponse){
          this.userid=this.loginData.UserId;
          this.emailData.subject="One Time Password of First signin for Researgence";
        }
        else{
          this.emailData.subject="One Time Password of Forgot password for Researgence";
        }
        //To get current password by userID
        this.authService.getPassword(this.userid).subscribe(x=>{
              this.userCredential=x;
        })
          
        this.authService.updateMail(this.userid,this.userCredential,this.emailData.to,this.loginTime).subscribe(x=>{
          // this.encrypt.setItem('random',this.emailData.text);
                    this.sendOTPMail();
        });
        this.enableAdd=true;
        this.counter=90;
        this.countDown = timer(0,1000).subscribe(()=>{
          --this.counter;
          if(this.counter ===0){
            this.countDown.unsubscribe();
          }
        }); 
      }

}