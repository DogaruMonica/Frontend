import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizPupilService} from "../../services/quizPupil/quiz-pupil.service";
import {Quiz} from "../../domain/Quiz";
import {PupilService} from "../../services/pupil/pupil.service";

@Component({
  selector: 'app-quiz-pupil',
  templateUrl: './quiz-pupil.component.html',
  styleUrls: ['./quiz-pupil.component.css']
})
export class QuizPupilComponent implements OnInit {
  id: number;
  quiz: Quiz;
  pupilId: number;
  questionId: number;
  answer: string;
  finished: boolean = false;
  timeLeft: number = 60;
  interval: number;

  constructor(private router: Router, private dataRoute: ActivatedRoute, private quizPupilService: QuizPupilService,
              private pupilService: PupilService) {
    this.id = this.dataRoute.snapshot.params['id'];
  }

  ngOnInit() {

    if (localStorage.getItem('userId') == "") {
      this.router.navigate(['']);
    }
    this.getQuiz();
    this.getPupilId();
    this.startTimer();
  }


  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.getScore();
        this.quizPupilService.toggleActive(this.quiz.id);
        clearInterval(this.interval);
      }
    }, 1000)
  }

  goDashboard() {
    clearInterval(this.interval);
    this.router.navigate(['pupil', this.quiz.id]);
  }

  getQuiz() {
    this.quizPupilService.getQuiz(this.id).subscribe(data => {
      this.quiz = data[0];
      this.quiz.questions = this.shuffle(this.quiz.questions);
    })
  }

  choose(event) {
    this.answer = event.target.value
  }

  submit(event) {
    this.questionId = event.target.id;
    this.quizPupilService.sendQuestion(this.quiz.id, this.questionId, this.pupilId, this.answer).subscribe(data => {
    })

    document.getElementById(event.target.id).style.pointerEvents = "none";
    document.getElementById(event.target.id).style.opacity = "0.5";
  }

  getPupilId() {
    this.pupilService.getPupilByUserId(+localStorage.getItem('userId')).subscribe(pupil => {
      this.pupilId = pupil.id;
    });
  }

  getScore() {
    this.quizPupilService.getScore(this.quiz.id, this.pupilId).subscribe(data => {
      alert("your grade is: " + data);
      this.finished = true;
      this.goDashboard()
    })

  }

  shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  logout() {
    localStorage.setItem('userId', "");
    clearInterval(this.interval);
    this.router.navigate(['']);
  }
}
