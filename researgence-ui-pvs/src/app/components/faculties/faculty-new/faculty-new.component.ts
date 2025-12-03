import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditProfile } from 'src/app/shared/model/data.models';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { environment } from 'src/environments/environment';
import { AdminclientService } from '../../adminclient/adminclient.service';
import { FacultiesService } from '../faculties.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-faculty-new',
  templateUrl: './faculty-new.component.html',
  styleUrls: ['./../../../../assets/given/selected.css', './../../../../assets/given/css/style-vit1.css', './../../../../assets/given/css/style-vit2.css', './../../../../assets/given/css/style.css', './../../../../assets/given/css/bootstrap.min.css','./faculty-new.component.scss'],})
export class FacultyNewComponent implements OnInit {

  fullName:string;
  designationId:Number;
  departmentId:Number;
  genderId:Number;
  dateOfBirth:string;
  dateOfJoining:string;
  googleScholarId:string;
  instituteId:Number;
  schoolId:Number;
  locationId:Number;
  orcid:string="";
  researchArea:string="";
  scopusId:string="";
  titleId:any;
  universityId:Number;
  userId:Number;
  roleIds:string;
  vidwanId:string="";
  wosId:string="";
  userStatusId:any;
  Data:any;
  filteredGenders: any[]=[]; 
  filteredDesignations: any[] = [];
  filteredUniversity:any[]=[];
  filteredUserStatus:any[]=[];
  user:any=[];
  existDetails:any=[];
  genderName:any;
  universityName:any;
  designationName:any;
  schoolName:any;
  departmentName:any;
  instituteName:any;
  locationName:any;
  cidDropdown:any=[];
  userDetail:EditProfile;
  fileToUpload: File = null;
  designationFilter:any[];
  genderFilter:any[];
  universityFilter:any[];
  departmentFilter:any[];
  instituteFilter:any[];
  locationFilter:any[];
  roleId:any;
  University:string;
  empId:string;
  imageUrl: string;
  Faculty: boolean = false;
  Scholar: boolean = false;
  Student: boolean = false;
  hoc: boolean = false;
  hoi: boolean = false;
  hod: boolean = false;
  hos:boolean = false;
  Librarian:boolean= false;
  ciAdmin:boolean=false;
  ciSupport:boolean=false;
  ciSupportAdmin:boolean=false;
  ciSuperAdmin:boolean=false;
  ciDev:boolean=false;
  layerType:any;
  Management: boolean = false;
  Admin:boolean=false;
  universityNew:boolean=false;
  isMenuOpen: boolean;
  filteredDept:any;
  tempRoleId:string[]=[];
  temproles:any;
  roleIdss: string;
  auth: any[];
  Author: any;
  searchAuthor: any;
  showsDropdown = false;
  userStatusIds: number;
  filteredTitle: any[];
  title: any;
  uniqlocattion:any;
  uniqschool:any;
  titleIdNew: any;
  newUser:boolean=false;
  enableUniv:boolean=false;
  universityList:any;
  showsUnivDropdown:boolean=false;
  univfilterList:any;
  roleList:any;
  selectedUnivRoleList:any;
  selectedUnivRole:any;
  layer:any;
  uniqInst:any;
  locationFilterId:Number;
  schoolFilterId:Number;
  instituteFilterId:Number;
  deptFilterId:Number;
  layerCampus:any;
  layerSchool:any;
  layerInst:any;
  layerDept:any;
  submitted: boolean=false;
  layerInsSchCamDep:any;
  emailId:string;

    constructor(private menuService: MenuService, private service: FacultiesService,
    private http: HttpClient,private datePipe: DatePipe, private clientService: AdminclientService,
    private router:Router,private authService:AuthService) { 
        }

