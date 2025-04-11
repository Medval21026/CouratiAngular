import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierspecializationComponent } from './modifier-specialization.component';

describe('ModifierspecializationComponent', () => {
  let component: ModifierspecializationComponent;
  let fixture: ComponentFixture<ModifierspecializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierspecializationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierspecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
