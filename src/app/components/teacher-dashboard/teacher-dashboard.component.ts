import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TeacherService} from '../../services/teacher/teacher.service';
import {ClassroomSubjectChatroom} from '../../domain/ClassroomSubjectChatroom';
import {Teacher} from '../../domain/Teacher';
import {QuizService} from '../../services/quiz/quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit,OnChanges {
   lista: ClassroomSubjectChatroom[];
   idUser: number;
   selectedSubClasChat:ClassroomSubjectChatroom;
   teacher: Teacher;
   showQuiz: number=0;

  constructor(private teacherService: TeacherService,private quizService: QuizService) { }
 ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
 }

  ngOnInit() {
    this.ngUpdate();
  }
  ngUpdate(){
    this.idUser=+localStorage.getItem('userId');
    this.getTeacher();
  }


  onSelect(id: ClassroomSubjectChatroom) {
    this.selectedSubClasChat = id;

  }
  getLista() {
    this.teacherService.getChatroomsForTeachers(this.teacher.id).subscribe(lista=>{

      this.lista=lista;
      this.selectedSubClasChat=lista[0];
    });
  console.log(this.lista);
  }

  getTeacher(){
    this.teacherService.getTeacherByUserId(this.idUser).subscribe(teacher=>{
      this.teacher=teacher;
      this.getLista();
    });


  }


}
