import { ScorebookService } from './../../scorebook/scorebook.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { FacultiesService } from '../../faculties/faculties.service';
import { FormBuilder } from '@angular/forms';
import { GeneralApiService } from '../../general-api.service';
import { Publications, Report, SheetHeader } from './turnkeyData';
import { SheetData } from './turnkeyData';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
type DataItem = { [key: string]: any };
@Component({
  selector: 'app-turnkey',
  templateUrl: './turnkey.component.html',
  styleUrls: ['./turnkey.component.scss','./../../../../assets/given/newcss/style.css']
})

export class TurnkeyComponent implements OnInit {

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
  tempReportData:any;
  columnName:any;
  reportList:any;
  resultList:any;
  reportId:string;
  reportName:string;
  versionNumber:string;
  reportType:string;
  layerType:string;
  locationFilterId:any;
  schoolFilterId:any;
  instituteFilterId:any;
  deptFilterId:any;
  campus:any;
  layerInsSchCamDep:any;
  layerCampus:any;
  layerInst:any;
  layerDept:any;
  layerSchool:any;
  departmentfilter: string;
  Institutefilter: string;
  Campusfiter: string;
  schoolfilter:string;
  filterSchool:string;
  columnNameList:any;
  tempfromYear:string;
  fromYear: number;
  currentYear = new Date().getFullYear(); 
  maxDate: Date = new Date(this.currentYear,11,31);
  sheetHeaderList:any;
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
  deptGrpId:any;

  constructor(private router:Router,private authService:AuthService,private modalService: NgbModal,private excel:ExcelExportService, private scoreservice:ScorebookService,
    private menuService:MenuService,private facultyservice: FacultiesService,private fb: FormBuilder,private gservice:GeneralApiService) { }

