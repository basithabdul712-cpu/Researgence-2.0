import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUserDetailEditComponent } from './project-user-detail-edit.component';

describe('ProjectUserDetailEditComponent', () => {
  let component: ProjectUserDetailEditComponent;
  let fixture: ComponentFixture<ProjectUserDetailEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectUserDetailEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectUserDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
