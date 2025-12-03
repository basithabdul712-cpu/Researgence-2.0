import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightReportsComponent } from './insight-reports.component';

describe('InsightReportsComponent', () => {
  let component: InsightReportsComponent;
  let fixture: ComponentFixture<InsightReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsightReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsightReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
