
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CisuperadminRoutingModule } from './cisuperadmin-routing.module';
import { CisuperadminComponent } from './cisuperadmin.component';
import { SharedModule } from '../../../app/shared/shared.module';
import {AuthService} from '../../../app/shared/services/firebase/auth.service';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartistModule } from 'ng-chartist';
import { NgChartsModule } from 'ng2-charts';
import { CountToModule } from 'angular-count-to';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  declarations: [CisuperadminComponent],
  imports: [
    CisuperadminRoutingModule,
    CommonModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    NgChartsModule,
    CountToModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    SharedModule,
  ],
  providers:[AuthService],

})
export class CisuperadminModule { }
