import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarCompareComponent } from './scholar-compare.component';

describe('ScholarCompareComponent', () => {
  let component: ScholarCompareComponent;
  let fixture: ComponentFixture<ScholarCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarCompareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
