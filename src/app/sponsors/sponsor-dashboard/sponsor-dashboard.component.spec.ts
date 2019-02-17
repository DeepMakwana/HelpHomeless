import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorDashboardComponent } from './sponsor-dashboard.component';

describe('SponsorDashboardComponent', () => {
  let component: SponsorDashboardComponent;
  let fixture: ComponentFixture<SponsorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
