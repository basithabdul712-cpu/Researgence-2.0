import { filter } from 'rxjs/operators';
import { PostServiceRequest } from './../../../shared/model/postserviceRequest.model';
import { FacultiesService } from './../../faculties/faculties.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { AdminclientService } from '../adminclient.service';
import { ExcelExportService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-admin-service-requests',
  templateUrl: './admin-service-requests.component.html',
  styleUrls: ['./admin-service-requests.component.scss','./../../../../assets/given/newcss/style.css']
})
export class AdminServiceRequestsComponent implements OnInit {
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  isMenuOpen: boolean;
  newrequesting: boolean;
  postReq:PostServiceRequest;
  user: any;
  userName: any;
  data: any;
  university:any;
  filterJournal;any;
  typeList:any=[];
  priorityList:any=[];
  souceList:any=[];
  sourceId:any;
  remark:string|null=null;
  serviceTypeId:any;
  categoryId:any;
  priorityId:any;
  request:string|null=null;
  mobileNo:string|null=null;
  email:string|null=null;
  universityparamId:any;
  universityList:any=[];
  authorList:any=[];
  author:any;
  ipDropdown:boolean=false;
  authorid:any;
  categoryList:any=[];
  uniqType:any;
  postData=[];
  showButton: boolean=true;
  Name: any;
  roleName: any;
  stickyEnable: any;
  isScrolled: any;
  role: any;
  filterUniversity:string="";
  filterType:string="";
  filterCategory:string="";
  filterPriority:string="";
  filterstatus: string="";
  statusList: any;
  filterdata: any;
  submitdata:boolean=false;
  showUnivName:any;

  constructor(private authservice:AuthService,private service:AdminclientService,private menuService:MenuService,private router:Router,
    private route: ActivatedRoute,private facService:FacultiesService,private excel:ExcelExportService) {
      this.data = this.filterdata;

     }

