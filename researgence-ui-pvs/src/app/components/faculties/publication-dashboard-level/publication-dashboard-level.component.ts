import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProfile } from 'src/app/shared/model/data.models';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { environment } from 'src/environments/environment';
import { FacultiesService } from '../faculties.service';
import * as am5 from "@amcharts/amcharts5";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

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
  selector: 'app-publication-dashboard-level',
  templateUrl: './publication-dashboard-level.component.html',
  styleUrls: ["../../../../assets/given/newcss/style.css",'../../../../../src/assets/given/newcss/bootstrap.min.css','./publication-dashboard-level.component.scss']})
export class PublicationDashboardLevelComponent implements OnInit {

  isMenuOpen:boolean;
  homeTab:boolean;
  profileTab:boolean;
  userDetail:any;
  roleName:string;
  role:any;
  roleId:Number;
  Name:string;
  levelId:string;
  locationid:Number;
  schoolid:Number;
  instituteid:Number;
  deptid:Number;
  profCount:any;
  layerType:string;
  totalCount:any;
  universityName:string;
  id:Number;
  pubDbCount:any;
  profCountLevel:any;
  pubDbCountLevel:any;

  profCountLevel4:any;
  pubDbCountLevel4:any;

  profCountLevel5:any;
  pubDbCountLevel5:any;

  totalCount5:any;
  totalCount4:any;
  totalCount3:any;

  pubCollabCount:any;
  pubCollabCount3:any;
  pubCollabCount4:any;
  pubCollabCount5:any;

  // level 2
  filteredValues:{departmentId:string;departmentName:string;departmentShortName:string;instituteId:string;instituteName:string;instituteShortName:string;layerLevel:string;layerTypeDesc:string;layerTypeName:string;locationId:string;locationName:string;locationShortName:string;pubCount:number;totCount:number;universityId:string;universityName:string}[]=[];
  filteredItems: { layerTypeName: string;layerTypeDesc:string; layerLevel: string; universityId: string; publicationDBName: string; publicationDBShortName: string; dbLevelCount: number; totCount:number;locationId:number;instituteId:number;departmentId:number;}[] = [];
  @Input() digits: any | 'auto' = 'auto';
  @Input() endCounterValue: number = 0;
  numbers: number[] = [];

  // level 3
  filteredValues3:{departmentId:string;departmentName:string;departmentShortName:string;instituteId:string;instituteName:string;instituteShortName:string;layerLevel:string;layerTypeDesc:string;layerTypeName:string;locationId:string;locationName:string;locationShortName:string;pubCount:number;totCount:number;universityId:string;universityName:string}[]=[];
  filteredItems3: { layerTypeName: string;layerTypeDesc:string; layerLevel: string; universityId: string; publicationDBName: string; publicationDBShortName: string; dbLevelCount: number; totCount:number;locationId:number;instituteId:number;departmentId:number;}[] = [];
  @Input() digits3: any | 'auto' = 'auto';
  @Input() endCounterValue3: number = 0;
  numbers3: number[] = [];

  // level4
  filteredValues4:{departmentId:string;departmentName:string;departmentShortName:string;instituteId:string;instituteName:string;instituteShortName:string;layerLevel:string;layerTypeDesc:string;layerTypeName:string;locationId:string;locationName:string;locationShortName:string;pubCount:number;totCount:number;universityId:string;universityName:string}[]=[];
  filteredItems4: { layerTypeName: string;layerTypeDesc:string; layerLevel: string; universityId: string; publicationDBName: string; publicationDBShortName: string; dbLevelCount: number; totCount:number;locationId:number;instituteId:number;departmentId:number;}[] = [];
  @Input() digits4: any | 'auto' = 'auto';
  @Input() endCounterValue4: number = 0;
  numbers4: number[] = [];

  //level5
  filteredValues5:{departmentId:string;departmentName:string;departmentShortName:string;instituteId:string;instituteName:string;instituteShortName:string;layerLevel:string;layerTypeDesc:string;layerTypeName:string;locationId:string;locationName:string;locationShortName:string;pubCount:number;totCount:number;universityId:string;universityName:string}[]=[];
  filteredItems5: { layerTypeName: string;layerTypeDesc:string; layerLevel: string; universityId: string; publicationDBName: string; publicationDBShortName: string; dbLevelCount: number; totCount:number;locationId:number;instituteId:number;departmentId:number;}[] = [];
  @Input() digits5: any | 'auto' = 'auto';
  @Input() endCounterValue5: number = 0;
  numbers5: number[] = [];

