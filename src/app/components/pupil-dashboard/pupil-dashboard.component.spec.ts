import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilDashboardComponent } from './pupil-dashboard.component';

describe('PupilDashboardComponent', () => {
  let component: PupilDashboardComponent;
  let fixture: ComponentFixture<PupilDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PupilDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
