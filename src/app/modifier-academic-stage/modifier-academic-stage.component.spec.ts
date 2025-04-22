import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierAcademicStageComponent } from './modifier-academic-stage.component';

describe('ModifierAcademicStageComponent', () => {
  let component: ModifierAcademicStageComponent;
  let fixture: ComponentFixture<ModifierAcademicStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierAcademicStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierAcademicStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
