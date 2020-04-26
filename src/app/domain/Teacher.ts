import {User} from './User';
import {Classroom} from './Classroom';
import {Subject} from './Subject';

export class Teacher{
  id: number;
  user: User;
  firstname: string;
  lastname: string;
  classrooms: Classroom[];
  subjects: Subject[];
}
