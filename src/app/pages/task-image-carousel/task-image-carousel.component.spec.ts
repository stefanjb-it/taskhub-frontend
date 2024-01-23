import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskImageCarouselComponent } from './task-image-carousel.component';

describe('TaskImageCarouselComponent', () => {
  let component: TaskImageCarouselComponent;
  let fixture: ComponentFixture<TaskImageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskImageCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskImageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
