import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopyrightMineResultComponent } from './copyright-mine-result/copyright-mine-result.component';

const routes: Routes = [
  {path:'mineResult',component:CopyrightMineResultComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CopyrightRoutingModule { }
