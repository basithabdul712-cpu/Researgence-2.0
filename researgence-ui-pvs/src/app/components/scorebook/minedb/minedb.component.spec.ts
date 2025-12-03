import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinedbComponent } from './minedb.component';

describe('MinedbComponent', () => {
  let component: MinedbComponent;
  let fixture: ComponentFixture<MinedbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinedbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinedbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
