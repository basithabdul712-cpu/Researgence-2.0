import { ChangeDetectorRef, Component, Directive, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultiesService } from '../../faculties/faculties.service';
import { GeneralApiService } from '../../general-api.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { AdminclientService } from '../../adminclient/adminclient.service';
import { HttpClient } from '@angular/common/http';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-patent-rfs-list',
  templateUrl: './patent-rfs-list.component.html',
  styleUrls: ['./patent-rfs-list.component.scss','./../../../../assets/given/newcss/style.css']
})
export class PatentRfsList implements OnInit {

  public universityList:any;
  public userName:string;
  public universityName:any;
  public universityId:string="";
  public showDropdown:boolean=false;
  public fill:any;
  public user:any=[]
  isMenuOpen:boolean;
  dataList:any;
  masterSelected:boolean;
  checklist:any[]=[];
  checkedList:any;
  selectedDataList: any[] = [];
  supportAdmin="11";
  support="12";
  pdfNew:any;
  universityFilter:any;
  name: string;
  data: any;
  filteredData: any[];
  universityShortName: any;
  hideDrop:boolean=false;
  filterTitle: any[]=[];
  searchData: String="";
  university: any;
  page=1;
  pageSize = 20;
  collectionSize:any;
  pageSizes: any[] = ["10","15","20","100"]; 
  pdfPath:any;
  tempPdf:string;
   //sort
   currentSortColumn: string;
   currentSortDirection: string;
  isAscending: any;
  dateA:any;
  dateB:any;
  startrow:number=0;
  endrow:number=20;
  totalPages: number;
  Name: any;
  roleName: any;
  isScrolled: any;
  stickyEnable: any;
  role: any;
  rfsTypeFilter:string;
  status:string;
  userStatusFilter:any;
  filterdata:any;

@ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;

  constructor(private service:AdminclientService, private authservice:AuthService,private route: ActivatedRoute,private modalService: NgbModal,
    private menuService:MenuService, private router:Router, private http: HttpClient, private facultyservice: FacultiesService,private cdf:ChangeDetectorRef,private excel:ExcelExportService) { }

