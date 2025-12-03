import { Component, Directive, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultiesService } from '../../faculties/faculties.service';
import { GeneralApiService } from '../../general-api.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

@Component({
  selector: 'app-patent-dashboard-level',
  templateUrl: './patent-dashboard-level.component.html',
  styleUrls: ['./patent-dashboard-level.component.scss','./../../../../assets/given/newcss/style.css']
})
export class PatentDashboardLevel implements OnInit {

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
  filteredValues:{departmentId:string;departmentName:string;departmentShortName:string;instituteId:string;instituteName:string;instituteShortName:string;layerLevel:string;layerTypeDesc:string;layerTypeName:string;locationId:string;locationName:string;locationShortName:string;schoolId:string;schoolName:string;schoolShortName:string;patCount:number;totCount:number;universityId:string;universityName:string,departmentGroupId:string}[]=[];
  filteredItems:{layerTypeName:string;layerTypeDesc:string;layerLevel: string;universityId:string;locationId: string;schoolId:string;instituteId:string;departmentId:string;patentStageName:string;stageLevelCount:string;totCount: string}[]=[];
  profCount:any;
  pubDbCount:any;
  levelId:string;
  locationid:Number;
  schoolid:Number;
  instituteid:Number;
  deptid:Number;
  id:Number;
  locationname:string;
  institutename:string;
  departmentname:string;
  schoolname:string;
  profCountLevel:any;
  pubDbCount3:any;
  totalCount3:any;
  filteredItems3:{layerTypeName:string;layerTypeDesc:string;layerLevel: string;universityId:string;locationId: string;schoolId:string;instituteId:string;departmentId:string;patentStageName:string;stageLevelCount:string;totCount: string}[]=[];
  filteredValues3:{departmentId:string;departmentName:string;departmentShortName:string;instituteId:string;instituteName:string;instituteShortName:string;layerLevel:string;layerTypeDesc:string;layerTypeName:string;locationId:string;locationName:string;locationShortName:string;schoolId:string;schoolName:string;schoolShortName:string;patCount:number;totCount:number;universityId:string;universityName:string,departmentGroupId:string}[]=[];
  @Input() digits3: any | 'auto' = 'auto';
  @Input() endCounterValue3: number = 0;
  numbers3: number[] = [];
  profCountLevel4:any;
  totalCount4:any;
  pubDbCount4:any;
  filteredItems4:{layerTypeName:string;layerTypeDesc:string;layerLevel: string;universityId:string;locationId: string;schoolId:string;instituteId:string;departmentId:string;patentStageName:string;stageLevelCount:string;totCount: string}[]=[];
  filteredValues4:{departmentId:string;departmentName:string;departmentShortName:string;instituteId:string;instituteName:string;instituteShortName:string;layerLevel:string;layerTypeDesc:string;layerTypeName:string;locationId:string;locationName:string;locationShortName:string;schoolId:string;schoolName:string;schoolShortName:string;patCount:number;totCount:number;universityId:string;universityName:string,departmentGroupId:string}[]=[];
  @Input() digits4: any | 'auto' = 'auto';
  @Input() endCounterValue4: number = 0;
  numbers4: number[] = [];
  profCountLevel5:any;
  totalCount5:any;
  @Input() digits5: any | 'auto' = 'auto';
  @Input() endCounterValue5: number = 0;
  numbers5: number[] = [];
  pubDbCount5:any;
  filteredItems5:{layerTypeName:string;layerTypeDesc:string;layerLevel: string;universityId:string;locationId: string;schoolId:string;instituteId:string;departmentId:string;patentStageName:string;stageLevelCount:string;totCount: string}[]=[];
  filteredValues5:{departmentId:string;departmentName:string;departmentShortName:string;instituteId:string;instituteName:string;instituteShortName:string;layerLevel:string;layerTypeDesc:string;layerTypeName:string;locationId:string;locationName:string;locationShortName:string;schoolId:string;schoolName:string;schoolShortName:string;patCount:number;totCount:number;universityId:string;universityName:string,departmentGroupId:string}[]=[];
  deptGroupId:any;

  constructor(private router:Router,private menuService: MenuService, private authService:AuthService, private service:GeneralApiService
    ,private route: ActivatedRoute) { }

