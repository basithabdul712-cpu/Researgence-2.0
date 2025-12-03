import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { DatePipe, DOCUMENT, Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultiesService } from '../faculties.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from 'src/app/shared/services/menu.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rfs',
  templateUrl: './rfs.component.html',
  styleUrls: ['./../../../../assets/given/css/style.css', './../../../../assets/given/css/bootstrap.min.css','./rfs.component.scss']
})
export class RfsComponent implements OnInit {
  isMenuOpen: boolean;
  user:any;
  roleId:any;
  checkDTtitle:any;
  checkDTdoi:any;
  searchData:string;
  checkValue:any;
  crossTitle:string;
  crossSourceName:string;
  showData:boolean=false;
  publicationId:Number=0;
  sourceId:Number=0;
  userValues:any;
  crossRefValues:any;
  pdfEnable:boolean=false;
  noDOI:boolean=false;
  doi:string;
  webLink:string;
  pubSourceName:string="";
  messageValue:boolean=false;
  queueId:Number=0;
  rfsId:any;
  type:string;
  publicationTitle:string;
  popupAlert:string;
  titleList:any;
  titleEnable:boolean=false;
  filterTitle:any;
  dataList:any;
  showDOIlist:boolean=false;
  enableCheck:boolean=false;
  pubId: any;
  checkFlag:boolean=false;
  doiEnable:boolean=false;
  showMsg:boolean=false;
  //For Image Upload
  file: File | null = null;
  fileOver: boolean = false;
  userId:any;
  pdfPath:any;
  pdfLocation:string | null = null;
  readOnly:boolean=false;
  pdfName:string|null =null;
  pdfPostName:string|null=null;
  pdfStatus:boolean=false;
  submitrequired:boolean=false;
  constructor(public facService: FacultiesService, private menuService: MenuService,private modalService: NgbModal,
    private router:Router,private authservice:AuthService,private http: HttpClient) {
  }

