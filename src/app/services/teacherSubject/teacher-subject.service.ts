import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SubjectTeacherClassroom} from "../../domain/SubjectTeacherClassroom";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeacherSubjectService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }


  addTeacherSubjectToClass(tid: number,sid: number,cid: number):Observable<any>{
    const url = 'http://localhost:8080/classroom/' +cid +"/"+ sid+"/"+tid;
    console.log("service - addUser()")
    return this.http.post<any>(url, this.httpOptions);
  }

  getTeacherSubject(cid: number):Observable<any>{
    const url = 'http://localhost:8080/classroomSubjectTeacher/' +cid;
    return this.http.get<any>(url, this.httpOptions);
  }
}
