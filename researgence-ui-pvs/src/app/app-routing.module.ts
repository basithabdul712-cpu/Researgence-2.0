import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ContentLayoutComponent } from './shared/components/layout/content-layout/content-layout.component';
import { content } from "./shared/routes/content-routes";
import { AdminGuard } from './shared/guard/admin.guard';
import { ArticlesComponent } from './components/articles/articles.component';
import { ApierrorComponent } from './components/HttpError/apierror/apierror.component';
import { InformationComponent } from './components/information/information.component';
import { UniversityComponent } from './components/adminclient/universitylist/universitylist.component';

 
const routes: Routes = [
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full'
  },
  {
    path: 'universitySelect',
    component: UniversityComponent,
    canActivate: [AdminGuard],
  },
  // {
  //   path: 'auth/login',
  //   component: LoginmainComponent
  // },
  {
    path: '',
    component: ContentLayoutComponent,
    // canActivate: [AdminGuard],
    children: content
  },
  // {
  //   path: 'auth/forgotpassword/:userID',
  //   component: ForgotpasswordComponent
  // },
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
{
    path: '**',
    redirectTo: '/Home'
  },
 
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }