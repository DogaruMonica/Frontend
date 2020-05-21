import { TestBed } from '@angular/core/testing';

import { QuizPupilService } from './quiz-pupil.service';

describe('QuizPupilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizPupilService = TestBed.get(QuizPupilService);
    expect(service).toBeTruthy();
  });
});
