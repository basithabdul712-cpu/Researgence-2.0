import { Component, NO_ERRORS_SCHEMA, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';


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
      
      
  if(pathName == "facultyProfiles"){
    this.columnDefs = [
      { headerName:"Sl No",field: "rowNumber"},
      { headerName:"EMP ID",field: "employeeId",},
      { headerName:"Author",field: "authorName",filter: 'agTextColumnFilter', width: 180,autoHeight:true,
      },
      { headerName:"Total",field: "totalPubCount"},
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
      { headerName:"Location",field: "location",filter: "agTextColumnFilter"},
      { headerName:"School",field: "school",filter: "agTextColumnFilter",width: 450},
      { headerName:"Institute",field: "institute",filter: "agTextColumnFilter",width: 450},
      { headerName:"Department",field: "department",filter: "agTextColumnFilter",width: 450},
      
    ];
  

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
  if(pathName == "clientadmin"){
    if(this.layerType == "3LType2"){
       this.columnDefs = [
          { headerName:"SL.NO",field: "rowNumber"},
          { headerName:"USER ID",field: "userId"},
          { headerName:"EMP.NO",field: "employeeId"},
          { headerName:"FACULTY NAME",field: "fullName",width: 270,autoHeight:true},
          { headerName:"DEPARTMENT",field: "departmentName",width: 370,autoHeight:true},
          { headerName:"LOCATION",field: "locationName",autoHeight:true},
          { headerName:"STATUS",field: "userStatus"},
          { headerName:"TYPE",field: "roles",width: 190}
      ];
    }
    else if(this.layerType == "2LType1"){
      this.columnDefs = [
         { headerName:"SL.NO",field: "rowNumber"},
         { headerName:"USER ID",field: "userId"},
         { headerName:"EMP.NO",field: "employeeId"},
         { headerName:"FACULTY NAME",field: "fullName",width: 270,autoHeight:true},
         { headerName:"DEPARTMENT",field: "departmentName",width: 370,autoHeight:true},
         { headerName:"INSTITUTE",field: "instituteName",width: 360,autoHeight:true},
         { headerName:"STATUS",field: "userStatus"},
         { headerName:"TYPE",field: "roles"}
     ];
   }
   else if(this.layerType == "2LType2"){
    this.columnDefs = [
       { headerName:"SL.NO",field: "rowNumber"},
       { headerName:"USER ID",field: "userId"},
       { headerName:"EMP.NO",field: "employeeId"},
       { headerName:"FACULTY NAME",field: "fullName",width: 270,autoHeight:true},
       { headerName:"DEPARTMENT",field: "departmentName",width: 370,autoHeight:true},
       { headerName:"STATUS",field: "userStatus"},
       { headerName:"TYPE",field: "roles",width: 190}
    ];
  }
  else if(this.layerType == "3LType1"){
    this.columnDefs = [
      { headerName:"SL.NO",field: "rowNumber"},
      { headerName:"USER ID",field: "userId"},
      { headerName:"EMP.NO",field: "employeeId"},
      { headerName:"FACULTY NAME",field: "fullName",width: 270,autoHeight:true},
      { headerName:"DEPARTMENT",field: "departmentName",width: 370,autoHeight:true},
      { headerName:"INSTITUTE",field: "instituteName",width: 360,autoHeight:true},
      { headerName:"LOCATION",field: "locationName",autoHeight:true},
      { headerName:"STATUS",field: "userStatus"},
      { headerName:"TYPE",field: "roles"}
    ];
  }
  else if(this.layerType == "4LType2"||this.layerType == "3LType3"){
    this.columnDefs = [
      { headerName:"SL.NO",field: "rowNumber"},
      { headerName:"USER ID",field: "userId"},
      { headerName:"EMP.NO",field: "employeeId"},
      { headerName:"FACULTY NAME",field: "fullName",width: 270,autoHeight:true},
      { headerName:"DEPARTMENT",field: "departmentName",width: 370,autoHeight:true},
      { headerName:"INSTITUTE",field: "instituteName",width: 360,autoHeight:true},
      { headerName:"SCHOOL",field: "schoolName",width: 270,autoHeight:true},
      { headerName:"STATUS",field: "userStatus"},
      { headerName:"TYPE",field: "roles", width:190}
    ];
  }
  else {
      this.columnDefs = [
        { headerName:"SL.NO",field: "rowNumber"},
        { headerName:"USER ID",field: "userId"},
        { headerName:"EMP.NO",field: "employeeId"},
        { headerName:"FACULTY NAME",field: "fullName",width: 270,autoHeight:true},
        { headerName:"DEPARTMENT",field: "departmentName",width: 370,autoHeight:true},
        { headerName:"INSTITUTE",field: "instituteName",width: 360,autoHeight:true},
        { headerName:"SCHOOL",field: "schoolName",width: 270,autoHeight:true},
        { headerName:"LOCATION",field: "locationName",autoHeight:true},
        { headerName:"STATUS",field: "userStatus"},
        { headerName:"TYPE",field: "roles",width:190}
      ];

    }
  
  }

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
          console.log(this.gridData);
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
      
    }else{
      this.loading=true;
    }

  }
 

  // filterDataForGrid(data: any[]): any[] {
  //   return data.map((item,index) => {
  //     const filteredItem: any = {};
  //     this.columnDefs.forEach(col => {
  //       if (item.hasOwnProperty(col.field)) {
  //         filteredItem[col.field] = item[col.field];
  //       }
  //     });
  //     return filteredItem;
  //   });
  // }

  filterDataForGrid(data: any[]): any[] {

    // console.time("Filtering Time");
    if (!this.columnFilterApplied) {
      this.columnDefs = this.columnDefs.filter(col => {
        const colField = col.field;
        return data.some(item => item[colField] != null && item[colField] !== '');
      });
      this.columnFilterApplied = true; // Mark as applied to prevent future filtering
    }

    let colField = this.columnDefs.map(col => col.field);
    const filterData =  data.map((item,index) => {
      const filteredItem: any = {};
      colField.forEach(col => {
        if (item.hasOwnProperty(col) && item[col] != null) {
          filteredItem[col] = item[col];
        }
      });
      return filteredItem;
    });
    // console.timeEnd("Filtering Time");
    return filterData;
  }
  
  insertDataIntoGrid(data: any[]): void {
    this.gridApi.applyTransaction({ add: data });
  }

  

}
