import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterUniversityComponent } from './ajouter-university.component';

describe('AjouterUniversityComponent', () => {
  let component: AjouterUniversityComponent;
  let fixture: ComponentFixture<AjouterUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterUniversityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
