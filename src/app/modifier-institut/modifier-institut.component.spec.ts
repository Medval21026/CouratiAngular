import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierInstitutComponent } from './modifier-institut.component';

describe('ModifierInstitutComponent', () => {
  let component: ModifierInstitutComponent;
  let fixture: ComponentFixture<ModifierInstitutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierInstitutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierInstitutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
