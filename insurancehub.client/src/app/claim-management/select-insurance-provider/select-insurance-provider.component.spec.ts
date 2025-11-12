import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInsuranceProviderComponent } from './select-insurance-provider.component';

describe('SelectInsuranceProviderComponent', () => {
  let component: SelectInsuranceProviderComponent;
  let fixture: ComponentFixture<SelectInsuranceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectInsuranceProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectInsuranceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
