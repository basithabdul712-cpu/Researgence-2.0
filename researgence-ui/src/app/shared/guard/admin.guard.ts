import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/firebase/auth.service';
import { EncryptService } from '../services/encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  checkSubscription:any[];
  scorebookEnable:boolean=false;
  constructor(public authService: AuthService, private encrypt:EncryptService,
    public router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for user is login or not
    
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let userRole=this.authService.getProfileObs();
    let userDetail=this.authService.getUserDetail();

    const data = JSON.parse(localStorage.getItem('UnivSubcripModuleConsolidated'));
        console.log(data);
        

    // this.authService.getUnivSubscriptionModule(userDetail.UniversityId,userRole,userDetail.UserId).subscribe((x:any)=>{
    if(data){
      this.checkSubscription=data.univSubscriptionModuleCheck;
      let scorbookCheck= this.checkSubscription.filter(item=> item.subscriptionModule==="Scorebook"&&item.isApplicable==="0");    
      console.log(scorbookCheck);
      if(scorbookCheck.length>0){
            this.scorebookEnable=true;
            console.log(this.scorebookEnable);
            
          }
        }
    // })
    
    if (!user) {
      this.router.navigate(['/auth/login']);
      return true
    }
    
    if (state.url=='/scorebook') {
      if (userRole=="11"|| userRole=="5") {
        this.router.navigate(['/auth/login']);
        return false;
      }
      else{
        if(this.scorebookEnable){
          this.router.navigate(['/auth/login']);
        return false;
        }
      }
    }
    
    if(state.url=='/performance-analysis-dashboard'){
      if (userRole==6||userRole==7||userRole==8||userRole==9||userRole==10||userRole==16) {       
        
      }
      else{
        this.router.navigate(['/auth/login']);
        return false;
      }
    }

    if(state.url=='/clientlibrarian'){
      if (userRole!="17") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }

    if(state.url=='/facultyProfiles'){
      if (userRole=="11"||userRole=="12"|| userRole=="5") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }

    if(state.url.includes('/facultyProfiles/')){ 
      const extractedNumber = parseInt(state.url.match(/\d+/)?.[0] || '0')
      if(state.url.includes('/facultyProfiles/'+extractedNumber)){ 
        if(userRole=="2"||userRole=="18"){
          //  userRole=="6"  to handle auth guard for article 
            if(userDetail.UserId!=extractedNumber){    
              this.router.navigate(['/auth/login']);
              return false;
              }
            }
            else if(userRole=="11"||userRole=="12"||userRole=="5"){
              if(state.url.includes('/facultyProfiles/'+extractedNumber)){ 
                  this.router.navigate(['/auth/login']);
                  return false;
              }
            }
        }
    }

    if(state.url.includes('/scholar/')){ 
      const extractedNumber = parseInt(state.url.match(/\d+/)?.[0] || '0')
      if(state.url.includes('/scholar/'+extractedNumber)){ 
        if(userRole=="2"||userRole == "18"){
          //  userRole=="6"  to handle auth guard for article 
            if(userDetail.UserId!=extractedNumber){    
              this.router.navigate(['/auth/login']);
              return false;
              }
            }
            else if(userRole=="11"||userRole=="12"||userRole=="5"){
              if(state.url.includes('/scholar/'+extractedNumber)){ 
                  this.router.navigate(['/auth/login']);
                  return false;
              }
            }
        }
    }

    if(state.url.includes('/facultyProfiles/feeder/')){
      if(userRole=="12"||userRole=="11"){
        
          }    
          else{
            this.router.navigate(['/auth/login']);
            return false;
          }
       }

       if(state.url=='/facultyProfiles/new/screen'){
        if (userRole=="12" || userRole=="5"|| userRole=="17"){
        }
        else{
          this.router.navigate(['/auth/login']);
          return false;
         }
       }

    if(state.url=='/Home'){
      if (userRole=="11" || userRole=="12" || userRole=="5") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }

    if(state.url=="/dashboard-detail"){
      if (userRole=="11" || userRole=="12" || userRole=="5") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(state.url.includes('/Publication/Dashboard')){
      if (userRole=="11" || userRole=="12" || userRole=="5") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }

    if(state.url.includes('/facultyProfiles/Publications/Dashboard')){
      if (userRole=="11" || userRole=="12" || userRole=="5") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(state.url=='/scorebook/Publications/Mine'){
      if (userRole=="5") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(state.url=='/scorebook/pub/Publications'){
      if (userRole=="11" || userRole=="12" || userRole=="5") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
   
    
    if(state.url=='/facultyProfiles/Support/MyAdditions'){
      if (userRole=="11" || userRole=="12" || userRole=="5"||userRole=="6") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }

    if(state.url=='/facultyProfiles/faculty/rfs'){
      if (userRole=="11" || userRole=="12" || userRole=="5"||userRole=="6") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(state.url=='/scorebook/Publications/InsightReports'){
      if (userRole=="11" || userRole=="12" || userRole=="5") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(state.url=='/clientadmin'){
      if (userRole!="5") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(state.url=='/cisupportadmin'){
      if (userRole!="12") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(state.url=='/clientadmin/universitySelect'){
      if (userRole!="11") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(state.url=='/clientadmin/user/screen'){
      if (userRole!="12"||userRole!="5") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
  
    
    if(state.url=='/clientadmin/universitySelect/DFS/addDfs'){
      if (userRole!="12") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    if(state.url=='/clientadmin/universitySelect/DFS/viewDfs/university'){
      if (userRole!="12") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(userRole=="11"){
    if(state.url.includes('/clientadmin/universitySelect/DFS/viewDfs')){
      if (userRole!="12"||userRole!="11") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
  }
    
    if(state.url.includes('/clientadmin/universitySelect/RFS/view')){
      if (userRole!="12"||userRole!="11") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(state.url=='/clientadmin/admin-service-request'){
      if (userRole!="12") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
  
    if(state.url.includes('/clientadmin/service-request')){
      if (userRole!="11"||userRole!="5") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }

    if(state.url=='/superadmin'){
      if (userRole!="13") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(state.url=='/facultyProfiles/compare/fac'){
      if (userRole=="6"||userRole=="12"||userRole=="7"||userRole=="8"||userRole=="9"||userRole=="10"||userRole=="16") {         
      }
      else{
        this.router.navigate(['/auth/login']);
        return false;
      }
    }

    if(state.url=='/scholar/compare/sch'){
      if (userRole!="6") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(state.url.includes('/scorebook/pub')){
      if (userRole=="11"&&userRole=="12"&&userRole=="13") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(state.url.includes('/facultyProfiles/faculty/rfs-edit')){
      if (userRole!="2") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    
    if(state.url.includes('/clientadmin/service/evaluation/')){
      if (userRole!="11"||userRole!="12") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }

    if(state.url=='/Dashboard'){
      if (userRole=="11"||userRole=="12"||userRole=="5") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
    if(state.url=='/facultyProfiles/compare/dashboard'){
      if (userRole=="11"||userRole=="12"||userRole=="5") {       
        this.router.navigate(['/auth/login']);
        return false;
      }
    }

    return true
  }
}
