import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPupilComponent } from './quiz-pupil.component';

describe('QuizPupilComponent', () => {
  let component: QuizPupilComponent;
  let fixture: ComponentFixture<QuizPupilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizPupilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPupilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
