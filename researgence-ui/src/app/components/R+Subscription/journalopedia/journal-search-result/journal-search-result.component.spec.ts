import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalSearchResultComponent } from './journal-search-result.component';

describe('JournalSearchResultComponent', () => {
  let component: JournalSearchResultComponent;
  let fixture: ComponentFixture<JournalSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalSearchResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
