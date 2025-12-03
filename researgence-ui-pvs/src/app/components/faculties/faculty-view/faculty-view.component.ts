import { AdminclientService } from './../../adminclient/adminclient.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProfile } from 'src/app/shared/model/data.models';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { FacultiesService } from '../faculties.service';

@Component({
  selector: 'app-faculty-view',
  templateUrl: './faculty-view.component.html',
  styleUrls: ['./../../../../assets/given/selected.css', './../../../../assets/given/css/style-vit1.css', './../../../../assets/given/css/style-vit2.css', './../../../../assets/given/css/style.css', './../../../../assets/given/css/bootstrap.min.css','./faculty-view.component.scss'],

})
export class FacultyViewComponent implements OnInit {

  fullName:string;
  designationId:Number;
  departmentId:Number;
  genderId:Number;
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
  roleId:string;
  University:string;
  empId:Number;
  imageUrl: string;
  Faculty: boolean = false;
  Scholar: boolean = false;
  Student: boolean = false;
  hoc: boolean = false;
  hoi: boolean = false;
  hod: boolean = false;
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
  selectedUnivRoleList:any;
  univList:any;
  emailId:string;

    constructor(private menuService: MenuService, private service: FacultiesService,
    private http: HttpClient,private datePipe: DatePipe,private adminService:AdminclientService,
      private routes:Router,private authService:AuthService,private route: ActivatedRoute) { 
         
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

             console.log(this.universid);
             console.log(this.userid);
       

          //To get details from login
          this.user=this.authService.getUserDetail();
          this.roleId=this.authService.getProfileObs();

          if(this.roleId=='10'||this.roleId=='12'){
            this.adminService.GetUniversity(this.user.UserId,this.roleId).subscribe(x=>{
                  console.log(x);
                  this.univList=x;  
                  let filterUniv=this.univList.filter(item=>item.universityId==this.universid);
                  this.universityName=filterUniv[0].universityName;               
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
                console.log(this.cidDropdown);
                this.service.getProfileEdit(this.universid,this.userid).subscribe(x=>{
                  this.existDetails=x[0];
                  console.log(this.existDetails);               
                 
                  this.fullName=this.existDetails.fullName;   
                  this.titleId=this.existDetails.titleId;
                  this.userId=this.existDetails.userId;
                  this.googleScholarId=this.existDetails.googleScholarId;
                  this.orcid=this.existDetails.orcid;
                  this.researchArea=this.existDetails.researchArea;
                  this.scopusId=this.existDetails.scopusId;
                  this.vidwanId=this.existDetails.vidwanId;
                  this.wosId=this.existDetails.wosId;  
                  this.emailId= this.existDetails.eMailId;

                if(this.filteredDesignations&&this.cidDropdown){
                  console.log(this.filteredDesignations);
                  console.log(this.cidDropdown);    
                  
                 if(this.roleId=='5'||this.roleId=='10'||this.roleId=='12'){
                  this.empId=this.existDetails.employeeId;
                    if(this.existDetails.userStatusId==0){
                      this.existDetails.userStatusId=1;
                    }
                    this.userfilter=this.userStatusFilter.filter(t =>t.id==this.existDetails.userStatusId)            
                    this.userstatusName=this.userfilter[0].value;
                    this.tempRoleId=this.existDetails.roleIds;
                    this.temproles=this.tempRoleId;
                    if(this.existDetails.roleIds!=null){
                    this.Admin=this.tempRoleId.includes('5');
                    this.Faculty=this.tempRoleId.includes('2');
                    this.Scholar=this.tempRoleId.includes('3');
                    this.Student=this.tempRoleId.includes('4');
                    this.Management=this.tempRoleId.includes('6');
                    this.hoc=this.tempRoleId.includes('7');
                    this.hod=this.tempRoleId.includes('9');
                    this.hoi=this.tempRoleId.includes('8');
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
                  this.designationName = this.designationFilter[0].value;    
                }              
                  
                if(this.existDetails.instituteId!=null){
                  this.instituteFilter=this.cidDropdown.filter(item => item.instituteId==this.existDetails.instituteId);
                  this.instituteName=this.instituteFilter[0].instituteName;
                  this.filteredDept= this.cidDropdown.filter(d=>d.instituteName==this.instituteName)
                }

                if(this.existDetails.departmentId!=null){
                  this.departmentFilter=this.cidDropdown.filter(item => item.departmentId==this.existDetails.departmentId);
                  this.departmentName=this.departmentFilter[0].departmentName;
                }

                if(this.existDetails.schoolId!=null){
                  this.schoolFilter=this.cidDropdown.filter(t => t.schoolId==this.existDetails.schoolId);
                  this.schoolName=this.schoolFilter[0].schoolName;
                }
                 
                if(this.existDetails.locationId!=null){
                  this.locationFilter=this.cidDropdown.filter(item => item.locationId==this.existDetails.locationId);
                  this.locationName=this.locationFilter[0].locationName;
                }
                  
            }
                  //covert date format
                  const date = new Date(this.existDetails.dateOfBirth);
                   this.dateOfBirth = this.datePipe.transform(date, 'yyyy-MM-dd');  
                 const doj= new Date(this.existDetails.dateOfJoining);
                  this.dateOfJoining= this.datePipe.transform(doj, 'yyyy-MM-dd');               
              
                });                          
           });                
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

                        const data = dataParts.length > 0 ? dataParts.join(',') : "";
                          
                        if(this.temproles==""){
                          this.roleIds=data;
                        }
                        else{
                          
                          if (!this.Faculty&&val=='2') {
                            this.temproles = this.temproles.split(',').filter(roleId => roleId !== '2').join(',');           
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
                          else if (!this.Admin&&val=='5') {
                            this.temproles = this.temproles.split(',').filter(roleId => roleId !== '5').join(',');
                          }
                        this.roleIds=this.temproles+ (this.temproles && data ? ',' : '') +data;
                        console.log(this.roleIds);     
                      }
                        
                      }

                      filterDept(val){
                          this.filteredDept= this.cidDropdown.filter(d=>d.instituteName==val)
                          this.departmentName=this.filteredDept[0].departmentName;
                      }

                      selectDept(val){
                      console.log(val);
                      this.departmentName=val;
                      }
            }
