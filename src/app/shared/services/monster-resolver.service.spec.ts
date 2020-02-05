import { TestBed } from '@angular/core/testing';

import { MonsterResolverService } from './monster-resolver.service';

describe('MonsterResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonsterResolverService = TestBed.get(MonsterResolverService);
    expect(service).toBeTruthy();
  });
});
