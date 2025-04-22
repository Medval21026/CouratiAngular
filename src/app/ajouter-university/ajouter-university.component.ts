import { Component, Output, EventEmitter } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajouter-university',
  imports: [FormsModule],
  templateUrl: './ajouter-university.component.html',
  styleUrls: ['./ajouter-university.component.css']
})
export class AjouterUniversityComponent {
  university = { name_fr: '' , name_ar: ''};
  @Output() universityAdded = new EventEmitter<any>();  // Émettre l'université ajoutée

  constructor(private universityService: UniversityService) {}

  onSubmit() {
    if (this.university.name_fr.trim() !== '' && this.university.name_ar) {
      this.universityService.addUniversity(this.university)
        .then(response => {
          const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
          if (closeButton) {
            (closeButton as HTMLButtonElement).click();
          }
          this.universityAdded.emit(response);
          this.university.name_fr = '';
          this.university.name_ar = '';

        })
        .catch(error => {
          console.error('Erreur:', error);
          alert('Erreur lors de l\'ajout de l\'université');
        });
    }
  }
}
