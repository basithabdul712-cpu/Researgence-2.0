import { SharedModule } from 'src/app/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScorebookRoutingModule } from './scorebook-routing.module';
import {ScorebookService} from './scorebook.service';
import { ScorebookComponent } from './scorebook/scorebook.component';
import {  FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScorebookcompareComponent } from './compare/scorebookcompare/scorebookcompare.component';
import { MinedbComponent } from './minedb/minedb.component';
import { NotificationComponent } from './notification/notification.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule} from 'ngx-bootstrap/tabs';
import {ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';
import { InsightReportsComponent } from './insight-reports/insight-reports.component';
import { PublicationMineComponent } from './minedb/publication-mine/publication-mine.component';
import { ScorebookViewListComponent } from './scorebook-view-list/scorebook-view-list.component'
import { DesignPatentComponent } from './minedb/design-patent/design-patent.component';
@NgModule({
  declarations: [ScorebookComponent,ScorebookcompareComponent,NotificationComponent,
     MinedbComponent,ScorebookViewListComponent,
     InsightReportsComponent,
     PublicationMineComponent,
     DesignPatentComponent],
  imports: [
    ScorebookRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    NgbDatepickerModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ShareButtonsModule.withConfig({
      debug:true,
    }),

    ShareIconsModule
  ],
  providers:[ScorebookService],

})
export class ScorebookModule { }
