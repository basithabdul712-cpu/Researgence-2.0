import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-project-faculty-profile',
  templateUrl: './project-faculty-profile.component.html',
  styleUrls: ['../../../../../assets/given/newcss/style.css','./project-faculty-profile.component.scss']
})
export class ProjectFacultyProfileComponent implements OnInit {
  
  isMenuOpen: boolean;
  

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {

     //for accessing menuopen 
     this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });
     
  }

}
