import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { FacultiesService } from './../../faculties/faculties.service';
import { Component, OnInit } from '@angular/core';
import { PostServiceRequest } from 'src/app/shared/model/postserviceRequest.model';
import { MenuService } from 'src/app/shared/services/menu.service';
import { AdminclientService } from '../adminclient.service';
import { ServiceRequest } from 'src/app/shared/model/servicerequest.model';

@Component({
  selector: 'app-request-evaluation',
  templateUrl: './request-evaluation.component.html',
  styleUrls: ['./request-evaluation.component.scss','./../../../../assets/given/selected.css', './../../../../assets/given/css/style-vit1.css', './../../../../assets/given/css/style-vit2.css', './../../../../assets/given/css/style.css', './../../../../assets/given/css/bootstrap.min.css']
})
export class RequestEvaluationComponent implements OnInit {
  isMenuOpen: any;
  userDetail:any;
  roleID:any;
  typeList:any=[];
  priorityList:any=[];
  userStatusFilter:any=[];
  postReq:PostServiceRequest;
  serviceTypeId:string|null=null;
  categoryId:string|null=null;
  priorityId:string|null=null;
  request:string|null=null;
  contact:string|null=null;
  email:string|null=null;
  remark:string|null=null;
  status:string|null=null;
  universityparamId:number;
  serviceId:any;
  data:any=[];
  evaluationDetail:any;
  postData=[];
  uniqType: any;
  servicetype: any;

  constructor(private menuService:MenuService,private facService:FacultiesService,private authService:AuthService,
    private service:AdminclientService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
     //for accessing menuopen 
        this.menuService.isMenuOpen$.subscribe(isOpen => {
          this.isMenuOpen = isOpen;
        });
    
        this.route.params.subscribe(params => {           
          this.universityparamId=params.univ;
          this.serviceId=params.serviceid;         
        });

        this.roleID=this.authService.getProfileObs();
        this.userDetail=this.authService.getUserDetail();

      

        this.facService.getPriorityList().subscribe(x=>{
          this.priorityList=x;
        })

        this.service.getServiceStatus().subscribe(response => {
          this.userStatusFilter = response;
        })

        this.facService.getTypeandCategory().subscribe(x=>{
          this.typeList=x;
          this.servicetype=x;
          console.log( this.typeList);
  // Remove duplicates based on both serviceTypeName and serviceTypeId
  const uniqueTypes = this.servicetype.reduce((unique, item) => {
    const key = `${item.serviceTypeName}_${item.serviceTypeId}`;
    if (!unique.has(key)) {
      unique.set(key, { serviceTypeId: item.serviceTypeId, serviceTypeName: item.serviceTypeName });
    }
    return unique;
  }, new Map());

  // Convert the Map values back to an array
  this.uniqType = Array.from(uniqueTypes.values());
  console.log(this.uniqType);

       

        this.facService.getServiceRequest(this.roleID,this.userDetail.UserId,this.universityparamId).subscribe(x => {
          this.data = x as any;
          let evaluate=this.data.filter(t=>t.serviceRequestId==this.serviceId);
          this.evaluationDetail=evaluate[0];
          console.log(this.evaluationDetail);
          this.serviceTypeId=this.evaluationDetail.serviceTypeId;
          let category=this.typeList.filter(x=>x.categoryName==this.evaluationDetail.category)
          this.categoryId=category[0].categoryId;
          this.priorityId=this.evaluationDetail.priorityId;
          this.request=this.evaluationDetail.requestDescription;
          this.contact=this.evaluationDetail.contactPhoneNo;
          this.email=this.evaluationDetail.contactEmailId;
          this.status=this.evaluationDetail.statusId;
          this.remark=this.evaluationDetail.remark;

        });  
      })

      }

      cancel(){
        this.router.navigate(['/clientadmin/service-request/'+this.universityparamId])
      }


      onSubmit(){

        this.postReq=new PostServiceRequest();
        this.postReq.universityId=this.evaluationDetail.universityId;
        if(this.evaluationDetail.raisedById==null){
          this.postReq.raisedBy=null;
        }
          else{
        this.postReq.raisedBy=parseInt(this.evaluationDetail.raisedById);
      }
      if(this.serviceTypeId==undefined||this.serviceTypeId==null){
             this.postReq.serviceTypeId=null;
      }
      else{
        this.postReq.serviceTypeId=parseInt(this.serviceTypeId);
      }
      if(this.categoryId==undefined||this.categoryId==null){
        this.postReq.categoryId=null;
      }
      else{
        this.postReq.categoryId=parseInt(this.categoryId);
      }
      if(this.priorityId==undefined||this.priorityId==null){
        this.postReq.priorityId=null
      }
      else{
        this.postReq.priorityId=parseInt(this.priorityId);
      }
      if(this.status==null||this.status==undefined){
         this.postReq.workFlowStatusId=null;
      }
      else{
        this.postReq.workFlowStatusId=parseInt(this.status);
      }    
        this.postReq.remark=this.remark;
        this.postReq.contactEmailId=this.email;
        this.postReq.contactPhoneNo=this.contact;
        this.postReq.serviceRequestId=parseInt(this.serviceId);
        this.postReq.resolvedBy=this.evaluationDetail.resolvedById;
        this.postReq.raisedBy=this.evaluationDetail.raisedById;
        this.postReq.serviceRequestSourceId=this.evaluationDetail.serviceRequestSourceId;
        this.postReq.requestDescription=this.evaluationDetail.requestDescription;
        this.postReq.assignedTo=this.evaluationDetail.assignedToId;
        this.postReq.assignedBy=this.evaluationDetail.assignedById;
             
            console.log(this.postReq);
            if(this.postReq.workFlowStatusId==null&&this.postReq.remark==null){
                 alert("Need to fill mandatory fields")
            }
            else{
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
           this.facService.updateServiceRequest(data,this.roleID,this.userDetail.UserId).subscribe(x=>{
                alert("Evaluated successfully");
                this.router.navigate(['/clientadmin/service-request/'+this.universityparamId]);
           })  
          }
            
      }

}
