import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

type UserFields = "email" | "password";
type FormErrors = { [u in UserFields]: string };
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  email: any;
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
password;
showPassword = false;

  constructor(
    public authService: AuthService,public route:ActivatedRoute,
    private fb: FormBuilder,
    config: NgbCarouselConfig,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.renderer.setStyle(document.body, "overflow", "hidden");
  }

  ngOnInit() {

    this.UserDetail=this.authService.getUserDetail();
    this.password = 'password';
    this.route.params.subscribe(params => { 
      this.responseId=params.userID;   
      if(this.responseId=="R-6"){

        // First time login without mail and existing user
           this.updateMail=true
      }
    //   else if(this.responseId=="R-5"){

    //    // First time login with existing user and mail
    //     this.updateMail=false;
    //     this.UserExits=true;
    //     this.authService.getUserMail(this.UserDetail.UserId).subscribe(x=>{
    //       this.mailValue=x;
    //       this.emailData.to=this.mailValue.value;
    //       this.emailData.subject="One Time Password of First signin for Researgence";
    //       this.emailData.text=this.authService.generateOTP();
    //       console.log(this.emailData.to);    
    //        this.sendOTPMail();
     })
    //   }
    //  else if(params.userID=='checkuser'){
     
    //   //Forget password for update or new mail
    //      this.UserExits=false;
    //      this.updateMail=false;
    //  }
    //  else{

    //   // ForgotPassword for existing mail
    //   this.updateMail=false;
    //   this.UserExits=true;
    //   this.forgotpwdResponse=true;
    //   this.authService.getMailByName(this.responseId).subscribe(x=>{
    //     this.mailValue=x;
    //     this.forgotpwdResponse=true;
    //     this.userid=this.mailValue.id;
    //     this.emailData.to=this.mailValue.value;
    //     this.emailData.subject="One Time Password of Forgot password for Researgence";
    //     this.emailData.text=this.authService.generateOTP();
    //     console.log(this.emailData.to);    
    //      this.sendOTPMail();
    //   })
    //  }
    // });
  }

  // Send mail to user
//    sendOTPMail(){
//     this.authService.sendEmail(this.emailData).subscribe(
//       (response) => {
//         console.log('Email sent successfully');
//         this.UserExits=true;
//         this.updateMail=false
//         this.authService.getSentEmails().subscribe(
//           (emails) => {
//             this.validateOTP=emails[0].text;
            
//           },
//           (error) => {
//             console.error('Error getting sent emails:', error);
//           }
//         );
//       },
//       (error) => {
//         console.error('Error sending email:', error);
//       }
//     );
   
//    }

//    //To validate OTP
//   validateOtp(){

//        if(this.newOTP==undefined||this.validateOTP==undefined){
//         alert("OTP not found")
//        }
//        else if(this.newOTP==this.validateOTP){
//           this.enablePassword=true;
//         }
//         else{
//           alert("invalid OTP")
//         }
//   }


//   // Update password for user
//   updatePassword(){
       
//         if(this.newPassword==this.confirmPassword){
//           this.checkPassword=false;      
//           if(!this.forgotpwdResponse){
//             this.userid=this.UserDetail.UserId;
//           }
//           console.log(this.emailData.to);
//           console.log(this.confirmPassword);
//           this.loginTime=1;
//           this.authService.updateMail(this.userid,this.confirmPassword,this.emailData.to,this.loginTime).subscribe(x=>{
//             const confirmation = confirm('Password changed successfully');
//             if (confirmation) {
//               this.router.navigate(['auth/login']);
//             }
//           })
//         }
//         else{
//            this.checkPassword=true;
//         }        
//    }

//    // Forgot password- If email id exist in user name it send mail or goes to update mail  
//    newUser(){
//      this.authService.getMailByName(this.username).subscribe(x=>{
//       this.mailValue=x;
//          if(this.mailValue.value==""||this.mailValue.value==null){
//             console.log(x);
//             this.updateMail=true;
//             this.UserExits=false;
//           this.forgotpwdResponse=true;
//           this.userid=this.mailValue.id;

//          }
//          else{
//           this.updateMail=false;
//           this.UserExits=true;
//           this.forgotpwdResponse=true;
//           this.userid=this.mailValue.id;
//           this.emailData.to=this.mailValue.value;
//           this.emailData.subject="One Time Password of Forgot password for Researgence";
//           this.emailData.text=this.authService.generateOTP();
//           console.log(this.emailData.to);    
//            this.sendOTPMail();

//          }
//      })
//    }

//      // Update mail for first time login
//       updatenewMail(){
        
//         this.emailData.text=this.authService.generateOTP();
//         console.log(this.emailData);  
//         if(!this.forgotpwdResponse){
//           this.userid=this.UserDetail.UserId;
//           this.emailData.subject="One Time Password of First signin for Researgence";
//         }
//         else{
//           this.emailData.subject="One Time Password of Forgot password for Researgence";
//         }
//         //To get current password by userID
//         this.authService.getPassword(this.userid).subscribe(x=>{
//               this.userCredential=x;
//         })
          
//         this.authService.updateMail(this.userid,this.userCredential,this.emailData.to,this.loginTime).subscribe(x=>{
//                     this.sendOTPMail();
//         });
        
//       }


//       OnClick(){
//         if (this.password === 'password') {
//           this.password = 'text';
//           this.showPassword = true;
//         } else {
//           this.password = 'password';
//           this.showPassword = false;
//         }
//       }

//   //email validation
//   @HostListener('input', ['$event']) onInput(event: Event): void {
//   const input = event.target as HTMLInputElement;
//   const inputValue = input.value;

//   // Check if the input is a valid email address
//   if (this.isValidEmail(inputValue)) {
//     const [localPart, domain] = inputValue.split('@');
//     const maskedLocalPart = localPart.length > 4
//       ? `${localPart.substring(0, 2)}${'*'.repeat(localPart.length - 4)}${localPart.substring(localPart.length - 2)}`
//       : localPart;
//     const maskedDomain = '*'.repeat(5);
//     input.type = 'text';

//     // Form the masked email address
//     input.value = `${maskedLocalPart}@${maskedDomain}.com`;
//   } else {
   
//     input.type = 'text';
//   }
// }

//  isValidEmail(email: string): boolean {
// // A simple email format validation
// const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,3}$/;
// return emailPattern.test(email);
// }
  

}
