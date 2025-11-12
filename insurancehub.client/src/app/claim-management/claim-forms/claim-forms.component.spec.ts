import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimFormsComponent } from './claim-forms.component';

describe('ClaimFormsComponent', () => {
  let component: ClaimFormsComponent;
  let fixture: ComponentFixture<ClaimFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
