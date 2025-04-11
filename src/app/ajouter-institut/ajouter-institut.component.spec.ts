import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterInstitutComponent } from './ajouter-institut.component';

describe('AjouterInstitutComponent', () => {
  let component: AjouterInstitutComponent;
  let fixture: ComponentFixture<AjouterInstitutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterInstitutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterInstitutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
