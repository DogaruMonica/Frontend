import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WebsocketService} from '../../services/webSocket/websocket.service';
import {Message} from '../../domain/Message';
import {User} from '../../domain/User';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnChanges {
  @Input() chatid: number = -1;
  messages: Message[];
  inputMessage: Message;
  value: string;
  date: string;
  user: User;


  constructor(private service: WebsocketService ,private loginService: LoginService) {
  }


  ngOnInit(): void {
    this.loginService.getUserById(+localStorage.getItem('userId')).subscribe(user=>{

        this.user=user;


    this.inputMessage = new Message(this.chatid, +localStorage.getItem('userId'), null, '', '','');
    this.getMessages();
    this.service.eventEmitter.subscribe(() => {
      this.getMessages();
    }, {}, {});
      }
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  setDate(date: string): boolean {
    if (date != this.date) {
      this.date = date;
      return true;
    } else {
      return false;
    }
  }

  getDate(date: string): string {
    date = date.substring(0, 10);
    let day = date.substring(8, 10);
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);
    return day + '-' + month + '-' + year;
  }

  getTime(date: string): string {
    return date.substring(11, 16);
  }

  getMessages() {
    this.service.getChatroom(this.chatid).subscribe(messages => {
      this.messages = messages;
      this.setNames();
    });
  }

  setNames() {
    for (let msg of this.messages) {
      this.getUserName(msg);
    }
  }

  getUserName(msg: Message) {
    this.service.getStudentName(msg.userId).subscribe((user) => {
      msg.email = user.email.substring(0, user.email.indexOf('@'));
      this.getUserRole(msg);
    });
  }
  getUserRole(msg: Message){

    this.loginService.getUserById(msg.userId).subscribe(u=>{
      msg.role=u.role;
    });
  }

  onCLick() {
    this.inputMessage.message = this.value.valueOf();
    if (this.inputMessage.message != '\n') {
      this.service.postMessage(this.inputMessage.message, this.inputMessage.chatid, this.inputMessage.userId);
      this.value = '';
    }
  }
}
