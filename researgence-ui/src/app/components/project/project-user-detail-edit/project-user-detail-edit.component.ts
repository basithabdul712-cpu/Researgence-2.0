import { AdminclientService } from '../../adminclient/adminclient.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectBasicDetail } from 'src/app/shared/model/projectPayload.model';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { NumberToWordsService } from 'src/app/shared/services/numbertorupees.service';
import { FacultiesService } from '../../faculties/faculties.service';
import { GeneralApiService } from '../../general-api.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment';

interface Grant {
  grantName:string;
  fromYear: string;
  toYear: string;
  tempFromYr:string;
  tempToYr:string;
  disbursementDate: string;
  disbursementAmt: number;
  inWords: string;
  docUpload: string;
  docPath: string;
  duration: string;
  uploadedFile?: File;
  sequenceNo:string;
}


@Component({
  selector: 'app-project-user-detail-edit',
  templateUrl: './project-user-detail-edit.component.html',
  styleUrls: ['./project-user-detail-edit.component.scss','./../../../../assets/given/selected.css','./../../../../assets/given/newcss/style.css']
})
export class ProjectUserDetailEditComponent implements OnInit {



  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  stickyEnable: any;
  isScrolled: any;
  public projectId:string="";
  public userName:string;
  public user:any=[];
  Name: any;
  role: any;
  roleName: any;
  outcomeList:any=[];
  Author:any;
  ipAutherDrop = false;
  allowedAuthorText:number=2;
  currentStep = 0;
  editRowId: any;
  checkDataauthor: any;
  layerInsSchCamDep:any;
  researchList:any;
  newTag: string = '';
  researchArea:string;
  pdfName:string;
  fileProj: File | null = null;
  ipDropdown:boolean=false;
  fill:any=[];
  universityFilter:any;
  tags = [];
  steps = ['Basic Info','Grant Info','Team Info'];
  // 'Grant Info'

  items = [
    { label: 'Publication', checked: false, text: '' },
    { label: 'Patent', checked: false, text: '' },
    { label: 'Conference', checked: false, text: '' },
    { label: 'Technology-Product/Process', checked: false, text: '' }
  ];

  fieldsets = [
    {
      universityId: 0,
      universityName: '',
      userId: 0,
      fullName: '',
      countryId: 0,
      countryName: '',
      stateId: 0,
      stateName: '',
      locationId: null,
      locationName: '',
      schoolId:null,
      schoolName: '',
      instituteId: null,
      instituteName: '',
      departmentId: null,
      departmentName: '',
      aliasUserId: 0,
      aliasUserUniversityId: 0,
      projectInvestigatorMapId: 0,
      projectInvestigatorMapSeq: 0,
      projectInvestigatorMapSeqUI: 0,
      projectInvestigatorRoleId: 0,
      projectInvestigatorRoleName: '',
      projectInvestigatortypeId: 0,
      projectInvestigatortypeName: '',
      isUserAddressSame: 0,
      mobileNo: '',
      emailId: '',
      schoolEnable: true
    }
  ];
  
  grants: Grant[] = [
    // {
    //   grantName:'',
    //   fromYear: '',
    //   toYear: '',
    //   tempFromYr:'',
    //   tempToYr:'',
    //   disbursementDate: '',
    //   disbursementAmt: 0,
    //   inWords: '',
    //   duration:'',
    //   docPath: '',
    //   docUpload: '',
    //   sequenceNo: ''
    // }
  ];
  projectList:any;

  // Basic Info
  projectBasicDl:ProjectBasicDetail;


// Grant Info
  cutOffvalue:string;
  cutoffDt: any;
   currentYear = new Date() .getFullYear();
   maxDate: Date = new Date(this. currentYear, 11,31);
   tempfromYear:string;
   fromYear: number;
   temptoYear:string;
   toYear: number;
   public universityparamId:Number;
   isMenuOpen:boolean;
   roleList:any;
   grantDetail:any=[];

  //  Dropdown var
  projectPdfPath:any;
  projectStatusList:any;
  projectFundingType:any;
  projectFundingAgency:any;
  projectFundingAgencyType:any;
  projectGrantDl:any;
  projectTeamDl:any=[];
  projectOutcomesDl:any;

  cidDropdown:any;
  layerType:any;
  tempList:any;
  layerSchool:any;
  layerInst:any;
  filteredDept:any;
  layerCampus:any;
  layerDept:any;
  layerFilter:any;

  projectOutcomeList:any;
  projectOutcome:any;
  projectInvRoleList:any;
  projectInvTypeList:any;
  univName:string
  researchDrop:boolean=false;
  researchname:any;
  grantEnable:boolean=false;
  userid:any;

  constructor(private service:AdminclientService, private authservice:AuthService,private route: ActivatedRoute,private search: CommonsearchService,private gservice:GeneralApiService,
    private menuService:MenuService,private numtoWords:NumberToWordsService, private router:Router, private http: HttpClient, private facultyservice: FacultiesService,private excel:ExcelExportService) { }

        ngOnInit() {


          const currentUser = localStorage.getItem("currentUser");
         if (currentUser) {
            try {
              // Parse it into an object
              const userObj = JSON.parse(currentUser);
              
              // Access the UserId property
              this.userid = userObj.UserId;  // or userObj['UserId'] if you prefer
              console.log('UserId:', this.userid);
            } catch (error) {
              console.error('Error parsing currentUser from localStorage', error);
            }
         }  
          this.projectBasicDl=new ProjectBasicDetail();
          this.user=this.authservice.getUserDetail();
          this.univName=this.user.University;
          this.layerType=this.user.LayerType
          console.log(this.user);

          this.menuService.isMenuOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
          });
          
          this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          this.userName=this.authservice.getProfileObs();
           //For rolename getting
          //  this.authservice.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
            this.role=JSON.parse(localStorage.getItem('RoleSelection'));
            const data=this.role.filter(item=> item.roleId==this.userName);
            this.roleName=data[0].roleName;
            console.log(this.roleName)
            // }) 

            this.route.params.subscribe(params => {     
              this.projectId=params.projectId;  
            });

            this.facultyservice.getRoleList(this.user.UniversityId,this.userName).subscribe(x=>{
              this.roleList=x;
              console.log(this.roleList);
              
            })    

            this.gservice.getProjectDrop('PROJECTSTATUS').subscribe(x=>{
              this.projectStatusList=x;
            });

            this.gservice.getProjectDrop('PROJECTFUNDINGTYPE').subscribe(x=>{
              this.projectFundingType=x;           
            });

            this.gservice.getProjectDrop('PROJECTFUNDINGAGENCY').subscribe(x=>{
              this.projectFundingAgency=x;           
            });

            this.gservice.getProjectDrop('PROJECTFUNDINGAGENCYTYPE').subscribe(x=>{
              this.projectFundingAgencyType=x;           
            });

            this.gservice.getProjectDrop('PROJECTINVESTIGATORROLE').subscribe(x=>{
              this.projectInvRoleList=x;           
            });

            this.gservice.getProjectDrop('PROJECTINVESTIGATORTYPE').subscribe(x=>{
              this.projectInvTypeList=x;           
            });


            this.gservice.getProjectDrop('PROJECTOUTCOMETYPE').subscribe(x=>{
              this.projectOutcome=x;      
              const updatedData = this.projectOutcome.map(item => ({
                ...item,
                checked: false,
                text: ''
                }));    
            
               this.projectOutcomeList=updatedData;
            });

            this.service.getUniversitytitle(this.user.UserId).subscribe(data => {
              this.universityFilter = data;
             });

            this.facultyservice.getResearchAreaList().subscribe(x=>{
              this.researchList=x;    
            })

            this.facultyservice.GetPath(this.user.UniversityId, this.user.UserId, '3').subscribe(x => {
              this.projectPdfPath = x;
              console.log(this.projectPdfPath);  
              if(this.projectPdfPath){
                 let projectFolderLoc = "C:\\"+this.projectPdfPath.folderPath+"&name=project-"+this.projectId;
                let imageUrl= `${environment.nodeServerUrl}/createfolder?basePath=${projectFolderLoc}`;
                console.log(imageUrl);
                
                this.http.get(imageUrl, { responseType: 'text' }).subscribe(
                  (response) => {
                    console.log(response);
     
                  });  
              }           
            });

           this.gservice.fetchProjectUserDetail(this.projectId,this.user.UniversityId).subscribe((x:any)=>{
            console.log(x);
            this.projectList=x;
            this.projectBasicDl=this.projectList.projectBasicDetail;
            
            if(this.projectBasicDl.projectSanctionedDocPath==null||this.projectBasicDl.projectSanctionedDocPath==""||this.projectBasicDl.projectSanctionedDocPath==undefined){
                  
            }
            else{
              const fileName = this.projectBasicDl.projectSanctionedDocPath.split('\\').pop()?.split('-').pop();
              this.pdfName=fileName;
              console.log(this.pdfName);

            }
          
             this.researchArea=this.projectBasicDl.projectTechnologyAreas;
            if(this.projectBasicDl.projectTechnologyAreas!=null){
              this.tags=this.projectBasicDl.projectTechnologyAreas.split(";");
              }

            if(this.projectList.projectGrantDisbursement.length>0){

              this.grantEnable=true;
                this.projectGrantDl=this.projectList.projectGrantDisbursement;
                 if(this.projectGrantDl.length>0){
                    for(let i=0;i<this.projectGrantDl.length;i++){

                      if(this.projectGrantDl[i].grantPeriodFrom!=null||this.projectGrantDl[i].grantPeriodFrom!=""){
                        const date = new Date(this.projectGrantDl[i].grantPeriodFrom);
                        const year = date.getFullYear();
                        this.projectGrantDl[i].fromYear = year.toString();
                        this.projectGrantDl[i].tempFromYr = year.toString();
                       }

                       if(this.projectGrantDl[i].grantPeriodTo!=null||this.projectGrantDl[i].grantPeriodTo!=""){
                        const date = new Date(this.projectGrantDl[i].grantPeriodTo);
                        const year = date.getFullYear();
                        this.projectGrantDl[i].toYear = year.toString();
                        this.projectGrantDl[i].tempToYr = year.toString();
                       }

                       if(this.projectGrantDl[i].disbursementDocPath==null||this.projectGrantDl[i].disbursementDocPath==""||this.projectGrantDl[i].disbursementDocPath==undefined){
                         
                          this.projectGrantDl[i].disbursementDocPath="";
                       }
                       else{
                        const parts = this.projectGrantDl[i].disbursementDocPath.split(/[/\\]/);
                        const fileName = parts[parts.length - 1];
                        this.projectGrantDl[i].disbursementDocPath=fileName;
                       }

                       if(this.projectGrantDl[i].disburstmentDate){
                         this.projectGrantDl[i].disburstmentDate = this.projectGrantDl[i].disburstmentDate.split('T')[0];
                       }
                       else{
                          this.projectGrantDl[i].disburstmentDate = null;
                       }

                      this.grants.push({
                        grantName: "grant"+this.projectGrantDl[i].projectGrantDisbursementSeqNo,
                        fromYear: this.projectGrantDl[i].fromYear,
                        toYear: this.projectGrantDl[i].toYear,
                        tempFromYr:this.projectGrantDl[i].tempFromYr,
                        tempToYr:this.projectGrantDl[i].tempToYr,
                        disbursementDate: this.projectGrantDl[i].disburstmentDate,
                        disbursementAmt: this.projectGrantDl[i].disbursedAmount,
                        inWords: this.projectGrantDl[i].disbursedAmountInwords,
                        duration:this.projectGrantDl[i].duration,
                        docPath: this.projectGrantDl[i].disbursementDocPath,
                        docUpload: this.projectGrantDl[i].disbursementDocPath,
                        sequenceNo: this.projectGrantDl[i].projectGrantDisbursementSeqNo
                      });
                      
                    }
                 }
                
            }

            if(this.projectList.projectInvestigators.length>0){
                 this.projectTeamDl=this.projectList.projectInvestigators;
            }

            if(this.projectList.projectOutcome.length>0){
              this.projectOutcomesDl=this.projectList.projectOutcome;
              this.populateProjectOutcomesFromResponse(this.projectOutcomesDl);
             }

            if(this.projectBasicDl.projectStartDate!=null){
                this.projectBasicDl.projectStartDate=this.projectBasicDl.projectStartDate.split('T')[0];   
            }

            if(this.projectBasicDl.projectEndDate!=null){
                this.projectBasicDl.projectEndDate=this.projectBasicDl.projectEndDate.split('T')[0];   
            }

            if(this.projectBasicDl.projectCompletionDate!=null){
                this.projectBasicDl.projectCompletionDate=this.projectBasicDl.projectCompletionDate.split('T')[0];
            }
            
            console.log(this.projectBasicDl);
   
           });

           this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.userName,this.user.UserId,null,null,null,null).subscribe(x=>{
            this.layerFilter=x;
            
            if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
                this.layerInsSchCamDep=this.layerFilter;
                this.layerCampus=Array.from(new Set(this.layerFilter.map((item : any)=>item.locationName)))
            }
            else if(this.layerType=='4LType2'||this.layerType=='3LType3'){
              this.layerInsSchCamDep=this.layerFilter;
              this.layerSchool=Array.from(new Set(this.layerFilter.map((item : any)=>item.schoolName)))
            }
            else if(this.layerType=='2LType1'){
              this.layerInsSchCamDep=this.layerFilter;
              this.layerInst=Array.from(new Set(this.layerFilter.map((item : any)=>item.instituteName)))
            }
            else if(this.layerType=='2LType2'){
              this.layerInsSchCamDep=this.layerFilter;
              this.layerDept=this.layerFilter;
            }   
          });

        }

        calcDuration(){
    
          if(this.projectBasicDl.projectStartDate!=undefined&&this.projectBasicDl.projectEndDate!=undefined){
              const date1 = new Date(this.projectBasicDl.projectStartDate);
              const date2 = new Date(this.projectBasicDl.projectEndDate);
              // Get difference in milliseconds
              const diffMs = date2.getTime() - date1.getTime();

              const diffDays = diffMs / (1000 * 60 * 60 * 24);

              const diffYears = diffDays / 365.25; 
              
              const diffYearsRounded = parseFloat(diffYears.toFixed(1));
              console.log(diffYearsRounded);
              this.projectBasicDl.projectDurationInYears=diffYearsRounded;
          }
         
      }

      onDrop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.projectTeamDl, event.previousIndex, event.currentIndex);
        for(let i=0;i<this.projectTeamDl.length;i++){
           this.projectTeamDl[i].tempId=i;
        }
      }

          goToStep(index: number) {
            this.currentStep = index;
          }

          nextStep() {
            if (this.currentStep < this.steps.length - 1) {
              this.currentStep++;
            } else {
              // Perform your submit logic here
              this.saveProjectDetail();
              alert('Form submitted!');
            }
          }

          changeCutOff (val){
            let tempCutoff=this. formatDate(val);
            this.cutOffvalue= tempCutoff;
            }

            
            formatDate(input: string): string {
            const date = new Date(input);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1) .padStart(2, '0'); // Months are 0-indexed
            const year = date.getFullYear();
            return '${day}/${month}/${year}';
            }

            hidden= false;

          @ViewChild('remainingScreen', { static: true }) remainingScreenRef!: ElementRef;
          isRevealed = false;

          revealScreen(e:Event): void {

            e.preventDefault();
            console.log("clicked to display!")
            this.hidden=true;

          }

          onCheckboxChange(item,id,val) {
            if (!item.checked) {
              item.text = '';
            }
          }
        
          removeInput(item) {
            item.checked = false;
            item.text = '';
          }


          addGrant() {
            this.grantEnable=true;
            this.grants.unshift({
              grantName: '',
              fromYear: '',
              toYear: '',
              tempFromYr:'',
              tempToYr:'',
              disbursementDate: '',
              disbursementAmt: 0,
              inWords: '',
              docUpload: '',
              duration:'',
              docPath: '',
              sequenceNo:''
            });
          }
        
          removeGrant(index: number) {
            this.grants.splice(index, 1);
          }


        
          submitGrant() {
    
            // You can implement form submission here.
             let projectFolderLoc = "C:\\"+this.projectPdfPath.folderPath+"\\project-"+this.projectId;
            const uploadUrl = `${environment.nodeServerUrl}/upload-grants-bulk?basePath=${projectFolderLoc}`;
            console.log('Upload URL:', uploadUrl);
        
            const formData = new FormData();
        
            // Validate grants
            // const grantsValid = this.grants.every(grant => grant.grantName && grant.uploadedFile);
            // if (!grantsValid) {
            //     alert('Each grant must have a pdf.');
            //     return;
            // }
        
            // Prepare grants JSON without the uploadedFile property
            const grantsToSend = this.grants.map(({ uploadedFile, ...rest }) => rest);
            console.log('Sending grants:', grantsToSend);
            formData.append('grants', JSON.stringify(grantsToSend));
        
            // Append files in order
            this.grants.forEach(grant => {
              if (grant.uploadedFile) {
                  formData.append('files', grant.uploadedFile, grant.uploadedFile.name);
              }
             });
        
            this.http.post(uploadUrl, formData, { responseType: 'text' }).subscribe(
                response => {
                    // alert('PDFs uploaded successfully!');
                    console.log('Response:', response);
                },
                error => {
                    alert(' Upload failed.');
                    console.error('Error:', error);
                });

          }


          onAmountChange() {
            if(this.projectBasicDl.projectSanctionedAmount>0){
            const num = parseFloat(this.projectBasicDl.projectSanctionedAmount.toString());
                  if (!isNaN(num)) {
                    this.projectBasicDl.projectSanctionedAmountInWords = this.numtoWords.convertToRupeesWords(num);
                  } else {
                    this.projectBasicDl.projectSanctionedAmountInWords = '';
                  }
                 }
                  else{
                    this.projectBasicDl.projectSanctionedAmountInWords = ''
                  }
           }

           onAmtChangeGrant(i){
            
            if(this.grants[i].disbursementAmt>0){
              const num = parseFloat(this.grants[i].disbursementAmt.toString());
                    if (!isNaN(num)) {
                      this.grants[i].inWords = this.numtoWords.convertToRupeesWords(num);
                    } else {
                      this.grants[i].inWords = '';
                    }
                   }
                    else{
                      this.grants[i].inWords = ''
                    }
           }

           delete(index: any) {
          
            this.projectTeamDl.splice(index, 1);
          }

           addFieldset() {

            // this.fieldsets[0].universityId=parseInt(this.user.UniversityId);
            this.fieldsets[0].aliasUserUniversityId=parseInt(this.user.UniversityId);
            // this.fieldsets[0].universityName=this.univName;

              this.projectTeamDl.push(this.fieldsets[0])
              this.fieldsets=[];
                this.fieldsets.push({
                    universityId: 0,
                    universityName: '',
                    userId: 0,
                    fullName: '',
                    countryId: 0,
                    countryName: '',
                    stateId: 0,
                    stateName: '',
                    locationId: null,
                    locationName: '',
                    schoolId:null,
                    schoolName: '',
                    instituteId: null,
                    instituteName: '',
                    departmentId: null,
                    departmentName: '',
                    aliasUserId: 0,
                    aliasUserUniversityId: 0,
                    projectInvestigatorMapId: 0,
                    projectInvestigatorMapSeq: 0,
                    projectInvestigatorMapSeqUI: 0,
                    projectInvestigatorRoleId: 0,
                    projectInvestigatorRoleName: '',
                    projectInvestigatortypeId: 0,
                    projectInvestigatortypeName: '',
                    isUserAddressSame: 0,
                    mobileNo: '',
                    emailId: '',
                    schoolEnable: true
                });
          }
        
          removeFieldset(index: number) {
            this.fieldsets.splice(index, 1);
          }

          changeType(val,i){
              const tempType = this.projectInvTypeList.filter(x=> x.value==val);
              this.fieldsets[i].projectInvestigatortypeId=tempType[0].id;
          }

          changeRole(val,i){
            const tempRole = this.projectInvRoleList.filter(x=> x.value==val);
            this.fieldsets[i].projectInvestigatorRoleId=tempRole[0].id;
          }

          onKeyIP(x, val, data) {
            this.ipDropdown = true;
            this.fill = this.universityFilter.filter(e =>
              e.universityName.toLowerCase().includes(val.toLowerCase())
            );
            if(this.fill.length==0){
              this.ipDropdown = false;
              this.fieldsets[data].universityId=0;
            }
          }

          SearchIPData(text: string, val, author) {
            //for assign yes to first author
            // const tempauthor = this.checkValues.authors;
            // console.log(tempauthor);
            console.log(author);
  
            if(val.length==0){
              this.allowedAuthorText=2;
              this.ipAutherDrop = false;
            }

            if (val.length >this.allowedAuthorText) {
            this.facultyservice.AuthorSearch(this.fieldsets[author].universityId, val).subscribe(data => {
              this.Author = data;
              this.allowedAuthorText=this.allowedAuthorText+2;
              if (this.Author == "") {
                this.toggle(author);
              }
              else {
                this.toggle("editdisable");
              }
              if (this.Author) {
                this.ipAutherDrop = true;
                this.checkDataauthor = author;
              }
              if (this.Author == "") {
                this.ipAutherDrop = false;
                this.checkDataauthor = author;
                this.fieldsets[author].fullName = val;
                this.fieldsets[author].userId = 0;
                this.fieldsets[author].countryName="";
                this.fieldsets[author].stateName="";
                this.fieldsets[author].locationName="";
                this.fieldsets[author].schoolName="";
                this.fieldsets[author].instituteName="";
                this.fieldsets[author].departmentName="";
                this.fieldsets[author].aliasUserId=0;
               }

              });
            }
          }

          toggle(val) {
            this.editRowId = val;
          }

          onLeaveAuthor(name,index,desc){
           
            this.ipAutherDrop = false;
            this.toggle(index);
          
              this.fieldsets[index].fullName = name;
              this.fieldsets[index].userId = 0;
              this.fieldsets[index].countryName="";
              this.fieldsets[index].stateName="";
              this.fieldsets[index].locationName="";
              this.fieldsets[index].schoolName="";
              this.fieldsets[index].instituteName="";
              this.fieldsets[index].departmentName="";
             
              this.toggle(index);
            
          }

          onAutherClick(universityid,userid,name: string,deptid, dept: string,instid, inst: string,locationid, loca: string,countryid, coun: string, cemail: string,cauthor:Number, val,stateId,state:string,schoolId,school:string, desc,linkid,linkname:string) {
            this.filteredDept=this.tempList;
            this.fieldsets[val].universityId=universityid;
            this.fieldsets[val].fullName = name;
            this.fieldsets[val].userId = userid;
            this.fieldsets[val].departmentId= deptid;
            this.fieldsets[val].departmentName = dept;
            this.fieldsets[val].instituteId =instid;
            this.fieldsets[val].instituteName = inst;
            this.fieldsets[val].locationId =locationid;
            this.fieldsets[val].locationName = loca;
            this.fieldsets[val].countryId =countryid;
            this.fieldsets[val].countryName = coun;
            this.fieldsets[val].aliasUserId =linkid;
            this.fieldsets[val].stateId = stateId;
            this.fieldsets[val].stateName = state;
            this.fieldsets[val].schoolId = schoolId;
            this.fieldsets[val].schoolName = school;
            this.ipAutherDrop = false;
            console.log(this.fieldsets);
            this.toggle("editdisable");
      }

      clearAll(){
        this.fieldsets=[];
        this.fieldsets.push({
                    universityId: 0,
                    universityName: '',
                    userId: 0,
                    fullName: '',
                    countryId: 0,
                    countryName: '',
                    stateId: 0,
                    stateName: '',
                    locationId: null,
                    locationName: '',
                    schoolId:null,
                    schoolName: '',
                    instituteId: null,
                    instituteName: '',
                    departmentId: null,
                    departmentName: '',
                    aliasUserId: 0,
                    aliasUserUniversityId: 0,
                    projectInvestigatorMapId: 0,
                    projectInvestigatorMapSeq: 0,
                    projectInvestigatorMapSeqUI: 0,
                    projectInvestigatorRoleId: 0,
                    projectInvestigatorRoleName: '',
                    projectInvestigatortypeId: 0,
                    projectInvestigatortypeName: '',
                    isUserAddressSame: 0,
                    mobileNo: '',
                    emailId: '',
                    schoolEnable: true
        });    
      }


      newEdit(val){

            this.fieldsets=[];
            this.editRowId = val;

            this.fieldsets.push(this.projectTeamDl[val]);    

            this.filteredDept=this.tempList;

            this.projectTeamDl.splice(val,1);
      
            console.log(this.fieldsets);

            this.facultyservice.getUnivLocSchInstDept(this.fieldsets[0].universityId, this.userName, this.user.UserId,null,null,null,null).subscribe(x => {
              this.layerFilter=x;
              
              if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
                      this.layerInsSchCamDep=this.layerFilter;
                      this.layerCampus=Array.from(new Set(this.layerFilter.map((item : any)=>item.locationName)))
                  }
                  else if(this.layerType=='4LType2'||this.layerType=='3LType3'){
                    this.layerInsSchCamDep=this.layerFilter;
                    this.layerSchool=Array.from(new Set(this.layerFilter.map((item : any)=>item.schoolName)))
                  }
                  else if(this.layerType=='2LType1'){
                    this.layerInsSchCamDep=this.layerFilter;
                    this.layerInst=Array.from(new Set(this.layerFilter.map((item : any)=>item.instituteName)))
                  }
                  else if(this.layerType=='2LType2'){
                    this.layerInsSchCamDep=this.layerFilter;
                    this.layerDept=this.layerFilter;
                  }   
             });
          
       }


      changeStatus(val){

        if(val!=null||val!=undefined){
          let tempStatus = this.projectStatusList.filter(item => item.value==val);
          this.projectBasicDl.projectStatusId = parseInt(tempStatus[0].id);
        } 
        else{
          this.projectBasicDl.projectStatusId = 0;
          this.projectBasicDl.projectStatusName = "";
        }      
     }

    changeFundAgencyType(val){
      if(val!=null||val!=undefined){
          let tempFundAgencyType = this.projectFundingAgencyType.filter(item => item.value==val);
          this.projectBasicDl.projectFundingAgencyTypeId= parseInt(tempFundAgencyType[0].id);
      } 
      else{
        this.projectBasicDl.projectFundingAgencyTypeId=0;
        this.projectBasicDl.projectFundingAgencyTypeName="";
      }            
    }

    changeFundType(val){
      if(val!=null||val!=undefined){
          let tempFundType = this.projectFundingType.filter(item => item.value==val);
          this.projectBasicDl.projectFundingTypeId= parseInt(tempFundType[0].id);
      } 
      else{
        this.projectBasicDl.projectFundingTypeId=0;
        this.projectBasicDl.projectFundingTypeName="";
      }            
    }

    changeFundAgency(val){
      if(val!=null||val!=undefined){
          let tempFundAgency = this.projectFundingAgency.filter(item => item.value==val);
          this.projectBasicDl.projectFundingAgencyId= parseInt(tempFundAgency[0].id);
      } 
      else{
        this.projectBasicDl.projectFundingAgencyId=0;
        this.projectBasicDl.projectFundingAgencyName="";
      }              
    }

    addTag(tag?: string) {
      const tagToAdd = tag ? tag : this.newTag.trim();
      if (tagToAdd && !this.tags.includes(tagToAdd)) {
        this.tags.push(tagToAdd);
        this.researchArea=this.tags.toString();   
        console.log(this.researchArea);
            
      }
      this.newTag = '';
    }

    onResearcher(data){    
      if(data==""||data==null){
        this.researchDrop=false;    
       }
       else{
      this.researchname=this.researchList.filter(e =>
        e.value.toLowerCase().includes(data.toLowerCase()));
        this.researchDrop=true;
      }
    }

    onInputTag(value){  
      this.researchDrop=false;     
      this.tags.push(value);
      if(this.tags.length==1){
        this.researchArea=this.tags[0];
      }
      else{
      this.researchArea=this.tags.join(';');
      }     
    }

    removeTag(tag: string) {
      const index = this.tags.indexOf(tag);
      if (index !== -1) {
        this.tags.splice(index, 1);
        this.researchArea=this.tags.toString();
      }
    }

    selectFileProject(event){
      this.fileProj = event.target.files[0] as File;
      console.log(this.fileProj);
  
      if (this.fileProj) {
        this.pdfName=this.fileProj.name;
        const fileSize = this.fileProj.size / 1024 / 1024; // Size in MB
        const maxSize = 10; // Maximum allowed size in MB
  
        if (fileSize <= maxSize) {
          console.log(`Selected file size: ${fileSize} MB`);
        } else {
          alert("Please choose a file with file size below 10MB")
          event.target.value = '';
        }
      }

    }

    projectPdfName: string | null = null;
    projectpdfStatus:boolean=false;

    uploadFileProject() {
              
      return new Promise((resolve, reject) => {
      if (!this.fileProj) {
        return;
      }
  
      if (this.fileProj.type == 'application/pdf') {
        const formData = new FormData();
        formData.append('image', this.fileProj);

          let name = this.fileProj.name.slice(0, this.fileProj.name.lastIndexOf('.'));
          console.log(name);
          this.projectPdfName = this.user.UserId + "-" + name;

          let pdfProjectPath= this.projectPdfPath.folderPath+"\\project-"+this.projectId;
  
        const uploadUrl = `${environment.nodeServerUrl}/uploadpdf?userId=${this.projectPdfName}&pdfPath=${pdfProjectPath}`;
        console.log(uploadUrl);
  
        this.http.post(uploadUrl, formData, { responseType: 'text' }).subscribe(
          (response) => {
            // alert('PDF uploaded successfully!')
            console.log('Response:', response);
            this.projectpdfStatus = true;
            resolve(response);
          },
          (error) => {
            alert('Error uploading pdf');
            console.error('Error uploading pdf:', error);
            this.projectpdfStatus = false;
            reject(error);
          }
        );
      }
        else {
        alert("Please choose a file with file type pdf");
        this.projectpdfStatus = false;
         }
       });
    }

    projectpdfPostName:string | null =null;
    projectpdfLocation:string | null =null;

    saveProjectDetail(){
      
      if(this.fileProj!=null){
          this.uploadFileProject().then(()=>{
                let imgsplit = this.fileProj.type.split("/");
                console.log(imgsplit);
                this.projectpdfPostName = "." + imgsplit[1];
                this.projectpdfLocation = this.projectPdfPath.folderPath+"\\"+this.projectId+ "\\" + this.projectPdfName + this.projectpdfPostName;
                this.projectBasicDl.projectSanctionedDocPath=this.projectpdfLocation;

                if(this.researchArea==""){
                  this.researchArea=null;
                 }
            
                this.projectBasicDl.projectTechnologyAreas=this.researchArea;
                this.projectBasicDl.sourceUniversityId=parseInt(this.user.UniversityId);   
                  
                  // this.grantDetail
                  if(this.grants.length>0){
                    for(let k=0; k<this.grants.length;k++){
                      this.grantDetail.push({
                        projectGrantDisbursementId: 0,
                        projectId: this.projectId,
                        projectGrantDisbursementSeqNo: parseInt(this.grants[k].sequenceNo)||0,
                        grantPeriodFrom: this.grants[k].tempFromYr,
                        grantPeriodTo: this.grants[k].tempToYr,
                        duration: this.grants[k].duration,
                        disburstmentDate: this.grants[k].disbursementDate === "" ? null : this.grants[k].disbursementDate,
                        disbursedAmount: this.grants[k].disbursementAmt.toString(),
                        disbursedAmountInwords: this.grants[k].inWords,
                        disbursementDocPath: this.grants[k].docPath
                      });
                    }
                    if(this.grantEnable){
                      this.submitGrant();
                    }
                  }
                  
                if(this.projectTeamDl.length>0){
                  for(let j=0;j<this.projectTeamDl.length;j++){

                    this.projectTeamDl[j].universityId = parseInt(this.projectTeamDl[j].universityId); 

                    if(this.projectTeamDl[j].locationId==null){
                      this.projectTeamDl[j].locationId=0;
                    }
                    if(this.projectTeamDl[j].schoolId==null){
                      this.projectTeamDl[j].schoolId==0;    
                    }  
                    if(this.projectTeamDl[j].instituteId==null){
                      this.projectTeamDl[j].instituteId==0;    
                    } 
                    if(this.projectTeamDl[j].departmentId==null){
                      this.projectTeamDl[j].departmentId==0;    
                    }          
                    delete this.projectTeamDl[j].schoolEnable;
                  }
                }
                else{
                  this.projectTeamDl=[];
                }
  

                const data={
                      projectBasicDetail: this.projectBasicDl,
                      projectGrantDisbursement: this.grantDetail,
                      projectInvestigators: this.projectTeamDl,
                      projectOutcome: []
                }

                console.log(data);
              
            this.facultyservice.addNewProject(data,this.user.UserId,this.userName).subscribe(x=>{
              console.log("Data save suceessfully");
              this.router.navigate(['Project/user/edit/'+this.userid]);
             });      
           });
         }

        else{

                this.projectpdfLocation = null;
                if(this.projectBasicDl.projectSanctionedDocPath==null||this.projectBasicDl.projectSanctionedDocPath==""||this.projectBasicDl.projectSanctionedDocPath==undefined){
                  this.projectBasicDl.projectSanctionedDocPath=this.projectpdfLocation;
                }
                if(this.researchArea==""){
                      this.researchArea=null;
                }
                
                this.projectBasicDl.projectTechnologyAreas=this.researchArea;
                this.projectBasicDl.sourceUniversityId=parseInt(this.user.UniversityId);
            
                // const response = this.projectOutcomeList
                // .filter(item => item.checked && item.text.trim() !== "")
                // .map(item => ({
                //     projectOutcomeDetailsId: 0,
                //     projectId: this.projectId,
                //     projectOutcomeTypeId: parseInt(item.id, 10),
                //     projectOutcomeTypeName: item.value,
                //     projectOutcomeURL: item.text.trim()
                // }));
  
                //   console.log(response);
                //   this.projectOutcomesDl=response;

                if(this.grants.length>0){
                  for(let k=0; k<this.grants.length;k++){
                
                      this.grantDetail.push({
                        projectGrantDisbursementId: 0,
                        projectId: parseInt(this.projectId),
                        projectGrantDisbursementSeqNo: parseInt(this.grants[k].sequenceNo)||0,
                        grantPeriodFrom: this.grants[k].tempFromYr,
                        grantPeriodTo: this.grants[k].tempToYr,
                        duration: this.grants[k].duration,
                        disburstmentDate: this.grants[k].disbursementDate === "" ? null : this.grants[k].disbursementDate,
                        disbursedAmount: this.grants[k].disbursementAmt.toString(),
                        disbursedAmountInwords: this.grants[k].inWords,
                        disbursementDocPath: this.grants[k].docPath
                      });
                            
                  }

                  if(this.grantEnable){
                    this.submitGrant();
                  }
                                       
                }
                console.log(this.grantDetail);
                

              for(let j=0;j<this.projectTeamDl.length;j++){

                this.projectTeamDl[j].universityId = parseInt(this.projectTeamDl[j].universityId);

                  if(this.projectTeamDl[j].locationId==null){
                    this.projectTeamDl[j].locationId=0;
                  }
                  if(this.projectTeamDl[j].locationName==""){
                    this.projectTeamDl[j].locationName=null;
                  }

                  if(this.projectTeamDl[j].schoolId==null){
                    this.projectTeamDl[j].schoolId==0;    
                  }  

                  if(this.projectTeamDl[j].schoolName==""){
                    this.projectTeamDl[j].schoolName=null;
                  }
                  if(this.projectTeamDl[j].instituteId==null){
                    this.projectTeamDl[j].instituteId==0;    
                  } 

                  if(this.projectTeamDl[j].instituteName==""){
                    this.projectTeamDl[j].instituteName=null;
                  }
                  if(this.projectTeamDl[j].departmentId==null){
                    this.projectTeamDl[j].departmentId==0;    
                  }       
                  if(this.projectTeamDl[j].departmentName==""){
                    this.projectTeamDl[j].departmentName=null;
                  }      
                  delete this.projectTeamDl[j].schoolEnable;
                }

          const data={
                projectBasicDetail: this.projectBasicDl,
                projectGrantDisbursement: this.grantDetail,
                projectInvestigators: this.projectTeamDl,
                projectOutcome: [] 
          }

          console.log(data);
        
            this.facultyservice.addNewProject(data,this.user.UserId,this.userName).subscribe(x=>{
              console.log("Data save suceessfully"); 
              this.router.navigate(['Project/user/edit/'+this.userid]);
            });   
          
        }
   }

   populateProjectOutcomesFromResponse(response: any) {
    if (!response) return;

    response.forEach((outcome: any) => {
        const match = this.projectOutcomeList.find(item => 
            item.id === outcome.projectOutcomeTypeId.toString()
        );

        if (match) {
            match.checked = true;
            match.text = outcome.projectOutcomeURL ?? '';
        }
    });
}


