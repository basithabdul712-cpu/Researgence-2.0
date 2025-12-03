import { filter } from 'rxjs/operators';
import { FacultiesService } from '../../faculties/faculties.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { AdminclientService } from '../adminclient.service';
import { ExcelExportService } from 'src/app/shared/services/excel.service';
import { DfsSourceTitleData } from '../../faculties/feedersystem-new/dfsSourceTitleData';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-source-request',
  templateUrl: './source-request.component.html',
  styleUrls: ['./source-request.component.scss', './../../../../assets/given/newcss/style.css']
})
export class SourceRequestComponent implements OnInit {

  isMenuOpen: boolean;
  user: any;
  userName: any;
  isScrolled = false;
  stickyEnable:boolean=false;
  Name:any;
  role:any;
  roleName:string;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  sourceList:any;
  enableBox:boolean=false;
  allowedTextDis:number=2;
  showSourceTitleDis:boolean=false;
  filterJournalList:any;
  sourceTitleNew:string;
  sourceTitleId:Number;
  pubSrcDisp:string;
  articleListValues:any;
  pubSourceTypeName:any;
  pubSourceTitleDis:any;
  publisherList:any;
  filterDisplayTitle:any;
  showPubTitle:boolean=false;
  pubSrcTitle:string;
  pubSrcId:Number;
  srcCountryName:any;
  countryList:any;
  srcwebLink:string;
  remarks:string="";
  srcLevel:any;
  srcpIssn:string="";
  srceIssn:string="";
  srcpIsbn:string="";
  srceIsbn:string="";
  pubSrcCntId:Number;
  pubSrcArtcileId:any;
  leveDropDownmn:any;
  dfsSourceTitleData:DfsSourceTitleData;
  sourceData:any;
  sourceNameExists:boolean=false;
  enableEvaluation:boolean=false;
  srcpIssnEt:string;
  srceIssnEt:string;
  srcpIsbnEt:string;
  srceIsbnEt:string;
  viewSourceRequestList:any;
  dfsSourceDetail:any;
  srcLevelId:Number;
  pubSrcDispEt:string;
  dfsSourceIndexing:any;
  indexData:any;
  srcCountryNameEt:string;
  tempQueueId:any;
  enableEdit:boolean=false;
  tempEditQueueId:any;
  historyEnable:boolean=false;
  sourceListHis:any;
  filterArticle:any;
  filterArticleName:string;
  statusList:any;
  articleIdFil:Number;
  statusFilId:string;
  sourceListFilter:any;
  filterTypeName:string;
  filterStatus:string
  filterArticleNameHis:string;
  filterTypeNameHis:string;
  filterStatusHis:string;
  statusFilIdHis:string;
  sourceListHisFilter:any;
  QrankdropdownScs: any;
  Qrankdropdown: any;
  rejectRemark:string="";
  UGCdropdown:any;
  ABDCdropdown:any;
  enableBook:boolean=false;
  page:number=1;
  pageSize :number=10;
  pageSizes: any[]=["10","20","50","100"];

  constructor(private authservice:AuthService,private facService:FacultiesService,private service:AdminclientService,
    private menuService:MenuService,private router:Router,private excel:ExcelExportService,private modalService: NgbModal) { }

