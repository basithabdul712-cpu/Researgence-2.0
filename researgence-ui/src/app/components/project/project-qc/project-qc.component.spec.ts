import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectQCComponent } from './project-qc.component';

describe('ProjQCComponent', () => {
  let component: ProjectQCComponent;
  let fixture: ComponentFixture<ProjectQCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectQCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectQCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
