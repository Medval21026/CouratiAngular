import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierUniversityComponent } from './modifier-university.component';

describe('ModifierUniversityComponent', () => {
  let component: ModifierUniversityComponent;
  let fixture: ComponentFixture<ModifierUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierUniversityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
