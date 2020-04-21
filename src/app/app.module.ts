import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import {RouterModule, Routes} from '@angular/router';
import { ClassroomComponent } from './components/classroom/classroom.component';
import {FormsModule} from '@angular/forms';

const APP_ROUTES: Routes = [

  { path: 'admin', component: AdminComponent }];


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ClassroomComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
