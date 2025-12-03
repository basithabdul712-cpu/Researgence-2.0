import { filter } from 'rxjs/operators';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ScorebookService } from '../../scorebook/scorebook.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { GeneralApiService } from '../../general-api.service';
import { AdminclientService } from '../adminclient.service';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { FacultiesService } from '../../faculties/faculties.service';
import { Userdata } from '../user-list/userdata';
import { log } from '@amcharts/amcharts4/.internal/fabric/fabric-impl';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls:['./user-list.component.scss','./../../../../assets/given/newcss/style.css']

})
export class UserListComponent implements OnInit {
  filtervalue:any;
   filterdata:boolean=false;

  @ViewChild('htmlData', {static: false}) content: ElementRef;

  udata: Userdata = new Userdata();

  userList: any;
  usermanage: any;
  selectedCamp:string="AllCampus";
  id:number;
  locationid:any;
  instid:any;
  institute:any;
  department:any;
  dept:any;
  college:any;
  data:any[];
  alldropdown:any;
  campus:any;
  location:any;
  dropdownList:any;
  selectedCategory: any;
  selectedInst:string;
  selectedDepart:string;
  pdfData: string
  facultiesList: any;
  facultiespub:any;
  filter:string;
  filterValue:string;
  searchText: string = '';
  customerUniv:any;
  searchQueryTemp:any;
  //sort
  currentSortColumn: string;
  currentSortDirection: string;
  facultiesListdata: any;
  //paginate
  page:number=1;
  pageSize:number=20;
  pageSizes: any[] = ["10","15","20","50","100"];
  collapsablesize:any;
  row: any;
  selectedRows: any;
  displayedFaculties: any;
  userdetail:any;
  layerType:any;
  userRole:string;
  user: any;
  filterDepart:string;
  filterInst:string;
  filterCamp:string;
  filterSchl:string;
  deptvalue:any;
  isMenuOpen: boolean;
  newuserurl: string;
  value: any;
  instValue:any;
  paginatelist:any;
  totalPages: number;
  tcollectionSize: number = 0;
  tpage: number = 1;
  tpageSize: number = 20;
  dynamicpage: any;
  dynamicpages:any;
  startrow:number=0;
  endrow:number=20;
  filtereduserdata: any;
  download:number=0;
  excelList:any;
  excelvalue:any;
  filterLayer:any;
  lensub:any;
  tableHeaders:any;
  cellWidth:any;
  uniqlocattion: any;
  filters:number=0;
  roleId: any;
  filtercondition: any;
///university filter
hideDrop:boolean=false;
filterTitle: any[]=[];
searchData: String="";
supportAdmin="11";
support="12";
dataList: any[]=[];
  university: any[];
  name: any;
  datas:any;
  num: number=0;
  uniqinstitute: any;
  univId:number=1;
  layerCampus:any;
  layerSchool:any;
  layerInst:any;
  layerDept:any;
  schlId:number;
  deptId:number;
  instId:number;
  campId:number;
  newfeed:any;
  layerInsSchCamDep:any;
  tempUnivID:any;
  univList:any;
Name: any;
roleName: any;
isScrolled: any;
stickyEnable: any;
deptGrpId:number | null = null;
  role: any;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  
  constructor(
    private adminservice:AdminclientService,
    private route: ActivatedRoute,private comSearch: CommonsearchService,
    private router:Router,private menuService: MenuService,private service:FacultiesService,
    private excel: ExcelExportService,private authservice:AuthService,private gservice:GeneralApiService) { }

