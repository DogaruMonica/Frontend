import {Component, OnInit} from '@angular/core';
import {SubjectsService} from "../../services/subjects/subjects.service";
import {Subject} from "../../domain/Subject";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SubjectTeacher} from "../../domain/SubjectTeacher";
import {Teacher} from "../../domain/Teacher";
import {TeacherService} from "../../services/teacher/teacher.service";


export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-add-subject-to-classroom',
  templateUrl: './add-subject-to-classroom.component.html',
  styleUrls: ['./add-subject-to-classroom.component.css']
})
export class AddSubjectToClassroomComponent implements OnInit {

  subjects: Subject[];
  teachers: Teacher[];
  subjectsTeacher: SubjectTeacher[];
  subjectValue: string;
  teacherValue: string;
  filteredTeaches: Teacher[];
  addComp: number;
  subjectForm: FormGroup = this._formBuilder.group({
    subject: '',
  });
  teacherForm: FormGroup = this._formBuilder.group({
    teacher: '',
  });

  constructor(private subjectsService: SubjectsService, private teacherService: TeacherService, private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.subjectsTeacher = [new SubjectTeacher("", "")];
    this.getTeachers();
    this.addComp = 0;
  }

  chooseSubject(event) {
    this.subjectValue = event.target.value;
    this.subjectForm.get('subject').setValue(this.subjectValue)
    this.filteredTeaches = this._filterTeachers(this.subjectValue);
  }

  chooseTeacher(event) {
    this.teacherValue = event.target.value;
    this.teacherForm.get('teacher').setValue(this.teacherValue)

  }

  updatePupil() {

  }

  deletePupil() {

  }

  activateAddComp() {
    this.addComp = 1;
    this.getSubjects();
  }

  deactivateAddComp() {
    this.subjectsTeacher = this.subjectsTeacher.filter(({ teacherName }) => teacherName !== "");
    this.subjectsTeacher.push(new SubjectTeacher(this.subjectValue, this.teacherValue));
    this.subjectValue="";
    this.teacherValue="";
    this.addComp = 0;
  }

  private _filterSubjects(value: string): Subject[] {
    if (value) {
      return this.subjects
        .filter(group => group.name.toLocaleLowerCase().startsWith(value));
    }
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
