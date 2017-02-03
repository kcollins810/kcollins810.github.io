/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SilverlightComponent } from './silverlight.component';

describe('SilverlightComponent', () => {
  let component: SilverlightComponent;
  let fixture: ComponentFixture<SilverlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SilverlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilverlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
