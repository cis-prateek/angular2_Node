import { TestBed, inject } from '@angular/core/testing';

import { ValidUserService } from './valid-user.service';

describe('ValidUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidUserService]
    });
  });

  it('should be created', inject([ValidUserService], (service: ValidUserService) => {
    expect(service).toBeTruthy();
  }));
});
