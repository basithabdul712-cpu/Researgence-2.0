import { Component, NO_ERRORS_SCHEMA, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Workbook } from 'exceljs';

//ag-grid
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  createGrid, 
} from "ag-grid-community";
import { isArray } from '@amcharts/amcharts5/.internal/core/util/Type';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';
import { start } from '@popperjs/core';
import { AuthorLinkRendererComponent } from './link-author.component';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-ag-grid',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AgGridComponent implements OnInit,OnChanges {
  public rowData: any[]= [];
  public columnDefs: ColDef[];
  public defaultColDef: ColDef;
  public rowSelection: "single" | "multiple";
  public columnFilterApplied : boolean = false;
  // public paginationPageSize:number;
  // public paginationPageSizeSelector: number;
  public themeClass: string;
  gridApi!:GridApi;
  
  public noRowsTemplate;
  public loadingTemplate;
  paginationPageSize= 20;
  
  //Get data from parent
    // @Input() facultiesListdata: any[];
    @Input() gridData: any[];
    // template: IRow;
    loading: boolean = false;

  // Scorebook 
  @Input() startIndex: number;
  @Input() endIndex: number;
  indexStart: number=0;
  indexEnd: number=0;
  // Admin
  @Input() layerType: string;

  constructor() { 
    this.loadingTemplate =
      `<span class="ag-overlay-loading-center">Loading...</span>`;
      this.noRowsTemplate =
      `<span">no rows to show</span>`;      
   
  }

  ngOnInit(): void {

      let pathName = window.location.pathname.split("/")[1];

      console.log(pathName);
      if(pathName=="performance-analysis-dashboard"){
         pathName=window.location.pathname;
      }
      console.log(pathName);
        
       
  if(pathName == "facultyProfiles"){

      if(this.layerType == "3LType2"){
        this.columnDefs = [
          { headerName:"SNo",field: "rowNumber", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"User ID",field: "userId",hide: true},
          { headerName:"Name of Faculty",field: "authorName",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell',cellRenderer: AuthorLinkRendererComponent},
          { headerName:"Total",field: "totalPubCount",autoHeight:true,width: 90},
          { headerName:"SCS",field: "scopusPubCount"},
          { headerName:"WOS",field: "wosPubcount"},
          { headerName:"SCI",field: "sciPubCount"},
          { headerName:"PMD",field: "pubmedPubCount"},
          { headerName:"IEEE",field: "ieeePubcount"},
          { headerName:"ABDC",field: "abdcPubCount"},
          { headerName:"UGC CARE",field: "ugccarePubcount",width: 130},
          { headerName:"UGC CARE1",field: "ugccareGp1Pubcount",width: 130},
          { headerName:"GSC",field: "gsPubCount"},
          { headerName:"Citations SCS",field: "scopusCitation",width: 130},
          { headerName:"Citations WOS",field: "wosCitation",width: 140},
          { headerName:"Citations GCS",field: "gsCitation",width: 145},
          { headerName:"h-Index SCS",field: "scopusHindex",width: 130},
          { headerName:"h-Index WOS",field: "wosHindex",width: 130},
          { headerName:"h-Index GSC",field: "gsHindex",width: 130},
          { headerName:"i10 SCS",field: "scopusI10index",width: 130},
          { headerName:"i10 WOS",field: "wosI10index",width: 130},
          { headerName:"i10 GSC",field: "gsI10Index",width: 130},
          { headerName:"Scopus Snip (AVG)",field: "scopusAvgSNIP",width: 180},
          { headerName:"Cite-Score SCS",field: "scopusAvgCiteScore",width: 150},
          { headerName:"Impact Factor WOS",field: "wosAvgImpFactor",width: 180},
          { headerName:"Q1 SCS",field: "scopusQ1",width: 130},
          { headerName:"Q2 SCS",field: "scopusQ2",width: 130},
          { headerName:"Q1 WOS",field: "wosQ1"},
          { headerName:"Q2 WOS",field: "wosQ2"},
          { headerName:"Journal",field: "journalCount",width: 130},
          { headerName:"Conference",field: "conferenceCount",width: 130},
          { headerName:"Book",field: "bookCount",width: 130},
          { headerName:"Book-Chapter",field: "bookChapterCount",width: 140},
          { headerName:"Location",field: "location",filter: "agTextColumnFilter",cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else if(this.layerType == "2LType1"){
        this.columnDefs = [
          { headerName:"SNo",field: "rowNumber", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"User ID",field: "userId",hide: true},
          { headerName:"Name of Faculty",field: "authorName",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell',cellRenderer: AuthorLinkRendererComponent},
          { headerName:"Total",field: "totalPubCount",autoHeight:true,width: 90},
          { headerName:"SCS",field: "scopusPubCount"},
          { headerName:"WOS",field: "wosPubcount"},
          { headerName:"SCI",field: "sciPubCount"},
          { headerName:"PMD",field: "pubmedPubCount"},
          { headerName:"IEEE",field: "ieeePubcount"},
          { headerName:"ABDC",field: "abdcPubCount"},
          { headerName:"UGC CARE",field: "ugccarePubcount",width: 130},
          { headerName:"UGC CARE1",field: "ugccareGp1Pubcount",width: 130},
          { headerName:"GSC",field: "gsPubCount"},
          { headerName:"Citations SCS",field: "scopusCitation",width: 130},
          { headerName:"Citations WOS",field: "wosCitation",width: 140},
          { headerName:"Citations GCS",field: "gsCitation",width: 145},
          { headerName:"h-Index SCS",field: "scopusHindex",width: 130},
          { headerName:"h-Index WOS",field: "wosHindex",width: 130},
          { headerName:"h-Index GSC",field: "gsHindex",width: 130},
          { headerName:"i10 SCS",field: "scopusI10index",width: 130},
          { headerName:"i10 WOS",field: "wosI10index",width: 130},
          { headerName:"i10 GSC",field: "gsI10Index",width: 130},
          { headerName:"Scopus Snip (AVG)",field: "scopusAvgSNIP",width: 180},
          { headerName:"Cite-Score SCS",field: "scopusAvgCiteScore",width: 150},
          { headerName:"Impact Factor WOS",field: "wosAvgImpFactor",width: 180},
          { headerName:"Q1 SCS",field: "scopusQ1",width: 130},
          { headerName:"Q2 SCS",field: "scopusQ2",width: 130},
          { headerName:"Q1 WOS",field: "wosQ1"},
          { headerName:"Q2 WOS",field: "wosQ2"},
          { headerName:"Journal",field: "journalCount",width: 130},
          { headerName:"Conference",field: "conferenceCount",width: 130},
          { headerName:"Book",field: "bookCount",width: 130},
          { headerName:"Book-Chapter",field: "bookChapterCount",width: 140},
          { headerName:"Institute",field: "institute",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else if(this.layerType == "2LType2"){
        this.columnDefs = [
          { headerName:"SNo",field: "rowNumber", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"User ID",field: "userId",hide: true},
          { headerName:"Name of Faculty",field: "authorName",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell',cellRenderer: AuthorLinkRendererComponent},
          { headerName:"Total",field: "totalPubCount",autoHeight:true,width: 90},
          { headerName:"SCS",field: "scopusPubCount"},
          { headerName:"WOS",field: "wosPubcount"},
          { headerName:"SCI",field: "sciPubCount"},
          { headerName:"PMD",field: "pubmedPubCount"},
          { headerName:"IEEE",field: "ieeePubcount"},
          { headerName:"ABDC",field: "abdcPubCount"},
          { headerName:"UGC CARE",field: "ugccarePubcount",width: 130},
          { headerName:"UGC CARE1",field: "ugccareGp1Pubcount",width: 130},
          { headerName:"GSC",field: "gsPubCount"},
          { headerName:"Citations SCS",field: "scopusCitation",width: 130},
          { headerName:"Citations WOS",field: "wosCitation",width: 140},
          { headerName:"Citations GCS",field: "gsCitation",width: 145},
          { headerName:"h-Index SCS",field: "scopusHindex",width: 130},
          { headerName:"h-Index WOS",field: "wosHindex",width: 130},
          { headerName:"h-Index GSC",field: "gsHindex",width: 130},
          { headerName:"i10 SCS",field: "scopusI10index",width: 130},
          { headerName:"i10 WOS",field: "wosI10index",width: 130},
          { headerName:"i10 GSC",field: "gsI10Index",width: 130},
          { headerName:"Scopus Snip (AVG)",field: "scopusAvgSNIP",width: 180},
          { headerName:"Cite-Score SCS",field: "scopusAvgCiteScore",width: 150},
          { headerName:"Impact Factor WOS",field: "wosAvgImpFactor",width: 180},
          { headerName:"Q1 SCS",field: "scopusQ1",width: 130},
          { headerName:"Q2 SCS",field: "scopusQ2",width: 130},
          { headerName:"Q1 WOS",field: "wosQ1"},
          { headerName:"Q2 WOS",field: "wosQ2"},
          { headerName:"Journal",field: "journalCount",width: 130},
          { headerName:"Conference",field: "conferenceCount",width: 130},
          { headerName:"Book",field: "bookCount",width: 130},
          { headerName:"Book-Chapter",field: "bookChapterCount",width: 140},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else if(this.layerType == "3LType1"){
        this.columnDefs = [
          { headerName:"SNo",field: "rowNumber", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"User ID",field: "userId",hide: true},
          { headerName:"Name of Faculty",field: "authorName",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell',cellRenderer: AuthorLinkRendererComponent},
          { headerName:"Total",field: "totalPubCount",autoHeight:true,width: 90},
          { headerName:"SCS",field: "scopusPubCount"},
          { headerName:"WOS",field: "wosPubcount"},
          { headerName:"SCI",field: "sciPubCount"},
          { headerName:"PMD",field: "pubmedPubCount"},
          { headerName:"IEEE",field: "ieeePubcount"},
          { headerName:"ABDC",field: "abdcPubCount"},
          { headerName:"UGC CARE",field: "ugccarePubcount",width: 130},
          { headerName:"UGC CARE1",field: "ugccareGp1Pubcount",width: 130},
          { headerName:"GSC",field: "gsPubCount"},
          { headerName:"Citations SCS",field: "scopusCitation",width: 130},
          { headerName:"Citations WOS",field: "wosCitation",width: 140},
          { headerName:"Citations GCS",field: "gsCitation",width: 145},
          { headerName:"h-Index SCS",field: "scopusHindex",width: 130},
          { headerName:"h-Index WOS",field: "wosHindex",width: 130},
          { headerName:"h-Index GSC",field: "gsHindex",width: 130},
          { headerName:"i10 SCS",field: "scopusI10index",width: 130},
          { headerName:"i10 WOS",field: "wosI10index",width: 130},
          { headerName:"i10 GSC",field: "gsI10Index",width: 130},
          { headerName:"Scopus Snip (AVG)",field: "scopusAvgSNIP",width: 180},
          { headerName:"Cite-Score SCS",field: "scopusAvgCiteScore",width: 150},
          { headerName:"Impact Factor WOS",field: "wosAvgImpFactor",width: 180},
          { headerName:"Q1 SCS",field: "scopusQ1",width: 130},
          { headerName:"Q2 SCS",field: "scopusQ2",width: 130},
          { headerName:"Q1 WOS",field: "wosQ1"},
          { headerName:"Q2 WOS",field: "wosQ2"},
          { headerName:"Journal",field: "journalCount",width: 130},
          { headerName:"Conference",field: "conferenceCount",width: 130},
          { headerName:"Book",field: "bookCount",width: 130},
          { headerName:"Book-Chapter",field: "bookChapterCount",width: 140},
          { headerName:"Location",field: "location",filter: "agTextColumnFilter",cellClass: 'left-align-cell'},
          { headerName:"Institute",field: "institute",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else if(this.layerType == "4LType2"||this.layerType == "3LType3"){
        this.columnDefs = [
          { headerName:"SNo",field: "rowNumber", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"User ID",field: "userId",hide: true},
          { headerName:"Name of Faculty",field: "authorName",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell',cellRenderer: AuthorLinkRendererComponent},
          { headerName:"Total",field: "totalPubCount",autoHeight:true,width: 90},
          { headerName:"SCS",field: "scopusPubCount"},
          { headerName:"WOS",field: "wosPubcount"},
          { headerName:"SCI",field: "sciPubCount"},
          { headerName:"PMD",field: "pubmedPubCount"},
          { headerName:"IEEE",field: "ieeePubcount"},
          { headerName:"ABDC",field: "abdcPubCount"},
          { headerName:"UGC CARE",field: "ugccarePubcount",width: 130},
          { headerName:"UGC CARE1",field: "ugccareGp1Pubcount",width: 130},
          { headerName:"GSC",field: "gsPubCount"},
          { headerName:"Citations SCS",field: "scopusCitation",width: 130},
          { headerName:"Citations WOS",field: "wosCitation",width: 140},
          { headerName:"Citations GCS",field: "gsCitation",width: 145},
          { headerName:"h-Index SCS",field: "scopusHindex",width: 130},
          { headerName:"h-Index WOS",field: "wosHindex",width: 130},
          { headerName:"h-Index GSC",field: "gsHindex",width: 130},
          { headerName:"i10 SCS",field: "scopusI10index",width: 130},
          { headerName:"i10 WOS",field: "wosI10index",width: 130},
          { headerName:"i10 GSC",field: "gsI10Index",width: 130},
          { headerName:"Scopus Snip (AVG)",field: "scopusAvgSNIP",width: 180},
          { headerName:"Cite-Score SCS",field: "scopusAvgCiteScore",width: 150},
          { headerName:"Impact Factor WOS",field: "wosAvgImpFactor",width: 180},
          { headerName:"Q1 SCS",field: "scopusQ1",width: 130},
          { headerName:"Q2 SCS",field: "scopusQ2",width: 130},
          { headerName:"Q1 WOS",field: "wosQ1"},
          { headerName:"Q2 WOS",field: "wosQ2"},
          { headerName:"Journal",field: "journalCount",width: 130},
          { headerName:"Conference",field: "conferenceCount",width: 130},
          { headerName:"Book",field: "bookCount",width: 130},
          { headerName:"Book-Chapter",field: "bookChapterCount",width: 140},
          { headerName:"School",field: "school",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Institute",field: "institute",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else{
        this.columnDefs = [
          { headerName:"SNo",field: "rowNumber", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"User ID",field: "userId",hide: true},
          { headerName:"Name of Faculty",field: "authorName",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell',cellRenderer: AuthorLinkRendererComponent},
          { headerName:"Total",field: "totalPubCount",autoHeight:true,width: 90},
          { headerName:"SCS",field: "scopusPubCount"},
          { headerName:"WOS",field: "wosPubcount"},
          { headerName:"SCI",field: "sciPubCount"},
          { headerName:"PMD",field: "pubmedPubCount"},
          { headerName:"IEEE",field: "ieeePubcount"},
          { headerName:"ABDC",field: "abdcPubCount"},
          { headerName:"UGC CARE",field: "ugccarePubcount",width: 130},
          { headerName:"UGC CARE1",field: "ugccareGp1Pubcount",width: 130},
          { headerName:"GSC",field: "gsPubCount"},
          { headerName:"Citations SCS",field: "scopusCitation",width: 130},
          { headerName:"Citations WOS",field: "wosCitation",width: 140},
          { headerName:"Citations GCS",field: "gsCitation",width: 145},
          { headerName:"h-Index SCS",field: "scopusHindex",width: 130},
          { headerName:"h-Index WOS",field: "wosHindex",width: 130},
          { headerName:"h-Index GSC",field: "gsHindex",width: 130},
          { headerName:"i10 SCS",field: "scopusI10index",width: 130},
          { headerName:"i10 WOS",field: "wosI10index",width: 130},
          { headerName:"i10 GSC",field: "gsI10Index",width: 130},
          { headerName:"Scopus Snip (AVG)",field: "scopusAvgSNIP",width: 180},
          { headerName:"Cite-Score SCS",field: "scopusAvgCiteScore",width: 150},
          { headerName:"Impact Factor WOS",field: "wosAvgImpFactor",width: 180},
          { headerName:"Q1 SCS",field: "scopusQ1",width: 130},
          { headerName:"Q2 SCS",field: "scopusQ2",width: 130},
          { headerName:"Q1 WOS",field: "wosQ1"},
          { headerName:"Q2 WOS",field: "wosQ2"},
          { headerName:"Journal",field: "journalCount",width: 130},
          { headerName:"Conference",field: "conferenceCount",width: 130},
          { headerName:"Book",field: "bookCount",width: 130},
          { headerName:"Book-Chapter",field: "bookChapterCount",width: 140},
          { headerName:"Location",field: "location",filter: "agTextColumnFilter",cellClass: 'left-align-cell'},
          { headerName:"School",field: "school",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Institute",field: "institute",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

  }      
  
  if(pathName == "clientadmin"){

    if(this.layerType == "3LType2"){
    this.columnDefs = [
              { headerName:"SNO",field: "rowNumber", width: 70},
              { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
              { headerName:"User ID",field: "userId",hide: true},
              { headerName:"Name of Faculty",field: "authorName",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell',cellRenderer: AuthorLinkRendererComponent},
              { headerName:"Total",field: "totalPubCount",autoHeight:true,width: 90},
              { headerName:"2025",field: "year1",autoHeight:true,width: 80},
              { headerName:"2024",field: "year2",autoHeight:true,width: 80},
              { headerName:"2023",field: "year3",autoHeight:true,width: 80},
              { headerName:"2022",field: "year4",autoHeight:true,width: 80},
              { headerName:"2021",field: "year5",autoHeight:true,width: 80},
              { headerName:"2020",field: "year6",autoHeight:true,width: 80},
              { headerName:"2019",field: "year7",autoHeight:true,width: 80},
              { headerName:"2018",field: "year8",autoHeight:true,width: 80},
              { headerName:"2017",field: "year9",autoHeight:true,width: 80},
              { headerName:"2016",field: "year10",autoHeight:true,width: 80},
              { headerName:"<2016 Year",field: "otherYears",autoHeight:true},
              { headerName:"Article Name",field: "articleTypeName",autoHeight:true,width:140},
              { headerName:"Publication DB Name",field: "publicationDBName",autoHeight:true,width:140},    
              { headerName:"Location",field: "location",filter: "agTextColumnFilter",cellClass: 'left-align-cell'},
              { headerName:"Department",field: "department",autoHeight:true,filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'}
          ];
        }
        else if(this.layerType == "2LType1"){
          this.columnDefs = [
                    { headerName:"SNO",field: "rowNumber", width: 70},
                    { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
                    { headerName:"User ID",field: "userId",hide: true},
                    { headerName:"Name of Faculty",field: "authorName",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell',cellRenderer: AuthorLinkRendererComponent},
                    { headerName:"Total",field: "totalPubCount",autoHeight:true,width: 90},
                    { headerName:"2025",field: "year1",autoHeight:true,width: 80},
                    { headerName:"2024",field: "year2",autoHeight:true,width: 80},
                    { headerName:"2023",field: "year3",autoHeight:true,width: 80},
                    { headerName:"2022",field: "year4",autoHeight:true,width: 80},
                    { headerName:"2021",field: "year5",autoHeight:true,width: 80},
                    { headerName:"2020",field: "year6",autoHeight:true,width: 80},
                    { headerName:"2019",field: "year7",autoHeight:true,width: 80},
                    { headerName:"2018",field: "year8",autoHeight:true,width: 80},
                    { headerName:"2017",field: "year9",autoHeight:true,width: 80},
                    { headerName:"2016",field: "year10",autoHeight:true,width: 80},
                    { headerName:"<2016 Year",field: "otherYears",autoHeight:true},
                    { headerName:"Article Name",field: "articleTypeName",autoHeight:true,width:140},
                    { headerName:"Publication DB Name",field: "publicationDBName",autoHeight:true,width:140},    
                    { headerName:"Institute",field: "institute",autoHeight:true,filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
                    { headerName:"Department",field: "department",autoHeight:true,filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'}
                ];
              }
              else if(this.layerType == "2LType2"){
                this.columnDefs = [
                          { headerName:"SNO",field: "rowNumber", width: 70},
                          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
                          { headerName:"User ID",field: "userId",hide: true},
                          { headerName:"Name of Faculty",field: "authorName",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell',cellRenderer: AuthorLinkRendererComponent},
                          { headerName:"Total",field: "totalPubCount",autoHeight:true,width: 90},
                          { headerName:"2025",field: "year1",autoHeight:true,width: 80},
                          { headerName:"2024",field: "year2",autoHeight:true,width: 80},
                          { headerName:"2023",field: "year3",autoHeight:true,width: 80},
                          { headerName:"2022",field: "year4",autoHeight:true,width: 80},
                          { headerName:"2021",field: "year5",autoHeight:true,width: 80},
                          { headerName:"2020",field: "year6",autoHeight:true,width: 80},
                          { headerName:"2019",field: "year7",autoHeight:true,width: 80},
                          { headerName:"2018",field: "year8",autoHeight:true,width: 80},
                          { headerName:"2017",field: "year9",autoHeight:true,width: 80},
                          { headerName:"2016",field: "year10",autoHeight:true,width: 80},
                          { headerName:"<2016 Year",field: "otherYears",autoHeight:true},
                          { headerName:"Article Name",field: "articleTypeName",autoHeight:true,width:140},
                          { headerName:"Publication DB Name",field: "publicationDBName",autoHeight:true,width:140},    
                          { headerName:"Department",field: "department",autoHeight:true,filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'}
                      ];
                    }
                    else if(this.layerType == "3LType1"){
                      this.columnDefs = [
                                { headerName:"SNO",field: "rowNumber", width: 70},
                                { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
                                { headerName:"User ID",field: "userId",hide: true},
                                { headerName:"Name of Faculty",field: "authorName",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell',cellRenderer: AuthorLinkRendererComponent},
                                { headerName:"Total",field: "totalPubCount",autoHeight:true,width: 90},
                                { headerName:"2025",field: "year1",autoHeight:true,width: 80},
                                { headerName:"2024",field: "year2",autoHeight:true,width: 80},
                                { headerName:"2023",field: "year3",autoHeight:true,width: 80},
                                { headerName:"2022",field: "year4",autoHeight:true,width: 80},
                                { headerName:"2021",field: "year5",autoHeight:true,width: 80},
                                { headerName:"2020",field: "year6",autoHeight:true,width: 80},
                                { headerName:"2019",field: "year7",autoHeight:true,width: 80},
                                { headerName:"2018",field: "year8",autoHeight:true,width: 80},
                                { headerName:"2017",field: "year9",autoHeight:true,width: 80},
                                { headerName:"2016",field: "year10",autoHeight:true,width: 80},
                                { headerName:"<2016 Year",field: "otherYears",autoHeight:true},
                                { headerName:"Article Name",field: "articleTypeName",autoHeight:true,width:140},
                                { headerName:"Publication DB Name",field: "publicationDBName",autoHeight:true,width:140},    
                                { headerName:"Location",field: "location",filter: "agTextColumnFilter",cellClass: 'left-align-cell'},
                                { headerName:"Institute",field: "institute",autoHeight:true,filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
                                { headerName:"Department",field: "department",autoHeight:true,filter: "agTextColumnFilter",width: 4508,cellClass: 'left-align-cell'}
                            ];
                          }
                          else if(this.layerType == "4LType2"||this.layerType == "3LType3"){
                            this.columnDefs = [
                                      { headerName:"SNO",field: "rowNumber", width: 70},
                                      { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
                                      { headerName:"User ID",field: "userId",hide: true},
                                      { headerName:"Name of Faculty",field: "authorName",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell',cellRenderer: AuthorLinkRendererComponent},
                                      { headerName:"Total",field: "totalPubCount",autoHeight:true,width: 90},
                                      { headerName:"2025",field: "year1",autoHeight:true,width: 80},
                                      { headerName:"2024",field: "year2",autoHeight:true,width: 80},
                                      { headerName:"2023",field: "year3",autoHeight:true,width: 80},
                                      { headerName:"2022",field: "year4",autoHeight:true,width: 80},
                                      { headerName:"2021",field: "year5",autoHeight:true,width: 80},
                                      { headerName:"2020",field: "year6",autoHeight:true,width: 80},
                                      { headerName:"2019",field: "year7",autoHeight:true,width: 80},
                                      { headerName:"2018",field: "year8",autoHeight:true,width: 80},
                                      { headerName:"2017",field: "year9",autoHeight:true,width: 80},
                                      { headerName:"2016",field: "year10",autoHeight:true,width: 80},
                                      { headerName:"<2016 Year",field: "otherYears",autoHeight:true},
                                      { headerName:"Article Name",field: "articleTypeName",autoHeight:true,width:140},
                                      { headerName:"Publication DB Name",field: "publicationDBName",autoHeight:true,width:140},    
                                      { headerName:"School",field: "school",autoHeight:true,filter: "agTextColumnFilter",width:450,cellClass: 'left-align-cell'},
                                      { headerName:"Institute",field: "institute",autoHeight:true,filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
                                      { headerName:"Department",field: "department",autoHeight:true,filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'}
                                  ];
                                }
                                else{
                                  this.columnDefs = [
                                            { headerName:"SNO",field: "rowNumber", width: 70},
                                            { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
                                            { headerName:"User ID",field: "userId",hide: true},
                                            { headerName:"Name of Faculty",field: "authorName",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell',cellRenderer: AuthorLinkRendererComponent},
                                            { headerName:"Total",field: "totalPubCount",autoHeight:true,width: 90},
                                            { headerName:"2025",field: "year1",autoHeight:true,width: 80},
                                            { headerName:"2024",field: "year2",autoHeight:true,width: 80},
                                            { headerName:"2023",field: "year3",autoHeight:true,width: 80},
                                            { headerName:"2022",field: "year4",autoHeight:true,width: 80},
                                            { headerName:"2021",field: "year5",autoHeight:true,width: 80},
                                            { headerName:"2020",field: "year6",autoHeight:true,width: 80},
                                            { headerName:"2019",field: "year7",autoHeight:true,width: 80},
                                            { headerName:"2018",field: "year8",autoHeight:true,width: 80},
                                            { headerName:"2017",field: "year9",autoHeight:true,width: 80},
                                            { headerName:"2016",field: "year10",autoHeight:true,width: 80},
                                            { headerName:"<2016 Year",field: "otherYears",autoHeight:true},
                                            { headerName:"Article Name",field: "articleTypeName",autoHeight:true,width:140},
                                            { headerName:"Publication DB Name",field: "publicationDBName",autoHeight:true,width:140},    
                                            { headerName:"Location",field: "location",filter: "agTextColumnFilter",cellClass: 'left-align-cell'},
                                            { headerName:"School",field: "school",autoHeight:true,filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
                                            { headerName:"Institute",field: "institute",autoHeight:true,filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
                                            { headerName:"Department",field: "department",autoHeight:true,filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'}
                                        ];
                                      }
       }

  if(pathName == "scorebook"){
    this.columnDefs = [
      { headerName:"Sl No",field: "SL_NO"},
      { headerName:"PUBLICATIONTITLE",field: "PUBLICATIONTITLE",autoHeight: true, width:600},
      { headerName:"SOURCEPUBLICATION",field: "SOURCEPUBLICATION",autoHeight:true, width:270 ,filter: 'agTextColumnFilter'
      },
      { headerName:"YEAR",field: "YEAR"},
      { headerName:"VOLUMENUMBER",field: "VOLUMENUMBER",width: 175},
      { headerName:"ISSUENUMBER",field: "ISSUENUMBER", width: 140},
      { headerName:"BPAGE",field: "BPAGE"},
      { headerName:"EPAGE",field: "EPAGE"},
      { headerName:"DOI",field: "DOI", width: 290}
    ];
  
  }

  // /performance-analysis-dashboard/prs-kra-eligibility-list
if(pathName == "/performance-analysis-dashboard/prs-kra-eligibility-list"){

      if(this.layerType == "3LType2"){
        this.columnDefs = [
          { headerName:"SNo",field: "sNo", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"Name of Faculty",field: "name",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Publication Title",field: "titleOfPublication",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Source Name",field: "nameOfSource",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Publisher Name",field: "publisherName",autoHeight:true,width: 90},
          { headerName:"Article Type",field: "articleType",autoHeight:true,width: 90},
          { headerName:"Authors",field: "authors",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Total Authors Count",field: "totalAuthorsCount",autoHeight:true,width: 90},
          { headerName:"Total Home Authors Count",field: "totalHomeAuthorsCount",autoHeight:true,width: 90},
          { headerName:"Base Points",field: "basePoints"},
          { headerName:"Author Share Percentage",field: "authorSharePercentage",autoHeight:true,width: 90},
          { headerName:"Faculty KRA Points",field: "facultyKRAPoints",autoHeight:true,width: 90},
          { headerName:"Author Position",field: "authorPosition"},
          { headerName:"SCS",field: "scopus"},
          { headerName:"WOS",field: "webofScience"},
          { headerName:"SCI",field: "sci"},
          { headerName:"ABDC",field: "abdc"},
          { headerName:"Impact Factor",field: "impactFactor"},
          { headerName:"Web Link",field: "weblink",width: 300,cellClass: 'left-align-cell'},
          { headerName:"DOI",field: "doi",width: 300,cellClass: 'left-align-cell'},
          { headerName:"Location",field: "campus",filter: "agTextColumnFilter",cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else if(this.layerType == "2LType1"){
        this.columnDefs = [
          { headerName:"SNo",field: "sNo", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"Name of Faculty",field: "name",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Publication Title",field: "titleOfPublication",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Source Name",field: "nameOfSource",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Publisher Name",field: "publisherName",autoHeight:true,width: 90},
          { headerName:"Article Type",field: "articleType",autoHeight:true,width: 90},
          { headerName:"Authors",field: "authors",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Total Authors Count",field: "totalAuthorsCount",autoHeight:true,width: 90},
          { headerName:"Total Home Authors Count",field: "totalHomeAuthorsCount",autoHeight:true,width: 90},
          { headerName:"Base Points",field: "basePoints"},
          { headerName:"Author Share Percentage",field: "authorSharePercentage",autoHeight:true,width: 90},
          { headerName:"Faculty KRA Points",field: "facultyKRAPoints",autoHeight:true,width: 90},
          { headerName:"Author Position",field: "authorPosition"},
          { headerName:"SCS",field: "scopus"},
          { headerName:"WOS",field: "webofScience"},
          { headerName:"SCI",field: "sci"},
          { headerName:"ABDC",field: "abdc"},
          { headerName:"Impact Factor",field: "impactFactor"},
          { headerName:"Web Link",field: "weblink",width: 300,cellClass: 'left-align-cell'},
          { headerName:"DOI",field: "doi",width: 300,cellClass: 'left-align-cell'},
          { headerName:"Institute",field: "institute",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else if(this.layerType == "2LType2"){
        this.columnDefs = [
         { headerName:"SNo",field: "sNo", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"Name of Faculty",field: "name",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Publication Title",field: "titleOfPublication",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Source Name",field: "nameOfSource",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Publisher Name",field: "publisherName",autoHeight:true,width: 90},
          { headerName:"Article Type",field: "articleType",autoHeight:true,width: 90},
          { headerName:"Authors",field: "authors",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Total Authors Count",field: "totalAuthorsCount",autoHeight:true,width: 90},
          { headerName:"Total Home Authors Count",field: "totalHomeAuthorsCount",autoHeight:true,width: 90},
          { headerName:"Base Points",field: "basePoints"},
          { headerName:"Author Share Percentage",field: "authorSharePercentage",autoHeight:true,width: 90},
          { headerName:"Faculty KRA Points",field: "facultyKRAPoints",autoHeight:true,width: 90},
          { headerName:"Author Position",field: "authorPosition"},
          { headerName:"SCS",field: "scopus"},
          { headerName:"WOS",field: "webofScience"},
          { headerName:"SCI",field: "sci"},
          { headerName:"ABDC",field: "abdc"},
          { headerName:"Impact Factor",field: "impactFactor"},
          { headerName:"Web Link",field: "weblink",width: 300,cellClass: 'left-align-cell'},
          { headerName:"DOI",field: "doi",width: 300,cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else if(this.layerType == "3LType1"){
        this.columnDefs = [
          { headerName:"SNo",field: "sNo", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"Name of Faculty",field: "name",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Publication Title",field: "titleOfPublication",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Source Name",field: "nameOfSource",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Publisher Name",field: "publisherName",autoHeight:true,width: 90},
          { headerName:"Article Type",field: "articleType",autoHeight:true,width: 90},
          { headerName:"Authors",field: "authors",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Total Authors Count",field: "totalAuthorsCount",autoHeight:true,width: 90},
          { headerName:"Total Home Authors Count",field: "totalHomeAuthorsCount",autoHeight:true,width: 90},
          { headerName:"Base Points",field: "basePoints"},
          { headerName:"Author Share Percentage",field: "authorSharePercentage",autoHeight:true,width: 90},
          { headerName:"Faculty KRA Points",field: "facultyKRAPoints",autoHeight:true,width: 90},
          { headerName:"Author Position",field: "authorPosition"},
          { headerName:"SCS",field: "scopus"},
          { headerName:"WOS",field: "webofScience"},
          { headerName:"SCI",field: "sci"},
          { headerName:"ABDC",field: "abdc"},
          { headerName:"Impact Factor",field: "impactFactor"},
          { headerName:"Web Link",field: "weblink",width: 300,cellClass: 'left-align-cell'},
          { headerName:"DOI",field: "doi",width: 300,cellClass: 'left-align-cell'},
          { headerName:"Location",field: "campus",filter: "agTextColumnFilter",cellClass: 'left-align-cell'},
          { headerName:"Institute",field: "institute",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else if(this.layerType == "4LType2"||this.layerType == "3LType3"){
        this.columnDefs = [
          { headerName:"SNo",field: "sNo", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"Name of Faculty",field: "name",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Publication Title",field: "titleOfPublication",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Source Name",field: "nameOfSource",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Publisher Name",field: "publisherName",autoHeight:true,width: 90},
          { headerName:"Article Type",field: "articleType",autoHeight:true,width: 90},
          { headerName:"Authors",field: "authors",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Total Authors Count",field: "totalAuthorsCount",autoHeight:true,width: 90},
          { headerName:"Total Home Authors Count",field: "totalHomeAuthorsCount",autoHeight:true,width: 90},
          { headerName:"Base Points",field: "basePoints"},
          { headerName:"Author Share Percentage",field: "authorSharePercentage",autoHeight:true,width: 90},
          { headerName:"Faculty KRA Points",field: "facultyKRAPoints",autoHeight:true,width: 90},
          { headerName:"Author Position",field: "authorPosition"},
          { headerName:"SCS",field: "scopus"},
          { headerName:"WOS",field: "webofScience"},
          { headerName:"SCI",field: "sci"},
          { headerName:"ABDC",field: "abdc"},
          { headerName:"Impact Factor",field: "impactFactor"},
          { headerName:"Web Link",field: "weblink",width: 300,cellClass: 'left-align-cell'},
          { headerName:"DOI",field: "doi",width: 300,cellClass: 'left-align-cell'},
          { headerName:"School",field: "school",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Institute",field: "institute",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else{
        this.columnDefs = [
          { headerName:"SNo",field: "sNo", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"Name of Faculty",field: "name",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Publication Title",field: "titleOfPublication",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Source Name",field: "nameOfSource",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Publisher Name",field: "publisherName",autoHeight:true,width: 90},
          { headerName:"Article Type",field: "articleType",autoHeight:true,width: 90},
          { headerName:"Authors",field: "authors",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Total Authors Count",field: "totalAuthorsCount",autoHeight:true,width: 90},
          { headerName:"Total Home Authors Count",field: "totalHomeAuthorsCount",autoHeight:true,width: 90},
          { headerName:"Base Points",field: "basePoints"},
          { headerName:"Author Share Percentage",field: "authorSharePercentage",autoHeight:true,width: 90},
          { headerName:"Faculty KRA Points",field: "facultyKRAPoints",autoHeight:true,width: 90},
          { headerName:"Author Position",field: "authorPosition"},
          { headerName:"SCS",field: "scopus"},
          { headerName:"WOS",field: "webofScience"},
          { headerName:"SCI",field: "sci"},
          { headerName:"ABDC",field: "abdc"},
          { headerName:"Impact Factor",field: "impactFactor"},
          { headerName:"Web Link",field: "weblink",width: 300,cellClass: 'left-align-cell'},
          { headerName:"DOI",field: "doi",width: 300,cellClass: 'left-align-cell'},
          { headerName:"Location",field: "campus",filter: "agTextColumnFilter",cellClass: 'left-align-cell'},
          { headerName:"School",field: "school",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Institute",field: "institute",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

  }    

  // /performance-analysis-dashboard/prs-kra-scoring
  if(pathName == "/performance-analysis-dashboard/prs-kra-scoring"){

      if(this.layerType == "3LType2"){
        this.columnDefs = [
          { headerName:"SNo",field: "sNo", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"Name of Faculty",field: "name",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Books",field: "books",width: 110},
          { headerName:"Conference",field: "conference",width: 110},
          { headerName:"Research Papers",field: "researchPapers",width: 110},
          { headerName:"Grand Total",field: "grandTotal",width: 110},
          { headerName:"Location",field: "campus",filter: "agTextColumnFilter",cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else if(this.layerType == "2LType1"){
        this.columnDefs = [
          { headerName:"SNo",field: "sNo", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"Name of Faculty",field: "name",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Books",field: "books",width: 110},
          { headerName:"Conference",field: "conference",width: 110},
          { headerName:"Research Papers",field: "researchPapers",width: 110},
          { headerName:"Grand Total",field: "grandTotal",width: 110},
          { headerName:"Institute",field: "institute",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else if(this.layerType == "2LType2"){
        this.columnDefs = [
          { headerName:"SNo",field: "sNo", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"Name of Faculty",field: "name",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Books",field: "books",width: 110},
          { headerName:"Conference",field: "conference",width: 110},
          { headerName:"Research Papers",field: "researchPapers",width: 110},
          { headerName:"Grand Total",field: "grandTotal",width: 110},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},        
        ];
      }

      else if(this.layerType == "3LType1"){
        this.columnDefs = [
          { headerName:"SNo",field: "sNo", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"Name of Faculty",field: "name",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Books",field: "books",width: 110},
          { headerName:"Conference",field: "conference",width: 110},
          { headerName:"Research Papers",field: "researchPapers",width: 110},
          { headerName:"Grand Total",field: "grandTotal",width: 110},
          { headerName:"Location",field: "campus",filter: "agTextColumnFilter",cellClass: 'left-align-cell'},
          { headerName:"Institute",field: "institute",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else if(this.layerType == "4LType2"||this.layerType == "3LType3"){
        this.columnDefs = [
          { headerName:"SNo",field: "sNo", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"Name of Faculty",field: "name",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Books",field: "books",width: 110},
          { headerName:"Conference",field: "conference",width: 110},
          { headerName:"Research Papers",field: "researchPapers",width: 110},
          { headerName:"Grand Total",field: "grandTotal",width: 110},
          { headerName:"School",field: "school",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Institute",field: "institute",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

      else{
        this.columnDefs = [
          { headerName:"SNo",field: "sNo", width: 70},
          { headerName:"Emp ID",field: "employeeId",width: 110,cellClass: 'left-align-cell'},
          { headerName:"Name of Faculty",field: "name",filter: 'agTextColumnFilter', width: 180,autoHeight:true,cellClass: 'left-align-cell'},
          { headerName:"Books",field: "books",width: 110},
          { headerName:"Conference",field: "conference",width: 110},
          { headerName:"Research Papers",field: "researchPapers",width: 110},
          { headerName:"Grand Total",field: "grandTotal",width: 110},
          { headerName:"Location",field: "campus",filter: "agTextColumnFilter",cellClass: 'left-align-cell'},
          { headerName:"School",field: "school",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Institute",field: "institute",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450,cellClass: 'left-align-cell'},
          
        ];
      }

  }   

  // if(pathName == "clientadmin"){
  //   if(this.layerType == "3LType2"){
  //      this.columnDefs = [
  //         { headerName:"SL.NO",field: "rowNumber"},
  //         { headerName:"USER ID",field: "userId"},
  //         { headerName:"EMP.NO",field: "employeeId"},
  //         { headerName:"FACULTY NAME",field: "fullName",width: 270,autoHeight:true},
  //         { headerName:"DEPARTMENT",field: "departmentName",width: 370,autoHeight:true},
  //         { headerName:"LOCATION",field: "locationName",autoHeight:true},
  //         { headerName:"STATUS",field: "userStatus"},
  //         { headerName:"TYPE",field: "roles",width: 190}
  //     ];
  //   }
  //   else if(this.layerType == "2LType1"){
  //     this.columnDefs = [
  //        { headerName:"SL.NO",field: "rowNumber"},
  //        { headerName:"USER ID",field: "userId"},
  //        { headerName:"EMP.NO",field: "employeeId"},
  //        { headerName:"FACULTY NAME",field: "fullName",width: 270,autoHeight:true},
  //        { headerName:"DEPARTMENT",field: "departmentName",width: 370,autoHeight:true},
  //        { headerName:"INSTITUTE",field: "instituteName",width: 360,autoHeight:true},
  //        { headerName:"STATUS",field: "userStatus"},
  //        { headerName:"TYPE",field: "roles"}
  //    ];
  //  }
  //  else if(this.layerType == "2LType2"){
  //   this.columnDefs = [
  //      { headerName:"SL.NO",field: "rowNumber"},
  //      { headerName:"USER ID",field: "userId"},
  //      { headerName:"EMP.NO",field: "employeeId"},
  //      { headerName:"FACULTY NAME",field: "fullName",width: 270,autoHeight:true},
  //      { headerName:"DEPARTMENT",field: "departmentName",width: 370,autoHeight:true},
  //      { headerName:"STATUS",field: "userStatus"},
  //      { headerName:"TYPE",field: "roles",width: 190}
  //   ];
  // }
  // else if(this.layerType == "3LType1"){
  //   this.columnDefs = [
  //     { headerName:"SL.NO",field: "rowNumber"},
  //     { headerName:"USER ID",field: "userId"},
  //     { headerName:"EMP.NO",field: "employeeId"},
  //     { headerName:"FACULTY NAME",field: "fullName",width: 270,autoHeight:true},
  //     { headerName:"DEPARTMENT",field: "departmentName",width: 370,autoHeight:true},
  //     { headerName:"INSTITUTE",field: "instituteName",width: 360,autoHeight:true},
  //     { headerName:"LOCATION",field: "locationName",autoHeight:true},
  //     { headerName:"STATUS",field: "userStatus"},
  //     { headerName:"TYPE",field: "roles"}
  //   ];
  // }
  // else if(this.layerType == "4LType2"||this.layerType == "3LType3"){
  //   this.columnDefs = [
  //     { headerName:"SL.NO",field: "rowNumber"},
  //     { headerName:"USER ID",field: "userId"},
  //     { headerName:"EMP.NO",field: "employeeId"},
  //     { headerName:"FACULTY NAME",field: "fullName",width: 270,autoHeight:true},
  //     { headerName:"DEPARTMENT",field: "departmentName",width: 370,autoHeight:true},
  //     { headerName:"INSTITUTE",field: "instituteName",width: 360,autoHeight:true},
  //     { headerName:"SCHOOL",field: "schoolName",width: 270,autoHeight:true},
  //     { headerName:"STATUS",field: "userStatus"},
  //     { headerName:"TYPE",field: "roles", width:190}
  //   ];
  // }
  // else {
  //     this.columnDefs = [
  //       { headerName:"SL.NO",field: "rowNumber"},
  //       { headerName:"USER ID",field: "userId"},
  //       { headerName:"EMP.NO",field: "employeeId"},
  //       { headerName:"FACULTY NAME",field: "fullName",width: 270,autoHeight:true},
  //       { headerName:"DEPARTMENT",field: "departmentName",width: 370,autoHeight:true},
  //       { headerName:"INSTITUTE",field: "instituteName",width: 360,autoHeight:true},
  //       { headerName:"SCHOOL",field: "schoolName",width: 270,autoHeight:true},
  //       { headerName:"LOCATION",field: "locationName",autoHeight:true},
  //       { headerName:"STATUS",field: "userStatus"},
  //       { headerName:"TYPE",field: "roles",width:190}
  //     ];

  //   }
  
  // }

    this.defaultColDef =  {
      filter: "agNumberColumnFilter",
      width: 120,
      floatingFilter: true,
      cellStyle: {'textAlign': 'center'},
    };
  

    this.rowSelection = "multiple";
    this.themeClass =  "ag-theme-quartz";
  
  }  
 

  ngOnChanges(changes: SimpleChanges): void {

      if(changes['startIndex']){
        this.loading=true;
        this.indexStart = this.startIndex;
        console.log(this.indexStart);
      }
      if(changes['endIndex']){
        this.loading=true;
        this.indexEnd = this.endIndex;
        console.log(this.indexEnd);
        // this.gridData =this.filterDataForGrid(this.gridData);
      }
      if((changes['startIndex'] && changes['endIndex']) || changes['gridData']){
          
          this.loading=true;
          if(window.location.pathname.split("/")[1] == "scorebook"){
            this.gridData = this.gridData.slice(this.indexStart,this.indexEnd);  
          }
          if(Array.isArray(this.gridData)){
           this.gridData =  this.filterDataForGrid(this.gridData);
          }
          if(this.gridData.length < 0){
            this.loading=false;
          }  

      }
      if(changes['layerType']){
        console.log(this.layerType);
        this.ngOnInit(); 
      }
               
  }

  gridOptions: GridOptions = {
    rowClassRules: {
      'odd-row': (params) => {
        return params.node && params.node.rowIndex % 2 !== 0;
      }
    },
    onGridReady: (params: GridReadyEvent) => this.onGridReady(params)
  };

  onGridReady(param:GridReadyEvent){
    this.gridApi=param.api;
    if(this.gridApi){

      if(window.location.pathname.split("/")[1]== "facultyProfiles"){
        this.insertDataIntoGrid(this.gridData);
      }
      if(window.location.pathname.split("/")[1]== "scorebook") {
        this.insertDataIntoGrid(this.gridData);
      }
      if(window.location.pathname.split("/")[1]== "clientadmin") {
        this.insertDataIntoGrid(this.gridData);
      }
      if(window.location.pathname== "/performance-analysis-dashboard/prs-kra-eligibility-list") {
        this.insertDataIntoGrid(this.gridData);
      }
       if(window.location.pathname== "/performance-analysis-dashboard/prs-kra-scoring") {
        this.insertDataIntoGrid(this.gridData);
      }
      
    }else{
      this.loading=true;
    }

  }

  filterDataForGrid(data: any[]): any[] {
    if (!this.columnFilterApplied) {
        this.columnDefs = this.columnDefs.filter(col => {
            const colField = col.field;
            return data.some(item => item[colField] != null && item[colField] !== '');
        });
        this.columnFilterApplied = true; // Prevent future filtering
    }

    let colField = this.columnDefs.map(col => col.field);

    // Check if a field is numeric
    const isNumericField = (field: string, dataset: any[]): boolean => {
        return dataset.some(item => 
            item[field] !== null && 
            item[field] !== '' && 
            !isNaN(Number(item[field])) // Checks if value can be converted to a number
        );
    };

    return data.map((item, index) => {
        const filteredItem: any = {};
        colField.forEach(col => {
            if (item.hasOwnProperty(col) && item[col] != null) {
                // Convert number-like fields to actual numbers
                filteredItem[col] = isNumericField(col, data) ? Number(item[col]) : item[col];
            }
        });
        return filteredItem;
    });
  }

  
      insertDataIntoGrid(data: any[]): void {
        this.gridApi.applyTransaction({ add: data });
      }

      frameworkComponents = {
        authorLinkRenderer: AuthorLinkRendererComponent
      };

      exportToExcel(name): void {
        const filteredData: any[] = [];

        this.gridApi.forEachNodeAfterFilter(node => {
          filteredData.push(node.data);
        });
      
        if (filteredData.length === 0) return;
      
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('FilteredData');
      
        const headers = Object.keys(filteredData[0]);
        const capitalHeaders = headers.map(h => h.toUpperCase());
      
        // Add header row
        const headerRow = worksheet.addRow(capitalHeaders);
      
        // Style header row (bold, font size, borders)
        headerRow.eachCell(cell => {
          cell.font = { bold: true, size: 12 };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      
        // Add data rows and apply border to each cell
        filteredData.forEach(row => {
          const dataRow = worksheet.addRow(headers.map(key => row[key]));
          dataRow.eachCell(cell => {
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
          });
        });
      
        // Export to Excel
        workbook.xlsx.writeBuffer().then(buffer => {
          const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          FileSaver.saveAs(blob, name+'.xlsx');
        });
      }

      exportToExcelTimeLine(name: string): void {
        const filteredData: any[] = [];
        const currentYear = new Date().getFullYear();
      
        this.gridApi.forEachNodeAfterFilter(node => {
          filteredData.push(node.data);
        });
      
        if (filteredData.length === 0) return;
      
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('FilteredData');
      
        // Use your dynamic columnHeaders
        const columnHeaders = [
          { key: "rowNumber", label: "SNo." },
          { key: "employeeId", label: "Emp ID" },
          { key: "authorName", label: "Name of Faculty" },
          { key: "totalPubCount", label: "Total" },
          { key: "year1", label: `${currentYear}` },
          { key: "year2", label: `${currentYear - 1}` },
          { key: "year3", label: `${currentYear - 2}` },
          { key: "year4", label: `${currentYear - 3}` },
          { key: "year5", label: `${currentYear - 4}` },
          { key: "year6", label: `${currentYear - 5}` },
          { key: "year7", label: `${currentYear - 6}` },
          { key: "year8", label: `${currentYear - 7}` },
          { key: "year9", label: `${currentYear - 8}` },
          { key: "year10", label: `${currentYear - 9}` },
          { key: "otherYears", label: `<${currentYear - 9} Year>` },
          { key: "location", label: this.layerType.match(/3LType1|3LType2|4LType1/) ? "Location" : null },
          { key: "school", label: this.layerType.match(/4LType1|4LType2/) ? "School" : null },
          { key: "institute", label: this.layerType.match(/2LType1|3LType1|3LType3|4LType1|4LType2/) ? "Institute" : null },
          { key: "department", label: this.layerType.match(/2LType1|3LType1|3LType2|3LType3|2LType2|4LType1|4LType2/) ? "Department" : null }
        ].filter(h => h.label !== null);
      
        const keys = columnHeaders.map(col => col.key);
        const labels = columnHeaders.map(col => col.label);
      
        // Header row
        const headerRow = worksheet.addRow(labels);
        headerRow.eachCell(cell => {
          cell.font = { bold: true, size: 12 };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      
        // Data rows
        filteredData.forEach(row => {
          const rowData = keys.map(key => row[key]);
          const dataRow = worksheet.addRow(rowData);
          dataRow.eachCell(cell => {
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
          });
        });
      
        // Export to Excel
        workbook.xlsx.writeBuffer().then(buffer => {
          const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          FileSaver.saveAs(blob, name + '.xlsx');
        });
      }
      

}
