import {Question} from './Question';

export class Quiz{

  id: number;
  name: string;
  active: boolean;
  questions: Question[];
}
