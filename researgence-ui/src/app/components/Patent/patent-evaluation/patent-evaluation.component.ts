import { AuthService } from '../../../shared/services/firebase/auth.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FacultiesService } from '../../faculties/faculties.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AdminclientService } from '../../adminclient/adminclient.service';

@Component({
  selector: 'app-patent-evaluation',
  templateUrl: './patent-evaluation.component.html',
  styleUrls: ['./../../../../assets/given/selected.css', './../../../../assets/given/css/style-vit1.css', './../../../../assets/given/css/style-vit2.css', './../../../../assets/given/css/style.css', './../../../../assets/given/css/bootstrap.min.css','./patent-evaluation.component.scss','./../../../../assets/given/selected.css','./../../../../assets/given/newcss/style.css']
})
export class PatentEvaluationComponent implements OnInit {
  rejectReason:string='';
  remarks:any;
  checkedbox:boolean=false;
  checkedboxApp:boolean =false;
  disableInput: boolean = false;
  disableInputApp: boolean = false;
  isMenuOpen:boolean;
  rfsSub:boolean;
  openform: boolean;
  openformApp: boolean;
  authForm: FormGroup;
  feeders: any[] = [];
  feedersApp:any[] = [];
  runiversity: any;
  universityFilter: any;
  fill: any;
  fillApp:any;
  checkData: any;
  checkDataApp: any;
  ipDropdown: boolean;
  ipDropdownApp: boolean;
  universityIP: any;
  universityIPApp:any;
  Author: any;
  AuthorApp:any;
  filteredList: any;
  filteredListApp: any;
  uniqueLocationNames: any;
  filterListDrop: boolean;
  filterListDropApp: boolean;
  ipAutherDrop: boolean;
  ipAutherDropApp: boolean;
  checkDataauthor: any;
  checkDataauthorApp: any;
  user: any;
  roleId: any;
  editRowId: any;
  editRowIdApp: any;
  enableIp: boolean;
  ipCountryDrop: boolean;
  countryList: any;
  rfsRequestId: any=0;
  status:any;
  authDetail: any;
  university: any;
  universityName: any='';
  dropvalues: any;
  department: any;
  deptId: any;
  institute: any;
  instId: any;
  location: any;
  locId: any;
  fullName:any='';
  newAuth: any; 
  universityNames: any;
  countryName:any='';
  locationName:any='';
  instituteName:any='';
  departmentName:any='';
  stateName:any='';
  schoolName:any='';
  correspondingEmail:any='';
  correspondingAuthor:number=0;
  userId: number=0;
  departmentId: number=0;
  universityId: number=0;
  instituteId: number=0;
  locationId: number=0;
  countryId:number=0;
  schoolId:number=0;
  stateId:number=0;
  checked: boolean;
  ActiontypeId=0;
  reason: any;
  loginuserId:number;
  searchSource: any;
  Source: any;
  sourceId: number=0;
  Publication: any;
  publicationid: number=0;
 public typeId: number=0;
  pubId: number=0;
  actions: any;
  pubsid:number;
  rfsTypeId:any;
  searchData:any;
  filterTitle:any;
  linkEnable:boolean=false;
  addEnable:boolean=false
  titleEnable:boolean=false;
  showCrossAuthor:boolean=false;
  pdfPath: any;
  ipStateDrop:boolean=false;
  tempPdf:string;
  ipInstituteDrop:boolean=false;
  ipInstituteDropApp:boolean=false;
  ipDepartmentDrop:boolean=false;
  ipDepartmentDropApp:boolean=false;
  instituteList: any;
  departmentList: any;
  commonDropDown  = [{ "key": 0, "value": "NO" },
  { "key": 1, "value": "YES" }];
  requestuserDetail: any;
  requestAuthorDetail: any;
  patentListById:any;
  stateFilter:any;
  stateList:any;
  newfeed:any;
  newfeedApp:any;
  filterdata:any;
  filterdataApp:any;
  filterschool:boolean=false;
  filterschoolApp:boolean=false;
  ipSchoolDrop:boolean=false;
  ipSchoolDropApp:boolean=false;
  schoolList:any;
Name: any;
roleName: any;
isScrolled: any;
stickyEnable: any;
@ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  institutevalue: any;
  uniqueinstNames: any;
  uniqueschNames: any;
  uniquedepatNames: any;
  uniqueschlNames: any;
  userName: any;
  role: any;
  school: any;
  schId: any;
  enableState:boolean=false;
  FilterCountry:any;
  filteredState:any;
  filterLocation:any;

  countryModel:string;
  countryModelId:number;
  filteredStateModel:any;
  FilterCountryModel:any;
  stateModel:string;
  stateModelId:number;
  stateModelEnable:boolean=false;
  filterStateList:any;
  newLocationName:string;
  newLocationId:number=0;
  AliasUserId: string;
  universityparamId: any;
  aliasauthor: any;
  alias: any[];
  isalias: boolean=false;
  isaliasApp: boolean = false;
  linkauthor: any;
  enableLink:any;
  enableLinkApp:any;
  aliceAuthorId:any;
  patRequestDetail:any;
  applicantList:any;
  swapInvId:any;
  swapAppId:any;

  constructor(public facService: FacultiesService,private menuService:MenuService,private modalService: NgbModal,
    private route: ActivatedRoute,private formbuild: FormBuilder,private router:Router,
    private adminclient:AdminclientService,private authservice:AuthService,private http: HttpClient) {
    this.authForm = this.formbuild.group({
      universityId:[''],
      universityName: [''],
      userId:[''],
      fullName: [''],
      countryId:[''],
      countryName: [''],
      stateId:[''],
      stateName:[''],
      departmentId:[''],
      departmentName: [''],
      instituteId:[''],
      instituteName: [''],
      schoolName: [''],
      schoolId:[''],
      locationId:[''],
      locationName: [''],
      correspondingEmail: [''],
      corresAuthor:[''],
    });
   }

