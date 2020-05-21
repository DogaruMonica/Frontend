import {Classroom} from './Classroom';
import {Subject} from './Subject';
import {Chatroom} from './Chatroom';
import {Quiz} from "./Quiz";


export class ClassroomSubjectChatroom{
     id: number;
     classroom: Classroom;
     subject: Subject;
     chatroom: Chatroom;
      quizzes: Quiz[];


}
