import { Component, OnInit } from '@angular/core';
import {Classroom} from '../../domain/Classroom';
import {ClassroomService} from '../../services/classroom/classroom.service';
import {Pupil} from '../../domain/Pupil';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  clasrooms: Classroom[];
  classroom: Classroom={id:-1, teachers: null, pupils: null ,name:"Name"}
  idClassroom: number = -1;
  activatedAdd: number = -1;
  activatesubjects:number= -1;
  showadmin:number=1;


  constructor(private classroomService: ClassroomService) {

  }

  ngOnInit() {
    this.update();
  }

  onSelect(id: number) {
    this.idClassroom = id;
  }

  activateAdd() {
    this.activatedAdd = 1;
  }

  update() {
   this.getClassrooms()
  }
  getClassrooms(){
    this.classroomService.getClassrooms().subscribe(classrooms => {

      this.clasrooms = classrooms;
      this.idClassroom=classrooms[0].id;


    });
  }
  addClassroom(){
    this.classroomService.addClassroom(this.classroom).subscribe(()=>{
      this.activatedAdd=-1;
      this.update();
    })

  }

  deleteClassroom(){
    this.classroomService.deleteClassroom(this.idClassroom).subscribe(()=>{
      this.idClassroom=this.clasrooms[0].id;
      this.update();
    })

  }
  activateSubjects(){
    this.activatesubjects=1;
  }
  switch(){
    this.showadmin=-1;
    this.update();

  }
}
