import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMineComponent } from './project-mine.component';

describe('ProjectMineComponent', () => {
  let component: ProjectMineComponent;
  let fixture: ComponentFixture<ProjectMineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
