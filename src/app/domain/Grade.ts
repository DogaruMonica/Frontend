import {Catalog} from "./Catalog";

export class Grade{
  catalog: Catalog;
  grade: number;
  id: number;
  pupil: number;
  subject: number;

  constructor(grade: number){
    this.grade=grade;
  }

}
