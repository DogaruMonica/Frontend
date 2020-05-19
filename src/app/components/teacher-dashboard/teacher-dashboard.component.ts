import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../../services/teacher/teacher.service';
import {ClassroomSubjectChatroom} from '../../domain/ClassroomSubjectChatroom';
import {Teacher} from '../../domain/Teacher';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
   lista: ClassroomSubjectChatroom[];
   idUser: number;
   selectedId:number;
   teacher: Teacher;
  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.ngUpdate();
  }
  ngUpdate(){
    this.idUser=+localStorage.getItem('userId');
    this.getTeacher();
  }
  onSelect(id: number) {
    this.selectedId = id;
  }
  getLista() {
    this.teacherService.getChatroomsForTeachers(this.teacher.id).subscribe(lista=>{

      this.lista=lista;
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
