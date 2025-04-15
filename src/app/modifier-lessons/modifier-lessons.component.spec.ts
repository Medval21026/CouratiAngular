import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierLessonsComponent } from './modifier-lessons.component';

describe('ModifierLessonsComponent', () => {
  let component: ModifierLessonsComponent;
  let fixture: ComponentFixture<ModifierLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierLessonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