  locationname:string;
  institutename:string;
  departmentname:string;
  schoolname:string;
  @ViewChild('stickyheader') blueheader!: ElementRef<HTMLElement>;
  univId:any;

    constructor(private menuService: MenuService, private service: FacultiesService,private http: HttpClient,
      private datePipe: DatePipe,private route: ActivatedRoute,private router:Router,private authService:AuthService) {     
        }

        ngOnInit() {
          this.menuService.isMenuOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
           });
          this.userDetail=this.authService.getUserDetail();
          this.univId=parseInt(localStorage.getItem('initialUniv'));  
          this.roleId=this.authService.getProfileObs();
          this.universityName= this.userDetail.University;
          // this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          // this.authService.RoleSelection(this.univId,this.userDetail.UserId).subscribe(x=>{
          // this.role=x;
          // console.log(this.role);
          
          // const data=this.role.filter(item=> item.roleId==this.roleId);
          // this.roleName=data[0].roleName;
          // })
          this.homeTab=true;
          this.profileTab=false;

          this.route.params.subscribe(params => {
            console.log(params);
            this.id=params.id;
            this.levelId=params.levelid;
            this.layerType=params.layer;
            if(this.layerType=="3LType1"||this.layerType=="4LType1"||this.layerType=="3LType2"){
               this.locationid=this.id;
               this.locationname=params.name;
            }
            else if(this.layerType=="4LType2"){
              this.schoolid=this.id;
              this.schoolname=params.name
            }
            else if(this.layerType=="2LType1"){
                this.instituteid=this.id;
                this.institutename=params.name;
            }
            else if(this.layerType=="2LType2"){
              this.deptid=this.id;
              this.departmentname=params.name;
            }

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
        });
                if(this.profCount.length>0){
                this.totalCount=this.profCount[0].totCount;
          }
          else{
            this.totalCount=0;
          }
          this.endCounterValue=parseInt(this.totalCount);
          console.log(this.endCounterValue);
          if(this.totalCount){
          this.initializeCounter();
          }

          this.service.getProfileDbCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe(t=>{
            this.pubDbCount=t; 
            this.filteredItems=this.pubDbCount;
            console.log(this.filteredItems);
            
           this.service.getProfileCollabCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe((x:any)=>{
            this.pubCollabCount=x.map(({ longitude ,latitude , countryName, pubCount,countryCode }) => ({
              long: parseFloat(longitude),
              lat: parseFloat(latitude),
              name: countryName,
              id: countryCode,
              value: parseFloat(pubCount),
            }));
            console.log(this.pubCollabCount);
            if(this.pubCollabCount.length>0){
            this.createMap();
                 }        
               });                                   
             })
           })
         })
      }
  
        switchTab(val){
          if(val=="home"){
            this.homeTab=true;
            this.profileTab=false;
          }
          if(val=="away"){
             this.homeTab=false;
             this.profileTab=true;
          }

        }

        viewLevel(val,levelval,name){
              console.log(val);
              console.log(levelval);
              this.levelId=levelval;
              if(this.layerType=="3LType1"&&this.levelId=="3"){
                this.instituteid=val;
                 this.institutename=name;
             }
             else if(this.layerType=="4LType1"&&this.levelId=="3"){
                this.schoolid=val;
                this.schoolname=name;
             }
             else if(this.layerType=="4LType2"&&this.levelId=="3"){
              this.instituteid=val;
              this.institutename=name;
             }
             else if(this.layerType=="3LType2"&&this.levelId=="3"){
                  this.deptid=val;
                  this.departmentname=name;
             }
             else if(this.layerType=="2LType1"&&this.levelId=="3"){
                 this.deptid=val;
                 this.departmentname=name;
             }

          this.service.getProfileDashboardCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe(x=>{
           console.log(x);
           this.profCountLevel=x;
           this.filteredValues3=this.profCountLevel.map(val => {
            for(let i in val){
                if(val[i]=='Not Available'){
                    val[i]='Uncategorized';
                }
            }
            return val;
        });
           if(this.profCountLevel.length>0){
           this.totalCount3=this.profCountLevel[0].totCount;
           }
           else{
            this.totalCount3=0;
          }
          this.endCounterValue3=parseInt(this.totalCount3);
          console.log(this.endCounterValue3);
          if(this.totalCount3){
          this.initializeCounter3();
          }
           this.service.getProfileDbCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe(t=>{
             this.pubDbCountLevel=t;
             this.filteredItems3=this.pubDbCountLevel;
             console.log(this.filteredItems3);

             this.service.getProfileCollabCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe((x:any)=>{
              this.pubCollabCount3=x.map(({ longitude ,latitude , countryName, pubCount, countryCode }) => ({
                long: parseFloat(longitude),
                lat: parseFloat(latitude),
                name: countryName,
                id: countryCode,
                value: parseFloat(pubCount),
              }));
              console.log(this.pubCollabCount3);
              if(this.pubCollabCount3.length>0){
              this.createMap3();
                }        
                });
            })    
            
          })
                          
        }

        viewLevel4(val,levelval,name){
          
          this.levelId=levelval;
          if(this.layerType=='3LType1'&&this.levelId=="4"){
              this.deptid=val;
              this.departmentname=name;
             }
          else if(this.layerType=='4LType2'&&this.levelId=="4"){
            this.deptid=val;
            this.departmentname=name;
          }
          else if(this.layerType=='4LType1'&&this.levelId=="4"){
              this.instituteid=val;
              this.institutename=name;
          }

             this.service.getProfileDashboardCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe(x=>{
              console.log(x);
              this.profCountLevel4=x;
              this.filteredValues4=this.profCountLevel4.map(val => {
                for(let i in val){
                    if(val[i]=='Not Available'){
                        val[i]='Uncategorized';
                    }
                }
                return val;
            });
              if(this.profCountLevel4.length>0){
              this.totalCount4=this.profCountLevel4[0].totCount;
            }
            else{
              this.totalCount4=0;
            }    
            this.endCounterValue4=parseInt(this.totalCount4);
            console.log(this.endCounterValue4);
            if(this.totalCount4){
            this.initializeCounter4();
            }    
              this.service.getProfileDbCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe(t=>{
                this.pubDbCountLevel4=t;
                this.filteredItems4=this.pubDbCountLevel4;
             console.log(this.filteredItems4);

                this.service.getProfileCollabCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe((x:any)=>{
                  this.pubCollabCount4=x.map(({ longitude ,latitude , countryName, pubCount ,countryCode}) => ({
                    long: parseFloat(longitude),
                    lat: parseFloat(latitude),
                    name: countryName,
                    id: countryCode,
                    value: parseFloat(pubCount),
                  }));
                  console.log(this.pubCollabCount4);
                  if(this.pubCollabCount4.length>0){
                  this.createMap4();
                     }        
                    });
                  })    
                })

           }

        viewLevel5(val,levelval,name){
          
          this.levelId=levelval;
          if(this.layerType=='4LType1'&&this.levelId=="5"){
                this.deptid=val;
                this.departmentname=name;
            }

             this.service.getProfileDashboardCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe(x=>{
              console.log(x);
              this.profCountLevel5=x;
              this.filteredValues5=this.profCountLevel5.map(val => {
                for(let i in val){
                    if(val[i]=='Not Available'){
                        val[i]='Uncategorized';
                    }
                }
                return val;
            });
              if(this.profCountLevel5.length>0){
              this.totalCount5=this.profCountLevel5[0].totCount;
               }
              else{
                this.totalCount5=0;
              }
              this.endCounterValue5=parseInt(this.totalCount5);
              console.log(this.endCounterValue5);
              if(this.totalCount5){
              this.initializeCounter5();
              }
        
              this.service.getProfileDbCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe(t=>{
                this.pubDbCountLevel5=t;
                this.filteredItems5=this.pubDbCountLevel5;
             console.log(this.filteredItems5);

                this.service.getProfileCollabCount(this.univId,this.roleId,this.levelId,this.locationid,this.schoolid,this.instituteid,this.deptid).subscribe((x:any)=>{
                  this.pubCollabCount5=x.map(({ longitude ,latitude , countryName, pubCount, countryCode }) => ({
                    long: parseFloat(longitude),
                    lat: parseFloat(latitude),
                    name: countryName,
                    id: countryCode,
                    value: parseFloat(pubCount),
                  }));
                  console.log(this.pubCollabCount5);
                  if(this.pubCollabCount5.length>0){
                  this.createMap5();
                    }        
                   });           
               })    
               
             })

        }

            // level 2
            createMap() {
              
              am4core.useTheme(am4themes_animated);
              // Themes end
              
              // Create map instance
              let chart = am4core.create("chartdivs", am4maps.MapChart);
              
              
              
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

              // const root = am5.Root.new('chartdivs');

              // // Set themes
              // root.setThemes([am5themes_Animated.new(root)]);

              // // Create chart
              // const chart = root.container.children.push(
              //   am5map.MapChart.new(root, {
              //     panX: 'rotateX',
              //     panY: 'none',
              //     projection: am5map.geoNaturalEarth1()
              //   })
              // );

              // // Create polygon series
              // const polygonSeries = chart.series.push(
              //   am5map.MapPolygonSeries.new(root, {
              //     geoJSON: am5geodata_worldLow,
              //     exclude: ['AQ']
              //   })
              // );

              // // Create point series
              // const pointSeries = chart.series.push(
              //   am5map.MapPointSeries.new(root, {
              //     latitudeField: 'lat',
              //     longitudeField: 'long'
              //   })
              // );

              // pointSeries.bullets.push(() => {
              //   const circle = am5.Circle.new(root, {
              //     radius: 8,
              //     fill: am5.color(0xff8c00),
              //     tooltipText: '{name}-{value}'
              //   });

              //   circle.events.on('click', (ev) => {
              //     const dataContext: PointData = ev.target.dataItem.dataContext as PointData;
              //   });

              //   return am5.Bullet.new(root, {
              //     sprite: circle
              //   });
              // });

              // const data: PointData[] = this.pubCollabCount;
              // pointSeries.data.setAll(data);

            }

        createMap3() {

          am4core.useTheme(am4themes_animated);
          // Themes end
          
          // Create map instance
          let chart = am4core.create("chartdiv3", am4maps.MapChart);
          
          
          
          let mapData = this.pubCollabCount3;
          
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
          
          // const root = am5.Root.new('chartdiv3');

          // // Set themes
          // root.setThemes([am5themes_Animated.new(root)]);

          // // Create chart
          // const chart = root.container.children.push(
          //   am5map.MapChart.new(root, {
          //     panX: 'rotateX',
          //     panY: 'none',
          //     projection: am5map.geoNaturalEarth1()
          //   })
          // );

          // // Create polygon series
          // const polygonSeries = chart.series.push(
          //   am5map.MapPolygonSeries.new(root, {
          //     geoJSON: am5geodata_worldLow,
          //     exclude: ['AQ']
          //   })
          // );

          // // Create point series
          // const pointSeries = chart.series.push(
          //   am5map.MapPointSeries.new(root, {
          //     latitudeField: 'lat',
          //     longitudeField: 'long'
          //   })
          // );

          // pointSeries.bullets.push(() => {
          //   const circle = am5.Circle.new(root, {
          //     radius: 8,
          //     fill: am5.color(0xff8c00),
          //     tooltipText: '{name}-{value}'
          //   });

          //   circle.events.on('click', (ev) => {
          //     const dataContext: PointData = ev.target.dataItem.dataContext as PointData;
          //   });

          //   return am5.Bullet.new(root, {
          //     sprite: circle
          //   });
          // });

          // const data: PointData[] = this.pubCollabCount3;
          // pointSeries.data.setAll(data);

        }

    createMap4() {


      am4core.useTheme(am4themes_animated);
      // Themes end
      
      // Create map instance
      let chart = am4core.create("chartdiv4", am4maps.MapChart);
      
      
      
      let mapData = this.pubCollabCount4;
      
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

      // const root = am5.Root.new('chartdiv4');

      // // Set themes
      // root.setThemes([am5themes_Animated.new(root)]);

      // // Create chart
      // const chart = root.container.children.push(
      //   am5map.MapChart.new(root, {
      //     panX: 'rotateX',
      //     panY: 'none',
      //     projection: am5map.geoNaturalEarth1()
      //   })
      // );

      // // Create polygon series
      // const polygonSeries = chart.series.push(
      //   am5map.MapPolygonSeries.new(root, {
      //     geoJSON: am5geodata_worldLow,
      //     exclude: ['AQ']
      //   })
      // );

      // // Create point series
      // const pointSeries = chart.series.push(
      //   am5map.MapPointSeries.new(root, {
      //     latitudeField: 'lat',
      //     longitudeField: 'long'
      //   })
      // );

      // pointSeries.bullets.push(() => {
      //   const circle = am5.Circle.new(root, {
      //     radius: 8,
      //     fill: am5.color(0xff8c00),
      //     tooltipText: '{name}-{value}'
      //   });

      //   circle.events.on('click', (ev) => {
      //     const dataContext: PointData = ev.target.dataItem.dataContext as PointData;
      //   });

      //   return am5.Bullet.new(root, {
      //     sprite: circle
      //   });
      // });

      // const data: PointData[] = this.pubCollabCount4;
      // pointSeries.data.setAll(data);
    }


    createMap5() {



      am4core.useTheme(am4themes_animated);
      // Themes end
      
      // Create map instance
      let chart = am4core.create("chartdiv5", am4maps.MapChart);
      
      
      
      let mapData = this.pubCollabCount5;
      
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
      circle.propertyFields.fill = "#FF0000";
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


      // const root = am5.Root.new('chartdiv5');

      // // Set themes
      // root.setThemes([am5themes_Animated.new(root)]);

      // // Create chart
      // const chart = root.container.children.push(
      //   am5map.MapChart.new(root, {
      //     panX: 'rotateX',
      //     panY: 'none',
      //     projection: am5map.geoNaturalEarth1()
      //   })
      // );

      // // Create polygon series
      // const polygonSeries = chart.series.push(
      //   am5map.MapPolygonSeries.new(root, {
      //     geoJSON: am5geodata_worldLow,
      //     exclude: ['AQ']
      //   })
      // );

      // // Create point series
      // const pointSeries = chart.series.push(
      //   am5map.MapPointSeries.new(root, {
      //     latitudeField: 'lat',
      //     longitudeField: 'long'
      //   })
      // );

      // pointSeries.bullets.push(() => {
      //   const circle = am5.Circle.new(root, {
      //     radius: 8,
      //     fill: am5.color(0xff8c00),
      //     tooltipText: '{name}-{value}'
      //   });

      //   circle.events.on('click', (ev) => {
      //     const dataContext: PointData = ev.target.dataItem.dataContext as PointData;
      //   });

      //   return am5.Bullet.new(root, {
      //     sprite: circle
      //   });
      // });

      // const data: PointData[] = this.pubCollabCount5;
      // pointSeries.data.setAll(data);
    }

    // Level -2

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


    // LEVEL -3


    private initializeCounter3() {
      const digits = this.digits3 === 'auto' || this.digits3 < String(this.endCounterValue3).length ? String(this.endCounterValue3).length : this.digits3;
  
      // Set initial values
      let currentValue = 0;
      this.numbers3 = this.padNumber3(currentValue, digits);
  
      // Start the counting process
      this.startCounting3(currentValue);
    }
  
    private startCounting3(currentValue: number): void {
     
      const endValue = this.endCounterValue3;    
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
      this.numbers3 = this.padNumber3(currentValue, this.digits3);
  
      // Recursive call until the end value is reached
      if (endValue !== currentValue) {
        setTimeout(() => {
          this.startCounting3(currentValue);
        }, currentSpeed);
      }
    }
  
    private padNumber3(num: number, width: number, z: string = '0'): number[] {
      let numStr = num + '';
      numStr = numStr.padStart(width, z);
      return numStr.split('').map(Number);
    }

    // Level -4 
    private initializeCounter4() {
      const digits = this.digits4 === 'auto' || this.digits4 < String(this.endCounterValue4).length ? String(this.endCounterValue4).length : this.digits4;
  
      // Set initial values
      let currentValue = 0;
      this.numbers4 = this.padNumber4(currentValue, digits);
  
      // Start the counting process
      this.startCounting4(currentValue);
    }
  
    private startCounting4(currentValue: number): void {
     
      const endValue = this.endCounterValue4;    
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
      this.numbers4 = this.padNumber4(currentValue, this.digits4);
  
      // Recursive call until the end value is reached
      if (endValue !== currentValue) {
        setTimeout(() => {
          this.startCounting4(currentValue);
        }, currentSpeed);
      }
    }
  
    private padNumber4(num: number, width: number, z: string = '0'): number[] {
      let numStr = num + '';
      numStr = numStr.padStart(width, z);
      return numStr.split('').map(Number);
    }

    // Level - 5
    private initializeCounter5() {
      const digits = this.digits5 === 'auto' || this.digits5 < String(this.endCounterValue5).length ? String(this.endCounterValue5).length : this.digits5;
  
      // Set initial values
      let currentValue = 0;
      this.numbers5 = this.padNumber5(currentValue, digits);
  
      // Start the counting process
      this.startCounting5(currentValue);
    }
  
    private startCounting5(currentValue: number): void {
     
      const endValue = this.endCounterValue5;    
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
      this.numbers5 = this.padNumber5(currentValue, this.digits4);
  
      // Recursive call until the end value is reached
      if (endValue !== currentValue) {
        setTimeout(() => {
          this.startCounting5(currentValue);
        }, currentSpeed);
      }
    }
  
    private padNumber5(num: number, width: number, z: string = '0'): number[] {
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
