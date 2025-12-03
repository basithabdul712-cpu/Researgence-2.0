
import { RolesRoutingModule } from './roles-routing.module';
import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { RolesComponent } from './roles.component';


@NgModule({
  declarations: [RolesComponent],
  imports: [
    RolesRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers:[AuthService]

})
export class RolesModule { }
