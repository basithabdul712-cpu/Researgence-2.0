import { AdminclientService } from './../../adminclient/adminclient.service';
import { filter } from 'rxjs/operators';
import { EditProfile } from './../../../shared/model/data.models';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { FacultiesService } from '../faculties.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-faculty-edit',
  templateUrl: './faculty-edit.component.html',
  styleUrls: ['./../../../../assets/given/selected.css', './../../../../assets/given/css/style-vit1.css', './../../../../assets/given/css/style-vit2.css', './../../../../assets/given/css/style.css', './../../../../assets/given/css/bootstrap.min.css','./faculty-edit.component.scss'],

})
export class FacultyEditComponent implements OnInit {
  @ViewChild('inputBox') inputBox!: ElementRef;
    fullName:string;
    loginuserName:string
    designationId:Number;
    departmentId:Number;
    genderId:Number;
    schoolId:Number;
    dateOfBirth:string;
    dateOfJoining:string;
    googleScholarId:string
    instituteId:Number;
    locationId:Number;
    orcid:string;
    researchArea:string;
    scopusId:string;
    titleId:Number;
    universityId:Number;
    userId:Number;
    roleIds:string;
    vidwanId:string;
    emailId:string;
    wosId:string;
    userStatusId:Number;
    Data:any;
    userStatusFilter:any[]=[];
    filteredGenders: any[]=[]; 
    filteredDesignations: any[] = [];
    filteredUniversity:any[]=[];
    user:any=[];
    existDetails:any=[];
    userstatusName:any;
    genderName:any;
    universityName:any;
    designationName:any;
    departmentName:any;
    instituteName:any;
    locationName:any;
    schoolName:any;
    cidDropdown:any=[];
    userDetail:EditProfile;
    fileToUpload: File = null;
    userfilter:any[];
    designationFilter:any[];
    genderFilter:any[];
    universityFilter:any[];
    departmentFilter:any[];
    instituteFilter:any[];
    locationFilter:any[];
    schoolFilter:any[];
    roleId:any;
    University:string;
    empId:Number;
    imageUrl: string;
    Faculty: boolean = false;
    Scholar: boolean = false;
    Student: boolean = false;
    hoc: boolean = false;
    hoi: boolean = false;
    hod: boolean = false;
    hos:boolean =false;
    universityNew:boolean=false;
    Librarian:boolean=false;
    layerType:any;
    Management: boolean = false;
    Admin:boolean=false;
    isMenuOpen: boolean;
    filteredDept:any;
    tempRoleId:string[]=[];
    temproles:any;
    roleIdss: string;
    public universid: any;
    public userid: any;
    //chip input
    researchList:any;
    researchname:any;
    tags = [];
    researchDrop:boolean=false;
    newTag: string = '';
    //For Image Upload
    file: File | null = null;
    fileOver: boolean = false;
    imagePathData:any;
    fileupload:Number=0;
    fileName:string="";
    userCredential:any;
    currentPassword:string="";
    newPassword:string="";
    cnfPassword:string="";
    mismatchMsg:boolean=false;
    msg:string="Password Mismatch";
    mail:string;
    enableMail:boolean=false;
    password;
    showPassword = false;
    mailValue:any;
    formattedDate: string;
    enableEdit:boolean=false;
    editableInput:boolean=false;
    roleList:any;
    univList:any;
    selectedUnivRoleList:any;
    tempList:any;
    layerSchool:any;
    layerInst:any;
    layerCampus:any;
    disablePassword:boolean=false;
    // Image view
    imgUrl: any;
    imgPath: any;
    userImage: string;
    isPhoto: boolean = true;

    constructor(private menuService: MenuService, private service: FacultiesService,private modalService: NgbModal,
    private http: HttpClient,private datePipe: DatePipe,private toastr: ToastrService,
      private router:Router,private authservice:AuthService,private route: ActivatedRoute,private adminService:AdminclientService, public authService:AuthService) {  
        }

