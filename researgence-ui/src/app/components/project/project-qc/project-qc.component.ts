import { FacultiesService } from 'src/app/components/faculties/faculties.service';
import { AuthService } from '../../../shared/services/firebase/auth.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { AdminclientService } from '../../adminclient/adminclient.service';

@Component({
  selector: 'app-project-qc',
  templateUrl: './project-qc.component.html',
  styleUrls: ['./project-qc.component.scss','./../../../../assets/given/newcss/style.css']
})
export class ProjectQCComponent implements OnInit {

  public universityList:any;
  public userName:string;
  public universityName:any;
  public universityId:string;
  public showDropdown:boolean=false;
  public fill:any;
  public user:any=[]
  public universityparamId:Number;
  isMenuOpen:boolean;
  dataList:any[]=[];
  masterSelected:boolean;
  checklist:any[]=[];
  checkedList:any;
  selectedDataList: any[] = [];
  supportadmin="11";
  support="12";
  //pagination
  collectionSize: any;
  page=1;
  pageSize = 20;
  pageSizes: any[] = ["10","15","20","100"]; 
  showUnivName:any;
   //sort
   currentSortColumn: string;
   currentSortDirection: string;
  isAscending: any;
  dateA:any;
  dateB:any;
  roleid: any;
  Approve: any;
  reject: number;
  Name: any;
  roleName: any;
  isScrolled: any;
  stickyEnable: any;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  role: any;
  excelvalue: any;
  publicationId: any;
  univName:string;
  data:any;
  filterTitle:any;
  hideDrop:boolean=false;
  filterdata:any;
  searchData:string;

  constructor(private service:AdminclientService, private authservice:AuthService,private facService:FacultiesService,
    private menuService:MenuService, private router:Router,private route: ActivatedRoute,private excel:ExcelExportService) { 
    }

  ngOnInit() {
        this.menuService.isMenuOpen$.subscribe(isOpen => {
          this.isMenuOpen = isOpen;
        });
        this.showUnivName=localStorage.getItem("clientUniv");
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

        this.user=this.authservice.getUserDetail();
        this.userName=this.authservice.getProfileObs();
        this.roleid=this.userName;
        console.log(this.roleid);
        
        this.getList();
        this.service.getUniversitytitle(this.user.UserId).subscribe(data => {
          this.data = data;
          console.log(this.data)
        });
       // this.publicationId=this.dataList.filter(x => x.publicationId==publicationid)
  }

      // recreated below for project edit
      // edit(patId,inputSource,univ){  
      //      this.router.navigate(['/Project/Edit/'+patId+'/'+inputSource+'/'+univ]);
      // }

      // edit(){  
      //      this.router.navigate(['/Project/user/details/']);
      // }

      edit(projId,univ) {
        this.router.navigate(['/Project/admin/details/'+projId+"/"+univ]);
      }


  getList() {
    this.service.getprojectApprovalList(this.userName, this.user.UserId,this.universityparamId).subscribe(x => {
      this.dataList = x as any;
      this.filterdata=this.dataList;
      this.collectionSize=this.dataList.length;
      // Populate checklist with the same data as dataList and set isSelected to false by default
      this.checklist = this.dataList.map(item => ({ ...item, isSelected: false }));
      console.log(this.dataList);
    });
  }

  checkUncheckAll() {
    const allItemsAreApproved = this.dataList.every((item) => item.status === 'Approved');
    
    for (const item of this.dataList) {
      if (allItemsAreApproved) {
        item.isSelected = false; 
        this.masterSelected=false;
      } else if (item.status !== 'Approved') {
        item.isSelected = this.masterSelected;
      }
    }
    
    this.isAllSelected(); 
  }

  isAllSelected() {
    const selectedItems = this.dataList.filter((item) => item.isSelected && item.status !== 'Approved');
    const allItemsAreApproved =selectedItems.length === this.dataList.filter((item) => item.status !== 'Approved').length; 
    this.masterSelected = selectedItems.length === this.dataList.length && !allItemsAreApproved;   
    this.selectedDataList = selectedItems;
    this.selectedDataList = selectedItems.map((row) => ({
      pubid: row.projectId,
      inputtype: row.inputSource,
      queue:row.rfsRequestId,
      // Add other columns as needed    
    }));
    console.log( this.selectedDataList);
    
  }

  getCheckedItemList() {
    this.checkedList = this.checklist.filter((item) => item.isSelected);
    this.checkedList = JSON.stringify(this.checkedList);
    console.log(this.checkedList); 
  }

          approveSelectedItems() {
                      let selectedCount = 0;
                    for (const item of this.dataList) {
                      if (item.isSelected) {
                        console.log(item.isSelected);
                        
                      // item.status = 'Approved';
                        selectedCount++;
                      }
                    }
                  
                    this.checkedList = [];
                    this.masterSelected = false;

                    //changed for project qc approval
                    // const postdata = {
                    //   patentListForApproval: this.selectedDataList.map((item) => ({
                    //     inputFrom: item.inputtype,
                    //     rfsPatentQueueId: Number(item.queue),
                    //     patentId: Number(item.pubid),
                    //   }))
                    // };

                     const postdata = {
                      projectListForApproval: this.selectedDataList.map((item) => ({
                        inputFrom: item.inputtype,
                        rfsProjectQueueId: Number(item.queue),
                        projectId: Number(item.pubid),
                      }))
                    };

                  console.log(postdata); 
                  this.Approve=1;
                  
                    if (selectedCount > 0) {

                      this.service.projectQcApproval(postdata,this.user.UserId,this.roleid,this.Approve).subscribe(x=>{                   

                      alert(`${selectedCount} item${selectedCount === 1 ? '' : 's'} approved successfully!`);
                      window.location.reload();
                
                    });

                      console.log(`${selectedCount} item${selectedCount === 1 ? '' : 's'} approved successfully!`);
                    } else {
                      alert('No items selected for approval.');
                    }
          }

