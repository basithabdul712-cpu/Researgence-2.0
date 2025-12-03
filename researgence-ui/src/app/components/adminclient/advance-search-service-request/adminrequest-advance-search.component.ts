import { AdminclientService } from './../adminclient.service';
import { FacultiesService } from './../../faculties/faculties.service';
import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';
import { ServiceRequest } from 'src/app/shared/model/servicerequest.model';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

@Component({
  selector: 'app-adminrequest-advance-search',
  templateUrl: './adminrequest-advance-search.component.html',
  styleUrls: ['./adminrequest-advance-search.component.scss','./../../../../assets/given/selected.css', './../../../../assets/given/css/style-vit1.css', './../../../../assets/given/css/style-vit2.css', './../../../../assets/given/css/style.css', './../../../../assets/given/css/bootstrap.min.css']
})
export class AdminrequestAdvanceSearchComponent implements OnInit {

  isMenuOpen: boolean;
  searchData:ServiceRequest;
  status:any|null=null;
  createdOn:string|null=null;
  priorityId:any|null=null;
  resolvedBy:any|null=null;
  type:any|null=null;
  category:any|null=null;
  resolvedOn:string|null=null;
  assignedTo:any|null=null;
  universityList:any=[];
  userStatusFilter:any=[];
  priortyList:any;
  userDetail:any;
  roleId:any;
  resolverList:any=[];
  typeList:any=[];
  dataList:any=[];
  categoryList:any=[];
  uniqType:any;
  selectedUniversityName: string | null = null;
  universityId: any|null=null;;
  isDropdownOpen = false;


  constructor(private menuService:MenuService,private facService:FacultiesService,private service:AdminclientService,private authservice:AuthService) { }

  ngOnInit(): void {
   
    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });

    this.userDetail=this.authservice.getUserDetail();
    this.roleId=this.authservice.getProfileObs();

        this.service.GetUniversity(this.userDetail.UserId,this.roleId).subscribe(x=>{
          this.universityList=x;
          console.log(x);        
        })
      this.service.getServiceStatus().subscribe(response => {
        this.userStatusFilter = response;
        console.log(response);
      })
      this.facService.getPriorityList().subscribe(x=>{
        this.priortyList=x;
      })
     
      this.facService.getTypeandCategory().subscribe(x=>{
        this.typeList=x;
        this.uniqType=Array.from(new Set(this.typeList.map(item => JSON.stringify({ serviceTypeId: item.serviceTypeId, serviceTypeName: item.serviceTypeName })))).map((t:any) => JSON.parse(t));
      })
            

  }

      // selectUniv(id){
      //   this.service.getAssignedTo(id).subscribe(x=>{
      //     this.resolverList=x;
      //     console.log(this.resolverList.length);
      // })
      // }

  

      toggleDropdown(): void {
        this.isDropdownOpen = !this.isDropdownOpen;
      }

      selectUniversity(name,id): void {
        this.universityId = id;
        this.service.getAssignedTo(this.universityId).subscribe(x=>{
              this.resolverList=x;
              console.log(this.resolverList.length);
          })
        this.selectedUniversityName = name;
        this.isDropdownOpen = false; // Close the dropdown
      }

      advSearch(){
        this.searchData= new ServiceRequest();
        if(this.universityId==null){
          this.searchData.universityId=this.universityId;
        }
        else{
          this.searchData.universityId=parseInt(this.universityId);
        }
        if(this.type==null){
          this.searchData.serviceTypeId=this.type;
        }
        else{
          this.searchData.serviceTypeId=parseInt(this.type);
        }
        if(this.category==null){
        this.searchData.categoryId=this.category;
        }
        else{
          this.searchData.categoryId=parseInt(this.category);
        }
        if(this.priorityId==null){
          this.searchData.priorityId=this.priorityId;
        }
        else{
          this.searchData.priorityId=parseInt(this.priorityId);
        }
        if(this.assignedTo==null){
          this.searchData.assignedTo=this.assignedTo;
        }
        else{
          this.searchData.assignedTo=parseInt(this.assignedTo);
        }
        if(this.status==null){
          this.searchData.statusId=this.status;
        }
        else{
          this.searchData.statusId=parseInt(this.status);
        }
        if(this.resolvedBy==null){
          this.searchData.resolvedBy=this.resolvedBy;
        }
        else{
          this.searchData.resolvedBy=parseInt(this.resolvedBy);
        }
        this.searchData.createdDate=this.createdOn;
        this.searchData.resolvedDate=this.resolvedOn;
                 
          this.service.searchReq(this.searchData,this.roleId,this.userDetail.UserId).subscribe(x=>{
            this.dataList=x;
            console.log(this.dataList.length);
            for(let i=0;i<this.dataList.length;i++){
              let univ=this.universityList.filter(t=>t.universityId==this.dataList[i].universityId);
              console.log(univ);    
              if(univ.length>0){   
                this.dataList[i].universityName=univ[0].universityName;
              }     
              if(this.dataList[i].priorityId != null){
                let priorityValue=this.priortyList.filter(t=>t.id==this.dataList[i].priorityId)
                this.dataList[i].priority=priorityValue[0].value;
              }
              
          }
            console.log(this.dataList);
            
          })
      }

      refresh(){
        this.searchData=null;
        this.universityId=null;
        this.selectedUniversityName = null;
        this.status=null;
        this.createdOn=null;
        this.priorityId=null;
        this.resolvedBy=null;
        this.type=null;
        this.category=null;
        this.resolvedOn=null;
        this.assignedTo=null;
      }

      changeType(val){
        console.log(val);
       this.categoryList=this.typeList.filter(t=>t.serviceTypeId==val);
        
     }

}
