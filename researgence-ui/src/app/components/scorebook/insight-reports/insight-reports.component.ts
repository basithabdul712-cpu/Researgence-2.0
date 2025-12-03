import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5geodata_indiaLow from "@amcharts/amcharts5-geodata/india2020Low";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import * as am5map from "@amcharts/amcharts5/map";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FacultiesService } from '../../faculties/faculties.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { ScorebookService } from '../scorebook.service';
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import { GeneralApiService } from '../../general-api.service';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
import * as jspdf from 'jspdf';
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import * as am4plugins_annotation from "@amcharts/amcharts4/plugins/annotation"; 
import { log } from '@amcharts/amcharts4/.internal/fabric/fabric-impl';
import { slice } from '@amcharts/amcharts4/.internal/core/utils/Array';

interface MyDataItem {
  long: number;
  lat: number;
  id:string;
  name: string;
  value:number;
}

@Component({
  selector: 'app-insight-reports',
  templateUrl: './insight-reports.component.html',
  styleUrls: ['./insight-reports.component.scss','./../../../../assets/given/newcss/style.css']
})


export class InsightReportsComponent implements OnInit {
  [x: string]: any;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  enableChart:boolean=true;
  stickyEnable:boolean=false;
  open = false;
  isMenuOpen: any;
  Name: any;
  roleName: any;
  isScrolled = false;
  univ: any;
  userid: any;
  roleId: any;
  instituteid: any;
  departmentid: any;
  locationid: any;
  userDetail: any;
  universityName: any;
  role: any;
  univid: any;
  user: any;
  userId: any;
  layerType: any;
  data: any;
  pub: Object;
  obj: any;
  filter: any;
  pubCollabCount: any;
  trend: any;
  yearcombiend: any;
  journal: any;
  res: any;
  publicationData: any;
  insightData:any;
  citation: Object;
  state: any;
  endvalue: 10;
  output: any[];
  db: any;
  newoutput: any[];
  newdb:any;
  sliceCount:number[] = [-10, -25, -50]; 
  selectedSliceCount: any = -10;
  am5viewer:any;
  india: any;
  currentYear = new Date().getFullYear();
    maxDate: Date = new Date(this.currentYear,11,31);
    toYear:any;
    fromYear: any; 
    tempfromYear:any;
    temptoYear:any;
    enableFreezeMenu:boolean=false;
    journalel:any;
    uniqlocattion: any;
    instValue: any;
    deptvalue: any;
    Campusfiter: string;
    Schoolfilter:string;
    Institutefilter: string;
    departmentfilter: string;
  campus: any;
  uniqinstitute: any;
  isDropdownOpen: boolean = false;
  reses:any;
  newlist:any;

  locationFilterId:Number;
  schoolFilterId:Number;
  instituteFilterId:Number;
  deptFilterId:Number;

  layerFilter:any;
  layerCampus:any;
  layerSchool:any;
  layerInst:any;
  layerDept:any;
  layerInsSchCamDep:any;
  universityInfoList:any;
  deptGrpId:Number|null=null;

  navbar: any;
  sticky: any;

  constructor(private gservice:GeneralApiService,private service:FacultiesService,private menuService:MenuService,private scorebookservice:ScorebookService,private excel:ExcelExportService,
    private authservice:AuthService,private elementRef: ElementRef,private el: ElementRef) { }