      onRejectButtonClick() {
              let selectedCount = 0;
              for (const item of this.dataList) {
              
                if (item.isSelected) {
                  console.log(item.isSelected);
                  
                  //item.status = 'Rejected';
                  selectedCount++;
                }
              }
              this.masterSelected = false;
              this.checkedList = [];


              console.log(this.selectedDataList);

              //changed for project qc approval
              // const postdata = {
              //   patentListForApproval: this.selectedDataList.map((item) => ({
              //     inputFrom: item.inputtype,
              //     rfsPatentQueueId: Number(item.queue),
              //     patentId: Number(item.pubid),
              //   }))
              // };

              const postdata = {
                projectListForApproval: this.selectedDataList.map((item) => ({
                  inputFrom: item.inputtype,
                  rfsProjectQueueId: Number(item.queue),
                  projectId: Number(item.pubid),
                }))
              };

              console.log(postdata); 
            this.reject=0;

            if (selectedCount > 0) {

              this.service.projectQcApproval(postdata,this.user.UserId,this.roleid,this.reject).subscribe(x=>{                   

              alert(`${selectedCount} item${selectedCount === 1 ? '' : 's'} Rejected Successfully!`);
              window.location.reload();
              });

              console.log(`${selectedCount} item${selectedCount === 1 ? '' : 's'} Rejected Successfully!`);
            } else {
              alert('No items selected for reject.');
            }
            console.log(postdata);
        }

    sort(columnName: string) {
      if (this.currentSortColumn === columnName) {
        this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.currentSortDirection = 'asc';
      }
      this.currentSortColumn = columnName;
      this.dataList.sort((a, b) => {
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
    
      this.dataList.sort((a, b) => {
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
   
    
    exportexcel() {
      this.service.getprojectApprovalList(this.userName, this.user.UserId, this.universityparamId)
        .subscribe((data: any) => {
          this.dataList = data;
          console.log(data);
    
          // Process data and export to Excel
          this.processAndExportToExcel();
        });
    }
    
    processAndExportToExcel() {
      // Make modifications to the data
      this.dataList.forEach((x, index) => {
        x["SL.NO"] = index + 1;
        delete x.projectId;
        delete x.inputfrom;
        delete x.statusId;
        // delete x.authors;
      });
    
      // Create a new object with the desired column order
      const modifiedDataList = this.dataList.map(({
        srcUniversityName,projectTitle, projectId, projectDescription,projectFundingType, sanctionedAmount, projectStatus,inventors,applicants, inputSource, createdByName,
        createdBy, createdDate, rfsRequestId, status,
        
         }, index) => {
        // Declare index here, if needed
        return {
          "SL.NO": index + 1,
          "UNIVERSITY": srcUniversityName,
          "TITLE NAME": projectTitle,
          "Project ID": projectId,
          "Project Description":projectDescription,
          "Funding Type":projectFundingType,
          "Sanctioned Amount":sanctionedAmount,
          "PROJECT STATUS": projectStatus,
          // "INVENTORS": inventors,
          // "APPLICANT": applicants,
          "INPUT SOURCE": inputSource,
          "CREATED BY NAME": createdByName,
          "CREATED BY": createdBy,
          "CREATED DATE": createdDate,
          // "RFS REQUEST ID": rfsRequestId,
          "STATUS": status
        };
      });
    
      // Export the modified data to Excel
      this.excel.exportAsExcelFile(modifiedDataList, "Project-QC-Approval List");
    }
    
    changeTitle(x:String) {

      this.hideDrop=true;
      this.filterTitle = this.data.filter(e =>
        e.universityName.toLowerCase().includes(x.toLowerCase())
      );
      if (this.filterTitle.length === 0) {
        this.hideDrop=false;
        }
        if(x==""){
          this.hideDrop=false;
          this.getList();
        }
  }

    onSelectTitle(universityId: number, universityName: string) {
      this.univName = universityName;
      console.log(universityName);
      
      this.hideDrop=false;
      console.log(this.filterdata);
      
      const matchedUniversity = this.filterdata.filter(item => item.srcUniversityName==universityName);
      console.log(matchedUniversity);
      
      this.dataList=matchedUniversity;
      this.collectionSize=this.dataList.length;
    this.page = Math.max(1, Math.min(this.page, this.dataList.length));
    }

    changeFilters(val:string){
         this.dataList =  this.filterdata.filter(item => item.createdByName.toLowerCase().includes(val.toLowerCase())||item.inputSource.toLowerCase().includes(val.toLowerCase()));
         this.collectionSize=this.dataList.length;
         this.page = Math.max(1, Math.min(this.page, this.dataList.length));
    }

}
