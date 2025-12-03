import { AuthService } from '../../../shared/services/firebase/auth.service';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ScorebookService } from '../scorebook.service';
import { HttpResponse } from '@angular/common/http';
import { MenuService } from 'src/app/shared/services/menu.service';
import { ExcelExportService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-scorebook-view-list',
  templateUrl: './scorebook-view-list.component.html',
  styleUrls: ['./scorebook-view-list.component.scss','./../../../../assets/given/newcss/style.css','./../../../../assets/given/newcss/splide.min.css']
})
export class ScorebookViewListComponent implements OnInit {

  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  isMenuOpen: boolean;
  stickyEnable:any;
  isScrolled:any;
  userRole:any;
  userdetail:any;
  Name:string;
  role:any;
  roleName:any;
  listData:any;
  responseList:any;
  McollectionSize:any;
  pageSize:number=20;
  Mpage:number=1;
  startIndex: number = 0;
  endIndex: number =20;
  viewName:string;
  moduleName:string;
  subModuleName:string;
  enablePic: boolean=false;
  pageSizes=[10,20,50,100];
  newUserId:any;
  dynamicHeader=["SL_NO","PUBLICATIONTITLE","SOURCEPUBLICATION","YEAR","VOLUMENUMBER","ISSUENUMBER","BPAGE","EPAGE","DOI"];

  constructor(
    private el: ElementRef, private renderer: Renderer2,private route:ActivatedRoute,private menuService: MenuService,
    private router:Router,private service: ScorebookService,private authservice:AuthService,private excel:ExcelExportService) { } 
 
     ngOnInit(){

             //for accessing menuopen 
             this.menuService.isMenuOpen$.subscribe(isOpen => {
              this.isMenuOpen = isOpen;
            });
  
          this.userRole=this.authservice.getProfileObs();
          this.userdetail=this.authservice.getUserDetail();
          this.Name = this.userdetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          //For rolename getting
          // this.authservice.RoleSelection(this.userdetail.UniversityId, this.userdetail.UserId).subscribe(x => {
            this.role=JSON.parse(localStorage.getItem('RoleSelection'));
            const data = this.role.filter(item => item.roleId == this.userRole);
            this.roleName = data[0].roleName;
            console.log(this.roleName)
          // })

          this.route.params.subscribe(param=>{
           this.viewName=param.subModule.toUpperCase();
           this.moduleName=param.module;
           this.subModuleName=param.subModule;
          //  this.fetchData(param.module,param.subModule);
         })    
      }

    fetchData(modules,subModule){
      let viewScores=localStorage.getItem("viewScore");
      if(viewScores!=null){
         this.userRole="2";
         this.newUserId=viewScores;
      }
      else{
        this.newUserId=this.userdetail.UserId;
        }
        if(this.userRole=="12"){
            this.userRole="6";
            this.userdetail.UniversityId=localStorage.getItem("NewUnivId");
        }
      this.service.getScoreBookViewList(this.userdetail.UniversityId,this.userRole,this.newUserId,modules,subModule).subscribe((x:HttpResponse<any>)=>{
        this.responseList=x.body;
        for(let j=0;j<this.responseList.length;j++){
          this.responseList[j]=this.convertKeysToUpperCase(this.responseList[j]);
          }
        this.listData=this.responseList;
        if(this.listData.length>0){
        this.McollectionSize=this.listData.length;
        this.listData=this.addSerialNumber(this.listData);
        for(let i=0;i<this.listData.length;i++){
            this.listData[i]=this.convertKeysToUpperCase(this.listData[i]);
        }
        this.getHeaders();
        console.log(this.listData);
        }
      });
      setTimeout(() => {
        this.enablePic = true;
      }, 10000);
    }

    @HostListener('window:scroll')
    onWindowScroll() {
      const scrollY = window.scrollY;
  
      if (this.blueheader) {
        const element = this.blueheader.nativeElement;
        if (scrollY >= 20) {
          element.classList.remove('bluebar_expand');
          element.classList.add('bluebar_collapse');
          this.stickyEnable = true;
        } else {
          element.classList.remove('bluebar_collapse');
          element.classList.add('bluebar_expand');
          this.stickyEnable = false;
        }
      }
    }

    getHeaders() {
      let headers: string[] = [];
      if(this.listData) {
        this.listData.forEach((value) => {
          Object.keys(value).forEach((key) => {
            for(let i=0;i<this.dynamicHeader.length;i++){
            if (key.includes(this.dynamicHeader[i]) && !headers.includes(key)) {
              headers.push(key);
            }
           }
          });
        });
      }
      return headers;
    }

    convertKeysToUpperCase(obj: any): any {
      let newObj: any = {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key.toUpperCase()] = obj[key];
        }
      }
      return newObj;
    }

    exportData(){
          if(this.responseList.length>0){
          let str = JSON.stringify(this.responseList);
          this.responseList = JSON.parse(str);
          this.excel.exportAsExcelFile(this.responseList, this.viewName);
        }
      }

      addSerialNumber(data: any[]): any[] {
        return data.map((item, index) => ({
          SL_NO: index + 1,
          ...item
        }));
      }

      onPageChange(page: number): void {
        this.Mpage = Math.max(1, Math.min(page, this.McollectionSize)); 
                  
                  if (this.Mpage == 1) {
                    this.startIndex = 0;
                  } else {
                    this.startIndex = (this.Mpage - 1) * this.pageSize; 
                  }
              this.endIndex =Math.min(this.startIndex + this.pageSize, this.McollectionSize);
      }
    
      onPageSizeChange(size: string){
        this.Mpage = 1; 
        this.pageSize = Number(size);
        this.endIndex=this.pageSize+this.startIndex;
        this.fetchData(this.moduleName,this.subModuleName);
      }

  } 