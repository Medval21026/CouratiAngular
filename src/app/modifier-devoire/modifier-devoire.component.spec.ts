import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDevoireComponent } from './modifier-devoire.component';

describe('ModifierDevoireComponent', () => {
  let component: ModifierDevoireComponent;
  let fixture: ComponentFixture<ModifierDevoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierDevoireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierDevoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
