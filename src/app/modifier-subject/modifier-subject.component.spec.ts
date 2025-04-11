import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSubjectComponent } from './modifier-subject.component';

describe('ModifierSubjectComponent', () => {
  let component: ModifierSubjectComponent;
  let fixture: ComponentFixture<ModifierSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
