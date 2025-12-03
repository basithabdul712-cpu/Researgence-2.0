import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditByMineDetailComponent } from './project-edit-by-mine-detail.component';

describe('ProjectEditByMineDetailComponent', () => {
  let component: ProjectEditByMineDetailComponent;
  let fixture: ComponentFixture<ProjectEditByMineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectEditByMineDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectEditByMineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
