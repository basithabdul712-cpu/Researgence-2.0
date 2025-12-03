import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { DecimalPipe } from '@angular/common';
import { AuthService } from './shared/services/firebase/auth.service';
import { AdminGuard } from './shared/guard/admin.guard';
import { SecureInnerPagesGuard } from './shared/guard/SecureInnerPagesGuard.guard';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LoginmainComponent } from './auth/loginmain/loginmain.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ApierrorComponent } from './components/HttpError/apierror/apierror.component';
import {GeneralApiService} from './components/general-api.service';
import { InformationComponent } from './components/information/information.component';
import { JournalSearchComponent } from './components/R+Subscription/journalopedia/journal-search/journal-search.component';
import { JournalAdvanceSearchComponent } from './components/R+Subscription/journalopedia/journal-advance-search/journal-advance-search.component';
import { JournalDetailComponent } from './components/R+Subscription/journalopedia/journal-detail/journal-detail.component';
import { JournalSearchResultComponent } from './components/R+Subscription/journalopedia/journal-search-result/journal-search-result.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CounterFormat} from './auth/loginmain/counter_format.pipe';
import { MonthlyBulletinComponent } from './components/monthly-bulletin/monthly-bulletin.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginmainComponent,
    ForgotpasswordComponent,InformationComponent,
    ArticlesComponent,JournalSearchComponent,JournalAdvanceSearchComponent,JournalDetailComponent,JournalSearchResultComponent
    ,ApierrorComponent,CounterFormat,MonthlyBulletinComponent],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    // AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService, GeneralApiService,AdminGuard, SecureInnerPagesGuard, CookieService, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
