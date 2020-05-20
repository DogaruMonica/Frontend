import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Classroom} from "../../domain/Classroom";

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

  getUserCatalog(userid: string){
    const url = 'http://localhost:8080/grade/pupil/'+userid;
    return this.http.get<any>(url, this.httpOptions);
  }
  getSubject(subjectid: number){
    const url = 'http://localhost:8080/subject/'+subjectid;
    return this.http.get<any>(url, this.httpOptions);
  }

}
