import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectfieldComponent } from './multi-selectfield.component';

describe('MultiSelectfieldComponent', () => {
  let component: MultiSelectfieldComponent;
  let fixture: ComponentFixture<MultiSelectfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectfieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiSelectfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
