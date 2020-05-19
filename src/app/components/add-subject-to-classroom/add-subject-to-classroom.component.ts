import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SubjectsService} from "../../services/subjects/subjects.service";
import {Subject} from "../../domain/Subject";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SubjectTeacherClassroom} from "../../domain/SubjectTeacherClassroom";
import {Teacher} from "../../domain/Teacher";
import {TeacherService} from "../../services/teacher/teacher.service";
import {TeacherSubjectService} from "../../services/teacherSubject/teacher-subject.service";


export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-add-subject-to-classroom',
  templateUrl: './add-subject-to-classroom.component.html',
  styleUrls: ['./add-subject-to-classroom.component.css']
})
export class AddSubjectToClassroomComponent implements OnInit,OnChanges {
  @Input() idClassroom: number = -1;
  subjects: Subject[];
  teachers: Teacher[];

  subjectValue: Subject;
  teacherValue: Teacher;

  filteredTeaches: Teacher[];
  addComp: number;
  teacherSubjectClassroom: SubjectTeacherClassroom[];

  constructor(private subjectsService: SubjectsService, private teacherService: TeacherService, private _formBuilder: FormBuilder
              ,private teacherSubjectService: TeacherSubjectService) {
  }

  ngOnInit() {
    this.getTeachers()
    this.getTeacherSubject();
    this.subjectValue =new Subject();
    this.teacherValue =new Teacher();
    this.addComp = 0;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  getTeacherSubject(){
    this.teacherSubjectService.getTeacherSubject(this.idClassroom).subscribe(data=>{
      this.teacherSubjectClassroom=data;

    })
  }
  chooseSubject() {
    console.log(this.subjectValue.name);
    this.filteredTeaches = this._filterTeachers(this.subjectValue.name);
  }

  chooseTeacher() {
    console.log(this.teacherValue);
  }


  activateAddComp() {
    this.addComp = 1;
    this.getSubjects();
  }

  addTeacherSubject() {
    this.teacherSubjectService.addTeacherSubjectToClass(this.teacherValue.id,this.subjectValue.id,this.idClassroom).subscribe(data=>{
     this.teacherSubjectClassroom = data;
      this.ngOnInit();
    });
    this.addComp = 0;
  }

  private _filterTeachers(value: string): Teacher[] {
    if (value) {

      return this.getTeachers()
        .filter(teacher => this._filterTeacher(teacher.subjects, value));
    }
  }


  getSubjects() {
    this.subjectsService.getSubjects().subscribe(data => {
      this.subjects = data;
    })
  }

  getTeachers(): Teacher[] {
    this.teacherService.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
    })

    return this.teachers;


  }

  _filterTeacher(opt: Subject[], value: string): Subject {
    const filterValue = value.toLowerCase();
    return opt.find(subject =>
      subject.name.toLowerCase().indexOf(filterValue) === 0);
  };
}
