import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityIconComponent } from './capacity-icon.component';

describe('CapacityIconComponent', () => {
  let component: CapacityIconComponent;
  let fixture: ComponentFixture<CapacityIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacityIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
