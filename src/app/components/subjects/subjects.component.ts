import { Component, OnInit } from '@angular/core';
import {SubjectsService} from '../../services/subjects/subjects.service';
import {Subject} from '../../domain/Subject';
import {AdminComponent} from '../admin/admin.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects:Subject[];
  idSubject: number;
  activatedAdd:number=-1;
  subject: Subject={id:-1, teachers: null, name:"Subject"};
  constructor(private subjectService: SubjectsService, public parent: AdminComponent) { }

  ngOnInit() {
    this.update();
  }
  update(){

    this.getSubjects()
  }

  getSubjects(){

    this.subjectService.getSubjects().subscribe(subs=>{
      this.subjects=subs;
      this.idSubject=subs[0].id;

    })
  }
  onSelect(id: number) {
    this.idSubject= id;
  }

  activateAdd() {
    this.activatedAdd = 1;
  }
  addSubject(){
    this.subjectService.addSubject(this.subject).subscribe(()=>{
      this.activatedAdd=-1;
      this.update();
    })
  }
  deleteSubject(){
    this.subjectService.deleteSubject(this.idSubject).subscribe(()=>{
      this.activatedAdd=-1;
      this.update();
    })
  }
  switch(){
    this.parent.showadmin=1;
    this.update();

  }
}
