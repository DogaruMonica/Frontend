import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AdminComponent} from './components/admin/admin.component';
import {RouterModule, Routes} from '@angular/router';
import {ClassroomComponent} from './components/classroom/classroom.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {SubjectsComponent} from "./components/subjects/subjects.component";
import {TeachersComponent} from "./components/teachers/teachers.component";
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { PupilDashboardComponent } from './components/pupil-dashboard/pupil-dashboard.component';
import {ChatComponent} from './components/chat/chat.component';

const APP_ROUTES: Routes = [

  {path: 'admin', component: AdminComponent},
  {path: 'subjects', component: SubjectsComponent},
  {path: 'teacher', component: TeacherDashboardComponent},
  {path: 'pupil', component: PupilDashboardComponent},
  {path: '', component: LoginComponent},

  {path: 'chat', component: ChatComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ClassroomComponent,
    LoginComponent,
    SubjectsComponent,
    TeachersComponent,
    TeacherDashboardComponent,
    PupilDashboardComponent,
    TeachersComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
