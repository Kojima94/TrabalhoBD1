import { TestBed } from '@angular/core/testing';

import { RegistrosvcService } from './registrosvc.service';

describe('RegistrosvcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrosvcService = TestBed.get(RegistrosvcService);
    expect(service).toBeTruthy();
  });
});
