import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GeneralApiService } from 'src/app/components/general-api.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-journal-search-result',
  templateUrl: './journal-search-result.component.html',
  styleUrls: ['./journal-search-result.component.scss','../../../../../assets/given/newcss/journal-detail-bootstrap.min.css']
})
export class JournalSearchResultComponent implements OnInit {
  homeURL: string;
  userRole:number;
  userDetail:any;
  dataList:any;
  filteredList:any;
  page:number=1;
  pageSize:number=20;
  collapsablesize:any;
  totalPages:number;
  startrow:number=0;
  endrow:number=20;
  pageSizecount = ["10","20","50","100"];
  searchData:any;
  orderSort=['Ascending','Descending'];
  ascendValue='Descending';
  ordervalue: any;
  Name:string;
  enablePic:boolean=false;

  constructor(private router: Router, private location: Location,private service: GeneralApiService,private authservice: AuthService) { }

  ngOnInit(): void {
    this.homeURL = "/Home";
    localStorage.removeItem("journalResult");
    this.userRole = this.authservice.getProfileObs();
    this.userDetail= this.authservice.getUserDetail();
    this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    const searchData=localStorage.getItem("JounralSearch");
    console.log(JSON.parse(searchData));
    this.searchData=JSON.parse(searchData);
      this.fetchdata(this.searchData);
  }

  onClickBack(){
    this.location.back();
  }

  onPageChange(page: number){
    console.log(page);
    console.log(this.pageSize);
    
    this.page = Math.max(1, Math.min(page, this.totalPages));
    if (this.page == 1) {
      this.startrow = 0;
    } else {
      this.startrow = (this.page - 1) * this.pageSize;
    }
    this.endrow = Math.min(this.startrow + this.pageSize, this.collapsablesize);
    console.log(this.searchData);
    
    this.searchData.endRow=this.endrow;
    this.searchData.startRow=this.startrow;
    this.fetchdata(this.searchData);
  }


  fetchdata(searchData){
   
      this.service.searchJournalData(searchData).subscribe((x: HttpResponse<any>)=>{
        if (x.status === 200) {
          this.dataList = x.body;
          this.enablePic = true;
        } else {
          this.enablePic = false;
        }     
       this.filteredList=this.dataList.dataList;
       this.collapsablesize=this.dataList.totalRowCount;
       this.totalPages = Math.ceil(this.collapsablesize / this.pageSize); 
       for(let i=0;i<this.filteredList.length;i++){
 
         if(this.filteredList[i].journalDBMapping != null){
           this.filteredList[i].journalDBMapping=this.filteredList[i].journalDBMapping.split(";");
         }
 
       if (this.filteredList[i].journalMetrics != null) {
         const journalMetrics = this.filteredList[i].journalMetrics.split(';');
 
         this.filteredList[i].journalMetrics = journalMetrics.map(item => {
           const [name, value] = item.split(':');
           return { name, value };
         });
 
       
       for (let t = 0; t < this.filteredList[i].journalMetrics.length; t++) {
 
         if (this.filteredList[i].journalMetrics[t].name == "Snip") {
           this.filteredList[i].snip = this.filteredList[i].journalMetrics[t].value;
         }
         if (this.filteredList[i].journalMetrics[t].name == "SJR") {
           this.filteredList[i].sjr = this.filteredList[i].journalMetrics[t].value;
         }
         if (this.filteredList[i].journalMetrics[t].name == "ImpactFactor") {
           this.filteredList[i].imf = this.filteredList[i].journalMetrics[t].value;
         }
         if(this.filteredList[i].journalMetrics[t].name == "CITESCORE"){
          this.filteredList[i].cs = this.filteredList[i].journalMetrics[t].value;
         }
           }
          }
        }

        if (this.ordervalue === 'Ascending') {
          this.filteredList.sort((a, b) => (a.publicationSourceName > b.publicationSourceName) ? 1 : ((b.publicationSourceName > a.publicationSourceName) ? -1 : 0));
            } else if (this.ordervalue === 'Descending') {
            this.filteredList.sort((a, b) => (a.publicationSourceName < b.publicationSourceName) ? 1 : ((b.publicationSourceName < a.publicationSourceName) ? -1 : 0));
            }
        },
        (error) => {
          this.enablePic = false; // Set enablePic to true in case of an error
        });
  }

  onPageSizeChange(size: string){
    this.page = 1;
    this.pageSize = Number(size);
    this.endrow=this.pageSize+this.startrow;
    this.searchData.endRow=this.endrow;
     this.fetchdata(this.searchData);
  }

  changesOrder(values){
    console.log(values);
    this.ordervalue=values;
    if(values=='Ascending'){
        this.filteredList.sort((a, b) => (a.publicationSourceName > b.publicationSourceName) ? 1 : ((b.publicationSourceName > a.publicationSourceName) ? -1 : 0));
    }
    if(values=='Descending'){
      this.filteredList.sort((a, b) => (a.publicationSourceName < b.publicationSourceName) ? 1 : ((b.publicationSourceName < a.publicationSourceName) ? -1 : 0));
    } 
  }

  toDetailView(val:number){
    console.log(val);

     this.filteredList= this.filteredList.filter(item => item.rowNumber==val);
        localStorage.setItem("journalResult",JSON.stringify(this.filteredList));
       this.router.navigate(['/journal-detail'])
  }

}
