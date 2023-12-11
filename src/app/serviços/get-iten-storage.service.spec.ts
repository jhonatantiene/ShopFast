import { TestBed } from '@angular/core/testing';

import { GetItenStorageService } from './get-iten-storage.service';

describe('GetItenStorageService', () => {
  let service: GetItenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetItenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
