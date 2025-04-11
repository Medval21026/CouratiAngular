import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSubjectComponent } from './ajouter-subject.component';

describe('AjouterSubjectComponent', () => {
  let component: AjouterSubjectComponent;
  let fixture: ComponentFixture<AjouterSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
