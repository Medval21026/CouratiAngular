import { Component, Output, EventEmitter } from '@angular/core';
import { InstitutService } from '../services/institut.service';
import { FormsModule } from '@angular/forms';
 import Swal from 'sweetalert2';

 
@Component({
  selector: 'app-ajouter-institut',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ajouter-institut.component.html',
  styleUrls: ['./ajouter-institut.component.css']
})
export class AjouterInstitutComponent {
  institute = { name_fr: '',name_ar: '' };
  @Output() instituteAdded = new EventEmitter<any>();

  constructor(private institutService: InstitutService) {}

async onSubmit() {
  // Vérifie si le nom en français et en arabe sont renseignés
  if (this.institute.name_fr.trim() !== '' && this.institute.name_ar) {
    try {
      // Création de l'institut via le service
      const newInstitute = await this.institutService.createInstitute(this.institute);

      // Fermeture du modal
      const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
      if (closeButton) {
        (closeButton as HTMLButtonElement).click();
      }

      // Émission de l'événement d'ajout de l'institut
      this.instituteAdded.emit(newInstitute);

      // Affichage d'un message de succès
      Swal.fire({
        title: 'Ajout réussi',
        text: 'L\'institut a été ajouté avec succès.',
        icon: 'success',
        confirmButtonText: 'OK',
        width: '350px',  // Ajuste la largeur de la fenêtre modale
        padding: '1.5em', // Ajoute un peu de padding
        customClass: {
          title: 'swal-title-custom',      // Classe CSS pour le titre
          popup: 'swal-popup-custom',      // Classe CSS pour la popup
          confirmButton: 'swal-confirm-button', // Classe CSS pour le bouton de confirmation
        },
        buttonsStyling: false  // Désactive les styles par défaut des boutons
      });
    } catch (error) {
      // Si une erreur se produit lors de l'ajout
      console.error('Erreur:', error);
      
      // Affichage d'un message d'erreur
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'ajout de l\'institut.',
        icon: 'error',
        confirmButtonText: 'OK',
        width: '350px',
        padding: '1.5em',
        customClass: {
          title: 'swal-title-custom',
          popup: 'swal-popup-custom',
          confirmButton: 'swal-confirm-button',
        },
        buttonsStyling: false
      });
    }
  } else {
    // Si les champs ne sont pas remplis correctement
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
        confirmButton: 'swal-confirm-button',
      },
      buttonsStyling: false
    });
  }
}

}
