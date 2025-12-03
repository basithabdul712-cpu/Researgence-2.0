import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';
import { FacultiesService } from '../faculties.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { ActivatedRoute,Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rfs-edit',
  templateUrl: './rfs-edit.component.html',
  styleUrls: ['./../../../../assets/given/selected.css', './../../../../assets/given/css/style-vit1.css', './../../../../assets/given/css/style-vit2.css', './../../../../assets/given/css/style.css', './../../../../assets/given/css/bootstrap.min.css','./rfs-edit.component.scss']
})
export class RfsEditComponent implements OnInit {

  isMenuOpen: boolean;
  filename:any;
  empId: any;
  patEmpId:any;
  title: any;
  pattitle:any;
  sourcename: any;
  patOffice:any;
  doi: any;
  type: any;
  patType:any;
  remark: any;
  patRemark:string="";
  status: any;
  patStatus:any;
  createdby: any;
  patCreatedby:any;
  createdbydate: any;
  patcreatedbydate:any;
  user: any;
  roleId: any;
  editdata: any;
  editdataPat:any;
  requestid: any;
  editFilter: any;
  editPatFilter:any;
  filterdata: any;
  filterdataPat:any;
  formattedDate: null;
  patformattedDate:null;
  hideTitle: boolean=false;
  titleList: any;
  checkTitle: any;
  patAppNo:any;
 
  journalList: any;
  sourceEnable: boolean=false;
  journal: any;

  file: File | null = null;
  filepat:File | null = null;
  fileOver: boolean = false;
  userId:any;
  pdfPath:any;
  patPdfPath:any;
  pdfLocation:string | null = null;
  patpdfLocation:string | null = null;
  readOnly:boolean=false;
  pdfName:string|null =null;
  patpdfName:string|null =null;
  pdfPostName:string|null=null;
  patpdfPostName:string|null=null;
  pdfStatus:boolean=false;
  patpdfStatus:boolean=false;
  pdfEnable: boolean=false;

  queueId:Number=0;
  publicationId:Number=0;
  sourceId:Number=0;
  webLink: string="";
  rfsTypeId: number=0;
  patrfsTypeId:number=0;
  isReadOnly: boolean=false;
  selectfilepath:any;
  patselectfilepath:any;
  selectfile:boolean=false;
  pdfconfirmation: boolean=false;
  patPdfconfirmation:boolean=false;
  existingPdfLocation:string;
  fileexists: boolean=false;
  patfileexists:boolean=false;
  patfiletypename:any;
  filetypename: any;
  fileempty: null;
  editType:any;
  patCountryList:any;
  patOfficeId:any;
  
