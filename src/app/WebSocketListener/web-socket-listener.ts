import {EventEmitter, Output} from "@angular/core";
import {Message} from "../domain/Message";
import {Client} from "@stomp/stompjs";
import {User} from "../domain/User";

export class WebSocketListener  {
  client: Client;

  constructor(user: User,emitter : EventEmitter<Message>) {
    this.client = new Client({
      brokerURL: "ws://" + user.email + ":" + user.password + "@localhost:8080/api/websocket",
      onConnect: () => {
        this.client.subscribe("/topic/events", message => {
          emitter.emit(JSON.parse(message.body))
        })
      }
    });
    this.client.activate();
  }

}