filters(val,i){ 
  
  if(val=="loc"){
      
    if(this.fieldsets[i].locationName==""){
      this.fieldsets[i].locationId=null;
     }
    else{
      const filterLoc=this.layerInsSchCamDep.filter(item => item.locationName===this.fieldsets[i].locationName);
      this.fieldsets[i].locationId=filterLoc[0].locationId;
    }
    this.fieldsets[i].schoolId=null;
    this.fieldsets[i].instituteId=null;
    this.fieldsets[i].departmentId=null;
    this.fieldsets[i].schoolName="";
    this.fieldsets[i].instituteName="";
    this.fieldsets[i].departmentName="";

    this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.userName,this.user.UserId,this.fieldsets[i].locationId,this.fieldsets[i].schoolId,this.fieldsets[i].instituteId,this.fieldsets[i].departmentId).subscribe(x=>{
      console.log(x);
      if(this.layerType=="3LType1"){
      this.layerInst=x;
      this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
      const filterData = (data: any[]) => {
        return data.filter(item => item.instituteName !== null);
      };
      this.layerInst=filterData(this.layerInst);
      }
      else if(this.layerType=="3LType2"){
          this.layerDept=x;
      }
      else if(this.layerType=="4LType2"||this.layerType=="3LType3"||this.layerType=="4LType1"){
      this.layerSchool=x;
      this.layerSchool=Array.from(new Set(this.layerSchool.map((item : any)=>item.schoolName)))
      const filterData = (data: any[]) => {
        return data.filter(item => item.schoolName !== null);
      };
      this.layerSchool=filterData(this.layerSchool);
     }
    });

    }

    if(val=="scl"){

      if(this.fieldsets[i].schoolName==""){
        this.fieldsets[i].schoolId=null;
      }
      else{
        if(this.layerType=="4LType2"||this.layerType=="3LType3"){
          const schoolfilter=this.layerInsSchCamDep.filter(item=> item.schoolName==this.fieldsets[i].schoolName);
          this.fieldsets[i].schoolId=schoolfilter[0].schoolId;
        }
        else{
          const schoolfilter=this.layerInsSchCamDep.filter(item=> item.schoolName==this.fieldsets[i].schoolName&&item.locationName==this.fieldsets[i].locationName);
          this.fieldsets[i].schoolId=schoolfilter[0].schoolId;
        }       
      }
      
      this.fieldsets[i].instituteId=null;
      this.fieldsets[i].departmentId=null;
      this.fieldsets[i].instituteName="";
      this.fieldsets[i].departmentName="";

     this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.userName,this.user.UserId,this.fieldsets[i].locationId,this.fieldsets[i].schoolId,this.fieldsets[i].instituteId,this.fieldsets[i].departmentId).subscribe(x=>{
      console.log(x);
      this.layerInst=x;
      this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)));
      const filterData = (data: any[]) => {
        return data.filter(item => item.instituteName !== null);
      };
      this.layerInst=filterData(this.layerInst);
    });          
}   

    if(val=="inst"){

          if(this.fieldsets[i].instituteName==""){
            this.fieldsets[i].instituteId=null;
          }
        else{   
          if(this.layerType=="3LType1"){
            const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName==this.fieldsets[i].instituteName&&item.locationName==this.fieldsets[i].locationName)
            this.fieldsets[i].instituteId=instfilter[0].instituteId;
          }
          else if(this.layerType=="4LType2"||this.layerType=="3LType3"||this.layerType=="4LType1"){
            const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName==this.fieldsets[i].instituteName&&item.schoolName==this.fieldsets[i].schoolName)
            this.fieldsets[i].instituteId=instfilter[0].instituteId;
          }
          else{
          const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName==this.fieldsets[i].instituteName)
          this.fieldsets[i].instituteId=instfilter[0].instituteId;
          }   
             
          }

          this.fieldsets[i].departmentId=null;
          this.fieldsets[i].departmentName="";

        this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.userName,this.user.UserId,this.fieldsets[i].locationId,this.fieldsets[i].schoolId,this.fieldsets[i].instituteId,this.fieldsets[i].departmentId).subscribe(x=>{
          this.layerDept=x;
          const filterData = (data: any[]) => {
            return data.filter(item => item.departmentName !== null);
          };
          this.layerDept=filterData(this.layerDept);
        });

    }

    if(val=="dept"){
          if(this.fieldsets[i].departmentName==""){
            this.fieldsets[i].departmentId=null;
          }
        else{
          console.log(this.layerInsSchCamDep);
          const deptfilter=this.layerInsSchCamDep.filter(item=>item.departmentName==this.fieldsets[i].departmentName)
          this.fieldsets[i].departmentId=deptfilter[0].departmentId;
          console.log(this.fieldsets[i].departmentId);
          
        }
        this.facultyservice.getUnivLocSchInstDept(this.user.UniversityId,this.userName,this.user.UserId,this.fieldsets[i].locationId,this.fieldsets[i].schoolId,this.fieldsets[i].instituteId,this.fieldsets[i].departmentId).subscribe(x=>{
          console.log(x);
        });
      }

  }

      selectFileGrantInfo(event: Event, grant: any,i) {
          
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            grant.uploadedFile = file;
            grant.grantName="grant"+i;
            grant.sequenceNo=i;
            grant.docPath=this.projectPdfPath.folderPath+"\\project-"+this.projectId+"\\"+grant.grantName+"\\"+file.name;
            // this.projectId
            grant.docUpload =  file.name;
            console.log(`File selected for ${grant.grantName}:`, file.name);
        }
      }

        changeFromDt(val,i){
            const date = new Date(val);
            const year = date.getFullYear();
            this.grants[i].tempFromYr=year.toString()+"-01-01";
            console.log(year);
            
        }

        changeToDt(val,i){
          const date = new Date(val);
          const year = date.getFullYear();
          if(+this.grants[i].tempFromYr>year){
              alert("To year to be greater than from year");
              this.grants[i].toYear=null;
              return;
          }
            this.grants[i].tempToYr=year.toString()+"-12-31";
            console.log(year);

            if(this.grants[i].tempFromYr!=""&&this.grants[i].tempToYr!=""){
              const date1 = new Date(this.grants[i].tempFromYr);
              const date2 = new Date(this.grants[i].tempToYr);
              // Get difference in milliseconds
              const diffMs = date2.getTime() - date1.getTime();

              const diffDays = diffMs / (1000 * 60 * 60 * 24);

              const diffYears = diffDays / 365.25; 
              
              const diffYearsRounded = parseFloat(diffYears.toFixed(1));
              console.log(diffYearsRounded);
              this.grants[i].duration=diffYearsRounded.toString();
          }
          
      }

      filterschool:boolean=false;
      newfeed:any;
      filterdata:any;

      onInput(item: string, id: number, val) {

        // this.facultyservice.getLayerType(id, this.userName, this.user.UserId).subscribe(data => {
        //   this.newfeed = data;
        //   this.filterdata = this.newfeed.layerType;
        //   if(this.filterdata=="4LType1"||this.filterdata=="4LType2"||this.filterdata=="3LType3"){
        //     this.filterschool = true;
        //   }
        //   else{
        //     this.filterschool=false;
        //   }
        //   this.fieldsets[val].schoolEnable = this.filterschool;
          this.fieldsets[val].universityName = item;
          this.fieldsets[val].universityId = id;
          this.ipDropdown = false;
          this.facultyservice.getUnivLocSchInstDept(id, this.userName, this.user.UserId,null,null,null,null).subscribe(x => {
            this.layerFilter=x;
            
            if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
                    this.layerInsSchCamDep=this.layerFilter;
                    this.layerCampus=Array.from(new Set(this.layerFilter.map((item : any)=>item.locationName)))
                }
                else if(this.layerType=='4LType2'||this.layerType=='3LType3'){
                  this.layerInsSchCamDep=this.layerFilter;
                  this.layerSchool=Array.from(new Set(this.layerFilter.map((item : any)=>item.schoolName)))
                }
                else if(this.layerType=='2LType1'){
                  this.layerInsSchCamDep=this.layerFilter;
                  this.layerInst=Array.from(new Set(this.layerFilter.map((item : any)=>item.instituteName)))
                }
                else if(this.layerType=='2LType2'){
                  this.layerInsSchCamDep=this.layerFilter;
                  this.layerDept=this.layerFilter;
                }   
           });
        // })
    
      }

}
