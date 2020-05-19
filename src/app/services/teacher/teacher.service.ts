import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from '../../domain/Subject';
import {Observable} from 'rxjs';
import {User} from '../../domain/User';
import {Teacher} from '../../domain/Teacher';
import {ClassroomSubjectChatroom} from '../../domain/ClassroomSubjectChatroom';
import {Pupil} from '../../domain/Pupil';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }


  addUser(user: User): Observable<any> {
    const url = 'http://localhost:8080/user';
    console.log("service - addUser()")
    return this.http.post(url, user, this.httpOptions);
  }

  addTeacher(teacher: Teacher, idUser: number): Observable<any> {
    const url = 'http://localhost:8080/teacher/' + idUser;
    console.log("service - addTeacher()")
    return this.http.post(url, teacher, this.httpOptions);

  }

  assignTeacherSubject(idSubject: number, idTeacher: number) {
    const url = 'http://localhost:8080/teacher/' + idTeacher + '/subject/' + idSubject;
    console.log("service - addTeacherSubject()")
    return this.http.post(url, this.httpOptions);
  }


  deleteTeacher(idTeacher: number): Observable<any> {
    const url = 'http://localhost:8080/teacher/' + idTeacher;
    return this.http.delete(url, this.httpOptions)
  }

  getTeachers(): Observable<any> {
    const url = 'http://localhost:8080/teacher/';
    return this.http.get(url, this.httpOptions);
  }

  getChatroomsForTeachers(id:number ): Observable<ClassroomSubjectChatroom[]> {
    const url = 'http://localhost:8080/teacher/'+id+'/chatrooms';
    return this.http.get<ClassroomSubjectChatroom[]>(url, this.httpOptions);
  }


  getTeacherByUserId(idUser: number):Observable<Teacher>{
    const url = 'http://localhost:8080/teacher/user/'+idUser;
    return this.http.get<Teacher>(url, this.httpOptions)

  }




}
