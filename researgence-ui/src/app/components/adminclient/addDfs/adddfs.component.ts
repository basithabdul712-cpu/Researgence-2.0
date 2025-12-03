import { AuthService } from '../../../shared/services/firebase/auth.service';
import { AdminclientService } from '../adminclient.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-adddfs',
  templateUrl: './adddfs.component.html',
  styleUrls: ['./adddfs.component.scss','./../../../../assets/given/selected.css']
})
export class AdddfsComponent implements OnInit {

  public universityList:any;
  public userName:string;
  public universityName:any;
  public universityId:string;
  public showDropdown:boolean=false;
  public fill:any;
  public user:any=[]
  isMenuOpen:boolean;
  constructor(private service:AdminclientService, private authservice:AuthService,
    private menuService:MenuService, private router:Router) { }

  ngOnInit() {
        //for accessing menuopen 
        this.menuService.isMenuOpen$.subscribe(isOpen => {
          this.isMenuOpen = isOpen;
        });

        this.user=this.authservice.getUserDetail();
        this.userName=this.authservice.getProfileObs();
      this.service.GetUniversity(this.user.UserId,this.userName).subscribe(x=>{
          this.universityList=x;
          this.fill=this.universityList;
          console.log(x);        
      })

  }
 

  onKeyUp(x){

    this.showDropdown = this.universityName.length > 0;
    this.fill = this.universityList.filter(e => e.universityName.toLowerCase().includes(this.universityName.toLowerCase())

    );
    console.log(this.fill);

 }

 onItemClick(item: string,id: string) {

  this.universityName = item;
  this.universityId = id;
  this.showDropdown = false;

 }

 getDFS(data){
  console.log(data);
    if(data){
        this.router.navigate(['/facultyProfiles/feeder/'+data+'/requestid/rfstype'])
    }
 }

}
