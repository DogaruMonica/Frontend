import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TeacherDashboardComponent} from '../teacher-dashboard/teacher-dashboard.component';
import {QuizService} from '../../services/quiz/quiz.service';
import {Quiz} from '../../domain/Quiz';
import {Question} from '../../domain/Question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit ,OnChanges{
//  @Input()idQuiz: number = -1;

  quizName: string;
  quiz:Quiz;
  questions: Question[];
  constructor(public parent: TeacherDashboardComponent, private quizService: QuizService) { }

  ngOnInit() {
    this.ngUpdate();
  }
   ngUpdate(){
   this.getQuiz();
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  saveQuiz() {
     this.parent.showQuiz=0;
     this.ngOnInit();
  }
  getQuiz(){
  // this.quizService.getQuizById(this.idQuiz).subscribe(q=>{
  //   this.quiz=q;
  //   this.questions=q.questions;
  // })

  }
  addQuiz(){

  }
}
