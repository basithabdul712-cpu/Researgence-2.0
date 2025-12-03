import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyNewComponent } from './faculty-new.component';

describe('FacultyNewComponent', () => {
  let component: FacultyNewComponent;
  let fixture: ComponentFixture<FacultyNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
