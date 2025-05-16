import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamenService } from '../services/examen.service';
import { AjouterExamenComponent } from '../ajouter-examen/ajouter-examen.component';
import { ModifierExamenComponent } from '../modifier-examen/modifier-examen.component';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-examen',
  standalone: true,
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css'],
  imports: [CommonModule, FormsModule, AjouterExamenComponent, ModifierExamenComponent],
})
export class ExamenComponent implements OnInit {
  examens: any[] = [];
  selectedExamen: any = null;
  searchTerm: string = '';

  constructor(
    private examenService: ExamenService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadExamens();
  }

  loadExamens() {
    this.examenService.getAllExamens().then(data => {
      this.examens = data;
    }).catch(error => console.error('Erreur lors du chargement des examens:', error));
  }

  get filteredExamens(): any[] {
    const term = this.searchTerm.toLowerCase();
    return this.examens.filter(examen =>
      examen.title?.toLowerCase().includes(term) ||
      examen.subjectName?.toLowerCase().includes(term) ||
      String(examen.year).includes(term)
    );
  }

  openModal(examen: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedExamen = { ...examen };
      setTimeout(() => {
        const modalElement = document.getElementById('modifyExamenModal');
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

  onExamenUpdated() {
    this.loadExamens();
    const modalElement = document.getElementById('modifyExamenModal');
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }).catch(err => console.error('Erreur lors de la fermeture de la modal:', err));
    }
  }


deleteExamen(id: number) {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: "Cette action est irréversible.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
    width:'350px',
    customClass: {
      title: 'swal-title-custom',
      popup: 'swal-popup-custom',
      confirmButton: 'swal-confirm-button',
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.examenService.deleteExamen(id)
        .then(() => {
          this.examens = this.examens.filter(examen => examen.id !== id);
          Swal.fire({
            icon: 'success',
            title: 'Examen supprimé',
            text: 'L\'examen a été supprimé avec succès.',
            confirmButtonText: 'oK',
            width: '350px',
            padding: '1.5em',
            customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button'
            }
          });
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de l\'examen:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la suppression de l\'examen.',
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


  examenAdded(newExamen: any) {
    this.examens = [...this.examens, newExamen];
  }

  getFichierUrl(examen: string): string {
    const content = examen.split('/').pop(); // Récupère juste le nom du fichier
    return `http://srv828261.hstgr.cloud/uploads/examens/${content}`;
  }
}
