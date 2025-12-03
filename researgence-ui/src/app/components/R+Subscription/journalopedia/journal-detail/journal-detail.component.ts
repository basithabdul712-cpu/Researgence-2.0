import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-journal-detail',
  templateUrl: './journal-detail.component.html',
  styleUrls: ["./journal-detail.component.scss","../../../../../assets/given/newcss/jounal-detail-slick.css","../../../../../assets/given/newcss/journal-detail-slick-theme.css","../../../../../assets/given/newcss/journal-detail-bootstrap.min.css"]
})
export class JournalDetailComponent implements OnInit {
  homeURL: string;
  dataList:any;
  userRole:any;
  userDetail:any;
  Name:string;

  constructor(private authservice: AuthService,private location: Location) { }

  ngOnInit() {
    this.homeURL= "/Home";
    this.userRole = this.authservice.getProfileObs();
    this.userDetail= this.authservice.getUserDetail();
    this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    const data=localStorage.getItem("journalResult");
      const dataList=JSON.parse(data);
      this.dataList=dataList[0];
      console.log(this.dataList);
      
  }

  onClickBack(){
    this.location.back();
  }

}
