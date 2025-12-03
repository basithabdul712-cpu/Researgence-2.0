import { FacultiesService } from './../../faculties/faculties.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { AdminclientService } from '../adminclient.service';
import { ExcelExportService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-supportadmin-request',
  templateUrl: './supportadmin-request.component.html',
  styleUrls: ['./supportadmin-request.component.scss', './../../../../assets/given/newcss/style.css']
})
export class SupportadminRequestComponent implements OnInit {

  currentSortColumn: string;
  currentSortDirection: string;
  isMenuOpen: boolean;
  masterSelected: boolean;
  user: any;
  userName: any;
  data: any;
  assign: any;
  assignedTo:any;
  universityList:any=[];
  priorityList:any=[];
  typeList:any=[];
  filterUniversity:string="";
  filterType:string="";
  filterCategory:string="";
  filterPriority:string="";
  filterstatus: string="";
  uniqType:any;
  categoryList:any=[];
  selectedDataList: any[] = [];
  postData:any[]=[];
  isScrolled = false;
  stickyEnable:boolean=false;
  Name:any;
  role:any;
  roleName:string;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  filterdata: any;
  statusList: any=[];
  page:number=1;
  pageSize :number=10;
  pageSizes: any[]=["10","20","50","100"];

  constructor(private authservice:AuthService,private facService:FacultiesService,private service:AdminclientService,
    private menuService:MenuService,private router:Router,private excel:ExcelExportService) { }

  ngOnInit(): void {
     //for accessing menuopen 
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
   
    this.facService.getTypeandCategory().subscribe(x=>{
      this.typeList=x;
      this.uniqType=Array.from(new Set(this.typeList.map(item => JSON.stringify({ serviceTypeId: item.serviceTypeId, serviceTypeName: item.serviceTypeName })))).map((t:any) => JSON.parse(t));
    })

    this.service.GetUniversity(this.user.UserId,this.userName).subscribe(data => {
      this.universityList = data;     

    this.facService.getPriorityList().subscribe(x=>{
      this.priorityList=x;

      this.service.getServiceStatus().subscribe(y=>{
        this.statusList=y;
        console.log(this.statusList);

            this.facService.getServiceRequest(this.userName,this.user.UserId,this.user.UniversityId).subscribe(x => {
              this.data = x as any;
              this.filterdata=this.data;
              for(let i=0;i<this.data.length;i++){
                if(this.data[i].universityId){
                let univ=this.universityList.filter(t=>t.universityId==this.data[i].universityId);
                  this.data[i].universityName=univ[0].universityName; 
                }  
                  if(this.data[i].priorityId!=null) 
                  {
                  let priorityValue=this.priorityList.filter(t=>t.id==this.data[i].priorityId)
                  this.data[i].priority=priorityValue[0].value;
                  }
                  this.service.getAssignedTo(this.data[i].universityId).subscribe(x => {
                    this.assign = x as any;
                    this.data[i].assignList=this.assign;
                    this.data[i].assignAuthor=null;
                    this.data[i].isSelected=false;
                    });         
                }
                  console.log(this.data);
                  });
                });
              });
              });
 console.log(this.data);
          }
          advancesearch(){
            this.router.navigate(['/clientadmin/service-request/advance/search'])

          }

          changeType(val){
            console.log(val);
          this.categoryList=this.typeList.filter(t=>t.serviceTypeId==val);
            this.filterCategory="";
            this.filterPriority="";
            this.filterstatus="";
        }

        filter() {
        
          if (this.filterUniversity===""|| this.filterType === "" || this.filterCategory === "" || this.filterPriority === "" || this.filterstatus === "") {
                    this.data = this.filterdata;
                }
        
          this.data = this.filterdata.filter(item => 

            (this.filterUniversity.length === 0 || this.filterUniversity.includes(item.universityId)) &&
            (this.filterType.length === 0 || this.filterType.includes(item.serviceTypeId)) &&
            (this.filterCategory.length === 0 || this.filterCategory.includes(item.category)) &&
            (this.filterPriority.length === 0 || this.filterPriority.includes(item.priority)) &&
            (this.filterstatus.length === 0 || this.filterstatus.includes(item.status))
          );
        }


