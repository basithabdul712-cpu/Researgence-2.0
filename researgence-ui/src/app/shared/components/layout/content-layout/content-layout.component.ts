import { Component, OnInit, AfterViewInit, HostListener, Input } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, zoomOut, zoomIn, fadeIn, bounceIn } from 'ng-animate';
import { NavService } from '../../../services/nav.service';
import {MenuService} from '../../../services/menu.service';
import { CustomizerService } from '../../../services/customizer.service';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [
    trigger('animateRoute', [transition('* => *', useAnimation(fadeIn, {
      // Set the duration to 5seconds and delay to 2 seconds
      //params: { timing: 3}
    }))])
  ]
})
export class ContentLayoutComponent implements OnInit, AfterViewInit {

  public right_side_bar: boolean;
 //for transformation in publication detail page
  isMenuOpen = false;

    constructor(private menuService: MenuService,public navServices: NavService,
      public customizer: CustomizerService) {
       
      }
    
  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }

  @HostListener('document:click', ['$event'])
  clickedOutside(event) {
    // click outside Area perform following action
    document.getElementById('outer-container').onclick = function (e) {
      e.stopPropagation()
      if (e.target != document.getElementById('search-outer')) {
        if (document.getElementsByTagName("body")[0]) {
          document.getElementsByTagName("body")[0].classList.remove("offcanvas");
        }
      }
      if (e.target != document.getElementById('outer-container')) {
        if (document.getElementsByTagName("canvas-bookmark")[0]) {
          document.getElementById("canvas-bookmark").classList.remove("offcanvas-bookmark");  
        }
      }
      if (e.target != document.getElementById('inner-customizer')) {
        if (document.getElementsByTagName("customizer-links")[0]) {
          document.getElementsByClassName("customizer-links")[0].classList.remove("open")
        }
        
        if (document.getElementsByTagName("customizer-contain")[0]) {
          document.getElementsByClassName("customizer-contain")[0].classList.remove("open")
        }
      }
    }
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  public rightSidebar($event) {
    this.right_side_bar = $event
  }
  
  ngOnInit() { 
    // this.isSidebarOpen = this.navServices.collapseSidebar;
  }
  // toggleSidebar() {
  //   this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  //   this.isSidebarOpen = this.navServices.collapseSidebar;
  
  // }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
