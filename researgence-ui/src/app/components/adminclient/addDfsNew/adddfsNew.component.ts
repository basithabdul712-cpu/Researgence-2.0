import { AuthService } from '../../../shared/services/firebase/auth.service';
import { AdminclientService } from '../adminclient.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-adddfsNew',
  templateUrl: './adddfsNew.component.html',
  styleUrls: ['./adddfsNew.component.scss','./../../../../assets/given/selected.css']
})
export class AdddfsNewComponent implements OnInit {

  public universityList:any;
  public userName:string;
  public universityName:any;
  public universityId:string;
  public showDropdown:boolean=false;
  public fill:any;
  public user:any=[]
  isMenuOpen:boolean;
  type:string;

  constructor(private service:AdminclientService, private authservice:AuthService,
    private menuService:MenuService, private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
        //for accessing menuopen 
        this.menuService.isMenuOpen$.subscribe(isOpen => {
          this.isMenuOpen = isOpen;
        });

        this.route.params.subscribe(params=>{
          this.type=params.type;
          console.log(this.type);
          
        })
          localStorage.removeItem('mineSearch');
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
  localStorage.setItem("clientUniv",this.universityName);
  localStorage.setItem("NewUnivId",this.universityId);
 }

    getDFS(data){
          console.log(data);
          if(this.type=="addnew"){
            if(data){
              this.router.navigate(['/facultyProfiles/feeder/new/'+data+'/requestid/rfstype']);
            }
          }
          else if(this.type=="supportmine"){
              this.router.navigate(['/scorebook/Publications/Mine']);
          }
          else if(this.type=="scorebook"){
            this.router.navigate(['/scorebook']);
          }
          else if(this.type=="facultycompare"){
            this.router.navigate(['/facultyProfiles/compare/fac']);
          }
          else if(this.type=="addpatent"){
            this.router.navigate(['/Patent/add/dfs/patent/ext/res/ai/'+data+'/temp']);
          }
    }

}
