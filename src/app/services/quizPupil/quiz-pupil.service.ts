import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quiz} from "../../domain/Quiz";

@Injectable({
  providedIn: 'root'
})
export class QuizPupilService {
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {

  }
  getQuiz(clasid : number):Observable<Quiz[]>{
    let url="http://localhost:8080/classroomSubjectChatroom/quiz/"+clasid;
    return this.http.get<Quiz[]>(url,this.httpOptions);
  }

  sendQuestion(quizId:number, questionId: number,pupilId: number, answer: string):Observable<any>{
    let url="http://localhost:8080/quiz/"+quizId+"/"+questionId+"/"+pupilId;
    return this.http.post<Quiz[]>(url,answer,this.httpOptions);
  }

  getScore(quizId: number, pupilId: number):Observable<number>{
    let url="http://localhost:8080/quiz/"+quizId+"/"+pupilId;
    return this.http.get<number>(url,this.httpOptions);
  }
  toggleActive(id:number){
    let url="http://localhost:8080/quiz/"+id+"/toggleactive";
    return this.http.put<number>(url,this.httpOptions);
  }
}
