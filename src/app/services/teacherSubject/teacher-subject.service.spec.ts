import { TestBed } from '@angular/core/testing';

import { TeacherSubjectService } from './teacher-subject.service';

describe('TeacherSubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherSubjectService = TestBed.get(TeacherSubjectService);
    expect(service).toBeTruthy();
  });
});