        ngOnInit() {
          //for accessing menuopen 
          this.menuService.isMenuOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
          });

          this.route.paramMap.subscribe( paramMap => {
            this.universid = paramMap.get('UniversityId');
            this.userid = paramMap.get('UserId');
            
            console.log(this.universid);
            console.log(this.userid);
             });

          //To get details from login
          this.user=this.authservice.getUserDetail();
          this.roleId=this.authservice.getProfileObs();
          if(this.roleId=='12'||this.roleId=='5'||this.roleId=='17'){
            this.enableEdit=true;
            this.service.SearchUniversity().subscribe(x=>{
                  console.log(x);
                  this.univList=x;  
                  let filterUniv=this.univList.filter(item=>item.id==this.universid);
                  this.universityName=filterUniv[0].name;               
            });
            this.service.getLayerType(this.universid,this.roleId,this.userid).subscribe(x=>{
              console.log(x);      
              this.selectedUnivRoleList=x;  
              this.layerType=this.selectedUnivRoleList.layerType;
              
            })
          }
         
          else{
            this.universityName=this.user.University;
            console.log(this.universityName);
            this.layerType=this.user.LayerType;
          }

          this.password = 'password';
          console.log("loginroleid"+this.roleId);

          this.getResearchArea();

          //for image path
          this.service.GetPath(this.universid,this.user.UserId,'1').subscribe(x=>{
                    this.imagePathData=x;
                    console.log(this.imagePathData);
                    
          })

          this.fetchImage();

          this.service.getDropdown('gender').subscribe(response => {
            this.filteredGenders = response as any[];
            console.log(response);
          });
          this.service.getDropdown('Designation').subscribe(response => {
            this.filteredDesignations = response as any[];
            console.log(response);
          });
          this.service.getDropdown('userstatus').subscribe(response => {
            this.userStatusFilter = response as any[];
            console.log(response);
          })
          this.service.getUnivertyList().subscribe(response=>{
            this.filteredUniversity= response as any[];
            console.log(response);         
          })
          this.service.getUnivLocSchInstDept(this.universid,this.roleId,this.user.UserId,null,null,null,null).subscribe(x=>{
                this.cidDropdown=x; 
                this.tempList=this.cidDropdown;   
                console.log(this.cidDropdown);
                
                this.service.getProfileEdit(this.universid,this.userid).subscribe(x=>{
                  this.existDetails=x[0];
                  console.log(this.existDetails);               
                 
                  this.fullName=this.existDetails.fullName; 
                  this.loginuserName=this.existDetails.userName;
                  this.empId=this.existDetails.employeeId;  
                  this.titleId=this.existDetails.titleId;
                  this.userId=this.existDetails.userId;
                  this.googleScholarId=this.existDetails.googleScholarId;
                  this.orcid=this.existDetails.orcid;
                  this.researchArea=this.existDetails.researchArea;
                  this.emailId= this.existDetails.eMailId;
                  if(this.existDetails.researchArea!=null){
                  this.tags=this.existDetails.researchArea.split(",");
                  }
                  this.scopusId=this.existDetails.scopusId;
                  this.vidwanId=this.existDetails.vidwanId;
                  this.wosId=this.existDetails.wosId;

                if(this.filteredDesignations&&this.cidDropdown){
                  console.log(this.filteredDesignations);
                  console.log(this.cidDropdown);    
                  
                 if(this.roleId=='5'||this.roleId=='12'){   
                    this.enableMail=true;
                  this.service.getRoleList(this.universid,this.roleId).subscribe(x=>{
                          this.roleList=x;
                          console.log(this.roleList);
                          
                  })                 
                    if(this.existDetails.userStatusId==0){
                      this.existDetails.userStatusId=1;
                    }
                    this.userfilter=this.userStatusFilter.filter(t =>t.id==this.existDetails.userStatusId);
                     this.userstatusName=this.userfilter[0].value;
                    this.tempRoleId=this.existDetails.roleIds;
                    this.temproles=this.tempRoleId;
                    this.roleIds=this.existDetails.roleIds;
                    if(this.existDetails.roleIds!=null){
                    this.Admin=this.tempRoleId.includes('5');
                    this.Faculty=this.tempRoleId.includes('2');
                    this.Scholar=this.tempRoleId.includes('3');
                    this.Student=this.tempRoleId.includes('4');
                    this.Management=this.tempRoleId.includes('6');
                    this.hoc=this.tempRoleId.includes('7');
                    this.hod=this.tempRoleId.includes('9');
                    this.hoi=this.tempRoleId.includes('8');
                    this.hos=this.tempRoleId.includes('10');
                    this.universityNew=this.tempRoleId.includes('16');
                    this.Librarian=this.tempRoleId.includes('17');
                   }
                  }
                  else{
                    this.universityId=this.existDetails.universityId;
                    this.roleIds=this.existDetails.roleIds;
                    this.userStatusId=this.existDetails.userStatusId; 
                  }

                  if(this.existDetails.genderId!=null){
                  this.genderFilter=this.filteredGenders.filter(d=>d.id==this.existDetails.genderId);
                  this.genderName=this.genderFilter[0].value;
                }
                if(this.existDetails.designationId!=null){
                  this.designationFilter=this.filteredDesignations.filter(d=>d.id==this.existDetails.designationId);
                  this.designationName = this.designationFilter.length > 0 ? this.designationFilter[0].value : ''; 
                }                 
                
                
                if(this.existDetails.locationId!=null){
                  this.layerCampus=Array.from(new Set(this.tempList.map((item : any)=>item.locationName)))
                  if(this.layerType=="3LType1"){
                    this.layerInst=Array.from(new Set(this.tempList.map((item : any)=>item.instituteName)))
                    }
                    else if(this.layerType=="3LType2"){
                        this.filteredDept=this.tempList;
                    }
                    else if(this.layerType=="4LType2"||this.layerType=="3LType3"){
                    this.layerSchool=Array.from(new Set(this.tempList.map((item : any)=>item.schoolName)))
                   }
                  
                  this.locationFilter=this.cidDropdown.filter(item => item.locationId==this.existDetails.locationId);
                  this.locationName=this.locationFilter[0].locationName;
                  
                }

                if(this.existDetails.schoolId!=null){
                  this.layerSchool=Array.from(new Set(this.tempList.map((item : any)=>item.schoolName)))
                  this.schoolFilter=this.cidDropdown.filter(item=> item.schoolId==this.existDetails.schoolId);
                  this.schoolName=this.schoolFilter[0].schoolName;        
                }

                if(this.existDetails.instituteId!=null){
                  this.layerInst=Array.from(new Set(this.tempList.map((item : any)=>item.instituteName)))
                  this.instituteFilter=this.cidDropdown.filter(item => item.instituteId==this.existDetails.instituteId);
                  this.instituteName=this.instituteFilter[0].instituteName;
                  this.filteredDept= this.cidDropdown.filter(d=>d.instituteName==this.instituteName)
                }

               if(this.existDetails.departmentId!=null){
                  this.departmentFilter=this.cidDropdown.filter(item => item.departmentId==this.existDetails.departmentId);
                  this.departmentName=this.departmentFilter[0].departmentName;
                }         
                  
              }
                  //covert date format
                  const date = new Date(this.existDetails.dateOfBirth);
                   this.dateOfBirth = this.datePipe.transform(date, 'yyyy-MM-dd');  
                   if(this.dateOfBirth=="0001-01-01"||this.dateOfBirth==null){
                    this.formattedDate = null;
                    this.dateOfBirth=this.formattedDate;
                  }
                 const doj= new Date(this.existDetails.dateOfJoining);
                  this.dateOfJoining= this.datePipe.transform(doj, 'yyyy-MM-dd');    
                  if(this.dateOfJoining=="0001-01-01"||this.dateOfJoining==null){
                    this.formattedDate = null;
                    this.dateOfJoining=this.formattedDate;
                  }                         
              
                });                          
          });                
        }
  onFileSelected(event: any) {
    this.file = event.target.files[0] as File;
    console.log(this.file);
    if (this.file) {
      const fileSize = this.file.size / 1024 / 1024; // Size in MB
      const maxSize = 10; // Maximum allowed size in MB

      if (fileSize <= maxSize) {
        console.log(`Selected file size: ${fileSize} MB`);
      } else {
       alert("Please choose a file with file size below 10MB")
        event.target.value = '';
      }
    }
   
  }
  uploadFile() {

    return new Promise((resolve, reject) => {
    if (!this.file) {
      return;
    }
  if(this.file.type=="image/jpeg"||this.file.type=="image/png"){
    const formData = new FormData();
    formData.append('image', this.file);
    
    const uploadUrl = `${environment.nodeServerUrl}/upload?userId=${this.userid}&imgpath=${this.imagePathData.folderPath}`;
    console.log(uploadUrl);
    //${this.imagePathData.proposedFileName}
  
    this.http.post(uploadUrl, formData, { responseType: 'text' }).subscribe(
      (response) => {
        alert('File uploaded successfully!');
        console.log('Response:', response);
        resolve(response);
      },
      (error) => {
        alert('Error uploading Image');
        console.error('Error uploading Image:', error);
        reject(error);
      }
    );
  }
    });
  }

