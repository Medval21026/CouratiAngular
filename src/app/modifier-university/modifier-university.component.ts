import { Component, Input, Output, EventEmitter} from '@angular/core';
import { UniversityService } from '../services/university.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-modifier-university',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-university.component.html',
  styleUrls: ['./modifier-university.component.css']
})
export class ModifierUniversityComponent {
  @Input() university: any = null;
  @Output() universityUpdated = new EventEmitter<void>();

  constructor(private universityService: UniversityService) {}


updateUniversity() {
  if (this.university) {
    this.universityService.updateUniversity(this.university.id, {
      name_fr: this.university.name_fr,
      name_ar: this.university.name_ar
    })
    .then(() => {
      this.universityUpdated.emit();

      Swal.fire({
        title: 'Mise à jour réussie',
        text: 'L’université a été mise à jour avec succès.',
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
      console.error('Erreur lors de la mise à jour de l’université', error);

      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur s’est produite lors de la mise à jour de l’université.',
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
    Swal.fire({
      title: 'Champs requis',
      text: 'Aucune université sélectionnée pour la mise à jour.',
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
