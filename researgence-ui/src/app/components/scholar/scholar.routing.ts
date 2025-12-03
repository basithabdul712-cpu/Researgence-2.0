import { RouterModule, Routes } from '@angular/router';
import { ScholarListComponent } from './scholar-list/scholar-list.components';
import { ScholarCompareComponent } from './scholar-compare/scholar-compare.component';
import { FacultiesDetailComponent } from '../faculties/faculties-detail/faculties-detail.components';

export const PagesRoutes: Routes = [
    { path: ':id', component: FacultiesDetailComponent },
    { path: '', component: ScholarListComponent },
    { path: 'compare/sch', component: ScholarCompareComponent },
    { path: '**', redirectTo: '' }
];



