import {Teacher} from './Teacher';
import {Pupil} from './Pupil';
import {Catalog} from './Catalog';

export class Classroom{

  id: number;
  teachers: Teacher[];
  pupils: Pupil[];
  name: string;
  catalog: Catalog;
}
