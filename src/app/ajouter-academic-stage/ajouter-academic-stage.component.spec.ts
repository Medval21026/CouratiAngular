import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAcademicStageComponent } from './ajouter-academic-stage.component';

describe('AjouterAcademicStageComponent', () => {
  let component: AjouterAcademicStageComponent;
  let fixture: ComponentFixture<AjouterAcademicStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterAcademicStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterAcademicStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
