import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quiz} from '../../domain/Quiz';
import {Question} from '../../domain/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) { }


  addQuestion(id: number,question: Question):Observable<any>{
    const url = 'http://localhost:8080/question/'+id;
    return this.http.post(url,question, this.httpOptions)

  }

  toggle(id:number){

    const url = 'http://localhost:8080/quiz/'+id+'/toggleactive';
    return this.http.put(url, this.httpOptions)
  }




}
