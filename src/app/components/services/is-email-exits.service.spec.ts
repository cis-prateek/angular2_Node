import { TestBed, inject } from '@angular/core/testing';

import { IsEmailExitsService } from './is-email-exits.service';

describe('IsEmailExitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsEmailExitsService]
    });
  });

  it('should be created', inject([IsEmailExitsService], (service: IsEmailExitsService) => {
    expect(service).toBeTruthy();
  }));
});
