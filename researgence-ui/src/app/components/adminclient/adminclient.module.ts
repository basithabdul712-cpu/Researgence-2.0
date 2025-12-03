import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import{ AdminclientComponent} from'./adminclient/adminclient.component'
import { AdminclientService } from './adminclient.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminclientRoutingModule} from './adminclient-routing.module';
import{UniversityComponent} from './universitylist/universitylist.component';
import { UserListComponent } from './user-list/user-list.component'
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AdddfsComponent} from './addDfs/adddfs.component';
import {DfsListComponent} from './dfs-list/dfs-list.component';
import {RfsListComponent} from './rfs-list/rfs-list.component';
import {RfsuniversityComponent} from './rfsuniversity/rfsuniversity.component';
import {RfsApprovalComponent} from './rfs-approval/rfs-approval.component';
import {RfsAdvanceSearchComponent} from './rfs-advance-search/rfs-advance-search.component';
import {AdminServiceRequestsComponent} from './service-requests/admin-service-requests.component';
import { RequestEvaluationComponent } from './request-evaluation/request-evaluation.component';
import {AdminrequestAdvanceSearchComponent} from './advance-search-service-request/adminrequest-advance-search.component';
import {SupportadminRequestComponent} from './supportadmin-request/supportadmin-request.component';
import { ClientUsageReportComponent } from "./client-usage-report/client-usage-report.component";
import { UserReportComponent } from './user-report/user-report.component';
import { AdddfsNewComponent } from './addDfsNew/adddfsNew.component';
import { LibrarianUncatogorypublicationComponent } from './librarian-uncatogory-publication/librarian-uncatogorypublication.component';
import { SourceRequestComponent } from './DFS-source-request/source-request.component';
import { AgGridComponent } from './../faculties/faculty-compare/ag-grid/ag-grid.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SupportPubMineComponent } from './support-pub-mine/support-pub-mine.component';
import { SupportPubMineDetailComponent } from './support-pub-mine-detail/support-pub-mine-detail.component';
import { FacultyCompareTimelineComponent } from '../R+Subscription/faculty-compare-timeline/faculty-compare-timeline.component';
import { PublicationQcListComponent } from './publication-qc-list/publication-qc-list.component';
import { SubcriptionReportComponent } from './subcription-report/subcription-report.component';

@NgModule({
  declarations: [AdminclientComponent,UniversityComponent, UserListComponent,RfsListComponent,RfsApprovalComponent,AdddfsNewComponent,LibrarianUncatogorypublicationComponent, PublicationQcListComponent,
    AdddfsComponent,DfsListComponent,RfsuniversityComponent,RfsAdvanceSearchComponent,AdminServiceRequestsComponent,SourceRequestComponent,SupportPubMineComponent,FacultyCompareTimelineComponent,
    RequestEvaluationComponent,AdminrequestAdvanceSearchComponent,SupportadminRequestComponent,ClientUsageReportComponent, UserReportComponent,SupportPubMineDetailComponent, SubcriptionReportComponent],
  imports: [
    AdminclientRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    AgGridComponent,
    NgxPaginationModule,
    ScrollingModule,
    BsDatepickerModule.forRoot(),
    
  ],
  providers:[AdminclientService,DatePipe],

})
export class AdminclientModule { }
