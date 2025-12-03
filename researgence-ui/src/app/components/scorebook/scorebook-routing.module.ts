import { ScorebookComponent } from './scorebook/scorebook.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScorebookcompareComponent } from './compare/scorebookcompare/scorebookcompare.component';
import { MinedbComponent } from './minedb/minedb.component';
import { NotificationComponent } from './notification/notification.component';
import { ArticlesComponent } from '../articles/articles.component';
import { InsightReportsComponent } from './insight-reports/insight-reports.component';
import { PublicationMineComponent } from './minedb/publication-mine/publication-mine.component';
import { ScorebookViewListComponent } from './scorebook-view-list/scorebook-view-list.component';
import { DesignPatentComponent} from './minedb/design-patent/design-patent.component';

const routes: Routes = [
  {
    path: '',
    component: ScorebookComponent,
    data: {
      title: "",
      breadcrumb: ""
    }
  },
  {path:'pub/:compare',component:ScorebookcompareComponent},
  {path:'Publications/Mine',component:MinedbComponent},
  {path:'notification',component:NotificationComponent},
  {path:'art/:pubId/:userId',component:ArticlesComponent},
  {path:'Publications/InsightReports',component:InsightReportsComponent},
  {path:'Publications/Mine/:View',component:PublicationMineComponent},
  {path:'view/:module/:subModule',component:ScorebookViewListComponent},
  {path:'Publications/Mineresult/designpatent',component:DesignPatentComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScorebookRoutingModule { }