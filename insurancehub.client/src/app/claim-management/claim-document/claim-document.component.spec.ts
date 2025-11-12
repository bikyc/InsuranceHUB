import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimDocumentComponent } from './claim-document.component';

describe('ClaimDocumentComponent', () => {
  let component: ClaimDocumentComponent;
  let fixture: ComponentFixture<ClaimDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
