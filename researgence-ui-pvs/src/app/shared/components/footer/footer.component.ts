import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./../../../../assets/given/selected.css']
})
export class FooterComponent implements OnInit {
  copyRightDate:any;
  constructor() { }

  ngOnInit() {
    let d= new Date();
    this.copyRightDate= d.getFullYear();
   }

}
