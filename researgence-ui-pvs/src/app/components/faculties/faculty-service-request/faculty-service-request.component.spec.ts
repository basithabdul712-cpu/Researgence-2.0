import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyServiceRequestComponent } from './faculty-service-request.component';

describe('FacultyServiceRequestComponent', () => {
  let component: FacultyServiceRequestComponent;
  let fixture: ComponentFixture<FacultyServiceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyServiceRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
