import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from '../../domain/Quiz';
import {QuizService} from '../../services/quiz/quiz.service';
import {Question} from '../../domain/Question';

@Component({
  selector: 'app-quiz-dashboard',
  templateUrl: './quiz-dashboard.component.html',
  styleUrls: ['./quiz-dashboard.component.css']
})
export class QuizDashboardComponent implements OnInit ,OnChanges{
  @Input() idsubclaschat: number=-1;

  quizzesForThisSubjectClass: Quiz[];
  selectedQuizid:number;
  activatedAdd: number;
  quizToAdd: Quiz ={id: -1, name: '',active: false, questions: []};
  addedQuiz:Quiz;


  constructor(private router:Router, private dataRoute: ActivatedRoute,private quizservice:QuizService) {this.idsubclaschat= Number(this.dataRoute.snapshot.paramMap.get('id')); }

  ngOnInit() {
      this.update();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }
  activateAdd() {
    this.activatedAdd = 1;
  }
  update(){

    this.getQuizzes()
  }

  getQuizzes(){
    this.quizservice.getQuizzesByCSCId(this.idsubclaschat).subscribe(quizzes=>{
      this.selectedQuizid=quizzes[0].id;
      this.quizzesForThisSubjectClass=quizzes;

    })
  };

  addQuiz() {

    this.quizservice.addQuiz(this.quizToAdd.name, this.idsubclaschat).subscribe(q => {
      console.log(this.quizToAdd.name)
      this.addedQuiz = q;
      this.activatedAdd=-1;
      this.quizToAdd={id: -1, name: '',active: false, questions: []};
      this.update();
    });


  }

  onSelect(q:number) {

    this.selectedQuizid=q;

  }


  deleteQuiz() {
    this.quizservice.deleteQuiz( this.idsubclaschat).subscribe(()=> {
      this.update()
    });

  }


}
