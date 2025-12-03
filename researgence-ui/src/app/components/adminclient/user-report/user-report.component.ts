import { AuthService } from '../../../shared/services/firebase/auth.service';
import { AdminclientService } from '../adminclient.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { FacultiesService } from '../../faculties/faculties.service';
import { log } from '@amcharts/amcharts4/.internal/fabric/fabric-impl';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import * as ExcelJS from 'exceljs';
import * as fs from 'file-saver';
// import * as XLSX from 'xlsx';


type DataItem = { [key: string]: any };
@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss', "../../../../assets/given/newcss/style.css"]
})
export class UserReportComponent implements OnInit {
  public universityList: any = [];
  public userName: string;
  public universityName: any;
  public universityId: string;
  public showDropdown: boolean = false;
  public fill: any;
  public user: any = []
  isMenuOpen: boolean;
  public univSearch: string;
  showCloseIcon: boolean = false;
  currentUrl: string;
  userId: any;
  // Excel download
  excelvalue: any;
  items: any;
  excelEnable: boolean = false;
  EXCEL_EXTENSION = '.xlsx';
  journalPSRList:any;
  bookPSRList:any;
  bookChapterList:any;
  conferenceList:any;

  constructor(private service: AdminclientService, private authservice: AuthService, private univservice: FacultiesService
    , private excel: ExcelExportService, private menuService: MenuService, private router: Router) { }

