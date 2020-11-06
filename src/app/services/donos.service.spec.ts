import { TestBed } from '@angular/core/testing';

import { DonosService } from './donos.service';

describe('DonosService', () => {
  let service: DonosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