  ngOnInit(): void {
                this.menuService.isMenuOpen$.subscribe(isOpen => {
                  this.isMenuOpen = isOpen;
                });
                localStorage.removeItem("patentDFS");
                this.route.paramMap.subscribe( paramMap => {
                  this.rfsRequestId = paramMap.get('RFSRequestId');
                  this.status=paramMap.get('status');
                  if(paramMap.get('patentId')==null){
                    this.pubsid=0;
                  }
                  else{
                    this.pubsid=parseInt(paramMap.get('patentId'));
                  }
                 
                  this.showCrossAuthor=false;
                  if(this.status=="Linked"){
                    this.rfsTypeId=1;
                    this.showCrossAuthor=true;
                  }
                  else if(this.status=="Manual"){
                    this.rfsTypeId=3;
                  }
                  else{
                    this.rfsTypeId=2;
                  }
                  console.log(this.status);
                  
                  });
                 
                  //this.userName=this.authservice.getProfileObs();
                this.user=this.authservice.getUserDetail();
                this.loginuserId=Number(this.user.UserId);
                console.log(this.user);
                this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
                this.roleId=this.authservice.getProfileObs();

                // this.authservice.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
                  this.role=JSON.parse(localStorage.getItem('RoleSelection'));
                  const data=this.role.filter(item=> item.roleId==this.roleId);
                  this.roleName=data[0].roleName;
                  console.log(this.roleName)
                  // }) 

                  this.facService.SearchUniversity().subscribe(data => {
                    this.runiversity = data;
                    this.universityFilter = data;
                    this.university=this.runiversity.filter(item => item.id==this.patRequestDetail.universityId);
                    this.universityNames= this.university[0].name
                    console.log( this.university);
                  });

                this.adminclient.getPatentEval(this.rfsRequestId).subscribe(data => {
                  this.requestuserDetail = data as any;
                  this.patRequestDetail=this.requestuserDetail.rfsPatRequestedUserDetail;
                  this.requestAuthorDetail=this.requestuserDetail.rfsInventorDetailsforPatent;
                  this.applicantList= this.requestuserDetail.rfsApplicantDetailsforPatent;

                  console.log(this.requestuserDetail);
                  localStorage.setItem("RfsUnivId",this.patRequestDetail.universityId);
                
                  this.facService.getUnivLocSchInstDept(this.patRequestDetail.universityId,this.roleId,this.user.UserId,null,null,null,null).subscribe(data => {
                    this.dropvalues = data;
                  console.log(this.dropvalues);
              
                  this.department=this.dropvalues.filter(item => item.departmentName==this.patRequestDetail.departmentName);
                  this.deptId= this.department[0].departmentId;
                  console.log(this.deptId);
                 
              
                   this.institute=this.dropvalues.filter(item => item.instituteName==this.patRequestDetail.instituteName);
                  //this.institute=Array.from(new Set(this.dropvalues.map((item : any)=>item.instituteName)))
                  this.instId= this.institute[0].instituteId;
                  console.log(this.instId);

                  this.school=this.dropvalues.filter(item => item.schoolName==this.patRequestDetail.schoolName);
                  //this.institute=Array.from(new Set(this.dropvalues.map((item : any)=>item.instituteName)))
                  this.schId= this.school[0].schoolId;
                  console.log(this.schId);
                  
              
                  this.location=this.dropvalues.filter(item => item.locationName==this.patRequestDetail.locationName);
                  this.locId= this.location[0].locationId;
                  console.log(this.locId);
              
                  });
              
                });
              

              // this.facService.getCountryDropDown().subscribe(x=>{
              //   this.countryList=x;
              //   console.log(this.countryList);
              // })
              this.facService.getAvailableCountry().subscribe(x=>{
                this.countryList=x;
              })
              
              }
              
              linksubmit(data,val,authorFullName:string){

                if(data=="Inv"){
                  this.swapInvId=Number(val);
                  this.swapAppId=0;
                }
                else if(data=="App"){
                  this.swapInvId=0;
                  this.swapAppId=Number(val);
                }
                
                if(this.status=="Linked"){
                  this.typeId=1;
                }
                if(this.status=="CrossRef"){
                  this.typeId=4;

                }
                if(this.status=="Manual"){
                  this.typeId=5;

                }

                  const LinkRequest={
                  rfsPatentLinkQueue: {
                    rfsPatentQueueId: Number(this.rfsRequestId),
                    universityId: Number(this.patRequestDetail.universityId),
                    userId: Number(this.patRequestDetail.userId),
                    applicationNumber: this.patRequestDetail.applicationNumber,
                    patentId: this.pubsid,
                    patentTitle: this.patRequestDetail.patentTitle,
                    patentOfficeId: 0,
                    webLink: "",
                    pdFfileLocation: this.patRequestDetail.pdfFileLocation,
                    rfsTypeId: this.typeId,
                    actionTypeId: 1,
                    remark: "",
                    workflowstatusId: 0,
                    swappedInventorUserId: this.swapInvId,
                    swappedApplicantUserId: this.swapAppId,
                    takenBy: 0,
                    verifiedBy: this.loginuserId
                  },
                  dfsrfsPatentApplicants: [
                    {
                      universityId: 0,
                      universityName: "string",
                      userId: 0,
                      fullName: "string",
                      countryId: 0,
                      countryName: "string",
                      stateId: 0,
                      stateName: "string",
                      locationId: 0,
                      locationName: "string",
                      schoolId: 0,
                      schoolName: "string",
                      instituteId: 0,
                      instituteName: "string",
                      departmentId: 0,
                      departmentName: "string",
                      correspondingEmail: "string",
                      correspondingAuthor: false,
                      aliasUserId: 0,
                      aliasUserUniversityId: 0,
                      patentApplicantMapId: 0,
                      patentApplicantSeq: 0,
                      isUserAddressSame: false,
                      PatentAplicntInvntrTypeId: 0
                    }
                  ],
                  dfsrfsPatentInventors: [
                    {
                      universityId: 0,
                      universityName: "string",
                      userId: 0,
                      fullName: "string",
                      countryId: 0,
                      countryName: "string",
                      stateId: 0,
                      stateName: "string",
                      locationId: 0,
                      locationName: "string",
                      schoolId: 0,
                      schoolName: "string",
                      instituteId: 0,
                      instituteName: "string",
                      departmentId: 0,
                      departmentName: "string",
                      correspondingEmail: "string",
                      correspondingAuthor: false,
                      aliasUserId: 0,
                      aliasUserUniversityId: 0,
                      patentInventorMapId: 0,
                      patentInventorSeq: 0,
                      isUserAddressSame: false,
                      PatentAplicntInvntrTypeId: 0
                    }
                  ]
                }

                console.log(LinkRequest);
                const firstAuthor = this.patRequestDetail;
                const userFullName=firstAuthor.userFullName;
                        
                const confirmation = confirm(`Are you sure you want to replace'${userFullName}' with '${authorFullName}'`);
                      if (confirmation) {
                          this.facService.savePatentLink(LinkRequest,this.user.UserId,this.roleId,).subscribe(x=>{   
                            if(this.roleId==11){
                              this.router.navigate(['/Patent/rfs/'+this.patRequestDetail.universityId]); 
                            } 
                            else{
                              this.router.navigate(['/Patent/rfs/university']); 
                            }  
                           
                          }) 
                        }
              } 