  ngOnInit(): void {
  
    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });

     let d= new Date();
     this.temptoYear=d.getFullYear();

    this.userDetail=this.authservice.getUserDetail();
    this.roleId=this.authservice.getProfileObs();
    console.log(this.userDetail);
    this.universityName = this.userDetail.University;
    this.layerType=this.userDetail.LayerType;
    
    this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

    this.service.getUnivLocSchInstDept(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
      this.layerFilter=x;
      console.log(x);  
      if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){
        this.layerInsSchCamDep=this.layerFilter;
          this.layerCampus=Array.from(new Set(this.layerFilter.map((item : any)=>item.locationName)));
      }
      else if(this.layerType=='4LType2'||this.layerType=='3LType3'){
        this.layerInsSchCamDep=this.layerFilter;
        this.layerSchool=Array.from(new Set(this.layerFilter.map((item : any)=>item.schoolName)));
      }
      else if(this.layerType=='2LType1'){
        this.layerInsSchCamDep=this.layerFilter;
        this.layerInst=Array.from(new Set(this.layerFilter.map((item : any)=>item.instituteName)))
      }
      else if(this.layerType=='2LType2'){
        this.layerInsSchCamDep=this.layerFilter;
        this.layerDept=this.layerFilter;
      }
     
    })

    // this.authservice.RoleSelection(this.userDetail.UniversityId,this.userDetail.UserId).subscribe(x=>{
      this.role=JSON.parse(localStorage.getItem('RoleSelection'));
      const data=this.role.filter(item=> item.roleId==this.roleId);
      this.roleName=data[0].roleName;
    // })

    this.service.getLayerType(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId).subscribe(x=>{
      this.universityInfoList=x;
      this.tempfromYear=this.universityInfoList.univInsightStartYear;
      if( this.tempfromYear==null){
        this.tempfromYear=2010;
      }
      this.publicationchart(this.tempfromYear,this.temptoYear,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
      this.chartIndextrend(this.tempfromYear,this.temptoYear,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
      this.Dataanalysis(this.tempfromYear,this.temptoYear,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
      this.jouralcharts(this.tempfromYear,this.temptoYear,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
      this.countrycollb(this.tempfromYear,this.temptoYear,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
      this.dbyear(this.tempfromYear,this.temptoYear,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
      this.stateindia(this.tempfromYear,this.temptoYear,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
      this.scorebookservice.GetInsightPubTrendByYear(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.fromYear,this.toYear,this.deptGrpId) 
    });

        this.navbar = this.el.nativeElement.querySelector('#profile-sticky-nav');
        this.sticky = this.navbar.offsetTop;

  }

     // For stickey blue bar changes
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


     @HostListener('window:scroll', ['$event'])
     onScroll() {
       this.profileStickyFunction();
     }
   
     profileStickyFunction() {
       if (window.pageYOffset >= 180) {
         this.navbar.classList.add('sticky');
         this.enableFreezeMenu=true;
       } else {
         this.navbar.classList.remove('sticky');
         this.enableFreezeMenu=false;
       }
     }
    
     toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }

    publicationchart(tempfromYear, temptoYear, locationid,schoolid,instituteid,departmentid,deptGrpId){
      console.log(tempfromYear);
      console.log(temptoYear);
      
      
      this.scorebookservice.GetInsightPubTrendByYear(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,locationid,schoolid,instituteid,departmentid,tempfromYear,temptoYear,deptGrpId).subscribe((x:any)=>{
        this.trend=x.map(({year,pubCount})=>({
        year: year,
        italy:parseInt(pubCount)
        }));
        this.trended=x.map(({year,pubCount})=>({
          year: year,
          PublicationCount:parseInt(pubCount)
          }));
        console.log(this.trend);
        this.newtrend=this.trend;
        this.publicationchat();
        
         })
    }

chartIndextrend(tempfromYear, temptoYear,locationid,schoolid,instituteid,departmentid,deptGrpId){
  this.scorebookservice.GetInsightPubIndexedTrendByYear( this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,locationid,schoolid,instituteid,departmentid,tempfromYear,temptoYear,deptGrpId).subscribe((r:any)=>{
  this.res=r.map(({year,pubIndexedCount,pubNonIndexedCount})=>({
    country: year,
          year2018: parseFloat(pubIndexedCount),
          year2017: parseFloat(pubNonIndexedCount)
  }));
  this.reses=r.map(({year,pubIndexedCount,pubNonIndexedCount})=>({
    year: year,
    pubIndexedCount : parseFloat( pubIndexedCount),
    pubNonIndexedCount : parseFloat( pubNonIndexedCount)
  }));
  console.log(this.res);
  // this.curstedchart();
  this.linechart();
    })
}

Dataanalysis(tempfromYear, temptoYear,locationid,schoolid,instituteid,departmentid,deptGrpId){
  this.scorebookservice.GetInsightPubDBCountByYear(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,locationid,schoolid,instituteid,departmentid,tempfromYear,temptoYear,deptGrpId).subscribe((responses:any) => {
  
    this.insightData =responses;
    console.log("DBcount=>", this.insightData)
  
    this.output = this.transformData(responses);
    console.log("double=>",this.output);
  
    this.db=this.output.map(({SCOPUS,year,WOS,GS,IEEE,PUBMED})=>({
      year:year,
      wos:parseInt(WOS),
      scopus:parseFloat(SCOPUS),
      gs:parseFloat(GS),
      ieee:parseInt(IEEE),
      pub:parseInt(PUBMED)
  
    }))
    
    this.doublecharts();
  
  });
}

jouralcharts(tempfromYear, temptoYear, locationid,schoolid,instituteid,departmentid,deptGrpId){
  this.scorebookservice.GetInsightJournalPubCount(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,locationid,schoolid,instituteid,departmentid,tempfromYear,temptoYear,deptGrpId).subscribe((x:any)=>
  {
 
      // Process only the first 10 records
      console.log('journal=>',x);
      this.journal = x.map(({ publicationSourceName, pubCount }) => ({
          network: publicationSourceName,
          value: parseInt(pubCount),
      }));
      this.journalel = x.map(({ publicationSourceName, pubCount }) => ({
        publicationSourceName: publicationSourceName,
        pubCount: parseInt(pubCount),
    }));
      console.log(this.journal);
      // this.barchart();
      this.newtopjoural();
 
  });
}

countrycollb(tempfromYear, temptoYear, locationid,schoolid,instituteid,departmentid,deptGrpId){
  this.scorebookservice.GetInsightCountryCollaboration(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,locationid,schoolid,instituteid,departmentid,tempfromYear,temptoYear,deptGrpId).subscribe((datas:any)=>{
    this.pubCollabCount=datas.map(({countryCode, longitude ,latitude , countryName, pubCount }) => ({
      long: parseFloat(longitude),
      lat: parseFloat(latitude),
      id:countryCode,
      name: countryName,
      value: parseFloat(pubCount),
    }));
    this.pubCollab=datas.map(({ countryCode , countryName, pubCount }) => ({
      countryCode: countryCode,
      countryName: countryName,
      pubCount: pubCount,
    }));
    console.log('world=>',this.pubCollabCount);
    this.worldchart();
  }); 
}

dbyear(tempfromYear, temptoYear, locationid,schoolid,instituteid,departmentid,deptGrpId){
  this.scorebookservice.GetInsightCitationByYearDB(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,locationid,schoolid,instituteid,departmentid,tempfromYear,temptoYear,deptGrpId).subscribe((cit:any)=>
  {
this.citation=cit;
console.log("citation=>",this.citation);
this.newoutput = this.exchangeData(cit);
console.log("next=>",this.newoutput);

this.newdb=this.newoutput.map(({SCOPUS,year,WOS,GS,IEEE,PUBMED})=>({
  year:year,
  wos:parseInt(WOS),
  scopus:parseFloat(SCOPUS),

    }))
    this.columncharts();

  });
}

stateindia(tempfromYear, temptoYear,locationid,schoolid,instituteid,departmentid,deptGrpId){
  this.scorebookservice.GetInsightStateCollaboration(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,locationid,schoolid,instituteid,departmentid,tempfromYear,temptoYear,deptGrpId).subscribe(sta=>
    {
  this.state=sta;

  console.log("state=>",this.state);

   this.india=this.state.map(({stateName,latitude,longitude,pubCount,stateCode})=>({
    stateName:stateName,
    latitude:parseFloat(latitude),
    longitude:parseFloat(longitude),
    pubCount:parseInt(pubCount),
    id:stateCode
   }))
   console.log(this.india);
   
  this.indiamap();
    });
}
  showChart(){
    this.enableChart=!this.enableChart;
}

  private  transformData(input: any[]): any[] {
    const output: any[] = [];
 
    const groupedData: { [year: string]: any } = {};
    input.forEach(entry => {
        const year = entry.year;
        const db = entry.publicationDBName;
        const count = entry.pubDBCount;
 
        if (!groupedData[year]) {
            groupedData[year] = { year: year };
        }
 
        groupedData[year][db] = count;
    });
 
    for (const year in groupedData) {
        if (groupedData.hasOwnProperty(year)) {
            output.push(groupedData[year]);
        }
    }
 
    return output;
}

private  exchangeData(input: any[]): any[] {
  const output: any[] = [];

  const groupedData: { [year: string]: any } = {};
  input.forEach(entry => {
      const year = entry.year;
      const db = entry.publicationDBName;
      const count = entry.pubDBSumOfCitation;

      if (!groupedData[year]) {
          groupedData[year] = { year: year };
      }

      groupedData[year][db] = count;
  });

  for (const year in groupedData) {
      if (groupedData.hasOwnProperty(year)) {
          output.push(groupedData[year]);
      }
  }

  return output;
}

  onSliceCountChange(event: any) {
    this.selectedSliceCount = parseInt(event.target.value); // Update selected slice count
    this.linechart(); // Call linechart with the new count
  }
  
  publicationchat() {
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    let chart = am4core.create("chartTrends", am4charts.XYChart);
    
    // Add data
    chart.data = this.trend;
    
    // Create category axis
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.opposite = false;
    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      target.rotation = -75; 
      target.horizontalCenter = "middle";
      target.verticalCenter = "bottom";  
      return dy;
    });
    
    // Set padding to prevent label overlap
    categoryAxis.paddingTop = 20;  
    categoryAxis.paddingBottom = 30;

    //Set the grid lines to appear in the middle of each category (year)
    categoryAxis.renderer.grid.template.location=0.5;
    //Ensure the axis covers the full range
    categoryAxis.startLocation = 0;
    categoryAxis.endLocation = 1;
    //Ensure all labels are displayed
    categoryAxis.renderer.minGridDistance = 20;      
    
    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inversed = false;
    valueAxis.title.text = "Place taken";
    valueAxis.renderer.minLabelPosition = 0.01;
    
    // Create series
    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "italy";
    series1.dataFields.categoryX = "year";
    series1.name = "Year count";
    series1.bullets.push(new am4charts.CircleBullet());
    series1.tooltipText = " {name} in {categoryX}: {valueY}";
    series1.legendSettings.valueText = "{valueY}";
    series1.visible  = false;
    
    
    
    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";
    
    
    let hs1 = series1.segments.template.states.create("hover")
    hs1.properties.strokeWidth = 5;
    series1.segments.template.strokeWidth = 1; 
    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.itemContainers.template.events.on("over", function(event){
    })
    
    chart.legend.itemContainers.template.events.on("out", function(event){

    })
    chart.exporting.menu = new am4core.ExportMenu();

let annotation = chart.plugins.push(new am4plugins_annotation.Annotation());
let annotation_data = annotation.data;

// Load annotations
annotation.data = annotation_data;
chart.cursor = new am4charts.XYCursor();

chart.scrollbarX = new am4core.Scrollbar();
    
  }

  worldchart(){
    
    am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
let chart = am4core.create("chartwdiv", am4maps.MapChart);



let mapData = this.pubCollabCount;

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.exclude = ["AQ"];
polygonSeries.useGeodata = true;
polygonSeries.nonScalingStroke = true;
polygonSeries.strokeWidth = 0.5;
polygonSeries.calculateVisualCenter = true;

polygonSeries.mapPolygons.template.fill = am4core.color("#7CB9E8");

let imageSeries = chart.series.push(new am4maps.MapImageSeries());
imageSeries.data = mapData;
imageSeries.dataFields.value = "value";

let imageTemplate = imageSeries.mapImages.template;
imageTemplate.nonScaling = false

let circle = imageTemplate.createChild(am4core.Circle);
circle.fill = am4core.color("#FF0000"); // Set the fill color to red
circle.fillOpacity = 0.7;
circle.tooltipText = "{name}: [bold]{value}[/]";

imageSeries.heatRules.push({
"target": circle,
"property": "radius",
"min": 4,
"max": 30,
"dataField": "value"
          })

imageTemplate.adapter.add("latitude", function(latitude, target) {
  let polygon = polygonSeries.getPolygonById((target.dataItem.dataContext as MyDataItem).id);
  if(polygon){
    return polygon.visualLatitude;
   }
   return latitude;
})

imageTemplate.adapter.add("longitude", function(longitude, target) {
  let polygon = polygonSeries.getPolygonById((target.dataItem.dataContext as MyDataItem).id);
  if(polygon){
    return polygon.visualLongitude;
   }
   return longitude;
})

chart.exporting.adapter.add("data", function(data) {
  data.data = [];
  for(var i = 0; i < polygonSeries.data.length; i++) {
    var row = polygonSeries.data[i];
    let mapItem = mapData.find((item: any) => item.id === row.id);
    data.data.push({
      id: row.id,
      stateName: row.name,
      value: mapItem ? mapItem.value : 0 // Include the value, default to 0 if not found
    });
  }
  return data;
});
chart.exporting.menu=new am4core.ExportMenu();

let annotation = chart.plugins.push(new am4plugins_annotation.Annotation());
let annotation_data = annotation.data;

// Load annotations
annotation.data = annotation_data;

    
  }

 doublecharts(){
  am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let chart = am4core.create("chartddiv", am4charts.XYChart);

// Add data
chart.data = this.db;

// Create category axis
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "year";
categoryAxis.renderer.opposite = false;

categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
  target.rotation = -75; 
  target.horizontalCenter = "middle";
  target.verticalCenter = "bottom";  
  return dy;
});

// Set padding to prevent label overlap
categoryAxis.paddingTop = 20;  
categoryAxis.paddingBottom = 30;

//Set the grid lines to appear in the middle of each category (year)
categoryAxis.renderer.grid.template.location=0.5;
//Ensure the axis covers the full range
categoryAxis.startLocation = 0;
categoryAxis.endLocation = 1;
//Ensure all labels are displayed
categoryAxis.renderer.minGridDistance = 20;

// Create value axis
let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.inversed = false;
valueAxis.title.text = "Place taken";
valueAxis.renderer.minLabelPosition = 0.01;

// Create series
// Series 1: WOS
let series1 = chart.series.push(new am4charts.LineSeries());
series1.dataFields.valueY = "wos";
series1.dataFields.categoryX = "year";
series1.name = "WOS";
let bullet1 = series1.bullets.push(new am4charts.CircleBullet());
bullet1.fill = am4core.color("#007bff");
series1.tooltipText = "{name} in {categoryX}: {valueY}";
series1.legendSettings.valueText = "{valueY}";
series1.stroke = am4core.color("#007bff");

let hs1 = series1.segments.template.states.create("hover");
hs1.properties.strokeWidth = 5;
hs1.properties.stroke = series1.stroke; // maintain color
hs1.filters.clear(); // remove lightening
series1.segments.template.strokeWidth = 1;
series1.tooltip.getFillFromObject = false;
series1.tooltip.background.fill = series1.stroke;
series1.tooltip.background.stroke = series1.stroke;

// Series 2: GS
let series2 = chart.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "gs";
series2.dataFields.categoryX = "year";
series2.name = 'GS';
let bullet2 = series2.bullets.push(new am4charts.CircleBullet());
bullet2.fill = am4core.color("#28a745");
series2.tooltipText = "{name} in {categoryX}: {valueY}";
series2.legendSettings.valueText = "{valueY}";
series2.stroke = am4core.color("#28a745");

let hs2 = series2.segments.template.states.create("hover");
hs2.properties.strokeWidth = 5;
hs2.properties.stroke = series2.stroke;
hs2.filters.clear();
series2.segments.template.strokeWidth = 1;
series2.tooltip.getFillFromObject = false;
series2.tooltip.background.fill = series2.stroke;
series2.tooltip.background.stroke = series2.stroke;

// Series 3: IEEE
let series3 = chart.series.push(new am4charts.LineSeries());
series3.dataFields.valueY = "ieee";
series3.dataFields.categoryX = "year";
series3.name = 'IEEE';
let bullet3 = series3.bullets.push(new am4charts.CircleBullet());
bullet3.fill = am4core.color("#dc3545");
series3.tooltipText = "{name} in {categoryX}: {valueY}";
series3.legendSettings.valueText = "{valueY}";
series3.stroke = am4core.color("#dc3545");

let hs3 = series3.segments.template.states.create("hover");
hs3.properties.strokeWidth = 5;
hs3.properties.stroke = series3.stroke;
hs3.filters.clear();
series3.segments.template.strokeWidth = 1;
series3.tooltip.getFillFromObject = false;
series3.tooltip.background.fill = series3.stroke;
series3.tooltip.background.stroke = series3.stroke;

// Series 4: PUBMED
let series4 = chart.series.push(new am4charts.LineSeries());
series4.dataFields.valueY = "pub";
series4.dataFields.categoryX = "year";
series4.name = 'PUBMED';
let bullet4 = series4.bullets.push(new am4charts.CircleBullet());
bullet4.fill = am4core.color("#ffc107");
series4.tooltipText = "{name} in {categoryX}: {valueY}";
series4.legendSettings.valueText = "{valueY}";
series4.stroke = am4core.color("#ffc107");

let hs4 = series4.segments.template.states.create("hover");
hs4.properties.strokeWidth = 5;
hs4.properties.stroke = series4.stroke;
hs4.filters.clear();
series4.segments.template.strokeWidth = 1;
series4.tooltip.getFillFromObject = false;
series4.tooltip.background.fill = series4.stroke;
series4.tooltip.background.stroke = series4.stroke;

// Series 5: SCOPUS
let series5 = chart.series.push(new am4charts.LineSeries());
series5.dataFields.valueY = "scopus";
series5.dataFields.categoryX = "year";
series5.name = 'SCOPUS';
let bullet5 = series5.bullets.push(new am4charts.CircleBullet());
bullet5.fill = am4core.color("#0077cc");
series5.tooltipText = "{name} in {categoryX}: {valueY}";
series5.legendSettings.valueText = "{valueY}";
series5.stroke = am4core.color("#0077cc");

let hs5 = series5.segments.template.states.create("hover");
hs5.properties.strokeWidth = 5;
hs5.properties.stroke = series5.stroke;
hs5.filters.clear();
series5.segments.template.strokeWidth = 1;
series5.tooltip.getFillFromObject = false;
series5.tooltip.background.fill = series5.stroke;
series5.tooltip.background.stroke = series5.stroke;

// Chart cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "zoomY";

// Add legend
chart.legend = new am4charts.Legend();
chart.legend.itemContainers.template.events.on("over", function(event){
  // let segments = event.target.dataItem.dataContext.segments;
  // segments.each(function(segment){
  //   segment.isHover = true;
  // })
})

chart.legend.itemContainers.template.events.on("out", function(event){
  // let segments = event.target.dataItem.dataContext.segments;
  // segments.each(function(segment){
  //   segment.isHover = false;
  // })
})
chart.exporting.menu = new am4core.ExportMenu();

let annotation = chart.plugins.push(new am4plugins_annotation.Annotation());
let annotation_data = annotation.data;

// Load annotations
annotation.data = annotation_data;



chart.cursor = new am4charts.XYCursor();

chart.scrollbarX = new am4core.Scrollbar();

}
// barchart(){
  
//   let root = am5.Root.new("");


// // Set themes
// // https://www.amcharts.com/docs/v5/concepts/themes/
// root.setThemes([
//   am5themes_Animated.new(root)
// ]);
// // var exporting = am5plugins_exporting.Exporting.new(root, {
// //   menu: am5plugins_exporting.ExportingMenu.new(root, {})
// // });
// let exporting = am5plugins_exporting.Exporting.new(root, {
//   menu: am5plugins_exporting.ExportingMenu.new(root, {}),
//   dataSource:this.journal.slice(0,10)
// });


// let annotator = am5plugins_exporting.Annotator.new(root, {

// });
// // annotator.open();

// var menuitems = exporting.get("menu").get("items");

// menuitems.push({
// type: "separator"
// });

// menuitems.push({
// type: "custom",
// label: "Annotate",
// callback: function() {
// this.close();
// annotator.toggle();
// }
// });

// // Create chart
// // https://www.amcharts.com/docs/v5/charts/xy-chart/
// let chart = root.container.children.push(am5xy.XYChart.new(root, {
//   panX: false,
//   panY: false,
//   wheelX: "none",
//   wheelY: "none",
//   paddingLeft: 0
// }));

// // We don't want zoom-out button to appear while animating, so we hide it
// chart.zoomOutButton.set("forceHidden", true);


// // Create axes
// // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// let yRenderer = am5xy.AxisRendererY.new(root, {
//   minGridDistance: 40,
//   minorGridEnabled: true
// });
// // let yRenderer = am5xy.AxisRendererY.new(root, {
// //   // Customize renderer properties here
// //   // Example:
// //   minGridDistance: 30
// // });

// // Create the Y-axis
// // let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
// //   // Configure the axis properties here
// //   // Example:
// //   maxDeviation: 0.3,
// //   renderer: yRenderer, // Assign the custom renderer to the Y-axis
// //   tooltip: am5.Tooltip.new(root, {})
// // }));
// yRenderer.grid.template.set("location", 1);

// let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
//   maxDeviation: 1,
//   categoryField: "network",
//   renderer: yRenderer,
//   tooltip: am5.Tooltip.new(root, { themeTags: ["axis"] })
// }));

// let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
//   maxDeviation: 0,
//   min: 0,
//   numberFormatter: am5.NumberFormatter.new(root, {
//     "numberFormat": "#,###a"
//   }),
//   extraMax: 0.1,
//   renderer: am5xy.AxisRendererX.new(root, {
//     strokeOpacity: 0.1,
//     minGridDistance: 80

//   })
// }));



// // Add series
// // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// let series = chart.series.push(am5xy.ColumnSeries.new(root, {
//   name: "TOP JOURAL",
//   xAxis: xAxis,
//   yAxis: yAxis,
//   valueXField: "value",
//   categoryYField: "network",
//   tooltip: am5.Tooltip.new(root, {
//     pointerOrientation: "left",
//     labelText: "{valueX}"
//   })
// }));


// // Rounded corners for columns
// series.columns.template.setAll({
//   cornerRadiusTR: 5,
//   cornerRadiusBR: 5,
//   strokeOpacity: 0
// });

// // Make each column to be of a different color
// series.columns.template.adapters.add("fill", function (fill, target) {
//   return chart.get("colors").getIndex(series.columns.indexOf(target));
// });

// series.columns.template.adapters.add("stroke", function (stroke, target) {
//   return chart.get("colors").getIndex(series.columns.indexOf(target));
// });


// // Set data
// let data = this.journal.slice(0,10);

// yAxis.data.setAll(data);
// series.data.setAll(data);
// sortCategoryAxis();

// // Get series item by category
// function getSeriesItem(category) {
//   for (var i = 0; i < series.dataItems.length; i++) {
//     let dataItem = series.dataItems[i];
//     if (dataItem.get("categoryY") == category) {
//       return dataItem;
//     }
//   }
// }

// chart.set("cursor", am5xy.XYCursor.new(root, {
//   behavior: "none",
//   xAxis: xAxis,
//   yAxis: yAxis
// }));


// // Axis sorting
// function sortCategoryAxis() {

//   // Sort by value
//   series.dataItems.sort(function (x, y) {
//     return y.get("valueX") - x.get("valueX"); // descending
//     //return y.get("valueY") - x.get("valueX"); // ascending
//   })

//   // Go through each axis item
//   am5.array.each(yAxis.dataItems, function (dataItem) {
//     // get corresponding series item
//     let seriesDataItem = getSeriesItem(dataItem.get("category"));

//     if (seriesDataItem) {
//       // get index of series data item
//       let index = series.dataItems.indexOf(seriesDataItem);
//       // calculate delta position
//       let deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
//       // set index to be the same as series data item index
//       dataItem.set("index", index);
//       // set deltaPosition instanlty
//       dataItem.set("deltaPosition", -deltaPosition);
//       // animate delta position to 0
//       dataItem.animate({
//         key: "deltaPosition",
//         to: 0,
//         duration: 1000,
//         easing: am5.ease.out(am5.ease.cubic)
//       })
//     }
//   });

//   // Sort axis items by index.
//   // This changes the order instantly, but as deltaPosition is set,
//   // they keep in the same places and then animate to true positions.
//   yAxis.dataItems.sort(function (x, y) {
//     return x.get("index") - y.get("index");
//   });
// }


// // update data with random values each 1.5 sec
// // setInterval(function () {
// //   updateData();
// // }, 1500)

// // function updateData() {
// //   am5.array.each(series.dataItems, function (dataItem) {
// //     let value = dataItem.get("valueX") + Math.round(Math.random() * 10000 - 5000);
// //     if (value < 0) {
// //       value = 5000;
// //     }
// //     // both valueY and workingValueY should be changed, we only animate workingValueY
// //     dataItem.set("valueX", value);
// //     dataItem.animate({
// //       key: "valueXWorking",
// //       to: value,
// //       duration: 600,
// //       easing: am5.ease.out(am5.ease.cubic)
// //     });
// //   })

// //   sortCategoryAxis();
// // }


// // Make stuff animate on load
// // https://www.amcharts.com/docs/v5/concepts/animations/
// series.appear(100);
// chart.appear(1000, 100);
// }


newtopjoural()
{

  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create chart instance
  let chart = am4core.create("chartbardiv", am4charts.XYChart3D);
  
  // Add data
  chart.data = this.journal.slice (0,10);
  
  // Create axes
  let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "network";
 
  categoryAxis.renderer.inversed = false;
  
  let  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
  
  // Create series
  let series = chart.series.push(new am4charts.ColumnSeries3D());
  series.dataFields.valueX = "value";
  series.dataFields.categoryY = "network";
  series.name = "Journal Count";
  series.columns.template.propertyFields.fill = "color";
  series.columns.template.tooltipText = "{valueX}";
  series.columns.template.column3D.stroke = am4core.color("#fff");
  series.columns.template.column3D.strokeOpacity = 0.2;


  chart.legend = new am4charts.Legend();
  chart.exporting.menu = new am4core.ExportMenu();

let annotation = chart.plugins.push(new am4plugins_annotation.Annotation());
let annotation_data = annotation.data;

// Load annotations
annotation.data = annotation_data;
}

columncharts(){
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create chart instance
  let chart = am4core.create("chartdbdiv", am4charts.XYChart);
  
  // Add data
  chart.data = this.newdb;
  
  // Create category axis
  let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "year";
  categoryAxis.renderer.opposite = false;

  categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
    target.rotation = -75; 
    target.horizontalCenter = "middle";
    target.verticalCenter = "bottom";  
    return dy;
  });
  
  // Set padding to prevent label overlap
  categoryAxis.paddingTop = 20;  
  categoryAxis.paddingBottom = 30;
  
  //Set the grid lines to appear in the middle of each category (year)
  categoryAxis.renderer.grid.template.location=0.5;
  //Ensure the axis covers the full range
  categoryAxis.startLocation = 0;
  categoryAxis.endLocation = 1;
  //Ensure all labels are displayed
  categoryAxis.renderer.minGridDistance = 20;

  // Create value axis
  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.inversed = false;
  valueAxis.title.text = "Place taken";
  valueAxis.renderer.minLabelPosition = 0.01;
  
  // Create series
  let series1 = chart.series.push(new am4charts.LineSeries());
  series1.dataFields.valueY = "wos";
  series1.dataFields.categoryX = "year";
  series1.name = "WOS";
  series1.bullets.push(new am4charts.CircleBullet());
  series1.tooltipText = " {name} in {categoryX}: {valueY}";
  series1.legendSettings.valueText = "{valueY}";
  series1.visible  = false;
  
 
  
  let series2 = chart.series.push(new am4charts.LineSeries());
  series2.dataFields.valueY = "scopus";
  series2.dataFields.categoryX = "year";
  series2.name = 'SCOPUS';
  series2.bullets.push(new am4charts.CircleBullet());
  series2.tooltipText = " {name} in {categoryX}: {valueY}";
  series2.legendSettings.valueText = "{valueY}";
  
  // Add chart cursor
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.behavior = "zoomY";
  
  
  let hs1 = series1.segments.template.states.create("hover")
  hs1.properties.strokeWidth = 5;
  series1.segments.template.strokeWidth = 1;
  
  let hs2 = series2.segments.template.states.create("hover")
  hs2.properties.strokeWidth = 5;
  series2.segments.template.strokeWidth = 1;
  
  
  
  // Add legend
  chart.legend = new am4charts.Legend();
  chart.legend.itemContainers.template.events.on("over", function(event){
    // let segments = event.target.dataItem.dataContext.segments;
    // segments.each(function(segment){
    //   segment.isHover = true;
    // })
  })
  
  chart.legend.itemContainers.template.events.on("out", function(event){
    // let segments = event.target.dataItem.dataContext.segments;
    // segments.each(function(segment){
    //   segment.isHover = false;
    // })
  })
  chart.exporting.menu = new am4core.ExportMenu();

