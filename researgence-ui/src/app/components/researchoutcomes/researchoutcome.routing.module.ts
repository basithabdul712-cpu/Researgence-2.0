import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResearchoutcomesComponent } from './researchoutcomes.component';

const routes: Routes = [
  {
    path: '',
    component: ResearchoutcomesComponent,
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
export class ResearchoutcomeRountingModule { }