  ngOnInit(): void {

    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });
    this.user=this.authservice.getUserDetail();
    console.log(this.user);
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
      this.universityparamId=params.univ;
  });
    this.showUnivName=localStorage.getItem("clientUniv");
    
    this.facService.SearchUniversity().subscribe(data => {
      this.universityList = data;   

      this.facService.getPriorityList().subscribe(x=>{
        this.priorityList=x;
        this.service.getServiceStatus().subscribe(y=>{
          this.statusList=y;
          console.log(this.statusList);
     

      this.facService.getServiceRequest(this.userName,this.user.UserId,this.universityparamId).subscribe(x => {
        this.data = x as any;
        this.filterdata=this.data;
        for(let i=0;i<this.data.length;i++){
          if(this.data[i].universityId!=null){
          let univ=this.universityList.filter(t=>t.id==this.data[i].universityId);
          console.log(univ);    
          if(univ.length>0){   
            this.data[i].universityName=univ[0].name;
          } 
        }
          if(this.data[i].priorityId!=null) 
          {      
          let priorityValue=this.priorityList.filter(t=>t.id==this.data[i].priorityId)
          this.data[i].priority=priorityValue[0].value;
          }
      }
        console.log(this.data);
      });  
    });
    });
  });

    this.facService.getDropdown('SRQSOURCE').subscribe(x=>{
      this.souceList=x;
    })

    this.facService.getTypeandCategory().subscribe(x=>{
      this.typeList=x;
      this.uniqType=Array.from(new Set(this.typeList.map(item => JSON.stringify({ serviceTypeId: item.serviceTypeId, serviceTypeName: item.serviceTypeName })))).map((t:any) => JSON.parse(t));
    })


  }

        newRequest(){
          this.newrequesting=!this.newrequesting;
          this.showButton=false;
        }
        newRequest1(){
          this.newrequesting=!this.newrequesting;
          this.showButton=true;
          // window.location.reload();
        }
        evaluate(id,serviceid){
          this.router.navigate(['/clientadmin/service/evaluation/'+id+'/'+serviceid])

        }

        advance()
        {
          this.router.navigate(['/clientadmin/service-request/advance/search'])

        }

      refresh(){
        location.reload();
      }

      authorSearch(val){
        if(val==""){
          this.ipDropdown=false;
        } 
        else{
        this.ipDropdown=true;
        this.facService.AuthorSearch(this.universityparamId,val).subscribe(x=>{
          console.log(x);
           this.authorList=x;
        })
      }
      }

      onSelectAuthor(id:number,name){
         this.authorid=id;
         this.author=name;
         this.ipDropdown=false;
      }


      onSubmit(){
        this.submitdata=true;
        this.postReq=new PostServiceRequest();
        this.postReq.workFlowStatusId=15;
        this.postReq.universityId=parseInt(this.universityparamId);
        this.postReq.raisedBy=parseInt(this.user.UserId);
        if(this.serviceTypeId!=undefined){
        this.postReq.serviceTypeId=parseInt(this.serviceTypeId);
         }
         else{
          this.postReq.serviceRequestId=null;
         }
         if(this.categoryId!=undefined){
        this.postReq.categoryId=parseInt(this.categoryId);
      }
      else{
        this.postReq.categoryId=null;
      }
      if(this.priorityId!=undefined){
        this.postReq.priorityId=parseInt(this.priorityId);
      }
      else{
        this.postReq.priorityId=null;
      }
        this.postReq.requestDescription=this.request;
        this.postReq.contactPhoneNo=this.mobileNo;
        this.postReq.contactEmailId=this.email;

      if(this.sourceId!=undefined){
        this.postReq.serviceRequestSourceId=parseInt(this.sourceId);
      }
      else{
        this.postReq.serviceRequestSourceId=null;
      }
      if(this.authorid!=undefined){
        this.postReq.raisedBy=parseInt(this.authorid);
      }
      else{
        this.postReq.raisedBy=null;
      }
    if(this.postReq.contactPhoneNo.length==10&&this.postReq.contactEmailId!=null&&this.postReq.serviceRequestSourceId!=null&&this.postReq.raisedBy!=null){
              this.postData.push({
                serviceRequestId: this.postReq.serviceRequestId,
                universityId: this.postReq.universityId,
                requestDescription: this.postReq.requestDescription,
                raisedBy:  this.postReq.raisedBy,
                serviceTypeId: this.postReq.serviceTypeId,
                categoryId: this.postReq.categoryId,
                workFlowStatusId: this.postReq.workFlowStatusId,
                assignedBy: this.postReq.assignedBy,
                assignedTo: this.postReq.assignedTo,
                priorityId: this.postReq.priorityId,
                serviceRequestSourceId: this.postReq.serviceRequestSourceId,
                contactEmailId: this.postReq.contactEmailId,
                contactPhoneNo: this.postReq.contactPhoneNo,
                resolvedBy: this.postReq.resolvedBy,
                remark: this.postReq.remark
          });  
          const data={
            insUpdServiceRequest:this.postData
          } 
          console.log(data);
  
      this.facService.updateServiceRequest(data,this.userName,this.user.UserId).subscribe(x=>{
          console.log(x);
          alert("Request send successfully");
          this.newrequesting=false;
        })
      }
      else{
        alert("Need to fill mandatory fields")
      }
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



//  exportexcel() {
//   this.facService.SearchUniversity().subscribe(data => {
//     this.universityList = data;   

//     this.facService.getPriorityList().subscribe(x=>{
//       this.priorityList=x;
   

//     this.facService.getServiceRequest(this.userName,this.user.UserId,this.universityparamId).subscribe(x => {
//       this.data = x as any;
//       for(let i=0;i<this.data.length;i++){
//         let univ=this.universityList.filter(t=>t.id==this.data[i].universityId);
//         console.log(univ);    
//         if(univ.length>0){   
//           this.data[i].universityName=univ[0].name;
//         }     
//         let priorityValue=this.priorityList.filter(t=>t.id==this.data[i].priorityId)
//         this.data[i].priority=priorityValue[0].value;
//     }
//       console.log(this.data);
//     });  
//   });

//       console.log(this.data);

//       // Process data and export to Excel
//       this.processAndExportToExcel();
//     });
// }

processAndExportToExcel() {
  // Make modifications to the data
  this.data.forEach((x, index) => {
    x["SL.NO"] = index + 1;
   
  });

  // Create a new object with the desired column order
  const modifiedDataList = this.data.map(({
    universityName, resolvedBy, serviceType, category, requestDescription,
    priority, status, createdOn, 
  }, index) => {
    // Declare index here, if needed
    return {
      "SL.NO": index + 1,
      "UNIVERSITY": universityName,
      "REQUESTED BY": resolvedBy,
      "TYPE": serviceType,
      "CATEGORY": category,
      "QUERY": requestDescription,
      "PRIORITY": priority,
      "STATUS": status,
      "CREATED ON": createdOn,
      
    };
  });

  // Export the modified data to Excel
  this.excel.exportAsExcelFile(modifiedDataList, "ServiceRequest");
}

    changeType(val){
      console.log(val);
    this.categoryList=this.typeList.filter(t=>t.serviceTypeId==val);
     this.filterCategory="";
     this.filterPriority="";
     this.filterstatus="";
    }

    filter() {

      if ( this.filterType === "" || this.filterCategory === "" || this.filterPriority === "" || this.filterstatus === "") {
                this.data = this.filterdata;
            }

      this.data = this.filterdata.filter(item => 
        (this.filterType.length === 0 || this.filterType.includes(item.serviceTypeId)) &&
        (this.filterCategory.length === 0 || this.filterCategory.includes(item.category)) &&
        (this.filterPriority.length === 0 || this.filterPriority.includes(item.priority)) &&
        (this.filterstatus.length === 0 || this.filterstatus.includes(item.status))
      );
    }



}
