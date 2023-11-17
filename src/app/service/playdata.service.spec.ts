import { TestBed } from '@angular/core/testing';

import { PlaydataService } from './playdata.service';

describe('PlaydataService', () => {
  let service: PlaydataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaydataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
