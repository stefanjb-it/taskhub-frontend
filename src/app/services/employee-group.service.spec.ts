import { TestBed } from '@angular/core/testing';

import { EmployeeGroupService } from './employee-group.service';

describe('EmployeeGroupService', () => {
  let service: EmployeeGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
