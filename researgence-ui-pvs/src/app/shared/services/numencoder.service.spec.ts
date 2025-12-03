import { TestBed } from '@angular/core/testing';

import { NumencoderService } from './numencoder.service';

describe('NumencoderService', () => {
  let service: NumencoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumencoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
