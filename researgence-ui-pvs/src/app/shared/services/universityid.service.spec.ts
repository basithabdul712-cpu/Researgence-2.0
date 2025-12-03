import { TestBed } from '@angular/core/testing';

import { UniversityidService } from './universityid.service';

describe('UniversityidService', () => {
  let service: UniversityidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversityidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
