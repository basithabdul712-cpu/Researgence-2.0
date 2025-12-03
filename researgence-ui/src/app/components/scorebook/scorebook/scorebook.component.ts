import { FacultiesService } from 'src/app/components/faculties/faculties.service';
import { AuthService } from './../../../shared/services/firebase/auth.service';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ScorebookService } from './../scorebook.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { HttpResponse } from '@angular/common/http';
import { ExcelExportService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-scorebook',
  templateUrl: './scorebook.component.html',
  styleUrls: ['./scorebook.component.scss','./../../../../assets/given/newcss/style.css','./../../../../assets/given/newcss/splide.min.css']
})
export class ScorebookComponent implements OnInit {
  stickyEnable:boolean=false;
  scorebookData:any=[]; 
  scorebookNew:any=[]; 
  scorebookrecord:any=[]; 
  tempscoreData:any=[];
  filterLength:any=[];   
  data:any; 
  types:any; 
  tagid:string; 
  matchValue:any; 
  scholardata: any[]; 
  facultydata: any[]; 
  userRole:string;
  userDetail:any;
  isMenuOpen: boolean;
  isScrolled = false;
  public role:any;
  public roleName:any;
  enablePic:boolean=false;
  Name:string;
  @ViewChild('blueheader') blueheader!: ElementRef<HTMLElement>;
  @ViewChild('selected') selected: ElementRef; 
  @ViewChild('items') items: ElementRef; 
  @ViewChild('ulRef', { static: true }) ulRef: ElementRef; 
  score: any;
  currentIndex:number=0;
  newUserId:any;
  univName:string;
  responseList:any;
  excelEnable:boolean;
  getUnivUrlList:any;
  univUrl:any;
  univModuleCheckList:any;
  enableScore:string;

  constructor(
    private el: ElementRef, private renderer: Renderer2, private menuService: MenuService,private excel:ExcelExportService,
    private router:Router,private service: ScorebookService,private authservice:AuthService, private facService: FacultiesService) { } 
 