let annotation = chart.plugins.push(new am4plugins_annotation.Annotation());
let annotation_data = annotation.data;

// Load annotations
annotation.data = annotation_data;



chart.cursor = new am4charts.XYCursor();

chart.scrollbarX = new am4core.Scrollbar();
//   let data=this.newdb;

//   let root = am5.Root.new("chartdbdiv");

// // Set themes
// // https://www.amcharts.com/docs/v5/concepts/themes/
// root.setThemes([
//   am5themes_Animated.new(root)
// ]);
// // var exporting = am5plugins_exporting.Exporting.new(root, {
// //   menu: am5plugins_exporting.ExportingMenu.new(root, {})
// // });
// let exporting = am5plugins_exporting.Exporting.new(root, {
//   menu: am5plugins_exporting.ExportingMenu.new(root, {}),
//   dataSource:this.newdb
// });


// let annotator = am5plugins_exporting.Annotator.new(root, {

// });
// // annotator.open();

// var menuitems = exporting.get("menu").get("items");

// menuitems.push({
// type: "separator"
// });

// menuitems.push({
// type: "custom",
// label: "Annotate",
// callback: function() {
// this.close();
// annotator.toggle();
// }
// });

// // Create chart
// // https://www.amcharts.com/docs/v5/charts/xy-chart/
// let chart = root.container.children.push(
//   am5xy.XYChart.new(root, {
//     panX: true,
//     panY: true,
//     wheelX: "panX",
//     wheelY: "zoomX",
//     layout: root.verticalLayout,
//     pinchZoomX: true
//   })
// );