  ngOnInit() {
    
   
     this.user=this.authservice.getUserDetail();
     this.roleId=this.authservice.getProfileObs();
     this.userId=this.user.UserId;
      //for accessing menuopen 
      this.menuService.isMenuOpen$.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
        console.log(this.isMenuOpen);      
      });
    
      this.facService.GetPath(this.user.UniversityId,this.user.UserId,'2').subscribe(x=>{
        this.pdfPath=x;
        console.log(this.pdfPath);      
      })

  }

  onSelectTitle(val){
    this.searchData=val;
    console.log(this.searchData);   
    this.titleEnable=false;
  }

        changeTitle(x){
          if(this.checkDTtitle=='Title'){
            if(x.length>4){
          this.titleEnable=true;
          this.facService.getTitleList(x).subscribe(data=>{
            this.filterTitle=data;
            if(this.filterTitle.length==0){
              this.searchData=x;
              this.titleEnable=false; 
            }
          }) 
        }
         }
        }

  //Enable checkbox based on DOI/Title
  updateValues(data){
    if(this.checkDTtitle=="Doi"){    
      this.titleEnable=false;
     }
  }

  search(modal: any){
    //check values based on title
    if(this.checkDTtitle=='Title'){  
      this.facService.GetRFSTitle(this.searchData).subscribe(x=>{
        this.checkValue=x as any;
        if(this.checkValue.length==1){
          this.crossTitle=this.checkValue[0].publicationTitle;
          this.crossSourceName=this.checkValue[0].publicationSourceName;
          this.publicationId=this.checkValue[0].publicationId;
          this.sourceId=this.checkValue[0].publicationSourceId;
          this.publicationTitle=this.checkValue[0].publicationTitle;
          this.type="L";
          this.readOnly=true;
          this.rfsId=1;
          console.log(this.checkValue);
          this.pdfEnable=false;
          this.modalService.open(modal);  
        }
        else if(this.checkValue.length>1){
          this.showDOIlist=true;
          this.doiEnable=true;
               
        }
        else{
          this.type="M";
          this.facService.GetPubValidate(this.user.UserId,this.publicationId,this.pubSourceName,this.type,this.searchData).subscribe(x=>{
          this.userValues=x;    
          if(this.userValues.messegeId!='5'){
          this.noDOI=true;
          this.pdfEnable=true;
          this.publicationTitle=this.searchData;
          this.rfsId=3;    
          this.modalService.open(modal);      
        }
        else{
          this.noDOI=true;
          this.pdfEnable=true;
          this.popupAlert="Title not present in RFS data, Do you want to proceed?";
          this.rfsId=3;
          this.type="M";
          this.modalService.open(modal);   
        }
      })
      }
       
      })
    }
    else if(this.checkDTtitle=='Doi'){
      //check values based on DOI number
      this.facService.GetRFSDoi(this.searchData).subscribe(x=>{
        this.checkValue=x;
        if(this.checkValue.length==1){
        this.crossTitle=this.checkValue[0].publicationTitle;      
        this.crossSourceName=this.checkValue[0].publicationSourceName;
        this.publicationId=this.checkValue[0].publicationId;
        this.sourceId=this.checkValue[0].publicationSourceId;
        this.publicationTitle=this.checkValue[0].publicationTitle;
        this.doi=this.searchData;
        this.type="L";
        this.rfsId=1;
        this.readOnly=true;
        console.log(this.checkValue);  
        this.pdfEnable=false; 
        this.modalService.open(modal);   
      }
      else if(this.checkValue.length>1){
          this.showDOIlist=true;
          this.doiEnable=false;
          this.showMsg=true;
      }
      else{
        //get values from cross ref if data not found in RFS search
        this.facService.crossCheckDFS(this.searchData).subscribe(x=>{
             this.crossRefValues=x;
            if(this.crossRefValues.doi!=null){
             this.crossTitle=this.crossRefValues.title;
             //get source name from cross ref values
             this.crossSourceName=this.crossRefValues.sourceName[0];
            this.publicationTitle=this.crossRefValues.title;
             this.pubSourceName=this.crossSourceName;
             this.doi=this.searchData;
             this.readOnly=true;
             this.type="C";  
             this.rfsId=2;         
             console.log(this.crossRefValues);
             this.pdfEnable=true;
             this.modalService.open(modal);   
              }
             else{
                 this.noDOI=true;
                 this.pdfEnable=true;
                 this.popupAlert="DOI not present in CrossRef and RFS data, Do you want to proceed?";
                 this.rfsId=3;
                 this.type="M";
                 this.modalService.open(modal);   
              }
            })
          } 
            })
         }
      }

        processData(){
          this.modalService.dismissAll();
          this.showDOIlist=false;
          //To search user publication is already exists or not
          this.facService.GetPubValidate(this.user.UserId,this.publicationId,this.pubSourceName,this.type,this.publicationTitle).subscribe(x=>{
              this.userValues=x;
              console.log(this.userValues); 
              if(this.userValues.messegeId=='5'){
            console.log(this.userValues.messegeId);
              this.messageValue=true;
              } 
            this.showData=true;
          })
        
        }

          clearPopUP(){
            this.modalService.dismissAll();
          }

          //to reload current page
          clearAll(){
            location.reload();
          }


          selectFile(event) {
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
          
            if (this.file.type == 'application/pdf') {         
            const formData = new FormData();
            formData.append('image', this.file);
            if(this.rfsId==1){
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
            this.submitrequired=true;

            this.uploadFile().then(()=>{            
            if(!this.pdfStatus&&this.pdfEnable){
        }
        else{
          if(this.file){
            if(this.rfsId==1){
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

          const data={
            rfsPublicationQueue: {
              rfsPublicationQueueId: this.queueId,
              rfsPublicationLinkRequestId: 0,
              universityId: parseInt(this.user.UniversityId),
              userId: parseInt(this.user.UserId),
              publicationId: this.publicationId,
              publicationTitle: this.crossTitle,
              publicationSourceId: this.sourceId,
              publicationSource: this.crossSourceName,
              doi: this.doi,
              pdFfileLocation: this.pdfLocation,
              webLink: this.webLink,
              rfsTypeId: this.rfsId,
              swappedUserId: 0,
              isUserAddressSame: true,
              isCorrespondingAuthor: true,
              actionTypeId: 0,
              remark: null,
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
             
         if(this.rfsId=="3"){
          this.facService.SaveRFS(this.user.UserId,this.roleId,data,this.user.UserId).subscribe(x=>{
            const confirmation = confirm('Details Saved Successfully');
            if (confirmation) {
              this.router.navigate(['/facultyProfiles/Support/MyAdditions']);
            }
          })     
        }
        else{
         
        }
        }
      });

      if(this.rfsId!="3"){
        const data={
          rfsPublicationQueue: {
            rfsPublicationQueueId: this.queueId,
            rfsPublicationLinkRequestId: 0,
            universityId: parseInt(this.user.UniversityId),
            userId: parseInt(this.user.UserId),
            publicationId: this.publicationId,
            publicationTitle: this.crossTitle,
            publicationSourceId: this.sourceId,
            publicationSource: this.crossSourceName,
            doi: this.doi,
            pdFfileLocation: this.pdfLocation,
            webLink: this.webLink,
            rfsTypeId: this.rfsId,
            swappedUserId: 0,
            isUserAddressSame: true,
            isCorrespondingAuthor: true,
            actionTypeId: 0,
            remark: null,
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


        this.facService.SaveRFS(this.user.UserId,this.roleId,data,this.user.UserId).subscribe(x=>{
          const confirmation = confirm('Details Saved Successfully');
          if (confirmation) {
            this.router.navigate(['/facultyProfiles/Support/MyAdditions']);
          }
        })

      }

          }

          selection(id) {          
            this.checkValue.forEach(x => {
              if (x.publicationId !== id) {
                 this.enableCheck=true;
                 this.pubId=id;   
                 this.dataList=this.checkValue.filter(x=>x.publicationId==id);
              }
            })
          }

          selectTitle(modal: any){
            console.log("proceed");
             console.log(this.dataList);            
             this.crossTitle=this.dataList[0].publicationTitle;
             this.crossSourceName=this.dataList[0].publicationSourceName;
             this.publicationId=this.dataList[0].publicationId;
             this.sourceId=this.dataList[0].publicationSourceId;
             this.publicationTitle=this.dataList[0].publicationTitle;
             this.pubSourceName=this.dataList[0].publicationSourceName;
             this.type="L";
             this.rfsId=1;
             this.pdfEnable=false;
             this.modalService.open(modal);  
            }

}
