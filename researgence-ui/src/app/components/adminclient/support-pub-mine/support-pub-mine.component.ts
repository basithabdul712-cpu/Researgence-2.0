import { AuthService } from '../../../shared/services/firebase/auth.service';
import { AdminclientService } from '../adminclient.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { PubSearchList } from 'src/app/shared/model/PostPayload';

@Component({
  selector: 'app-support-pub-mine',
  templateUrl: './support-pub-mine.component.html',
  styleUrls: ['./support-pub-mine.component.scss','./../../../../assets/given/newcss/style.css']
})
export class SupportPubMineComponent implements OnInit {

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


  constructor(private service:AdminclientService, private authservice:AuthService,
    private menuService:MenuService, private router:Router) { }

  ngOnInit() {
        //for accessing menuopen 
        this.menuService.isMenuOpen$.subscribe(isOpen => {
          this.isMenuOpen = isOpen;
        });

        this.user=this.authservice.getUserDetail();
        this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        this.userName=this.authservice.getProfileObs();
        // this.authservice.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
           this.role=JSON.parse(localStorage.getItem('RoleSelection'));
             console.log(this.role);
          
              const data=this.role.filter(item=> item.roleId==this.userName);
              this.roleName=data[0].roleName;
              console.log(this.roleName)
          //  })
          this.service.GetUniversity(this.user.UserId,this.userName).subscribe(x=>{
              this.universityList=x;
              // this.fill=this.universityList;
              console.log(x);        
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
                        alert("Title or DOI cannot be empty.")
                    }
                    else{
                      if(this.pubTitle!=""){
                        this.pubSearchList.push({
                            columnName: "PublicationTitle",
                            searchType: "Like",
                            searchId: null,
                            searchValue: this.pubTitle,
                            rangeFrom: null,
                            rangeTo: null,
                          });
                      }

                      if(this.pubDoi!=""){
                        this.pubSearchList.push({
                          columnName: "DOI",
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
                      localStorage.setItem("editPubMineSearch", JSON.stringify(data));
                       this.router.navigate(['/clientadmin/PUBLICATION/MINESEARCH/DETAIL'])
                    }              
                }

             }

}
