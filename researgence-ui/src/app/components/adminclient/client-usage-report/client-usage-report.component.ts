import { ScorebookService } from './../../scorebook/scorebook.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacultiesService } from '../../faculties/faculties.service';
import { FormBuilder } from '@angular/forms';
import { GeneralApiService } from '../../general-api.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { AdminclientService } from '../adminclient.service';
type DataItem = { [key: string]: any };
@Component({
  selector: 'app-client-usage-report',
  templateUrl: './client-usage-report.component.html',
  styleUrls: ['./client-usage-report.component.scss','./../../../../assets/given/newcss/style.css']
})

export class ClientUsageReportComponent implements OnInit {

  reports: boolean = false;
  requests: boolean = false;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  stickyEnable: boolean;
  isMenuOpen: boolean;
  roleName: any;
  Name: any;
  isScrolled: any;
  roleId: any;
  user: any;
  universityName: any;
  userId: any;
  role: any;
  month:any;
  temptoYear:string;
  toYear:number
  pubDateMonthFrom:string;
  pubDateMonthto:string;
  pubyearFrom:string;
  pubyearTo:string;
  pubrangeFrom:string;
  pubrangeTo:string;
  excelEnable: boolean = false;
  items:any;
  excelvalue:any;

  constructor(private router:Router,private authService:AuthService,private modalService: NgbModal,private excel:ExcelExportService, 
    private menuService:MenuService,private service:AdminclientService) { }

  ngOnInit(): void {

    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
      });
    this.user=this.authService.getUserDetail();
    this.roleId=this.authService.getProfileObs();
    this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.universityName=this.user.University;
    this.userId=this.user.UserId;
    // this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
     this.role=JSON.parse(localStorage.getItem('RoleSelection'));
     const data=this.role.filter(item=> item.roleId==this.roleId);
     this.roleName=data[0].roleName;
     console.log(this.roleName)
    //  });
     
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


      generateReport(){
        
        this.excelEnable=true;
        this.service.getClientUsageReport(this.roleId,this.userId,this.user.UniversityId).subscribe(x => {
          this.items=x;
          console.log(this.items);
          if(this.items.length>0){
            this.exportExcel(this.items);
          }
          else{
            alert("No records found..");
            this.excelEnable=false;
          }
        })
        
      }


      exportExcel(item) {
        this.excelvalue = this.capitalizeAndCleanKeys(item);
        console.log(this.excelvalue);
        this.excel.exportAsExcelFile(this.excelvalue, "ClientUsageReport");
        this.excelEnable=false;
      
      }



      capitalizeAndCleanKeys(obj: any): any {
        if (Array.isArray(obj)) {
          return obj.map(item => this.capitalizeAndCleanKeys(item));
        } else if (obj && typeof obj === 'object') {
          const newObj: any = {};
          Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (value !== null) {
              const newKey = key.charAt(0).toUpperCase() + key.slice(1);
              newObj[newKey] = this.capitalizeAndCleanKeys(value);
            }
          });
          return newObj;
        }
        return obj;
      }  
}
