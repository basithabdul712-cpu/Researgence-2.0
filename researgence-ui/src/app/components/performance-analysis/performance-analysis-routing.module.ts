
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerformanceAnalysisComponent } from './performance-analysis.component';
import { PRSKRAEligibiltyListComponent } from './prs-kra-eligibilty-list/prs-kra-eligibilty-list.component';
import { PRSKRAScoringComponent } from './prs-kra-scoring/prs-kra-scoring.component';


const routes: Routes = [
  {
    path: '',
    component: PerformanceAnalysisComponent,
    data: {
      title: "",
      breadcrumb: ""
    }
  },
  {path:'prs-kra-eligibility-list',component:PRSKRAEligibiltyListComponent},
  {path:'prs-kra-scoring',component:PRSKRAScoringComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceAnalysisRoutingModule { }
 