        checkUncheckAll() {
          const allItemsAreApproved = this.data.every((item) => item.isSelected === true);
          
          for (const item of this.data) {
            if (allItemsAreApproved) {
              item.isSelected = false; 
              this.masterSelected=false;
            } else if (item.isSelected ===false) {
              item.isSelected = this.masterSelected;
            }
          }
          
          this.isAllSelected(); 
        }
      
        isAllSelected():boolean {
          
         let checkNullValues= this.data.filter((item) => item.isSelected==true&&item.assignAuthor==null);        
         if(checkNullValues.length>0){
                alert("Assign to values cannot be null..")
         }
          else{
          const selectedItems = this.data.filter((item) => item.isSelected==true&&item.assignAuthor!=null);   
          const allItemsAreApproved =selectedItems.length === this.data.filter((item) => item.isSelected !== true).length;      
          this.masterSelected = selectedItems.length === this.data.length && !allItemsAreApproved;       
          this.selectedDataList = selectedItems;
          console.log(this.selectedDataList);
          return true;
          }

        }

        assignAuthorList(){
          console.log(this.selectedDataList);

          if (!this.selectedDataList || this.selectedDataList.length === 0||!this.isAllSelected()) {
            
            alert("Please click atleast one checkbox and assign to an author.");
            
          } 
       
          else{
            
          for(let i=0;i<this.selectedDataList.length;i++){

            let categoryName=this.typeList.filter(t=>t.categoryName==this.selectedDataList[i].category);
             if(this.selectedDataList[i].isSelected==true&&this.selectedDataList[i].assignAuthor){
          this.postData.push({
               serviceRequestId: this.selectedDataList[i].serviceRequestId,
               universityId: this.selectedDataList[i].universityId,
              requestDescription: this.selectedDataList[i].requestDescription,
              raisedBy: this.selectedDataList[i].raisedById,
              serviceTypeId: this.selectedDataList[i].serviceTypeId,
              categoryId: parseInt(categoryName[0].categoryId),
              workFlowStatusId: this.selectedDataList[i].statusId,
              assignedBy: parseInt(this.userName),
              assignedTo: parseInt(this.selectedDataList[i].assignAuthor),
              priorityId: this.selectedDataList[i].priorityId,
              statusId: this.selectedDataList[i].statusId,
              serviceRequestSourceId: this.selectedDataList[i].serviceRequestSourceId,
              contactEmailId: this.selectedDataList[i].contactEmailId,
              contactPhoneNo: this.selectedDataList[i].contactPhoneNo,
              resolvedBy: this.selectedDataList[i].resolvedBy,
              remark: this.selectedDataList[i].remark
          });
        }
        }

          const data={
            insUpdServiceRequest:this.postData
          }    
          console.log(data);  
     

          
              this.facService.updateServiceRequest(data,this.userName,this.user.UserId).subscribe(x=>{
            console.log(x);
            const confirmation = confirm('Request send successfully');
            if (confirmation) {
              location.reload();
            }
            else{
              location.reload();
            }

            })
          }
          
        }

        selectedAuthor(i,author){
          for(let t=0;t<this.data.length;t++){
            if(t==i){
              console.log(this.data[i]);
              let checkList=this.selectedDataList.filter(t=>t.serviceRequestId==this.data[i].serviceRequestId&&t.assignAuthor!=this.data[i].assignAuthor)
              if(checkList.length>0){
                for(let x=0;x<checkList.length;x++){
                     this.selectedDataList[i].assignAuthor=author;
                     console.log(this.selectedDataList);
                     
                }            
            }
            else{
              this.selectedDataList.push(this.data[i]);
              console.log(this.selectedDataList); 
            }
            }
          }

        }

  // For stickey blue bar changes
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

  onPageSizeChange(size: string){
    this.page=1;
    this.pageSize = Number(size);
  }


  // exportexcel() {
  // this.facService.SearchUniversity().subscribe(data => {
  //     this.universityList = data;     

