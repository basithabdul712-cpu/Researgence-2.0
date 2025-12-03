import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcriptionReportComponent } from './subcription-report.component';

describe('SubcriptionReportComponent', () => {
  let component: SubcriptionReportComponent;
  let fixture: ComponentFixture<SubcriptionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcriptionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcriptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
