import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CisuperadminComponent } from './cisuperadmin.component';
import {UserReportComponent} from '../adminclient/user-report/user-report.component';
import { AdminGuard } from 'src/app/shared/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: CisuperadminComponent,
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
export class CisuperadminRoutingModule { }
