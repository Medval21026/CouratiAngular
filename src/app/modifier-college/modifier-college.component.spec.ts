import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCollegeComponent } from './modifier-college.component';

describe('ModifierCollegeComponent', () => {
  let component: ModifierCollegeComponent;
  let fixture: ComponentFixture<ModifierCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierCollegeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
