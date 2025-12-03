import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { FacultiesService } from "../faculties/faculties.service";


@Component({
  selector: "app-information",
  templateUrl: "./information.component.html",
  styleUrls: ["./information.component.scss",'../../../assets/given/newcss/style.css'],
})
export class InformationComponent implements OnInit {
  type:string;
  univName:string;
  constructor(private route:ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.type=params.get('type');
      this.univName=params.get('univ');
    });

  }

}
