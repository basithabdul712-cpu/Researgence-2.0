import { GeneralApiService } from 'src/app/components/general-api.service';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {PubSearchList} from'src/app/shared/model/PostPayload';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';
import { ScorebookService } from 'src/app/components/scorebook/scorebook.service';
import { AdminclientService } from 'src/app/components/adminclient/adminclient.service';
import { FacultiesService } from 'src/app/components/faculties/faculties.service';

@Component({
  selector: 'app-project-mine',
  templateUrl: './project-mine.component.html',
  styleUrls: ['./project-mine.component.scss','../../../../../assets/given/newcss/style.css']
})
export class ProjectMineComponent implements OnInit {
  backbuttonflag:any=2;
  enableMine:boolean=false;
  //pagination and sort
  orderSort=['Ascending','Descending'];
  ascendValue='Descending';
  yearSort=['Year','Month','Day']
  yearValue='Year';
  pageSizecount = ["10","20","50","100"];
  collapsablesize:any;
  //year picker
  toYear:number
  fromYear: number; 
  showIcons:any;
  form: FormGroup;
  selectAllPubType:boolean=false;
  //Andor 
  andorDropDown  = [{ "key": 0, "id": "OR","value":"IN" },
                    { "key": 1, "id": "AND","value":"EXACT" }];
  scsQuar:boolean=false;
  wosQuar:boolean=false;
   editshare:any;
   showDropDownDept:boolean;
   showDropDownInst:boolean;
   showDropDownCamp:boolean;
   showDropDownScl:boolean;
  databaseDropDown:any;
  selectDB:any[];
  selectDBDept:any[];
  selectDBInst:any[];
  selectDBCamp:any[];
  selectDBScl:any[];
  checkedList : any[];
  checkedListDept:any[];
  checkedListInst:any[];
  checkedListCamp:any[];
  checkedListScl:any[];
  currentSelected : {};
  currentSelectedDept:{};
  currentSelectedInst:{};
  currentSelectedCamp:{};
  currentSelectedScl:{};
  showDropDown:boolean;
  journalList:any;
  journalData:any;
  //ngmodel declare
  citattionrangefrom:any;
  departmentName:any;
  instituteName:any;
  locationName:any;
  publicationTitle:string|null=null;
  pubyearFrom:string;
  pubyearTo:string;
  multidatabase: any[];
  multipleDept:any[];
  multipleInst:any[];
  multipleCamp:any[];
  multipleScl:any[];
  andorType:any;
  publevel:any;
  pubtype:any;
  citattionrangeto:any;
  authorname:any;
  journalname:any;
  quartile: string[] = [];
  pubDateMonthto:string;
  pubDateMonthFrom:string;
  journalEnable:boolean=false;
  qualityscore:string;
  advanceEnable:boolean=false;
  patentStatus:any;
  titleEnable:boolean=false;
  authorEnable:boolean=false;
  facultyEnable:boolean=false;
  pubList: any;authorList:any;
  user: any;
  roleId: any;
  universityName: any;
  cidDropdown: any;
  uniqlocattion: any;
  filteredDept: any;
  leveDropDownmn: any;
  typeDropDownmn: any;
  pubdate:string;
  facultyname:string;
  month:any[];
  campus:any;
  deptvalue:any;
  layerType:string;
  instValue:any;
  departmentfilter: string;
  Institutefilter: string;
  Campusfiter: string;
  schoolfilter:string;
  instituteDrop: any;
  instituteDropId: any;
  departmentDrop: any;
  departmentDropId: any;
  dropDown: any;
  locationDrop: any;
  locationDropId: any;
  mineData:any;
  enableFaculty:boolean=false;
  dataList: any;
  Qrankdropdown: any;
  titleid:string| null =null;
  fullUrl: string;
  row = [
    {
      qualityscore: '',
      qualityId:'',
      citattionrangefrom: '',
      citattionrangeto: '',
      enableType:'',
    }
  ];
  opencitation:boolean=false;
  pubSearchList: PubSearchList[];
  authorid: string;
  facultyid: string;
  journalid: string;
  qualityScoreList:any;
  tempfromYear:string;
  temptoYear:string;
  pubrangeFrom:string|null=null;
  pubrangeTo:string|null=null;
  maxYear: number;
  page:number=1;
  pageSize:number=20;
  totalPages: number;
  download:number=0;
  startrow:number=0;
  endrow:number=20;
  viewarticle:any;
  userId:any;
  updateview: any;
  pageview: boolean = false;
  views: any;
  selectedView: string = 'compact';
  downloadEnable:boolean=false;
  currentYear = new Date().getFullYear();
  maxDate: Date = new Date(this.currentYear,11,31);
  ordervalue: any;
  yearorder: any;
  uniqInst:any;
  insight: string;
  showTrashIcon: boolean = false;
  layerCampus:any;
  layerInst:any;
  layerDept:any;
  layerSchool:any;
  filterSchool:string;
  layerInsSchCamDep:any;
  selectAllChecked: boolean = false;
  publicationNo:any;
  locationFilterId:any;
  schoolFilterId:any;
  instituteFilterId:any;
  deptFilterId:any;
  selectedTab: string;
  userDetail: any;
  isMenuOpen: boolean;
  isScrolled = false;
  public role:any;
  public roleName:any;
  Name:string;
  userRole:string;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  stickyEnable: boolean;
  selectdata: any;
  usvar: any;
  selectedValues:  string[] = [];
  scsQuartile: boolean;
  wosQuartile:  string[] = [];
  AllQuartiles:string[]=[];
  enableQuartile:boolean=false;
  technologyArea:any;
  domain:any;
  filter:number;
  applicantNo:any;
  dervauthorname:any;
  dervfacultyname:any;
  dervJournalName:any;

