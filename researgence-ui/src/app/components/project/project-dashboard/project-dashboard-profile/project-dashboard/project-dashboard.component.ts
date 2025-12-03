import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralApiService } from 'src/app/components/general-api.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from '../../../../../shared/services/menu.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
    styleUrls: ['../../../../../../assets/given/newcss/style.css','./project-dashboard.component.scss']
  })
export class ProjectDashboardComponent implements OnInit {

  isMenuOpen:boolean;
  userDetail:any;
  roleId:any;
  universityName:string;
  Name:string;
  role:any;
  roleName:any;
  levelId:Number=1;
  locationid:Number;
  schoolid:Number;
  instituteid:Number;
  deptid:Number;
  total:number=0;
  totalCountstop:any;
  totalCount:any;
  @Input() digits: any | 'auto' = 'auto';
  @Input() endCounterValue: number = 0;
  numbers: number[] = [];
  projCount:any;
  filteredValues:{departmentId:string;departmentName:string;departmentShortName:string;instituteId:string;instituteName:string;instituteShortName:string;layerLevel:string;layerTypeDesc:string;layerTypeName:string;locationId:string;locationName:string;locationShortName:string;schoolId:string;schoolName:string;schoolShortName:string;projectCount:string;totCount:string;universityId:string;universityName:string,departmentGroupId:string}[]=[];
  layerType:any;
  filteredItems:{layerTypeName:string;layerTypeDesc:string;layerLevel: string;universityId:string;locationId: string;schoolId:string;instituteId:string;departmentId:string;projectFundingAgencyName:string;stageLevelCount:string;totCount: string}[]=[];
  projDbCount:any;

  constructor(private router:Router,private menuService: MenuService, private authService:AuthService, private service:GeneralApiService) { }

  ngOnInit() {
          this.menuService.isMenuOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
          });
          localStorage.removeItem("ProjDeptgroupId");
          this.userDetail=this.authService.getUserDetail();
          this.roleId=this.authService.getProfileObs();
          this.universityName= this.userDetail.University;
          this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          // this.authService.RoleSelection(this.userDetail.UniversityId,this.userDetail.UserId).subscribe(x=>{
          this.role=JSON.parse(localStorage.getItem('RoleSelection'));
          const data=this.role.filter(item=> item.roleId==this.roleId);
          this.roleName=data[0].roleName;
        // })
          this.service.getProjectDashboardByLayer(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid,null).subscribe((x: any[])=>{
            console.log(x);
            
               // Preprocess each item to split number and unit
      this.projCount = x.map(item => {
        const value = item.projectCount?.trim() || '';
        const numberMatch = value.match(/[\d,.]+/);
        const unitMatch = value.match(/[a-zA-Z]+$/);
        return {
          ...item,
          number: numberMatch ? numberMatch[0] : '0',
          unit: unitMatch ? unitMatch[0] : ''
        };
      });

      this.filteredValues = this.projCount;
      this.totalCount = this.projCount[0]?.totCount;
      this.endCounterValue = parseInt(this.totalCount);
            // this.projCount=x;
            // this.filteredValues=this.projCount;
            // this.totalCount=this.projCount[0].totCount;
            // this.endCounterValue=parseInt(this.totalCount);
            // this.endCounterValue = this.totalCount; // keep as string
            console.log(this.endCounterValue);
            if(this.totalCount){
            this.initializeCounter();
            }
            this.layerType=this.projCount[0].layerTypeName;
            console.log(this.layerType);
            this.service.getProjectDashboardByFundingAgency(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid,null).subscribe(y=>{
              this.projDbCount=y;
                this.filteredItems=this.projDbCount;
            })
          })

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

      viewLevel(val,levelval,layer,name,groupId){

        if(layer=="2LType2"){
          localStorage.setItem("ProjDeptgroupId",groupId)
       }
        this.router.navigate(['/Project/Dashboard/level/'+val+'/'+levelval+'/'+layer+'/'+name]);             
      }

extractNumber(value: string): string {
  if (!value) return '';
  const match = value.match(/[\d,.]+/);
  return match ? match[0] : '';
}

extractUnit(value: string): string {
  if (!value) return '';
  // Match letters at the end of the string (Cr, L, K)
  const match = value.trim().match(/[a-zA-Z]+$/);
  return match ? match[0] : '';
}





}
