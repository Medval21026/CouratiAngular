import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { InstitutService } from '../services/institut.service';
import { CommonModule } from '@angular/common';
import { AjouterInstitutComponent } from '../ajouter-institut/ajouter-institut.component';
import { ModifierInstitutComponent } from '../modifier-institut/modifier-institut.component';
import { FormsModule } from '@angular/forms';  // Importer FormsModule pour ngModel
import Swal from 'sweetalert2';

@Component({
  selector: 'app-institut',
  templateUrl: './institut.component.html',
  styleUrls: ['./institut.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AjouterInstitutComponent, ModifierInstitutComponent]
})
export class InstitutComponent implements OnInit {
  institutes: any[] = [];
  selectedInstitut: any = null;
  searchTerm: string = '';  // Champ de recherche

  constructor(
    private institutService: InstitutService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadInstitutes();
  }

  loadInstitutes() {
    this.institutService.getAllInstitutes().then(data => {
      this.institutes = data;
    }).catch(error => console.error(error));
  }

  get filteredInstitutes() {
    const term = this.searchTerm.toLowerCase();
    return this.institutes.filter(institute =>
      institute.name_fr?.toLowerCase().includes(term)  // Filtrage par nom_fr
    );
  }

  openModal(institut: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedInstitut = { ...institut };
      setTimeout(() => {
        const modalElement = document.getElementById('modifyInstitutModal');
        if (modalElement) {
          import('bootstrap').then((bootstrap) => {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          }).catch(err => console.error('Erreur lors de l\'importation de Bootstrap:', err));
        } else {
          console.error('Modal element not found');
        }
      }, 0);
    }
  }

  onInstitutUpdated() {
    this.loadInstitutes();
    const modalElement = document.getElementById('modifyInstitutModal');
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }).catch(err => console.error('Erreur lors de la fermeture de la modal:', err));
    }
  }


deleteInstitut(id: number) {
  // Affichage d'une alerte de confirmation avec SweetAlert2
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action supprimera définitivement ce institut.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
    reverseButtons: true,
    width: '350px',  // Ajuste la largeur de la fenêtre modale
    padding: '1.5em', // Ajoute un peu de padding
    customClass: {
      title: 'swal-title-custom',      // Classe CSS pour le titre
      popup: 'swal-popup-custom',      // Classe CSS pour la popup
      confirmButton: 'swal-confirm-button', // Classe CSS pour le bouton de confirmation
    }, // Désactive les styles par défaut des boutons
  }).then((result) => {
    if (result.isConfirmed) {
      // Si l'utilisateur confirme la suppression
      this.institutService.deleteInstitut(id).then(() => {
        this.institutes = this.institutes.filter(inst => inst.id !== id);

        // ✅ Message de succès
        Swal.fire({
          title: 'Supprimé!',
          text: 'institut a été supprimé avec succès.',
          icon: 'success',
          confirmButtonText: 'OK',
          width: '350px',
          padding: '1.5em',
          customClass: {
            title: 'swal-title-custom',
            popup: 'swal-popup-custom',
            confirmButton: 'swal-confirm-button'
          },
        });
      }).catch(error => {
        // ❌ Message d'erreur en cas d'échec de suppression
        console.error('Erreur lors de la suppression:', error);

        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la suppression du collège.',
          icon: 'error',
          confirmButtonText: 'OK',
           width: '350px',
            padding: '1.5em',
            customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button'
            }
          });
      });
    }
  });
}


  onInstitutAdded(newInstitut: any) {
    this.institutes = [...this.institutes, newInstitut];
  }
}
