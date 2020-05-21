import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TeacherService} from '../../services/teacher/teacher.service';
import {ClassroomSubjectChatroom} from '../../domain/ClassroomSubjectChatroom';
import {Teacher} from '../../domain/Teacher';
import {QuizService} from '../../services/quiz/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassroomService} from "../../services/classroom/classroom.service";
import {CatalogService} from "../../services/catalog/catalog.service";
import {Grade} from "../../domain/Grade";
import {PupilGrade} from "../../domain/PupilGrade";
import {SubjectGrade} from "../../domain/SubjectGrade";
import {Pupil} from "../../domain/Pupil";

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit, OnChanges {
  lista: ClassroomSubjectChatroom[];
  idUser: number;
  selectedSubClasChat: ClassroomSubjectChatroom;
  teacher: Teacher;
  showQuiz: number = 0;
  hidden: boolean = false;
  gradesPupils: Grade[] = [];
  pupilGrade: PupilGrade[] = [];
  maxNumberOfGrades: number = 0;
  selectedRow: Pupil = new Pupil();
  newGrade: Grade = new Grade(0) ;

  constructor(private teacherService: TeacherService, private quizService: QuizService, private router: Router,
              private catalogService: CatalogService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }

  ngOnInit() {
    this.pupilGrade = [];
    if (localStorage.getItem('userId') == "") {
      this.router.navigate(['']);
    }
    this.ngUpdate();
  }

  ngUpdate() {
    this.idUser = +localStorage.getItem('userId');
    this.getTeacher();
  }

  onSelect(id: ClassroomSubjectChatroom) {
    this.selectedSubClasChat = id;
    this.hidden = false;
    this.getPupilGradeForSubject();
    this.selectedRow=new Pupil();
    this.newGrade= new Grade(0);
  }

  getPupilGradeForSubject() {
    this.catalogService.getUsersCatalog().subscribe(data => {
      this.gradesPupils = data;
      let pupilsGrades = [];
      this.maxNumberOfGrades = this.match(this.selectedSubClasChat, this.gradesPupils, pupilsGrades);
      this.normalizeInput(pupilsGrades, this.maxNumberOfGrades)
      this.pupilGrade = pupilsGrades;
    });
  }

  match(classroom: ClassroomSubjectChatroom, grades: Grade[], pupilGrades): number {
    var maxNr = 1;
    classroom.classroom.pupils.forEach(function (pupil) {
      var pupilGrade = new PupilGrade(pupil)
      grades.forEach(function (grade) {
        if (pupil.id === grade.pupil && grade.subject == classroom.subject.id) {
          pupilGrade.grade.push(grade);
        }
      })

      if (pupilGrade.grade.length > maxNr) {
        maxNr = pupilGrade.grade.length
      }
      pupilGrades.push(pupilGrade);
    })
    return maxNr;
  }

  normalizeInput(pupilsGrades: PupilGrade[], maxNr: number) {

    pupilsGrades.forEach(pupilGrade => {
      while (pupilGrade.grade.length < maxNr) {
        pupilGrade.grade.push(new Grade(-1));

      }
    })
  }

  getLista() {
    this.teacherService.getChatroomsForTeachers(this.teacher.id).subscribe(lista => {
      this.lista = lista;
      this.selectedSubClasChat = lista[0];
      console.log(this.selectedSubClasChat);
      this.getPupilGradeForSubject();
    });
  }

  select(pupil: Pupil) {
    this.selectedRow = pupil;
  }

  addGrade() {
    this.newGrade.pupil=this.selectedRow.id;
    this.newGrade.subject=this.selectedSubClasChat.subject.id;
    this.newGrade.catalog=this.selectedSubClasChat.classroom.catalog;
    this.catalogService.addGrade(this.newGrade).subscribe(()=>{
      this.onSelect(this.selectedSubClasChat);
      this.viewCatalog();
    })
  }

  getTeacher() {
    this.teacherService.getTeacherByUserId(this.idUser).subscribe(teacher => {
      this.teacher = teacher;
      this.getLista();
    });
  }

  logout() {
    localStorage.setItem('userId', "");
    this.router.navigate(['']);
  }

  viewCatalog() {
    this.hidden = true;
  }

}
