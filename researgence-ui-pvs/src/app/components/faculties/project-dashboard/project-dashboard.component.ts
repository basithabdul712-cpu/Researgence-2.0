import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Directive, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FacultiesService } from '../faculties.service';
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
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ["../../../../assets/given/newcss/style.css",'./project-dashboard.component.scss']})
export class ProjectDashboardComponent implements OnInit {

  isMenuOpen:boolean;
  homeTab:boolean;
  profileTab:boolean;
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
  total:number=520;
  totalCountstop:any;
  

  @Input() digits: any | 'auto' = 'auto';
  @Input() endCounterValue: number = 100;
  numbers: number[] = [];
  
    constructor(private route:Router) { 
         
        }

        ngOnInit() {

          this.totalCount=520;

          console.log(this.endCounterValue);
          
          if(this.totalCount){
            this.initializeCounter();
            console.log(this.totalCount);
            
            }
            this.chart();
          
          
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


chart(){
  let root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

let data = [
  {
    name: "Monica",
    steps: 45688,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg"
    }
  },
  {
    name: "Joey",
    steps: 35781,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg"
    }
  },
  {
    name: "Ross",
    steps: 25464,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/2019/04/ross.jpg"
    }
  },
  {
    name: "Phoebe",
    steps: 18788,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/2019/04/phoebe.jpg"
    }
  },
  {
    name: "Rachel",
    steps: 15465,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg"
    }
  },
  {
    name: "Chandler",
    steps: 11561,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/2019/04/chandler.jpg"
    }
  }
];

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
let chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    paddingLeft:0,
    paddingRight:30,
    wheelX: "none",
    wheelY: "none"
  })
);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

let yRenderer = am5xy.AxisRendererY.new(root, {
  minorGridEnabled:true
});
yRenderer.grid.template.set("visible", false);

let yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "name",
    renderer: yRenderer,
    paddingRight:40
  })
);

let xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance:80,
  minorGridEnabled:true
});

let xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0,
    renderer: xRenderer
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Income",
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "steps",
    categoryYField: "name",
    sequencedInterpolation: true,
    calculateAggregates: true,
    maskBullets: false,
    tooltip: am5.Tooltip.new(root, {
      dy: -30,
      pointerOrientation: "vertical",
      labelText: "{valueX}"
    })
  })
);

series.columns.template.setAll({
  strokeOpacity: 0,
  cornerRadiusBR: 10,
  cornerRadiusTR: 10,
  cornerRadiusBL: 10,
  cornerRadiusTL: 10,
  maxHeight: 50,
  fillOpacity: 0.8
});

let currentlyHovered;

series.columns.template.events.on("pointerover", function(e) {
  handleHover(e.target.dataItem);
});

series.columns.template.events.on("pointerout", function(e) {
  handleOut();
});

function handleHover(dataItem) {
  if (dataItem && currentlyHovered != dataItem) {
    handleOut();
    currentlyHovered = dataItem;
    let bullet = dataItem.bullets[0];
    bullet.animate({
      key: "locationX",
      to: 1,
      duration: 600,
      easing: am5.ease.out(am5.ease.cubic)
    });
  }
}

function handleOut() {
  if (currentlyHovered) {
    let bullet = currentlyHovered.bullets[0];
    bullet.animate({
      key: "locationX",
      to: 0,
      duration: 600,
      easing: am5.ease.out(am5.ease.cubic)
    });
  }
}


let circleTemplate = am5.Template.new({});

series.bullets.push(function(root, series, dataItem) {
  let bulletContainer = am5.Container.new(root, {});
  let circle = bulletContainer.children.push(
    am5.Circle.new(
      root,
      {
        radius: 34
      }
    )
  );

  let maskCircle = bulletContainer.children.push(
    am5.Circle.new(root, { radius: 27 })
  );

  // only containers can be masked, so we add image to another container
  let imageContainer = bulletContainer.children.push(
    am5.Container.new(root, {
      mask: maskCircle
    })
  );

  // not working
  let image = imageContainer.children.push(
    am5.Picture.new(root, {
      templateField: "pictureSettings",
      centerX: am5.p50,
      centerY: am5.p50,
      width: 60,
      height: 60
    })
  );

  return am5.Bullet.new(root, {
    locationX: 0,
    sprite: bulletContainer
  });
});

// heatrule
series.set("heatRules", [
  {
    dataField: "valueX",
    min: am5.color(0xe5dc36),
    max: am5.color(0x5faa46),
    target: series.columns.template,
    key: "fill"
  },
  {
    dataField: "valueX",
    min: am5.color(0xe5dc36),
    max: am5.color(0x5faa46),
    target: circleTemplate,
    key: "fill"
  }
]);

series.data.setAll(data);
yAxis.data.setAll(data);

let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineX.set("visible", false);
cursor.lineY.set("visible", false);

cursor.events.on("cursormoved", function() {
  let dataItem = series.get("tooltip").dataItem;
  if (dataItem) {
    handleHover(dataItem)
  }
  else {
    handleOut();
  }
})

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();
chart.appear(1000, 100);
}

}
