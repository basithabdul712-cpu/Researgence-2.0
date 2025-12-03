import { MenuService } from 'src/app/shared/services/menu.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { FacultiesService } from "../faculties/faculties.service";
// import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { NumencoderService } from 'src/app/shared/services/numencoder.service';



@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.scss","../../../assets/given/newcss/style.css"],
})
export class ArticlesComponent implements OnInit,OnDestroy {
  @ViewChild('content') content: ElementRef;
  private subscription: Subscription;
  id: any;
  articledata: any;
  art: any[] = [];
  row: any=[];
  slNo: any;
  date: any;
  date1: any;
  userDetail:any;
  selectedTitle$: any;
  publicationTitle:string|null=null;
  pubList: Object;
  titlefilter: any;
  backflag: any;
  backbutton: boolean=false;
  singledata: any=[];
  dataArray: any;
  newarray: any[]=[];
  newcontent: any[]=[];
  isMenuOpen: boolean = false;
  Name:string="";
  userRole:any;
  role:any;
  roleName:any;
  groupedAuthorData: any[] = [];
  univId:any;
  
  constructor(
    private route: ActivatedRoute, private authservice:AuthService,private _location: Location,
    private service: FacultiesService,private location: Location,private menuService:MenuService, private encoderService: NumencoderService) {
    
  }

  ngOnDestroy(): void {
    
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
     this.userDetail=this.authservice.getUserDetail();
     this.userRole = this.authservice.getProfileObs();
    //  this.authservice.RoleSelection(this.userDetail.UniversityId,this.userDetail.UserId).subscribe(x=>{
    //   this.role=x;
    //   const data=this.role.filter(item=> item.roleId==this.userRole);
    //   this.roleName=data[0].roleName;
    //   console.log(this.roleName)
    //   })  
    //  this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.univId=parseInt(localStorage.getItem('initialUniv'));  
    this.route.paramMap.subscribe((params) => {
      console.log(params.get('recordId'));
      console.log(params.get('slno'));
      this.id = params.get("recordId");
      console.log(this.id);
      this.slNo =this.encoderService.decodeNumber(params.get("slNo"));
      console.log(this.slNo);
      this.backflag=params.get("back");
      console.log("back=="+this.backflag);

      if(this.backflag==2){
       this.backbutton=true;
      }   

      this.service.getpublication(this.id,this.univId).subscribe((data: any) => {
          this.dataArray = data;
          this.row.push(this.dataArray);
          console.log(this.row);
    
          for(let i=0;i<this.row.length;i++){

            if(this.row[i].publicationSourceDBMetrics!=null){
              const publicationSourceDBMetrics=this.row[i].publicationSourceDBMetrics.split(';');
              this.row[i].publicationSourceDBMetrics=publicationSourceDBMetrics.map(item => {
                const [name, value] = item.split(':');
                return { name, value };
              });

              for(let j=0;j<this.row[i].publicationSourceDBMetrics.length;j++){             
                  if(this.row[i].publicationSourceDBMetrics[j].name==="SCS Quartile"){
                    this.row[i].scsQuartile=this.row[i].publicationSourceDBMetrics[j].value;
                  }
                  if(this.row[i].publicationSourceDBMetrics[j].name==="WOS Quartile"){
                    this.row[i].wosQuartile=this.row[i].publicationSourceDBMetrics[j].value;
                  }
              }
            }

            if(this.row[i].technology_Areas!=null){
              this.row[i].technology_Areas = this.row[i].technology_Areas.split(';');
            }

               if(this.row[i].publicationDBCitation!=null){
                      const publicationDBCitation=this.row[i].publicationDBCitation.split(';');
        
                      this.row[i].publicationDBCitation=publicationDBCitation.map(item => {
                          const [name, value] = item.split(':');
                          return { name, value };
                        });
              
                // Assigning variable for showing values dynamically in honeycomp
                   for(let t=0;t<this.row[i].publicationDBCitation.length;t++){
        
                          if(this.row[i].publicationDBCitation[t].name=="SCOPUS"){
                            this.row[i].scopus=this.row[i].publicationDBCitation[t].value;
                          }
                          if(this.row[i].publicationDBCitation[t].name=="GS"){
                            this.row[i].gs=this.row[i].publicationDBCitation[t].value;
                          }
                          if(this.row[i].publicationDBCitation[t].name=="WOS"){
                            this.row[i].wos=this.row[i].publicationDBCitation[t].value;
                          }
                          if(this.row[i].publicationDBCitation[t].name=="IEEE"){
                            this.row[i].ieee=this.row[i].publicationDBCitation[t].value;
                          }
                          if(this.row[i].publicationDBCitation[t].name=="PUBMED"){
                            this.row[i].pubmed=this.row[i].publicationDBCitation[t].value;
                          }
                          if(this.row[i].publicationDBCitation[t].name=="ABDC"){
                            this.row[i].abdc=this.row[i].publicationDBCitation[t].value;
                          }
                      }
        
                   }

                   if(this.row[i].authorAffiliation!=null){ 
                    this.row[i].authorAffiliation = this.row[i].authorAffiliation.split('|');
                    this.groupedAuthorData=this.groupArray(this.row[i].authorAffiliation, 2);                    
                   }
           }
         
          console.log(this.row[0].publicationTitle);

        });

    }); 

  }
  
  captureAsPDF() {
    console.log("download pdf");
    
    // Capture the entire HTML content
    const DATA = document.documentElement;
  console.log(DATA); // Check if DATA contains the correct element

    html2canvas(DATA, {
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
    }).then((canvas) => {
      let fileWidth = 210;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL("image/png");
      let PDF = new jsPDF("p", "mm", "a4");
      let position = 0;
      PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
      PDF.save("Article.pdf");
  
     
    });
  }

    goback(){
      window.history.back();
    }

    groupArray(data: any[], chunkSize: number) {
      const result = [];
      for (let i = 0; i < data.length; i += chunkSize) {
        result.push(data.slice(i, i + chunkSize));
      }
      return result;
    }

    backClicked() {
      this._location.back();
    }

    getNameWithoutBrackets(author: string): string {
      if (typeof author === 'string') {
        return author.replace(/\[\d+\]/, '').split(',')[0];
      }
      return '';
    }

    hasBrackets(author: string): boolean {
      return /\[\d+\]/.test(author);
    }

}
