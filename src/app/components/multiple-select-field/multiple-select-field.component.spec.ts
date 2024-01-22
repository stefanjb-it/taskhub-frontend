import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelectFieldComponent } from './multiple-select-field.component';

describe('MultipleSelectFieldComponent', () => {
  let component: MultipleSelectFieldComponent;
  let fixture: ComponentFixture<MultipleSelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleSelectFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
