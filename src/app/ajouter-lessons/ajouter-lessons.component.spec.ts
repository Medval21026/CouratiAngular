import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterLessonsComponent } from './ajouter-lessons.component';

describe('AjouterLessonsComponent', () => {
  let component: AjouterLessonsComponent;
  let fixture: ComponentFixture<AjouterLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterLessonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
