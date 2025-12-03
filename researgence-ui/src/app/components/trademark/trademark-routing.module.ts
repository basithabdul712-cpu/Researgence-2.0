import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrademarkMineResultComponent }from './trademark-mine-result/trademark-mine-result.component';

const routes: Routes = [
  {path:'mineResult',component:TrademarkMineResultComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrademarkRoutingModule { }
