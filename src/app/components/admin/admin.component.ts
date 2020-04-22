import { Component, OnInit } from '@angular/core';
import {Classroom} from '../../domain/Classroom';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
   clasrooms: Classroom[];
   idClassroom: number=-1;

  constructor() {
   const c1: Classroom={id:1, pupils: null, teachers: null, name: "8 A"}
   const c2: Classroom={id:2, pupils: null, teachers: null, name: "5 B"}
   const c3: Classroom={id:3, pupils: null, teachers: null, name: "7 C"}
   this.clasrooms=[c1 ,c2,c3];
  }

  ngOnInit() {
  }
  onSelect(id:number){
    this.idClassroom=id;
  }


}