// // Add cursor
// // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
// let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
//   behavior: "none"
// }));
// cursor.lineY.set("visible", false);

// // The data


// // Create axes
// // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// let xRenderer = am5xy.AxisRendererX.new(root, {
//   minorGridEnabled: true
// });
// xRenderer.grid.template.set("location", 0.5);
// xRenderer.labels.template.setAll({
//   location: 0.5,
//   multiLocation: 0.5
// });

// let xAxis = chart.xAxes.push(
//   am5xy.CategoryAxis.new(root, {
//     categoryField: "year",
//     renderer: xRenderer,
//     tooltip: am5.Tooltip.new(root, {})
//   })
// );

// xAxis.data.setAll(data);

// let yAxis = chart.yAxes.push(
//   am5xy.ValueAxis.new(root, {
//     maxPrecision: 0,
//     renderer: am5xy.AxisRendererY.new(root, {
//       inversed: false
//     })
//   })
// );

// // Add series
// // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

// function createSeries(name, field) {
//   let series = chart.series.push(
//     am5xy.LineSeries.new(root, {
//       name: name,
//       xAxis: xAxis,
//       yAxis: yAxis,
//       valueYField: field,
//       categoryXField: "year",
//       tooltip: am5.Tooltip.new(root, {
//         pointerOrientation: "horizontal",
//         labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
//       })
//     })
//   );


