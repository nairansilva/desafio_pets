import { TestBed } from '@angular/core/testing';

import { BreedsService } from './dogBreeds.service';

describe('BreedsService', () => {
  let service: BreedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
