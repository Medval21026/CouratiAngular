import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SemestreService } from '../services/semestre.service';

@Component({
  selector: 'app-ajouter-semestre',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ajouter-semestre.component.html',
  styleUrls: ['./ajouter-semestre.component.css']
})
export class AjouterSemestreComponent {
  semestre = { semesterNumber: '' };
  @Output() semestreAdded = new EventEmitter<any>();

  constructor(private semestreService: SemestreService) {}

  async onSubmit() {
  // Vérifie si semesterNumber est un entier valide
  if (Number.isInteger(this.semestre.semesterNumber)) {
    try {
      console.log('Formulaire soumis:', this.semestre);
      const newSemestre = await this.semestreService.createSemestre(this.semestre);
      const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
      if (closeButton) {
        (closeButton as HTMLButtonElement).click();
      }
      this.semestreAdded.emit(newSemestre);
      this.semestre.semesterNumber = ''; // Reset le champ après l'ajout
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'ajout du semestre');
    }
  } else {
    alert('Le numéro du semestre doit être un entier valide');
  }
}

}
