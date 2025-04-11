import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSemestreComponent } from './ajouter-semestre.component';

describe('AjouterSemestreComponent', () => {
  let component: AjouterSemestreComponent;
  let fixture: ComponentFixture<AjouterSemestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterSemestreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterSemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