  ngOnInit() {
    //for accessing menuopen 
    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });

    this.user = this.authservice.getUserDetail();
    this.userId = this.user.UserId;
    // console.log(this.userId);
    this.userName = this.authservice.getProfileObs();
    // console.log(this.userName);

    this.currentUrl = this.router.url;
    // console.log(this.currentUrl);

    this.service.GetUniversity(this.userId, this.userName).subscribe(x => {
      console.log(x);
      this.universityList = x;
      this.fill = this.universityList;
      this.showDropdown = this.fill.length > 0;

    })

  }


  onKeyUp(x) {
    //  console.log((x.target as HTMLInputElement).value);
    this.univSearch = (x.target as HTMLInputElement).value;
    this.showCloseIcon = true;
    this.fill = this.universityList.filter(e => e.universityName.toLowerCase().includes(this.univSearch.toLowerCase()));
    this.showDropdown = this.fill.length > 0;
    // console.log(this.fill);
  }

  onItemClick(item: string, id: any) {

    this.universityName = item;
    this.universityId = id;
    this.showDropdown = false;
    this.showCloseIcon = true;

  }

  clearSearch() {
    this.universityName = "";
    this.showCloseIcon = false;
    this.fill = this.universityList;
    this.showDropdown = this.fill.length > 0;
  }

  reportDownload(univId,name) {
    
    window.scrollTo(0,0);
    this.excelEnable = true;
    if (this.currentUrl.includes('/clientadmin/main/report')) {
      this.service.getClientUsageReport(this.userName, this.userId, univId).subscribe(x => {
        this.items = x;
        console.log(this.items);
        if (this.items.length > 0) {
          this.exportExcel(this.items);
        }
        else {
          alert("No records found..");
          this.excelEnable = false;
        }
      })
    }
    else if (this.currentUrl.includes('/clientadmin/main/ACSR/report')) {
      this.service.getPubACSR1Format(this.userName, this.userId, univId).subscribe(x => {
        this.items = x;
        console.log(this.items);
        if (this.items.length > 0) {
          this.exportExcel1(this.items,name);
        }
        else {
          alert("No records found..");
          this.excelEnable = false;
        }
      })
    }
    else if(this.currentUrl.includes('/clientadmin/main/PSR/report')){
        //  this.service.getListForPSRJournal(univId).subscribe(x=>{
                // this.journalPSRList=x;
        //       if(this.journalPSRList){
        //         this.exportExcelReportData(this.journalPSRList,name+"-PRS-REPORT-JOURNAL");
                // this.excelEnable = false;
        //       }
        //  });
        //  this.service.getListForPSRBook(univId).subscribe(x=>{
        //      this.bookPSRList=x;
        //      if(this.bookPSRList){
        //       this.exportExcelReportData(this.bookPSRList,name+"-PRS-REPORT-BOOK");
        //     }
        //  });
        //  this.service.getListForPSRBookchapter(univId).subscribe(x=>{
        //        this.bookChapterList=x;
        //        if(this.bookChapterList){
        //         this.exportExcelReportData(this.bookChapterList,name+"-PRS-REPORT-BOOK-CHAPTER");
        //       }
        //  });
        //  this.service.getListForPSRConference(univId).subscribe(x=>{
        //         this.conferenceList=x;
        //         if(this.conferenceList){
        //           this.exportExcelReportData(this.conferenceList,name+"-PRS-REPORT-CONFERENCE");
        //         }
                
        //  });
    }

  }


  exportExcel(item) {
    this.excelvalue = this.capitalizeAndCleanKeys(item);
    console.log(this.excelvalue);
    this.excel.exportAsExcelFile(this.excelvalue, "ClientUsageReport");
    this.excelEnable = false;

  }

  Excel(item, headerOrder) {
    const renamedKeys = {
      publicationId: "Pub_Id",
      publicationUserSeqNo: "Pub_SeqNo",
      publicationUserMapId: "Pub_MapId",
      rollNoNew: "New_Rno",
      uniqueIdLegacy: "UID",
      rollNoLegacy: "Rno",
      cid: "CID",
      authors: "Authors",
      pubAuthorName: "Separate_Author",
      publicationTitle: "Title",
      doi: "DOI",
      scopusCitation: "SCS_Cite",
      wosCitation: "WOS_Cite",
      sci: "SCI",
      pubmed: "PM",
      ieeeCitation: "IEEE_Cite",
      gsCitation: "GSC_Cite",
      crossrefCitation: "Crossref_Cite",
      pubYear: "Year",
      pubMonth: "Month",
      publicationsourcename: "Source_Name",
      articleTypeName: "Article_Type",
      authorAddress: "Author_Address",
      departmentName: "Department",
      instituteName: "Institute",
      universityName: "University",
      locationName: "Location",
      statename: "State",
      countryname: "Country",
      volumeNumber: "Vol_No",
      issueNumber: "Iss_No",
      bPage: "B_Page",
      ePage: "E_Page",
      pissn: "P_Issn",
      eissn: "E_Issn",
      pisbn: "P_Isbn",
      eisbn: "E_Isbn",
      snip: "SNIP",
      sjr: "SJR",
      impactFactor: "IF",
      qRankSC: "Q_SCS",
      qRankWOS: "Q_WOS",
      abdc: "ABDC",
      core: "Core",
      citeScore: "Cite_Score",
      ugc: "UGC",
      ugcCareGroup1: "UGC_G1",
      publisherName: "Publisher",
      crossrefdate: "Crossref_Date",
      printDate: "Print_Date",
      supportVerifiedStatus: "Verified_Stats",
      matchedSno: "Match_SNo",
      inputSourceName: "IP_Source",
      createdDate: "Created_Date",
      modifiedDate: "Modified_Date",
      abstract: "Abstract",
      technologyArea: "Tech_Area",
      sdg: "SDG",
      webLink: "Web Link"
    };

    return item.map(obj => {
      const newObj = {};
      headerOrder.forEach(key => {
        const oldKey = Object.keys(renamedKeys).find(k => renamedKeys[k] === key) || key;
        const value = obj[oldKey];
        newObj[key] = value && !isNaN(value) && ["Pub_Id", "Pub_SeqNo", "Pub_MapId", "New_Rno", "Rno", "CID", "Year", "Month", "SNIP", "SJR", "IF", "Vol_No", "Iss_No", "B_Page", "E_Page", "Match_SNo"].includes(key) ? Number(value) : value;
      });
      return newObj;
    });
  }

  Excel1(item, headerOrder) {
    const renamedKeys = {
      publicationId: "Pub_Id",
      publicationUserSeqNo: "Pub_SeqNo",
      publicationUserMapId: "Pub_MapId",
      rollNoNew: "New_Rno",
      uniqueIdLegacy: "UID",
      rollNoLegacy: "Rno",
      cid: "CID",
      authors: "Authors",
      pubAuthorName: "Separate_Author",
      publicationTitle: "Title",
      doi: "DOI",
      scopusCitation: "SCS_Cite",
      wosCitation: "WOS_Cite",
      sci: "SCI",
      pubmed: "PM",
      ieeeCitation: "IEEE_Cite",
      gsCitation: "GSC_Cite",
      crossrefCitation: "Crossref_Cite",
      pubYear: "Year",
      pubMonth: "Month",
      publicationsourcename: "Source_Name",
      articleTypeName: "Article_Type",
      authorAddress: "Author_Address",
      departmentName: "Department",
      schoolName: "School",
      instituteName: "Institute",
      universityName: "University",
      locationName: "Location",
      statename: "State",
      countryname: "Country",
      volumeNumber: "Vol_No",
      issueNumber: "Iss_No",
      bPage: "B_Page",
      ePage: "E_Page",
      pissn: "P_Issn",
      eissn: "E_Issn",
      pisbn: "P_Isbn",
      eisbn: "E_Isbn",
      snip: "SNIP",
      sjr: "SJR",
      impactFactor: "IF",
      qRankSC: "Q_SCS",
      qRankWOS: "Q_WOS",
      abdc: "ABDC",
      core: "Core",
      citeScore: "Cite_Score",
      ugc: "UGC",
      ugcCareGroup1: "UGC_G1",
      publisherName: "Publisher",
      crossrefdate: "Crossref_Date",
      printDate: "Print_Date",
      supportVerifiedStatus: "Verified_Stats",
      matchedSno: "Match_SNo",
      inputSourceName: "IP_Source",
      createdDate: "Created_Date",
      modifiedDate: "Modified_Date",
      abstract: "Abstract",
      technologyArea: "Tech_Area",
      sdg: "SDG",
      webLink: "Web Link",
      createdByName:"CreatedByName",
      createdById: "CreatedById",
      correspondingAuthor:"CorrespondingAuthor",
      authorVerifiedStatus:"AuthorVerifiedStatus"
    };

    return item.map(obj => {
      const newObj = {};
      headerOrder.forEach(key => {
        const oldKey = Object.keys(renamedKeys).find(k => renamedKeys[k] === key) || key;
        const value = obj[oldKey];
        newObj[key] = value && !isNaN(value) && ["Pub_Id", "Pub_SeqNo", "Pub_MapId", "New_Rno", "Rno", "CID", "Year", "Month", "SNIP", "SJR", "IF", "Vol_No", "Iss_No", "B_Page", "E_Page", "Match_SNo"].includes(key) ? Number(value) : value;
      });
      return newObj;
    });
  }

  exportExcel1(item,name) {

    const headerOrder = [
      "Pub_Id", "Pub_SeqNo", "Pub_MapId", "New_Rno", "UID", "Rno", "CID", "Authors",
      "Separate_Author", "Title", "DOI", "SCS_Cite", "WOS_Cite", "SCI", "PM",
      "IEEE_Cite", "GSC_Cite", "Crossref_Cite", "Year", "Month", "Source_Name",
      "Article_Type", "Author_Address", "Department", "School","Institute", "University",
      "Location", "State", "Country", "Vol_No", "Iss_No", "B_Page", "E_Page",
      "P_Issn", "E_Issn", "P_Isbn", "E_Isbn", "SNIP", "SJR", "IF", "Q_SCS", "Q_WOS",
      "ABDC", "Core", "Cite_Score", "UGC", "UGC_G1", "Publisher", "Crossref_Date",
      "Print_Date", "Verified_Stats", "Match_SNo", "IP_Source", "Created_Date",
      "Modified_Date", "Abstract", "Tech_Area", "SDG", "Web Link","CreatedByName","CreatedById","CorrespondingAuthor","AuthorVerifiedStatus"
    ];

    // Step 1: Prepare data
    this.excelvalue = this.Excel1(item, headerOrder);

    const row = this.excelvalue.length

    if (row <= 50000) {
      this.createAndDownloadChunk(this.excelvalue, headerOrder, name+`ACSRReport`+'_export' + new Date().getTime() + this.EXCEL_EXTENSION);
    } else {
      // Step 2: Split the data into chunks of 55,000 rows
      const chunkSize = 50000;
      const chunks = [];
      for (let i = 0; i < this.excelvalue.length; i += chunkSize) {
        chunks.push(this.excelvalue.slice(i, i + chunkSize));
      }

      // Step 3: Process and download each chunk sequentially
      this.processChunksSequentially(chunks, headerOrder,name);
    }
  }

  private async processChunksSequentially(chunks: any[][], headerOrder: string[],name:string) {
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      await this.createAndDownloadChunk(chunk, headerOrder, name+`ACSRReport_Part${i + 1}`+'_export' + new Date().getTime() + this.EXCEL_EXTENSION);
    }
  }

  private async createAndDownloadChunk(data: any[], headerOrder: string[], fileName: string) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('ACSRReport');

    // Add header row
    const headerRow = worksheet.addRow(headerOrder);

    // Apply styles to the header row
    headerRow.eachCell((cell, colNumber) => {
      this.applyCellStyles(cell, colNumber, 1, worksheet); // Apply header styles
    });

    // Add data rows and apply styles
    data.forEach((dataRow, rowIndex) => {
      const row = worksheet.addRow(headerOrder.map(key => dataRow[key])); // Map the header order to the row data
      row.eachCell((cell, colNumber) => {
        this.applyCellStyles(cell, colNumber, rowIndex + 2, worksheet); // Apply data row styles
      });
    });

    // Freeze the first row
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];

    // Export and download the file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, fileName);
    this.excelEnable = false;
  }

  // exportExcel1(item) {

  //   this.excelvalue = this.capitalizeAndCleanKeys(item);
  //   console.log(this.excelvalue);
  //   this.excel.exportAsExcelFile(this.excelvalue, "PubACSRReport");
  //   this.excelEnable=false;
  // }

  capitalizeAndCleanKeys(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.capitalizeAndCleanKeys(item));
    } else if (obj && typeof obj === 'object') {
      const newObj: any = {};
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value !== null) {
          const newKey = key.charAt(0).toUpperCase() + key.slice(1);
          newObj[newKey] = this.capitalizeAndCleanKeys(value);
        }
      });
      return newObj;
    }
    return obj;
  }

  applyCellStyles(cell, colNumber, rowNumber, worksheet) {
    const rowHeightInPoints = 50;
    const row = worksheet.getRow(rowNumber);
    row.height = rowHeightInPoints;
    const isFirstRow = rowNumber === 1;

    if (isFirstRow) {
      // Apply header row styles
      cell.font = { name: 'Cambria', bold: true, size: 12, color: { argb: 'FFFFFF' } };
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0755B9' } }
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } },
      };

      if ((colNumber >= 12 && colNumber <= 20) || (colNumber >= 39 && colNumber <= 41)) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '244062' } };
      }
    } else {

      cell.font = { name: 'Calibri', size: 10.5 };
      cell.border = {
        top: { style: 'thin', color: { argb: 'D3D3D3' } },
        left: { style: 'thin', color: { argb: 'D3D3D3' } },
        bottom: { style: 'thin', color: { argb: 'D3D3D3' } },
        right: { style: 'thin', color: { argb: 'D3D3D3' } },
      };

      if ([8, 9, 11].includes(colNumber) || (colNumber >= 23 && colNumber <= 39) || (colNumber >= 57 && colNumber <= 59)) {
        cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
      } else {
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      }
    }

    const columnWidths = [
      { range: [0, 6], width: 20 },
      { range: [7, 8], width: 52 },
      { range: [9, 9], width: 20 },
      { range: [10, 17], width: 15 },
      { range: [18, 19], width: 12 },
      { range: [20, 20], width: 60 },
      { range: [21, 21], width: 20 },
      { range: [22, 22], width: 60 },
      { range: [23, 29], width: 30 },
      { range: [30, 33], width: 12 },
      { range: [34, 35], width: 13 },
      { range: [36, 37], width: 21 },
      { range: [38, 40], width: 12 },
      { range: [41, 47], width: 13 },
      { range: [48, 48], width: 21 },
      { range: [49, 50], width: 18 },
      { range: [51, 52], width: 21 },
      { range: [53, 53], width: 24 },
      { range: [54, 55], width: 18 },
      { range: [56, 58], width: 45 },
      { range: [59, 63], width: 24 },
    ];

    // Apply column widths
    columnWidths.forEach(({ range, width }) => {
      // Use a single pass to apply widths
      const [start, end] = range;
      for (let colIndex = start; colIndex <= end; colIndex++) {
        // Directly access and set column widths
        const column = worksheet.getColumn(colIndex + 1);
        if (column) {
          column.width = width;
        }
      }
    });
  }


  exportExcelReportData(data,name) {

    let str = JSON.stringify(data);
    str = str.replace(/\"employeeId\":/g, '"EMP ID":');  
    str = str.replace(/\"journal\":/g, '"JOURNAL":');
    str = str.replace(/\"journalTitle\":/g, '"JOURNAL TITLE":');
    str = str.replace(/\"quartileOfJournal\":/g, '"QUARTILE OF JOURNAL":');
    str = str.replace(/\"bookTitle\":/g, '"BOOK TITLE":');
    str = str.replace(/\"chapterTitle\":/g, '"CHAPTER TITLE":');
    str = str.replace(/\"publisher\":/g, '"PUBLISHER":');
    str = str.replace(/\"bookChapters\":/g, '"BOOK CHAPTER":');
    str = str.replace(/\"conferenceName\":/g, '"CONFERENCE NAME":');
    str = str.replace(/\"conferenceTitle\":/g, '"CONFERENCE TITLE":');
    str = str.replace(/\"month\":/g, '"MONTH ":');
    str = str.replace(/\"year\":/g, '"YEAR":');
    str = str.replace(/\"snip\":/g, '"SNIP":');
    str = str.replace(/\"openAccess\":/g, '"OPEN ACCESS":');
    str = str.replace(/\"impactfactor\":/g, '"IMPACT FACTOR":');
    str = str.replace(/\"authors\":/g, '"AUTHOR":');
    str = str.replace(/\"collaboration\":/g, '"COLLABRATION":');
    str = str.replace(/\"publicationId\":/g, '"PUBLICATION ID":');
      data = JSON.parse(str);

    this.excel.exportAsExcelFile(data, name);

  }

}
