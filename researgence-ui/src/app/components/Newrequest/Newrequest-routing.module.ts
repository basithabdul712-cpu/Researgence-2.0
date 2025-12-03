import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewrequestComponent } from './Newrequest/newrequest.component';



const routes: Routes = [
  {
    path: '',
    component: NewrequestComponent,
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
export class NewrequestRoutingModule  { }
