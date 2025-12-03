import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PantentDashboard } from './pantent-dashboard/pantent-dashboard.component';
import { PatentMinedbComponent } from './patent-minedb/patent-minedb.component';
import { PatentMineComponent } from './patent-minedb/patent-mine/patent-mine.component';
import { PantentDashboardLevel } from './pantent-dashboard-level/pantent-dashboard-level.component'; 

const routes: Routes = [
  {path: '', component: PantentDashboard},
  {path: 'minedb',component: PatentMinedbComponent},
  {path: 'minedb/result',component: PatentMineComponent},
  {path:'level/:id/:levelid/:layer/:name', component: PantentDashboardLevel}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantentRoutingModule  { }
