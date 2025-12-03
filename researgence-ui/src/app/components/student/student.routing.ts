import { RouterModule, Routes } from '@angular/router';
import { FacultiesDetailComponent } from '../faculties/faculties-detail/faculties-detail.components';
import { StudentCompareComponent } from './student-compare/student-compare.component';
import { StudentListComponent } from './student-list/student-list.components';

export const PagesRoutes: Routes = [
    { path: ':id', component: FacultiesDetailComponent },
    { path: '', component: StudentListComponent },
    { path: 'compare/sch', component: StudentCompareComponent },
    { path: '**', redirectTo: '' }
];