//   series.bullets.push(function () {
//     return am5.Bullet.new(root, {
//       sprite: am5.Circle.new(root, {
//         radius: 5,
//         fill: series.get("fill")
//       })
//     });
//   });

//   // create hover state for series and for mainContainer, so that when series is hovered,
//   // the state would be passed down to the strokes which are in mainContainer.
//   series.set("setStateOnChildren", true);
//   series.states.create("hover", {});

//   series.mainContainer.set("setStateOnChildren", true);
//   series.mainContainer.states.create("hover", {});

//   series.strokes.template.states.create("hover", {
//     strokeWidth: 4
//   });

//   series.data.setAll(data);
//   series.appear(1000);
// }


// createSeries("WOS", "wos");

// createSeries("SCOPUS", "scopus");


// // Add scrollbar
// // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
// chart.set("scrollbarX", am5.Scrollbar.new(root, {
//   orientation: "horizontal",
//   marginBottom: 20
// }));

// let legend = chart.children.push(
//   am5.Legend.new(root, {
//     centerX: am5.p50,
//     x: am5.p50
//   })
// );

// // Make series change state when legend item is hovered
// legend.itemContainers.template.states.create("hover", {});

// legend.itemContainers.template.events.on("pointerover", function (e) {
//   e.target.dataItem.dataContext;
// });
// legend.itemContainers.template.events.on("pointerout", function (e) {
//   e.target.dataItem.dataContext;
// });

