import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Pupil} from '../../domain/Pupil';
import {Observable} from 'rxjs';
import {Subject} from '../../domain/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) { }

  addSubject(subject: Subject):Observable<any>{
    const url = 'http://localhost:8080/subject';
    console.log("service - addSubject()")
    return this.http.post(url,subject, this.httpOptions);

  }

  getSubject(idSubject: number): Observable<Subject>{
    const url = 'http://localhost:8080/subject/'+idSubject;
    return this.http.get<Subject>(url, this.httpOptions)
  }
  getSubjects():Observable<Subject[]>{
    const url = 'http://localhost:8080/subject';
    return this.http.get<Subject[]>(url, this.httpOptions)
  }

  deleteSubject(idSubject:number):Observable<any>{
    const url = 'http://localhost:8080/subject/'+idSubject;
    return this.http.delete(url, this.httpOptions)
  }
}
