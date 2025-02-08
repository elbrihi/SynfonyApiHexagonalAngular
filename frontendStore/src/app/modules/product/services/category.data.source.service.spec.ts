import { TestBed } from '@angular/core/testing';

import { CategoryDataSourceService } from './category.data.source.service';

describe('CategoryDataSourceService', () => {
  let service: CategoryDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
