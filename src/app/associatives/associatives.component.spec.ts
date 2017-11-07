import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociativesComponent } from './associatives.component';

describe('AssociativesComponent', () => {
  let component: AssociativesComponent;
  let fixture: ComponentFixture<AssociativesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociativesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
