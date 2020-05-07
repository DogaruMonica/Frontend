export class SubjectTeacher {
  subjectid: number;
  subjectName: string;
  teacherid: number;
  teacherName: string;

  constructor ( subjectName: string, teacherName: string){
    this.subjectName= subjectName;
    this.teacherName= teacherName;
  }
}
