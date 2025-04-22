import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevoireComponent } from './devoire.component';

describe('DevoireComponent', () => {
  let component: DevoireComponent;
  let fixture: ComponentFixture<DevoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevoireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
