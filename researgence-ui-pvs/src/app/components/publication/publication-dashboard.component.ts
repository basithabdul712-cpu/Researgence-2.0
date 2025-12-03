import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Directive, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { number } from '@amcharts/amcharts4/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { MenuService } from '../../shared/services/menu.service';
import { FacultiesService } from '../faculties/faculties.service';
import { AuthService } from '../../shared/services/firebase/auth.service';
import { DatePipe } from '@angular/common';

interface PointData {
  long: number;
  lat: number;
  name: string;
  value:number;
}
interface MyDataItem {
  long: number;
  lat: number;
  id:string;
  name: string;
  value:number;
}

@Component({
  selector: 'app-publication-dashboard',
  templateUrl: './publication-dashboard.component.html',
  styleUrls: ["../../../assets/given/newcss/style.css",'../../../../src/assets/given/newcss/bootstrap.min.css','./publication-dashboard.component.scss']})
export class PublicationDashboardComponent implements OnInit {

  isMenuOpen:boolean;
  userDetail:any;
  roleName:string;
  role:any;
  roleId:Number;
  Name:string;
  levelId:Number=1;
  locationid:Number;
  schoolid:Number;
  instituteid:Number;
  deptid:Number;
  profCount:any=[];
  layerType:string;
  totalCount:any;
  universityName:string;
  pubDbCount:any;
  filteredItems: { layerTypeName: string;layerTypeDesc:string; layerLevel: string; universityId: string; publicationDBName: string; publicationDBShortName: string; dbLevelCount: number; totCount:number;locationId:number;instituteId:number;departmentId:number;}[] = [];
  pubCollabCount:any;
  filteredValues:{departmentId:string;departmentName:string;departmentShortName:string;instituteId:string;instituteName:string;instituteShortName:string;layerLevel:string;layerTypeDesc:string;layerTypeName:string;locationId:string;locationName:string;locationShortName:string;pubCount:number;totCount:number;universityId:string;universityName:string}[]=[];
  total:number=0;
  totalCountstop:any;
  @ViewChild('stickyheader') blueheader!: ElementRef<HTMLElement>;

  @Input() digits: any | 'auto' = 'auto';
  @Input() endCounterValue: number = 0;
  numbers: number[] = [];
  univId:any;

    constructor(private menuService: MenuService, private service: FacultiesService,private renderer: Renderer2,
    private http: HttpClient,private datePipe: DatePipe,private elementRef: ElementRef,
      private router:Router,private authService:AuthService) { 
         
        }

        ngOnInit() {
          console.log("New");
          
          this.menuService.isMenuOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
          });
          this.userDetail=this.authService.getUserDetail();
          this.roleId=this.authService.getProfileObs();
          this.universityName= this.userDetail.University;
          this.univId=parseInt(localStorage.getItem('initialUniv'));    
          // this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        //   this.authService.RoleSelection(this.univId,this.userDetail.UserId).subscribe(x=>{
        //   this.role=x;
        //   console.log(this.role);     
        //   const data=this.role.filter(item=> item.roleId==this.roleId);
        //   this.roleName=data[0].roleName;
        // })

         this.service.getProfileDashboardCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe(x=>{
          console.log(x);
          this.profCount=x;
          this.filteredValues=this.profCount.map(val => {
            for(let i in val){
                if(val[i]=='Not Available'){
                    val[i]='Uncategorized';
                }
            }
            return val;
        })
          this.totalCount=this.profCount[0].totCount;
          this.endCounterValue=parseInt(this.totalCount);
          console.log(this.endCounterValue);
          if(this.totalCount){
          this.initializeCounter();
          }
           this.layerType=this.profCount[0].layerTypeName;
           console.log(this.layerType);
           this.service.getProfileDbCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe(t=>{
            this.pubDbCount=t;
            this.filteredItems=this.pubDbCount;
            console.log(this.filteredItems);
            console.log(this.pubDbCount);
            

           this.service.getProfileCollabCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe((x:any)=>{
            console.log(x);
            
                this.pubCollabCount=x.map(({ longitude ,latitude , countryName, pubCount, countryCode }) => ({
                  long: parseFloat(longitude),
                  lat: parseFloat(latitude),
                  name: countryName,
                  id:countryCode,
                  value: parseFloat(pubCount),
                }));
                console.log(this.pubCollabCount);
                if(this.pubCollabCount.length>0){
                this.createMap();
              }
             });    
           })          
         })

      }

        viewLevel(val,levelval,layer,name){
              console.log(val);
              console.log(levelval);
              this.router.navigate(['/facultyProfiles/Publications/Dashboard/level/'+val+'/'+levelval+'/'+layer+'/'+name]);             
        }

        createMap() {

          am4core.useTheme(am4themes_animated);
          // Themes end
          // Create map instance
          let chart = am4core.create("chartdiv", am4maps.MapChart);
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
          circle.fillOpacity = 0.7;   
          circle.fill = am4core.color("#FF0000");
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
        }

        private initializeCounter() {
          const digits = this.digits === 'auto' || this.digits < String(this.endCounterValue).length ? String(this.endCounterValue).length : this.digits;
      
          // Set initial values
          let currentValue = 0;
          this.numbers = this.padNumber(currentValue, digits);
      
          // Start the counting process
          this.startCounting(currentValue);
        }
      
        private startCounting(currentValue: number): void {
         
          const endValue = this.endCounterValue;    
          let currentSpeed = 20;
          if (endValue === 0) {
            return;
          }
          
           else if (endValue - currentValue < 5) {
            currentSpeed = 200;
            currentValue += 1;
          } else if (endValue - currentValue < 15) {
            currentSpeed = 50;
            currentValue += 1;
          } else if (endValue - currentValue < 50) {
            currentSpeed = 25;
            currentValue += 3;
          } 
          else if (endValue - currentValue < 100) {
            currentSpeed = 20;
            currentValue += 5;
          } 
          else if (endValue - currentValue < 300) {
            currentSpeed = 20;
            currentValue += 10;
          } 
          else if (endValue - currentValue < 1000) {
            currentSpeed = 15;
            currentValue += 50;
          }
          else if (endValue - currentValue < 10000) {
            currentSpeed = 10;
            currentValue += 100;
          }
          else {
            currentSpeed = 5;
            currentValue += 1000;           
          }
    
          // Update current value
          this.numbers = this.padNumber(currentValue, this.digits);
      
          // Recursive call until the end value is reached
          if (endValue !== currentValue) {
            setTimeout(() => {
              this.startCounting(currentValue);
            }, currentSpeed);
          }
        }
      
        private padNumber(num: number, width: number, z: string = '0'): number[] {
          let numStr = num + '';
          numStr = numStr.padStart(width, z);
          return numStr.split('').map(Number);
        }

        toMine(){
          this.router.navigate(['/scorebook/Publications/Mine']);
        }
 
        toReport(){
          this.router.navigate(['/scorebook/Publications/InsightReports']);
        }

             // For stickey blue bar changes
             @HostListener('window:scroll')
             onWindowScroll() {
                     const scrollY = window.scrollY;
                 
                     if (this.blueheader) {
                       const element = this.blueheader.nativeElement;            
                       if (scrollY >= 1) {
                         element.classList.remove('block-btn-blue-container');
                         element.classList.add('block-btn-blue-container-sticky');
                       
                       } else {
                         element.classList.remove('block-btn-blue-container-sticky');
                         element.classList.add('block-btn-blue-container');
                      
                       }
                   }
               }

 }