              Reject(modal: any)
              {
                this.modalService.open(modal);
              }

              addAuthor()
              {
                this.openform=true; 
                this.ActiontypeId=1 
                const newAuth = {
                  universityId:this.authForm.value.universityId,
                  universityName: this.authForm.value.universityName,
                  userId:this.authForm.value.userId,
                  fullName: this.authForm.value.fullName,
                  countryId: this.authForm.value.countryId,
                  countryName: this.authForm.value.countryName,
                  stateId: this.authForm.value.stateId,
                  stateName: this.authForm.value.stateName,
                  departmentId: this.authForm.value.departmentId,
                  departmentName: this.authForm.value.departmentName,
                  instituteId: this.authForm.value.instituteId,
                  instituteName: this.authForm.value.instituteName,
                  schoolId: this.authForm.value.schoolId,
                  schoolName: this.authForm.value.schoolName,
                  locationId: this.authForm.value.locationId,
                  locationName: this.authForm.value.locationName, 
                  correspondingEmail: this.authForm.value.correspondingEmail,
                  correspondingAuthor: this.authForm.value.correspondingAuthor
                };

              
                if(this.feeders.length==0)
                {
                this.feeders.push(newAuth);
                }
                // Reset form fields
                this.authForm.reset();
                console.log(this.feeders);
              }

              addAuthorApp()
              {
                this.openformApp=true; 
                this.ActiontypeId=1 
                const newAuth = {
                  universityId:this.authForm.value.universityId,
                  universityName: this.authForm.value.universityName,
                  userId:this.authForm.value.userId,
                  fullName: this.authForm.value.fullName,
                  countryId: this.authForm.value.countryId,
                  countryName: this.authForm.value.countryName,
                  stateId: this.authForm.value.stateId,
                  stateName: this.authForm.value.stateName,
                  departmentId: this.authForm.value.departmentId,
                  departmentName: this.authForm.value.departmentName,
                  instituteId: this.authForm.value.instituteId,
                  instituteName: this.authForm.value.instituteName,
                  schoolId: this.authForm.value.schoolId,
                  schoolName: this.authForm.value.schoolName,
                  locationId: this.authForm.value.locationId,
                  locationName: this.authForm.value.locationName, 
                  correspondingEmail: this.authForm.value.correspondingEmail,
                  correspondingAuthor: this.authForm.value.correspondingAuthor
                };

              
                if(this.feedersApp.length==0)
                {
                this.feedersApp.push(newAuth);
                }
                // Reset form fields
                this.authForm.reset();
                console.log(this.feedersApp);
              }


       fetchData(disableInput){
              this.checkedbox=disableInput;
              this.ActiontypeId=2;
              
              if(disableInput==true){
                this.facService.getUnivLocSchInstDept(this.patRequestDetail.universityId,this.roleId,this.loginuserId,null,null,null,null).subscribe(x=>{
                  this.filteredList=x;
                  console.log(this.filteredList);
                  
                if(this.filteredList.length>0){
                  this.uniqueLocationNames=Array.from(new Set(this.filteredList.map(item => item.locationName)));
                  this.uniqueinstNames=Array.from(new Set(this.filteredList.map(item => item.instituteName)));
                  this.uniqueschNames=Array.from(new Set(this.filteredList.map(item => item.schoolName)));
                  //this.uniquedepatNames=Array.from(new Set(this.filteredList.map(item => item.departmentName)));
                }
                console.log(x);
                
              });
              
            }
           
            console.log("fetched data");
            console.log(this.patRequestDetail);
            
            this.feeders[0].universityId=this.patRequestDetail.universityId;
            this.feeders[0].universityName=this.universityNames;
            this.feeders[0].fullName = this.patRequestDetail.userFullName;
            this.feeders[0].userId = this.patRequestDetail.userId;
            this.feeders[0].departmentId= this.deptId;
            this.feeders[0].departmentName = this.patRequestDetail.departmentName;
            this.feeders[0].instituteId =this.instId;
            this.feeders[0].instituteName = this.patRequestDetail.instituteName;
            this.feeders[0].schoolId=this.schId;
            this.feeders[0].schoolName = this.patRequestDetail.schoolName;
            this.feeders[0].locationId =this.locId;
            this.feeders[0].locationName =  this.patRequestDetail.locationName;
            this.feeders[0].countryId =this.authForm.value.countryId;
            this.feeders[0].countryName = this.authForm.value.countryName;
            this.feeders[0].correspondingEmail = this.authForm.value.correspondingEmail;
            this.feeders[0].correspondingAuthor=this.authForm.value.correspondingAuthor;
            this.feeders[0].stateId=this.authForm.value.stateId;
            this.feeders[0].stateName = this.authForm.value.stateName;

              console.log(this.feeders);
              
              if(disableInput==false){
                this.check(0);
              }
    
  }

  fetchDataApp(disableInput){
    this.checkedboxApp=disableInput;
    this.ActiontypeId=2;
    
    if(disableInput==true){
      this.facService.getUnivLocSchInstDept(this.patRequestDetail.universityId,this.roleId,this.loginuserId,null,null,null,null).subscribe(x=>{
        this.filteredList=x;
        console.log(this.filteredList);
        
      if(this.filteredList.length>0){
        this.uniqueLocationNames=Array.from(new Set(this.filteredList.map(item => item.locationName)));
        this.uniqueinstNames=Array.from(new Set(this.filteredList.map(item => item.instituteName)));
        this.uniqueschNames=Array.from(new Set(this.filteredList.map(item => item.schoolName)));
        //this.uniquedepatNames=Array.from(new Set(this.filteredList.map(item => item.departmentName)));
      }
      console.log(x);
      
    });
    
  }
 
  console.log("fetched data");
  console.log(this.patRequestDetail);
  
  this.feedersApp[0].universityId=this.patRequestDetail.universityId;
  this.feedersApp[0].universityName=this.universityNames;
  this.feedersApp[0].fullName = this.patRequestDetail.userFullName;
  this.feedersApp[0].userId = this.patRequestDetail.userId;
  this.feedersApp[0].departmentId= this.deptId;
  this.feedersApp[0].departmentName = this.patRequestDetail.departmentName;
  this.feedersApp[0].instituteId =this.instId;
  this.feedersApp[0].instituteName = this.patRequestDetail.instituteName;
  this.feedersApp[0].schoolId=this.schId;
  this.feedersApp[0].schoolName = this.patRequestDetail.schoolName;
  this.feedersApp[0].locationId =this.locId;
  this.feedersApp[0].locationName =  this.patRequestDetail.locationName;
  this.feedersApp[0].countryId =this.authForm.value.countryId;
  this.feedersApp[0].countryName = this.authForm.value.countryName;
  this.feedersApp[0].correspondingEmail = this.authForm.value.correspondingEmail;
  this.feedersApp[0].correspondingAuthor=this.authForm.value.correspondingAuthor;
  this.feedersApp[0].stateId=this.authForm.value.stateId;
  this.feedersApp[0].stateName = this.authForm.value.stateName;

    console.log(this.feedersApp);
    
    if(disableInput==false){
      this.checkApp(0);
    }

}

