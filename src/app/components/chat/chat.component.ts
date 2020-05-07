import {Component, Input, OnInit} from '@angular/core';
import {WebsocketService} from '../../services/webSocket/websocket.service';
import {Message} from '../../domain/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() chatid: number = -1;
  messages: Message[];
  inputMessage: Message;
  value: string;
  date: string;


  constructor(private service: WebsocketService) {
  }

  ngOnInit(): void {
    this.inputMessage = new Message(this.chatid, +localStorage.getItem('userId'), null, '', '');
    this.getMessages();
    this.service.eventEmitter.subscribe(() => {
      this.getMessages();
    }, {}, {});
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
