import { TestBed } from '@angular/core/testing';

import { SerpAPIService } from './serp-api.service';

describe('SerpAPIService', () => {
  let service: SerpAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerpAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