      //fetch data based on university
      onKeyIP(x, val,data) {
        console.log(val);
        this.ipDropdown = true;
        this.checkData=data;
        this.fill = this.universityFilter.filter(e =>
          e.name.toLowerCase().includes(val.toLowerCase())
        );
        console.log(this.fill);
      }

      // university select for applicant
      onKeyIPApp(x, val,data) {
        console.log(val);
         this.ipDropdownApp = true;
         this.checkDataApp=data;
         this.fillApp = this.universityFilter.filter(e =>
          e.name.toLowerCase().includes(val.toLowerCase())
         );
         console.log(this.fillApp);
      }

      onInput(item: string, id: number, val) {

        this.facService.getLayerType(id, this.roleId, this.user.UserId).subscribe(data => {
          console.log(data);
          this.newfeed = data;
          this.filterdata = this.newfeed.layerType;
          if(this.filterdata=="4LType1"||this.filterdata=="4LType2"||this.filterdata=="3LType3"){
            this.filterschool = true;
          }
          else{
            this.filterschool=false;
          }

        this.feeders[val].schoolEnable = this.filterschool;
        this.feeders[val].universityName = item;
        this.feeders[val].universityId = id;
        this.ipDropdown = false;
        this.universityIP = id;
        });
      }

      onInputApp(item: string, id: number, val) {

        this.facService.getLayerType(id, this.roleId, this.user.UserId).subscribe(data => {
          console.log(data);
          this.newfeedApp = data;
          this.filterdataApp = this.newfeed.layerType;
          if(this.filterdataApp=="4LType1"||this.filterdataApp=="4LType2"||this.filterdataApp=="3LType3"){
            this.filterschoolApp = true;
          }
          else{
            this.filterschoolApp=false;
          }

        this.feedersApp[val].schoolEnable = this.filterschoolApp;
        this.feedersApp[val].universityName = item;
        this.feedersApp[val].universityId = id;
        this.ipDropdown = false;
        this.universityIPApp = id;
        });
      }

          //get values based on university and author
          SearchIPData(text: string, val,author) {
          
            //for assign yes to first author
            this.facService.AuthorSearch(this.universityIP, val).subscribe(data => {
              this.Author = data;
              console.log(this.Author);
              this.facService.getUnivLocSchInstDept(this.universityIP,this.roleId,this.user.UserId,null,null,null,null).subscribe(x=>{
                this.filteredList=x;
                console.log(x);
                if(this.filteredList.length>0){    
                  this.uniqueLocationNames = Array.from(new Set(this.filteredList.map(item => item.locationName))); 
                  this.uniqueinstNames=Array.from(new Set(this.filteredList.map(item => item.instituteName)));
                  this.uniqueschNames=Array.from(new Set(this.filteredList.map(item => item.schoolName)));  
                  }
                  else{
                    this.filterListDrop=true;
                    console.log("enter");          
                  }     
            })
              if(this.Author){
              this.ipAutherDrop = true;
              this.checkDataauthor=author;
            }
            if(this.Author==""){
              this.ipAutherDrop= false;
              this.checkDataauthor=author;
              this.feeders[author].fullName = val;
              this.feeders[author].userId = 0;
            }
            });
          }

                   //get values based on university for applicant
                   SearchIPDataApp(text: string, val,author) {
          
                    //for assign yes to first author
                    this.facService.AuthorSearch(this.universityIPApp, val).subscribe(data => {
                      this.AuthorApp = data;
                      console.log(this.AuthorApp);
                      this.facService.getUnivLocSchInstDept(this.universityIPApp,this.roleId,this.user.UserId,null,null,null,null).subscribe(x=>{
                        this.filteredListApp=x;
                        console.log(x);
                        if(this.filteredList.length>0){    
                          this.uniqueLocationNames = Array.from(new Set(this.filteredListApp.map(item => item.locationName))); 
                          this.uniqueinstNames=Array.from(new Set(this.filteredListApp.map(item => item.instituteName)));
                          this.uniqueschNames=Array.from(new Set(this.filteredListApp.map(item => item.schoolName)));  
                          }
                          else{
                            this.filterListDropApp=true;
                            console.log("enter");          
                          }     
                    })
                      if(this.AuthorApp){
                      this.ipAutherDropApp = true;
                      this.checkDataauthorApp=author;
                    }
                    if(this.AuthorApp==""){
                      this.ipAutherDropApp= false;
                      this.checkDataauthorApp=author;
                      this.feedersApp[author].fullName = val;
                      this.feedersApp[author].userId = 0;
                    }
                    });
                  }

          onAutherClick(universityid,userid,name: string,deptid, dept: string,instid, inst: string,locationid, loca: string,countryid, coun: string, cemail: string,cauthor:Number, val,stateId,state:string,schoolId,school:string) {
            this.feeders[val].universityId=universityid;
            this.feeders[val].fullName = name;
            this.feeders[val].userId = userid;
            this.feeders[val].departmentId= deptid;
            this.feeders[val].departmentName = dept;
            this.feeders[val].instituteId =instid;
            this.feeders[val].instituteName = inst;
            this.feeders[val].locationId =locationid;
            this.feeders[val].locationName = loca;
            this.feeders[val].countryId =countryid;
            this.feeders[val].countryName = coun;
            this.feeders[val].correspondingEmail = cemail;
            this.feeders[val].stateId = stateId;
            this.feeders[val].stateName = state;
            this.feeders[val].schoolId = schoolId;
            this.feeders[val].schoolName = school;
            this.ipAutherDrop = false;
          }

          onAutherClickApp(universityid,userid,name: string,deptid, dept: string,instid, inst: string,locationid, loca: string,countryid, coun: string, cemail: string,cauthor:Number, val,stateId,state:string,schoolId,school:string) {
            this.feedersApp[val].universityId=universityid;
            this.feedersApp[val].fullName = name;
            this.feedersApp[val].userId = userid;
            this.feedersApp[val].departmentId= deptid;
            this.feedersApp[val].departmentName = dept;
            this.feedersApp[val].instituteId =instid;
            this.feedersApp[val].instituteName = inst;
            this.feedersApp[val].locationId =locationid;
            this.feedersApp[val].locationName = loca;
            this.feedersApp[val].countryId =countryid;
            this.feedersApp[val].countryName = coun;
            this.feedersApp[val].correspondingEmail = cemail;
            this.feedersApp[val].stateId = stateId;
            this.feedersApp[val].stateName = state;
            this.feedersApp[val].schoolId = schoolId;
            this.feedersApp[val].schoolName = school;
            this.ipAutherDropApp = false;
          }

