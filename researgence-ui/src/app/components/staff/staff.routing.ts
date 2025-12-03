import { RouterModule, Routes } from '@angular/router';
import { FacultiesDetailComponent } from '../faculties/faculties-detail/faculties-detail.components';
import { StaffCompareComponent } from './staff-compare/staff-compare.component';
import { StaffListComponent } from './staff-list/staff-list.components';

export const PagesRoutes: Routes = [
    { path: ':id', component: FacultiesDetailComponent },
    { path: '', component: StaffListComponent },
    { path: 'compare/sch', component: StaffCompareComponent },
    { path: '**', redirectTo: '' }
];



