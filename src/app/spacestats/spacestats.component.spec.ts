import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacestatsComponent } from './spacestats.component';

describe('SpacestatsComponent', () => {
  let component: SpacestatsComponent;
  let fixture: ComponentFixture<SpacestatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacestatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacestatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
