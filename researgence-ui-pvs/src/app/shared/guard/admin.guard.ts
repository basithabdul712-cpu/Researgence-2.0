import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/firebase/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  checkSubscription:any[];
  scorebookEnable:boolean=false;
  constructor(public authService: AuthService,
    public router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for user is login or not
    let endIndex=window.location.hostname.indexOf(".");
    let univName=window.location.hostname.slice(0, endIndex);
    
    if(univName.includes("ashokapvs")){
      this.router.navigate(['/Home']);
       return true;
    }

     return true
  }
}
