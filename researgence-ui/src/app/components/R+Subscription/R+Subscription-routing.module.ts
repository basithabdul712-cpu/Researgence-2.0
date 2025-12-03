import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TurnkeyComponent } from './turnkey/turnkey.component';



const routes: Routes = [
  {
    path: '',
    component: TurnkeyComponent,
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
export class RSubscriptionRoutingModule  { }
