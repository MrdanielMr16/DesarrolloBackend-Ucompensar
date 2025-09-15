import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivoDetail } from './dispositivo-detail';

describe('DispositivoDetail', () => {
  let component: DispositivoDetail;
  let fixture: ComponentFixture<DispositivoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispositivoDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispositivoDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
