import {Subject} from "./Subject";
import {Grade} from "./Grade";
import {ClassroomSubjectChatroom} from "./ClassroomSubjectChatroom";

export class SubjectGrade {

  subject: ClassroomSubjectChatroom;
  grades: Grade[] =[];

  constructor(subject:ClassroomSubjectChatroom ) {
    this.subject=subject;
  }

}
