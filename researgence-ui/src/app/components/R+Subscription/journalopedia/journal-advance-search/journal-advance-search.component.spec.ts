import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalAdvanceSearchComponent } from './journal-advance-search.component';

describe('JournalAdvanceSearchComponent', () => {
  let component: JournalAdvanceSearchComponent;
  let fixture: ComponentFixture<JournalAdvanceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalAdvanceSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalAdvanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
