import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterspecializationComponent } from './ajouter-specialization.component';

describe('AjouterspecializationComponent', () => {
  let component: AjouterspecializationComponent;
  let fixture: ComponentFixture<AjouterspecializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterspecializationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterspecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