// legend.data.setAll(chart.series.values);

// // Make stuff animate on load
// // https://www.amcharts.com/docs/v5/concepts/animations/
// chart.appear(1000, 100);
}

curstedchart(){
  let root = am5.Root.new("chartlegdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
let chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  paddingLeft:0,
  layout: root.verticalLayout
}));
// var exporting = am5plugins_exporting.Exporting.new(root, {
//   menu: am5plugins_exporting.ExportingMenu.new(root, {})
// });
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource:this.res
});


let annotator = am5plugins_exporting.Annotator.new(root, {

});
// annotator.open();

var menuitems = exporting.get("menu").get("items");

menuitems.push({
type: "separator"
});

menuitems.push({
type: "custom",
label: "Annotate",
callback: function() {
this.close();
annotator.toggle();
}
});

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
let ls = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50
}))


// Data
let data=this.res;

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "year",
  renderer: am5xy.AxisRendererY.new(root, {
    inversed: false,
    cellStartLocation: 0.1,
    cellEndLocation: 0.9,
    minorGridEnabled: true
  })
}));
console.log("Y Axis Data:", data);

yAxis.data.setAll(data);

let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, {
    strokeOpacity: 0.1,
    minGridDistance: 50
  }),
  min: 0
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function createSeries(field, name) {
  let series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: field,
    categoryYField: "year",
    sequencedInterpolation: true,
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "vertical",
      labelText: "[bold]{name}[/]\n{categoryY}: {valueX}"
    })
  }));

  console.log("Series Name:", name);
  console.log("Series Data:", data);

  series.columns.template.setAll({
    height: am5.p100,
    strokeOpacity: 0
  });


  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 1,
      locationY: 0.5,
      sprite: am5.Label.new(root, {
        centerY: am5.p50,
        text: "{valueX}",
        populateText: true
      })
    });
  });

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 1,
      locationY: 0.5,
      sprite: am5.Label.new(root, {
        centerX: am5.p100,
        centerY: am5.p50,
        text: "{name}",
        fill: am5.color(0xFF0000),
        populateText: true
      })
    });
  });

  series.data.setAll(data);
  series.appear();

  return series;
}

