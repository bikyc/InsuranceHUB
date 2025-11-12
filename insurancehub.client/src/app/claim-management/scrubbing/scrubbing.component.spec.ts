import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrubbingComponent } from './scrubbing.component';

describe('ScrubbingComponent', () => {
  let component: ScrubbingComponent;
  let fixture: ComponentFixture<ScrubbingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrubbingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrubbingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
