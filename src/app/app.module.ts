import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AdminComponent} from './components/admin/admin.component';
import {RouterModule, Routes} from '@angular/router';
import {ClassroomComponent} from './components/classroom/classroom.component';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { TeachersComponent } from './components/teachers/teachers.component';

const APP_ROUTES: Routes = [

  {path: 'admin', component: AdminComponent},
  {path: 'subjects', component: SubjectsComponent},
  {path: '', component: LoginComponent}];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ClassroomComponent,
    LoginComponent,
    SubjectsComponent,
    TeachersComponent
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
