import { FacultiesService } from './../../../faculties/faculties.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { PubSearchList } from 'src/app/shared/model/PostPayload';
import { string } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-journal-advance-search',
  templateUrl: './journal-advance-search.component.html',
  styleUrls: ['./journal-advance-search.component.scss',"../../../../../assets/given/newcss/journal-detail-bootstrap.min.css"]
})
export class JournalAdvanceSearchComponent implements OnInit {

  backURL: string;
  homeURL: string;
  sourceNameData:string;
  sourceNameOpen:boolean=false;
  filterJournal:any;
  allowedText:number=2;
  technologyArea:any;
  issnNumber:any;
  showDropDown:boolean;
  databaseDropDown:any;
  multidatabase: any[];
  selectDB:any[];
  checkedList : any[];
  currentSelected : {};
  andorType:any;
  quartile: string[] = [];
  wosQuartile:  string[] = [];
  AllQuartiles:string[]=[];
  pubName:any;
  pubLevel:any;
  row = [
    {
      qualityscore: '',
      citattionrangefrom: '',
      citattionrangeto: '',
    }
  ];
  qualityScoreList:any;
  showTrashIcon: boolean = false;
  publisherList:any;
  enblePublisher:boolean=false;
  filterPublisher:any;
  user:any;
  Name:string;
  accessType:any;
  subcripstionList:any;
  streamList:any;
  streamType:any;
  pubId:string;
  sourceId:string;
  pubSearchList: PubSearchList[];
  streamId:string;
  accessId:string;
  userRole:any;

  constructor(private router: Router,private facService:FacultiesService,private authService:AuthService) {
    this.checkedList = [];
    this.selectDB=[];
   }

     ngOnInit(){

          this.backURL = "/journal-search";
          this.homeURL = "/Home";
          this.user=this.authService.getUserDetail();
          this.userRole=this.authService.getProfileObs();
          this.Name=this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          this.facService.getDropdown('publicationdb').subscribe(x=>{
            this.databaseDropDown=x;
          });
            // For Quality scores
            this.facService.getSourceIndexingValue('QUALITYSCORE').subscribe(x=>{
              this.qualityScoreList=x;   
            });
            
            this.facService.getPublisher().subscribe(x=>{
                this.publisherList=x;
                this.filterPublisher=this.publisherList      
            });

            this.facService.getSubType().subscribe(x=>{
              this.subcripstionList=x;
            });

            this.facService.getStreamList().subscribe(x=>{
              this.streamList=x;
            })
  
     }

      onKeySource(x, val) {
        console.log(x);
        console.log(val);
      
        if(val.length==0){
          this.allowedText=2;
          this.sourceNameOpen = false;
        }
        if(val.length>this.allowedText){
        this.facService.getJournal(val).subscribe(x => {
          this.filterJournal = x;
          this.sourceId=null;
          this.allowedText=this.allowedText+2;
          this.sourceNameOpen=true;
          if (this.filterJournal.length == 0||this.filterJournal.length=="") {
            this.sourceNameOpen = false;
            }
          })
        }  
      }

      onSelectSource(name, id) {
              console.log(name+"---"+id);
            this.sourceNameData=name;
            this.sourceId=id;
            this.sourceNameOpen = false;
      }

      getSelectedValue(status: boolean, value: string, id: any): void {
        if (status) {
          this.selectDB.push(value);
          this.checkedList.push({ id: id, value: value });
        } else {
          // If the checkbox is unchecked, remove from selectDB and checkedList
          const indexInSelectDB = this.selectDB.indexOf(value);
          if (indexInSelectDB !== -1) {
            this.selectDB.splice(indexInSelectDB, 1);
          }
          const indexInCheckedList = this.checkedList.findIndex(item => item.value === value);
          if (indexInCheckedList !== -1) {
            this.checkedList.splice(indexInCheckedList, 1);
          }
        }
        this.currentSelected = { checked: status, name: value };
        console.log(this.checkedList);

      }

