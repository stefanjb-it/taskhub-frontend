import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOverviewComponent } from './management-overview.component';

describe('ManagementOverviewComponent', () => {
  let component: ManagementOverviewComponent;
  let fixture: ComponentFixture<ManagementOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
