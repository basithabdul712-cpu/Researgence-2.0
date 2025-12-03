import { FacultiesService } from 'src/app/components/faculties/faculties.service';
import { AuthService } from '../../../shared/services/firebase/auth.service';
import { AdminclientService } from '../adminclient.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-publication-qc-list',
  templateUrl: './publication-qc-list.component.html',
  styleUrls: ['./publication-qc-list.component.scss','./../../../../assets/given/newcss/style.css']
})
export class PublicationQcListComponent implements OnInit {

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
          this.universityparamId=params.university;
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
      edit(publicationid,inputSource,univ){
        
        this.router.navigate(['/clientadmin/dfs-editor/editor/support/new/'+publicationid+'/'+inputSource+'/'+univ]);

      }

  getList() {
    this.service.getDFSPublicationList(this.userName, this.user.UserId,this.universityparamId).subscribe(x => {
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
      pubid: row.publicationId,
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

            const postdata = {
              pubListForApproval: this.selectedDataList.map((item) => ({
                inputFrom: item.inputtype,
                rfsPublicationQueueId: Number(item.queue),
                publicationId: Number(item.pubid),
              }))
            };

          console.log(postdata); 
          this.Approve=1;
          
            if (selectedCount > 0) {

              this.service.rfsApproval(postdata,this.user.UserId,this.roleid,this.Approve).subscribe(x=>{                   

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

    const postdata = {
      pubListForApproval: this.selectedDataList.map((item) => ({
        inputFrom: item.inputtype,
        rfsPublicationQueueId: Number(item.queue),
        publicationId: Number(item.pubid),
      }))
    };

    console.log(postdata); 
   this.reject=0;

   if (selectedCount > 0) {

    this.service.rfsApproval(postdata,this.user.UserId,this.roleid,this.reject).subscribe(x=>{                   

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
      this.service.getDFSPublicationList(this.userName, this.user.UserId, this.universityparamId)
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
        delete x.publicationId;
        delete x.publicationSourceId;
        delete x.statusId;
        delete x.authors;
      });
    
      // Create a new object with the desired column order
      const modifiedDataList = this.dataList.map(({
        srcUniversityName,publicationTitle, publicationSourceName, doi, inputSource, createdByName,
        createdBy, createdDate, rfsRequestId, status, publicationId, publicationSourceId,
        statusId, authors, srcUniversityId, authorAffiliation, publicationCitation, publicationSourceDBMetrics,articleType,volumeNumber,
        issueNumber,bPage,ePage
      }, index) => {
        // Declare index here, if needed
        return {
          "SL.NO": index + 1,
          "UNIVERSITY": srcUniversityName,
          "TITLE NAME": publicationTitle,
          "SOURCE NAME": publicationSourceName,
          "DOI": doi,
          "INPUT SOURCE": inputSource,
          "CREATED BY NAME": createdByName,
          "CREATED BY": createdBy,
          "CREATED DATE": createdDate,
          "RFS REQUEST ID": rfsRequestId,
          "STATUS": status,
          "PUBLICATION ID": publicationId,
          "PUBLICATION SOURCE ID": publicationSourceId,
          "STATUS ID" : statusId,
          "AUTHORS": authors,
          "SRC UNIVERSITY ID": srcUniversityId,
          "AUTHOR AFFILIATION": authorAffiliation,
          "PUBLICATION CITATION": publicationCitation,
          "PUBLICATION SOURCE DB METRICS": publicationSourceDBMetrics,
          "ARTICLE TYPE":articleType,
          "VOLUME NUMBER":volumeNumber,
          "ISSUE NUMBER":issueNumber,
          "BPAGE":bPage,
          "EPAGE":ePage
        };
      });
    
      // Export the modified data to Excel
      this.excel.exportAsExcelFile(modifiedDataList, "ViewPublication");
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
