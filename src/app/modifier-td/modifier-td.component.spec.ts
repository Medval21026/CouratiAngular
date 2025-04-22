import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTdComponent } from './modifier-td.component';

describe('ModifierTdComponent', () => {
  let component: ModifierTdComponent;
  let fixture: ComponentFixture<ModifierTdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierTdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
