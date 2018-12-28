import { TestBed, inject } from '@angular/core/testing';

import { RadiografiaService } from './radiografia.service';

describe('RadiografiaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RadiografiaService]
    });
  });

  it('should be created', inject([RadiografiaService], (service: RadiografiaService) => {
    expect(service).toBeTruthy();
  }));
});
