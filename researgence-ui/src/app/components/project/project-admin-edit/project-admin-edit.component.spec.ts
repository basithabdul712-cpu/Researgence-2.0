import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAdminEditComponent } from './project-admin-edit.component';

describe('ProjectAdminEditComponent', () => {
  let component: ProjectAdminEditComponent;
  let fixture: ComponentFixture<ProjectAdminEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAdminEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
