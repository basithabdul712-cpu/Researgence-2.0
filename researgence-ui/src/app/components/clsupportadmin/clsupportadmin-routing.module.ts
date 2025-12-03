
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClsupportadminComponent } from './clsupportadmin.component';


const routes: Routes = [
  {
    path: '',
    component: ClsupportadminComponent,
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
export class ClsupportadminRoutingModule { }