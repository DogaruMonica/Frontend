import {Pupil} from './Pupil';
import {Teacher} from './Teacher';

export class User{
   id : number;
   email: string;
   password: string;
   pupil:Pupil;
   role: string;

}
