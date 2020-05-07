import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectToClassroomComponent } from './add-subject-to-classroom.component';

describe('AddSubjectToClassroomComponent', () => {
  let component: AddSubjectToClassroomComponent;
  let fixture: ComponentFixture<AddSubjectToClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubjectToClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubjectToClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
