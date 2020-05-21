import {Component, OnInit} from '@angular/core';
import {Pupil} from '../../domain/Pupil';
import {LoginService} from '../../services/login/login.service';
import {PupilService} from '../../services/pupil/pupil.service';
import {ClassroomSubjectChatroom} from '../../domain/ClassroomSubjectChatroom';
import {ClassroomService} from '../../services/classroom/classroom.service';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogService} from "../../services/catalog/catalog.service";
import {Grade} from "../../domain/Grade";
import {SubjectGrade} from "../../domain/SubjectGrade";
import {QuizPupilService} from "../../services/quizPupil/quiz-pupil.service";
import {Subject} from "../../domain/Subject";
import {PupilGrade} from "../../domain/PupilGrade";


@Component({
  selector: 'app-pupil-dashboard',
  templateUrl: './pupil-dashboard.component.html',
  styleUrls: ['./pupil-dashboard.component.css']
})
export class PupilDashboardComponent implements OnInit {
  pupil: Pupil;
  classroomId: number;
  selectedId: number = 1;
  subjchats: ClassroomSubjectChatroom[];
  ClassroomSubjectChatroomId: number;
  hidden: boolean = false;
  grades: Grade[];
  table: SubjectGrade[] = [];
  disableQuiz: number = 0;
  diasbledQuizs : number[]=[];
  selectedRow : SubjectGrade;
  maxNr: number;

  constructor(private loginservice: LoginService, private dataRoute: ActivatedRoute, private router: Router, private pupilService: PupilService,
              private classroomService: ClassroomService, private  catalogService: CatalogService, private quizPupilService: QuizPupilService) {
    this.disableQuiz= this.dataRoute.snapshot.params['done'];
    this.diasbledQuizs.push(this.disableQuiz);
  }

  ngOnInit() {

    if (localStorage.getItem('userId') == "") {
      this.router.navigate(['']);
    }

    this.update();
  }

  update() {
    //de ce +???
    this.loginservice.getUserById(+localStorage.getItem('userId')).subscribe(user => {
      this.pupilService.getPupilByUserId(user.id).subscribe(pupil => {
        this.pupil = pupil;
        this.pupilService.getClassroomOfPupil(pupil.id).subscribe(classroom => {
          this.classroomId = classroom.id;
          this.selectedId = classroom.id;


          this.getSubjectsChatrooms();

        })
      })
    })

  }

  select(selected: SubjectGrade){
    this.selectedRow=selected;
}
  viewCatalog() {
    this.hidden = true;
    this.catalogService.getUserCatalog(localStorage.getItem('userId')).subscribe(grades => {
      this.grades = grades;
      let table = [];
      this.maxNr =this.match(table, grades);
      this.normalizeInput(table,this.maxNr)
      this.table = table;
    })
  }
  normalizeInput(subjectGrades: SubjectGrade[], maxNr: number) {
    subjectGrades.forEach(subjctGrade => {
      while (subjctGrade.grades.length < maxNr) {
        subjctGrade.grades.push(new Grade(-1));

      }
    })
  }

  match(table, grades: Grade[]): number {
    var maxNr=1;
    this.subjchats.forEach(function (subject) {
      var subjectGrade = new SubjectGrade(subject)
      grades.forEach(function (grade) {
        if (grade.subject == subject.subject.id) {
          subjectGrade.grades.push(grade);
        }
      })
      if(subjectGrade.grades.length>maxNr){
        maxNr=subjectGrade.grades.length;
      }
      table.push(subjectGrade);
    });
    return maxNr
  }

  getSubjectsChatrooms() {
    this.classroomService.getClassroomSubjectChatrooms(this.classroomId).subscribe(lista => {
      console.log("au venit x chaturi:" + lista.length);
      this.subjchats = lista;
      this.selectedId = lista[0].chatroom.id;
      this.ClassroomSubjectChatroomId=lista[0].id;
      this.selectedRow=  new SubjectGrade( lista[0]);
    })

  }


  takeQuiz() {
    this.quizPupilService.getQuiz(this.ClassroomSubjectChatroomId).subscribe(data => {
      console.log(data);
      var exists=0;
      this.diasbledQuizs.forEach(quizId=>{
        if(data.length>0 && quizId==data[0].id){
          exists++;
        }
      })
      if (exists==0 && data.length>0 && data[0].active) {
        this.router.navigate(['pupil/quiz/', JSON.stringify(this.ClassroomSubjectChatroomId)],);
      } else {
        alert("There is no active quiz!");
      }
    })
  }

  onSelect(subj: ClassroomSubjectChatroom) {
    this.selectedId = subj.chatroom.id;
    console.log(subj);
    this.ClassroomSubjectChatroomId = subj.id;
    this.hidden = false;
  }

  logout(){
    localStorage.setItem('userId', "");
    this.router.navigate(['']);
  }
}
