import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatentMinedbComponent } from './patent-minedb/patent-minedb.component';
import {PatentDashboard} from './patent-dashboard/patent-dashboard.component';
import { PatentMineComponent } from './patent-minedb/patent-mine/patent-mine.component';
import { PatentDashboardLevel } from './patent-dashboard-level/patent-dashboard-level.component'; 
import { PatentRfsList } from './patent-rfs-list/patent-rfs-list.component';
import { PatentEvaluationComponent } from './patent-evaluation/patent-evaluation.component';
import { PatentAdvanceSearchComponent } from './patent-advance-search/patent-advance-search.component';
import{ PatentFeedersystemComponent } from './patent-feedersystem/patent-feedersystem.component';
import { PatentQcApprovalComponent } from './patent-qc-approval/patent-qc-approval.component';
import { PatentEditComponent } from './patent-edit/patent-edit.component';
import { PatentEditByMineComponent } from "./patent-edit-by-mine/patent-edit-by-mine.component";
import { PatentEditByMineDetailComponent } from "./patent-edit-by-mine/patent-edit-by-mine-detail/patent-edit-by-mine-detail.component";

const routes: Routes = [
  {path: '', component: PatentDashboard},
  {path: 'minedb',component: PatentMinedbComponent},
  {path: 'minedb/result',component: PatentMineComponent},
  {path:'level/:id/:levelid/:layer/:name', component: PatentDashboardLevel},
  {path:'rfs/:univId', component: PatentRfsList},
  {path:'evaluation/:RFSRequestId/:status/:patentId', component: PatentEvaluationComponent},
  {path:'rfs/advance-search/:university', component: PatentAdvanceSearchComponent},
  {path:'add/dfs/patent/ext/res/ai/:sys/:type', component: PatentFeedersystemComponent},
  {path:'Admin/QC/:univ', component: PatentQcApprovalComponent},
  {path:'Edit/:patentId/:type/:univId', component: PatentEditComponent},
  {path: 'edit/mine/search',component: PatentEditByMineComponent},
  {path: 'edit/mine/search',component: PatentEditByMineComponent},
  {path: 'edit/mine/search/detail',component: PatentEditByMineDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatentRoutingModule  { }
