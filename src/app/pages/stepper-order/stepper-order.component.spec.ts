import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperOrderComponent } from './stepper-order.component';

describe('StepperOrderComponent', () => {
  let component: StepperOrderComponent;
  let fixture: ComponentFixture<StepperOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepperOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
