/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SilverlightServiceService } from './silverlight-service.service';

describe('Service: SilverlightService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SilverlightServiceService]
    });
  });

  it('should ...', inject([SilverlightServiceService], (service: SilverlightServiceService) => {
    expect(service).toBeTruthy();
  }));
});
