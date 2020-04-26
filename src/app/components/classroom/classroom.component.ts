import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AdminComponent} from '../admin/admin.component';
import {Classroom} from '../../domain/Classroom';
import {Pupil} from '../../domain/Pupil';
import {Subject} from '../../domain/Subject';
import {ClassroomService} from '../../services/classroom/classroom.service';
import {User} from '../../domain/User';
import {PupilService} from '../../services/pupil/pupil.service';


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit,OnChanges {
  @Input() idClassroom: number = -1;
  classroom: Classroom;
  pupils: Pupil[];
  addComp: number=-1;
  idselected=-1;






   u0:User={id:0,email: "example@mail.com",password: "parola1",role: "pupil"}
   p0:Pupil={id:-1,user: this.u0,  firstname: "First Name" ,lastname: "Last Name"}


  constructor(private classroomService: ClassroomService, private pupilService: PupilService,public parent: AdminComponent) {}



  ngOnInit(){
    this.update()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  update(){
    this.getClassroom(this.idClassroom);
  }

  select(n: number){
     this.idselected=n;
     this.update()
  }
  addPupil(){
    //TODO schimba parola inainte sa trimiti -aici partea de generare
     this.pupilService.addUser(this.u0).subscribe(user=>{
       console.log("id-ul este: "+ user.id);
       this.pupilService.addPupil(this.p0,user.id,this.idClassroom).subscribe(()=>{
         console.log("adaugat!");
         this.addComp=-1;
         this.update();}
       );

     });

  }


  activateAddComp(){
     //shows panel for adding a pupil.
     this.addComp=1;
  }

  updatePupil( ){
     this.pupilService.getPupil(this.idselected).subscribe(pupil=>{
       pupil.user.email=this.p0.user.email;
       pupil.firstname=this.p0.firstname;
       pupil.lastname=this.p0.lastname
       this.pupilService.updatePupil(pupil)
       this.idselected=-1
       this.update()

     });

  }

  deletePupil(){
     this.pupilService.deletePupil(this.idselected).subscribe(()=>{
       this.idselected=-1
       this.addComp=-1;
       this.update()

     });

  }

  getClassroom(idClassroom: number){
    this.classroomService.getClassroom(idClassroom).subscribe(classroom =>{
      this.classroom=classroom;
      this.pupils=classroom.pupils;
    });
  }

}