  constructor(private menuService: MenuService, private facultyservice: FacultiesService, private router:Router,
    private authService:AuthService,private route: ActivatedRoute,private datePipe: DatePipe,private http: HttpClient) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe( paramMap => {
      this.requestid = paramMap.get('requestId');
      console.log(this.requestid);
      this.editType= paramMap.get('type');
       });
    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });
    this.user=this.authService.getUserDetail();
    this.roleId=this.authService.getProfileObs();
   if(this.editType=="publication"){
    this.facultyservice.GetPath(this.user.UniversityId,this.user.UserId,'2').subscribe(x=>{
      this.pdfPath=x;
      console.log(this.pdfPath);      
    });

    this.facultyservice.getrfseditdata(this.user.UserId,this.roleId).subscribe(data => {
      this.editdata = data;
      console.log(this.editdata);
      this.editFilter=this.editdata.filter(item => item.requestId==this.requestid);
      console.log(this.editFilter);
      this.filterdata=this.editFilter[0];
      console.log(this.filterdata);
    
      this.empId=this.filterdata.employeeId;
      this.title=this.filterdata.publicationTitle;
      this.sourcename=this.filterdata.publicationSourceName;
      this.doi=this.filterdata.doi;
      console.log(this.title);
      
      this.type=this.filterdata.rfstYpe;
      this.remark=this.filterdata.remark;
      this.status=this.filterdata.status;
      this.createdby=this.filterdata.createdBy;
        //  this.createdbydate=this.filterdata.employeeId;
        const date = new Date(this.filterdata.createdDate);
        this.createdbydate = this.datePipe.transform(date, 'yyyy-MM-dd');  
          if(this.createdbydate=="0001-01-01"||this.createdbydate==null){
          this.formattedDate = null;
          this.createdbydate=this.formattedDate;
        }
          if(this.type=="Linked"){
            this.rfsTypeId=1;
          }
          else if(this.type=="Manual"){
            this.rfsTypeId=3;     
          }
          else if(this.type=="CrossRef"){
            this.rfsTypeId=2;
            this.isReadOnly=true;
          }
          console.log(this.rfsTypeId,this.type);

          this.selectfilepath=this.filterdata.pdfFileLocation;
          console.log(this.filterdata.pdfFileLocation);
          console.log(this.selectfilepath);

          const parts = this.selectfilepath.split('-');
            if (parts.length >= 2) {
              // Extract the second half after the hyphen
            this.filetypename=parts.slice(2).join('-').trim();
            console.log( this.filetypename);

            }

              if(this.selectfilepath!=null){
                this.fileexists=true;
              }
       });
      }

      else{

        this.facultyservice.GetPath(this.user.UniversityId,this.user.UserId,'5').subscribe(x=>{
          this.patPdfPath=x;
          console.log(this.patPdfPath);      
        });

        this.facultyservice.patentCountry().subscribe(x=>{
          this.patCountryList=x;
        
    
        this.facultyservice.getAddedPatentList(this.user.UserId,this.user.UserId,this.roleId).subscribe(data => {
          this.editdataPat = data;
          console.log(this.editdataPat);
          this.editPatFilter=this.editdataPat.filter(item => item.requestId==this.requestid);
          console.log(this.editPatFilter);
          this.filterdataPat=this.editPatFilter[0];
          console.log(this.filterdataPat);     
          this.patEmpId=this.filterdataPat.employeeId;
          this.pattitle=this.filterdataPat.patentTitle;
          this.patOffice=this.filterdataPat.patentOffice;
          this.patAppNo=this.filterdataPat.applicationNumber;
          this.patRemark=this.filterdataPat.remark;
          this.patStatus=this.filterdataPat.status;
          this.patCreatedby=this.filterdataPat.createdBy;
          this.existingPdfLocation=this.filterdataPat.pdfFileLocation;
          this.patType=this.filterdataPat.rfsType;
            if(this.filterdataPat.patentOffice==null){
                this.patOfficeId="0";
              }
              else{
                const tempOfficeId= this.patCountryList.filter(item => item.value.toLowerCase().includes(this.patOffice.toLowerCase()));                
                this.patOfficeId=tempOfficeId[0].id;
              }
            const dateTemp = new Date(this.filterdataPat.createdDate);
            this.patcreatedbydate = this.datePipe.transform(dateTemp, 'yyyy-MM-dd');  
              if(this.patcreatedbydate=="0001-01-01"||this.patcreatedbydate==null){
              this.patformattedDate = null;
              this.patcreatedbydate=this.patformattedDate;
            }
              if(this.filterdataPat.rfsType=="Linked"){
                this.patrfsTypeId=1;
              }
              else if(this.filterdataPat.rfsType=="Manual"){
                this.patrfsTypeId=3;     
              }
    
            if(this.filterdataPat.pdfFileLocation!=null){
              this.patselectfilepath=this.filterdataPat.pdfFileLocation;
              console.log(this.filterdataPat.pdfFileLocation);
              console.log(this.patselectfilepath);
    
              const patparts = this.patselectfilepath.split('-');
                if (patparts.length >= 2) {
                  // Extract the second half after the hyphen
                this.patfiletypename=patparts.slice(2).join('-').trim();
                console.log( this.patfiletypename);
    
                }
              }
                  if(this.patselectfilepath!=null){
                    this.patfileexists=true;
                  }
           });
          });

      }
    }

        // title type and search
          changeJournal(x) {
            if(x.length>4){
            this.hideTitle=true;
            this.facultyservice.getTitleList(x).subscribe(data=>{
              this.titleList=data;
              if(this.titleList.length==0){
                this.checkTitle=x;
                this.hideTitle=false;
                console.log(this.checkTitle);   
              }
            })
          }
        }
 
      onSelectJournal(item: string) {
        this.title = item;
        this.checkTitle=item;      
          this.hideTitle = false;
      }

      //source type and search
      changeSourceTitle(x){
        if(x.length>3){
          this.sourceEnable=true;
          this.facultyservice.getJournal(x).subscribe(data=>{
            this.journalList=data;
          })
        }
      }

      onSelectSourceTitle(val){
        this.sourceEnable=false;
        this.sourcename=val;
      }


        //pdf upload
        selectFile(event) {

                  if(this.selectfilepath!=null){
                    const confirmation = confirm('Do you want Replace pdf file!');
                    
                  if(confirmation){
                    this.pdfconfirmation=false;
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
                  if(!this.file){
                      this.uploadFile();
                  }
                }
                else{
                  this.pdfconfirmation=true;
                  const inputElement = event.target;
                // Reset the value of the input element to clear the selected file
                inputElement.value = null;
                }
              }  

                else{
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

          }


          uploadFile() {
            return new Promise((resolve, reject) => {

            if (!this.file) {
              return "Please select a file";
            }

            if (this.file.type == 'application/pdf') {         
            const formData = new FormData();
            formData.append('image', this.file);
            if(this.rfsTypeId==1){
              this.pdfName=this.pdfPath.proposedFileName;
            }
            else{
              let name=this.file.name.slice(0, this.file.name.lastIndexOf('.'));
              console.log(name);
              this.pdfName=this.user.UserId+"-"+name;
            }

            const uploadUrl = `${environment.nodeServerUrl}/uploadpdf?userId=${this.pdfName}&pdfPath=${this.pdfPath.folderPath}`;

            console.log(uploadUrl);  
            
            this.http.post(uploadUrl, formData, { responseType: 'text' }).subscribe(
              (response) => {
                alert('PDF uploaded successfully!');
                console.log('Response:', response);
                this.pdfStatus=true;
                resolve(response);
              },
              (error) => {
                alert('Error uploading pdf');
                console.error('Error uploading pdf:', error);
                this.pdfStatus=false;
                reject(error);
              }
            );
            }
            else {
              alert("Please choose a file with file type pdf");
              this.pdfStatus=false;
             }
           });
        }


          submit(){

            console.log(this.pdfLocation);
              if(this.pdfconfirmation==false){
                this.uploadFile().then(()=>{
                  if(!this.pdfStatus&&this.pdfEnable){
                  }
                  else{
                  if(this.file){
                    if(this.rfsTypeId==1){
                    let imgsplit=this.file.type.split("/");
                    console.log(imgsplit);
                      this.pdfPostName="."+imgsplit[1];
                  }
                  else{
                    this.pdfPostName="-"+this.file.name;
                  }
                    this.pdfLocation=this.pdfPath.folderPath+"\\"+this.user.UserId+this.pdfPostName;
                    console.log(this.pdfLocation);
                  }
                  else{
                    this.pdfLocation=this.filterdata.pdfFileLocation;               
                  }
                  
                  this.queueId=this.requestid;          
                  console.log(this.pdfLocation);
                  
                  const data={
                    rfsPublicationQueue: {
                      rfsPublicationQueueId: this.queueId,
                      rfsPublicationLinkRequestId: 0,
                      universityId: parseInt(this.user.UniversityId),
                      userId: parseInt(this.user.UserId),
                      publicationId: this.publicationId,
                      publicationTitle: this.title,
                      publicationSourceId: this.sourceId,
                      publicationSource: this.sourcename,
                      doi: this.doi,
                      pdFfileLocation: this.pdfLocation,
                      webLink: this.webLink,
                      rfsTypeId: this.rfsTypeId,
                      swappedUserId: 0,
                      isUserAddressSame: true,
                      isCorrespondingAuthor: true,
                      actionTypeId: 0,
                      remark: this.remark,
                      takenBy: 0,
                      verifiedBy: 0
                    },
                    rfsLinkAuthorAdd: {
                      universityId: 0,
                      universityName: "string",
                      userId: 0,
                      fullName: "string",
                      locationId: 0,
                      locationName: "string",
                      countryId: 0,
                      countryName: "string",
                      instituteId: 0,
                      instituteName: "string",
                      departmentId: 0,
                      departmentName: "string",
                      correspondingEmail: "string",
                      correspondingAuthor: 0
                    }
                  }
                  console.log(data);
                    
                  this.facultyservice.SaveRFS(this.user.UserId,this.roleId,data,this.user.UserId).subscribe(x=>{
                    const confirmation = confirm('Details Saved Successfully');
                    if (confirmation) {
                      this.router.navigate(['/facultyProfiles/Support/MyAdditions']);
                     }
                   })              
                  }
                });
              } 
              if(this.pdfconfirmation==true || !this.file){

              if(!this.pdfStatus&&this.pdfEnable){
            }
            else{
            if(this.file){
              if(this.rfsTypeId==1){
              let imgsplit=this.file.type.split("/");
              console.log(imgsplit);
                this.pdfPostName="."+imgsplit[1];
            }
            else{
              this.pdfPostName="-"+this.file.name;
            }
              this.pdfLocation=this.pdfPath.folderPath+"\\"+this.user.UserId+this.pdfPostName;
              console.log(this.pdfLocation);
            }
            else{
              this.pdfLocation=this.filterdata.pdfFileLocation;

            }

            this.queueId=this.requestid;

            console.log(this.pdfLocation);
            
            const data={
              rfsPublicationQueue: {
                rfsPublicationQueueId: this.queueId,
                rfsPublicationLinkRequestId: 0,
                universityId: parseInt(this.user.UniversityId),
                userId: parseInt(this.user.UserId),
                publicationId: this.publicationId,
                publicationTitle: this.title,
                publicationSourceId: this.sourceId,
                publicationSource: this.sourcename,
                doi: this.doi,
                pdFfileLocation: this.pdfLocation,
                webLink: this.webLink,
                rfsTypeId: this.rfsTypeId,
                swappedUserId: 0,
                isUserAddressSame: true,
                isCorrespondingAuthor: true,
                actionTypeId: 0,
                remark: this.remark,
                takenBy: 0,
                verifiedBy: 0
              },
              rfsLinkAuthorAdd: {
                universityId: 0,
                universityName: "string",
                userId: 0,
                fullName: "string",
                locationId: 0,
                locationName: "string",
                countryId: 0,
                countryName: "string",
                instituteId: 0,
                instituteName: "string",
                departmentId: 0,
                departmentName: "string",
                correspondingEmail: "string",
                correspondingAuthor: 0
              }
            }
            console.log(data);
              
            this.facultyservice.SaveRFS(this.user.UserId,this.roleId,data,this.user.UserId).subscribe(x=>{
              const confirmation = confirm('Details Saved Successfully');
              if (confirmation) {
                this.router.navigate(['/facultyProfiles/Support/MyAdditions']);
               }
             })
            }
          }
        }

        patuploadFile() {
          return new Promise((resolve, reject) => {

          if (!this.filepat) {
            return "Please select a file";
          }

          if (this.filepat.type == 'application/pdf') {         
          const patformData = new FormData();
          patformData.append('image', this.filepat);
        
            let patname=this.filepat.name.slice(0, this.filepat.name.lastIndexOf('.'));
            console.log(patname);
            this.patpdfName=this.user.UserId+"-"+patname;

          const patuploadUrl = `${environment.nodeServerUrl}/uploadpdf?userId=${this.patpdfName}&pdfPath=${this.patPdfPath.folderPath}`;

          console.log(patuploadUrl);  
          
          this.http.post(patuploadUrl, patformData, { responseType: 'text' }).subscribe(
            (response) => {
              alert('PDF uploaded successfully!');
              console.log('Response:', response);
              this.patpdfStatus=true;
              resolve(response);
            },
            (error) => {
              alert('Error uploading pdf');
              console.error('Error uploading pdf:', error);
              this.patpdfStatus=false;
              reject(error);
            }
          );
          }
          else {
            alert("Please choose a file with file type pdf");
            this.patpdfStatus=false;
           }
         });
      }

           //pdf upload
           patSelectFile(event) {

            if(this.patselectfilepath!=null){
              const confirmation = confirm('Do you want Replace pdf file!');
              
            if(confirmation){
              this.patPdfconfirmation=true;
            this.filepat = event.target.files[0] as File;
            console.log(this.filepat);
                        
            if (this.filepat) {
              const fileSize = this.filepat.size / 1024 / 1024; // Size in MB
              const maxSize = 10; // Maximum allowed size in MB

              if (fileSize <= maxSize) {
                console.log(`Selected file size: ${fileSize} MB`);
              } else {
              alert("Please choose a file with file size below 10MB")
                event.target.value = '';
              }
            }  
            if(!this.filepat){
                this.patuploadFile();
            }
          }
          else{
            this.patPdfconfirmation=false;
            const inputElement = event.target;
          // Reset the value of the input element to clear the selected file
          inputElement.value = null;
          }
        }  

          else{
            this.filepat = event.target.files[0] as File;
            console.log(this.filepat);
                        
            if (this.filepat) {
              const fileSize = this.filepat.size / 1024 / 1024; // Size in MB
              const maxSize = 10; // Maximum allowed size in MB

              if (fileSize <= maxSize) {
                console.log(`Selected file size: ${fileSize} MB`);
              } else {
              alert("Please choose a file with file size below 10MB")
                event.target.value = '';
              }
            }
          } 
          if(this.filepat){
            this.patPdfconfirmation=true;
          }

    }

    submitpat(){

      if(this.patPdfconfirmation){
              this.patuploadFile().then(()=>{
                if(!this.patpdfStatus){
                }
                else{
                if(this.filepat){
                  let imgsplit=this.filepat.type.split("/");
                  console.log(imgsplit);
                    this.patpdfPostName="."+imgsplit[1];
              
                  this.patpdfLocation=this.patPdfPath.folderPath+"\\"+this.patpdfName+this.patpdfPostName;
                  console.log(this.patpdfLocation);
                }
                
                this.queueId=+this.requestid;
                console.log(this.patpdfLocation);
                const data={
                  rfsPatentQueue: {
                    rfsPatentQueueId: this.queueId,
                    universityId: this.user.UniversityId,
                    userId: this.user.UserId,
                    applicationNumber: this.patAppNo,
                    patentId: 0,
                    patentTitle: this.pattitle,
                    patentOfficeId:this.patOfficeId,
                    webLink: null,
                    pdFfileLocation: this.patpdfLocation,
                    rfsTypeId: this.patrfsTypeId,
                    actionTypeId: 4,
                    remark: this.patRemark,
                    workflowstatusId: 6,
                    swappedInventorUserId: 0,
                    swappedApplicantUserId: 0,
                    takenBy: 0,
                    verifiedBy: 0
                  }
                }
                console.log(data);
            
                this.facultyservice.savePatent(data,this.user.UserId,this.roleId).subscribe(x=>{
                  const confirmation = confirm('Details Saved Successfully');
                  if (confirmation) {
                    this.router.navigate(['/facultyProfiles/Support/Mypatent']);
                  }
                })         
                }
              });
      } 
     else{

            this.queueId=+this.requestid;
            const data={
              rfsPatentQueue: {
              rfsPatentQueueId: this.queueId, 
              universityId: this.user.UniversityId,
              userId: this.user.UserId,
              applicationNumber: this.patAppNo,   
              patentId: 0,
              patentTitle: this.pattitle,
              patentOfficeId:this.patOfficeId,
              webLink: null,
              pdFfileLocation: this.existingPdfLocation,
              rfsTypeId: this.patrfsTypeId,
              actionTypeId: 4,
              remark: this.patRemark,
              workflowstatusId: 6,
              swappedInventorUserId: 0,
              swappedApplicantUserId: 0,
              takenBy: 0,
              verifiedBy: 0
            }
          }
    
           console.log(data);
      
          this.facultyservice.savePatent(data,this.user.UserId,this.roleId).subscribe(x=>{
            const confirmation = confirm('Details Saved Successfully');
              if (confirmation) {
                this.router.navigate(['/facultyProfiles/Support/Mypatent']);
              }
            });
         }
       }

   }
