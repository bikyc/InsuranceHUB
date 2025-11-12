import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsServerStatusComponent } from './ins-server-status.component';

describe('InsServerStatusComponent', () => {
  let component: InsServerStatusComponent;
  let fixture: ComponentFixture<InsServerStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsServerStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsServerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