          toggle(val) {
            this.editRowId = val;
            console.log(this.editRowId);
            
          }

          toggleApp(val) {
            this.editRowIdApp = val;
            console.log(this.editRowId);
            
          }
          //for edit button 
          check(i) {
            console.log("print");
            this.disableInput=false;
            this.feeders[i] = [];
            this.enableIp = true;
          }

            //for edit button 
            checkApp(i) {
              this.disableInputApp=false;
              console.log("print");
              this.feedersApp[i] = [];
              this.enableIp = false;
            }

            //common list of country
            SearchCountry(event,i){
              if(event==""){
                this.ipCountryDrop=false;
              }else{
                this.ipCountryDrop=true;
              this.facService.getCountryDropDown(event).subscribe(x=>{
                this.countryList=x;
                console.log(this.countryList);     
              })
            } 
          }

          aliasid(name,i) {
    
            this.enableLink=i;
            this.facService.AuthorSearch(this.patRequestDetail.universityId, name).subscribe(data => {
           this.linkauthor = data;
           console.log(this.linkauthor);
           this.isalias=true;  
           this.feeders[i].linkname = name;
           this.feeders[i].AliasUserId = 0;
            })
         }

         aliasidApp(name,i) {
    
            this.enableLinkApp=i;
            this.facService.AuthorSearch(this.patRequestDetail.universityId, name).subscribe(data => {
          this.linkauthor = data;
          console.log(this.linkauthor);
          this.isaliasApp=true;  
          this.feedersApp[i].linkname = name;
          this.feedersApp[i].AliasUserId = 0;
            })
        }
         
         Onlink(name,i,id){
           this.isalias=false;  
           this.feeders[i].linkname = name;
           this.feeders[i].AliasUserId = id; 
         }

         OnlinkApp(name,i,id){
          this.isaliasApp=false;  
          this.feedersApp[i].linkname = name;
          this.feedersApp[i].AliasUserId = id; 
        }

          onselectCountry(name,id,i){
            this.ipCountryDrop=false;
            this.feeders[i].countryId=id;
            this.feeders[i].countryName=name;
          }

          onselectSchool(name, id, i){
            this.ipSchoolDrop=false;
            this.feeders[i].schoolId = id;
            this.feeders[i].schoolName = name;
          }

          onselectSchoolApp(name, id, i){
            this.ipSchoolDropApp=false;
            this.feedersApp[i].schoolId = id;
            this.feedersApp[i].schoolName = name;
          }

          onselectState(name, id, i){
            this.ipStateDrop= false;
            this.feeders[i].stateId = id;
            this.feeders[i].stateName = name;
           }
           @HostListener('window:scroll')
           onWindowScroll() {
                   const scrollY = window.scrollY;
               
                   if (this.blueheader) {
                     const element = this.blueheader.nativeElement;
                     
                     if (scrollY >=20) {
                       element.classList.remove('bluebar_expand');
                       element.classList.add('bluebar_collapse');
                       this.stickyEnable=true;
                     } else {
                       element.classList.remove('bluebar_collapse');
                       element.classList.add('bluebar_expand');
                       this.stickyEnable=false;
                     }
                   }
           }

           submitApp(){

            for (const feeder of this.feedersApp) {
              console.log('Full Name:', feeder.fullName);
              console.log('Country Name:', feeder.countryName);
              console.log(feeder.userId);
              console.log(feeder.departmentId);
                    
              // ... access other properties ...
              this.userId=Number(feeder.userId);   
              this.universityId=Number(feeder.universityId);
              this.departmentId=Number(feeder.departmentId);
              this.instituteId=Number(feeder.instituteId);
              this.locationId=Number(feeder.locationId);//   for (const feeder of this.feeders) {
              console.log('Full Name:', feeder.fullName);
              console.log('Country Name:', feeder.countryName);
              console.log(feeder.userId);
              console.log(feeder.departmentId);
                this.countryId=Number(feeder.countryId);
                this.schoolId=Number(feeder.schoolId);
                this.stateId=Number(feeder.stateId)
                this.universityName=feeder.universityName;
                this.fullName=feeder.fullName;
                this.countryName=feeder.countryName;
                this.stateName=feeder.stateName;
                this.locationName=feeder.locationName;
                this.schoolName=feeder.schoolName;
                this.departmentName=feeder.departmentName;
                this.instituteName=feeder.instituteName;
                this.aliceAuthorId=feeder.AliasUserId;
                this.correspondingEmail=feeder.correspondingEmail;
                this.correspondingAuthor=feeder.correspondingAuthor;    
                  }
                console.log(this.status)
                if(this.status=="Linked"){
                  this.typeId=1;
                }
                if(this.status=="Manual"){
                  this.typeId=5;  
                }
                if(this.status=="CrossRef"){
                  this.typeId=4; 
                }
        
                const saveRFS={
                  rfsPatentLinkQueue: {
                    rfsPatentQueueId: Number(this.rfsRequestId),
                    universityId: Number(this.patRequestDetail.universityId),
                    userId: Number(this.patRequestDetail.userId),
                    applicationNumber: this.patRequestDetail.applicationNumber,
                    patentId: this.pubsid,
                    patentTitle: this.patRequestDetail.patentTitle,
                    patentOfficeId: 0,
                    webLink: "",
                    pdFfileLocation: this.patRequestDetail.pdfFileLocation,
                    rfsTypeId: this.typeId,
                    actionTypeId: 0,
                    remark: "",
                    workflowstatusId: 0,
                    swappedInventorUserId: 0,
                    swappedApplicantUserId: 0,
                    takenBy: 0,
                    verifiedBy: this.loginuserId
                  },
                  dfsrfsPatentApplicants: [
                    {
                      universityId: this.universityId,
                      universityName: this.universityName,
                      userId: this.userId,
                      fullName: this.fullName,
                      countryId: this.countryId,
                      countryName: this.countryName,
                      stateId: this.stateId,
                      stateName: this.stateName,
                      locationId: this.locationId,
                      locationName: this.locationName,
                      schoolId: this.schoolId,
                      schoolName: this.schoolName,
                      instituteId: this.instituteId,
                      instituteName: this.instituteName,
                      departmentId: this.departmentId,
                      departmentName: this.departmentName,
                      correspondingEmail: this.correspondingEmail,
                      correspondingAuthor: this.correspondingAuthor,
                      aliasUserId: this.aliceAuthorId,
                      aliasUserUniversityId: parseInt(this.patRequestDetail.universityId),
                      patentApplicantMapId: 0,
                      patentApplicantSeq: 0,
                      isUserAddressSame: this.disableInputApp,
                      PatentAplicntInvntrTypeId: 0
                    }
                  ],
                  dfsrfsPatentInventors: [
                    {
                      universityId: 0,
                      universityName: "string",
                      userId: 0,
                      fullName: "string",
                      countryId: 0,
                      countryName: "string",
                      stateId: 0,
                      stateName: "string",
                      locationId: 0,
                      locationName: "string",
                      schoolId: 0,
                      schoolName: "string",
                      instituteId: 0,
                      instituteName: "string",
                      departmentId: 0,
                      departmentName: "string",
                      correspondingEmail: "string",
                      correspondingAuthor: false,
                      aliasUserId: 0,
                      aliasUserUniversityId: 0,
                      patentInventorMapId: 0,
                      patentInventorSeq: 0,
                      isUserAddressSame: false,
                      PatentAplicntInvntrTypeId: 0
                    }
                  ]
                } 
                          console.log(saveRFS);   
                          const confirmation = confirm('Confirm to save article');           
                          if (confirmation) {
                            this.facService.savePatentLink(saveRFS,this.user.UserId,this.roleId).subscribe(x=>{ 
                              if(this.roleId==11){
                                this.router.navigate(['/Patent/rfs/'+this.patRequestDetail.universityId]); 
                              } 
                              else{
                                this.router.navigate(['/Patent/rfs/university']); 
                              }                 
                                     
                            })
                          }

           }

