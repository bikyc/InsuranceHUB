import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedClaimsComponent } from './processed-claims.component';

describe('ProcessedClaimsComponent', () => {
  let component: ProcessedClaimsComponent;
  let fixture: ComponentFixture<ProcessedClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessedClaimsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessedClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
