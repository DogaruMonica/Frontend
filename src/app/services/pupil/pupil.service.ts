import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../domain/User';
import {Pupil} from '../../domain/Pupil';

@Injectable({
  providedIn: 'root'
})
export class PupilService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) { }

  addUser(user: User):Observable<any>{
    const url = 'http://localhost:8080/user';
    console.log("service - addUser()")
    return this.http.post(url, user, this.httpOptions);
  }

  addPupil(pupil:Pupil, idUser: number,idClassroom:number):Observable<any>{
    const url = 'http://localhost:8080/pupil/'+idUser+"/"+idClassroom;
    console.log("service - addUser()")
    return this.http.post(url, pupil, this.httpOptions);

  }
  deletePupil(idPupil:number):Observable<any>{
    const url = 'http://localhost:8080/pupil/'+idPupil;
    return this.http.delete(url, this.httpOptions)
  }
  updatePupil(pupil:Pupil):Observable<any>{
    const url = 'http://localhost:8080/pupil';
    return this.http.put(url,pupil, this.httpOptions)

  }
  getPupil(idPupil: number):Observable<Pupil>{
    const url = 'http://localhost:8080/pupil/'+idPupil;
    return this.http.get<Pupil>(url, this.httpOptions)

  }

}