  ngOnInit(){

      this.menuService.isMenuOpen$.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
      });
      this.userDetail=this.authService.getUserDetail();
      this.roleId=this.authService.getProfileObs();
      this.universityName= this.userDetail.University;
      this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      // this.authService.RoleSelection(this.userDetail.UniversityId,this.userDetail.UserId).subscribe(x=>{
      this.role=JSON.parse(localStorage.getItem('RoleSelection'));
      const data=this.role.filter(item=> item.roleId==this.roleId);
      this.roleName=data[0].roleName;
    // })

    this.route.params.subscribe(params => {
      console.log(params);
      this.id=params.id;
      this.levelId=params.levelid;
      this.layerType=params.layer;
      if(this.layerType=="3LType1"||this.layerType=="4LType1"||this.layerType=="3LType2"){
         this.locationid=this.id;
         this.locationname=params.name;
      }
      else if(this.layerType=="4LType2"){
        this.schoolid=this.id;
        this.schoolname=params.name
      }
      else if(this.layerType=="2LType1"){
          this.instituteid=this.id;
          this.institutename=params.name;
      }
      else if(this.layerType=="2LType2"){
        this.deptid=this.id;
        this.departmentname=params.name;
        if(this.deptid==0){
          this.deptGroupId=localStorage.getItem("PatentDeptgroupId");
        }
        else{
         this.deptGroupId=null;
        }
        
      }

      this.service.getPatentLayer(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid,this.deptGroupId).subscribe(x=>{
        console.log(x);
        this.profCount=x;
        this.filteredValues=this.profCount;
        if(this.profCount.length>0){
                this.totalCount=this.profCount[0].totCount;
          }
          else{
            this.totalCount=0;
          }
          this.endCounterValue=parseInt(this.totalCount);
          console.log(this.endCounterValue);
          if(this.totalCount){
          this.initializeCounter();
          }
          this.service.getPatentStage(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid,this.deptGroupId).subscribe(y=>{
            this.pubDbCount=y;
              this.filteredItems=this.pubDbCount;
          })
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


  viewLevel(val,levelval,name,groupId){
    console.log(val);
    console.log(levelval);
    this.levelId=levelval;
    if(this.layerType=="3LType1"&&this.levelId=="3"){
      this.instituteid=val;
       this.institutename=name;
   }
   else if(this.layerType=="4LType1"&&this.levelId=="3"){
      this.schoolid=val;
      this.schoolname=name;
   }
   else if(this.layerType=="4LType2"&&this.levelId=="3"){
    this.instituteid=val;
    this.institutename=name;
   }
   else if(this.layerType=="3LType2"&&this.levelId=="3"){
        this.deptid=val;
        this.departmentname=name;
        if(this.deptid==0){
          this.deptGroupId=groupId;
        }
        else{
        this.deptGroupId=null;
        }
   }
   else if(this.layerType=="2LType1"&&this.levelId=="3"){
       this.deptid=val;
       this.departmentname=name;
        if(this.deptid==0){
          this.deptGroupId=groupId;
        }
        else{
        this.deptGroupId=null;
        }
   }
   this.service.getPatentLayer(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid,this.deptGroupId).subscribe(x=>{
    console.log(x);
    this.profCountLevel=x;
    this.filteredValues3=this.profCountLevel;
    if(this.profCountLevel.length>0){
    this.totalCount3=this.profCountLevel[0].totCount;
    }
    else{
     this.totalCount3=0;
   }
   this.endCounterValue3=parseInt(this.totalCount3);
   console.log(this.endCounterValue3);
   if(this.totalCount3){
   this.initializeCounter3();
      }
      this.service.getPatentStage(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid,this.deptGroupId).subscribe(y=>{
        this.pubDbCount3=y;
          this.filteredItems3=this.pubDbCount3;
      })
    })
  }


  // LEVEL -3
  private initializeCounter3() {
    const digits = this.digits3 === 'auto' || this.digits3 < String(this.endCounterValue3).length ? String(this.endCounterValue3).length : this.digits3;
    // Set initial values
    let currentValue = 0;
    this.numbers3 = this.padNumber3(currentValue, digits);
    // Start the counting process
    this.startCounting3(currentValue);
  }
  private startCounting3(currentValue: number): void {
    const endValue = this.endCounterValue3;    
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
    this.numbers3 = this.padNumber3(currentValue, this.digits3);

    // Recursive call until the end value is reached
    if (endValue !== currentValue) {
      setTimeout(() => {
        this.startCounting3(currentValue);
      }, currentSpeed);
    }
  }
  private padNumber3(num: number, width: number, z: string = '0'): number[] {
    let numStr = num + '';
    numStr = numStr.padStart(width, z);
    return numStr.split('').map(Number);
  }

  viewLevel4(val,levelval,name,groupId){     
    this.levelId=levelval;
    if(this.layerType=='3LType1'&&this.levelId=="4"){
        this.deptid=val;
        this.departmentname=name;

            if(this.deptid==0){
              this.deptGroupId=groupId;
            }
            else{
            this.deptGroupId=null;
            }

       }
    else if(this.layerType=='4LType2'&&this.levelId=="4"){
      this.deptid=val;
      this.departmentname=name;

          if(this.deptid==0){
            this.deptGroupId=groupId;
          }
          else{
          this.deptGroupId=null;
          }

    }
    else if(this.layerType=='4LType1'&&this.levelId=="4"){
        this.instituteid=val;
        this.institutename=name;
    }

    this.service.getPatentLayer(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid,this.deptGroupId).subscribe(x=>{
        console.log(x);
        this.profCountLevel4=x;
        this.filteredValues4=this.profCountLevel4;
        if(this.profCountLevel4.length>0){
        this.totalCount4=this.profCountLevel4[0].totCount;
      }
      else{
        this.totalCount4=0;
      }    
      this.endCounterValue4=parseInt(this.totalCount4);
      console.log(this.endCounterValue4);
      if(this.totalCount4){
      this.initializeCounter4();
      }  
      this.service.getPatentStage(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid,this.deptGroupId).subscribe(y=>{
        this.pubDbCount4=y;
          this.filteredItems4=this.pubDbCount4;
      })
    })
  }

   // Level -4 
   private initializeCounter4() {
    const digits = this.digits4 === 'auto' || this.digits4 < String(this.endCounterValue4).length ? String(this.endCounterValue4).length : this.digits4;
    // Set initial values
    let currentValue = 0;
    this.numbers4 = this.padNumber4(currentValue, digits);
    // Start the counting process
    this.startCounting4(currentValue);
  }
  private startCounting4(currentValue: number): void {
    const endValue = this.endCounterValue4;    
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
    this.numbers4 = this.padNumber4(currentValue, this.digits4);
    // Recursive call until the end value is reached
    if (endValue !== currentValue) {
      setTimeout(() => {
        this.startCounting4(currentValue);
      }, currentSpeed);
    }
  }
  private padNumber4(num: number, width: number, z: string = '0'): number[] {
    let numStr = num + '';
    numStr = numStr.padStart(width, z);
    return numStr.split('').map(Number);
  }

  viewLevel5(val,levelval,name,groupId){
          
    this.levelId=levelval;
    if(this.layerType=='4LType1'&&this.levelId=="5"){
          this.deptid=val;
          this.departmentname=name;
          if(this.deptid==0){
            this.deptGroupId=groupId;
          }
          else{
          this.deptGroupId=null;
          }
      }

      this.service.getPatentLayer(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid,this.deptGroupId).subscribe(x=>{
        console.log(x);
        this.profCountLevel5=x;
        this.filteredValues5=this.profCountLevel5;
        if(this.profCountLevel5.length>0){
        this.totalCount5=this.profCountLevel5[0].totCount;
         }
        else{
          this.totalCount5=0;
        }
        this.endCounterValue5=parseInt(this.totalCount5);
        console.log(this.endCounterValue5);
        if(this.totalCount5){
        this.initializeCounter5();
        }
        this.service.getPatentStage(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid,this.deptGroupId).subscribe(y=>{
          this.pubDbCount5=y;
            this.filteredItems5=this.pubDbCount5;
        })
      })
    }

     // Level - 5
     private initializeCounter5() {
      const digits = this.digits5 === 'auto' || this.digits5 < String(this.endCounterValue5).length ? String(this.endCounterValue5).length : this.digits5;
      // Set initial values
      let currentValue = 0;
      this.numbers5 = this.padNumber5(currentValue, digits);
      // Start the counting process
      this.startCounting5(currentValue);
    }
    private startCounting5(currentValue: number): void {  
      const endValue = this.endCounterValue5;    
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
      this.numbers5 = this.padNumber5(currentValue, this.digits4);
      // Recursive call until the end value is reached
      if (endValue !== currentValue) {
        setTimeout(() => {
          this.startCounting5(currentValue);
        }, currentSpeed);
      }
    }
    private padNumber5(num: number, width: number, z: string = '0'): number[] {
      let numStr = num + '';
      numStr = numStr.padStart(width, z);
      return numStr.split('').map(Number);
    }

}