  ngOnInit(){
    //for accessing menuopen 
    this.menuService.isMenuOpen$.subscribe(isOpen => {
      this.isMenuOpen = isOpen;
  });
        this.userRole=this.authservice.getProfileObs();
        this.userDetail=this.authservice.getUserDetail();
        this.univName=this.userDetail.University;
        this.Name=this.userDetail['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

          this.facService.getLayerType(this.userDetail.UniversityId,this.userRole,this.userDetail.UserId).subscribe(x=>{
                 this.getUnivUrlList=x;
                 this.univUrl=this.getUnivUrlList.universityScorebook2URL;
          });

            const data = (() => {
                try {
                  return JSON.parse(localStorage.getItem('UnivSubcripModuleConsolidated'));
                } catch (e) {
                  console.error('Failed to parse UnivSubcripModuleConsolidated from localStorage:', e);
                  return null;
                }
              })();
          // this.facService.getUnivCheckModule(this.userDetail.UniversityId).subscribe(t=>{
               this.univModuleCheckList=data.univModuleCheck;
               const filterScore= this.univModuleCheckList.filter(x=>x.moduleId=="25");
               this.enableScore = filterScore[0].isApplicable;
          // })

        this.scorebookcall();

          //For rolename getting
          // this.authservice.RoleSelection(this.userDetail.UniversityId,this.userDetail.UserId).subscribe(x=>{
            this.role=JSON.parse(localStorage.getItem('RoleSelection'));
             const datarole=this.role.filter(item=> item.roleId==this.userRole);
             this.roleName=datarole[0].roleName;
             console.log(this.roleName)
            //  });
        
            this.onWindowScroll();
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
    
    scorebookcall() {
     
      let viewScores=localStorage.getItem("viewScore");
      if(viewScores!=null){
         this.newUserId=viewScores;
         this.userRole="2";
      }
      else{
      this.newUserId=this.userDetail.UserId;
      }
      if(this.userRole=="12"){
        this.userRole="6";
        this.userDetail.UniversityId=localStorage.getItem("NewUnivId");
      }
      
      this.service.GetScorebook(this.userDetail.UniversityId,this.userRole,this.newUserId).subscribe((response: HttpResponse<any>) => {
        
        if (response.status === 200) {
          this.scorebookNew = response.body;         
          this.enablePic = true;      
        } else {
          this.enablePic = false;       
        }
      
        let results = [];
        let keys = {
          'ScoreParameter': 'ArrayData',
          'Publication': 'lineitemtext',
        };

        this.filterLength = this.scorebookNew.filter((item, i, arr) => arr.findIndex((t) => t.scoreNumber === item.scoreNumber) === i);
        
        for (let i = 0; i < this.filterLength.length; i++) {
          let filteredArray = this.scorebookNew.filter(item => item.scoreNumber === this.filterLength[i].scoreNumber);       
          if (filteredArray.length > 0) {
            let item = filteredArray[0];
            // create an empty array for each key 
            let lineItemTypes = [];
            let lineItemTexts = [];
            let lineItemCounts = [];
            // loop through filtered array and push values to respective arrays 
            filteredArray.forEach(filteredItem => {
              lineItemTypes.push(filteredItem.lineItemType);
              lineItemTexts.push(filteredItem.lineItemText);
              lineItemCounts.push(filteredItem.lineItemCount);
            });
            // map keys to array 
            item = Object.assign(item, {
              scoreParameters: lineItemTypes.map((type, index) => {
                return {
                  slNo: index,
                  lineItemText: lineItemTexts[index],
                  lineitemcount: lineItemCounts[index],
                  lineItemType: lineItemTypes[index]
                };
              })
            });
            results.push(item);
          }
        }

        this.scorebookrecord = results;
        
        this.tempscoreData=this.scorebookrecord;
        console.log(this.scorebookrecord);
        for(let i=0;i<this.scorebookrecord.length;i++){
          this.scorebookrecord[i].scoreDescription = [];

          // Iterate through scoreParameters for the current item
          for (let j = 0; j < this.scorebookrecord[i].scoreParameters.length; j++) {
              const param = this.scorebookrecord[i].scoreParameters[j];
      
              // Check if lineItemType is "Faculty" and assign the faculty information
              if (param.lineItemType === 'Faculty') {
                  this.scorebookrecord[i].scoreDescription.push(param);
              }
              
              // Check if lineItemType is "Scholar" and assign the scholar information
              if (param.lineItemType === 'Scholar') {
                  this.scorebookrecord[i].scoreDescription.push(param);
              }
              if(this.scorebookrecord[i].scoreParameters[j].lineItemText.includes("Web of Science")||this.scorebookrecord[i].scoreParameters[j].lineItemText.includes("SCOPUS")){
                this.scorebookrecord[i].scoreParameters[j].content="Indexing information is compiled from publicly available sources or user-provided data";
              }
              else{
                this.scorebookrecord[i].scoreParameters[j].content=null;
              }
          }
        }
     
      },
      (error) => {
        this.enablePic = false; // Set enablePic to true in case of an error
      });
      console.log(this.enablePic);
      
    }
    // handlePublicationsClick(score: any): void {
    //   score.showScoreCta = !score.showScoreCta;
    // }

    clicked(event) {
      
      for (let index = 0; index < this.scorebookrecord.length; index++) {
        document.getElementById("li-" + index).classList.remove('active');
        document.getElementById("tab-" + index).classList.remove('current');
      }
      event.target.classList.add('active');
      let scoreNo = event.target.getAttribute("data-scoreNo");
      document.getElementById("tab-" + scoreNo).classList.add('current');
     
    }
    isScorebookSectionDisabled(scorebookSection: string): boolean {
      // Add your conditions here
      return scorebookSection === 'Key Quality Indicators' || scorebookSection === 'Productivity Index'|| scorebookSection === 'Citations'|| scorebookSection === 'H-Index'|| scorebookSection === 'i10 Index'|| scorebookSection === 'Average Impact Factor'|| scorebookSection === 'Average Cite Score'|| scorebookSection === 'Average SNIP'|| scorebookSection === 'Collaborations'|| scorebookSection === 'Rankings';
  }

    fetchheader(scorebookSection: any) {
      if (!this.isScorebookSectionDisabled(scorebookSection)) {
      this.router.navigate(['scorebook/pub/' + scorebookSection]);
      }
    }

    fetchvisual(scorebookSection: any) {
      this.router.navigate(['scorebook/visualize/' + scorebookSection])
    }

    nextSlide(val) {
      console.log(val);
      for(let i =0; i<=this.tempscoreData.length;i++){
        if(this.tempscoreData[i] && this.tempscoreData[i].scorebookSection && this.tempscoreData[i].scorebookSection.includes(val)){
          this.currentIndex = (this.currentIndex + 1) %this.tempscoreData[i].scoreDescription.length;
        }
        
      }
    }
  
    prevSlide(val) {
      console.log(val);
      
      for(let i =0; i<=this.tempscoreData.length;i++){
        if(this.tempscoreData[i] && this.tempscoreData[i].scorebookSection && this.tempscoreData[i].scorebookSection.includes(val)){
          if(this.currentIndex>0){
          this.currentIndex = this.currentIndex - 1;
        }
          
        }
        
      }
    }

    viewDetail(modules,subModule,count:string){
      // console.log(modules);
      // console.log(subModule);
      console.log(count);
      if(count=="0 (0%)"){
       count="0";
      }
      
      if(count!="0"){
      // this.router.navigate(['scorebook/view/' + modules+'/'+subModule]);
      window.scrollTo(0, 0);
      this.excelEnable=true;
      let viewScores=localStorage.getItem("viewScore");
      if(viewScores!=null){
         this.userRole="2";
         this.newUserId=viewScores;
      }
      else{
        this.newUserId=this.userDetail.UserId;
        }
        if(this.userRole=="12"){
            this.userRole="6";
            this.userDetail.UniversityId=localStorage.getItem("NewUnivId");
        }
      this.service.getScoreBookViewList(this.userDetail.UniversityId,this.userRole,this.newUserId,modules,subModule).subscribe((x:HttpResponse<any>)=>{
        if (x.status === 200) {
          this.responseList=x.body;
          // console.log(x.body);
          this.exportExcel(this.responseList,modules,subModule);
          this.excelEnable=false;
        } 
        else {
          this.excelEnable=true;
        }  
       
         });
      }
    }


    exportExcel(val,modules,subModule) {
      let str = JSON.stringify(val);
      str = str.replace(/\"publicationId\":/g, '"Publication Id":');  
      str = str.replace(/\"publicationTitle\":/g, '"Publication Title":');
      str = str.replace(/\"sourcePublication\":/g, '"Source Title":');
      str = str.replace(/\"publicationDBName\":/g, '"Publication DB Name":');
      str = str.replace(/\"citation\":/g, '"Citation":');
      str = str.replace(/\"month\":/g, '"Month":');
      str = str.replace(/\"year\":/g, '"Year":');
      str = str.replace(/\"publisherName\":/g, '"Publisher Name":');
      str = str.replace(/\"doi\":/g, '"DOI":');
      str = str.replace(/\"volumeNumber\":/g, '"Vol No":');
      str = str.replace(/\"issueNumber\":/g, '"Issue Number ":');
      str = str.replace(/\"bPage\":/g, '"BPage":');
      str = str.replace(/\"ePage\":/g, '"EPage":');
      str = str.replace(/\"issn\":/g, '"Issn":');
      str = str.replace(/\"isbn\":/g, '"Isbn":');
      str = str.replace(/\"eisbn\":/g, '"Eisbn":');
      str = str.replace(/\"authorAffiliation\":/g, '"Author Affiliation":');
      str = str.replace(/\"homeAuthors\":/g, '"Home Authors":');
      str = str.replace(/\"homeLocation\":/g, '"Home Location":');
      str = str.replace(/\"homeSchool\":/g, '"Home School ":');
      str = str.replace(/\"homeInstitute\":/g, '"Home Institute":');
      str = str.replace(/\"homeDepartment\":/g, '"Home Department ":');

      val = JSON.parse(str);
      val.forEach((x) => {
        delete x.$$index;delete x.pubSrcType
      });
  
      this.excel.exportScorebookViewExcel(val, modules+"-"+subModule);

    }

  } 
  