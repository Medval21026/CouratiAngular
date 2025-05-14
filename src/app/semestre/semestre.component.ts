import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SemestreService } from '../services/semestre.service';
import { AjouterSemestreComponent } from '../ajouter-semestre/ajouter-semestre.component';
import { ModifierSemestreComponent } from '../modifier-semestre/modifier-semestre.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-semestre',
  standalone: true,
  imports: [CommonModule, AjouterSemestreComponent, ModifierSemestreComponent],
  templateUrl: './semestre.component.html',
  styleUrls: ['./semestre.component.css']
})
export class SemestreComponent {
  semestres: any[] = [];
  selectedSemestre: any = null;

  constructor(
    private semestreService: SemestreService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadSemestres();
  }

  loadSemestres() {
    this.semestreService.getAllSemestres().then(data => {
      this.semestres = data;
    }).catch(error => console.error(error));
  }

  openModal(semestre: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedSemestre = { ...semestre };
      setTimeout(() => {
        const modalElement = document.getElementById('modifySemestreModal');
        if (modalElement) {
          import('bootstrap').then((bootstrap) => {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          }).catch(err => console.error('Erreur lors de l\'importation de Bootstrap:', err));
        }
      }, 0);
    }
  }

  onSemestreUpdated() {
    this.loadSemestres();
    const modalElement = document.getElementById('modifySemestreModal');
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }).catch(err => console.error('Erreur lors de la fermeture de la modal:', err));
    }
  }

  deleteSemestre(id: number) {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action supprimera définitivement ce semestre.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
    reverseButtons: true,
    width: '350px',
    padding: '1.5em',
    customClass: {
      title: 'swal-title-custom',
      popup: 'swal-popup-custom',
      confirmButton: 'swal-confirm-button',
    },
  }).then(result => {
    if (result.isConfirmed) {
      this.semestreService.deleteSemestre(id)
        .then(() => {
          this.semestres = this.semestres.filter(s => s.id !== id);
          Swal.fire({
            title: 'Supprimé',
            text: 'Le semestre a été supprimé avec succès.',
            icon: 'success',
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
        })
        .catch(error => {
          console.error('Erreur lors de la suppression:', error);
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la suppression du semestre.',
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
        });
    }
  });
}


  onSemestreAdded(newSemestre: any) {
    this.semestres = [...this.semestres, newSemestre];
  }
}
