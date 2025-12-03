import { AuthService } from './../../../shared/services/firebase/auth.service';
import { AdminclientService } from './../adminclient.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { NumencoderService } from 'src/app/shared/services/numencoder.service';
import {UniversityidService} from '../../../shared/services/universityid.service';

@Component({
  selector: 'app-universitylist',
  templateUrl: './universitylist.component.html',
  styleUrls: ['./universitylist.component.scss','./../../../../assets/given/selected.css']
})
export class UniversityComponent implements OnInit {

  public universityList:any;
  public userName:string;
  public universityName:any;
  public universityId:string;
  public showDropdown:boolean=false;
  public fill:any = [
    {
      universityId: 43,
      universityName: "JIS Group"
    },
    {
      universityId: 1009,
      universityName: "SGT University"
    },
    {
      universityId: 4395,
      universityName: "Ashoka University"
    },
  
  ];
  public user:any=[]
  isMenuOpen:boolean;
  constructor(private service:AdminclientService, private authservice:AuthService,
    private menuService:MenuService, private router:Router, private encoderService: NumencoderService,
    private univservice: UniversityidService) { }

  ngOnInit() {

           this.authservice.setProfileObs('6');
          localStorage.removeItem("univ");
          //for accessing menuopen 
          this.menuService.isMenuOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
          });
  
          this.user=this.authservice.getUserDetail();
          this.userName=this.authservice.getProfileObs();
          console.log(this.user, this.userName);
          // this.service.GetUniversity(this.user.UserId,this.userName).subscribe(x=>{
          //     this.universityList=x;
          //     this.fill=this.universityList;
          //     console.log(x);        
          // })    
 
    }



      onKeyUp(x){

        this.showDropdown = this.universityName.length > 0;
        this.fill = this.universityList.filter(e => e.universityName.toLowerCase().includes(this.universityName.toLowerCase())
        );
        console.log(this.fill);
        
      } 

      onItemClick(item: string,id: string) {  
        if(id !== null){
          this.univservice.setSelectedId(Number(id));
          console.log("Id set globally", id);
          localStorage.setItem("initialUniv",id);
        }  
        this.universityName = item;
        this.universityId = id;
        this.showDropdown = false;
        // localStorage.setItem("clientUniv",this.universityName);
      }


      getRFS(data){
        // console.log(data);
          if(data){
            data = this.encoderService.encodeNumber(data);
            this.router.navigate(['/Home']);
          }

      }

}
