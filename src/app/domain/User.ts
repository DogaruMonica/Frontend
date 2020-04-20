import {Pupil} from './Pupil';
import {Teacher} from './Teacher';

export class User{
   id : number;
   pupil: Pupil;
   teacher: Teacher;
   email: string;
   password: string;
   role: string;

}