  ngOnInit(): void {

    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
      });
    this.user=this.authService.getUserDetail();
    this.roleId=this.authService.getProfileObs();
    this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.universityName=this.user.University;
    this.userId=this.user.UserId;
    this.layerType=this.user.LayerType;
    // this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
      this.role=JSON.parse(localStorage.getItem('RoleSelection'));
    console.log(this.role);
    this.month=this.scoreservice.getMonths();
    
     const data=this.role.filter(item=> item.roleId==this.roleId);
     this.roleName=data[0].roleName;
     console.log(this.roleName)
    //  });
     
      this.gservice.getTurnkeyReport(this.user.UniversityId,this.roleId,this.user.UserId).subscribe(x=>{
            this.resultList=x;
            for(let i=0;i<this.resultList.length;i++){
                if(this.resultList[i].scope!=null){
                this.resultList[i].scope=this.resultList[i].scope.split('<br>');
                }
                if(this.resultList[i].createdOn!=null){
                  this.resultList[i].createdOn=this.resultList[i].createdOn.split(' ')[0];
                  }
                if(this.resultList[i].latestUpdated!=null){
                  this.resultList[i].latestUpdated=this.resultList[i].latestUpdated.split(' ')[0];
                  }
              }
      })

      this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x =>{
        this.campus =x;
        console.log(x);
        
        if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
          this.layerInsSchCamDep=this.campus;
          this.layerCampus=Array.from(new Set(this.campus.map((item : any)=>item.locationName)));
      }
      else if(this.layerType=='4LType2'||this.layerType=='3LType3'){
        this.layerInsSchCamDep=this.campus;
        this.layerSchool=Array.from(new Set(this.campus.map((item : any)=>item.schoolName)));
      }
      else if(this.layerType=='2LType1'){
        this.layerInsSchCamDep=this.campus;
        this.layerInst=Array.from(new Set(this.campus.map((item : any)=>item.instituteName)));
      }
      else if(this.layerType=='2LType2'){
        this.layerInsSchCamDep=this.campus;
        this.layerDept=this.campus;
      }  
    }) 
  }
        Greports(reportId,reportName,versionNumber,type){
          this.reports=true;
          this.reportId=reportId;
          this.reportName=reportName;
          this.versionNumber=versionNumber;
          this.reportType=type; 
          this.schoolFilterId=null;
          this.Campusfiter=null;
          this.filterSchool=null;
          this.Institutefilter=null;
          this.departmentfilter=null;
          this.instituteFilterId=null;
          this.deptFilterId=null;
          this.locationFilterId=null;
          this.pubrangeTo=null;
          this.pubrangeFrom=null;
          this.deptGrpId=null;
        }

        GreportsClose(){
          this.reports=false;
        }

        request(){
          this.requests=!this.requests 
        }

        filters(val){
          if(val=="loc"){      

            this.deptGrpId=null;
          if(this.Campusfiter==""){
            this.locationFilterId=null;
           }
            else{      
              const filterLoc=this.layerInsSchCamDep.filter(item => item.locationName==this.Campusfiter);
              this.locationFilterId=filterLoc[0].locationId;
            }
            this.schoolFilterId=null;
            this.instituteFilterId=null;
            this.deptFilterId=null;
            this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
            if(this.layerType=="3LType1"){
                this.layerInst=x;
                this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
                }
                else if(this.layerType=="3LType2"){
                    this.layerDept=x;
                }
                else if(this.layerType=="4LType2"||this.layerType=="3LType3"){
                this.layerSchool=x;
                this.layerSchool=Array.from(new Set(this.layerSchool.map((item : any)=>item.schoolName)))
              }
            });
          }

          if(val=="scl"){

            this.deptGrpId=null;
            if(this.filterSchool==""){
              this.schoolFilterId=null;
            }
            else{
              const schoolfilter=this.layerInsSchCamDep.filter(item=> item.schoolName==this.filterSchool);
              this.schoolFilterId=schoolfilter[0].schoolId;
            }
            this.instituteFilterId=null;
            this.deptFilterId=null;
           this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
            this.layerInst=x;
            this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
             });          
           }   
          if(val=="inst"){

            this.deptGrpId=null;
                if(this.Institutefilter==""){
                  this.instituteFilterId=null;
                }
              else{
                const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName==this.Institutefilter)
                this.instituteFilterId=instfilter[0].instituteId;
              }
              this.deptFilterId=null;
              this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
                this.layerDept=x;
              });
            }
          if(val=="dept"){
                if(this.departmentfilter==""){
                  this.deptFilterId=null;
                }
              else{
                const deptfilter=this.layerInsSchCamDep.filter(item=>item.departmentName==this.departmentfilter)
                this.deptFilterId=deptfilter[0].departmentId;
                
                if(this.deptFilterId==0){
                  this.deptGrpId= deptfilter[0].departmentGroupId;
                }
                else{
                  this.deptGrpId=null;
                }
              }
               this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
               });
             }
            if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){ 
              if(this.locationFilterId==null){
                this.schoolFilterId=null;
                this.filterSchool="";
                this.instituteFilterId=null;
                this.Institutefilter="";
                this.deptFilterId=null;
                this.deptGrpId=null;
                this.departmentfilter="";
              }
            }
            if(this.layerType=='4LType2'||this.layerType=='3LType3'){
                if(this.schoolFilterId==null){
                  this.instituteFilterId=null;
                  this.Institutefilter="";
                  this.deptFilterId=null;
                  this.deptGrpId=null;
                  this.departmentfilter="";
                }
            }
            if(this.layerType=='2LType1'){
              if(this.instituteFilterId==null){
                this.deptFilterId=null;
                this.deptGrpId=null;
                this.departmentfilter="";
              }
            }
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

   reportDownload(){
 
    if(this.locationFilterId==undefined){
      this.locationFilterId=null
    }
    if(this.schoolFilterId==undefined){
      this.schoolFilterId=null
    }
    if(this.instituteFilterId==undefined){
      this.instituteFilterId=null
    }
    if(this.deptFilterId==undefined){
      this.deptFilterId=null
    }
    if(this.tempfromYear!=undefined||this.temptoYear!=undefined){
      if(this.tempfromYear!=undefined){
      const dateString= new Date(this.tempfromYear);
      const year=dateString.getFullYear();
      this.pubyearFrom=year.toString();
      if(this.pubDateMonthFrom!=undefined){
            this.pubrangeFrom=this.pubDateMonthFrom+"-"+this.pubyearFrom;
        }
        else{
          this.pubrangeFrom="00"+"-"+this.pubyearFrom;
        }
      }
      else{
        this.pubrangeFrom=null;
      }
        if(this.temptoYear!=undefined){
        const dateObj=new Date(this.temptoYear);
        const toyear=dateObj.getFullYear();
        this.pubyearTo=toyear.toString();
        if(this.pubDateMonthto!=undefined){
        this.pubrangeTo=this.pubDateMonthto+"-"+this.pubyearTo;
        }
        else{
          this.pubrangeTo="00"+"-"+this.pubyearTo;
        }
      }
      else{
        this.pubrangeTo=null;
      }
    }

    var data={
      reportNumber: this.reportId,
      reportName: this.reportName,
      reportVersion: this.versionNumber,
      reportType: this.reportType,
      universityId: this.user.UniversityId,
      roleId: this.roleId,
      loginUserId: this.user.UserId,
      locationId: this.locationFilterId,
      schoolId: this.schoolFilterId,
      instituteId: this.instituteFilterId,
      departmentId: this.deptFilterId,
      departmentGroupId:this.deptGrpId,
      fromMonthYear: this.pubrangeFrom,
      toMonthYear: this.pubrangeTo,
      sortColumnName: null,
      sortType: null
    }

      if(this.tempfromYear!=undefined||this.temptoYear!=undefined){

            this.excelEnable=true;

            this.gservice.getCoulmnForReport(data).subscribe(x=>{
              this.columnName=x;
                this.gservice.getturnkeyReportList(this.reportName,this.versionNumber).subscribe(y=>{
                  this.columnNameList=y;
                  const data:Report[]=this.columnNameList;
                  const sheetHeaders = this.generateSheetHeaders(data);
                  this.sheetHeaderList=sheetHeaders;
                    console.log(this.sheetHeaderList);            
                    if(sheetHeaders.length){
                    for(let r=0;r<sheetHeaders.length;r++){ 
                      const mapping = sheetHeaders[r].sheetHeader.reduce((acc, curr) => {
                        const key = Object.keys(curr)[0];
                        const value = curr[key];
                        acc[key] = value;
                        return acc;
                      }, {});
                      sheetHeaders[r].sheetHeaderdata=mapping;
                    }
                  }
                
              const result = this.transformData(this.columnName);
              this.reportList=result;
              console.log(this.reportList);
              if(this.reportList.length>0&&this.sheetHeaderList.length>0){
                for(let i=0;i<this.reportList.length;i++){
                  this.removeNullVariables(this.reportList[i].sheetData);
                  for(let k=0;k<this.sheetHeaderList.length;k++){
                  if(this.sheetHeaderList[k].sheetName==this.reportList[i].sheetName){
                    this.reportList[i].reportName=this.sheetHeaderList[k].reportName;
                    const transformedData = this.transformKeys(this.reportList[i].sheetData, this.sheetHeaderList[k].sheetHeaderdata);
                    this.reportList[i].sheetData=transformedData;
                    for(let j=0;j<this.reportList[i].sheetData.length;j++){
                          delete this.reportList[i].sheetData[j].reportId;
                          delete this.reportList[i].sheetData[j].reportName;
                          delete this.reportList[i].sheetData[j].reportSheetName;
                          delete this.reportList[i].sheetData[j].reportSheetNumber;
                          delete this.reportList[i].sheetData[j].reportVersion;
                        }
                      }
                    }
                  } 
                this.exportExcel();    
                }
                else{
                    alert("No Data Found..");
                    this.reports=false;
                    this.excelEnable=false;
                 }
               })
            }) 
         }
      else{
        
        this.excelEnable=true;

        this.gservice.getCoulmnForReport(data).subscribe(x=>{
          this.columnName=x;

            this.gservice.getturnkeyReportList(this.reportName,this.versionNumber).subscribe(y=>{
              this.columnNameList=y;
              const data:Report[]=this.columnNameList;
              
              const sheetHeaders = this.generateSheetHeaders(data);
              this.sheetHeaderList=sheetHeaders;
                console.log(this.sheetHeaderList);            
                if(sheetHeaders.length){
                for(let r=0;r<sheetHeaders.length;r++){ 
                  const mapping = sheetHeaders[r].sheetHeader.reduce((acc, curr) => {
                    const key = Object.keys(curr)[0];
                    const value = curr[key];
                    acc[key] = value;
                    return acc;
                  }, {});
                  sheetHeaders[r].sheetHeaderdata=mapping;
                }
              }
            
          const result = this.transformData(this.columnName);
          this.reportList=result;
          console.log(this.reportList);
          if(this.reportList.length>0&&this.sheetHeaderList.length>0){
            for(let i=0;i<this.reportList.length;i++){
              this.removeNullVariables(this.reportList[i].sheetData);
              for(let k=0;k<this.sheetHeaderList.length;k++){
              if(this.sheetHeaderList[k].sheetName==this.reportList[i].sheetName){
                this.reportList[i].reportName=this.sheetHeaderList[k].reportName;
                const transformedData = this.transformKeys(this.reportList[i].sheetData, this.sheetHeaderList[k].sheetHeaderdata);
                this.reportList[i].sheetData=transformedData;
                this.reportList[i].columnWidth = this.sheetHeaderList[k].columnWidth;
                this.reportList[i].columnStyle = this.sheetHeaderList[k].columnStyle;
                console.log(transformedData);
                
                for(let j=0;j<this.reportList[i].sheetData.length;j++){
                      delete this.reportList[i].sheetData[j].reportId;
                      delete this.reportList[i].sheetData[j].reportName;
                      delete this.reportList[i].sheetData[j].reportSheetName;
                      delete this.reportList[i].sheetData[j].reportSheetNumber;
                      delete this.reportList[i].sheetData[j].reportVersion;
                     }
                   }
                 }
               } 
              this.exportExcel();    
            }
            else{
                alert("No Data Found..");
                this.reports=false;
                this.excelEnable=false;
            }
          })
        }) 
      }
    
    }

   transformData(input: Publications[]): SheetData[] {
    const output: { [key: string]: SheetData } = {};
    input.forEach(item => {
      if (!output[item.reportSheetName]) {
        output[item.reportSheetName] = {
          sheetName: item.reportSheetName,
          sheetData: []
        };
      }
      output[item.reportSheetName].sheetData.push(item);
    });
    return Object.values(output);
  }
  
  exportExcel(){
    this.excel.exportAsExcelMutipleSheetFile(this.reportList, this.reportName);
    this.excelEnable = false;
    this.reports=false;
  }

  removeNullVariables(data: DataItem[]): DataItem[] {
    if (data.length === 0) return data;
    const nullKeys: Set<string> = new Set();
    Object.keys(data[0]).forEach(key => nullKeys.add(key));
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (item[key] !== null) {
          nullKeys.delete(key);
        }
      });
    });
    return data.map(item => {
      nullKeys.forEach(key => {
        delete item[key];
      });
      return item;
    });
  }

  generateSheetHeaders(data: Report[]): SheetHeader[] {
    const sheetHeadersMap: { [key: string]: { [key: string]: string }[] } = {};
    const sheetTitlesMap: { [key: string]: string } = {};
    const sheetColumnWidthsMap: { [key: string]: Record<string, number> } = {};
    const sheetColumnStyleMap: { [key: string]: Record<string, string> } = {};
    data.forEach(report => {
          if (!sheetHeadersMap[report.reportSheetName]) {
            sheetHeadersMap[report.reportSheetName] = [];
            sheetTitlesMap[report.reportSheetName] = report.reportSheetTitle;
            sheetColumnWidthsMap[report.reportSheetName] = {};
            sheetColumnStyleMap[report.reportSheetName]={};
          }
          sheetHeadersMap[report.reportSheetName].push({ [(report.reportColumnName)]: report.reportDisplayColumnName });
          sheetColumnWidthsMap[report.reportSheetName][report.reportDisplayColumnName] = report.columnWidth ? parseInt(report.columnWidth, 10) : 20;
         
          try {
            let styleStr = report.cellStyle?.trim();
          
            if (styleStr) {
              // Ensure opening & closing braces
              if (!styleStr.startsWith("{")) styleStr = "{" + styleStr;
              if (!styleStr.endsWith("}")) styleStr += "}";
          
              // Count opening vs closing braces and balance if needed
              const openCount = (styleStr.match(/{/g) || []).length;
              const closeCount = (styleStr.match(/}/g) || []).length;
              if (closeCount < openCount) {
                styleStr += "}".repeat(openCount - closeCount);
              }
          
              // Convert to proper JSON by quoting keys
              styleStr = styleStr.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
          
              const styleObj = JSON.parse(styleStr);
              sheetColumnStyleMap[report.reportSheetName][report.reportDisplayColumnName] = styleObj;
            } else {
              // sheetColumnStyleMap[report.reportSheetName][report.reportDisplayColumnName] = {};
            }
          } catch (error) {
            console.error(
              `Failed to parse cellStyle for ${report.reportSheetName} - ${report.reportDisplayColumnName}`,
              report.cellStyle,
              error
            );
            // sheetColumnStyleMap[report.reportSheetName][report.reportDisplayColumnName] = {};
          }
          

           });

        return Object.keys(sheetHeadersMap).map(sheetName => ({
          sheetName,
          sheetHeader: sheetHeadersMap[sheetName],
          sheetHeaderdata:"",
          reportName:sheetTitlesMap[sheetName],
          columnWidth: sheetColumnWidthsMap[sheetName],
          columnStyle: sheetColumnStyleMap[sheetName]
        }));
  }

  toCamelCase(str: string): string {
    return str.replace(/([A-Z])/g, (match) => match.toLowerCase());
  }

  transformKeys = (data: Publications[], mapping: { [key: string]: string }): any[] => {
    return data.map(item => {
      const transformedItem: any = {};
      for (const key in item) {
        if (item.hasOwnProperty(key) && mapping.hasOwnProperty(key)) {
          transformedItem[mapping[key]] = item[key];
        }
      }
      return transformedItem;
    });
  }


}
