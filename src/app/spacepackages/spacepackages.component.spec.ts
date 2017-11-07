import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacepackagesComponent } from './spacepackages.component';

describe('SpacepackagesComponent', () => {
  let component: SpacepackagesComponent;
  let fixture: ComponentFixture<SpacepackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacepackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacepackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
