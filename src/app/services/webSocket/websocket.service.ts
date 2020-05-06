import {EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {Message} from "../../domain/Message";
import {Client} from "@stomp/stompjs";
import {User} from "../../domain/User";
import {WebSocketListener} from "../../WebSocketListener/web-socket-listener";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {first, map} from "rxjs/operators";
import {Pupil} from "../../domain/Pupil";
import {Subject} from "../../domain/Subject";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  user: User;
  socketClient: WebSocketListener;
  @Output() eventEmitter = new EventEmitter<Message>();

  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {
    const url = 'http://localhost:8080/user/' + localStorage.getItem("userId");
    this.http.get<User>(url, this.httpOptions).subscribe(user => {
      this.user = user;
      this.socketClient = new WebSocketListener(user, this.eventEmitter);
    })
  }


  getChatroom(id: number): Observable<Message[]> {
    const url = 'http://localhost:8080//chatroom/' + id + '/message';
    return this.http.get<Message[]>(url, this.httpOptions);
  }

  postMessage(message: string, chatroom: number, userId: number) {
    const url = 'http://localhost:8080/message/';
    this.http.post<any>(url, {message, chatroom, userId}, this.httpOptions).subscribe(data => {
      this.eventEmitter.emit(data);
    });
    ;
  }

  getStudentName(id: number): Observable<User> {
    const url = 'http://localhost:8080/user/' + id;
    console.log(id)
    return this.http.get<User>(url, this.httpOptions);
  }

}
