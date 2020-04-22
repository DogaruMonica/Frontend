import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AdminComponent} from './components/admin/admin.component';
import {RouterModule, Routes} from '@angular/router';
import {ClassroomComponent} from './components/classroom/classroom.component';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {HttpClientModule} from "@angular/common/http";

const APP_ROUTES: Routes = [

  {path: 'admin', component: AdminComponent},
  {path: '', component: LoginComponent}];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ClassroomComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
