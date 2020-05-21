import {Pupil} from "./Pupil";
import {Grade} from "./Grade";

export class PupilGrade{

  pupil: Pupil;
  grade: Grade[];

  constructor(pupil: Pupil){
    this.pupil= pupil;
    this.grade=[];
  }
}
