import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Classroom} from '../../domain/Classroom';
import {ClassroomSubjectChatroom} from '../../domain/ClassroomSubjectChatroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) {

  }

  getClassrooms(): Observable<Classroom[]> {
    console.log('Este in service - getClassrooms()');


    const url = 'http://localhost:8080/classroom';
    return this.http.get<Classroom[]>(url, this.httpOptions);
  }
  getClassroom(idClassroom: number): Observable<Classroom> {
    const url = 'http://localhost:8080/classroom/' + idClassroom;
    return this.http.get<Classroom>(url, this.httpOptions);
  }
  addClassroom(classroom: Classroom){
    const url = 'http://localhost:8080/classroom/' ;
    return this.http.post<Classroom>(url, classroom,this.httpOptions);
  }
  deleteClassroom(idClassroom:number){
    const url = 'http://localhost:8080/classroom/'+idClassroom;
    return this.http.delete(url,this.httpOptions);
  }

  getClassroomSubjectChatrooms (idClassroom:number): Observable<ClassroomSubjectChatroom[]>{
    const url = 'http://localhost:8080/classroom/classroomSubjectChatroom/' + idClassroom;
    return this.http.get<ClassroomSubjectChatroom[]>(url, this.httpOptions);
  }

}
