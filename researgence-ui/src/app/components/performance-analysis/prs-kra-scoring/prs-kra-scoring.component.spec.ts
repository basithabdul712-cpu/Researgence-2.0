import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRSKRAEligibiltyListComponent } from './prs-kra-eligibilty-list.component';

describe('PRSKRAEligibiltyListComponent', () => {
  let component: PRSKRAEligibiltyListComponent;
  let fixture: ComponentFixture<PRSKRAEligibiltyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PRSKRAEligibiltyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PRSKRAEligibiltyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
