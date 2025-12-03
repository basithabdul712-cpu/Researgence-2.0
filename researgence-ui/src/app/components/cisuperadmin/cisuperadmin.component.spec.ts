import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CisuperadminComponent } from './cisuperadmin.component';

describe('CisuperadminComponent', () => {
  let component: CisuperadminComponent;
  let fixture: ComponentFixture<CisuperadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CisuperadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CisuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