  constructor( private router:Router,private authService:AuthService,private scoreservice:ScorebookService,private modalService: NgbModal,
    private menuService:MenuService,private facultyservice: FacultiesService,private fb: FormBuilder,private gservice:GeneralApiService) {
      this.checkedList = [];
      this.selectDB=[];
      this.checkedListDept=[];
      this.selectDBDept=[];
      this.checkedListInst=[];
      this.selectDBInst=[];
      this.checkedListCamp=[];
      this.selectDBCamp=[];
      this.checkedListScl=[];
      this.selectDBScl=[];
     }
    
  ngOnInit() {
    this.insight='/scorebook/Publications/InsightReports';
         
        this.month=this.scoreservice.getMonths();
      this.user=this.authService.getUserDetail();
      console.log(this.user);
      this.layerType=this.user.LayerType;
      console.log(this.layerType);
      this.roleId=this.authService.getProfileObs();
      this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      this.universityName=this.user.University;
      this.userId=this.user.UserId;
      // this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
        this.role=JSON.parse(localStorage.getItem('RoleSelection'));
        console.log(this.role);
              const data=this.role.filter(item=> item.roleId==this.roleId);
               this.roleName=data[0].roleName;
              console.log(this.roleName)
        //      }) 
        this.menuService.isMenuOpen$.subscribe(isOpen => {
          this.isMenuOpen = isOpen;
      });
 
      this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x =>{
        this.campus =x;
        console.log(x);
        
        if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
          this.layerInsSchCamDep=this.campus;
          const uniqueCamp = new Map<string, { locationName: string, locationId: number }>();
          this.campus.forEach((item: any) => {
              if (!uniqueCamp.has(item.locationName)) {
                uniqueCamp.set(item.locationName, { 
                  locationName: item.locationName, 
                  locationId: item.locationId 
                  });
              }
          });
          this.layerCampus = Array.from(uniqueCamp.values());
      }
      else if(this.layerType=='4LType2'||this.layerType=='3LType3'){
        this.layerInsSchCamDep=this.campus;
        const uniqueScl = new Map<string, { schoolName: string, schoolId: number }>();
        this.campus.forEach((item: any) => {
            if (!uniqueScl.has(item.schoolName)) {
              uniqueScl.set(item.schoolName, { 
                    schoolName: item.schoolName, 
                    schoolId: item.schoolId 
                });
            }
        });
        this.layerSchool = Array.from(uniqueScl.values());
      }
      else if(this.layerType=='2LType1'){
        this.layerInsSchCamDep=this.campus;
        const uniqueInstitutes = new Map<string, { instituteName: string, instituteId: number }>();
        this.campus.forEach((item: any) => {
            if (!uniqueInstitutes.has(item.instituteName)) {
                uniqueInstitutes.set(item.instituteName, { 
                    instituteName: item.instituteName, 
                    instituteId: item.instituteId 
                });
            }
        });
        this.layerInst = Array.from(uniqueInstitutes.values());
      }
      else if(this.layerType=='2LType2'){
        this.layerInsSchCamDep=this.campus;
        this.layerDept=this.campus;
      }
        
    })

      //publication level
      // this.facultyservice.getDropdown('Level').subscribe(x=>{
      //   this.leveDropDownmn=x;
      // });
      // this.gservice.getProjectDrop('PROJECTSTATUS').subscribe(data=>{
      //   this.journalList=data;
      //   this.journalData=this.journalList;
      //   })
      //pyblication type
      this.gservice.getProjectDrop('PROJECTFUNDINGTYPE').subscribe(x=>{
        this.typeDropDownmn=x;
        
        if(this.typeDropDownmn.length>0){
          for(let i=0;i<this.typeDropDownmn.length;i++){
            this.typeDropDownmn[i].isSelected=false;
          } 
        }     
      });
      
      this.gservice.getProjectDrop('PROJECTSTATUS').subscribe(x=>{
        this.databaseDropDown=x;
      })
      // For Quality scores
      this.gservice.getProjectDrop('PROJECTOUTCOMETYPE').subscribe(x=>{
        this.qualityScoreList=x;           
      })

    } 
    

    selectAll() {
      this.selectAllPubType = !this.selectAllPubType;
      this.typeDropDownmn.forEach(item => item.isSelected = this.selectAllPubType);
     
      this.updatePubtype();
      
    }

    toggleCheckbox(item){
      item.isSelected = !item.isSelected;
      this.selectAllPubType = this.typeDropDownmn.every(i => i.isSelected);

      this.updatePubtype();
    }

    updatePubtype() {
      this.pubtype = this.typeDropDownmn.filter(item => item.isSelected).map(item => `'${item.value}'`).join(',');
      console.log(this.pubtype);
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

        //For search publication title
        changePubTitle(x){
              if(x.length>3){
              this.titleEnable=true;
              this.facultyservice.getPatentTitle(x).subscribe(data=>{
              this.pubList=data;
              console.log(this.pubList);
              
              if(this.pubList.length==0){
                this.titleEnable=false;
              }
              })
              }
              else if(x.length==0){
                this.publicationTitle=null;
                this.titleid=null;
              }
              else{
                this.titleEnable=false;
              }
              this.titleid=null;
        }

        selectTitle(val,id){
          this.publicationTitle=val;
          this.titleid=id.toString();
          this.titleEnable=false;
        }

                // For author input
                changeAuthor(x){
                      if(x.length>2){
                    this.facultyservice.AuthorSearch(this.user.UniversityId,x).subscribe(data=>{
                    this.authorList=data;
                    if(this.authorList.length==0){   
                      this.authorname=x;
                      this.authorEnable=false;
                    }
                    else{
                      this.authorEnable=true;
                    }
                    })   
                  }
                }

                // On select author
                onSelectAuthor(val,id,dervvalue){
                  this.authorname=val;
                  this.authorid=id.toString();
                  this.authorEnable=false;
                  this.dervauthorname=dervvalue;
                }

                //for faculty ip
                changeFaculty(x){
                  this.facultyservice.AuthorSearch(this.user.UniversityId,x).subscribe(data=>{
                  this.authorList=data;
                  if(this.authorList.length==0){
                    this.facultyEnable=false;
                    this.facultyid="0";
                  }
                  else{
                    this.facultyEnable=true;
                  }
                  })   
              }

              //select faculty
              onSelectFaculty(val,id,dervval){
                this.facultyname=val;
                this.facultyid=id.toString();
                this.facultyEnable=false;
                this.dervfacultyname=dervval;
              }

              searchJournal(val){
                this.facultyservice.AuthorSearch(this.user.UniversityId,val).subscribe(data=>{
                  this.journalList=data;
                  if(this.journalList.length==0){
                    this.journalEnable=false;
                    this.journalid="0";
                  }
                  else{
                    this.journalEnable=true;
                  }
                });
    
              }
    
              // After selecting journal from list journal
                selectJournal(val,id,dervval){
                  console.log(val);
                  this.journalname=val;
                  this.journalid=id.toString();
                  this.journalEnable=false;
                  this.dervJournalName=dervval;
                }

        advanceSearch(){
            this.advanceEnable=!this.advanceEnable;
        }

        filters(val){
          console.log(this.Campusfiter);
          console.log(this.schoolfilter);
          console.log(this.Institutefilter);
          console.log(this.departmentfilter);

          if(val=="loc"){
            
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
            console.log(x);
            if(this.layerType=="3LType1"){
                this.layerInst=x;
                const uniqueInst = new Map<string, { instituteName: string, instituteId: number }>();
                this.layerInst.forEach((item: any) => {
                    if (!uniqueInst.has(item.instituteName)) {
                      uniqueInst.set(item.instituteName, { 
                        instituteName: item.instituteName, 
                        instituteId: item.instituteId 
                        });
                    }
                });
                this.layerInst = Array.from(uniqueInst.values());
                }
                else if(this.layerType=="3LType2"){
                    this.layerDept=x;
                }
                else if(this.layerType=="4LType2"||this.layerType=="3LType3"){
                this.layerSchool=x;
                const uniqueScl = new Map<string, { schoolName: string, schoolId: number }>();
                this.layerSchool.forEach((item: any) => {
                    if (!uniqueScl.has(item.schoolName)) {
                      uniqueScl.set(item.schoolName, { 
                            schoolName: item.schoolName, 
                            schoolId: item.schoolId 
                        });
                    }
                });
                this.layerSchool = Array.from(uniqueScl.values());
              }
            });
          }

          if(val=="scl"){
            if(this.filterSchool==""){
              this.schoolFilterId=null;
            }
            else{
              if(this.layerType=="4LType2"||this.layerType=="3LType3"){
                const schoolfilter=this.layerInsSchCamDep.filter(item=> item.schoolName==this.filterSchool);
                this.schoolFilterId=schoolfilter[0].schoolId;
              }
              else{
                const schoolfilter=this.layerInsSchCamDep.filter(item=> item.schoolName==this.filterSchool&&item.locationName==this.Campusfiter);
                this.schoolFilterId=schoolfilter[0].schoolId;
              }
            }
            this.instituteFilterId=null;
            this.deptFilterId=null;
           this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
            console.log(x);
            this.layerInst=x;
            const uniqueInst = new Map<string, { instituteName: string, instituteId: number }>();
            this.layerInst.forEach((item: any) => {
                if (!uniqueInst.has(item.instituteName)) {
                  uniqueInst.set(item.instituteName, { 
                    instituteName: item.instituteName, 
                    instituteId: item.instituteId 
                    });
                }
            });
            this.layerInst = Array.from(uniqueInst.values());
          });          
      }   

          if(val=="inst"){
                if(this.Institutefilter==""){
                  this.instituteFilterId=null;
                }
              else{
                if(this.layerType=="3LType1"){
                  const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName==this.Institutefilter&&item.locationName==this.Campusfiter)
                  this.instituteFilterId=instfilter[0].instituteId;
                }
                else if(this.layerType=="4LType2"||this.layerType=="3LType3"){
                  const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName==this.Institutefilter&&item.schoolName==this.filterSchool)
                  this.instituteFilterId=instfilter[0].instituteId;
                }
                else{
                const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName==this.Institutefilter)
                this.instituteFilterId=instfilter[0].instituteId;
                }
              }
              this.deptFilterId=null;
              this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
                console.log(x);
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
              }
              this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
                console.log(x);
              });
            }

            if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){ 
              if(this.locationFilterId==null){
                this.schoolFilterId=null;
                this.filterSchool="";
                this.instituteFilterId=null;
                this.Institutefilter="";
                this.deptFilterId=null;
                this.departmentfilter="";
              }
            }

            if(this.layerType=='4LType2'||this.layerType=='3LType3'){
                if(this.schoolFilterId==null){
                  this.instituteFilterId=null;
                  this.Institutefilter="";
                  this.deptFilterId=null;
                  this.departmentfilter="";
                }
            }

            if(this.layerType=='2LType1'){
              if(this.instituteFilterId==null){
                this.deptFilterId=null;
                this.departmentfilter="";
              }
            }

        }

        getSelectedValueDept(status: boolean, value: string, id: any): void {
          if (status) {
            // If the checkbox is checked, add to selectDB and checkedList
            if (!this.selectDBDept.includes(value)) {
              this.selectDBDept.push(value);
            }
            if (!this.checkedListDept.some(item => item.value === value)) {
              this.checkedListDept.push({ id: id, value: value });
            }
          } 
           else {
            const indexInSelectDBDept = this.selectDBDept.indexOf(value);
            if (indexInSelectDBDept !== -1) {
              this.selectDBDept.splice(indexInSelectDBDept, 1);
            }
            const indexInCheckedListDept = this.checkedListDept.findIndex(item => item.value === value);
            if (indexInCheckedListDept !== -1) {
              this.checkedListDept.splice(indexInCheckedListDept, 1);
            }
          }
          this.currentSelectedDept = { checked: status, name: value };
          console.log(this.checkedListDept);
        }

        getSelectedValueInst(status: boolean, value: string, id: any): void {
          if (status) {
            // If the checkbox is checked, add to selectDB and checkedList
            if (!this.selectDBInst.includes(value)) {
              this.selectDBInst.push(value);
            }
            if (!this.checkedListInst.some(item => item.value === value)) {
              this.checkedListInst.push({ id: id, value: value });
            }
          } 
          else {
            // If the checkbox is unchecked, remove from selectDB and checkedList
            const indexInSelectDBInst = this.selectDBInst.indexOf(value);
            if (indexInSelectDBInst !== -1) {
              this.selectDBInst.splice(indexInSelectDBInst, 1);
            }
            const indexInCheckedListInst = this.checkedListInst.findIndex(item => item.value === value);
            if (indexInCheckedListInst !== -1) {
              this.checkedListInst.splice(indexInCheckedListInst, 1);
            }
          }
          this.currentSelectedInst = { checked: status, name: value };
          console.log(this.checkedListInst);
          
           if(this.checkedListInst.length==1){
              this.Institutefilter=this.checkedListInst[0].value;
              this.filters('inst');
           }
           else{
            this.layerDept=[];
           }

        }

        getSelectedValueCamp(status: boolean, value: string, id: any): void {
          if (status) {
            // If the checkbox is checked, add to selectDB and checkedList
            if (!this.selectDBCamp.includes(value)) {
              this.selectDBCamp.push(value);
            }
            if (!this.checkedListCamp.some(item => item.value === value)) {
              this.checkedListCamp.push({ id: id, value: value });
            }
          } 
           else {
            const indexInSelectDBCamp = this.selectDBCamp.indexOf(value);
            if (indexInSelectDBCamp !== -1) {
              this.selectDBCamp.splice(indexInSelectDBCamp, 1);
            }
            const indexInCheckedListCamp = this.checkedListCamp.findIndex(item => item.value === value);
            if (indexInCheckedListCamp !== -1) {
              this.checkedListCamp.splice(indexInCheckedListCamp, 1);
            }
          }
          this.currentSelectedCamp = { checked: status, name: value };
          console.log(this.checkedListCamp);
          if(this.checkedListCamp.length==1){
            this.Campusfiter=this.checkedListCamp[0].value;
            this.filters('loc');
         }
         else{
          this.layerSchool=[];
          }
        }

        getSelectedValueScl(status: boolean, value: string, id: any): void {
          if (status) {
            // If the checkbox is checked, add to selectDB and checkedList
            if (!this.selectDBScl.includes(value)) {
              this.selectDBScl.push(value);
            }
            if (!this.checkedListScl.some(item => item.value === value)) {
              this.checkedListScl.push({ id: id, value: value });
            }
          }
            else {
            const indexInSelectDBScl = this.selectDBScl.indexOf(value);
            if (indexInSelectDBScl !== -1) {
              this.selectDBScl.splice(indexInSelectDBScl, 1);
            }
            const indexInCheckedListScl = this.checkedListScl.findIndex(item => item.value === value);
            if (indexInCheckedListScl !== -1) {
              this.checkedListScl.splice(indexInCheckedListScl, 1);
            }
          }
          this.currentSelectedScl = { checked: status, name: value };
          console.log(this.checkedListScl);
          if(this.checkedListScl.length==1){
            this.filterSchool=this.checkedListScl[0].value;
            this.filters('scl');
         }
         else{
          this.layerInst=[];
          }
        }

        searchData(){

          localStorage.removeItem('mineSearchProj');
                  this.enableMine=true;
                  this.titleEnable=false;
                  this.authorEnable=false;
                 if(this.schoolFilterId!=null){
                    this.schoolFilterId=this.schoolFilterId.toString();
                  }
                  if(this.deptFilterId!=null){
                    this.deptFilterId=this.deptFilterId.toString();
                  }
                  if(this.instituteFilterId!=null){
                      this.instituteFilterId=this.instituteFilterId.toString();
                   }
                   if(this.locationFilterId!=null){
                    this.locationFilterId=this.locationFilterId.toString();
                 }
                 if(this.schoolFilterId!=null){
                  this.schoolFilterId=this.schoolFilterId.toString();
               }
            
                  if(this.publicationNo!=null){
                    this.pubSearchList=[  {
                        columnName: "PROJECTTITLE",
                        searchType: "Like",
                        searchId: null,
                        searchValue: this.publicationNo,
                        rangeFrom: null,
                        rangeTo: null,
                      },
                    ];
                  }
                  else{
                    this.pubSearchList=[];
                  }
                  
                  if(this.tempfromYear!=undefined||this.temptoYear!=undefined){
                    
                    //concat from date
                    if(this.tempfromYear!=undefined){
                    const dateString= new Date(this.tempfromYear);
                    const year=dateString.getFullYear();
                    console.log(year);
                    
                    this.pubyearFrom=year.toString();
                    if(this.pubDateMonthFrom!=undefined){
                    this.pubrangeFrom="01-"+this.pubDateMonthFrom+"-"+this.pubyearFrom;
                      }
                      else{
                        this.pubrangeFrom="01-"+"Jan"+"-"+this.pubyearFrom;
                      }
                    }
                    else{
                      this.pubrangeFrom=null;
                    }

                      ///concat to date
                      if(this.temptoYear!=undefined){
                      const dateObj=new Date(this.temptoYear);
                      const toyear=dateObj.getFullYear();
                      this.pubyearTo=toyear.toString();
                      
                      if(this.pubDateMonthto!=undefined){
                      this.pubrangeTo="01-"+this.pubDateMonthto+"-"+this.pubyearTo;
                      }
                      else{
                        this.pubrangeTo="31-"+"Dec"+"-"+this.pubyearTo;
                      }
                    }
                    else{
                      this.pubrangeTo=null;
                    }
                      console.log(this.pubrangeTo);

                      this.pubSearchList.push({
                        columnName: "GrantDate",
                        searchType: "Between",
                        searchId: null,
                        searchValue: "",
                        rangeFrom: this.pubrangeFrom,
                        rangeTo: this.pubrangeTo,
                      });
                  }

                  if (this.pubtype!=undefined) {
                    let pubtypeId = this.typeDropDownmn
                      .filter(item => this.pubtype.includes(item.value))
                      .map(item => item.id)
                      .join(',');
  
                   -
                      this.pubSearchList.push({
                        columnName: "PROJECTFUNDINGTYPE",
                        searchType: "In",
                        searchId: null,
                        searchValue: this.pubtype,
                        rangeFrom: null,
                        rangeTo: null,
                      });
                    }               

                  if(this.checkedList.length>0){
                    // convert list to string and separte by values from List od DB
                    let ids = this.checkedList.map(item => item.id).join(',');
                    let values = this.checkedList.map(item => item.value).join(',');

                    this.pubSearchList.push({
                      columnName: "PROJECTSTATUS",
                      searchType: this.andorType,
                      searchId: ids,
                      searchValue: values,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }

                  if(this.authorname!=undefined){
                    this.pubSearchList.push({
                      columnName: "EmployeeDetail",
                      searchType: "Like",
                      searchId: this.authorid,
                      searchValue: this.authorname,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }


                  if(this.facultyname!=undefined){
                    this.pubSearchList.push({
                      columnName: "PrincipalInvestigatorName",
                      searchType: "Like",
                      searchId: this.facultyid,
                      searchValue: this.facultyname,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }
                  if(this.journalname!=undefined){
                    this.pubSearchList.push({
                      columnName: "CollaboratorName",
                      searchType: "Like",
                      searchId: this.journalid,
                      searchValue: this.journalname,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }

                  if(this.technologyArea!=undefined){
                    this.pubSearchList.push({
                      columnName: "TechnologyArea",
                      searchType: "Like",
                      searchId: null,
                      searchValue: this.technologyArea,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }
                 

                  if(this.checkedListInst.length>0){
                    let idInst = this.checkedListInst.map(item => item.id).join(',');
                    let valueInst = this.checkedListInst.map(item => item.value).join(',');
                    // for(let inst=0;inst<this.checkedListInst.length;inst++){
                    this.pubSearchList.push({
                      columnName: "InstituteName",
                      searchType: "exact",
                      searchId: idInst,
                      searchValue: valueInst,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  //  }
                  }

                  if(this.checkedListScl.length>0){
                    let idScl = this.checkedListScl.map(item => item.id).join(',');
                    let valueScl = this.checkedListScl.map(item => item.value).join(',');
                    // for(let scl=0;scl<this.checkedListScl.length;scl++){
                    this.pubSearchList.push({
                      columnName: "SchoolName",
                      searchType: "exact",
                      searchId: idScl,
                      searchValue: valueScl,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  //  }
                  }

                  if(this.checkedListDept.length>0){
                    let idDept = this.checkedListDept.map(item => item.id).join(',');
                    let valueDept = this.checkedListDept.map(item => item.value).join(',');
                    // for(let dept=0;dept<this.checkedListDept.length;dept++){
                    this.pubSearchList.push({
                      columnName: "DepartmentName",
                      searchType: "exact",
                      searchId: idDept,
                      searchValue: valueDept,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  //  }
                  }

                  if(this.checkedListCamp.length>0){
                    let idCamp = this.checkedListCamp.map(item => item.id).join(',');
                    let valueCamp = this.checkedListCamp.map(item => item.value).join(',');
                    // for(let camp=0;camp<this.checkedListCamp.length;camp++){
                    this.pubSearchList.push({
                      columnName: "LocationName",
                      searchType: "exact",
                      searchId: idCamp,
                      searchValue: valueCamp,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  //  }
                  }

                  for(let s=0;s<this.row.length;s++){
                    if(this.row[s].qualityscore==""){
                      console.log("No data in quality scores");
                    }
                    else{
                      this.pubSearchList.push({
                        columnName: "Outcomes",
                        searchType: "Like",
                        searchId: this.row[s].qualityId,
                        searchValue: this.row[s].qualityscore,
                        rangeFrom: null,
                        rangeTo: null,
                      });
                    }
                  }
                  if(this.pubSearchList.length>0){
                   this.filter=1;
                  }
                  else{
                    this.filter=0;
                  }

                const data={
                    universityId: this.user.UniversityId,
                    roleId: this.roleId,
                    loginUserId: this.user.UserId,
                    sortColumnName: null,
                    sortType: null,
                    startRow: this.startrow,
                    endRow: this.endrow,
                    download: this.download,
                    filter: this.filter,
                    searchList:this.pubSearchList
                  }
                  console.log(data);

                  if(data){
                    localStorage.setItem("mineSearchProj", JSON.stringify(data));
                    this.router.navigate(['/Project/mineResult']);
                  } 
               }    
          
            getSelectedValue(status: boolean, value: string, id: any): void {
              if (status) {
                // If the checkbox is checked, add to selectDB and checkedList
                this.selectDB.push(value);
                this.checkedList.push({ id: id, value: value });
              } else {
                // If the checkbox is unchecked, remove from selectDB and checkedList
                const indexInSelectDB = this.selectDB.indexOf(value);
                if (indexInSelectDB !== -1) {
                  this.selectDB.splice(indexInSelectDB, 1);
                }
                const indexInCheckedList = this.checkedList.findIndex(item => item.value === value);
                if (indexInCheckedList !== -1) {
                  this.checkedList.splice(indexInCheckedList, 1);
                }
              }
              this.currentSelected = { checked: status, name: value };

              console.log(this.checkedList);

            }

                  //Add quality score
                  add(){
                      console.log(this.row.length);
                      const obj = {
                        qualityscore: '',
                        qualityId:'',
                        citattionrangefrom: '',
                        citattionrangeto: '',
                        enableType:'',
                      };    
                      this.row.push(obj);
                      this.showTrashIcon = true;
                    }

                    // To remove quality score
                    removeRow(index:any){
                     
                      this.row.splice(index,1);
                      
                    }

                    // To check quality score is already available 
                    checkQualityScore(i,score){

                     let tempId=this.qualityScoreList.filter(item => item.value==score)
                      this.row[i].qualityId=tempId[0].id;
                      if(this.row.length>0){
                        let checkAvailablity=this.row.filter(item => item.qualityscore==score);
                        console.log(checkAvailablity);         
                        if(checkAvailablity.length>1){
                          alert("Already selected");
                          this.row.splice(i,1);
                        }
                      }  
                    }

                    refreshPage(){
                      localStorage.removeItem('mineSearch');
                      location.reload();
                    }

                    //Filter for ascending &descending
                    changesOrder(values){
                      console.log(values);
       
                      this.ordervalue=values;
                      if(values=='Ascending'){
                          this.dataList.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
                      }
                      if(values=='Descending'){
                        this.dataList.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
                      }
                                    
                    }

                    changeYear(values){
                      console.log(values);
       
                      this.yearorder=values;
                      if(values=='Year'){
                          this.dataList.sort((a,b) => b - a);
                      }
                      
                    }

            showChart(){
              this.enableMine=!this.enableMine;
          }

        
}
