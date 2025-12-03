import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsearchService } from 'src/app/shared/services/commonsearch.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';



@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss',"../../../../assets/given/newcss/style.css"],

})
export class NotificationComponent implements OnInit {
  stickyEnable:boolean=false;
  isMenuOpen: boolean;
  greetingMessage:string;
  username:any;
  userDetail:any;
  Name:string;
  showHeading:string;
  notifyList:any=[];
  showMsg:boolean=false;
  notifyUnread:any=[];
  unreadMsg:boolean=false;
  notificationIds:any[]=[];
  isScrolled = false;
  role:any;
  roleName:string;
  noNotification:boolean=false;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  constructor( private authservice:AuthService,private route: ActivatedRoute,private search: CommonsearchService,
    private menuService:MenuService, private router:Router, private http: HttpClient) { 
    
    }

      ngOnInit() {
        this.menuService.isMenuOpen$.subscribe(isOpen => {
          this.isMenuOpen = isOpen;
        });

        this.username=this.authservice.getProfileObs(); 
        this.userDetail= this.authservice.getUserDetail();
        this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        // this.authservice.RoleSelection(this.userDetail.UniversityId,this.userDetail.UserId).subscribe(x=>{
          this.role=JSON.parse(localStorage.getItem('RoleSelection'));
          const data=this.role.filter(item=> item.roleId==this.username);
          this.roleName=data[0].roleName;
          console.log(this.roleName)
          // })

      this.getNotification();
       
      }

      getNotification(){
        this.authservice.getNotifyList(this.userDetail.UniversityId,this.username,this.userDetail.UserId).subscribe(x=>{
          this.notifyList=x;
          console.log(x);
          
          if(this.notifyList.length>0){
          for(let i=0;i<this.notifyList.length;i++){
                this.notifyList[i].modifiedDate=this.authservice.formatDate(this.notifyList[i].modifiedDate);
           }
          }
          else{
             this.noNotification=true;
          }
         });
      }  


      markData(val){
        const data={
          notificationIds:[
            {
              notificationId:val
            }
          ]
        }
         
        this.authservice.updateNotify(data,this.userDetail.UniversityId,this.username,this.userDetail.UserId).subscribe(x=>{
          console.log(x);      
          this.getNotification();  
        })
      
      }

      markAll(){

        for(let i=0;i<this.notifyList.length;i++){
            this.notificationIds.push({
              notificationId:this.notifyList[i].notificationId
            });
         }
         const data={
          notificationIds:this.notificationIds
        };
         console.log(data);
         
  this.authservice.updateNotify(data,this.userDetail.UniversityId,this.username,this.userDetail.UserId).subscribe(x=>{
    console.log(x);
    this.getNotification();     
  })
}

    // For stickey blue bar changes
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

}