          submit(){

                for (const feeder of this.feeders) {
                      console.log('Full Name:', feeder.fullName);
                      console.log('Country Name:', feeder.countryName);
                      console.log(feeder.userId);
                      console.log(feeder.departmentId);
                            
                      // ... access other properties ...
                      this.userId=Number(feeder.userId);   
                      this.universityId=Number(feeder.universityId);
                      this.departmentId=Number(feeder.departmentId);
                      this.instituteId=Number(feeder.instituteId);
                      this.locationId=Number(feeder.locationId);//   for (const feeder of this.feeders) {
                      console.log('Full Name:', feeder.fullName);
                      console.log('Country Name:', feeder.countryName);
                      console.log(feeder.userId);
                      console.log(feeder.departmentId);
                        this.countryId=Number(feeder.countryId);
                        this.schoolId=Number(feeder.schoolId);
                        this.stateId=Number(feeder.stateId)
                        this.universityName=feeder.universityName;
                        this.fullName=feeder.fullName;
                        this.countryName=feeder.countryName;
                        this.stateName=feeder.stateName;
                        this.locationName=feeder.locationName;
                        this.schoolName=feeder.schoolName;
                        this.departmentName=feeder.departmentName;
                        this.instituteName=feeder.instituteName;
                        this.aliceAuthorId=feeder.AliasUserId;
                        this.correspondingEmail=feeder.correspondingEmail;
                        this.correspondingAuthor=feeder.correspondingAuthor;    
                          }
                        console.log(this.status)
                        if(this.status=="Linked"){
                          this.typeId=1;
                        }
                        if(this.status=="Manual"){
                          this.typeId=5;  
                        }
                        if(this.status=="CrossRef"){
                          this.typeId=4; 
                        }
                
                        const saveRFS={
                          rfsPatentLinkQueue: {
                            rfsPatentQueueId: Number(this.rfsRequestId),
                            universityId: Number(this.patRequestDetail.universityId),
                            userId: Number(this.patRequestDetail.userId),
                            applicationNumber: this.patRequestDetail.applicationNumber,
                            patentId: this.pubsid,
                            patentTitle: this.patRequestDetail.patentTitle,
                            patentOfficeId: 0,
                            webLink: "",
                            pdFfileLocation: this.patRequestDetail.pdfFileLocation,
                            rfsTypeId: this.typeId,
                            actionTypeId: 0,
                            remark: "",
                            workflowstatusId: 0,
                            swappedInventorUserId: 0,
                            swappedApplicantUserId: 0,
                            takenBy: 0,
                            verifiedBy: this.loginuserId
                          },
                          dfsrfsPatentApplicants: [
                            {
                              universityId: 0,
                              universityName: "string",
                              userId: 0,
                              fullName: "string",
                              countryId: 0,
                              countryName: "string",
                              stateId: 0,
                              stateName: "string",
                              locationId: 0,
                              locationName: "string",
                              schoolId: 0,
                              schoolName: "string",
                              instituteId: 0,
                              instituteName: "string",
                              departmentId: 0,
                              departmentName: "string",
                              correspondingEmail: "string",
                              correspondingAuthor: false,
                              aliasUserId: 0,
                              aliasUserUniversityId: 0,
                              patentApplicantMapId: 0,
                              patentApplicantSeq: 0,
                              isUserAddressSame: false,
                              PatentAplicntInvntrTypeId: 0
                            }
                          ],
                          dfsrfsPatentInventors: [
                            {
                              universityId: this.universityId,
                              universityName: this.universityName,
                              userId: this.userId,
                              fullName: this.fullName,
                              countryId: this.countryId,
                              countryName: this.countryName,
                              stateId: this.stateId,
                              stateName: this.stateName,
                              locationId: this.locationId,
                              locationName: this.locationName,
                              schoolId: this.schoolId,
                              schoolName: this.schoolName,
                              instituteId: this.instituteId,
                              instituteName: this.instituteName,
                              departmentId: this.departmentId,
                              departmentName: this.departmentName,
                              correspondingEmail: this.correspondingEmail,
                              correspondingAuthor: this.correspondingAuthor,
                              aliasUserId: this.aliceAuthorId,
                              aliasUserUniversityId: parseInt(this.patRequestDetail.universityId),
                              patentInventorMapId: 0,
                              patentInventorSeq: 0,
                              isUserAddressSame: this.disableInput,
                              PatentAplicntInvntrTypeId: 0
                            }
                          ]
                        } 
                                  console.log(saveRFS);   
                                  const confirmation = confirm('Confirm to save article');           
                                  if (confirmation) {
                                    this.facService.savePatentLink(saveRFS,this.user.UserId,this.roleId).subscribe(x=>{                   
                                      if(this.roleId==11){
                                        this.router.navigate(['/Patent/rfs/'+this.patRequestDetail.universityId]); 
                                      } 
                                      else{
                                        this.router.navigate(['/Patent/rfs/university']); 
                                      }        
                                    })
                                  }
               }

