import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyViewComponent } from './faculty-view.component';

describe('FacultyViewComponent', () => {
  let component: FacultyViewComponent;
  let fixture: ComponentFixture<FacultyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
