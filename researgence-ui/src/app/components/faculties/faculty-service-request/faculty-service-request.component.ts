import { filter } from 'rxjs/operators';
import { PostServiceRequest } from './../../../shared/model/postserviceRequest.model';
import { FacultiesService } from './../faculties.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { AdminclientService } from '../../adminclient/adminclient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty-service-request',
  templateUrl: './faculty-service-request.component.html',
  styleUrls: ['./faculty-service-request.component.scss', './../../../../assets/given/newcss/style.css', './../../../../assets/given/selected.css']
})
export class FacultyServiceRequestComponent implements OnInit {
  isMenuOpen: boolean;
  newrequest: boolean = false;
  userDetail: any;
  roleID: any;
  serviceList: any = [];
  typeList: any = [];
  priorityList: any = [];
  postReq: PostServiceRequest;
  serviceTypeId: string | null = null;
  categoryId: string = "";
  priorityId: string | null = null;
  requestDescription: string | null = null;
  contactPhoneNo: string | null = null;
  contactEmailId: string | null = null;
  enableErrorMsg: boolean = false;
  categoryList: any = [];
  uniqType: any;
  postData = [];
  searchTitle: string = "";
  page = 1;
  pageSize = 20;
  collectionSize: any;
  pageSizes: any[] = ["10", "15", "20", "100"];
  showButton: boolean = true;
  startrow: number = 0;
  endrow: number = 20;
  totalPages: number;
  //sort
  currentSortColumn: string;
  currentSortDirection: string;
  isScrolled: any;
  stickyEnable: any;
  Name: any;
  roleName: any;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  user: any;
  userName: any;
  role: any;
  dataList: any;
  filterUniversity: string = "";
  filterType: string = "";
  filterCategory: string = "";
  filterPriority: string = "";
  filterstatus: string = "";
  statusList: any;
  filterdata: any;

  submitted: boolean = false;
  data: any[];


  constructor(private menuService: MenuService, private service: FacultiesService,
    private authservice: AuthService, private excel: ExcelExportService, private servicead: AdminclientService,private route:Router) {
    this.serviceList = this.filterdata;
  }

