import { filter } from 'rxjs/operators';
import { GeneralApiService } from 'src/app/components/general-api.service';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { FacultiesService } from '../../faculties/faculties.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {PubSearchList} from'src/app/shared/model/PostPayload';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScorebookService } from '../../scorebook/scorebook.service';
import { AdminclientService } from '../../adminclient/adminclient.service';

@Component({
  selector: 'app-patent-edit-by-mine',
  templateUrl: './patent-edit-by-mine.component.html',
  styleUrls: ['./patent-edit-by-mine.component.scss','./../../../../assets/given/newcss/style.css']
})
export class PatentEditByMineComponent implements OnInit {
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  stickyEnable: boolean;
  isScrolled = false;
  Name:string;
  role:any;
  roleName:any;
  public universityList:any;
  public userName:string;
  public universityName:any;
  public universityId:string;
  public showDropdown:boolean=false;
  public fill:any;
  public user:any=[]
  isMenuOpen:boolean;
  univName:string="";
  univEnable:boolean=false;
  cusUniversityList:any;
  univId:any;
  pubTitle:string="";
  pubDoi:string="";
  pubSearchList: PubSearchList[];
  startrow:number=0;
  endrow:number=20;
  download:number=0;


  constructor( private router:Router,private authservice:AuthService,private service:AdminclientService,
    private menuService:MenuService,private facultyservice: FacultiesService,private fb: FormBuilder) {
     }
    
     ngOnInit() {
      //for accessing menuopen 
      localStorage.removeItem("editPatMineSearch");

          this.menuService.isMenuOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
          });

          this.user=this.authservice.getUserDetail();
          this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          this.userName=this.authservice.getProfileObs();
          // this.authservice.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
            this.role=JSON.parse(localStorage.getItem('RoleSelection'));
        
              const data=this.role.filter(item=> item.roleId==this.userName);
              this.roleName=data[0].roleName;
              console.log(this.roleName)
            //  });

            this.service.GetUniversity(this.user.UserId,this.userName).subscribe(x=>{
                this.universityList=x;   
            });

         }

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

       SearchUnivName(univname){

            this.univEnable=true;
            if(univname==""){
            this.univEnable=false;
            }
            this.fill=this.universityList.filter(x=>x.universityName.toLowerCase().includes(univname.toLowerCase()));
            if(this.fill.length==0){
                this.univEnable=false;
            }

       }

       onSelectUniv(name,id){

          this.univId=id;
          this.univName=name;
          this.univEnable=false;

       }

       searchMine(){          
        
          if(this.univId==undefined){
                alert("Please select University to proceed")      
            }
            else{
              this.pubSearchList=[];
                  if(this.pubTitle==""&&this.pubDoi==""){
                      alert("Title or App No. cannot be empty.")
                  }
                  else{
                    if(this.pubTitle!=""){
                      this.pubSearchList.push({
                          columnName: "PatentTitle",
                          searchType: "Like",
                          searchId: null,
                          searchValue: this.pubTitle,
                          rangeFrom: null,
                          rangeTo: null,
                        });
                    }

                    if(this.pubDoi!=""){
                      this.pubSearchList.push({
                        columnName: "ApplicationNo",
                        searchType: "Like",
                        searchId: null,
                        searchValue: this.pubDoi,
                        rangeFrom: null,
                        rangeTo: null,
                      });
                    }

                    const data={
                      universityId: this.univId,
                      roleId: this.userName,
                      loginUserId: this.user.UserId,
                      sortColumnName: null,
                      sortType: null,
                      startRow: this.startrow,
                      endRow: this.endrow,
                      download: this.download,
                      filter: 0,
                      searchList:this.pubSearchList
                    }
                    
                    console.log(data);
                    localStorage.setItem("editPatMineSearch", JSON.stringify(data));
                     this.router.navigate(['/Patent/edit/mine/search/detail'])
                  }              
              }

           }

}
