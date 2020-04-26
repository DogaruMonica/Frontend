import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TeacherService} from '../../services/teacher/teacher.service';
import {Teacher} from '../../domain/Teacher';
import {Subject} from '../../domain/Subject';
import {SubjectsService} from '../../services/subjects/subjects.service';
import {User} from '../../domain/User';
import {Pupil} from '../../domain/Pupil';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit,OnChanges {
  @Input() idSubject: number = -1;
  subject: Subject;
  teachers: Teacher[];
  idselected: number;
  addComp: number=-1;
  u0:User={id:-1,email: "example@mail.com",password: "parola1",role: "teacher"}
  t0:Teacher={id:-1,user: this.u0,  firstname: "First Name" ,lastname: "Last Name", classrooms: null, subjects: null}

  constructor(private teacherService: TeacherService,private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.update()
  }
  ngOnChanges(changes: SimpleChanges): void {    this.ngOnInit();
  }

  update(){
   this.getSubject(this.idSubject);

   }

  select(n: number){
    this.idselected=n;
    this.update()
  }

  activateAddComp(){
    //shows panel for adding a pupil.
    this.addComp=1;
  }
  addTeacher(){
    //TODO schimba parola inainte sa trimiti -aici partea de generare
    this.teacherService.addUser(this.u0).subscribe(user=>{
      console.log("id-ul este: "+ user.id);
      this.teacherService.addTeacher(this.t0,user.id).subscribe(teacher=>{
        console.log("adaugat prof!");
        this.addComp=-1;
         let idt:number=teacher.id;
         console.log("id de teacher care urmeaza sa fie asignat")
        this.teacherService.assignTeacherSubject(this.idSubject,idt).subscribe(()=>{
          this.update();
        });
       }
      );

    });

  }
  updateTeacher(){

  }
  deleteTeacher(){

    this.teacherService.deleteTeacher(this.idselected).subscribe(()=>{
      this.idselected=-1;
      this.update();
    })
  }
  getSubject(idSubject: number) {
    this.subjectsService.getSubject(idSubject).subscribe(sub=>{
      this.subject=sub;
      console.log("subject name din sub :"+ sub.name);
      this.teachers=sub.teachers;

    });
  }}




