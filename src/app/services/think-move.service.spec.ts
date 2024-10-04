import { TestBed } from '@angular/core/testing';

import { ThinkMoveService } from './think-move.service';

describe('ThinkMoveService', () => {
  let service: ThinkMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThinkMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