createSeries("income", "Indexed");
createSeries("expenses", "Non-Indexed");



// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
let legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50
}));

legend.data.setAll(chart.series.values);


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomY"
}));
cursor.lineY.set("forceHidden", true);
cursor.lineX.set("forceHidden", true);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);

}

linechart(){
  am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let chart = am4core.create("chartlinediv", am4charts.XYChart3D);

// Add data
chart.data = this.res;

// Create axes
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;
categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
  target.rotation = -75; 
  target.horizontalCenter = "middle";
  target.verticalCenter = "bottom";  
  return dy;
});

// Set padding to prevent label overlap
categoryAxis.paddingTop = 20;  
categoryAxis.paddingBottom = 30;

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Index vs NonIndex";
valueAxis.renderer.labels.template.adapter.add("text", function(text) {
  return text ;
});

// Create series
let series = chart.series.push(new am4charts.ColumnSeries3D());
series.dataFields.valueY = "year2017";
series.dataFields.categoryX = "country";
series.name = "Non Index";
series.clustered = false;

series.columns.template.tooltipText = "Non Index {category} : [bold]{valueY}[/]";
series.columns.template.fillOpacity = 0.9;

let series2 = chart.series.push(new am4charts.ColumnSeries3D());
series2.dataFields.valueY = "year2018";
series2.dataFields.categoryX = "country";
series2.name = "Index";
series2.clustered = false;
series.columns.template.fill = am4core.color("#FFD700");
series2.columns.template.tooltipText = "Index {category} : [bold]{valueY}[/]";

function createSeries(field ) {
  let series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = field;
  series.dataFields.categoryX = "year";

  


 

}

chart.exporting.menu = new am4core.ExportMenu();

let annotation = chart.plugins.push(new am4plugins_annotation.Annotation());
let annotation_data = annotation.data;

// Load annotations
annotation.data = annotation_data;



chart.cursor = new am4charts.XYCursor();

chart.scrollbarX = new am4core.Scrollbar();

// createSeries("Index");
// createSeries("Non Index");


// Add legend
chart.legend = new am4charts.Legend();

   
}



 indiamap(){

  let data = this.india;
  const chart = am4core.create('chartinddiv', am4maps.MapChart);
  chart.geodata = am5geodata_indiaLow;
  chart.projection = new am4maps.projections.Miller();

  // Create map polygon series for India
  const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.useGeodata = true;
  polygonSeries.exclude = ['AQ']; // Exclude Antarctica
   
  // Configure series
  const polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = '{name}';
  polygonTemplate.fill = am4core.color('#7CB9E8');
   
  // Add markers for each data point
  data.forEach(item => {
    const marker = chart.series.push(new am4maps.MapImageSeries());
    const imageSeriesTemplate = marker.mapImages.template;
    const markerTemplate = imageSeriesTemplate.createChild(am4core.Circle);
    // Dynamically set the radius based on pubCount
    const radius = Math.min(item.pubCount * 0.5, 15); // Adjust multiplier as needed
    markerTemplate.radius = radius;
    markerTemplate.fill = am4core.color('#FF0000');
    markerTemplate.tooltipText = '{stateName}: {pubCount} publications';
    markerTemplate.nonScaling = false;
    imageSeriesTemplate.propertyFields.latitude = 'latitude';
    imageSeriesTemplate.propertyFields.longitude = 'longitude';
    marker.data = [item];
   });
    chart.exporting.adapter.add("data", function(data) {
      data.data = [];
      for(var i = 0; i < polygonSeries.data.length; i++) {
        var row = polygonSeries.data[i];
        data.data.push({
          id: row.id,
          stateName: row.name
        });
      }
      return data;
    });
    chart.exporting.menu=new am4core.ExportMenu();

    let annotation = chart.plugins.push(new am4plugins_annotation.Annotation());
    let annotation_data = annotation.data;
    
    // Load annotations
    annotation.data = annotation_data;

  // Add zoom control
  chart.zoomControl = new am4maps.ZoomControl();
   
  // Set map to fill container
  chart.width = am4core.percent(100);
  chart.height = am4core.percent(100);
  
  chart.appear();
  
 }

    setDefaultYears() {
      // Assign default values to tempfromYear and temptoYear
      this.tempfromYear = 2010;
      this.temptoYear = 2023;
    }

