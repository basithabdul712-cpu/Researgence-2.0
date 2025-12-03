import { AdminclientService } from './../adminclient/adminclient.service';
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
  projectList: any=[];
  tempProjList:any;
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
  isMenuOpen: boolean = false;
  Name:string="";
  userRole:any;
  role:any;
  roleName:any;
  groupedAuthorData: any[] = [];
  groupedEditedAuthor: any[] = [];
  groupedProjectTeam: any[] = [];
  groupedPrincipalInv: any[] = [];
  groupedcoInv: any[] = [];
  universityList:any;
  univId:string="";
  
  constructor(
    private route: ActivatedRoute, private authservice:AuthService,private _location: Location,private clientService: AdminclientService,
    private service: FacultiesService,private location: Location,private menuService:MenuService) {
    
  }

      ngOnDestroy(): void {
        
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
      }

     ngOnInit() {

          this.userDetail=this.authservice.getUserDetail();
          this.userRole = this.authservice.getProfileObs();

          // this.authservice.RoleSelection(this.userDetail.UniversityId,this.userDetail.UserId).subscribe(x=>{
            this.role=JSON.parse(localStorage.getItem('RoleSelection'));
            const data=this.role.filter(item=> item.roleId==this.userRole);
            this.roleName=data[0].roleName;
            console.log(this.roleName)
            // })  

          this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          this.route.paramMap.subscribe((params) => {
            this.id = params.get("recordId");
            this.slNo = params.get("slNo");
            console.log(this.slNo);
            
            this.backflag=params.get("back");
            console.log("back=="+this.backflag);

            if(this.backflag==2){
            this.backbutton=true;
            }  

            if(this.userRole==11||this.userRole==12){

              var universityName=localStorage.getItem("clientUniv");
              this.clientService.GetUniversity(this.userDetail.UserId,this.userRole).subscribe(x=>{
                this.universityList=x;
                let filterUniv = this.universityList.filter(x=> x.universityName.toLowerCase()==universityName.toLowerCase());
                this.univId=filterUniv[0].universityId;
                console.log(this.univId);
                this.getList();          
                }); 
            }
            else{
              this.univId= this.userDetail.UniversityId;
              console.log(this.univId);
              if(this.slNo=="project"){
                  this.getProjectDetail();
              }
              else{
                this.getList();
              }
                
            }
          }); 

      }

  getList(){

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

        if (this.row[i].rankingMetrics != null) {
          const rankMetric = this.row[i].rankingMetrics.split(';');
          this.row[i].rankingMetrics = rankMetric.map(item => {
            const [name, value] = item.split(':');
            return { 
              name, 
              value: value.trim() !== '-' ? 'Eligible' : value.trim() 
            };
          });
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
                      if(this.row[i].publicationDBCitation[t].name=="CROSSREF"){
                        this.row[i].abdc=this.row[i].publicationDBCitation[t].value;
                      }
                      if(this.row[i].publicationDBCitation[t].name=="SD"){
                        this.row[i].sd=this.row[i].publicationDBCitation[t].value;
                      }
                  }
    
               }

               if(this.row[i].authorAffiliation!=null){ 
                this.row[i].authorAffiliation = this.row[i].authorAffiliation.split('|');
                this.groupedAuthorData=this.groupArray(this.row[i].authorAffiliation, 2);                    
               }
                
              if(this.row[i].isEditedPublication=='1'&&this.row[i].editorAffiliation!=null){
                this.row[i].editorAffiliation = this.row[i].editorAffiliation.split('|');
                this.groupedEditedAuthor=this.groupArray(this.row[i].editorAffiliation, 2); 
              }
       }
     
      console.log(this.row[0].publicationTitle);

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

    getProjectDetail(){
      this.service.getListProject(this.id,this.univId).subscribe(x=>{
              this.tempProjList=x;
              this.projectList.push(this.tempProjList);
              console.log(this.projectList);

              for(let i=0;i<this.projectList.length;i++){

                if(this.projectList[i].projectTeam!=null){ 
                  this.projectList[i].projectTeam = this.projectList[i].projectTeam.split('|');
                  this.groupedProjectTeam=this.groupArray(this.projectList[i].projectTeam, 2);                    
                 }

                 if(this.projectList[i].principalInvestigator!=null){ 
                  this.projectList[i].principalInvestigator = this.projectList[i].principalInvestigator.split('|');
                  this.groupedPrincipalInv=this.groupArray(this.projectList[i].principalInvestigator, 2);                    
                 }

                 if(this.projectList[i].coInvestigator!=null){ 
                  this.projectList[i].coInvestigator = this.projectList[i].coInvestigator.split('|');
                  this.groupedcoInv=this.groupArray(this.projectList[i].coInvestigator, 2);                    
                 }

                 if (this.projectList[i].grantTimeline != null) {
                  const rankMetric = this.projectList[i].grantTimeline.split(',');
                  this.projectList[i].grantTimeline = rankMetric.map(item => {
                    const [name, value] = item.split(':');
                    return { 
                      name, 
                      value: value.trim() 
                    };
                  });
                }

                if (this.projectList[i].projectOutcomes != null) {
                  const projectOutcomes = this.projectList[i].projectOutcomes.split(',');
      
                  this.projectList[i].projectOutcomes = projectOutcomes.map(item => {
                    const [name, value] = item.split(':');
                    return { name, value };
                  });
      
                  // Assigning variable for showing values dynamically in honeycomp
                  for (let t = 0; t < this.projectList[i].projectOutcomes.length; t++) {
      
                    if (this.projectList[i].projectOutcomes[t].name == "Publications") {
                      this.projectList[i].publication = this.projectList[i].projectOutcomes[t].value;
                    }
                    if (this.projectList[i].projectOutcomes[t].name == "Patent") {
                      this.projectList[i].Patent = this.projectList[i].projectOutcomes[t].value;
                    }
                    if (this.projectList[i].projectOutcomes[t].name == "Conference") {
                      this.projectList[i].Conference = this.projectList[i].projectOutcomes[t].value;
                    }
                    if (this.projectList[i].projectOutcomes[t].name == "Product") {
                      this.projectList[i].Product = this.projectList[i].projectOutcomes[t].value;
                    }
                   
                  }
                }

              }
              
        });

    }

}
