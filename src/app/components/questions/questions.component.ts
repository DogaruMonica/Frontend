import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QuizService} from '../../services/quiz/quiz.service';
import {Quiz} from '../../domain/Quiz';
import {Question} from '../../domain/Question';
import {QuestionService} from '../../services/question/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit,OnChanges {
  @Input() idQuiz: number=-1;

  quiz:Quiz;
  test: string="NOPE";
  questionToBeAdded:Question={id:-1,statement:'',correctAnswer:'',wrongAnswer1:'',wrongAnswer2:'',wrongAnswer3:''}

  constructor(private quizService:QuizService,private questionService: QuestionService) { }

  ngOnInit() {
    this.update();
  }
  update(){
    this.getQuiz()

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  toggle(){
    this.test="yup";
    console.log(this.quiz.active)
    this.questionService.toggle(this.idQuiz).subscribe(()=>{this.update(); console.log("DUPA TOGGLE"+ this.quiz.active)})

  }
  getQuiz(){
    this.quizService.getQuizById(this.idQuiz).subscribe(q=>{
      this.quiz=q;

    })

  }

  addQuestion(){
    this.questionService.addQuestion(this.idQuiz,this.questionToBeAdded).subscribe(
      ()=>{
        this.questionToBeAdded={id:-1,statement:'',correctAnswer:'',wrongAnswer1:'',wrongAnswer2:'',wrongAnswer3:''};
        this.update();
      }

    );

  }


}
