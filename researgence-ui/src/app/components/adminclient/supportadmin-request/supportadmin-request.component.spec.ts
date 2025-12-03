import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportadminRequestComponent } from './supportadmin-request.component';

describe('SupportadminRequestComponent', () => {
  let component: SupportadminRequestComponent;
  let fixture: ComponentFixture<SupportadminRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportadminRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportadminRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
