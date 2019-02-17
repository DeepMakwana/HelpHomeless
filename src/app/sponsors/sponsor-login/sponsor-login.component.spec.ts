import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorLoginComponent } from './sponsor-login.component';

describe('SponsorLoginComponent', () => {
  let component: SponsorLoginComponent;
  let fixture: ComponentFixture<SponsorLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
