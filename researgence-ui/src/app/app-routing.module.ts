import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ContentLayoutComponent } from './shared/components/layout/content-layout/content-layout.component';
import { content } from "./shared/routes/content-routes";
import { AdminGuard } from './shared/guard/admin.guard';
import { LoginmainComponent } from './auth/loginmain/loginmain.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ApierrorComponent } from './components/HttpError/apierror/apierror.component';
import { JournalDetailComponent } from './components/R+Subscription/journalopedia/journal-detail/journal-detail.component';
import { JournalSearchComponent } from './components/R+Subscription/journalopedia/journal-search/journal-search.component';
import { JournalSearchResultComponent } from './components/R+Subscription/journalopedia/journal-search-result/journal-search-result.component';
import { JournalAdvanceSearchComponent } from './components/R+Subscription/journalopedia/journal-advance-search/journal-advance-search.component';
import { InformationComponent } from './components/information/information.component';
import { MonthlyBulletinComponent } from './components/monthly-bulletin/monthly-bulletin.component';
import { SelectivePreloadingStrategy } from './shared/services/elective-preloading-strategy.service';
 
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginmainComponent
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AdminGuard],
    children: content
  },
  {
    path: 'auth/forgotpassword/:userID',
    component: ForgotpasswordComponent
  },
  { path: 'article/art/:recordId/:slNo/:back',
   component: ArticlesComponent
   },
   { path: 'Info/:type/:univ',
   component: InformationComponent
   },
   
   {
    path:'apierror/error/handle',
    component:ApierrorComponent
  },
  { path: 'journal-search',
    component: JournalSearchComponent
  },
  { path: 'journal-advance-search',
    component: JournalAdvanceSearchComponent
  },
  { path: 'journal-search-result',
    component: JournalSearchResultComponent
  },
  { path: 'journal-detail',
    component: JournalDetailComponent
  },
  {
    path: 'monlthly-bulletin-report',
    component: MonthlyBulletinComponent
  },
{
    path: '**',
    redirectTo: 'auth/login'
  },
 
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: SelectivePreloadingStrategy,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }