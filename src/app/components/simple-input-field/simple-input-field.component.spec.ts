import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleInputFieldComponent } from './simple-input-field.component';

describe('SimpleInputFieldComponent', () => {
  let component: SimpleInputFieldComponent;
  let fixture: ComponentFixture<SimpleInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleInputFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
