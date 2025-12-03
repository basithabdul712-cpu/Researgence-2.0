import { filter } from 'rxjs/operators';
import { FacultiesService } from '../../faculties/faculties.service';
import { AuthService } from '../../../shared/services/firebase/auth.service';
import {PatentSearchCriteria} from '../../../shared/data/dashboard/patent-search-criteria';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AdminclientService } from '../../adminclient/adminclient.service';

@Component({
  selector: 'app-patent-advance-search',
  templateUrl: './patent-advance-search.component.html',
  styleUrls: ['./patent-advance-search.component.scss','./../../../../assets/given/selected.css', './../../../../assets/given/css/style-vit1.css', './../../../../assets/given/css/style-vit2.css', './../../../../assets/given/css/style.css', './../../../../assets/given/css/bootstrap.min.css']
})
export class PatentAdvanceSearchComponent implements OnInit {
  
  public universityList:any;
  public userName:string;
  public universityName:string;
  public universityId:Number;
  public showDropdown:boolean=false;
  public fill:any;
  public user:any=[]
  isMenuOpen:boolean;
  dataList:any[]=[];
  masterSelected:boolean;
  checklist:any[]=[];
  checkedList:any;
  selectedDataList: any[] = [];
  supportAdmin="11";
  support="12";
  pdfNew:any;
  universityFilter:any;
  name: string;
  data: any;
  filteredData: any[];
  universityShortName: any;
  hideDrop:boolean=false;
  filterTitle: any[]=[];
  searchData: String="";
  university: any;
  page=1;
  pageSize = 20;
  collectionSize:any;
  pageSizes: any[] = ["10","15","20","100"]; 
  pdfPath:any;
  tempPdf:string;
  status:string;
  statusList:any;
  rfsFilter:string;
  rfsTypeList:any;
  verifiedStatus:string;
  verifiedStatusList:any;
  createdDateFrom:string|null=null;
  verifiedDateFrom:string|null=null;
  createdDateTo:string|null=null;
  verifiedDateTo:string|null=null;
  publicationTitle:string|null=null;
  titleEnable:boolean=false;
  sourceEnable:boolean=false;
  pubList:any;
  journal:string|null=null;
  journalList:any;
  statusId:Number=0;
  typeId:Number=0;
  verfyId:Number=0;
  searchCriteria:PatentSearchCriteria;
  patentTitle:string| null= null;
  appNo:string | null =null;
  manualCountryCode:any;
  patCountryList:any;

  constructor(private service:AdminclientService, private authservice:AuthService,private route: ActivatedRoute,
    private menuService:MenuService, private router:Router, private http: HttpClient, private facultyservice: FacultiesService) { 
    }

  ngOnInit() {
        this.menuService.isMenuOpen$.subscribe(isOpen => {
          this.isMenuOpen = isOpen;
        });
     
        this.user=this.authservice.getUserDetail();
        this.userName=this.authservice.getProfileObs();
        if(this.userName==this.supportAdmin){
        this.route.params.subscribe(params => {     
          this.universityId=params.univ; 
        });
      }
        this.service.getUniversitytitle(this.user.UserId).subscribe(x => {
          this.data = x;
          console.log(this.data)
          if(this.userName==this.supportAdmin){
          this.university = this.data.filter(item => item.universityId == this.universityId);
          console.log(this.university);
            this.name = this.university[0].universityName;
            this.universityName=this.name;
            console.log(this.name)      
          }  
        });

        this.facultyservice.getDropdown('WorkflowStatus').subscribe(x=>{
          this.statusList=x;
        });
        this.facultyservice.getDropdown('RFSType').subscribe(x=>{
          this.rfsTypeList=x;
        });
        this.facultyservice.getDropdown('CISupport').subscribe(x=>{
          this.verifiedStatusList=x;
        });
        this.facultyservice.patentCountry().subscribe(x=>{
          this.patCountryList=x;
        });

      }

