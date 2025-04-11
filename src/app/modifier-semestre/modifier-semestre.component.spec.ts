import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSemestreComponent } from './modifier-semestre.component';

describe('ModifierSemestreComponent', () => {
  let component: ModifierSemestreComponent;
  let fixture: ComponentFixture<ModifierSemestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierSemestreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierSemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
