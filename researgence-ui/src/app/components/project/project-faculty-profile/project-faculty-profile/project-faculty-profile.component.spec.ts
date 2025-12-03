import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFacultyProfileComponent } from './project-faculty-profile.component';

describe('ProjectFacultyProfileComponent', () => {
  let component: ProjectFacultyProfileComponent;
  let fixture: ComponentFixture<ProjectFacultyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFacultyProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFacultyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
