import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInputfieldComponent } from './date-inputfield.component';

describe('DateInputfieldComponent', () => {
  let component: DateInputfieldComponent;
  let fixture: ComponentFixture<DateInputfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateInputfieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateInputfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
