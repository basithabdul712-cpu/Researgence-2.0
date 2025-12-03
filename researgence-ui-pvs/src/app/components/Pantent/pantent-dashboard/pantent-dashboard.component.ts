import { Component, Directive, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FacultiesService } from '../../faculties/faculties.service';
import { GeneralApiService } from '../../general-api.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

@Component({
  selector: 'app-pantent-dashboard',
  templateUrl: './pantent-dashboard.component.html',
  styleUrls: ['./pantent-dashboard.component.scss','./../../../../assets/given/newcss/style.css']
})
export class PantentDashboard implements OnInit {

  isMenuOpen: boolean;
  layerType:any;
  userDetail:any;
  roleId:any;
  universityName:string;
  Name:string;
  role:any;
  roleName:any;
  total:number=0;
  totalCountstop:any;
  totalCount:any;
  @Input() digits: any | 'auto' = 'auto';
  @Input() endCounterValue: number = 0;
  numbers: number[] = [];
  filteredValues:{departmentId:string;departmentName:string;departmentShortName:string;instituteId:string;instituteName:string;instituteShortName:string;layerLevel:string;layerTypeDesc:string;layerTypeName:string;locationId:string;locationName:string;locationShortName:string;schoolId:string;schoolName:string;schoolShortName:string;patCount:number;totCount:number;universityId:string;universityName:string}[]=[];
  profCount:any;
  levelId:Number=1;
  locationid:Number;
  schoolid:Number;
  instituteid:Number;
  deptid:Number;
  filteredItems:{layerTypeName:string;layerTypeDesc:string;layerLevel: string;universityId:string;locationId: string;schoolId:string;instituteId:string;departmentId:string;patentStageName:string;stageLevelCount:string;totCount: string}[]=[];
  pubDbCount:any;
  univId:any;

  constructor(private router:Router,private menuService: MenuService, private authService:AuthService, private service:GeneralApiService) { }

  ngOnInit(){

      this.menuService.isMenuOpen$.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
      });
      this.userDetail=this.authService.getUserDetail();
      this.roleId=this.authService.getProfileObs();
      this.univId=parseInt(localStorage.getItem('initialUniv'));
      // this.universityName= this.userDetail.University;
      // this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    //   this.authService.RoleSelection(this.userDetail.UniversityId,this.userDetail.UserId).subscribe(x=>{
    //   this.role=x;
    //   const data=this.role.filter(item=> item.roleId==this.roleId);
    //   this.roleName=data[0].roleName;
    // })
      this.service.getPatentLayer(this.univId,this.roleId,this.userDetail.UserId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe(x=>{
        console.log(x);
        this.profCount=x;
        this.filteredValues=this.profCount;
        this.totalCount=this.profCount[0].totCount;
        this.endCounterValue=parseInt(this.totalCount);
        console.log(this.endCounterValue);
        if(this.totalCount){
        this.initializeCounter();
        }
        this.layerType=this.profCount[0].layerTypeName;
        console.log(this.layerType);
        this.service.getPatentStage(this.univId,this.roleId,this.userDetail.UserId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe(y=>{
          this.pubDbCount=y;
            this.filteredItems=this.pubDbCount;
        })
      })

  }

  viewLevel(val,levelval,layer,name){
    this.router.navigate(['/Patent/level/'+val+'/'+levelval+'/'+layer+'/'+name]);             
}

 initializeCounter() {
    const digits = this.digits === 'auto' || this.digits < String(this.endCounterValue).length ? String(this.endCounterValue).length : this.digits;
    // Set initial values
    let currentValue = 0;
    this.numbers = this.padNumber(currentValue, digits);
    // Start the counting process
    this.startCounting(currentValue);
  }

  private startCounting(currentValue: number): void {
    const endValue = this.endCounterValue;    
    let currentSpeed = 20;
    if (endValue === 0) {
      return;
    }
     else if (endValue - currentValue < 5) {
      currentSpeed = 200;
      currentValue += 1;
    } else if (endValue - currentValue < 15) {
      currentSpeed = 50;
      currentValue += 1;
    } else if (endValue - currentValue < 50) {
      currentSpeed = 25;
      currentValue += 3;
    } 
    else if (endValue - currentValue < 100) {
      currentSpeed = 20;
      currentValue += 5;
    } 
    else if (endValue - currentValue < 300) {
      currentSpeed = 20;
      currentValue += 10;
    } 
    else if (endValue - currentValue < 1000) {
      currentSpeed = 15;
      currentValue += 50;
    }
    else if (endValue - currentValue < 10000) {
      currentSpeed = 10;
      currentValue += 100;
    }
    else {
      currentSpeed = 5;
      currentValue += 1000;           
    }
    // Update current value
    this.numbers = this.padNumber(currentValue, this.digits);
    // Recursive call until the end value is reached
    if (endValue !== currentValue) {
      setTimeout(() => {
        this.startCounting(currentValue);
      }, currentSpeed);
    }
  }
  private padNumber(num: number, width: number, z: string = '0'): number[] {
    let numStr = num + '';
    numStr = numStr.padStart(width, z);
    return numStr.split('').map(Number);
  }

}