  //   this.facService.getPriorityList().subscribe(x=>{
  //     this.priorityList=x;

  //           this.facService.getServiceRequest(this.userName,this.user.UserId,this.user.UniversityId).subscribe(x => {
  //             this.data = x as any;
  //             for(let i=0;i<this.data.length;i++){
  //               let univ=this.universityList.filter(t=>t.id==this.data[i].universityId);
  //                 this.data[i].universityName=univ[0].name;    
  //                 let priorityValue=this.priorityList.filter(t=>t.id==this.data[i].priorityId)
  //                 this.data[i].priority=priorityValue[0].value;
   
  //               }
  //                 console.log(this.data);
  //                 });
  //               });
          
  
  //       console.log(this.data);
  
  //       // Process data and export to Excel
  //      // this.processAndExportToExcel();
  //     });
  // }
  
  processAndExportToExcel() {
    // Make modifications to the data
    this.data.forEach((x, index) => {
      x["SL.NO"] = index + 1;
     
    });
  
    // Create a new object with the desired column order
    const modifiedDataList = this.data.map(({
      universityName, raisedBy, serviceType, category, requestDescription,
      priority, status, createdOn, universityId, serviceRequestId, raisedById,
      assignedById, assignedBy, assignedToId, assignedTo, priorityId, serviceRequestSourceId,
      serviceRequestSourceName, contactEmailId, contactPhoneNo, remark, statusId, resolvedById,
      resolvedBy, serviceTypeId, createdBy, resolvedOn
    }, index) => {
      // Declare index here, if needed
      return {
        "SL.NO": index + 1,
        "UNIVERSITY": universityName,
        "REQUESTED BY": raisedBy,
        "TYPE": serviceType,
        "CATEGORY": category,
        "QUERY": requestDescription,
        "PRIORITY": priority,
        "STATUS": status,
        "CREATED ON": createdOn,
        "UNIVERSITY ID": universityId,
        "SERVICE REQUEST ID": serviceRequestId,
        "RAISED BY ID": raisedById,
        "ASSIGNED BY ID": assignedById,
        "ASSIGN BY": assignedBy,
        "ASSIGN TO ID": assignedToId,
        "ASSIGN TO": assignedTo,
        "PRIORITY ID": priorityId,
        "SERVICE REQUEST SOURCE ID": serviceRequestSourceId,
        "SERVICE REQUEST SOURCE NAME": serviceRequestSourceName,
        "CONTACT EMAILID": contactEmailId,
        "CONTACT PHONENO": contactPhoneNo,
        "REMARK": remark,
        "STATUS ID": statusId,
        "RESOLVED BY ID": resolvedById,
        "RESOLVED BY": resolvedBy,
        "SERVICE TYPE ID": serviceTypeId,
        "CREATED BY": createdBy,
        "RESOLVED ON": resolvedOn
      };
    });
  
    // Export the modified data to Excel
    this.excel.exportAsExcelFile(modifiedDataList, "ServiceRequest");
  }
  sort(columnName: string) {
    if (this.currentSortColumn === columnName) {
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortDirection = 'asc';
    }
    this.currentSortColumn = columnName;
    this.data.sort((a, b) => {
      if (a[columnName] < b[columnName]) {
        return this.currentSortDirection === 'asc' ? -1 : 1;
      } else if (a[columnName] > b[columnName]) {
        return this.currentSortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
  
  sortdate(columnName: string) {
    if (this.currentSortColumn === columnName) {
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortDirection = 'asc';
    }
    this.currentSortColumn = columnName;
  
    this.data.sort((a, b) => {
      const dateA = new Date(a[columnName]);
      const dateB = new Date(b[columnName]);
  
      if (dateA < dateB) {
        return this.currentSortDirection === 'asc' ? -1 : 1;
      } else if (dateA > dateB) {
        return this.currentSortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  ResetAll(){
    this.filterUniversity="";
    this.filterType = "" ;
    this.filterCategory = "";
    this.filterPriority = "";
    this.filterstatus = ""
  }

}
