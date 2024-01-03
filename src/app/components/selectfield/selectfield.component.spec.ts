import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectfieldComponent } from './selectfield.component';

describe('SelectfieldComponent', () => {
  let component: SelectfieldComponent;
  let fixture: ComponentFixture<SelectfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectfieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
