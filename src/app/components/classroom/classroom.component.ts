import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AdminComponent} from '../admin/admin.component';
import {Classroom} from '../../domain/Classroom';
import {Pupil} from '../../domain/Pupil';
import {Subject} from '../../domain/Subject';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit,OnChanges {
  @Input() idClassroom: number = -1;
  classroom: Classroom;

  p1: Pupil={id:1,email:"craig@yahoo.com", role: "pupil", firstname: "Craig" ,lastname: "Johnson",editable: false }
  p2: Pupil={id:2,email:"craig@yahoo.com", role: "pupil", firstname: "Anne" ,lastname: "Davidson",editable: false  }
  p3: Pupil={id:3,email:"craig@yahoo.com", role: "pupil", firstname: "John" ,lastname: "Miles", editable: false }
  s1:Subject= {id:1,name:"Mathematics"}
  s2:Subject= {id:2,name:"English"}
  s3:Subject= {id:3,name:"literature"}
  pupils: Pupil[]=[this.p1,this.p2,this.p3];
  subjects: Subject[]=[this.s1,this.s2,this.s3];
   //se va lua clasa din service direct
   c1: Classroom={id:1, pupils: this.pupils, teachers: null, name: "8 A"}
   c2: Classroom={id:2, pupils: this.pupils, teachers: null, name: "5 B"}
   c3: Classroom={id:3, pupils: this.pupils, teachers: null, name: "7 C"}



  constructor(public parent: AdminComponent) {}



  ngOnInit(){
    this.update()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  update(){
    if(this.idClassroom==1){
      this.classroom=this.c1;
    }else if(this.idClassroom==2){
      this.classroom=this.c2;
    }else{
      this.classroom=this.c3;
    }

  }

  addPupil(id: number , email: string, role: string, firstname: string ,lastname: string, editable: boolean){
    let p1: Pupil={id:id,email: email, role: role, firstname: firstname ,lastname: lastname, editable:editable };
    this.pupils.push(p1);
    this.update();
  }
  deletePupil(){

  }


}