               onSelectTitle(val,id){
                this.searchData=val;
                this.pubsid=id;
                console.log("publicationid="+this.pubsid);
                console.log(this.searchData);   
                this.titleEnable=false;
                this.linkEnable=true;
              }
        
           changeTitle(x){
                  
                  if(x.length>=2){
                  this.facService.getAppNoList(x).subscribe(data=>{
                    this.filterTitle=data;
                    this.titleEnable=true;
                   if(this.filterTitle.length==0||this.filterTitle.length==""){
                      this.searchData=x;
                      this.titleEnable=false; 
                      this.addEnable=true;
                    }
                  }) 
                }
                if(x.length==0||x==""){
                  this.titleEnable=false; 
                  this.searchData=x;
                  this.linkEnable=false;
                }
                }
          
           addTitle(data){
            if(this.searchData!=null){
              localStorage.setItem("patentDFS",this.rfsRequestId);
              this.router.navigate(['/Patent/add/dfs/patent/ext/res/ai/'+this.patRequestDetail.universityId+'/RFS']);
            }
            
          }

         linkPublication(){

            if(this.linkEnable){ 
                  console.log( this.pubsid);
               this.adminclient.getPatentEvalById(this.rfsRequestId,this.pubsid).subscribe(data => {
                this.requestuserDetail = data as any;
                this.patRequestDetail=this.requestuserDetail.rfsPatRequestedUserDetail;
                this.requestAuthorDetail=this.requestuserDetail.rfsInventorDetailsforPatent;
                this.applicantList= this.requestuserDetail.rfsApplicantDetailsforPatent;
                 console.log(this.requestuserDetail);
               });
               this.showCrossAuthor=true;    
             }

           }

           //for pdf view
           testNew(pdfLoc){

            if(pdfLoc!=null){
            pdfLoc=pdfLoc.slice(0, pdfLoc.lastIndexOf('.'));
            console.log(pdfLoc);             
              this.tempPdf=pdfLoc;     
             const pdfurl=`${environment.nodeServerUrl}/api/pdf?pdfPath=${this.tempPdf}`;
             this.http.get(pdfurl, { responseType: 'blob' }).subscribe((blob: Blob) => {
               const pdfUrl = URL.createObjectURL(blob);
               window.open(pdfUrl, '_blank');
             });
            }
            else{
              alert("Pdf not found")
            }      
         }

         SearchState(event,i){
          if (event == "") {
            this.ipStateDrop = false;
          } else {
            this.ipStateDrop = true;
            this.facService.getDropdown('State').subscribe(x => {
              this.stateList = x;
              this.stateFilter=Array.from(new Set(this.stateList.map(item => JSON.stringify({value : item.value})))).map((t: any) => JSON.parse(t));
            })
          }
        }

          //common list of institute
          SearchInstitute(event,i){
            if(event==""){
              this.ipInstituteDrop=false;
            }
            else{
              this.ipInstituteDrop=true;
              this.facService.NoncusUniversityInst(event).subscribe(x=>{
                this.instituteList=x;
                if(this.instituteList.length>0){
                this.uniqueinstNames=Array.from(new Set(this.instituteList.map(item => JSON.stringify({name : item.name})))).map((t: any) => JSON.parse(t));
                console.log(this.uniqueinstNames);
                }
              })
            }
          }

              //common list of institute
              SearchInstituteApp(event,i){
                if(event==""){
                  this.ipInstituteDropApp=false;
                }
                else{
                  this.ipInstituteDropApp=true;
                  this.facService.NoncusUniversityInst(event).subscribe(x=>{
                    this.instituteList=x;
                    if(this.instituteList.length>0){
                    this.uniqueinstNames=Array.from(new Set(this.instituteList.map(item => JSON.stringify({name : item.name})))).map((t: any) => JSON.parse(t));
                    console.log(this.uniqueinstNames);
                    }
                  })
                }
              }

          SearchSchool(event, i){
            if (event == "") {
              this.ipSchoolDrop = false;
            }
            else {
              this.ipSchoolDrop = true;
              this.facService.NoncusUniversitySch(event).subscribe(x => {
                this.schoolList = x;
                if(this.schoolList.length>0){
                  this.uniqueschlNames=Array.from(new Set(this.schoolList.map(item => JSON.stringify({name : item.name})))).map((t: any) => JSON.parse(t));
                  console.log(this.uniqueschlNames);
                  }
              })
            }
          }

          SearchSchoolApp(event, i){
            if (event == "") {
              this.ipSchoolDropApp = false;
            }
            else {
              this.ipSchoolDropApp = true;
              this.facService.NoncusUniversitySch(event).subscribe(x => {
                this.schoolList = x;
                if(this.schoolList.length>0){
                  this.uniqueschlNames=Array.from(new Set(this.schoolList.map(item => JSON.stringify({name : item.name})))).map((t: any) => JSON.parse(t));
                  console.log(this.uniqueschlNames);
                  }
              })
            }
          }

            //common list of institute
            SearchDepartment(event,i){
              if(event==""){
                this.ipDepartmentDrop=false;
              }
              else{      
                this.ipDepartmentDrop=true;
                this.facService.NoncusUniversityDept(event).subscribe(x=>{
                  this.departmentList=x;
                })
              }
            }

              //common list of institute
              SearchDepartmentApp(event,i){
                if(event==""){
                  this.ipDepartmentDropApp=false;
                }
                else{      
                  this.ipDepartmentDropApp=true;
                  this.facService.NoncusUniversityDept(event).subscribe(x=>{
                    this.departmentList=x;
                  })
                }
              }
            
            onselectInstitute(name,id,i){
              this.ipInstituteDrop=false;
              this.feeders[i].instituteId=id;
              this.feeders[i].instituteName=name;
            }

            onselectInstituteApp(name,id,i){
              this.ipInstituteDropApp=false;
              this.feedersApp[i].instituteId=id;
              this.feedersApp[i].instituteName=name;
            }

            onselectDepartment(name,id,i){
              this.ipDepartmentDrop=false;
              this.feeders[i].departmentId=id;
              this.feeders[i].departmentName=name;
            }

            onselectDepartmentApp(name,id,i){
              this.ipDepartmentDropApp=false;
              this.feedersApp[i].departmentId=id;
              this.feedersApp[i].departmentName=name;
            }