filter1() { 

  if (this.tempfromYear !== undefined || this.temptoYear !== undefined) {
    console.log(this.tempfromYear);
    console.log(this.temptoYear);  
    
    let fromDate=this.tempfromYear;
    let toDate=this.temptoYear;

    // Call functions with concatenated years
    this.publicationchart(fromDate, toDate,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
    this.chartIndextrend(fromDate, toDate,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
    this.Dataanalysis(fromDate, toDate,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
    this.jouralcharts(fromDate, toDate,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
    this.countrycollb(fromDate, toDate,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
    this.dbyear(fromDate, toDate,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
    this.stateindia(fromDate, toDate,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId,this.deptGrpId);
  }
                       
       }

       selectFromDt(){
        this.tempfromYear = new Date(this.tempfromYear).getFullYear();
       }

       selectToDt(){
        this.temptoYear= new Date(this.temptoYear).getFullYear();
        console.log(this.temptoYear);
        
       }

      filters(val){
        console.log(this.Campusfiter);
        console.log(this.Schoolfilter);
        console.log(this.Institutefilter);
        console.log(this.departmentfilter);

        if(val=="loc"){
          
        if(this.Campusfiter==""){
          this.locationFilterId=null;
         }
        else{
          const filterLoc=this.layerInsSchCamDep.filter(item => item.locationName==this.Campusfiter);
          this.locationFilterId=filterLoc[0].locationId;
        }
        this.schoolFilterId=null;
        this.instituteFilterId=null;
        this.deptFilterId=null;
        this.Schoolfilter="";
        this.Institutefilter="";
        this.departmentfilter="";
        this.deptGrpId=null;

        this.service.getUnivLocSchInstDept(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
          console.log(x);
          if(this.layerType=="3LType1"){
          this.layerInst=x;
          this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
          }
          else if(this.layerType=="3LType2"){
              this.layerDept=x;
          }
          else if(this.layerType=="4LType2"||this.layerType=="3LType3"||this.layerType=="4LType1"){
          this.layerSchool=x;
          this.layerSchool=Array.from(new Set(this.layerSchool.map((item : any)=>item.schoolName)))
        }
        });

        }

        if(val=="scl"){

          if(this.Schoolfilter==""){
            this.schoolFilterId=null;
          }
          else{
            if(this.layerType=="4LType2"||this.layerType=="3LType3"){   
              const schoolfilter=this.layerInsSchCamDep.filter(item=> item.schoolName==this.Schoolfilter);
              this.schoolFilterId=schoolfilter[0].schoolId;
            }
            else{
              const schoolfilter=this.layerInsSchCamDep.filter(item=> item.schoolName==this.Schoolfilter&&item.locationName==this.Campusfiter);
              this.schoolFilterId=schoolfilter[0].schoolId;
            }
          }
          this.instituteFilterId=null;
          this.deptFilterId=null;
          this.deptGrpId=null;
          this.Institutefilter="";
          this.departmentfilter="";

         this.service.getUnivLocSchInstDept(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
          console.log(x);
          this.layerInst=x;
          this.layerInst=Array.from(new Set(this.layerInst.map((item : any)=>item.instituteName)))
        });          
    }   

        if(val=="inst"){

              if(this.Institutefilter==""){
                this.instituteFilterId=null;
              }
            else{       
              if(this.layerType=="3LType1"){
                const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName==this.Institutefilter&&item.locationName==this.Campusfiter)
                this.instituteFilterId=instfilter[0].instituteId;
              }
              else if(this.layerType=="4LType2"||this.layerType=="3LType3"||this.layerType=="4LType1"){
                const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName==this.Institutefilter&&item.schoolName==this.Schoolfilter)
                this.instituteFilterId=instfilter[0].instituteId;
              }
              else{
              const instfilter=this.layerInsSchCamDep.filter(item=>item.instituteName==this.Institutefilter)
              this.instituteFilterId=instfilter[0].instituteId;
              }  
            }
            
            this.deptFilterId=null;
            this.departmentfilter="";
            this.deptGrpId=null;

            this.service.getUnivLocSchInstDept(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
              console.log(x);
              this.layerDept=x;
            });

        }

        if(val=="dept"){
              if(this.departmentfilter==""){
                this.deptFilterId=null;
              }
            else{
              const deptfilter=this.layerInsSchCamDep.filter(item=>item.departmentName==this.departmentfilter)
              this.deptFilterId=deptfilter[0].departmentId;
              if(this.deptFilterId==0){
                 this.deptGrpId=deptfilter[0].departmentGroupId;
              }
            }
            this.service.getUnivLocSchInstDept(this.userDetail.UniversityId,this.roleId,this.userDetail.UserId,this.locationFilterId,this.schoolFilterId,this.instituteFilterId,this.deptFilterId).subscribe(x=>{
              console.log(x);
            });
          }
          if(this.layerType=='3LType1'||this.layerType=='3LType2'||this.layerType=='4LType1'){ 
            if(this.locationFilterId==null){
              this.schoolFilterId=null;
              this.Schoolfilter="";
              this.instituteFilterId=null;
              this.Institutefilter="";
              this.deptFilterId=null;
              this.departmentfilter="";
            }
          }

          if(this.layerType=='4LType2'||this.layerType=='3LType3'){
              if(this.schoolFilterId==null){
                this.instituteFilterId=null;
                this.Institutefilter="";
                this.deptFilterId=null;
                this.departmentfilter="";
              }
          }

          if(this.layerType=='2LType1'){
            if(this.instituteFilterId==null){
              this.deptFilterId=null;
              this.departmentfilter="";
            }
          }
      }

  }
                              