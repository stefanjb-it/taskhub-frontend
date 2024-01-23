import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSelectFieldComponent } from './simple-select-field.component';

describe('SimpleSelectFieldComponent', () => {
  let component: SimpleSelectFieldComponent;
  let fixture: ComponentFixture<SimpleSelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleSelectFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
