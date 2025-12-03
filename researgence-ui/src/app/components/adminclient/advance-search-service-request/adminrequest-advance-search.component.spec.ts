import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrequestAdvanceSearchComponent } from './adminrequest-advance-search.component';

describe('AdminrequestAdvanceSearchComponent', () => {
  let component: AdminrequestAdvanceSearchComponent;
  let fixture: ComponentFixture<AdminrequestAdvanceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminrequestAdvanceSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminrequestAdvanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