  ngOnInit(){

          this.menuService.isMenuOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
          });
            this.user=this.authservice.getUserDetail();
            console.log(this.user);
            localStorage.removeItem("universityId");
            this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            this.userName=this.authservice.getProfileObs();
          //For rolename getting
          // this.authservice.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
            this.role=JSON.parse(localStorage.getItem('RoleSelection'));
            const data=this.role.filter(item=> item.roleId==this.userName);
            this.roleName=data[0].roleName;
            console.log(this.roleName)
            // });
 
          if(this.userName==this.supportAdmin){
          this.route.params.subscribe(params => {     
            this.universityId=params.univId;    
          });
         }

         this.service.getRFSPatentList(this.userName,this.user.UserId,this.universityId).subscribe(x => {
          this.dataList = x ;
          this.filterdata=this.dataList;
          console.log(this.dataList);
          this.collectionSize=this.dataList.length;
          this.totalPages = Math.ceil(this.collectionSize / this.pageSize); 
          
         this.page = Math.max(1, Math.min(this.page, this.dataList.length));
         
         this.startrow = (this.page - 1) * this.pageSize;
         this.endrow = Math.min(this.startrow + this.pageSize, this.collectionSize);
          console.log(this.page);  
        });

    // this.getList();
    this.service.getUniversitytitle(this.user.UserId).subscribe(data => {
      this.data = data;
      console.log(this.data)
      if(this.userName==this.supportAdmin){
      this.university = this.data.filter(item => item.universityId == this.universityId);
      console.log(this.university);
        this.name = this.university[0].universityName;
        console.log(this.name)
      }
    });
    this.service.getServiceStatus().subscribe(response => {
      this.userStatusFilter = response;
      console.log(response);
    });

  }

  getList() {
    console.log("came");
    
    this.service.getRFSPatentList(this.userName,this.user.UserId,this.universityId).subscribe(x => {
      this.dataList = x as any;
      this.filterdata=this.dataList;
      console.log(this.dataList);
      this.collectionSize=this.dataList.length;
      this.totalPages = Math.ceil(this.collectionSize / this.pageSize); 
      
     this.page = Math.max(1, Math.min(this.page, this.dataList.length));
     
     this.startrow = (this.page - 1) * this.pageSize;
     this.endrow = Math.min(this.startrow + this.pageSize, this.collectionSize);
      console.log(this.page);  
    });
  }

  evaluate(RFSRequestId,type,patentId){
    
    if(patentId==null){
      patentId = 0;
    }
    localStorage.setItem("universityId",this.universityId);
    this.router.navigate(['/Patent/evaluation',RFSRequestId,type,patentId]);
  }


  testNew(pdfLoc){
    
    if(pdfLoc!=null){
    pdfLoc=pdfLoc.slice(0, pdfLoc.lastIndexOf('.'));
    console.log(pdfLoc);
      
      this.tempPdf=pdfLoc;
      console.log(this.tempPdf);  
      const pdfurl=`${environment.nodeServerUrl}/api/pdf?pdfPath=${this.tempPdf}`;
      this.http.get(pdfurl, { responseType: 'blob' }).subscribe((blob: Blob) => {
        const pdfUrl = URL.createObjectURL(blob);
        window.open(pdfUrl, '_blank');
      });
    }
    else{
      alert("Pdf not found");
    }
    
  }

  changeTitle(x:String) {

    if(x==""){  
        this.hideDrop=false;
  
    }
    else{
      this.hideDrop=true;
      this.filterTitle = this.data.filter(e =>
        e.universityName.toLowerCase().includes(x.toLowerCase())
      );
   if (this.filterTitle.length === 0) {
        this.searchData = x;
     this.hideDrop=false;
    }
    this.hideDrop = this.searchData.length > 0;
    }

}


  onSelectTitle(universityId: string, universityName: string) {

    this.searchData = universityName;
    this.hideDrop=false;
  
  }

  advSearch(){
    if(this.userName==this.support){
     this.universityId="university";
    }
      this.router.navigate(['/Patent/rfs/advance-search/'+this.universityId])
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

  onPageSizeChange(size: string){
    this.page = 1; 
    this.pageSize = Number(size);
    this.endrow=this.pageSize+this.startrow;
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

 getCompareExcelData() {


  this.service.getRFSPatentList(this.userName,this.user.UserId,this.universityId).subscribe(x => {
    this.dataList = x as any;
    console.log(this.dataList);
      
    });
  }

  exportExcel() {
    // this.service.getRFSPatentList(this.userName,this.user.UserId,this.universityId).subscribe(x => {
    //   this.dataList = x as any;
     
    
    //     console.log(this.dataList);
  
        // Process data and export to Excel
        this.processAndExportToExcel();
      // });
  }
  
  processAndExportToExcel() {
    // Make modifications to the data
    this.dataList.forEach((x, index) => {
      x["SL.NO"] = index + 1;
     
    });
    
    // Create a new object with the desired column order
    const modifiedDataList = this.dataList.map(({ userFullName, departmentName, patentTitle, applicationNumber,
      patentOfficeName, createdDate, rfsType, status }, index) => {
      // Declare index here, if needed
      return {
        "SL.NO": index + 1,
        "Author Details": "UserName :"+userFullName+",Department :"+departmentName,
        "Patent Details": "Title :"+ patentTitle +",App.No :"+ applicationNumber +",Office Name :"+ patentOfficeName ,
        "CreatedDate": createdDate,
        "RFS Type": rfsType,
        "Status": status
      };
    });
    
  console.log(modifiedDataList); 
  
    // Export the modified data to Excel
    this.excel.exportAsExcelFile(modifiedDataList, "Patent-RFS-List");
  }  

      filter() {

        if ( this.rfsTypeFilter === "" || this.status === "" || this.searchData === "") {
                  this.dataList = this.filterdata;
              }

              this.dataList = this.filterdata.filter(item => {
                const matchRfsType = this.rfsTypeFilter ? this.rfsTypeFilter.includes(item.rfsType) : true;
                const matchStatus = this.status ? this.status.includes(item.status) : true;
                let matchUniv = true;
                  if (this.userName == this.support) {
                    matchUniv = this.searchData ?  this.searchData.includes(item.universityname) : true;
                  }
                return matchRfsType && matchStatus && matchUniv;
              });
            this.collectionSize=this.dataList.length;
        
      }

        rejectPatent(id){

           let tempData=this.filterdata.filter(x=>x.rfsPatentQueueId==id);
           let rfsTypeId;
            if(tempData[0].rfsType=="Linked"){
              rfsTypeId=1;
            }
            else if(tempData[0].rfsType=="Manual"){
              rfsTypeId=3;
            }
            else{
              rfsTypeId=2;
            } 

           const data={
            rfsPatentQueue: {
              rfsPatentQueueId: tempData[0].rfsPatentQueueId, 
              universityId: tempData[0].universityId,
              userId: tempData[0].userID,
              applicationNumber: tempData[0].applicationNumber,   
              patentId: tempData[0].patentId,
              patentTitle: tempData[0].patentTitle,
              patentOfficeId:tempData[0].patentOfficeId,
              webLink: null,
              pdFfileLocation: null,
              rfsTypeId: rfsTypeId,
              actionTypeId: 3,
              remark: this.remark,
              workflowstatusId: 6,
              swappedInventorUserId: 0,
              swappedApplicantUserId: 0,
              takenBy: 0,
              verifiedBy: 0
            }
          }

            const confirmation = confirm('Please confirm to reject detail');
            if (confirmation) { 

            this.facultyservice.savePatent(data,this.user.UserId,this.userName).subscribe(x=>{
              this.modalService.dismissAll();
                  this.ngOnInit();
            })
           }
            else{
              
            }
        }

        remark:string="";
        newStateModel(model:any){
          this.modalService.open(model);  
        }

        clearFilter(){

            this.rfsTypeFilter= "";
            this.status = "";
            this.searchData = "";

            this.service.getRFSPatentList(this.userName,this.user.UserId,this.universityId).subscribe(x => {
                    this.dataList = x ;
                    this.filterdata=this.dataList;
                    console.log(this.dataList);
                    this.collectionSize=this.dataList.length;
                    this.totalPages = Math.ceil(this.collectionSize / this.pageSize); 
                    
                  this.page = Math.max(1, Math.min(this.page, this.dataList.length));
                  
                  this.startrow = 0;
                  this.endrow = Math.min(this.startrow + this.pageSize, this.collectionSize);
                    console.log(this.page);  
            });
        }

}