  ngOnInit(): void {
    //for accessing menuopen 
    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });
    this.user = this.authservice.getUserDetail();
    console.log(this.user);
    this.Name = this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.userName = this.authservice.getProfileObs();
    //For rolename getting
    // this.authservice.RoleSelection(this.user.UniversityId, this.user.UserId).subscribe(x => {
      this.role = JSON.parse(localStorage.getItem('RoleSelection'));
      const dataRole = this.role.filter(item => item.roleId == this.userName);
      this.roleName = dataRole[0].roleName;
      console.log(this.roleName)
    // })
    this.userDetail = this.authservice.getUserDetail();
    this.roleID = this.authservice.getProfileObs();

    this.service.getPriorityList().subscribe(x => {
      this.priorityList = x;
      this.servicead.getServiceStatus().subscribe(y => {
        this.statusList = y;
        console.log(this.statusList);

        this.getList();

      });
    });

    this.service.getTypeandCategory().subscribe(x => {
      this.typeList = x;
      this.uniqType = Array.from(new Set(this.typeList.map(item => JSON.stringify({ serviceTypeId: item.serviceTypeId, serviceTypeName: item.serviceTypeName })))).map((t: any) => JSON.parse(t));
    })



  }

  getList() {
    this.service.getServiceRequest(this.roleID, this.userDetail.UserId, this.userDetail.UniversityId).subscribe(x => {
      this.serviceList = x;

      this.filterdata = this.serviceList;

      this.collectionSize = this.serviceList.length;
      this.totalPages = Math.ceil(this.collectionSize / this.pageSize);

      this.page = Math.max(1, Math.min(this.page, this.serviceList.length));

      this.startrow = (this.page - 1) * this.pageSize;
      this.endrow = Math.min(this.startrow + this.pageSize, this.collectionSize);
      if (this.serviceList.length < 1) {
        this.enableErrorMsg = true;
        console.log("came");
      }
      else {
        for (let i = 0; i < this.serviceList.length; i++) {
          if (this.serviceList[i].priorityId != null) {
            let priorityValue = this.priorityList.filter(t => t.id == this.serviceList[i].priorityId)
            this.serviceList[i].priority = priorityValue[0].value;
          }
        }
        console.log(this.serviceList);
      }
    })
  }

  newRequest() {
    // this.newrequest = !this.newrequest;
    // this.showButton = false;
    this.route.navigate(['/newrequest']);

  }
  newRequest1() {
    this.newrequest = !this.newrequest;
    this.showButton = true;
  }

  sendRequest() {
    this.submitted = true;
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
      this.service.updateServiceRequest(data, this.roleID, this.userDetail.UserId).subscribe(x => {
        console.log(x);
        alert("Request send successfully");
        this.newrequest = false;
        window.location.reload();
      })
      // 
    }
    else {
      //alert("Need to fill mandatory fields")
    }

  }

  dropvalue(e) {
    console.log(e);
    this.pageSize = Number(e);
  }

  // searchTab(){

  //   this.serviceList = this.serviceList.filter(item => {
  //         if (item.requestDescription!=null) {
  //           return item.requestDescription.toLowerCase().includes(this.searchTitle.toLowerCase());
  //         }
  //       });
  //   if(this.searchTitle==""){
  //     this.getList();
  //   }
  //   this.collectionSize=this.serviceList.length;
  // }

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

  onPageSizeChange(size: string) {
    this.page = 1;
    this.pageSize = Number(size);
    this.endrow = this.pageSize + this.startrow;
    this.getList();
  }

  onPageChange(page: number) {
    this.page = Math.max(1, Math.min(page, this.totalPages));

    if (this.page == 1) {
      this.startrow = 0;
    } else {
      this.startrow = (this.page - 1) * this.pageSize;
    }
    this.endrow = Math.min(this.startrow + this.pageSize, this.collectionSize);
  }

  sort(columnName: string) {
    if (this.currentSortColumn === columnName) {
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortDirection = 'asc';
    }
    this.currentSortColumn = columnName;
    this.serviceList.sort((a, b) => {
      if (a[columnName] < b[columnName]) {
        return this.currentSortDirection === 'asc' ? -1 : 1;
      } else if (a[columnName] > b[columnName]) {
        return this.currentSortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollY = window.scrollY;

    if (this.blueheader) {
      const element = this.blueheader.nativeElement;

      if (scrollY >= 20) {
        element.classList.remove('bluebar_expand');
        element.classList.add('bluebar_collapse');
        this.stickyEnable = true;
      } else {
        element.classList.remove('bluebar_collapse');
        element.classList.add('bluebar_expand');
        this.stickyEnable = false;
      }
    }
  }





  // exportexcel() {
  //   this.service.getServiceRequest(this.roleID,this.userDetail.UserId,this.userDetail.UniversityId).subscribe(x=>{
  //     this.serviceList=x;  

  //     this.filterdata=this.serviceList;
  //      console.log(this.serviceList);

  //     console.log(this.priorityList);


  //     for(let i=0;i<this.serviceList.length;i++){   
  //       if(this.serviceList[i].priorityId!=null){ 
  //       let priorityValue=this.priorityList.filter(t=>t.id==this.serviceList[i].priorityId)
  //       this.serviceList[i].priority=priorityValue[0].value;
  //     }
  //     else{
  //       this.serviceList[i].priority= null;
  //     }
  // }

  //       // Process data and export to Excel
  //      // this.processAndExportToExcel();
  //     });
  // }

  processAndExportToExcel() {

    // Make modifications to the data
    this.serviceList.forEach((x, index) => {
      x["SL.NO"] = index + 1;

    });

    // Create a new object with the desired column order
    const modifiedDataList = this.serviceList.map(({
      createdOn, raisedBy, serviceType, category, requestDescription,
      priority, status, remark, resolvedOn
    }, index) => {
      // Declare index here, if needed
      return {
        "SL.NO": index + 1,
        "CREATED ON": createdOn,
        "CREATED BY": raisedBy,
        "TYPE": serviceType,
        "CATEGORY": category,
        "REQUEST DESCRIPTION": requestDescription,
        "PRIORITY": priority,
        "STATUS": status,
        "REMARK": remark,
        "RESOLVED ON": resolvedOn
      };
    });

    // Export the modified data to Excel
    this.excel.exportAsExcelFile(modifiedDataList, "FacultyServiceRequest");
  }


  changeType(val) {
    console.log(val);
    this.categoryList = this.typeList.filter(t => t.serviceTypeId == val);
    this.filterCategory = "";
    this.filterPriority = "";
    this.filterstatus = "";
  }

  filter() {

    if (this.filterType === "" || this.filterCategory === "" || this.filterPriority === "" || this.filterstatus === "") {
      this.serviceList = this.filterdata;
    }

    this.serviceList = this.filterdata.filter(item =>
      (this.filterType.length === 0 || this.filterType.includes(item.serviceTypeId)) &&
      (this.filterCategory.length === 0 || this.filterCategory.includes(item.category)) &&
      (this.filterPriority.length === 0 || this.filterPriority.includes(item.priority)) &&
      (this.filterstatus.length === 0 || this.filterstatus.includes(item.status))
    );
    console.log(this.serviceList);
  }

}