        updateSelectedValues(pub:string, value: string, isChecked: boolean) {
          if (!this.quartile) {
            this.quartile = [];
          }
          if (!this.wosQuartile) {
            this.wosQuartile = [];
          }
        
          // Check which checkbox is being updated and update the corresponding array
          if (isChecked) {
          
            if (value.startsWith('Q')) {
              // Check if it's a "Q" value, then add to both arrays
              this.quartile.push(value);
          }  else if (value.startsWith('W')) {
              // Check if it starts with "W" (for "WOS Quartile"), then add to the WOS array only
              this.wosQuartile.push(pub);     
            }
          } else {
            // If checkbox is unchecked, remove from both arrays if present
            const indexInQuartile = this.quartile.indexOf(value);
            if (indexInQuartile !== -1) {
              this.quartile.splice(indexInQuartile, 1);
            }
            const indexInWOSQuartile = this.wosQuartile.indexOf(pub);
            if (indexInWOSQuartile !== -1) {
              this.wosQuartile.splice(indexInWOSQuartile, 1);
            }
          } 
          // Log the updated arrays for debugging
          console.log('Quartile:', this.quartile);
          console.log('WOS Quartile:', this.wosQuartile);
        }

          userall(val) {
                    this.AllQuartiles.push(val);
                if(this.AllQuartiles.length==1){
                  this.quartile=['Q1','Q2','Q3','Q4'];
                  this.wosQuartile=['Q1','Q2','Q3','Q4'];
                  console.log(this.quartile);
                  console.log(this.wosQuartile);             
                }
                else {
                this.AllQuartiles=[]
                  this.quartile=[];
                  this.wosQuartile=[];
                  console.log(this.quartile);
                  console.log(this.wosQuartile);                 
                }
            }

            individualCheckboxes(val:string){
              if(this.quartile.length < 4 || this.wosQuartile.length < 4){
                  this.AllQuartiles = [];
              }else if(this.quartile.length >=4 || this.wosQuartile.length >=4){
                  this.AllQuartiles.push(val)
                  this.quartile=['Q1','Q2','Q3','Q4'];
                  this.wosQuartile=['Q1','Q2','Q3','Q4'];
              }
          }

                  //Add quality score
                  add(){
                    console.log(this.row.length);
                    const obj = {
                      qualityscore: '',
                      citattionrangefrom: '',
                      citattionrangeto: '',
                    };    
                    this.row.push(obj);
                    this.showTrashIcon = true;
                  }

                  // To remove quality score
                  removeRow(index:any){       
                    this.row.splice(index,1);        
                  }

                  // To check quality score is already available 
                  checkQualityScore(i,score){
                    if(this.row.length>0){
                      let checkAvailablity=this.row.filter(item => item.qualityscore==score);
                      console.log(checkAvailablity);         
                      if(checkAvailablity.length>1){
                        alert("Already selected");
                        this.row.splice(i,1);
                      }
                    }  
                  }

                  onSelectPub(name,id){
                         this.pubName=name;
                         this.pubId=id.toString();
                         this.enblePublisher=false;
                  }

                  changePub(name){
                    this.enblePublisher=true;
                    this.pubId=null;
                    this.filterPublisher=this.publisherList.filter(x=>x.name.toLowerCase().includes(name.toLowerCase()));
                    if(name==""){
                      this.enblePublisher=false;
                    }
                  }


