import { WebSocketListener } from './web-socket-listener';
import {User} from "../domain/User";
import {EventEmitter} from "@angular/core";
import {Message} from "../domain/Message";

describe('WebSocketListener', () => {
  it('should create an instance', () => {
    expect(new WebSocketListener(new User(), new EventEmitter<Message>())).toBeTruthy();
  });
});
