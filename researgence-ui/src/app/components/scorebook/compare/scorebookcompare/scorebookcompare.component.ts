import { FacultiesService } from './../../../faculties/faculties.service';
import { filter } from 'rxjs/operators';
import { AuthService } from './../../../../shared/services/firebase/auth.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { ScorebookService } from '../../scorebook.service';
import { TextOptionsLight, jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { GeneralApiService } from 'src/app/components/general-api.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import {ScorebookData} from '../scorebookcompare/scorebook-data'
@Component({
  selector: '',
  templateUrl: './scorebookcompare.component.html',
  styleUrls:['./scorebookcompare.component.scss','../../../../../assets/given/newcss/style.css', '../../../../../assets/given/selected.css']

})
export class ScorebookcompareComponent implements OnInit {

  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  stickyEnable:any;
  isScrolled:any;
  Name:string;
  roleName:any;
  role:any;
  Allselect:boolean=false;
  filterdata:boolean=false;
  filtervalue:any;
  data: ScorebookData = new ScorebookData();
  userdetail:any;
  layerType:string;
  isDesc: boolean = false;
  value:any;
  scorebookSection: String;
  filteredValue: any;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  date: { year: number; month: number };
  currentSortColumn: string;
  currentSortDirection: string;
  facultiesListdata: any;
  userRole:any;
  departmentfilter: String;
  Institutefilter: String;
  Campusfiter: String;
  isMenuOpen: boolean;
  page :number = 1; 
  Mpage: number = 1;
  pageSize :number= 20; 
  pageSizes: any[] = ["10","15","20","100"]; 
  totalpages:number;
  collectionSize:number=0;
  McollectionSize:number=0; 
  download:number=0;
  startRow:number=0;
  endRow:number=20;
  dynamicpage:any;
  dynamicpages:any;
  Scorebookdata: any[] = [];
  scorebookXlData:any;
  tableHeaders: string[];
  lensub: number;
  campus: any;
  loading = true;
  errorMessage = '';
  uniqlocattion: any;
  user: any;
  roleId: any;
  instituteDrop: any;
  instituteDropId: any;
  departmentFilter: any;
  Schoolfilter:any;
  schoolDropId:any;
  departmentDropId: any;
  dropDown: any;
  locationDrop: any;
  locationDropId: any;
  marginBottom:any;
  marginBottomForTenthColumn:any;
  num: number=0;
  filtercondition: any;
  uniqinstitute: any;
  fromMonthYear: any;
  toMonthYear: any;
  currentYear = new Date().getFullYear();
  maxDate: Date = new Date(this.currentYear,11,31);
  layerCampus:any;
  layerSchool:any;
  layerInst:any;
  layerDept:any;
  layerInsSchCamDep:any;
  deptGrpId:number| null = null;

  constructor(
    private service: ScorebookService,private facService:FacultiesService,
    private route: ActivatedRoute,private search: CommonsearchService,
    private router:Router,private menuService: MenuService,
    private excel: ExcelExportService,private authservice:AuthService,private gservice:GeneralApiService
  ) { }

      ngOnInit() {
           //for accessing menuopen 
           this.menuService.isMenuOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
          });

        this.userRole=this.authservice.getProfileObs();
        this.userdetail=this.authservice.getUserDetail();

        this.layerType=this.userdetail.LayerType;
        this.Name = this.userdetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        //For rolename getting
        this.authservice.RoleSelection(this.userdetail.UniversityId, this.userdetail.UserId).subscribe(x => {
          this.role = x;
          const data = this.role.filter(item => item.roleId == this.userRole);
          this.roleName = data[0].roleName;
          console.log(this.roleName)
        })

        this.route.paramMap.subscribe((x: any) => {
          this.scorebookSection = x.get("compare");
        });

        this.setpublication();
        this.setExcelData();

      // For SearchBox filter
      this.search.getSearchQuery().subscribe((query) => {
        if (query === '') {
          this.setpublication();
        } else {
          if (this.Scorebookdata) {
            this.Scorebookdata = this.dynamicpages.filter((item) => {
              const locationval = item.location && item.location.toLowerCase().includes(query.toLowerCase());
              const departmentval = item.department && item.department.toLowerCase().includes(query.toLowerCase());
              const instituteval = item.institute && item.institute.toLowerCase().includes(query.toLowerCase());
              const universityval = item.university && item.university.toLowerCase().includes(query.toLowerCase());
      
              return locationval || departmentval || instituteval || universityval;
            });
          }
        }
      });

      this.facService.getUnivLocSchInstDept(this.userdetail.UniversityId,this.userRole,this.userdetail.UserId,this.locationDropId,this.schoolDropId,this.instituteDropId,this.departmentDropId).subscribe(x=>{
        this.campus=x;
        console.log(x);  
        if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
          this.layerInsSchCamDep=this.campus;
          this.layerCampus=Array.from(new Set(this.campus.map((item : any)=>item.locationName)))
        }
        else if(this.layerType=='4LType2'||this.layerType=='3LType3'){
          this.layerInsSchCamDep=this.campus;
          this.layerSchool=Array.from(new Set(this.campus.map((item : any)=>item.schoolName)))
        }
        else if(this.layerType=='2LType1'){
          this.layerInsSchCamDep=this.campus;
          this.layerInst=Array.from(new Set(this.campus.map((item : any)=>item.instituteName)))
        }
        else if(this.layerType=='2LType2'){
          this.layerInsSchCamDep=this.campus;
          this.layerDept=this.campus;
        }      
      })

      }

      changes(data) {
        const date = new Date(data.year, data.month, data.day);
        const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        const result = { date: formattedDate };
        console.log(result);
      }

      setpublication() {
        
        if (this.scorebookSection == "Publications") {  
          this.user=this.authservice.getUserDetail();
          console.log(this.user);
          this.roleId=this.authservice.getProfileObs();
          console.log(this.roleId);
  
            this.data.universityId = this.user.UniversityId;
            this.data.roleId = this.roleId;
            this.data.loginUserId = this.user.UserId;
            this.data.startRow = this.startRow;
            this.data.endRow = this.endRow;
            this.data.download = 0;
            this.data.filter = 0;
  
          this.service.ScorebookPublicationcompares(this.data).subscribe(
            x=> {
              this.value = x;
              console.log(x);     
              this.Scorebookdata = this.value.dataList; 
              this.dynamicpages = this.value.dataList; 
              this.dynamicpages = this.value.dataList;
              this.McollectionSize = this.value.totalRowCount;

              if(this.McollectionSize==0){
                this.num=0;
               }
               else{
                this.num=1;
               }
              console.log(this.McollectionSize);          
             // Calculate the total number of pages based on the collection size and page size
             this.totalpages = Math.ceil(this.McollectionSize / this.pageSize);

             // Adjust Mpage to prevent it from exceeding totalpages
             this.Mpage = Math.max(1, Math.min(this.Mpage, this.totalpages));

            // Calculate the actual startRow and endRow based on Mpage and pageSize
             this.startRow = (this.Mpage-1) * this.pageSize;
            this.endRow = Math.min(this.startRow + this.pageSize, this.McollectionSize);
             //this.endRow = Math.min(this.startRow * this.pageSize, this.McollectionSize);
             console.log(this.endRow);
              this.page = this.Mpage;
              console.log(this.page);
            },
            (error) => {
              this.errorMessage = error;
              this.loading = false;
            }
          );
        }
      
      }

      shortlisttable(val) {

        this.filtercondition=val;          
    
          if(val=="from"||val=="to"){
            if(this.fromMonthYear==null||this.fromMonthYear==undefined){
              this.fromMonthYear=null;
            }
            if(this.toMonthYear==null||this.toMonthYear==undefined){
              this.toMonthYear=null;
            }  
            console.log(this.fromMonthYear);    
          }  

          if(val=="loc"){

            this.deptGrpId=null;
            if(this.Campusfiter==""){
              this.locationDropId=null;
             }
            else{
              const filterLoc=this.layerInsSchCamDep.filter(item => item.locationName==this.Campusfiter);
              this.locationDropId=filterLoc[0].locationId;
            }
  
            this.schoolDropId=null;
            this.instituteDropId=null;
            this.departmentDropId=null;

            this.facService.getUnivLocSchInstDept(this.userdetail.UniversityId,this.userRole,this.userdetail.UserId,this.locationDropId,this.schoolDropId,this.instituteDropId,this.departmentDropId).subscribe(x=>{
              console.log(x);
              if(this.layerType=="3LType1"){
              this.layerInst=x;
              this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
              }
              else if(this.layerType=="3LType2"){
                  this.layerDept=x;
              }
              else if(this.layerType=="4LType2"||this.layerType=="3LType3"||this.layerType=="4LType1"){
              this.layerSchool=x;
              this.layerSchool=Array.from(new Set(this.layerSchool.map((item : any)=>item.schoolName)))
            }
            });
  
            }
  
            if(val=="scl"){
  
              this.deptGrpId=null;
              if(this.Schoolfilter==""){
                this.schoolDropId=null;
              }
              else{
                 const schoolfilter=this.layerInsSchCamDep.filter(item=> item.schoolName==this.Schoolfilter);
                 this.schoolDropId=schoolfilter[0].schoolId;
              }
              this.instituteDropId=null;
              this.departmentDropId=null;

             this.facService.getUnivLocSchInstDept(this.userdetail.UniversityId,this.userRole,this.userdetail.UserId,this.locationDropId,this.schoolDropId,this.instituteDropId,this.departmentDropId).subscribe(x=>{
              this.layerInst=x;
              this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
              
            });          
        }   
  
            if(val=="inst"){
  
              this.deptGrpId=null;
                  if(this.Institutefilter==""){
                    this.instituteDropId=null;
                  }
                else{         
                  const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName==this.Institutefilter)
                  this.instituteDropId=instfilter[0].instituteId;
                }
                this.departmentDropId=null;
                this.facService.getUnivLocSchInstDept(this.userdetail.UniversityId,this.userRole,this.userdetail.UserId,this.locationDropId,this.schoolDropId,this.instituteDropId,this.departmentDropId).subscribe(x=>{
                  console.log(x);
                  this.layerDept=x;
                });
  
            }
  
            if(val=="dept"){
                  if(this.departmentfilter==""){
                    this.departmentDropId=null;
                  }
                else{
                  const deptfilter=this.layerInsSchCamDep.filter(item=>item.departmentName==this.departmentfilter)
                  this.departmentDropId=deptfilter[0].departmentId;

                  if(this.departmentDropId==0){
                    this.deptGrpId= deptfilter[0].departmentGroupId;
                  }
                  else{
                    this.deptGrpId=null;
                  }

                }

                this.facService.getUnivLocSchInstDept(this.userdetail.UniversityId,this.userRole,this.userdetail.UserId,this.locationDropId,this.schoolDropId,this.instituteDropId,this.departmentDropId).subscribe(x=>{
                  console.log(x);
                });
                
              }
              if(this.Campusfiter==""&&this.Schoolfilter==""&&this.Institutefilter==""&&this.departmentfilter==""){
                this.data.filter = 0;
              }
              else{
                this.data.filter = 1;
              }

              if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){ 
                if(this.locationDropId==null){
                  this.schoolDropId=null;
                  this.Schoolfilter="";
                  this.instituteDropId=null;
                  this.Institutefilter="";
                  this.departmentDropId=null;
                  this.deptGrpId=null;
                  this.departmentfilter="";
                  this.data.filter = 0;
                }
              }

              if(this.layerType=='4LType2'||this.layerType=='3LType3'){
                  if(this.schoolDropId==null){
                    this.instituteDropId=null;
                    this.Institutefilter="";
                    this.departmentDropId=null;
                    this.deptGrpId=null;
                    this.departmentfilter="";
                    this.data.filter = 0;
                  }
              }

              if(this.layerType=='2LType1'){
                if(this.instituteDropId==null){
                  this.departmentDropId=null;
                  this.deptGrpId=null;
                  this.departmentfilter="";
                  this.data.filter = 0;
                }
              }

          this.data.universityId = this.userdetail.UniversityId;
          this.data.roleId = this.userRole;
          this.data.loginUserId = this.userdetail.UserId;
          this.data.locationId= this.locationDropId;
          this.data.schoolId=this.schoolDropId;
          this.data.instituteId= this.instituteDropId;
          this.data.departmentId= this.departmentDropId;
          this.data.departmentGroupId= this.deptGrpId;
          this.data.fromMonthYear= this.fromMonthYear;
          this.data.toMonthYear= this.toMonthYear;
          // Set other properties accordingly...   
          this.data.startRow = this.startRow;
          if(this.startRow==0){
            this.data.endRow = this.pageSize;
           }
           else{
            this.data.endRow = this.pageSize;
           }
          // this.data.endRow = this.endRow;
          this.data.download = 0;

          this.service.ScorebookPublicationcompares(this.data).subscribe(
            x => {
            this.value = x;
            this.Scorebookdata = this.value.dataList;
            console.log(x);

            this.McollectionSize = this.value.totalRowCount;
              console.log(this.McollectionSize);

              if(this.McollectionSize==0){
                this.num=0;
               }
               else{
                this.num=1;
               }
              
             // Calculate the total number of pages based on the collection size and page size
             this.totalpages = Math.ceil(this.McollectionSize / this.pageSize);

             // Adjust Mpage to prevent it from exceeding totalpages
             this.Mpage = Math.max(1, Math.min(this.Mpage, this.totalpages));

            // Calculate the actual startRow and endRow based on Mpage and pageSize
             this.startRow = (this.Mpage-1) * this.pageSize;
            // this.endRow = Math.min(this.startRow * this.pageSize, this.McollectionSize);
             this.endRow = Math.min(this.startRow + this.pageSize, this.McollectionSize);
             console.log(this.endRow);
              this.page = this.Mpage;
              console.log(this.page);
              this.setExcelData();       
          }
        );
     
      }

      sort(columnName: string) {
        if (this.currentSortColumn === columnName) {
          this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.currentSortDirection = 'asc';
        }
        this.currentSortColumn = columnName;
        this.Scorebookdata.sort((a, b) => {
          if (a[columnName] < b[columnName]) {
            return this.currentSortDirection === 'asc' ? -1 : 1;
          } else if (a[columnName] > b[columnName]) {
            return this.currentSortDirection === 'asc' ? 1 : -1;
          } else {
            return 0;
          }
        });
        
      }

      //SearchBox
      searchQuery = "";
      searchBar() {
        this.search.setSearchQuery(this.searchQuery);
      }

      //Filter for ascending &descending
      changesOrder(values) {
        console.log(values);
        if (values == "Ascending") {
          this.Scorebookdata.sort((a, b) =>
            a.institute > b.institute ? 1 : b.institute > a.institute ? -1 : 0
          );
        }
        if (values == "Descending") {
          this.Scorebookdata.sort((a, b) =>
            a.institute < b.institute ? 1 : b.institute < a.institute ? -1 : 0
          );
        }
      }
      
      onPageSizeChange(size: string){
        this.page = 1; 
        this.pageSize = Number(size);
        this.endRow=this.pageSize+this.startRow;
        if (this.departmentfilter === ""||this.Schoolfilter==="" || this.Institutefilter === "" || this.Campusfiter === ""|| this.fromMonthYear===""||this.toMonthYear===""){
        this.setpublication();
        }
        else{
          this.shortlisttable(this.filtercondition)
        }
      }
    
      onPageChange(page: number) {

        this.Mpage = Math.max(1, Math.min(page, this.totalpages)); 
        
        if (this.Mpage == 1) {
          this.startRow = 0;
        } else {
          this.startRow = (this.Mpage - 1) * this.pageSize; // Calculate the start row based on the page number
        }
        // Calculate endRow using Math.min to ensure it doesn't exceed McollectionSize
        this.endRow = Math.min(this.startRow + this.pageSize, this.McollectionSize);
      
        if(this.filterdata==false){
          this.setpublication();
          // this.filterdata=true;
        }
        else{
          this.shortlisttable(this.filtercondition)
        }
        
      }

      onSelectDept(val){
        this.campus=this.campus.filter(t=> t.instituteName==val);
        console.log(this.campus);
             
      }

      exportExcel() {
        this.setExcelData();
        let str = JSON.stringify(this.scorebookXlData);
        str = str.replace(/\"rowNumber\":/g, "\"SL.NO\":");
        str = str.replace(/\"totalPubCount\":/g, "\"TOTAL PUBLICATIONS\":");
        str = str.replace(/\"scopusPubCount\":/g, "\"SCOPUS\":");
        str = str.replace(/\"wosPubCount\":/g, "\"WEB OF SCIENCE\":");
        str = str.replace(/\"sciPubCount\":/g, "\"SCIENCE CITATION INDEX\":");
        str = str.replace(/\"pubmedPubCount\":/g, "\"PUBMED\":");
        str = str.replace(/\"ugcCarePubCount\":/g, "\"UGC CARE\":");
        str = str.replace(/\"ugcCareGroup1PubCount\":/g, "\"UGC CARE GROUP 1\":");
        str = str.replace(/\"abdcPubCount\":/g, "\"ABDC\":");
        str = str.replace(/\"university\":/g, "\"UNIVERSITY\":");
        if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
          str = str.replace(/\"location\":/g, "\"LOCATION\":");
        }
        if(this.layerType=='4LType1'||this.layerType=='4LType2'){
          str = str.replace(/\"school\":/g, "\"SCHOOL\":");
        }
        if(this.layerType=='2LType1'||this.layerType=='3LType1'||this.layerType=='3LType3'||this.layerType=='4LType1'||this.layerType=='4LType2'){
          str = str.replace(/\"institute\":/g, "\"NAME OF INSTITUTE\":");
        }
        if(this.layerType=='2LType1'||this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='3LType3'||this.layerType=='2LType2'||this.layerType=='4LType1'||this.layerType=='4LType2'){
          str = str.replace(/\"department\":/g, "\"NAME OF DEPARTMENT\":");
        }

        this.scorebookXlData = JSON.parse(str);
        this.scorebookXlData.forEach((x) => {
          delete x.$$index; 
        });

        this.excel.exportAsExcelFile(this.scorebookXlData, "Scorebook");
       
      }

      // data for excel
         setExcelData() {
        if (this.scorebookSection == "Publications") {

          this.user=this.authservice.getUserDetail();
          console.log(this.user);
          this.roleId=this.authservice.getProfileObs();
          console.log(this.roleId);
  
            this.data.universityId = this.user.UniversityId;
            this.data.roleId = this.roleId;
            this.data.loginUserId = this.user.UserId;
            this.data.startRow = this.startRow;

            if(this.locationDropId!=null||this.instituteDropId!=null||this.departmentDropId!=null||this.schoolDropId!=null){
              this.data.download = 0;
              this.data.filter = 1;
              this.data.endRow = this.value.totalRowCount;
            }
          else{
              this.data.download = 1;
              this.data.filter = 0;
              this.data.endRow = this.endRow;
            }

        console.log(this.data);
  
          this.service.ScorebookPublicationcompares(this.data).subscribe(
            (x:any) => {
            this.Scorebookdata = x;             
            this.dynamicpages = x.dataList;
            this.scorebookXlData = this.dynamicpages;
                   
          },
          (error) => {
            const errorUrl = this.router.createUrlTree(['/apierror/error/handle'], { queryParams: { message: error.message } }).toString();
            const newWindow = window.open(errorUrl, '_blank');
            newWindow.document.title = "Error Handling";
          }
          );
        }
      }
 
      generatePDF(): void {
        const universityId = this.userdetail.UniversityId;
        const roleId = this.userRole;
        const loginUserId = this.userdetail.UserId;
        const startrow = this.startRow;
        const endrow = 0;
        const download = 1;

        this.user=this.authservice.getUserDetail();
        console.log(this.user);
        this.roleId=this.authservice.getProfileObs();
        console.log(this.roleId);

          this.data.universityId = this.user.UniversityId;
          this.data.roleId = this.roleId;
          this.data.loginUserId = this.user.UserId;
          this.data.startRow = this.startRow;

          if(this.locationDropId!=null||this.instituteDropId!=null||this.departmentDropId!=null||this.schoolDropId!=null){
            this.data.download = 0;
            this.data.filter = 1;
            this.data.endRow = this.value.totalRowCount;
          }
        else{
            this.data.download = 1;
            this.data.filter = 0;
            this.data.endRow = this.endRow;
          }

        console.log( this.data);

        this.service.ScorebookPublicationcompares(this.data).subscribe(
          (response: any) => {
            const data = response?.dataList || [];
        
            let headers: string[] = [];
            let columnsMap: any = {};
        
             if(this.layerType=="3LType2") {
              headers = ['SL.NO', 'TOTAL  PUB', 'SCOPUS', 'WEB OF SCIENCE', 'SCIENCE CITATION INDEX', 'PUBMED', 'UGC  CARE', 'UGC  CARE GROUP1', 'ABDC', 'UNIVERSITY', 'LOCATION', 'DEPARTMENT'];
              columnsMap = {
                'SL.NO': 'rowNumber',
                'TOTAL  PUB': 'totalPubCount',
                'SCOPUS': 'scopusPubCount',
                'WEB OF SCIENCE': 'wosPubCount',
                'SCIENCE CITATION INDEX': 'sciPubCount',
                'PUBMED': 'pubmedPubCount',
                'UGC  CARE': 'ugcCarePubCount',
                'UGC  CARE GROUP1': 'ugcCareGroup1PubCount',
                'ABDC': 'abdcPubCount',
                'UNIVERSITY': 'university',
                'LOCATION': 'location',
                'DEPARTMENT': 'department'
              };
            }   
            else if(this.layerType=="2LType1")
            {
              headers = ['SL.NO','TOTAL  PUB', 'SCOPUS', 'WEB OF SCIENCE', 'SCIENCE CITATION INDEX', 'PUBMED', 'UGC  CARE', 'UGC  CARE GROUP1', 'ABDC', 'UNIVERSITY', 'INSTITUTE', 'DEPARTMENT'];
              columnsMap = {
                'SL.NO': 'rowNumber',
                'TOTAL  PUB': 'totalPubCount',
                'SCOPUS': 'scopusPubCount',
                'WEB OF SCIENCE': 'wosPubCount',
                'SCIENCE CITATION INDEX': 'sciPubCount',
                'PUBMED': 'pubmedPubCount',
                'UGC  CARE': 'ugcCarePubCount',
                'UGC  CARE GROUP1': 'ugcCareGroup1PubCount',
                'ABDC': 'abdcPubCount',
                'UNIVERSITY': 'university',
                'INSTITUTE': 'institute',
                'DEPARTMENT': 'department',
              
              };
            } 
            else if(this.layerType=="2LType2")
            {
              headers = ['SL.NO',  'TOTAL  PUB', 'SCOPUS', 'WEB OF SCIENCE', 'SCIENCE CITATION INDEX', 'PUBMED', 'UGC  CARE', 'UGC  CARE GROUP1', 'ABDC','UNIVERSITY', 'DEPARTMENT'];
              columnsMap = {
                'SL.NO': 'rowNumber',
                'TOTAL  PUB': 'totalPubCount',
                'SCOPUS': 'scopusPubCount',
                'WEB OF SCIENCE': 'wosPubCount',
                'SCIENCE CITATION INDEX': 'sciPubCount',
                'PUBMED': 'pubmedPubCount',
                'UGC  CARE': 'ugcCarePubCount',
                'UGC  CARE GROUP1': 'ugcCareGroup1PubCount',
                'ABDC': 'abdcPubCount',
                'UNIVERSITY': 'university',
                'DEPARTMENT': 'department'
               
              };
            } 
            else if(this.layerType=="3LType1"){
              headers = ['SL.NO',  'TOTAL  PUB', 'SCOPUS', 'WEB OF SCIENCE', 'SCIENCE CITATION INDEX', 'PUBMED', 'UGC  CARE', 'UGC  CARE GROUP1', 'ABDC','UNIVERSITY', 'LOCATION', 'INSTITUTE', 'DEPARTMENT', ];
              columnsMap = {
                'SL.NO': 'rowNumber',
                'TOTAL  PUB': 'totalPubCount',
                'SCOPUS': 'scopusPubCount',
                'WEB OF SCIENCE': 'wosPubCount',
                'SCIENCE CITATION INDEX': 'sciPubCount',
                'PUBMED': 'pubmedPubCount',
                'UGC  CARE': 'ugcCarePubCount',
                'UGC  CARE GROUP1': 'ugcCareGroup1PubCount',
                'ABDC': 'abdcPubCount',
                'UNIVERSITY': 'university',
                'LOCATION': 'location',
                'INSTITUTE': 'institute',
                'DEPARTMENT': 'department',
               
              };
            }
            else if(this.layerType=="3LType3"||this.layerType=="4LType2"){
              headers = ['SL.NO',  'TOTAL  PUB', 'SCOPUS', 'WEB OF SCIENCE', 'SCIENCE CITATION INDEX', 'PUBMED', 'UGC  CARE', 'UGC  CARE GROUP1', 'ABDC','UNIVERSITY', 'SCHOOL', 'INSTITUTE', 'DEPARTMENT',];
              columnsMap = {
                'SL.NO': 'rowNumber',
                'TOTAL  PUB': 'totalPubCount',
                'SCOPUS': 'scopusPubCount',
                'WEB OF SCIENCE': 'wosPubCount',
                'SCIENCE CITATION INDEX': 'sciPubCount',
                'PUBMED': 'pubmedPubCount',
                'UGC  CARE': 'ugcCarePubCount',
                'UGC  CARE GROUP1': 'ugcCareGroup1PubCount',
                'ABDC': 'abdcPubCount',
                'UNIVERSITY': 'university',
                'SCHOOL': 'school',
                'INSTITUTE': 'institute',
                'DEPARTMENT': 'department',
               
              };
            }
            else {
              headers = ['SL.NO', 'TOTAL  PUB', 'SCOPUS', 'WEB OF SCIENCE', 'SCIENCE CITATION INDEX', 'PUBMED', 'UGC  CARE', 'UGC  CARE GROUP1', 'ABDC','UNIVERSITY', 'LOCATION','SCHOOL' , 'INSTITUTE', 'DEPARTMENT', ];
              columnsMap = {
                'SL.NO': 'rowNumber',
                'TOTAL  PUB': 'totalPubCount',
                'SCOPUS': 'scopusPubCount',
                'WEB OF SCIENCE': 'wosPubCount',
                'SCIENCE CITATION INDEX': 'sciPubCount',
                'PUBMED': 'pubmedPubCount',
                'UGC  CARE': 'ugcCarePubCount',
                'UGC  CARE GROUP1': 'ugcCareGroup1PubCount',
                'ABDC': 'abdcPubCount',
                'UNIVERSITY': 'university',
                'LOCATION': 'location',
                'SCHOOL': 'school',
                'INSTITUTE': 'institute',
                'DEPARTMENT': 'department',
              };
            }
        
            const mappedData = data.map(obj => {
              const updatedObj: any = {};
              for (const header of headers) {
                const columnName = columnsMap[header];
                updatedObj[header] = obj[columnName];
              }
              return updatedObj;
            });
        
            this.generatePdf(mappedData);
          }
        );
      }
      
        async generatePdf(records: any[]) {
      const doc = new jsPDF('landscape', 'pt', 'a4');
      let pageIndex = 1;
      let recordIndex = 0;
      const recordsPerPage = 7;
      
  // Define the table headers based on the layerType
        let tableHeaders: string[] = [];
        if(this.layerType=="3LType2")
        {
          tableHeaders = ['SL.NO','TOTAL  PUB', 'SCOPUS', 'WEB OF SCIENCE', 'SCIENCE CITATION INDEX', 'PUBMED', 'UGC  CARE', 'UGC  CARE GROUP1', 'ABDC' , 'UNIVERSITY', 'LOCATION', 'DEPARTMENT' ];
        } 
        else if(this.layerType=="2LType1")
        {
          tableHeaders = ['SL.NO', 'TOTAL  PUB', 'SCOPUS', 'WEB OF SCIENCE', 'SCIENCE CITATION INDEX', 'PUBMED', 'UGC  CARE', 'UGC  CARE GROUP1', 'ABDC','UNIVERSITY', 'INSTITUTE', 'DEPARTMENT'];
        } 
        else if(this.layerType=="2LType2")
        {
          tableHeaders = ['SL.NO', 'TOTAL  PUB','SCOPUS', 'WEB OF SCIENCE', 'SCIENCE CITATION INDEX', 'PUBMED', 'UGC  CARE', 'UGC  CARE GROUP1', 'ABDC','UNIVERSITY', 'DEPARTMENT'];
        }
        else if(this.layerType=="3LType1")
        {
        tableHeaders = ['SL.NO', 'TOTAL  PUB', 'SCOPUS', 'WEB OF SCIENCE', 'SCIENCE CITATION INDEX', 'PUBMED', 'UGC  CARE', 'UGC  CARE GROUP1', 'ABDC','UNIVERSITY', 'LOCATION', 'INSTITUTE', 'DEPARTMENT'];
        }
        else if(this.layerType=="3LType3"||this.layerType=="4LType2")
        {
          tableHeaders = ['SL.NO', 'TOTAL  PUB', 'SCOPUS', 'WEB OF SCIENCE', 'SCIENCE CITATION INDEX', 'PUBMED', 'UGC  CARE', 'UGC  CARE GROUP1', 'ABDC','UNIVERSITY', 'SCHOOL', 'INSTITUTE', 'DEPARTMENT',];
        }
        else {
          tableHeaders = ['SL.NO',  'TOTAL  PUB', 'SCOPUS', 'WEB OF SCIENCE', 'SCIENCE CITATION INDEX', 'PUBMED', 'UGC  CARE', 'UGC  CARE GROUP1', 'ABDC','UNIVERSITY', 'LOCATION', 'SCHOOL', 'INSTITUTE', 'DEPARTMENT'];
        }

  const wrappedTableHeaders = tableHeaders.map(header => {
    const maxLength = 20; 
    if (header.length > maxLength) {
      return header.match(new RegExp(`.{1,${maxLength}}`, 'g')).join('\n');
    }
    return header;
  });

  const columnCount = tableHeaders.length;

  // Calculate cell width based on page width S 
  const cellWidth = doc.internal.pageSize.getWidth() / columnCount;

  const headingText = 'SCOREBOOK COMPARE - PUBLICATIONS';
  const headingFontSize = 16;
  const headingMarginTop = 25;
  doc.text(headingText, doc.internal.pageSize.getWidth() / 2, headingMarginTop, { align: 'center' });

  while (recordIndex < records.length) {
    const recordsOnPage = records.slice(recordIndex, recordIndex + recordsPerPage);
    doc.setFontSize(headingFontSize);
    doc.setFontSize(12);
    doc.text(`${pageIndex}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    
    this.generateTable(doc, recordsOnPage, tableHeaders, 0, 10, columnCount, cellWidth);
    this.generateTableheaders(doc, tableHeaders, 0, 10, columnCount, cellWidth);

    if (pageIndex !== Math.ceil(records.length / recordsPerPage)) {
      doc.addPage();
    }

    pageIndex++;
    recordIndex += recordsPerPage;
  }

  doc.save('SCOREBOOK.pdf');
}

private generateTableheaders(doc: any, headers: string[], startX: number, startY: number, columnCount: number, cellWidth: number): void {
  const tableHeight = 60;
  const cellHeight = 100;
  const minimumFontSize = 8;
  const marginTop = 40;
  const leftMargin = 35; // Adjust the left margin as needed

  if(this.layerType=="3LType1"){
   this.marginBottomForTenthColumn = -7; // Adjust the bottom margin for the 10th column name
}
  if(this.layerType=="2LType1" ){
   this.marginBottom = -7; // Adjust the bottom margin for the last column name
   }


  doc.setLineWidth(0.5);
  doc.setFont('helvetica', 'bold');
  doc.rect(startX, startY + marginTop, columnCount * cellWidth, tableHeight, 'S');
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');

  headers.forEach((header, index) => {
    doc.setFontSize(8);
    doc.setFillColor(65, 65, 65);
    doc.setTextColor(255, 255, 255);
    const cellX = startX + index * cellWidth;
    const cellY = startY + marginTop;
    doc.rect(cellX, cellY, cellWidth, tableHeight, 'FD');
    const lines = this.wordWrap(header, cellWidth - 4, 10);
    const lineHeight = 12;
    const headerLinesCount = lines.length;
    const headerLinesHeight = lineHeight * headerLinesCount;
    let headerContentStartY = cellY + (tableHeight - headerLinesHeight) / 2;

    if(this.layerType=="2LType1" ){

    // Adjust the positioning for the last column name
    if (index === headers.length - 1) {
      headerContentStartY += this.marginBottom;
    }
  }

  if(this.layerType=="3LType1"){
    // Adjust the positioning for the 10th column name
    if (index === 9) {
      headerContentStartY += this.marginBottomForTenthColumn;
    }
  }

    lines.forEach((line, lineIndex) => {
      const textX = cellX + 2 + leftMargin; // Adding left margin
      const textY = headerContentStartY + lineIndex * lineHeight;
      doc.text(textX, textY, line, { align: 'center' });
    });
  });

  doc.setFont('helvetica', 'normal');
}



      
private generateTable(doc: any, data: any[], headers: string[], startX: number, startY: number, columnCount: number, cellWidth: number): void {
  const tableHeight = 60;
  const cellHeight = 60;
  const minimumFontSize = 8;
  const marginTop = 40;

  doc.setLineWidth(0.5);
  doc.setFont('helvetica', 'bold');
  doc.rect(startX, startY + marginTop, cellWidth * columnCount, tableHeight, 'S');
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  headers.forEach((header, index) => {
    doc.setFontSize(10);
    doc.setFillColor(238, 238, 228);
    doc.rect(startX + index * cellWidth, startY + marginTop, cellWidth, tableHeight, 'FD');
    doc.text(startX + index * cellWidth + cellWidth / 2, startY + marginTop + tableHeight / 2 + 3, header, { align: 'center', baseline: 'middle' });
  });

  doc.setFont('helvetica', 'normal');
  
  data.forEach((record, rowIndex) => { 
    const rowY = startY + marginTop + (rowIndex + 1) * cellHeight;
    console.log();
    
    const isEvenRow = record['SL.NO'] % 2 === 0;
    headers.forEach((header, columnIndex) => {
      let fontSize = 10;
      let displayValue = record[header] !== null && record[header] !== undefined ? record[header].toString() : '';
      let textWidth = doc.getStringUnitWidth(displayValue) * fontSize;

      while (textWidth > cellWidth - 2 && fontSize > minimumFontSize) {
        fontSize--;
        doc.setFontSize(fontSize);
        textWidth = doc.getStringUnitWidth(displayValue) * fontSize;
      }

      const lines = this.wordWrap(displayValue, cellWidth - 2, fontSize);
      const lineHeight = fontSize * 1.2;

      const cellLines: string[] = [];
      lines.forEach(line => {
        if (doc.getStringUnitWidth(line) * fontSize > cellWidth - 2) {
          const secondaryLines = this.wordWrap(line, cellWidth - 2, fontSize);
          cellLines.push(...secondaryLines);
        } else {
          cellLines.push(line);
        }
      });

      const cellLinesCount = cellLines.length;
      const cellLinesHeight = lineHeight * cellLinesCount;
      const cellContentStartY = rowY + (cellHeight - cellLinesHeight) / 2;

      if (isEvenRow) {
        doc.setFillColor(219, 210, 210); // Set color for even rows
      } else {
        doc.setFillColor(255, 255, 255); // Set color for odd rows
      }

      doc.rect(startX + columnIndex * cellWidth, rowY, cellWidth, cellHeight, 'FD');
      doc.setFontSize(fontSize);
      doc.setTextColor(0, 0, 0); // Set text color to black

      cellLines.forEach((line, lineIndex) => {
        doc.text(startX + columnIndex * cellWidth + (cellWidth - doc.getStringUnitWidth(line) * fontSize) / 2, cellContentStartY + lineIndex * lineHeight, line);
      });
    });
  });
}
      

      private wordWrap(text: string, maxWidth: number, fontSize: number): string[] {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = `${fontSize}px helvetica`;
      
        words.forEach(word => {
          const currentWidth = context.measureText(currentLine + ' ' + word).width;
          if (currentWidth < maxWidth) {
            currentLine += ' ' + word;
          } else {
            lines.push(currentLine.trim());
            currentLine = word;
          }
      
        });
      
        lines.push(currentLine.trim());
        return lines;
      
      } 
      private getStringWidth(text: string, fontSize: number): number {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.font = `${fontSize}px helvetica`;
        return tempCtx.measureText(text).width;
      }

      onOpenCalendar(container) {
        container.monthSelectHandler = (event: any): void => {
          container._store.dispatch(container._actions.select(event.date));
        };     
        container.setViewMode('month');
      }
  
          getFromYear(data){
            var dateObject = new Date(this.fromMonthYear);
              var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
              var year = dateObject.getFullYear().toString();
              this.fromMonthYear = month + year;
              console.log(this.fromMonthYear); 
              this.shortlisttable(data);
            
          }
  
          getToYear(data){
            var dateObject = new Date(this.toMonthYear);
            var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
            var year = dateObject.getFullYear().toString();
            this.toMonthYear = month + year;
            console.log(this.toMonthYear); 
            this.shortlisttable(data);
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

    } 
         