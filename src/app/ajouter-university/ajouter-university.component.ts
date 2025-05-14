import { Component, Output, EventEmitter } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
          closeButton.click();
        }
        this.universityAdded.emit(response);
        this.university.name_fr = '';
        this.university.name_ar = '';

        // ✅ Message de succès
        Swal.fire({
          title: 'Ajout réussi',
          text: 'L’université a été ajoutée avec succès.',
          icon: 'success',
          confirmButtonText: 'OK',
          width: '350px',
          padding: '1.5em',
          customClass: {
            title: 'swal-title-custom',
            popup: 'swal-popup-custom',
            confirmButton: 'swal-confirm-button'
          },
          buttonsStyling: false
        });
      })
      .catch(error => {
        console.error('Erreur:', error);

        // ❌ Message d'erreur
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur s’est produite lors de l’ajout de l’université.',
          icon: 'error',
          confirmButtonText: 'OK',
          width: '350px',
          padding: '1.5em',
          customClass: {
            title: 'swal-title-custom',
            popup: 'swal-popup-custom',
            confirmButton: 'swal-confirm-button'
          },
          buttonsStyling: false
        });
      });
  } else {
    // ⚠️ Champs vides
    Swal.fire({
      title: 'Champs requis',
      text: 'Veuillez remplir tous les champs obligatoires.',
      icon: 'warning',
      confirmButtonText: 'OK',
      width: '350px',
      padding: '1.5em',
      customClass: {
        title: 'swal-title-custom',
        popup: 'swal-popup-custom',
        confirmButton: 'swal-confirm-button'
      },
      buttonsStyling: false
    });
  }
}


}