            //Capture values in corres author
            corresAuthor(val:string,i){
              this.feeders[i].correspondingAuthor = val;
              console.log(val);
              
            }
            corresAuthorApp(val:string,i){
              this.feedersApp[i].correspondingAuthor = val;
              console.log(val);
              
            }

            baseDeptfilter(event,i){
              console.log(event);
              const dept=this.filteredList.filter(d=>d.departmentName==event)
              this.feeders[i].departmentId=dept[0].departmentId;
              console.log(dept[0].departmentId);     
          }

          baseDeptfilterApp(event,i){
            console.log(event);
            const dept=this.filteredList.filter(d=>d.departmentName==event)
            this.feedersApp[i].departmentId=dept[0].departmentId;
            console.log(dept[0].departmentId);     
        }

          baseInstfilter(event,i){
            console.log(event);
            const inst=this.filteredList.filter(d=>d.instituteName==event)
            this.feeders[i].instituteId=inst[0].instituteId;
            console.log(inst[0].instituteId);   
          }

          baseInstfilterApp(event,i){
            console.log(event);
            const inst=this.filteredList.filter(d=>d.instituteName==event)
            this.feedersApp[i].instituteId=inst[0].instituteId;
            console.log(inst[0].instituteId);   
          }

          baseLocfilter(event,i){
            console.log(event);
            const inst=this.filteredList.filter(d=>d.locationName==event)
            this.feeders[i].locationId=inst[0].locationId;
            console.log(inst[0].locationId);   
          }

          baseLocfilterApp(event,i){
            console.log(event);
            const inst=this.filteredList.filter(d=>d.locationName==event)
            this.feedersApp[i].locationId=inst[0].locationId;
            console.log(inst[0].locationId);   
          }

          baseSchfilter(event,i){
              console.log(event);
              const inst = this.filteredList.filter(d => d.schoolName == event)
              this.feeders[i].schoolId = inst[0].schoolId;
              console.log(inst[0].schoolId);
            }

            baseSchfilterApp(event,i){
              console.log(event);
              const inst = this.filteredList.filter(d => d.schoolName == event)
              this.feedersApp[i].schoolId = inst[0].schoolId;
              console.log(inst[0].schoolId);
            }

          baseCounfilter(event,i){ 
            console.log(event);
            const country=this.countryList.filter(d=>d.name==event)
            this.feeders[i].countryId=country[0].id;
            console.log(country[0].id);   
          }

          customFilter = function (university: any[], u: string): any[] {
            return university.filter(x => x.name.toLowerCase().startsWith(u.toLowerCase()));
          }

          newStateModel(model:any){
            this.modalService.open(model);
          }

          countryFilter(event, i){

            this.facService.getAvailableCountry().subscribe(x=>{
              this.FilterCountry=x;
              const country = this.FilterCountry.filter(item=> item.countryName===event);
              const id =country[0].countryId;
              console.log(id);
              if(event=="India"){
                this.enableState=true;
               }
               else{
                 this.enableState=false;
               }
              this.feeders[i].countryId = id;
              this.feeders[i].countryName = event;
              this.facService.getAvailableState(id).subscribe(x=>{
              this.filteredState=x;
                console.log(x);
              })
            })
          }

          countryFilterApp(event, i){

            this.facService.getAvailableCountry().subscribe(x=>{
              this.FilterCountry=x;
              const country = this.FilterCountry.filter(item=> item.countryName===event);
              const id =country[0].countryId;
              console.log(id);
              if(event=="India"){
                this.enableState=true;
               }
               else{
                 this.enableState=false;
               }
              this.feedersApp[i].countryId = id;
              this.feedersApp[i].countryName = event;
              this.facService.getAvailableState(id).subscribe(x=>{
              this.filteredState=x;
                console.log(x);
              })
            })
          }

          stateFilters(event,i){
            const state=this.filteredState.filter(x=>x.stateName===event)
            let id=state[0].stateId;
            this.feeders[i].stateId = id;
            console.log(id);   
            this.feeders[i].stateName = event;
            this.facService.getAvailableLocation(this.feeders[i].countryId,id).subscribe(x=>{
              console.log(x);
              this.filterLocation=x;      
            })
        }

        stateFiltersApp(event,i){
          const state=this.filteredState.filter(x=>x.stateName===event)
          let id=state[0].stateId;
          this.feedersApp[i].stateId = id;
          console.log(id);   
          this.feedersApp[i].stateName = event;
          this.facService.getAvailableLocation(this.feedersApp[i].countryId,id).subscribe(x=>{
            console.log(x);
            this.filterLocation=x;      
          })
      }

        LocationFilter(event,i){
          const location=this.filterLocation.filter(x=> x.locationName===event)
          this.feeders[i].locationName=event;
          let id=location[0].locationId;
          this.feeders[i].locationId = id;
        }

        LocationFilterApp(event,i){
          const location=this.filterLocation.filter(x=> x.locationName===event)
          this.feedersApp[i].locationName=event;
          let id=location[0].locationId;
          this.feedersApp[i].locationId = id;
        }

        countryModelFilter(event:any){
          this.facService.getAvailableCountry().subscribe(x=>{
            this.FilterCountryModel=x;
            const country = this.FilterCountryModel.filter(item=> item.countryName===event);
            const id =country[0].countryId;
            console.log(id);
            this.countryModelId = id;
            this.facService.getAvailableState(this.countryModelId).subscribe(x=>{
            this.filteredStateModel=x;
              console.log(x);
            })
          })
        }

        SearchStateModel(name){
          if(name.length>0){
            this.stateModelEnable=true;
            this.filterStateList=this.filteredStateModel?.filter(item => item.stateName.toLowerCase().includes(name.toLowerCase()));
            console.log(this.filterStateList);
               
            if(this.filterStateList.length==0){
              this.stateModelEnable=false;
              this.stateModelId=0;
              this.stateModel=name;
            }
          } 
          else{
            this.stateModelEnable=false;
          }  
      
        }

        selectStateModel(name,id){
          this.stateModelEnable=false;
          this.stateModel=name;
          this.stateModelId=id;
        }

        stateModelFilter(name){
          const stateFilter =this.filteredStateModel?.filter(item => item.stateName===name);
          this.stateModelId=stateFilter[0].stateId;
          this.stateModel=name;
    }

        addLocation(){
          const data={
            countryId:this.countryModelId,
            countryName:this.countryModel,
            stateId:this.stateModelId,
            stateName:this.stateModel,
            locationId:this.newLocationId,
            locationName:this.newLocationName
          }
           console.log(data);
           this.facService.newLocation(data,this.user.UserId).subscribe(x=>{
            console.log(x);
            alert("Details added successfully");
            this.modalService.dismissAll();
           })
          }      

  }
  