import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditByMineComponent } from './project-edit-by-mine.component';

describe('ProjectEditByMineComponent', () => {
  let component: ProjectEditByMineComponent;
  let fixture: ComponentFixture<ProjectEditByMineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectEditByMineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectEditByMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
