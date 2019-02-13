import { TestBed, inject } from '@angular/core/testing';

import { ProfesionalService } from './profesional.service';

describe('ProfesionalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfesionalService]
    });
  });

  it('should be created', inject([ProfesionalService], (service: ProfesionalService) => {
    expect(service).toBeTruthy();
  }));
});
