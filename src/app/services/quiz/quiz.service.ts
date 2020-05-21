import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Pupil} from '../../domain/Pupil';
import {Quiz} from '../../domain/Quiz';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) { }

  getQuizzesByCSCId(id:number):Observable<Quiz[]>{
   const url = "http://localhost:8080/quiz/classroomSubjectChatroom/"+id;
    return this.http.get<Quiz[]>(url, this.httpOptions)

  }
  addQuiz(quiz: string,id: number):Observable<any>{
    const url = 'http://localhost:8080/quiz/'+id;
    console.log("heeeeeeeeeeeeeeeeeeeeeyalooooooooooooooooooedbuewgbduyweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeyyyyyyyyyyyyyyyyyyyyyyyyyyeeeeyyyyyyyyyyyyye")
    console.log(quiz);
    return this.http.post(url,JSON.stringify(quiz), this.httpOptions)

  }
  getQuizById(id:number):Observable<Quiz>{
    const url = 'http://localhost:8080/quiz/'+id;
    return this.http.get<Quiz>(url, this.httpOptions)

  }

  deleteQuiz(id:number){
    const url = 'http://localhost:8080/quiz/'+id;
    return this.http.delete(url, this.httpOptions)
  }
}