  ngOnInit(){
     //for accessing menuopen 
     this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
    });

    this.user=this.authservice.getUserDetail();
    console.log(this.user);
    this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.userName=this.authservice.getProfileObs();
     //For rolename getting
    //  this.authservice.RoleSelection(this.user.UniversityId,this.user.UserId).subscribe(x=>{
      this.role=JSON.parse(localStorage.getItem('RoleSelection'));
      const data=this.role.filter(item=> item.roleId==this.userName);
      this.roleName=data[0].roleName;
      console.log(this.roleName)
        //  });

        //  Article type List
         this.facService.getDropdown('ArticleType').subscribe(x => {
          this.articleListValues = x; 
          this.filterArticle=x;  
        });

        // Publisher List
        this.facService.getPublisher().subscribe(x => {
          this.publisherList = x;  
        })

        // Country List
        this.facService.getAvailableCountry().subscribe(x=>{
          this.countryList=x;
        })

        // Level List
        this.facService.getDropdown('Level').subscribe(x => {
          this.leveDropDownmn = x;
          this.facService.getDropdown('WorkflowStatus').subscribe(x=>{
            this.statusList=x;        
          });
          this.facService.getSourceIndexingValue('QRankSCS').subscribe(x => {
            this.QrankdropdownScs = x;
          })
          this.facService.getSourceIndexingValue('QRankWOS').subscribe(x => {
            this.Qrankdropdown = x;
          })
          this.facService.getSourceIndexingValue('UGCCareGroup1').subscribe(x => {
            this.UGCdropdown = x;
          })
          this.facService.getSourceIndexingValue('ABDC').subscribe(x => {
            this.ABDCdropdown = x;
          })
        })

         this.GetSourceRequestList();
         this.getDataIndex();
      

    }

        //for article index and source index
      getDataIndex() {
        this.facService.getIndex().subscribe((data: any) => {
          this.indexData = data.map(item => ({
            ...item,
            IsApplicable: 0,
            indexingId: 0,
            indexingValue: ""
          }));
        });
      }
         
      // For stickey blue bar changes
      @HostListener('window:scroll')
      onWindowScroll() {
              const scrollY = window.scrollY;      
              if (this.blueheader) {
                const element = this.blueheader.nativeElement;
                
                if (scrollY >=20) {
                  element.classList.remove('bluebar_expand');
                  element.classList.add('bluebar_collapse');
                  this.stickyEnable=true;
                } else {
                  element.classList.remove('bluebar_collapse');
                  element.classList.add('bluebar_expand');
                  this.stickyEnable=false;
                }
            }
      }

      GetSourceRequestList(){
        this.service.getDfsSourceRequest(this.userName,this.user.UserId).subscribe(x=>{
                this.sourceList=x;
                this.sourceListFilter=x;
        });
      }

      addNewSource(){
        this.enableBox=true;
        this.remarks="";
        this.tempQueueId="";
        this.pubSrcDisp="";
        this.sourceTitleNew="";
        this.sourceTitleId=null;
        this.pubSourceTypeName=undefined;
        this.pubSrcTitle="";
        this.pubSrcId=null;
        this.pubSourceTitleDis="";
        this.pubSrcTitle="";
        this.pubSrcId=null;
        this.srcCountryName=undefined;
        this.pubSrcCntId=undefined;
        this.srcLevel=undefined;
        this.srcwebLink="";
        this.srcpIssn="";
        this.srceIssn="";
        this.srcpIsbn="";
        this.srceIsbn="";
        this.sourceNameExists=false;
      }

        closeAdd(){
          this.enableBox=false;  
          this.tempQueueId="";
          this.pubSrcDisp="";
          this.sourceTitleNew="";
          this.sourceTitleId=null;
          this.pubSourceTypeName=undefined;
          this.pubSrcTitle="";
          this.pubSrcId=null;
          this.pubSourceTitleDis="";
          this.pubSrcTitle="";
          this.pubSrcId=null;
          this.srcCountryName=undefined;
          this.pubSrcCntId=undefined;
          this.srcLevel=undefined;
          this.srcwebLink="";
          this.srcpIssn="";
          this.srceIssn="";
          this.srcpIsbn="";
          this.srceIsbn="";
        }

    // Typing in Source Title
      onKeySourcePubSrc(val) {
        if(val.length==0){
          this.allowedTextDis=2;
          this.showSourceTitleDis = false;
        }
        if(val.length>this.allowedTextDis){
        this.showSourceTitleDis = true;
        this.facService.getJournal(val).subscribe(x => {
          this.filterJournalList = x;
          this.allowedTextDis=this.allowedTextDis+2;
          if (this.filterJournalList.length == 0||this.filterJournalList.length=="") {
            this.showSourceTitleDis = false;
            this.sourceTitleNew=val;
            this.sourceTitleId=0;
            this.sourceNameExists=false;
          }
        })
      }
    }

    // On selecting source title
      onSelectSourcePubSrc(dispname,name, id) {
        this.pubSrcDisp=dispname;
        this.sourceTitleNew = name;
        this.showSourceTitleDis = false;
        this.sourceTitleId = id;
        this.facService.getSourceField(id).subscribe(x => {
          this.sourceData = x;
          if (this.sourceData.length > 0) {
              this.pubSourceTypeName = this.sourceData[0].articleType;
              this.pubSourceTitleDis = this.sourceData[0].publisher;
              this.srceIssn = this.sourceData[0].eissn;
              this.srcpIssn = this.sourceData[0].pissn;
              this.srcLevel = this.sourceData[0].level; 
              this.sourceNameExists=true;
          }
          else{
            this.sourceNameExists=false;
          }
        });
        this.allowedTextDis=2;
      }

      // On Typing in Publisher name
      changePubSrcTitle(val){   
        this.filterDisplayTitle=this.publisherList.filter(item => item.displayName.toLowerCase().includes(val.toLowerCase()));
        this.showPubTitle=true;
        if(val==""){
          this.showPubTitle=false;
        }
        if(this.filterDisplayTitle.length==0){
          this.pubSrcTitle=val;
          this.pubSrcId=0;
          this.showPubTitle=false;
        }
      }

      // On selecting publisher name
      onSelectPubSrcTitle(dispname,name,id){
        this.pubSourceTitleDis=dispname;
        this.pubSrcTitle=name;
        this.pubSrcId=id;
        this.showPubTitle=false;
      }

        // Save new publication source
      submitSrcData(){
        
        if(this.pubSourceTypeName=="Book"){
            this.enableBook=true;     
        }
        else if(this.pubSourceTypeName=="Book Chapter"){
          this.enableBook=true;
        }
             
        if(this.pubSrcDisp!=undefined&&this.pubSourceTypeName!=""&&this.pubSourceTitleDis!=undefined&&this.srcLevel!=undefined){
          if(this.srceIssn==""&&this.srcpIssn==""&&this.pubSourceTypeName=="Journal"){
            alert("Issn value cannot be empty")
           
          } 
         else if(this.srceIssn==this.srcpIssn&&this.pubSourceTypeName=="Journal"){
            alert("Issn and EIssn values cannot be same")
          }
          else if(this.srcpIsbn==""&&this.srceIsbn==""&&this.enableBook){
              alert("Isbn value cannot be empty")
             
            }
          else if(this.srcpIsbn==this.srceIsbn&&this.enableBook){
              alert("Isbn and EIsbn values cannot be same")
            }
          else{
                if(this.pubSourceTypeName!=null||this.pubSourceTypeName!=undefined){
                  const pubSrcId=this.articleListValues.filter(item=> item.value==this.pubSourceTypeName);
                  this.pubSrcArtcileId=pubSrcId[0].id;
                }
                else{
                  this.pubSrcArtcileId=0;
                  this.pubSourceTypeName="";
                }
                if(this.srcCountryName!=undefined||this.srcCountryName!=null){
                const countId=this.countryList.filter(x=>x.countryName==this.srcCountryName);
                this.pubSrcCntId=countId[0].countryId;
                }
                else{
                  this.pubSrcCntId=0;
                }
                if(this.srcLevel!=undefined||this.srcLevel!=null){
                  const levelFil=this.leveDropDownmn.filter(x=>x.value==this.srcLevel);
                  this.srcLevelId=levelFil[0].id;
                  }
                  else{
                    this.srcLevelId=0;
                  }

                  this.dfsSourceTitleData= new DfsSourceTitleData();
                  this.dfsSourceTitleData.dfsPubSourceQueueId=0;
                  this.dfsSourceTitleData.universityId=1;
                  this.dfsSourceTitleData.userId=parseInt(this.user.UserId);
                  this.dfsSourceTitleData.publisherId=this.pubSrcId;
                  this.dfsSourceTitleData.publisherName=this.pubSrcTitle;
                  this.dfsSourceTitleData.publisherCountryId=this.pubSrcCntId;
                  this.dfsSourceTitleData.publicationSourceId=this.sourceTitleId;
                  this.dfsSourceTitleData.publicationSourceName=this.sourceTitleNew;
                  this.dfsSourceTitleData.levelId=this.srcLevelId;
                  this.dfsSourceTitleData.levelName=this.srcLevel;
                  this.dfsSourceTitleData.webLink=this.srcwebLink;
                  this.dfsSourceTitleData.articleTypeId=parseInt(this.pubSrcArtcileId);
                  this.dfsSourceTitleData.articleTypeName=this.pubSourceTypeName;
                  this.dfsSourceTitleData.issn=this.srcpIssn;
                  this.dfsSourceTitleData.eissn=this.srceIssn;
                  this.dfsSourceTitleData.isbn=this.srcpIsbn;
                  this.dfsSourceTitleData.eisbn=this.srceIsbn;
                  this.dfsSourceTitleData.actionTypeId=2;
                  this.dfsSourceTitleData.remark=this.remarks;
                  this.dfsSourceTitleData.takenBy=0;
                  this.dfsSourceTitleData.verifiedBy=0;

                  console.log(this.dfsSourceTitleData);
                      const confirmation = confirm('Please confirm to save detail');
                      if (confirmation) {              
                        this.facService.saveDFSSrcTitle(this.dfsSourceTitleData,this.user.UserId,this.userName).subscribe(x=>{
                            this.enableBox=false;
                            this.pubSrcDisp="";
                            this.sourceTitleNew="";
                            this.sourceTitleId=null;
                            this.pubSourceTypeName="";
                            this.pubSrcTitle="";
                            this.pubSrcId=null;
                            this.pubSourceTitleDis="";
                            this.pubSrcTitle="";
                            this.pubSrcId=null;
                            this.srcCountryName=undefined;
                            this.pubSrcCntId=undefined;
                            this.srcLevel=undefined;
                            this.srcwebLink="";
                            this.srcpIssn="";
                            this.srceIssn="";
                            this.srcpIsbn="";
                            this.srceIsbn="";
                            this.GetSourceRequestList();
                          });
                        }
                        else{ }
                     
                    }
                  }
                else{
                  alert("Please fill all fields");
                }
        } 

      clearSrcData(){
          this.pubSrcDisp="";
          this.sourceTitleNew="";
          this.sourceTitleId=null;
          this.pubSourceTypeName=undefined;
          this.pubSrcTitle="";
          this.pubSrcId=null;
          this.pubSourceTitleDis="";
          this.pubSrcTitle="";
          this.pubSrcId=null;
          this.srcCountryName=undefined;
          this.pubSrcCntId=undefined;
          this.srcLevel=undefined;
          this.srcwebLink="";
          this.srcpIssn="";
          this.srceIssn="";
          this.srcpIsbn="";
          this.srceIsbn="";
          this.sourceNameExists=false;
      }

    evaluateSourceRequest(queueId,sourceId){
      this.enableEvaluation=true;
      this.tempQueueId=queueId;
      if(sourceId==""||sourceId==null){
        sourceId="0";
      }
        this.service.viewDfsSourceRequest(queueId,sourceId).subscribe(x=>{
          console.log(x);  
            this.viewSourceRequestList=x;
          if(this.viewSourceRequestList){
             this.dfsSourceDetail=this.viewSourceRequestList.dfsPublicationSource;
             this.pubSourceTitleDis=this.dfsSourceDetail.publisherName;
             this.pubSrcDisp=this.dfsSourceDetail.publicationSourceName;
               if(this.dfsSourceDetail.publisherCountryId!=0){
                    const countId=this.countryList.filter(x=>x.countryId== this.dfsSourceDetail.publisherCountryId);      
                    this.srcCountryNameEt=countId[0].countryName; 
                }
                if(this.dfsSourceDetail.levelId==0){
                  this.dfsSourceDetail.level=undefined;  
                }     
             if(this.viewSourceRequestList.dfsSourceIndexing.length>0){
                  this.dfsSourceIndexing=this.viewSourceRequestList.dfsSourceIndexing;

                  for(let i=0;i<this.indexData.length;i++){
                     if(this.indexData[i].type=="SourceIndexing"){
                        for(let j=0;j<this.dfsSourceIndexing.length;j++){    
                            if(this.indexData[i].fieldName==this.dfsSourceIndexing[j].fieldName){
                               this.indexData[i].indexingValue=this.dfsSourceIndexing[j].indexingValue;
                               if(this.dfsSourceIndexing[j].indexingValue!=""){
                                this.indexData[i].IsApplicable=1;
                               }
                            }
                         }
                       }
                  };
                  console.log(this.indexData);
              }
           }
        }); 
    }

    changeCountry(val){
      const countId=this.countryList.filter(x=>x.countryName==val);
      this.dfsSourceDetail.publisherCountryId=countId[0].countryId
    }

    changeLevel(val){
      const levelId=this.leveDropDownmn.filter(x=>x.value==val);
      this.dfsSourceDetail.levelId=levelId[0].id;     
    }

    sourceTypeValue(val){
       const sourcetypeId=this.articleListValues.filter(x=>x.value==val);
       this.dfsSourceDetail.pubSrcArticleTypeId=sourcetypeId[0].id;
    }

    closeEvaluate(){
      this.tempQueueId="";
        this.enableEvaluation=false;
        this.pubSourceTitleDis="";
        this.pubSrcDisp="";
    }

    acceptRequest(){

      const dfsPublicationSource= {
        publicationSourceId: this.dfsSourceDetail.publicationSourceId,
        publicationSourceName: this.dfsSourceDetail.publicationSourceName,
        pubSrcArticleTypeId: this.dfsSourceDetail.pubSrcArticleTypeId,
        pubSrcArticleTypeName: this.dfsSourceDetail.pubSrcArticleTypeName,
        levelId: this.dfsSourceDetail.levelId,
        level: this.dfsSourceDetail.level,
        webLink: this.dfsSourceDetail.webLink,
        publisherId: this.dfsSourceDetail.publisherId,
        publisherName: this.dfsSourceDetail.publisherName,
        publisherCountryId: this.dfsSourceDetail.publisherCountryId,
        pissn: this.dfsSourceDetail.pissn,
        eissn: this.dfsSourceDetail.eissn,
        pisbn: this.dfsSourceDetail.pisbn,
        eisbn: this.dfsSourceDetail.eisbn,
        pubSrcRemark: this.dfsSourceDetail.pubSrcRemark,
        actionTypeId: this.dfsSourceDetail.actionTypeId
      };

        const data={
          dfsPublicationSource:dfsPublicationSource,
          dfsSourceIndexing:this.indexData
        }

         console.log(data);   
         const confirmET=confirm("Do you want to Approve Request");
         if(confirmET){
            if(this.tempQueueId!=""){
            this.service.saveDFSSourceRequest(data,this.user.UserId,this.userName,this.tempQueueId).subscribe(x=>{
               this.tempQueueId="";
               this.enableEvaluation=false;
               this.pubSourceTitleDis="";
               this.pubSrcDisp="";
               this.GetSourceRequestList();
             });
            }
          }
          else{           
          }
      }

        // On Typing in Publisher name
      changePubSrcTitleET(val){   
        this.filterDisplayTitle=this.publisherList.filter(item => item.displayName.toLowerCase().includes(val.toLowerCase()));
        this.showPubTitle=true;
        if(val==""){
          this.showPubTitle=false;
        }
        if(this.filterDisplayTitle.length==0){
          this.dfsSourceDetail.publisherName=val;
          this.dfsSourceDetail.publisherId=0;
          this.showPubTitle=false;
        }
      }

      // On selecting publisher name
      onSelectPubSrcTitleET(dispname,name,id){
        this.pubSourceTitleDis=dispname;
        this.dfsSourceDetail.publisherName=name;
        this.dfsSourceDetail.publisherId=id;
        this.showPubTitle=false;
      }

      // Typing in Source Title
      onKeySourcePubSrcET(val) {
        if(val.length==0){
          this.allowedTextDis=2;
          this.showSourceTitleDis = false;
        }
        if(val.length>this.allowedTextDis){
        this.showSourceTitleDis = true;
        this.facService.getJournal(val).subscribe(x => {
          this.filterJournalList = x;
          this.allowedTextDis=this.allowedTextDis+2;
          if (this.filterJournalList.length == 0||this.filterJournalList.length=="") {
            this.showSourceTitleDis = false;
            this.dfsSourceDetail.publicationSourceName=val;
            this.dfsSourceDetail.publicationSourceId=0;
            this.sourceNameExists=false;
          }
        })
       }
      }

      // On selecting source title
    onSelectSourcePubSrcET(dispname,name, id) {
      this.pubSrcDisp=dispname;
      this.dfsSourceDetail.publicationSourceName = name;
      this.showSourceTitleDis = false;
      this.dfsSourceDetail.publicationSourceId = id;
      this.facService.getSourceField(id).subscribe(x => {
        this.sourceData = x;
        console.log(x);
        
        if (this.sourceData.length > 0) {
            this.dfsSourceDetail.pubSrcArticleTypeName = this.sourceData[0].articleType;
            this.dfsSourceDetail.pubSrcArticleTypeId=this.sourceData[0].articleTypeId;
            this.pubSourceTitleDis = this.sourceData[0].publisher;
            this.dfsSourceDetail.publisherName=this.sourceData[0].publisher;
            this.dfsSourceDetail.publisherId=this.sourceData[0].publisherId;
            this.dfsSourceDetail.eissn = this.sourceData[0].eissn;
            this.dfsSourceDetail.pissn = this.sourceData[0].pissn;
            // this.srcLevel = this.sourceData[0].level; 
            this.sourceNameExists=true;
        }
        else{
          this.sourceNameExists=false;
        }
      });
      this.allowedTextDis=2;
    }

      cancelSourceReq(){
        this.tempQueueId="";
        this.enableEvaluation=false;
        this.pubSourceTitleDis="";
        this.pubSrcDisp="";
      }

      rejectRequest(modal){
        this.enableEvaluation=false;
        this.modalService.open(modal);
      }
      
      processRejectData(){


        this.dfsSourceTitleData= new DfsSourceTitleData();
        this.dfsSourceTitleData.dfsPubSourceQueueId= this.tempQueueId;
        this.dfsSourceTitleData.universityId=1;
        this.dfsSourceTitleData.userId=parseInt(this.user.UserId);
        this.dfsSourceTitleData.publisherId=this.dfsSourceDetail.publisherId;
        this.dfsSourceTitleData.publisherName=this.dfsSourceDetail.publisherName;
        this.dfsSourceTitleData.publisherCountryId=this.dfsSourceDetail.publisherCountryId;
        this.dfsSourceTitleData.publicationSourceId=this.dfsSourceDetail.publicationSourceId;
        this.dfsSourceTitleData.publicationSourceName=this.dfsSourceDetail.publicationSourceName;
        this.dfsSourceTitleData.levelId=this.dfsSourceDetail.levelId;
        this.dfsSourceTitleData.levelName=this.dfsSourceDetail.level;
        this.dfsSourceTitleData.webLink=this.dfsSourceDetail.webLink;
        this.dfsSourceTitleData.articleTypeId=parseInt(this.dfsSourceDetail.pubSrcArticleTypeId);
        this.dfsSourceTitleData.articleTypeName=this.dfsSourceDetail.pubSrcArticleTypeName;
        this.dfsSourceTitleData.issn=this.dfsSourceDetail.pissn;
        this.dfsSourceTitleData.eissn=this.dfsSourceDetail.eissn;
        this.dfsSourceTitleData.isbn=this.dfsSourceDetail.pisbn;
        this.dfsSourceTitleData.eisbn=this.dfsSourceDetail.eisbn;
        this.dfsSourceTitleData.actionTypeId=3;
        this.dfsSourceTitleData.remark=this.rejectRemark;
        this.dfsSourceTitleData.takenBy=0;
        this.dfsSourceTitleData.verifiedBy=0;
   
           const confirmET=confirm("Do you want to Reject Request");
           if(confirmET){
            this.facService.saveDFSSrcTitle(this.dfsSourceTitleData,this.user.UserId,this.userName).subscribe(x=>{
              this.rejectRemark="";
                  this.GetSourceRequestList();
                  this.modalService.dismissAll();
               });
            }
            else{           
            }
      }

      cancelReq(){
        this.modalService.dismissAll();
      }

      editRequest(queueId,sourceId){
        this.enableEdit=true;
        this.tempEditQueueId=queueId;
        if(sourceId==null||sourceId==""){
          sourceId='0';
        }
        this.service.viewDfsSourceRequest(queueId,sourceId).subscribe(x=>{
          console.log(x);  
            this.viewSourceRequestList=x;
          if(this.viewSourceRequestList){
             this.dfsSourceDetail=this.viewSourceRequestList.dfsPublicationSource;
               if(this.dfsSourceDetail.publisherCountryId!=0){
                    const countId=this.countryList.filter(x=>x.countryId== this.dfsSourceDetail.publisherCountryId);      
                    this.srcCountryNameEt=countId[0].countryName; 
                }
                if(this.dfsSourceDetail.levelId==0){
                  this.dfsSourceDetail.level=undefined;  
                }
                    this.pubSourceTitleDis=this.dfsSourceDetail.publisherName;
                    this.pubSrcDisp=this.dfsSourceDetail.publicationSourceName;
             if(this.viewSourceRequestList.dfsSourceIndexing.length>0){
                  this.dfsSourceIndexing=this.viewSourceRequestList.dfsSourceIndexing;

                  for(let i=0;i<this.indexData.length;i++){
                     if(this.indexData[i].type=="SourceIndexing"){
                        for(let j=0;j<this.dfsSourceIndexing.length;j++){    
                            if(this.indexData[i].fieldName==this.dfsSourceIndexing[j].fieldName){
                               this.indexData[i].indexingValue=this.dfsSourceIndexing[j].indexingValue;
                               if(this.dfsSourceIndexing[j].indexingValue!=""){
                                this.indexData[i].IsApplicable=1;
                               }
                            }
                         }
                       }
                  };
                  console.log(this.indexData);
              }
           }
        }); 
      }

      closeEdit(){
        this.enableEdit=false;
        this.tempEditQueueId="";
        this.pubSourceTitleDis="";
        this.pubSrcDisp="";
      }

      cancelSourceReqEdit(){
        this.tempEditQueueId="";
        this.enableEdit=false;
        this.pubSourceTitleDis="";
        this.pubSrcDisp="";
      }
 
      submitEditRequest(){
        this.dfsSourceTitleData= new DfsSourceTitleData();
        this.dfsSourceTitleData.dfsPubSourceQueueId=this.tempEditQueueId;
        this.dfsSourceTitleData.universityId=1;
        this.dfsSourceTitleData.userId=parseInt(this.user.UserId);
        this.dfsSourceTitleData.publisherId=this.dfsSourceDetail.publisherId;
        this.dfsSourceTitleData.publisherName=this.dfsSourceDetail.publisherName;
        this.dfsSourceTitleData.publisherCountryId=this.dfsSourceDetail.publisherCountryId;
        this.dfsSourceTitleData.publicationSourceId=this.dfsSourceDetail.publicationSourceId;
        this.dfsSourceTitleData.publicationSourceName=this.dfsSourceDetail.publicationSourceName;
        this.dfsSourceTitleData.levelId=this.dfsSourceDetail.levelId;
        this.dfsSourceTitleData.levelName=this.dfsSourceDetail.level;
        this.dfsSourceTitleData.webLink=this.srcwebLink;
        this.dfsSourceTitleData.articleTypeId=this.dfsSourceDetail.pubSrcArticleTypeId;
        this.dfsSourceTitleData.articleTypeName=this.dfsSourceDetail.pubSrcArticleTypeName;
        this.dfsSourceTitleData.issn=this.dfsSourceDetail.pissn;
        this.dfsSourceTitleData.eissn=this.dfsSourceDetail.eissn;
        this.dfsSourceTitleData.isbn=this.dfsSourceDetail.pisbn;
        this.dfsSourceTitleData.eisbn=this.dfsSourceDetail.eisbn;
        this.dfsSourceTitleData.actionTypeId=4;
        this.dfsSourceTitleData.remark=this.dfsSourceDetail.pubSrcRemark;
        this.dfsSourceTitleData.takenBy=0;
        this.dfsSourceTitleData.verifiedBy=0;

           const confirmET=confirm("Do you want to Update Request");
           if(confirmET){
              if(this.tempEditQueueId!=""){
              this.facService.saveDFSSrcTitle(this.dfsSourceTitleData,this.user.UserId,this.userName).subscribe(x=>{
                 this.tempEditQueueId="";
                 this.enableEdit=false;
                this.pubSourceTitleDis="";
                this.pubSrcDisp="";
                this.dfsSourceTitleData= new DfsSourceTitleData();
                this.GetSourceRequestList();
               });
              }
            }
            else{           
            }
        }

        deleteRequest(queueId:Number){

          this.dfsSourceTitleData= new DfsSourceTitleData();
          this.dfsSourceTitleData.dfsPubSourceQueueId=queueId;
          this.dfsSourceTitleData.universityId=1;
          this.dfsSourceTitleData.userId=parseInt(this.user.UserId);
          this.dfsSourceTitleData.publisherId=this.dfsSourceDetail.publisherId;
          this.dfsSourceTitleData.publisherName=this.dfsSourceDetail.publisherName;
          this.dfsSourceTitleData.publisherCountryId=this.dfsSourceDetail.publisherCountryId;
          this.dfsSourceTitleData.publicationSourceId=this.dfsSourceDetail.publicationSourceId;
          this.dfsSourceTitleData.publicationSourceName=this.dfsSourceDetail.publicationSourceName;
          this.dfsSourceTitleData.levelId=this.dfsSourceDetail.levelId;
          this.dfsSourceTitleData.levelName=this.dfsSourceDetail.level;
          this.dfsSourceTitleData.webLink=this.srcwebLink;
          this.dfsSourceTitleData.articleTypeId=this.dfsSourceDetail.pubSrcArticleTypeId;
          this.dfsSourceTitleData.articleTypeName=this.dfsSourceDetail.pubSrcArticleTypeName;
          this.dfsSourceTitleData.issn=this.dfsSourceDetail.pissn;
          this.dfsSourceTitleData.eissn=this.dfsSourceDetail.eissn;
          this.dfsSourceTitleData.isbn=this.dfsSourceDetail.pisbn;
          this.dfsSourceTitleData.eisbn=this.dfsSourceDetail.eisbn;
          this.dfsSourceTitleData.actionTypeId=5;
          this.dfsSourceTitleData.remark=this.dfsSourceDetail.pubSrcRemark;
          this.dfsSourceTitleData.takenBy=0;
          this.dfsSourceTitleData.verifiedBy=0;

             const confirmET=confirm("Do you want to Delete Request");
             if(confirmET){
                this.facService.saveDFSSrcTitle(this.dfsSourceTitleData,this.user.UserId,this.userName).subscribe(x=>{
                     this.GetSourceRequestList();
                 });
              }
              else{           
              }
          }

          checkHistory(){

            this.historyEnable=true;
            this.service.viewSourceListHistory(this.userName,this.user.UserId,12).subscribe(x=>{
              this.sourceListHis=x;
              this.sourceListHisFilter=x;
            });

          }

          toSourceList(){
            this.historyEnable=false;
          }

          // changeArticleFil(val){
          //       const articleList=this.filterArticle.filter(item => item.value==val);
          //       this.articleIdFil=articleList[0].id;
          // }

          changeFilterStatus(val){
                if(val!=""){
                const statusList=this.statusList.filter(x => x.value==val)
                this.statusFilId=statusList[0].id
              }
              else{
                this.statusFilId="";
              }
          }

          filterAll(){
            
            if(this.filterArticleName===""&&this.statusFilId===""&&this.filterTypeName===""){
             this.GetSourceRequestList();
            }
            this.sourceList=this.sourceListFilter?.filter(item =>
              (this.filterArticleName.length === 0 || this.filterArticleName.includes(item.pubSrcArticleTypeName)) &&
              (this.statusFilId.length === 0 || this.statusFilId.includes(item.workflowstatusId)) &&
              (this.filterTypeName.length === 0 || this.filterTypeName.includes(item.actionType)))
          }

          changeFilterStatusHis(val){
            if(val!=""){
              const statusList=this.statusList.filter(x => x.value==val)
              this.statusFilIdHis=statusList[0].id
            }
            else{
              this.statusFilIdHis="";
            }
          }

          filterAllHis(){
            
            if(this.filterArticleNameHis===""&&this.statusFilIdHis===""&&this.filterTypeNameHis===""){
              this.service.viewSourceListHistory(this.userName,this.user.UserId,12).subscribe(x=>{
                this.sourceListHis=x;
              });
            }
            this.sourceListHis=this.sourceListHisFilter?.filter(item =>
              (this.filterArticleNameHis.length === 0 || this.filterArticleNameHis.includes(item.pubSrcArticleTypeName)) &&
              (this.statusFilIdHis.length === 0 || this.statusFilIdHis.includes(item.workflowstatusId)) &&
              (this.filterTypeNameHis.length === 0 || this.filterTypeNameHis.includes(item.actionType)));
          }

          onPageSizeChange(size: string){
            this.page=1;
            this.pageSize = Number(size);
          }

        }

       