                  onSearch(){

                    this.pubSearchList=[  {
                      columnName: "ARTICLETYPE",
                      searchType: "Like",
                      searchId: null,
                      searchValue: "Journal",
                      rangeFrom: null,
                      rangeTo: null,
                    },
                  ];

                  if(this.sourceNameData!=undefined){
                    this.pubSearchList.push({
                      columnName: "PUBLICATIONSOURCE",
                      searchType: "Like",
                      searchId: this.sourceId,
                      searchValue: this.sourceNameData,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }

                  if(this.technologyArea!=undefined){
                    this.pubSearchList.push({
                      columnName: "TECHNOLOGYAREA",
                      searchType: "Like",
                      searchId: null,
                      searchValue: this.technologyArea,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }

                  if(this.streamType!=undefined){
                  const stream=this.streamList.filter(item=>item.value==this.streamType);
                  this.streamId=stream[0].id;
                    this.pubSearchList.push({
                      columnName: "STREAM",
                      searchType: "Like",
                      searchId: this.streamId,
                      searchValue: this.streamType,
                      rangeFrom: null,
                      rangeTo: null,
                    });
                  }

                  if(this.accessType!=undefined){
                    const acc=this.subcripstionList.filter(item=>item.value==this.accessType);
                    this.accessId=acc[0].id;
                      this.pubSearchList.push({
                        columnName: "SubscriptionType",
                        searchType: "Like",
                        searchId: this.accessId,
                        searchValue: this.accessType,
                        rangeFrom: null,
                        rangeTo: null,
                      });
                    }
                    
                    if(this.pubName!=undefined){
                        this.pubSearchList.push({
                          columnName: "PUBLISHER",
                          searchType: "Like",
                          searchId: this.pubId,
                          searchValue: this.pubName,
                          rangeFrom: null,
                          rangeTo: null,
                        });
                      }
                      
                      if(this.issnNumber!=undefined){
                        this.pubSearchList.push({
                          columnName: "ISSNNO",
                          searchType: "Like",
                          searchId: null,
                          searchValue: this.issnNumber,
                          rangeFrom: null,
                          rangeTo: null,
                        });
                      }

                      if(this.pubLevel!=undefined){
                        this.pubSearchList.push({
                          columnName: "PublicationSourceLevel",
                          searchType: "Like",
                          searchId: null,
                          searchValue: this.pubLevel,
                          rangeFrom: null,
                          rangeTo: null,
                        });
                      }

                      if (this.quartile.length>0) {
                                     
                        let quartileString = this.quartile.map(q => `${q}`).join(', ');
  
                          this.pubSearchList.push({
                            columnName: "Scsquartile",
                            searchType: "In",
                            searchId: null,
                            searchValue: quartileString,
                            rangeFrom: null,
                            rangeTo: null,
                          });
                        } 
                        if (this.wosQuartile.length>0) {
                                       
                          let wosquartileString = this.wosQuartile.map(q => `${q}`).join(', ');
    
                            this.pubSearchList.push({
                              columnName: "Wosquartile",
                              searchType: "In",
                              searchId: null,
                              searchValue: wosquartileString,
                              rangeFrom: null,
                              rangeTo: null,
                            });
                          }     
                          
                          if(this.checkedList.length>0){
                            // convert list to string and separte by values from List od DB
                            let ids = this.checkedList.map(item => item.id).join(',');
                            let values = this.checkedList.map(item => item.value).join(',');
        
                            this.pubSearchList.push({
                              columnName: "PublicationDBName",
                              searchType: this.andorType,
                              searchId: ids,
                              searchValue: values,
                              rangeFrom: null,
                              rangeTo: null,
                            });
                          }

                          for(let s=0;s<this.row.length;s++){
                            if(this.row[s].qualityscore==""){
                              console.log("No data in quality scores");
                            }
                            else{
                              this.pubSearchList.push({
                                columnName: this.row[s].qualityscore.toUpperCase(),
                                searchType: "Between",
                                searchId: null,
                                searchValue: "",
                                rangeFrom: this.row[s].citattionrangefrom.toString(),
                                rangeTo: this.row[s].citattionrangeto.toString(),
                              });
                            }
                          }

                          const searchData={
                            universityId: this.user.UniversityId,
                            roleId: this.userRole,
                            loginUserId: this.user.UserId,
                            sortColumnName:null,
                            sortType: null,
                            startRow: 0,
                            endRow: 20,
                            download: 0,
                            filter: 0,
                            searchList:this.pubSearchList
                          }

                          console.log(searchData);
                          localStorage.setItem("JounralSearch",JSON.stringify(searchData));
                          this.router.navigate(["/journal-search-result"]);

                  }


     }
