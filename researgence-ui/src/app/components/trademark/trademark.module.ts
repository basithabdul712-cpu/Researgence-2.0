import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrademarkMineResultComponent } from './trademark-mine-result/trademark-mine-result.component';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from "../../shared/shared.module";
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { NgxTagsInputBoxModule } from 'ngx-tags-input-box';
import { TrademarkRoutingModule } from './trademark-routing.module';

@NgModule({
  declarations: [
    TrademarkMineResultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgChartsModule,
    SharedModule,
    NgChartsModule,
    BsDatepickerModule.forRoot(),
    NgxTagsInputBoxModule,
    HttpClientModule,
    TrademarkRoutingModule,
    DragDropModule,
    ShareButtonsModule.withConfig({
      debug:true,
    }),

    ShareIconsModule
  ]
})
export class TrademarkModule { }
