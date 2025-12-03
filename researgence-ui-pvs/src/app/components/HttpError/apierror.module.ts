import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";
import {ApierrorComponent} from '../HttpError/apierror/apierror.component';

@NgModule({
  declarations: [
    ApierrorComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class ApierrorModule { }
