import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboarddetailComponent } from './dashboard-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboarddetailComponent,
    data: {
      title: "",
      breadcrumb: ""
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboarddetailRoutingModule { }
