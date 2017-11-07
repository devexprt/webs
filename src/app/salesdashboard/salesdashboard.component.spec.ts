import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesdashboardComponent } from './salesdashboard.component';

describe('SalesdashboardComponent', () => {
  let component: SalesdashboardComponent;
  let fixture: ComponentFixture<SalesdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
