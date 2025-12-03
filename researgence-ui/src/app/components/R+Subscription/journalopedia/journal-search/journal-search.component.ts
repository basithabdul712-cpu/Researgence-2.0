import { GeneralApiService } from 'src/app/components/general-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

@Component({
  selector: 'app-journal-search',
  templateUrl: './journal-search.component.html',
  styleUrls: ['./journal-search.component.scss','../../../../../assets/given/newcss/journal-detail-bootstrap.min.css']
})
export class JournalSearchComponent implements OnInit {
  checkDTtitle:any;
  searchInput:string="";
  userRole:number;
  userDetail:any;
  type:string;
  Name:string;

  constructor(private router: Router,private service: GeneralApiService,private authservice: AuthService) { }

  ngOnInit(){
    this.userRole = this.authservice.getProfileObs();
    this.userDetail= this.authservice.getUserDetail();
    this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.checkDTtitle="title";
  }

  onSearchSubmit() {
    this.router.navigate(["/journal-search-result"]);
  }

  onAdvanceSearch() {
    this.router.navigate(["/journal-advance-search"]);
  }

  updateValues(data){
    console.log(data);
    if(data=="technology"){
        this.type="TECHNOLOGYAREA";
    }
    else if(data=="issn"){
        this.type="ISSN";
    }
    else{
        this.type="PUBLICATIONSOURCE";
    }

  }

  submitSearch(){
    if(this.type==undefined){
    this.type="PUBLICATIONSOURCE";
    }
    const searchData={
      universityId: this.userDetail.UniversityId,
      roleId: this.userRole,
      loginUserId: this.userDetail.UserId,
      sortColumnName:null,
      sortType: null,
      startRow: 0,
      endRow: 20,
      download: 0,
      filter: 0,
      searchList: [
        {
          columnName:"ARTICLETYPE",
          searchType: "Like",
          searchId: null,
          searchValue: "Journal",
          rangeFrom: null,
          rangeTo: null
        },
        {
          columnName:this.type,
          searchType: "Like",
          searchId: null,
          searchValue: this.searchInput,
          rangeFrom: null,
          rangeTo: null
        }
      ]
    }

    localStorage.setItem("JounralSearch",JSON.stringify(searchData));
    this.router.navigate(["/journal-search-result"]);
    
  }

}
