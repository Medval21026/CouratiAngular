import { Component } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ajouter-university',
  imports: [FormsModule],
  templateUrl: './ajouter-university.component.html',
  styleUrl: './ajouter-university.component.css'
})
export class AjouterUniversityComponent {
  university = { name: '' };

  constructor(private universityService: UniversityService) {}

  onSubmit() {
    if (this.university.name.trim() !== '') {
      this.universityService.addUniversity(this.university)
        .then(response => {
          this.university.name = '';
          window.location.reload(); // Réinitialiser le champ après soumission
        })
        .catch(error => {
          console.error('Erreur:', error);
          alert('Erreur lors de l\'ajout de l\'université');
        });
    }
  }
}