         evaluate(RFSRequestId,type,pubid){
            this.router.navigate(['/Patent/evaluation',RFSRequestId,type]);
          }

          testNew(pdfLoc){
        
                if(pdfLoc!=null){
                pdfLoc=pdfLoc.slice(0, pdfLoc.lastIndexOf('.'));
                console.log(pdfLoc);             
                  this.tempPdf=pdfLoc; 

                  const pdfurl=`${environment.nodeServerUrl}/api/pdf?pdfPath=${this.tempPdf}`;
                  this.http.get(pdfurl, { responseType: 'blob' }).subscribe((blob: Blob) => {
                    const pdfUrl = URL.createObjectURL(blob);
                    window.open(pdfUrl, '_blank');
                  });
                }
                else{
                  alert("Pdf not found")
                }
                
              }

              //For search publiucation title
              // changePubTitle(x){
              //   if(x.length>3){
              //   this.titleEnable=true;
              //   this.facultyservice.getTitleList(x).subscribe(data=>{
              //   this.pubList=data;
              //   })
              //   }
              // }

              // onSelectPubTitle(val){
              //   this.publicationTitle=val;
              //   this.titleEnable=false;
              // }


              //For source/journal search
              // changeSourceTitle(x){
              //   if(x.length>3){
              //     this.sourceEnable=true;
              //     this.facultyservice.getJournal(x).subscribe(data=>{
              //       this.journalList=data;
              //     })
              //   }
              // }
              
              // onSelectSourceTitle(val){
              //   this.sourceEnable=false;
              //   this.journal=val;
              // }

              changeUniv(univID){
                   var univid=this.data.filter(item=>item.universityName==univID);
                   this.universityId=parseInt(univid[0].universityId);                  
              }

              changeStatus(statusname){
                var statusName=this.statusList.filter(item=> item.value==statusname);
                this.statusId=parseInt(statusName[0].id);
              }

              changerfsType(typeName){
                 var typename=this.rfsTypeList.filter(t=>t.value==typeName);
                 this.typeId=parseInt(typename[0].id);
              }

              changeUser(verifyuser){
                  var verifyName=this.verifiedStatusList.filter(x=>x.value==verifyuser);
                  this.verfyId=parseInt(verifyName[0].id);
              }

              searchFilter(){

                this.searchCriteria=new PatentSearchCriteria();

                if(this.manualCountryCode==undefined){
                   this.manualCountryCode=0;
                }

                this.searchCriteria.universityId=this.universityId;
                this.searchCriteria.rfsTypeId=this.typeId;
                this.searchCriteria.statusId=this.statusId;
                this.searchCriteria.patentTitle=this.publicationTitle;
                this.searchCriteria.applicationNumber=this.journal;
                this.searchCriteria.patentOfficeId=this.manualCountryCode;
                this.searchCriteria.createdById=0;
                this.searchCriteria.createdDateFrom=this.createdDateFrom;
                this.searchCriteria.createdDateTo=this.createdDateTo;
                this.searchCriteria.verifiedById=this.verfyId;
                this.searchCriteria.verifiedDateFrom=this.verifiedDateFrom;
                this.searchCriteria.verifiedDateTo=this.verifiedDateTo;
                console.log(this.searchCriteria);
 

                this.service.patentAdvSearch(this.searchCriteria,this.user.UserId,this.userName,this.universityId).subscribe(x=>{
                    this.dataList=x as any;
                    this.collectionSize=this.dataList.length;
                    console.log(this.dataList);
                    
                });
                  
              }

              refresh(){
                  this.searchCriteria=null;
                  this.universityName=null;
                  this.status=null;
                  this.createdDateFrom=null;
                  this.verifiedDateFrom=null;
                  this.publicationTitle=null;
                  this.journal=null;
                  this.rfsFilter=null;
                  this.verifiedStatus=null;
                  this.createdDateTo=null;
                  this.verifiedDateTo=null;
              }
              
      }
