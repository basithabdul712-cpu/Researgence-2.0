import { GeneralApiService } from 'src/app/components/general-api.service';
import { ScorebookService } from './../scorebook.service';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { FacultiesService } from '../../faculties/faculties.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {PubSearchList} from'src/app/shared/model/PostPayload';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';
import { AdminclientService } from '../../adminclient/adminclient.service';

@Component({
  selector: 'app-minedb',
  templateUrl: './minedb.component.html',
  styleUrls: ['./minedb.component.scss','./../../../../assets/given/newcss/style.css']
})
export class MinedbComponent implements OnInit {
  backbuttonflag:any=2;
  enableMine:boolean=false;
  orderSort=['Ascending','Descending'];
  ascendValue='Descending';
  yearSort=['Year','Month','Day']
  yearValue='Year';
  pageSizecount = ["10","20","50","100"];
  collapsablesize:any;
  toYear:number
  fromYear: number; 
  showIcons:any;
  form: FormGroup;
  selectAllPubType:boolean=false;
  andorDropDown  = [{ "key": 0, "id": "OR","value":"IN" },
                    { "key": 1, "id": "AND","value":"EXACT" }];
  scsQuar:boolean=false;
  wosQuar:boolean=false;
   editshare:any;
   showDropDownDept:boolean;
  databaseDropDown:any;
  selectDB:any[];
  selectDBInst:any[];
  selectDBDept:any[];
  selectDBScl:any[];
  selectDBCamp:any[];
  checkedList : any[];
  checkedListInst:any[];
  checkedListDept:any[];
  checkedListScl:any[];
  checkedListCamp:any[];
  currentSelected : {};
  currentSelectedInst : {};
  currentSelectedDept : {};
  currentSelectedScl: {};
  currentSelectedCamp:{};
  showDropDown:boolean;
  showDropDownInst:boolean;
  journalList:any;
  citattionrangefrom:any;
  departmentName:any;
  instituteName:any;
  locationName:any;
  publicationTitle:string|null=null;
  pubyearFrom:string;
  pubyearTo:string;
  multidatabase: any[];
  multipleInst:any[];
  multipleDept:any[];
  multipleScl:any[];
  multipleCamp:any[];
  andorType:any;
  publevel:any;
  pubtype:any;
  citattionrangeto:any;
  authorname:any;
  dervauthorname:any;
  dervfacultyname:any;
  journalname:any;
  quartile: string[] = [];
  pubDateMonthto:string;
  pubDateMonthFrom:string;
  journalEnable:boolean=false;
  qualityscore:string;
  advanceEnable:boolean=false;
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
      citattionrangefrom: '',
      citattionrangeto: '',
    }
  ];
  showDropDownCamp:boolean;
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
  showDropDownScl:boolean;
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
  scsQ1:boolean=false;
  scsQ2:boolean=false;
  scsQ3:boolean=false;
  scsQ4:boolean=false;
  issn: any;
  isbn: any;
  universityList:any;
  layerList:any;
  enableFromYear:boolean=false;
  enableToYear:boolean=false;
  univId:any;

  constructor( private router:Router,private authService:AuthService,private scoreservice:ScorebookService,private modalService: NgbModal,
    private menuService:MenuService,private facultyservice: FacultiesService,private fb: FormBuilder,private service:AdminclientService) {
      this.checkedList = [];
      this.selectDB=[];
      this.checkedListInst=[];
      this.checkedListDept=[];
      this.checkedListScl=[];
      this.selectDBInst=[];
      this.selectDBDept=[];
      this.selectDBScl=[];
      this.selectDBCamp=[];
      this.checkedListCamp=[];
     }
    
  ngOnInit() {
    this.insight='/scorebook/Publications/InsightReports';
         
        this.month=this.scoreservice.getMonths();
      //To get details from login
      //this.userRole=this.authservice.getProfileObs();
      this.user=this.authService.getUserDetail();
      console.log(this.user);
      
      this.layerType=this.user.LayerType;
      this.roleId=this.authService.getProfileObs();
      this.universityName=this.user.University;
      this.userId=this.user.UserId;
      this.univId=parseInt(localStorage.getItem('initialUniv'));    
      
      // this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
      //         this.role=x;
      //   console.log(this.role);
        
      //         const data=this.role.filter(item=> item.roleId==this.roleId);
      //          this.roleName=data[0].roleName;
      //         console.log(this.roleName)
      //        }) 
        this.menuService.isMenuOpen$.subscribe(isOpen => {
          this.isMenuOpen = isOpen;
      });
      if(this.roleId==11||this.roleId==12){
        this.universityName=localStorage.getItem("clientUniv")
        this.service.GetUniversity(this.user.UserId,this.roleId).subscribe(x=>{
          this.universityList=x;
          let filterUniv = this.universityList.filter(x=> x.universityName==this.universityName);
          this.user.UniversityId=filterUniv[0].universityId;
          this.facultyservice.getLayerType(filterUniv[0].universityId,this.roleId,this.user.UserId).subscribe(y=>{
               this.layerList=y;
               this.layerType=this.layerList.layerType;
           });           
           this.facultyservice.getUnivLocSchInstDept(filterUniv[0].universityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x =>{
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
        });
      

      }
      else{
        this.facultyservice.getUnivLocSchInstDept(this.univId,this.roleId,'',this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x =>{
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
      }
 
     

      //publication level
      this.facultyservice.getDropdown('Level').subscribe(x=>{
        this.leveDropDownmn=x;
      });
      //pyblication type
      this.facultyservice.getDropdown('ArticleType').subscribe(x=>{
        this.typeDropDownmn=x;
        if(this.typeDropDownmn.length>0){
          for(let i=0;i<this.typeDropDownmn.length;i++){
            this.typeDropDownmn[i].isSelected=false;
          } 
        }    
      });
      
      this.facultyservice.getDropdown('publicationdb').subscribe(x=>{
        this.databaseDropDown=x;
      })

      // For Quality scores
      this.facultyservice.getSourceIndexingValue('QUALITYSCORE').subscribe(x=>{
        this.qualityScoreList=x;   
      })

      const storedTitle = localStorage.getItem('mineSearch');

      // Check if storedTitle is not null or undefined before using it
      if (storedTitle !== null && storedTitle !== undefined) {
           let checkString=JSON.parse(storedTitle);
            this.advanceEnable=true;
        for(let i=0;i<checkString.searchList.length;i++){
           if(checkString.searchList[i].columnName==="AuthorName"){
            this.dervauthorname=checkString.searchList[i].searchValue;
            this.authorname=checkString.searchList[i].searchValue;
            this.authorid=checkString.searchList[i].searchId;
           }
           if(checkString.searchList[i].columnName==="PublicationTitle"){
            this.publicationTitle=checkString.searchList[i].searchValue;
            this.titleid=checkString.searchList[i].searchId;
           }
           if(checkString.searchList[i].columnName==="PublicationDate"){
            this.pubrangeTo=checkString.searchList[i].rangeTo;
            this.pubrangeFrom=checkString.searchList[i].rangeFrom;
           }
           if(checkString.searchList[i].columnName==="FacultyName"){
            this.dervfacultyname=checkString.searchList[i].searchValue;
            this.facultyname=checkString.searchList[i].searchValue;
            this.facultyid=checkString.searchList[i].searchId;
           }
           if(checkString.searchList[i].columnName==="JournalName"){
            this.journalname=checkString.searchList[i].searchValue;
            this.journalid=checkString.searchList[i].searchId;
           }
           if(checkString.searchList[i].columnName==="InstituteName"){
            this.Institutefilter=checkString.searchList[i].searchValue;
            this.instituteDropId=checkString.searchList[i].searchId;
           }
           if(checkString.searchList[i].columnName==="DepartmentName"){
            this.departmentfilter=checkString.searchList[i].searchValue;
            this.departmentDropId=checkString.searchList[i].searchId;
           }
           if(checkString.searchList[i].columnName==="LocationName"){
            this.Campusfiter=checkString.searchList[i].searchValue;
            this.locationDropId=checkString.searchList[i].searchId;
           }
        }
      
      }
       
    } 
    
    updateSelectedValues(pub:string, value: string, isChecked: boolean) {
      if (!this.quartile) {
        this.quartile = [];
      }
      if (!this.wosQuartile) {
        this.wosQuartile = [];
      }
    
      // Check which checkbox is being updated and update the corresponding array
      if (isChecked) {
       
        if (value.startsWith('Q')) {
          // Check if it's a "Q" value, then add to both arrays
          this.quartile.push(value);
      }  else if (value.startsWith('W')) {
          // Check if it starts with "W" (for "WOS Quartile"), then add to the WOS array only
          this.wosQuartile.push(pub);
          
      }
      } else {
        // If checkbox is unchecked, remove from both arrays if present
        const indexInQuartile = this.quartile.indexOf(value);
        if (indexInQuartile !== -1) {
          this.quartile.splice(indexInQuartile, 1);
        }
        const indexInWOSQuartile = this.wosQuartile.indexOf(pub);
        if (indexInWOSQuartile !== -1) {
          this.wosQuartile.splice(indexInWOSQuartile, 1);
        }

      }
    
      // Log the updated arrays for debugging
      console.log('Quartile:', this.quartile);
      console.log('WOS Quartile:', this.wosQuartile);
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

    userall(val) {
             this.AllQuartiles.push(val);
         if(this.AllQuartiles.length==1){
            this.quartile=['Q1','Q2','Q3','Q4'];
            this.wosQuartile=['Q1','Q2','Q3','Q4'];
            console.log(this.quartile);
            console.log(this.wosQuartile); 
            
         }
         else {
          this.AllQuartiles=[]
            this.quartile=[];
            this.wosQuartile=[];
            console.log(this.quartile);
            console.log(this.wosQuartile);
            
         }
       
     }

    individualCheckboxes(val:string){
        if(this.quartile.length < 4 || this.wosQuartile.length < 4){
            this.AllQuartiles = [];
        }else if(this.quartile.length >=4 || this.wosQuartile.length >=4){
            this.AllQuartiles.push(val)
            this.quartile=['Q1','Q2','Q3','Q4'];
            this.wosQuartile=['Q1','Q2','Q3','Q4'];
        }
    }

    updatePubtype() {
      this.pubtype = this.typeDropDownmn.filter(item => item.isSelected).map(item => `'${item.value}'`).join(',');
      console.log(this.pubtype);
    }

isAllChecked():boolean{
  if (!this.quartile || !this.wosQuartile) {
    return false;
  }

  // Return true if both arrays have all items present


}
  isChecked(item: any) {
    return this.quartile.includes(item) || this.wosQuartile.includes(item)
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
              this.facultyservice.getTitleList(x).subscribe(data=>{
              this.pubList=data;
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
              this.publicationTitle=x;
        }

                // On select title
                onSelectPubTitle(val,id){
                  this.publicationTitle=val;
                  this.titleid=id.toString();
                  this.titleEnable=false;
                }

                // For author input
                changeAuthor(x){
                      if(x.length>2){
                    this.facultyservice.AuthorSearch(this.univId,x).subscribe(data=>{
                    this.authorList=data;
                    if(this.authorList.length==0){   
                      this.authorEnable=false;
                    }
                    else{
                      this.authorEnable=true;
                    }
                    this.authorname=x;
                    this.authorid="0";
                    })   
                  }
                }

                // On select author
                onSelectAuthor(val,id,dervName){
                  this.authorname=val;
                  this.authorid=id.toString();
                  this.authorEnable=false;
                  this.dervauthorname=dervName;
                }

                //for faculty ip
                changeFaculty(x){
                  this.facultyservice.AuthorSearch(this.univId,x).subscribe(data=>{
                  this.authorList=data;
                  if(this.authorList.length==0){
                    this.facultyEnable=false;
                  }
                  else{
                    this.facultyEnable=true;
                  }
                  this.facultyid="0";
                  this.facultyname=x;
                  })   
              }

              //select faculty
              onSelectFaculty(val,id,dervval){
                this.facultyname=val;
                this.facultyid=id.toString();
                this.facultyEnable=false;
                this.dervfacultyname=dervval;
              }

        // for journal search
        changeJournal(t){
          
              if(t.length>2){
                this.journalEnable=true;
              this.facultyservice.getJournal(t).subscribe(data=>{
              this.journalList=data;
              if(this.journalList.length==0){
                this.journalEnable=false;
              }
              })
            }
            else{
              this.journalEnable=false;
            }
            this.journalname=t;
            this.journalid="0";
        }

       // After selecting journal from list journal
        selectJournal(val,id){
          this.journalname=val;
          this.journalid=id.toString();
          this.journalEnable=false;
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

          this.facultyservice.getUnivLocSchInstDept(this.univId,this.roleId,'',this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
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
           this.facultyservice.getUnivLocSchInstDept(this.univId,this.roleId,'',this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
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
              this.facultyservice.getUnivLocSchInstDept(this.univId,this.roleId,'',this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
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
              this.facultyservice.getUnivLocSchInstDept(this.univId,this.roleId,'',this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
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

        searchData(){
          localStorage.removeItem('mineSearch');
          console.log(localStorage.getItem('mineSearch'));
          
          this.selectedTab = 'apa';
          
            if(this.publicationTitle!=null||this.tempfromYear!=undefined||this.checkedList.length>0||this.temptoYear!=undefined||this.pubtype!=undefined||
              this.authorname!=undefined||this.facultyname!=undefined||this.journalname!=undefined||this.Campusfiter!=undefined||this.filterSchool!=undefined||this.Institutefilter!=undefined||this.departmentfilter!=undefined||this.quartile!=undefined||this.issn!=undefined||this.isbn!=undefined){
                
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
            
                  if(this.publicationTitle!=null){
                    this.pubSearchList=[  {
                        columnName: "PublicationTitle",
                        searchType: "Like",
                        searchId: this.titleid,
                        searchValue: this.publicationTitle,
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
                       // this.pubrangeFrom="01-"+"01"+"-"+this.pubyearFrom;
                       this.pubrangeFrom=null;
                       this.enableFromYear=true;
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
                        // this.pubrangeTo="31-"+"12"+"-"+this.pubyearTo;
                        this.pubrangeTo=null;
                        this.enableToYear=true;
                      }
                    }
                    else{
                      this.pubrangeTo=null;
                    }
                      console.log(this.pubrangeTo);
                     if(!this.enableToYear&&!this.enableFromYear){
                      this.pubSearchList.push({
                        columnName: "PublicationDate",
                        searchType: "Between",
                        searchId: null,
                        searchValue: "",
                        rangeFrom: this.pubrangeFrom,
                        rangeTo: this.pubrangeTo,
                      });
                    }
                    else if(this.enableFromYear&&this.enableToYear){
                      this.pubSearchList.push({
                        columnName: "PublicationYear",
                        searchType: "Between",
                        searchId: null,
                        searchValue: "",
                        rangeFrom: this.pubyearFrom,
                        rangeTo: this.pubyearTo,
                      });
                    }
                  }

                  if (this.pubtype!=undefined) {
                    let pubtypeId = this.typeDropDownmn
                      .filter(item => this.pubtype.includes(item.value))
                      .map(item => item.id)
                      .join(',');
                  
                   
                      this.pubSearchList.push({
                        columnName: "PublicationType",
                        searchType: "In",
                        searchId: null,
                        searchValue: this.pubtype,
                        rangeFrom: null,
                        rangeTo: null,
                      });
                    } 

                    if (this.quartile.length>0) {
                                     
                      let quartileString = this.quartile.map(q => `'${q}'`).join(', ');

                        this.pubSearchList.push({
                          columnName: "Scsquartile",
                          searchType: "In",
                          searchId: null,
                          searchValue: quartileString,
                          rangeFrom: null,
                          rangeTo: null,
                        });
                      } 
                      if (this.wosQuartile.length>0) {
                                     
                        let wosquartileString = this.wosQuartile.map(q => `'${q}'`).join(', ');
  
                          this.pubSearchList.push({
                            columnName: "Wosquartile",
                            searchType: "In",
                            searchId: null,
                            searchValue: wosquartileString,
                            rangeFrom: null,
                            rangeTo: null,
                          });
                        }                

                  if(this.checkedList.length>0){
                    // convert list to string and separte by values from List od DB
                    let ids = this.checkedList.map(item => item.id).join(',');
                    let values = this.checkedList.map(item => item.value).join(',');

                    this.pubSearchList.push({
                      columnName: "PublicationDBName",
                      searchType: this.andorType,
                      searchId: ids,
                      searchValue: values,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }

                  if(this.authorname!=undefined){
                    this.pubSearchList.push({
                      columnName: "AuthorName",
                      searchType: "Like",
                      searchId: this.authorid,
                      searchValue: this.authorname,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }

                  if(this.facultyname!=undefined){
                    this.pubSearchList.push({
                      columnName: "FacultyName",
                      searchType: "Like",
                      searchId: this.facultyid,
                      searchValue: this.facultyname,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }

                  if(this.journalname!=undefined){
                    this.pubSearchList.push({
                      columnName: "JournalName",
                      searchType: "Like",
                      searchId: this.journalid,
                      searchValue: this.journalname,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }
                  if(this.isbn!=undefined){
                    this.pubSearchList.push({
                      columnName: "isbn",
                      searchType: "Like",
                      searchId: null,
                      searchValue: this.isbn,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }
                  if(this.issn!=undefined){
                    this.pubSearchList.push({
                      columnName: "issn",
                      searchType: "Like",
                      searchId: null,
                      searchValue: this.issn,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }

                  if(this.checkedListInst.length>0){
                    let idIns = this.checkedListInst.map(item => item.id).join(',');
                    let valuesIns = this.checkedListInst.map(item => item.value).join(',');
                    // for(let inst=0;inst<this.checkedListInst.length;inst++){
                    this.pubSearchList.push({
                      columnName: "InstituteName",
                      searchType: "In",
                      searchId: idIns,
                      searchValue: valuesIns,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  // }
                  }

                  if(this.checkedListScl.length>0){
                    // for(let scl=0;scl<this.checkedListScl.length;scl++){
                      let idScl = this.checkedListScl.map(item => item.id).join(',');
                      let valuesScl = this.checkedListScl.map(item => item.value).join(',');
                    this.pubSearchList.push({
                      columnName: "SchoolName",
                      searchType: "In",
                      searchId: idScl,
                      searchValue: valuesScl,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  //  }
                  }

                  if(this.checkedListDept.length>0){
                    let idDept = this.checkedListDept.map(item => item.id).join(',');
                    let valuesDept = this.checkedListDept.map(item => item.value).join(',');
                    // for(let dept=0;dept<this.checkedListDept.length;dept++){
                    this.pubSearchList.push({
                      columnName: "DepartmentName",
                      searchType: "In",
                      searchId: idDept,
                      searchValue: valuesDept,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  // }
                  }

                  if(this.checkedListCamp.length>0){
                    let idCamp = this.checkedListCamp.map(item => item.id).join(',');
                    let valuesCamp = this.checkedListCamp.map(item => item.value).join(',');
                    // for(let camp=0;camp<this.checkedListCamp.length;camp++){
                    this.pubSearchList.push({
                      columnName: "LocationName",
                      searchType: "In",
                      searchId: idCamp,
                      searchValue: valuesCamp,
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
                        columnName: this.row[s].qualityscore,
                        searchType: "Between",
                        searchId: null,
                        searchValue: "",
                        rangeFrom: this.row[s].citattionrangefrom.toString(),
                        rangeTo: this.row[s].citattionrangeto.toString(),
                      });
                    }
                  }

                const data={
                    universityId: this.univId,
                    roleId: this.roleId,
                    loginUserId: '0',
                    sortColumnName: null,
                    sortType: null,
                    startRow: this.startrow,
                    endRow: this.endrow,
                    download: this.download,
                    filter: 0,
                    searchList:this.pubSearchList
                  }
                  console.log(data);

                  localStorage.setItem("mineSearch", JSON.stringify(data));
                  this.router.navigate(['/scorebook/Publications/Mine/View'])
                  }
                  else{
                    alert("Need to fill atleast one field")
                    this.enableFaculty=false;
                  }

               }    
          
            getSelectedValue(status: boolean, value: string, id: any): void {
              if (status) {
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

            getSelectedValueInst(status: boolean, value: string, id: any): void {
              if (status) {
                // If the checkbox is checked, add to selectDB and checkedList
                if (!this.selectDBInst.includes(value)) {
                  this.selectDBInst.push(value);
                }
                if (!this.checkedListInst.some(item => item.value === value)) {
                  this.checkedListInst.push({ id: id, value: value });
                }
              }  else {
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

                  //Add quality score
                  add(){
                      console.log(this.row.length);
                      const obj = {
                        qualityscore: '',
                        citattionrangefrom: '',
                        citattionrangeto: '',
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

              showshare(val,id,userid){
                this.showIcons =!this.showIcons;
                this.editshare=val;
                const shareUrl = environment.commonUrl+'/article/art';
                const recordid = id;
                const sno =userid;
                this.fullUrl = `${shareUrl}/${recordid}/${sno}`;
              
            }

            getShareUrl( id:string,userid:any): string {
              const shareUrl = environment.commonUrl+'/article/art';
              const recordid = id;
              const sno = userid;
              let fullUrl = `${shareUrl}/${recordid}/${sno}`;
              return fullUrl;
            }

            closecite(){
              this.opencitation=false;

            }
            
            opencite(showModal) {
              console.log('dialogbox button opened!');
              this.modalService.open(showModal);
            }

            showChart(){
              this.enableMine=!this.enableMine;
          }

          selectedScheme = 'compact';
          updateSelectedScheme(viewValue: string) {
            const elements = document.getElementsByTagName('article');
          
            for (let i = 0; i < elements.length; i++) {
              elements[i].classList.remove(this.selectedScheme);
              elements[i].classList.add(viewValue);
            }
          
            this.selectedScheme = viewValue;
          }
          
          onViewChange(event: any) {
            const viewValue = event.target.value;
            this.selectedView = viewValue;
            this.updateSelectedScheme(viewValue);
            this.searchData();
          }
          


          onPageChange(page: number){
            this.page = Math.max(1, Math.min(page, this.totalPages));
            
            if (this.page == 1) {
              this.startrow = 0;
            } else {
              this.startrow = (this.page - 1) * this.pageSize;
            }
            this.endrow = Math.min(this.startrow + this.pageSize, this.collapsablesize);
                      // Apply sorting based on current sorting values
             if (this.ordervalue === 'Ascending') {
             this.dataList.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
             } else if (this.ordervalue === 'Descending') {
             this.dataList.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
             } else if (this.yearorder === 'Year') {
               this.dataList.sort((a, b) => a.year - b.year);
             }
            ///detailed or compact for article
            this.pageview=true;
            const viewValue = this.selectedScheme === 'compact' ? 'compact' : 'detailed';
            this.updateSelectedScheme(viewValue);
            this.searchData();
          }
 

          onPageSizeChange(size: string){
            this.page = 1;
            this.pageSize = Number(size);
            this.endrow=this.pageSize+this.startrow;
                      // Apply sorting based on current sorting values
             if (this.ordervalue === 'Ascending') {
             this.dataList.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
               } else if (this.ordervalue === 'Descending') {
                this.dataList.sort((a, b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
               } else if (this.yearorder === 'Year') {
                 this.dataList.sort((a, b) => a.year - b.year);
               }
 
              // detailed or compact for the article
               this.pageview = true;
              const viewValue = this.selectedScheme === 'compact' ? 'compact' : 'detailed';
            this.updateSelectedScheme(viewValue);
            this.searchData();
          }

           captureAsPDF(val) {

             this.download=val;
             this.searchData();
             if(val==1){
              alert("Pdf is generated. Please click download");
             }
          if(this.mineData.download==1){
            this.downloadEnable=false;
            html2canvas(document.querySelector('#printformClass')).then(function (canvas) {
              // Get dimensions and set up PDF
              var HTML_Width = canvas.width;
              var HTML_Height = canvas.height;
              var top_left_margin = 0;
              var PDF_Width = HTML_Width + top_left_margin * 0;
              var PDF_Height = PDF_Width * 2 + top_left_margin * 0;
              var canvas_image_width = HTML_Width;
              var canvas_image_height = HTML_Height;
          
              var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
          
              // Convert canvas to image data
              var imgData = canvas.toDataURL('image/jpeg', 1.0);
          
              // Create PDF instance
              var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
          
              // Add the image to the first page
              pdf.addImage(
                imgData,
                'JPG',
                top_left_margin,
                top_left_margin,
                canvas_image_width,
                canvas_image_height
              );
          
              // Add additional pages with the same image
              for (var i = 1; i <= totalPDFPages; i++) {
                pdf.addPage();
          
                // Adjust the margin calculation based on your requirements
                let margin = -(PDF_Height * i) + top_left_margin * 4;
                if (i > 1) {
                  margin = margin + i * 8;
                }
          
                pdf.addImage(
                  imgData,
                  'JPG',
                  top_left_margin,
                  margin,
                  canvas_image_width,
                  canvas_image_height
                );
              }
            
              // Save the PDF
              pdf.save('GeneratedPDF.pdf');
                // window.location.reload();
            });
            console.log("Generated");
           }
        }
          
}