        ngOnInit() {
          //for accessing menuopen 
          this.menuService.isMenuOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
          });

          //To get details from login
            this.user=this.authService.getUserDetail();
            console.log(this.user);
            this.layer=this.user.LayerType;
            this.roleId=this.authService.getProfileObs();
            console.log(this.roleId);

          if(this.roleId=='12'){
            this.enableUniv=true;
            this.clientService.GetUniversity(this.user.UserId,this.roleId).subscribe(x=>{
            this.universityList=x;
            this.univfilterList=this.universityList     
            console.log(x);        
           })
          }
          else{
          this.universityName=this.user.University;
        }
          console.log(this.universityName);
          console.log(this.user);
          this.layer=this.user.LayerType;
          this.service.getDropdown('gender').subscribe(response => {
            this.filteredGenders = response as any[];
            console.log(response);
          });
          this.service.getDropdown('Designation').subscribe(response => {
            this.filteredDesignations = response as any[];
            console.log(response);
          });
          this.service.getUnivertyList().subscribe(response=>{
            this.filteredUniversity= response as any[];
            console.log(response);         
          });
          this.service.getUserStatusList().subscribe(response=>{
            this.filteredUserStatus= response as any[];
            console.log(response);         
          });
          this.service.getTitle().subscribe(response=>{
            this.filteredTitle= response as any[];
            console.log(response);         
          });

       if(this.roleId=='5'){
          this.service.getUnivLocSchInstDept(this.user.UniversityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
                this.cidDropdown=x;  
                console.log(this.cidDropdown);
                if(this.layer=='3LType1'||this.layer=='3LType2'||this.layer=='4LType1'){
                  this.layerInsSchCamDep=this.cidDropdown;
                  this.layerCampus=Array.from(new Set(this.cidDropdown.map((item : any)=>item.locationName)))
              }
              else if(this.layer=='4LType2'||this.layer=='3LType3'){
                this.layerInsSchCamDep=this.cidDropdown;
                this.layerSchool=Array.from(new Set(this.cidDropdown.map((item : any)=>item.schoolName)));
              }
              else if(this.layer=='2LType1'){
                this.layerInsSchCamDep=this.cidDropdown;
                this.layerInst=Array.from(new Set(this.cidDropdown.map((item : any)=>item.instituteName)));
              }
              else if(this.layer=='2LType2'){
                this.layerInsSchCamDep=this.cidDropdown;
                this.layerDept=this.cidDropdown;
              }                              
          });  
        }     
          
          this.service.getRoleList(this.user.UniversityId,this.roleId).subscribe(x=>{
            this.roleList=x;
            console.log(x);           
          });
          
        }         
       
        // Edit Image
      
        handleFileInput(files: FileList) {
          this.fileToUpload = files.item(0);
        }

        SearchName(text: string) {
          if(this.roleId!='12'){
          const univ= this.filteredUniversity.filter(item => item.name==this.universityName);
          this.universityId=univ[0].id;
          }
          console.log("universityid is " + this.universityId)
          this.service.AuthorSearch(this.universityId, text).subscribe(data => {
            this.Author = data;
            this.searchAuthor = data;
            // this.dfeeder=this.feeder;
            console.log("Author");
            console.log(this.Author);

            this.showsDropdown = this.fullName.length > 0;
            this.auth = this.Author.filter(e =>
              e.authorName.toLowerCase().includes(this.fullName.toLowerCase())
            );
          });
        }

      onNameClick(name: string) {
        this.fullName= name;
        this.showsDropdown = false;
      }

      SearchUnivName(val){
        this.showsUnivDropdown=true;
        this.univfilterList=this.universityList.filter(x=>x.universityName.toLowerCase().includes(val.toLowerCase()));
            
      }

      onUnivClick(name,id){
        this.universityId=id;
        this.service.getRoleList(this.universityId,this.roleId).subscribe(x=>{
          this.roleList=x;
          console.log(x);           
        });
        this.universityName=name;
        this.universityId=id;
        this.showsUnivDropdown=false;
        this.service.getLayerType(id,this.roleId,this.user.UserId).subscribe(x=>{
        console.log(x);      
        this.selectedUnivRoleList=x;  
        this.selectedUnivRole=this.selectedUnivRoleList.layerType;
        this.layer=this.selectedUnivRole; 
        this.service.getUnivLocSchInstDept(id,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
          this.cidDropdown=x;  
          
          if(this.layer=='3LType1'||this.layer=='3LType2'||this.layer=='4LType1'){
            this.layerInsSchCamDep=this.cidDropdown;
            this.layerCampus=Array.from(new Set(this.cidDropdown.map((item : any)=>item.locationName)))
        }
        else if(this.layer=='4LType2'||this.layer=='3LType3'){
          this.layerInsSchCamDep=this.cidDropdown;
          this.layerSchool=Array.from(new Set(this.cidDropdown.map((item : any)=>item.schoolName)));
          console.log(this.layerSchool); 
        }
        else if(this.layer=='2LType1'){
          this.layerInsSchCamDep=this.cidDropdown;
          this.layerInst=Array.from(new Set(this.cidDropdown.map((item : any)=>item.instituteName)));
        }
        else if(this.layer=='2LType2'){
          this.layerInsSchCamDep=this.cidDropdown;
          this.layerDept=this.cidDropdown;
        }                                      
    });  
        })       
    
      }

        AddData(){
          this.submitted=true;

         
            if(this.roleId=='5'){
                const univ= this.filteredUniversity.filter(item => item.name==this.universityName);
                this.universityId=univ[0].id;
                console.log(this.universityId);
              
            }

            if(this.genderName!=null||this.genderName!=undefined){
              const genId=this.filteredGenders.filter(d=>d.value==this.genderName);    
              this.genderId=genId[0].id;
              console.log(this.genderId);
            }
            else{
              this.genderName=null;
            }
          
            if(this.designationName!=null||this.designationName!=undefined){
              const desId=this.filteredDesignations.filter(d=>d.value==this.designationName);
              this.designationId=desId[0].id;
              console.log(this.designationId);
            }
            else{
              this.designationName=null;
            }
            
            if(this.userStatusId!=null||this.userStatusId!=undefined){
              const userstatusId=this.filteredUserStatus.filter(d=>d.value==this.userStatusId);
              this.userStatusIds=userstatusId[0].id;
              console.log(this.userStatusIds); 
            }
            else{
               this.userStatusId=null;
            }
        
            if(this.titleId!=null||this.titleId!=undefined){
              const userTitle=this.filteredTitle.filter(d=>d.value==this.titleId);
              console.log(userTitle);
              this.titleIdNew=userTitle[0].id;
              console.log(this.titleId); 
            }
            else{
              this.titleId=null;
            }
           
              this.userId=0;
              console.log(this.userId);

              if(this.dateOfBirth==null){
                this.dateOfBirth="0001-01-01";
              }
              else{
                this.dateOfBirth = new DatePipe('en-US').transform(this.dateOfBirth, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
                }
                if(this.dateOfJoining==null){
                  this.dateOfJoining="0001-01-01";
                }
                else{
                  this.dateOfJoining = new DatePipe('en-US').transform(this.dateOfJoining, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
                  }

                  if(this.schoolFilterId==null){
                    this.schoolFilterId=0;
                  }
                  if(this.locationFilterId==null){
                    this.locationFilterId=0;
                  }
                  if(this.instituteFilterId==null){
                    this.instituteFilterId=0;
                  }
                  if(this.deptFilterId==null){
                    this.deptFilterId=0;
                  }
              
                  const Data={
                    universityId: this.universityId,
                    userId: this.userId,
                    employeeId:this.empId,
                    titleId: this.titleIdNew,
                    fullName: this.fullName,
                    genderId: this.genderId,
                    dateOfBirth: this.dateOfBirth,
                    dateOfJoining: this.dateOfJoining,
                    orcid: this.orcid,
                    scopusId: this.scopusId,
                    wosId: this.wosId,
                    vidwanId: this.vidwanId,
                    googleScholarId: this.googleScholarId,
                    designationId: this.designationId,
                    locationId: this.locationFilterId,
                    schoolId:this.schoolFilterId,
                    instituteId: this.instituteFilterId,
                    departmentId: this.deptFilterId,
                    researchArea: this.researchArea,
                    UserStatusId:this.userStatusIds,
                    roleIds:this.roleIds,
                    IsFileUploaded:0,
                    ActualFileName:"",
                    eMailId:this.emailId 

                    }
                    console.log(Data);
                    if(this.fullName!=undefined&&!this.newUser&&this.universityId!=undefined&&this.universityId!=null&&this.titleIdNew!=undefined
                      &&this.titleIdNew!=null&&this.genderId!=undefined&&this.genderId!=null&&this.userStatusIds!=undefined&&this.userStatusIds!=null&&this.roleIds!=undefined)
                    {
                    this.service.addProfile(Data,this.user.UserId,this.roleId).subscribe(x=>{            
                    // alert("Details Added Successfully");
                      const confirmation = confirm('Details Added Successfully');
                      if (confirmation) {
                        this.router.navigate(['clientadmin/user/screen']);
                      }
                    
                    },
                    (error) => {
                      console.error(error);
                      alert("Failed to Add details. Please check the entered data.");
                    })
                  }
                  else {
                    //alert("Please fill in required fields")
                  }
          }       

      updateValues(val) {


        this.submitted=true;
        const dataParts: any[] = [];

        if (this.Faculty  ) {
          dataParts.push('2');
          this.submitted=true;

        }
        if (this.Scholar ) {
          dataParts.push('3');
          this.submitted=true;

        }
        if (this.Student ) {
          dataParts.push('4');
          this.submitted=true;

        }
        if (this.Management ) {
          dataParts.push('6');
          this.submitted=true;

        }
        if (this.Admin ) {
          dataParts.push('5');
          this.submitted=true;

        }
        if (this.hoc) {
          dataParts.push('7');
          this.submitted=true;

        }
        if (this.hoi ) {
          dataParts.push('8');
          this.submitted=true;

        }
        if (this.hod ) {
          dataParts.push('9');
          this.submitted=true;

        }
        if(this.hos){
          dataParts.push('10');
          this.submitted=true;

        }
        if(this.ciSupport){
          dataParts.push('11');
          this.submitted=true;

        }
        if(this.ciSupportAdmin){
          dataParts.push('12');
          this.submitted=true;

        }
        if(this.ciSuperAdmin){
          dataParts.push('13');
          this.submitted=true;

        }
        if(this.ciDev){
          dataParts.push('14');
          this.submitted=true;

        }
        if(this.universityNew){
          dataParts.push('16');
          this.submitted=true;
        }
        if(this.Librarian){
          dataParts.push('17');
          this.submitted=true;
        }

        const data = dataParts.length > 0 ? dataParts.join(',') : "";       
          this.roleIds=data;
        
      }
  
      checkUserAvalability(data){
       
        if(this.roleId=='5'){
          this.universityId=this.user.UniversityId;
        }
        if(this.universityId!=undefined){
            this.service.getUserAvailablity(data,this.universityId).subscribe(x=>{
            if(x==null){
               this.newUser=false;
            }
            else{
               this.newUser=true;
            }     
            })
          }
          else{
            alert("Please fill university")
          }
      }

      filters(val){

        if(this.roleId=='5'){
          const univ= this.filteredUniversity.filter(item => item.name==this.universityName);
          this.universityId=univ[0].id;
          console.log(this.universityId);   
      }
            
        if(val=="loc"){
            
          if(this.locationName!=undefined){
            const filterLoc=this.layerInsSchCamDep.filter(item => item.locationName==this.locationName);
            this.locationFilterId=filterLoc[0].locationId;
           }
          else{
            this.locationFilterId=null;
          }
          this.schoolFilterId=null;
          this.instituteFilterId=null;
          this.deptFilterId=null;
          this.departmentName=null;
          this.service.getUnivLocSchInstDept(this.universityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
            console.log(x);
            
            if(this.layer=="3LType1"){
            this.layerInst=x;
            this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
            }
            else if(this.layer=="3LType2"){
                this.layerDept=x;
                console.log(x);
                
            }
            else if(this.layer=="4LType2"||this.layer=="3LType3"){
            this.layerSchool=x;
            this.layerSchool=Array.from(new Set(this.layerSchool.map((item : any)=>item.schoolName)))
              }
               });

          }

          if(val=="scl"){
            if(this.schoolName!=undefined){
               const schoolfilter=this.layerInsSchCamDep.filter(item=> item.schoolName==this.schoolName);
               this.schoolFilterId=schoolfilter[0].schoolId;
            }
           else{
             this.schoolFilterId=null;
           }
           this.instituteFilterId=null;
          this.deptFilterId=null;
          this.departmentName=null;
            this.service.getUnivLocSchInstDept(this.universityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
            console.log(x);
            this.layerInst=x;
            this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
          });          
      }   

          if(val=="inst"){

                if(this.instituteName!=undefined){
                    const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName==this.instituteName)
                    this.instituteFilterId=instfilter[0].instituteId;
                }
              else{
                this.instituteFilterId=null;
              }
              this.deptFilterId=null;
              this.departmentName=null;
              this.service.getUnivLocSchInstDept(this.universityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
                console.log(x);
                this.layerDept=x;
              });

          }

          if(val=="dept"){
                if(this.departmentName!=undefined){
                  const deptfilter=this.layerInsSchCamDep.filter(item=>item.departmentName==this.departmentName)
                  this.deptFilterId=deptfilter[0].departmentId;
                }
              else{
                this.deptFilterId=null;
               }
                this.service.getUnivLocSchInstDept(this.universityId,this.roleId,this.user.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
                console.log(x);
              });
            }
      }

}
