import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Classroom} from "../../domain/Classroom";
import {Observable} from "rxjs";
import {Grade} from "../../domain/Grade";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) {
  }

  getUserCatalog(userid: string):Observable<Grade[]>{
    const url = 'http://localhost:8080/grade/pupil/'+userid;
    return this.http.get<Grade[]>(url, this.httpOptions);
  }
  getUsersCatalog():Observable<Grade[]>{
    const url = 'http://localhost:8080/grade/';
    return this.http.get<Grade[]>(url, this.httpOptions);
  }
  addGrade ( grade: Grade):Observable<any>{
    const url = 'http://localhost:8080/grade/';
    return this.http.post<any>(url,grade, this.httpOptions);
  }

}
