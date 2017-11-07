import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontindexComponent } from './frontindex.component';

describe('FrontindexComponent', () => {
  let component: FrontindexComponent;
  let fixture: ComponentFixture<FrontindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
