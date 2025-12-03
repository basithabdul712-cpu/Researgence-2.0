import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyrightRoutingModule } from './copyright-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CopyrightMineResultComponent } from './copyright-mine-result/copyright-mine-result.component';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from "../../shared/shared.module";
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { NgxTagsInputBoxModule } from 'ngx-tags-input-box';

@NgModule({
  declarations: [
    CopyrightMineResultComponent
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
    CopyrightRoutingModule,
    DragDropModule,
    ShareButtonsModule.withConfig({
      debug:true,
    }),

    ShareIconsModule
  ]
})
export class CopyrightModule { }
