import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FacultiesService } from '../../faculties/faculties.service';
import { FormBuilder } from '@angular/forms';
import { GeneralApiService } from '../../general-api.service';
import { AuthService } from '../../../shared/services/firebase/auth.service';
import { MenuService } from '../../../shared/services/menu.service';
import { AdminclientService } from '../../adminclient/adminclient.service';
import { PostServiceRequest } from 'src/app/shared/model/postserviceRequest.model';

@Component({
  selector: 'app-newrequest',
  templateUrl: './newrequest.component.html',
  styleUrls: ['./newrequest.component.scss','./../../../../assets/given/newcss/style.css']
})
export class NewrequestComponent implements OnInit {
  reports: boolean = false;
  requests: boolean = false;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  stickyEnable: boolean;
  isMenuOpen: boolean;
roleName: any;
Name: any;
isScrolled: any;
  roleId: any;
  user: any;
  universityName: any;
  userId: any;
  role: any;
  serviceTypeId: string | null = null;
  categoryId: string = "";
  priorityId: string | null = null;
  requestDescription: string | null = null;
  contactPhoneNo: string | null = null;
  contactEmailId: string | null = null;
  enableErrorMsg: boolean = false;
  categoryList: any = [];
  filterUniversity: string = "";
  filterType: string = "";
  filterCategory: string = "";
  filterPriority: string = "";
  filterstatus: string = "";
  statusList: any;
  filterdata: any;
  typeList: any;
  priorityList: any;
  uniqType: any[];
  submitted: boolean = false;
  postReq: PostServiceRequest;
  userDetail: any;
  postData = [];

  constructor(private router:Router,private authService:AuthService,private modalService: NgbModal,private service: FacultiesService,private servicead: AdminclientService,
    private menuService:MenuService,private facultyservice: FacultiesService,private fb: FormBuilder,private gservice:GeneralApiService) { }

  ngOnInit(): void {

   

    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
  });



  this.user=this.authService.getUserDetail();
  console.log(this.user);
  this.roleId=this.authService.getProfileObs();
this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  this.universityName=this.user.University;
  this.userId=this.user.UserId;
  this.userDetail = this.authService.getUserDetail();
  
  // this.authService.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
          this.role=JSON.parse(localStorage.getItem('RoleSelection'));
    console.log(this.role);
    
          const data=this.role.filter(item=> item.roleId==this.roleId);
           this.roleName=data[0].roleName;
          console.log(this.roleName)
    //      }) 


    this.service.getPriorityList().subscribe(x => {
      this.priorityList = x;
      this.servicead.getServiceStatus().subscribe(y => {
        this.statusList = y;
        console.log(this.statusList);

       

      });
    });

    this.service.getTypeandCategory().subscribe(x => {
      this.typeList = x;
      this.uniqType = Array.from(new Set(this.typeList.map(item => JSON.stringify({ serviceTypeId: item.serviceTypeId, serviceTypeName: item.serviceTypeName })))).map((t: any) => JSON.parse(t));
    })
  }


  Greports(){
    this.reports=!this.reports;

  }
  request(){
    this.requests=!this.requests
    console.log(this.requests);
    
  }
  newRequest1() {
    this.router.navigate(['/Home'])
    }

  changeType(val) {
    console.log(val);
    this.categoryList = this.typeList.filter(t => t.serviceTypeId == val);
    this.filterCategory = "";
    this.filterPriority = "";
    this.filterstatus = "";
  }
  sendRequest() {
    this.postReq = new PostServiceRequest();
    this.postReq.workFlowStatusId = 15;
    this.postReq.universityId = parseInt(this.userDetail.UniversityId);
    this.postReq.raisedBy = parseInt(this.userDetail.UserId);
    this.postReq.serviceTypeId = parseInt(this.serviceTypeId);
    this.postReq.categoryId = parseInt(this.categoryId);
    this.postReq.priorityId = parseInt(this.priorityId);
    this.postReq.requestDescription = this.requestDescription;
    this.postReq.contactPhoneNo = this.contactPhoneNo;
    this.postReq.contactEmailId = this.contactEmailId;

    if (this.postReq.contactPhoneNo.length == 10 && this.postReq.contactEmailId != null) {

      this.postData.push({
        serviceRequestId: this.postReq.serviceRequestId,
        universityId: this.postReq.universityId,
        requestDescription: this.postReq.requestDescription,
        raisedBy: this.postReq.raisedBy,
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
      const data = {
        insUpdServiceRequest: this.postData
      }
      console.log(data);
      this.service.updateServiceRequest(data, this.roleId, this.userDetail.UserId).subscribe(x => {
        console.log(x);
        alert("Request send successfully");

        this.router.navigate(['/facultyProfiles/Support/MyRequests'])
      })
      // 
    }
    else {
      //alert("Need to fill mandatory fields")
    }

  }

  resetRequest(): void {
    if (this.categoryId === 'undefined') {
      this.categoryId = null;
    }
    this.serviceTypeId = "";
    this.categoryId = "";
    this.priorityId = "";
    this.requestDescription = "";
    this.contactPhoneNo = "";
    this.contactEmailId = "";
    this.categoryList = [];
  }

  @HostListener('window:scroll')
  onWindowScroll() {
          const scrollY = window.scrollY;
      
          if (this.blueheader) {
            const element = this.blueheader.nativeElement;
            
            if (scrollY >= 10) {
              element.classList.remove('bluebar_expand');
              element.classList.add('bluebar_collapse');
               this.stickyEnable=true;
            } else {
              element.classList.remove('bluebar_collapse');
              element.classList.add('bluebar_expand');
              this.stickyEnable=false
            }
          }
  }

}
