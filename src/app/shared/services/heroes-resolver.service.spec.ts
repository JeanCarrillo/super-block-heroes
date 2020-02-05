import { TestBed } from '@angular/core/testing';

import { HeroesResolverService } from './heroes-resolver.service';

describe('HeroesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroesResolverService = TestBed.get(HeroesResolverService);
    expect(service).toBeTruthy();
  });
});
