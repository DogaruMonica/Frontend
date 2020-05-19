import { Component, OnInit } from '@angular/core';
import {Pupil} from '../../domain/Pupil';
import {LoginService} from '../../services/login/login.service';
import {PupilService} from '../../services/pupil/pupil.service';
import {ClassroomSubjectChatroom} from '../../domain/ClassroomSubjectChatroom';
import {ClassroomService} from '../../services/classroom/classroom.service';

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
  constructor(private loginservice: LoginService, private pupilService: PupilService,private classroomService: ClassroomService) { }

  ngOnInit( ) {
    this.update();
  }
  update(){
    //de ce +???
    this.loginservice.getUserById(+localStorage.getItem('userId')).subscribe(user=>{
      const userId=user.id;
      this.pupilService.getPupilByUserId(user.id).subscribe( pupil=>{
        this.pupil=pupil;
        this.pupilService.getClassroomOfPupil(pupil.id).subscribe(classroom=>{
          this.classroomId=classroom.id;
          this.getSubjectsChatrooms();
        })
      })
    })

  }

  getSubjectsChatrooms(){
    this.classroomService.getClassroomSubjectChatrooms(this.classroomId).subscribe(lista=>{
      console.log("au venit x chaturi:"+ lista.length);
      this.subjchats=lista;
    })

  }
  onSelect(id: number) {
    this.selectedId = id;
  }

}