UpdateData(){

   if(this.file){
    let imgsplit=this.file.name.split(".");
    const imgtype="."+imgsplit[1];
    this.fileName=this.imagePathData.folderPath+"\\"+this.user.UserId+imgtype;
    console.log(this.fileName);
      this.fileupload=1;
   }
     
       if(this.roleId=='5'||this.roleId=='10'||this.roleId=='12'){
  //   if (this.universityName == this.universityFilter[0]?.name) {
      //     this.universityId = this.universityFilter[0]?.id;
            // }  
      if (this.filteredUniversity && this.filteredUniversity.length > 0) {
        const univ = this.filteredUniversity.filter(item => item.name == this.universityName);
        if (univ.length > 0) {
            this.universityId = univ[0]?.id;
        } else {
            console.error("No matching university found for name:", this.universityName);
      
        }
    } else {
        console.error("this.filteredUniversity is not defined or empty.");
  
    }

          const userStatus = this.userStatusFilter.filter(item => item.value==this.userstatusName);
          this.userStatusId=userStatus[0].id;
       }

        if(this.genderName==this.genderFilter[0].value){
          this.genderId = this.genderFilter[0].id;
         }
         else{
         const genId=this.filteredGenders.filter(d=>d.value==this.genderName);    
         this.genderId=genId[0].id;
         }
       if(this.designationFilter.length > 0 && this.designationName == this.designationFilter[0].value){
        this.designationId = this.designationFilter[0].id;
        
       }
       else {
        const desId = this.filteredDesignations.filter(d => d.value == this.designationName);
        if (desId.length > 0) {
            this.designationId = desId[0].id;
        } else {
            // Handle the case when desId is empty, for example by setting a default value for this.designationId
        }
    }
       if(this.instituteName==this.instituteFilter[0].instituteName){
        this.instituteId=this.instituteFilter[0].instituteId;
       }
       else{
        const insId=this.cidDropdown.filter(d=>d.instituteName==this.instituteName);
        this.instituteId=insId[0].instituteId;
       }
       if(this.departmentName==this.departmentFilter[0].departmentName){
        this.departmentId=this.departmentFilter[0].departmentId;
        
       }
       else{
        const depId=this.cidDropdown.filter(d=>d.departmentName==this.departmentName);
        this.departmentId=depId[0].departmentId;
        
       }
       if(this.schoolName==this.schoolFilter[0].schoolName){
        this.schoolId=this.schoolFilter[0].schoolId;
       }
       else{
        const schId=this.cidDropdown.filter(d=>d.schoolName==this.schoolName);
        this.schoolId=schId[0].schoolId;
       }
       if(this.locationName==this.locationFilter[0].locationName){
        this.locationId=this.locationFilter[0].locationId;
       }
       else{
        const locId=this.cidDropdown.filter(d=>d.locationName==this.locationName);
        this.locationId=locId[0].locationId;
       }
       if(this.researchArea==""){
        this.researchArea=null;
       }

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

      const Data={
              universityId: this.universityId,
              userId: this.userId,
              employeeId:this.empId,
              titleId: this.titleId,
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
              locationId: this.locationId,
              schoolId:this.schoolId,
              instituteId: this.instituteId,
              departmentId: this.departmentId,
              researchArea: this.researchArea,
              UserStatusId:this.userStatusId,
              roleIds:this.roleIds,
              IsFileUploaded:this.fileupload,
              ActualFileName:this.fileName
              ,
              eMailId:this.emailId
              }
          console.log(Data);
          if(this.fullName!=""){
            if(!this.file){          
            this.service.updateProfile(Data,this.user.UserId,this.roleId).subscribe(x=>{                         
             const confirmation = confirm("Details updated successfully");
              if (confirmation) {
                if(this.roleId=="1"||this.roleId=="2"||this.roleId=="6"||this.roleId=="7"||this.roleId=="8"||this.roleId=="3"||this.roleId=="9"||this.roleId=='10'||this.roleId=='16'){
                  this.router.navigate([`/facultyProfiles/${this.userId}`])
                } 
                else if(this.roleId=="5"||this.roleId=='12'||this.roleId=='17'){
                  this.router.navigate(["/clientadmin/user/screen"])

                 } 
              }
            },
            (error) => {
              console.error(error);
              alert("Failed to update details. Please check the entered data.");
            })
          
        }
          else{
            if(this.file.type=="image/jpeg"||this.file.type=="image/png"){
              this.uploadFile().then(()=>{ 
            this.service.updateProfile(Data,this.user.UserId,this.roleId).subscribe(x=>{                         
              const confirmation = confirm("Details updated successfully");
               if (confirmation) {
                 if(this.roleId=="1"||this.roleId=="2"||this.roleId=="6"||this.roleId=="7"||this.roleId=="8"||this.roleId=="3"||this.roleId=="9"||this.roleId=='10'||this.roleId=='16'){
                   this.router.navigate([`/facultyProfiles/${this.userId}`])
                 } 
                 else if(this.roleId=="5"||this.roleId=='12'){
                   this.router.navigate(["/clientadmin/user/screen"])
 
                  } 
               }
             },
             (error) => {
               console.error(error);
               alert("Failed to update details. Please check the entered data.");
             })
            });
          }
       else{
        alert("Please choose a file with file type png or jpg")
       }
        }
          }
          else{
            alert("Check the given credentials");          
          }
        }  
        
        fetchImage() {

          this.service.GetPath(this.user.UniversityId,this.user.UserId,'1').subscribe(x=>{
            this.imgPath=x;
            console.log(this.imgPath);  
            if(this.imgPath){  
            this.userImage=this.imgPath.folderPath+"\\"+this.user.UserId;
          console.log(this.userImage);
          const imageUrl = `${environment.nodeServerUrl}/getImage?userImage=${this.userImage}`;
          console.log(imageUrl);
          this.http.get(imageUrl, { responseType: 'text' }).subscribe(
            (response) => {
              this.imgUrl = imageUrl; // Update the imgUrl with the fetched image URL
              console.log('Fetched Image:', imageUrl);
              this.isPhoto=true;
            },
            (error) => {
              console.error('Error fetching Image:', error);
            });
          }
        }) 
      
      }

      updateValues(val) {

        const dataParts: any[] = [];

        if (this.Faculty && !this.temproles.includes('2')) {
          dataParts.push('2');
        }
        if (this.Scholar && !this.temproles.includes('3')) {
          dataParts.push('3');
        }
        if (this.Student && !this.temproles.includes('4')) {
          dataParts.push('4');
        }
        if (this.Management && !this.temproles.includes('6')) {
          dataParts.push('6');
        }
        if (this.Admin && !this.temproles.includes('5')) {
          dataParts.push('5');
        }
        if (this.hoc && !this.temproles.includes('7')) {
          dataParts.push('7');
        }
        if (this.hoi && !this.temproles.includes('8')) {
          dataParts.push('8');
        }
        if (this.hod && !this.temproles.includes('9')) {
          dataParts.push('9');
        }
        if (this.hos && !this.temproles.includes('10')) {
          dataParts.push('10');
        }
        if (this.universityNew && !this.temproles.includes('16')) {
          dataParts.push('16');
        }
        if (this.Librarian && !this.temproles.includes('17')) {
          dataParts.push('17');
        }

        const data = dataParts.length > 0 ? dataParts.join(',') : "";
          
        if(this.temproles==""){
          this.roleIds=data;
        }
        else{
          
          if (!this.Faculty&&val=='2') {
            this.temproles = this.temproles.split(',').filter(roleId => roleId !== '2').join(',');      
          }
          if (!this.Scholar&&val=='3') {
            this.temproles = this.temproles.split(',').filter(roleId => roleId !== '3').join(',');      
          }
          if (!this.Student&&val=='4') {
            this.temproles = this.temproles.split(',').filter(roleId => roleId !== '4').join(',');      
          }
          else if (!this.hod&&val=='9') {
            this.temproles = this.temproles.split(',').filter(roleId => roleId !== '9').join(',');
          }
          else if (!this.hoi&&val=='8') {
            this.temproles = this.temproles.split(',').filter(roleId => roleId !== '8').join(',');
          }
          else if (!this.hoc&&val=='7') {
            this.temproles = this.temproles.split(',').filter(roleId => roleId !== '7').join(',');
          }
          else if (!this.Management&&val=='6') {
            this.temproles = this.temproles.split(',').filter(roleId => roleId !== '6').join(',');
          }
          else if (!this.hos&&val=='10') {
            this.temproles = this.temproles.split(',').filter(roleId => roleId !== '10').join(',');
          }
          else if (!this.Admin&&val=='5') {
            this.temproles = this.temproles.split(',').filter(roleId => roleId !== '5').join(',');
          }
          else if (!this.universityNew&&val=='16') {
            this.temproles = this.temproles.split(',').filter(roleId => roleId !== '16').join(',');
          }
          else if (!this.Librarian&&val=='17') {
            this.temproles = this.temproles.split(',').filter(roleId => roleId !== '17').join(',');
          }
        this.roleIds=this.temproles+ (this.temproles && data ? ',' : '') +data;
        console.log(this.roleIds);      
      }
        
      }

      filterSchool(val){
        let filteredSchool= this.cidDropdown.filter(d=>d.locationName.includes(val));
        if(this.layerType=="3LType1"){
          this.layerInst=Array.from(new Set(this.tempList.map((item : any)=>item.instituteName)))
          this.instituteName=filteredSchool[0].instituteName;
          }
          else if(this.layerType=="3LType2"){
              this.filteredDept=this.tempList;
              this.departmentName=filteredSchool[0].departmentName;
          }
          else if(this.layerType=="4LType2"||this.layerType=="3LType3"){
            this.layerSchool=Array.from(new Set(filteredSchool.map((item : any)=>item.schoolName)))
            this.schoolName=filteredSchool[0].schoolName;

         }
         
      }

      filterDept(val){
          this.filteredDept= this.cidDropdown.filter(d=>d.instituteName==val)
          this.departmentName=this.filteredDept[0].departmentName;
      }

      filterInst(val){
          let filteredInst= this.cidDropdown.filter(d=>d.schoolName.includes(val));
          this.layerInst=Array.from(new Set(filteredInst.map((item : any)=>item.instituteName)))
          this.instituteName=filteredInst[0].instituteName;
          if(this.layerInst.length==1){
             this.filteredDept=this.tempList;
             this.departmentName=this.filteredDept[0].departmentName;
          }
      }

      selectDept(val){
      console.log(val);
      this.departmentName=val;
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

      removeTag(tag: string) {
        const index = this.tags.indexOf(tag);
        if (index !== -1) {
          this.tags.splice(index, 1);
          this.researchArea=this.tags.toString();
        }
      }

      // for researcharea list
      getResearchArea(){
        this.service.getResearchAreaList().subscribe(x=>{
          this.researchList=x;    
        })
      }

      onInput(value){  
        this.researchDrop=false;     
        this.tags.push(value);
        if(this.tags.length==1){
          this.researchArea=this.tags[0];
        }
        else{
        this.researchArea=this.tags.join(',');
        }     
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

     

      processData(){
         if(this.currentPassword!=this.userCredential){
            alert("Please check current password");
         }
      }

      clearPopUP(){
        this.modalService.dismissAll();
      }

      OnClick(){
        if (this.password === 'password') {
          this.password = 'text';
          this.showPassword = true;
        } else {
          this.password = 'password';
          this.showPassword = false;
        }
      }
   
      modifyEmpId(){
        this.editableInput=!this.editableInput;
      }

  }