  ngOnInit() {

    this.newuserurl='/facultyProfiles/new/screen';

     //for accessing menuopen 
     this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });

    this.userdetail=this.authservice.getUserDetail();
    this.userRole=this.authservice.getProfileObs();

   
    this.Name=this.userdetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
   
  //For rolename getting
  // this.authservice.RoleSelection(this.userdetail.UniversityId,this.userdetail.UserId).subscribe(x=>{
    this.role=JSON.parse(localStorage.getItem('RoleSelection'));
    const data=this.role.filter(item=> item.roleId==this.userRole);
    this.roleName=data[0].roleName;
    console.log(this.roleName)
    // })
    this.layerType=this.userdetail.LayerType;
    this.hideDrop=true;

        //search box
      this.comSearch.getSearchQuery().subscribe(query => {
        this.filtereduserdata = this.dynamicpages?.filter(item => {
          const authorNameMatch = item.fullName && item.fullName.toLowerCase().includes(query.toLowerCase());
          const departmentMatch = item.departmentName && item.departmentName.toLowerCase().includes(query.toLowerCase());
          const instituteMatch = item.instituteName && item.instituteName.toLowerCase().includes(query.toLowerCase());
      
          return authorNameMatch || departmentMatch || instituteMatch;
        });
      });

      if(this.userRole!="12"){
        this.univId=this.userdetail.UniversityId;
       }

       if(this.userRole=="12"){

            if(localStorage.getItem("ManagementUnivId")!=null){
              this.univId=parseInt(localStorage.getItem("ManagementUnivId"));
              console.log(this.univId);
              this.adminservice.getUniversitytitle(this.userdetail.UserId).subscribe(data => {
                this.univList= data;
                const filterUniv=this.univList.filter(item=> item.universityId==this.univId);
                this.searchData=filterUniv[0].universityName;
                this.hideDrop=false;     
                });
                
                if(this.univId){
                  this.getUserData(); 
                  this.getExcelData();
                }
            }

       }
    
      this.searchBar();

      if(this.userRole=="5"||this.userRole=="17"){
        this.getUserData(); 
        this.getExcelData();
      }
     
  // for campus , institute and dept dropdown
  this.service.getUnivLocSchInstDept(this.userdetail.UniversityId,this.userRole,this.userdetail.UserId,this.campId,this.schlId,this.instId,this.deptId).subscribe(data => {
    this.campus = data;
        if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
          this.layerInsSchCamDep=this.campus;
          this.layerCampus=Array.from(new Set(this.campus.map((item : any)=>item.locationName)));
        }
        else if(this.layerType=='4LType2'||this.layerType=='3LType3'){
          this.layerInsSchCamDep=this.campus;
          this.layerSchool=Array.from(new Set(this.campus.map((item : any)=>item.schoolName)));
        }
        else if(this.layerType=='2LType1'){
          this.layerInsSchCamDep=this.campus;
          this.layerInst=Array.from(new Set(this.campus.map((item : any)=>item.instituteName)));
        }
        else if(this.layerType=='2LType2'){
          this.layerInsSchCamDep=this.campus;
          this.layerDept=this.campus;
        }
    });

      if(this.userRole=="12"){
          this.adminservice.getUniversitytitle(this.userdetail.UserId).subscribe(data => {
            this.datas = data;
            this.customerUniv=this.datas;
            console.log(this.data)
          });
        }

   }
  
    tagInput: string = '';
    tags: string[] = [];

    onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        this.addTag();
      }
    }

    addTag() {
      if (this.tagInput) {
        this.tags.push(this.tagInput);
        this.tagInput = '';
      }
    }

  sort(columnName: string) {
    if (this.currentSortColumn === columnName) {
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortDirection = 'asc';
    }
    this.currentSortColumn = columnName;
    this.filtereduserdata.sort((a, b) => {
      if (a[columnName] < b[columnName]) {
        return this.currentSortDirection === 'asc' ? -1 : 1;
      } else if (a[columnName] > b[columnName]) {
        return this.currentSortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  searchQuery = "";
      searchBar() {
        console.log(this.searchQuery);
        this.comSearch.setSearchQuery(this.searchQuery);
      }

  gotoedit(UniversityId,UserId){
    
    this.userRole=this.authservice.getProfileObs();
    if(this.userRole!='11'){
    this.router.navigate(['/facultyProfiles/edit/screen/edit',UniversityId,UserId])
    }

  }

  gotoview(UniversityId,UserId){
    this.router.navigate(['/facultyProfiles/view/screen',UniversityId,UserId])
  }

  downloadPdf(): void {
    this.download=1;
    
    this.udata.universityId = this.univId;
    this.udata.roleId = this.roleId;
    this.udata.loginUserId = this.user.UserId;
    this.udata.startRow = this.startrow;
    this.udata.endRow = this.endrow;
    this.udata.download = this.download;
    this.udata.filter = this.filters;
    
    this.adminservice.GetUserList(this.udata)
    .subscribe((data) => {
      console.log('Response:', data);
      this.dynamicpage = data;
      this.dynamicpages = this.dynamicpage?.dataList ?? [];
      console.log(this.dynamicpages);
      for(let i=0;i<this.dynamicpages.length;i++){
        this.dynamicpages[i].roles=this.dynamicpages[i].roles.replace(/,/g, ', ');
      }

      const records = this.dynamicpages;

        let headers: string[] = [];
        let columnsMap: any = {};
    
        if (this.layerType == "3LType2") {
          headers =  ['SL.NO', 'USER ID', 'EMP.NO', 'FACULTY NAME', 'DEPARTMENT', 'LOCATION', 'STATUS', 'TYPE'];
          columnsMap = {
            'SL.NO': 'rowNumber',
            'USER ID': 'userId',
            'EMP.NO': 'employeeId',
            'FACULTY NAME': 'fullName',
            'DEPARTMENT': 'departmentName',
            'LOCATION': 'locationName',
            'STATUS': 'userStatus',
            'TYPE': 'roles',
          };
        } else if (this.layerType == "2LType1") {
          headers =  ['SL.NO', 'USER ID', 'EMP.NO', 'FACULTY NAME', 'DEPARTMENT', 'INSTITUTE', 'STATUS', 'TYPE'];
          columnsMap = {
            'SL.NO': 'rowNumber',
            'USER ID': 'userId',
            'EMP.NO': 'employeeId',
            'FACULTY NAME': 'fullName',
            'DEPARTMENT': 'departmentName',
            'INSTITUTE': 'instituteName',
            'STATUS': 'userStatus',
            'TYPE': 'roles',
          };
        } else if (this.layerType == "2LType2") {
          headers =  ['SL.NO', 'USER ID', 'EMP.NO', 'FACULTY NAME', 'DEPARTMENT', 'STATUS', 'TYPE'];
          columnsMap = {
            'SL.NO': 'rowNumber',
            'USER ID': 'userId',
            'EMP.NO': 'employeeId',
            'FACULTY NAME': 'fullName',
            'DEPARTMENT': 'departmentName',
            'STATUS': 'userStatus',
            'TYPE': 'roles',
          };
        } 
        else if(this.layerType == "3LType1"){
          headers =  ['SL.NO', 'USER ID', 'EMP.NO', 'FACULTY NAME', 'DEPARTMENT', 'INSTITUTE', 'LOCATION', 'STATUS', 'TYPE'];
          columnsMap = {
            'SL.NO': 'rowNumber',
            'USER ID': 'userId',
            'EMP.NO': 'employeeId',
            'FACULTY NAME': 'fullName',
            'DEPARTMENT': 'departmentName',
            'INSTITUTE': 'instituteName',
            'LOCATION': 'locationName',
            'STATUS': 'userStatus',
            'TYPE': 'roles',
          };
        }
        else if(this.layerType == "4LType2"||this.layerType == "3LType3"){
          headers =  ['SL.NO', 'USER ID', 'EMP.NO', 'FACULTY NAME', 'DEPARTMENT', 'INSTITUTE', 'SCHOOL', 'STATUS', 'TYPE'];
          columnsMap = {
            'SL.NO': 'rowNumber',
            'USER ID': 'userId',
            'EMP.NO': 'employeeId',
            'FACULTY NAME': 'fullName',
            'DEPARTMENT': 'departmentName',
            'INSTITUTE': 'instituteName',
            'SCHOOL': 'schoolName',
            'STATUS': 'userStatus',
            'TYPE': 'roles',
          };
        }
        else {
          headers =  ['SL.NO', 'USER ID', 'EMP.NO', 'FACULTY NAME', 'DEPARTMENT', 'INSTITUTE', 'SCHOOL', 'LOCATION', 'STATUS', 'TYPE'];
          columnsMap = {
            'SL.NO': 'rowNumber',
            'USER ID': 'userId',
            'EMP.NO': 'employeeId',
            'FACULTY NAME': 'fullName',
            'DEPARTMENT': 'departmentName',
            'INSTITUTE': 'instituteName',
            'SCHOOL': 'schoolName',
            'LOCATION': 'locationName',
            'STATUS': 'userStatus',
            'TYPE': 'roles',
          };
        }
    
        const mappedData = records.map(obj => {
          const updatedObj: any = {};
          for (const header of headers) {
            const columnName = columnsMap[header];
            updatedObj[header] = obj?.[columnName]?.toString() ?? '';
          }
          return updatedObj;
        });



    // Call the PDF generation method
    this.generatePdf(mappedData);
      });
  }

   async  generatePdf(records: any[]){
     
      const doc = new jsPDF('landscape', 'pt', 'a4');
      let pageIndex = 1;
      let recordIndex = 0;
      const recordsPerPage = 10;
      this.cellWidth=90;
       this.tableHeaders = ['SL.NO', 'USER ID', 'EMP.NO', 'FACULTY NAME', 'DEPARTMENT', 'INSTITUTE', 'LOCATION', 'STATUS', 'TYPE'];        
      if(this.layerType=="3LType2")
      {
       this.tableHeaders = ['SL.NO', 'USER ID', 'EMP.NO', 'FACULTY NAME', 'DEPARTMENT', 'LOCATION', 'STATUS', 'TYPE'];
       //this.cellWidth=100;
      }
      else if(this.layerType=="2LType1")
      {
         this.tableHeaders = ['SL.NO', 'USER ID', 'EMP.NO', 'FACULTY NAME', 'DEPARTMENT', 'INSTITUTE', 'STATUS', 'TYPE'];
         //this.cellWidth=100;
      }
      else if(this.layerType=="2LType2")
      {
         this.tableHeaders = ['SL.NO', 'USER ID', 'EMP.NO', 'FACULTY NAME', 'DEPARTMENT','STATUS', 'TYPE'];
         //this.cellWidth=115;
      }
      else if(this.layerType=="3LType1"){
         this.tableHeaders = ['SL.NO', 'USER ID', 'EMP.NO', 'FACULTY NAME', 'DEPARTMENT', 'INSTITUTE', 'LOCATION', 'STATUS', 'TYPE'];        
         //this.cellWidth=90;
      }
      else if(this.layerType=="4LType2"||this.layerType=="3LType3"){
        this.tableHeaders = ['SL.NO', 'USER ID', 'EMP.NO', 'FACULTY NAME', 'DEPARTMENT', 'INSTITUTE', 'SCHOOL', 'STATUS', 'TYPE'];        
        //this.cellWidth=90;
     }
     else {
      this.tableHeaders = ['SL.NO', 'USER ID', 'EMP.NO', 'FACULTY NAME', 'DEPARTMENT', 'INSTITUTE', 'SCHOOL', 'LOCATION', 'STATUS', 'TYPE'];        
      //this.cellWidth=90;
   }
      const columnCount = this.tableHeaders.length;
      console.log(columnCount);
     this.cellWidth = doc.internal.pageSize.getWidth() / columnCount; // Calculate cell width based on page width
      console.log(this.cellWidth);
      const headingText = `USER DETAILS-${this.searchData}`; // Heading text
      const headingFontSize = 16; // Heading font size
      const headingMarginTop = 25; // Margin top for the heading
      doc.text(headingText, doc.internal.pageSize.getWidth() / 2, headingMarginTop, { align: 'center' });
    
      while (recordIndex < records.length) {
        const recordsOnPage = records.slice(recordIndex, recordIndex + recordsPerPage);
    
        doc.setFontSize(headingFontSize); // Set the font size for the heading
    
        doc.setFontSize(12); // Set the font size for the page header

       // doc.text(`Page ${pageIndex}`, 10, 10);
       doc.text(`${pageIndex}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });



        this.generateTable(doc, recordsOnPage, this.tableHeaders, 0, 10, columnCount, this.cellWidth);
    
        if (pageIndex !== Math.ceil(records.length / recordsPerPage)) {
          doc.addPage();
        }
    
        pageIndex++;
        recordIndex += recordsPerPage;
      }
    
      doc.save(`USER DETAILS-${this.searchData}.pdf`);
    }
    
private generateTable(doc: any, data: any[], headers: string[], startX: number, startY: number, columnCount: number, cellWidth: number): void {
    const tableHeight = 45; // Increase table height
    const cellHeight = 45; // Increase cell height for both headers and data cells
    const minimumFontSize = 8; // Minimum font size for readability
    const marginTop = 40; // Margin top for the table
    const lineHeightRatio = 1.0; // Line height ratio

    doc.setLineWidth(0.5); // Set line width for the border

    doc.setFont('helvetica', 'bold');
    doc.rect(startX, startY + marginTop, cellWidth * columnCount, tableHeight, 'S'); // Draw the header rectangle border

    doc.setFont('helvetica', 'bold');
    headers.forEach((header, index) => {
        doc.setFontSize(10); // Set the font size for table headers
        doc.setFillColor(65, 65, 65);
        doc.setTextColor(255, 255, 255);
        doc.rect(startX + index * cellWidth, startY + marginTop, cellWidth, tableHeight, 'FD'); // Draw the header cell rectangle border and fill it with the background color
        doc.text(startX + index * cellWidth + cellWidth / 2, startY + marginTop + tableHeight / 2 + 3, header, { align: 'center', baseline: 'middle' });
    });

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0); // Set text color to black

    data.forEach((record, rowIndex) => {
        const rowY = startY + marginTop + (rowIndex + 1) * cellHeight;
        const slNo = record['SL.NO'];
        const isEvenRow = slNo % 2 === 0;

        Object.entries(record).forEach(([key, value], columnIndex) => {
            let fontSize = 9; // Initial font size
            let displayValue = value !== null ? value.toString() : ''; // Handle null values

            const lines = this.wordWrap(displayValue, cellWidth - 2, fontSize); // Apply word wrap to the cell content
            const lineHeight = fontSize * lineHeightRatio; // Set the line height

            const cellLines: string[] = [];
            lines.forEach(line => {
                if (doc.getStringUnitWidth(line) * fontSize > cellWidth - 2) {
                    // If a line still exceeds the cell width after word wrap, apply secondary word wrap
                    const secondaryLines = this.wordWrap(line, cellWidth - 2, fontSize);
                    cellLines.push(...secondaryLines);
                } else {
                    cellLines.push(line);
                }
            });

            const cellLinesCount = cellLines.length;
            const cellLinesHeight = lineHeight * cellLinesCount;
            const cellContentStartY = rowY + (cellHeight - cellLinesHeight) / 2;

            if (isEvenRow) {
                doc.setFillColor(219, 210, 210); // Set color for even rows (red)
            } else {
                doc.setFillColor(255, 255, 255); // Set color for odd rows (white)
            }

            doc.rect(startX + columnIndex * cellWidth, rowY, cellWidth, cellHeight, 'FD'); // Draw the record rectangle border and fill it with the background color
            doc.setFontSize(fontSize); // Set font size back to the calculated value
            cellLines.forEach((line, lineIndex) => {
                const xPos = startX + columnIndex * cellWidth + cellWidth / 2; // Calculate horizontal position
                const yPos = cellContentStartY + lineIndex * lineHeight;
                doc.text(xPos, yPos, line, { align: 'center' }); // Set text alignment to center
            });
        });
    });
}


     
    private wordWrap(text: string, maxWidth: number, fontSize: number): string[] {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';
    
      words.forEach(word => {
        const width = this.getStringWidth(currentLine + ' ' + word, fontSize);
    
        if (width < maxWidth) {
          currentLine += ' ' + word;
        } else {
          lines.push(currentLine.trim());
          currentLine = word;
        }
      });
    
      lines.push(currentLine.trim());
    
      return lines;
    }
    
    private getStringWidth(text: string, fontSize: number): number {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.font = `${fontSize}px helvetica`;
      return tempCtx.measureText(text).width;
    }
      
  exportExcel() {
    this.getExcelData();
    let str = JSON.stringify(this.excelvalue);
    str = str.replace(/\"rowNumber\":/g, "\"SL.NO\":");
    str = str.replace(/\"userId\":/g, "\"USER ID\":");
    str = str.replace(/\"employeeId\":/g, "\"EMP NO\":");
    str = str.replace(/\"fullName\":/g, "\"FACULTY NAME\":");
        if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
         str = str.replace(/\"locationName\":/g, "\"LOCATION\":");
         }
        if(this.layerType=='4LType1'||this.layerType=='4LType2'||this.layerType=='3LType3'){
        str = str.replace(/\"schoolName\":/g, "\"SCHOOL\":");
        }
        if(this.layerType=='2LType1'||this.layerType=='3LType1'||this.layerType=='3LType3'||this.layerType=='4LType1'||this.layerType=='4LType2'){
          str = str.replace(/\"instituteName\":/g, "\"INSTITUTE\":");
          }
        if(this.layerType=='2LType1'||this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='3LType3'||this.layerType=='2LType2'||this.layerType=='4LType1'||this.layerType=='4LType2'){
         str = str.replace(/\"departmentName\":/g, "\"DEPARTMENT\":");
         }
    
    str = str.replace(/\"userStatus\":/g, "\"STATUS\":");
    str = str.replace(/\"roles\":/g, "\"TYPE\":");

    this.excelvalue = JSON.parse(str);
    this.excelvalue.forEach((x) => {
      delete x.$$index;delete x.universityId;delete x.departmentName;delete x.instituteName;delete x.locationName;
    });
    if(this.userRole=="5"){
     this.searchData=this.user.University;
    }

    this.excel.exportAsExcelFile(this.excelvalue, "USERLIST-"+this.searchData);
    
  }

 // for filtering campus, institute and dept
 filtertable(val){
        if(this.userRole!="12"){
          this.tempUnivID=this.user.UniversityId;
        }

        this.filterdata=true;
        if(val=="loc"){
          
          this.deptGrpId=null;
        if(this.filterCamp==""){
          this.campId=null;
        }
        else{
          const filterLoc=this.layerInsSchCamDep.filter(item => item.locationName==this.filterCamp);
          this.campId=filterLoc[0].locationId;
        }

        this.service.getUnivLocSchInstDept(this.tempUnivID,this.userRole,this.user.UserId,this.campId,this.schlId,this.instId,this.deptId).subscribe(x=>{
          console.log(x);
          if(this.layerType=="3LType1"){
          this.layerInst=x;
          this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
          }
          else if(this.layerType=="3LType2"){
              this.layerDept=x;
          }
          else if(this.layerType=="4LType2"||this.layerType=="3LType3"){
          this.layerSchool=x;
          this.layerSchool=Array.from(new Set(this.layerSchool.map((item : any)=>item.schoolName)))
           }
         });

        }

        if(val=="scl"){
          this.deptGrpId=null;
          if(this.filterSchl==""){
            this.schlId=null;
          }
          else{
            const schoolfilter=this.layerInsSchCamDep.filter(item=> item.schoolName==this.filterSchl);
            this.schlId=schoolfilter[0].schoolId;
          }
        this.service.getUnivLocSchInstDept(this.tempUnivID,this.userRole,this.user.UserId,this.campId,this.schlId,this.instId,this.deptId).subscribe(x=>{
          console.log(x);
          this.layerInst=x;
          this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
          console.log(this.layerInst);
          
        });          
      }   

        if(val=="inst"){
             this.deptGrpId=null;
              if(this.filterInst==""){
                this.instId=null;
              }
            else{         
              const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName==this.filterInst)
              this.instId=instfilter[0].instituteId;
            }
            this.service.getUnivLocSchInstDept(this.tempUnivID,this.userRole,this.user.UserId,this.campId,this.schlId,this.instId,this.deptId).subscribe(x=>{
              console.log(x);
              this.layerDept=x;
            });

        }

        if(val=="dept"){
              if(this.filterDepart==""){
                this.deptId=null;
              }
            else{
              const deptfilter=this.layerInsSchCamDep.filter(item=>item.departmentName==this.filterDepart)
              this.deptId=deptfilter[0].departmentId;
              if(this.deptId==0){
                this.deptGrpId= deptfilter[0].departmentGroupId;
              }
              else{
                this.deptGrpId=null;
              }
            }
            this.service.getUnivLocSchInstDept(this.tempUnivID,this.userRole,this.user.UserId,this.campId,this.schlId,this.instId,this.deptId).subscribe(x=>{
              console.log(x);
            });
          }
          if(this.filterDepart==""&&this.filterInst==""&&this.filterCamp==""&&this.filterSchl==""){
            this.udata.filter = 0;
            this.endrow=this.pageSize
          }
          else{
            this.udata.filter = 1;
          }

        this.download=0;
  
      this.udata.universityId = this.univId;
      this.udata.roleId = this.roleId;
      this.udata.loginUserId = this.user.UserId;
      this.udata.locationId= this.campId;
      this.udata.schoolId= this.schlId;
      this.udata.instituteId= this.instId;
      this.udata.departmentId= this.deptId;
      this.udata.departmentGroupId = this.deptGrpId;
      this.udata.startRow = this.startrow;
      if(this.startrow==0){
        this.udata.endRow = this.pageSize;
       }
       else{
        this.udata.endRow = this.endrow;
       }
      this.udata.download = this.download;

      console.log(this.udata);
 
    this.adminservice.GetUserList(this.udata).subscribe(
      data => {
      console.log('Response:',data);
      this.dynamicpage = data;
      this.dynamicpages = this.dynamicpage.dataList;
      this.filtereduserdata = this.dynamicpages;
      this.filtereduserdata = this.dynamicpages;
      console.log(this.filtereduserdata);
      this.tcollectionSize = this.dynamicpage.totalRowCount;
      if(this.tcollectionSize==0){
        this.num=0;
       }
       else{
        this.num=1;
       }
      this.totalPages = Math.ceil(this.tcollectionSize / this.pageSize); 
       // Adjust Mpage to prevent it from exceeding totalpages
      this.tpage = Math.max(1, Math.min(this.tpage, this.totalPages));
       // Calculate the actual startRow and endRow based on Mpage and pageSize
      this.startrow = (this.tpage - 1) * this.pageSize;
      this.endrow = Math.min(this.startrow + this.pageSize, this.tcollectionSize);
      console.log(this.page);
    
          this.getExcelData() 
       });
    }

     getUserData() {
      
      this.download=0;
      this.user=this.authservice.getUserDetail();
      console.log(this.user);
      this.roleId=this.authservice.getProfileObs();
      console.log(this.roleId);

      this.udata.universityId = this.univId;
      this.udata.roleId = this.roleId;
      this.udata.loginUserId = this.user.UserId;
      this.udata.startRow = this.startrow;
      this.udata.endRow = this.endrow;
      this.udata.download = this.download;
      this.udata.filter = this.filters;

      this.adminservice.GetUserList( this.udata)
        .subscribe(x => {
          console.log('Response:', x);
          this.dynamicpage = x;
          this.dynamicpages = this.dynamicpage.dataList;
          this.filtereduserdata = this.dynamicpages;
          console.log(this.filtereduserdata);
          this.tcollectionSize = this.dynamicpage.totalRowCount;
           if(this.tcollectionSize==0){
            this.num=0;
           }
           else{
            this.num=1;
           }

          this.totalPages = Math.ceil(this.tcollectionSize / this.pageSize); 
           // Adjust Mpage to prevent it from exceeding totalpages
          this.tpage = Math.max(1, Math.min(this.tpage, this.totalPages));
           // Calculate the actual startRow and endRow based on Mpage and pageSize
          this.startrow = (this.tpage - 1) * this.pageSize;
          this.endrow = Math.min(this.startrow + this.pageSize, this.tcollectionSize);
          console.log(this.page);
          
        });
    }

          onPageSizeChange(size: string){
            if(Number(size)>100){
              this.endrow=this.tcollectionSize;
              this.page = 1; 
              this.pageSize = Number(size);
           }
           else{
            this.page = 1; 
            this.pageSize = Number(size);
            this.endrow=this.pageSize+this.startrow;
            }
            this.getUserData();
          }
        
          onPageChange(page: number) {
            this.tpage = Math.max(1, Math.min(page, this.totalPages)); 
              
            if (this.tpage == 1) {
              this.startrow = 0;
            } else {
              this.startrow = (this.tpage - 1) * this.pageSize; 
            }
            this.endrow = Math.min(this.startrow + this.pageSize, this.tcollectionSize);

            if(this.filterdata==false){
              this.getUserData();
            }
            else{
              this.filtertable(this.filtercondition);
            }
          }

      // Service for excel
          getExcelData() {
          
            this.download=1;       
            this.udata.universityId = this.univId;
            this.udata.roleId = this.roleId;
            this.udata.loginUserId = this.user.UserId;
            this.udata.startRow = this.startrow;
            this.udata.endRow = this.endrow;
            this.udata.download = this.download;
            this.udata.filter = this.filters;

            this.adminservice.GetUserList(this.udata)
              .subscribe(x => {
                this.excelList = x;
                this.excelvalue = this.excelList.dataList;
              });
          }

            showTitle(val){        
              if(val==""){
                this.searchData="";
                if(this.roleId=="12"){
                this.adminservice.getUniversitytitle(this.user.UserId).subscribe(data => {
                  this.datas = data;
                  this.customerUniv=this.datas;
                  this.hideDrop=true;
                });
              }
              }
              else{
                  this.customerUniv=this.datas.filter(x=>x.universityName.toLowerCase().includes(val.toLowerCase()));
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

            onSelectTitle(universityId: number, universityName: string) {
              localStorage.removeItem('ManagementUnivId');
              localStorage.setItem("ManagementUnivId",universityId.toString());
              this.searchData=universityName;
              this.tempUnivID=universityId;
              this.service.getLayerType(universityId, "", "").subscribe(data => {
                console.log(data);
                this.newfeed = data;
                this.layerType= this.newfeed.layerType;
              });
                // for campus , institute and dept dropdown
                  this.service.getUnivLocSchInstDept(universityId,this.userRole,this.userdetail.UserId,this.campId,this.schlId,this.instId,this.deptId).subscribe(data => {
                    this.campus = data;
                        if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
                          this.layerInsSchCamDep=this.campus;
                          this.layerCampus=Array.from(new Set(this.campus.map((item : any)=>item.locationName)));
                          
                        }
                        else if(this.layerType=='4LType2'||this.layerType=='3LType3'){
                          this.layerInsSchCamDep=this.campus;
                          this.layerSchool=Array.from(new Set(this.campus.map((item : any)=>item.schoolName)));
                          console.log(this.layerSchool);
                          
                        }
                        else if(this.layerType=='2LType1'){
                          this.layerInsSchCamDep=this.campus;
                          this.layerInst=Array.from(new Set(this.campus.map((item : any)=>item.instituteName)));
                        }
                        else if(this.layerType=='2LType2'){
                          this.layerInsSchCamDep=this.campus;
                          this.layerDept=this.campus;
                        }
                    });

              this.hideDrop=false;
              this.univId=universityId;
              this.endrow=this.pageSize;
              this.getUserData();
              this.getExcelData();
         
            }

            searchDataTemp(value){
              this.filtereduserdata = this.dynamicpages?.filter(item => item.fullName.toLowerCase().includes(value.toLowerCase())||item.userId.toString().includes(value));
              console.log(this.filtereduserdata);
              
              this.tcollectionSize=this.filtereduserdata.length;
              if(this.tcollectionSize<this.pageSize){
                this.endrow=this.tcollectionSize;
              }
              else{
                this.endrow=this.pageSize;
              }
            }
  
  }
