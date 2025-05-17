import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AjouterDevoireComponent } from '../ajouter-devoire/ajouter-devoire.component';
import { DevoirService } from '../services/devoire.service';
import { ModifierDevoireComponent } from '../modifier-devoire/modifier-devoire.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-devoir',
  standalone: true,
  templateUrl: './devoire.component.html',
  styleUrls: ['./devoire.component.css'],
  imports: [CommonModule, FormsModule, AjouterDevoireComponent, ModifierDevoireComponent],
})
export class DevoirComponent implements OnInit {
  devoirs: any[] = [];
  selectedDevoir: any = null;
  searchTerm: string = '';

  constructor(
    private devoirService: DevoirService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadDevoirs();
  }

  loadDevoirs() {
    this.devoirService.getAllDevoirs()
      .then(data => this.devoirs = data)
      .catch(error => console.error('Erreur lors du chargement des devoirs:', error));
  }

  get filteredDevoirs() {
    const term = this.searchTerm.toLowerCase();
    return this.devoirs.filter(devoir =>
      devoir.title?.toLowerCase().includes(term) ||
      devoir.subjectName?.toLowerCase().includes(term)
    );
  }

  openModal(devoir: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedDevoir = { ...devoir };
      setTimeout(() => {
        const modalElement = document.getElementById('modifyDevoirModal');
        if (modalElement) {
          import('bootstrap').then((bootstrap) => {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          }).catch(err => console.error('Erreur lors de l\'importation de Bootstrap:', err));
        }
      }, 0);
    }
  }

  onDevoirUpdated() {
    this.loadDevoirs();
    const modalElement = document.getElementById('modifyDevoirModal');
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }).catch(err => console.error('Erreur lors de la fermeture de la modal:', err));
    }
  }


deleteDevoir(id: number) {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: "vous voulez supprimé le devoir.",
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
      this.devoirService.deleteDevoir(id)
        .then(() => {
          this.devoirs = this.devoirs.filter(d => d.id !== id);
          Swal.fire({
            icon: 'success',
            title: 'Devoir supprimé',
            text: 'Le devoir a été supprimé avec succès.',
            confirmButtonText: 'ok',
            width: '350px',
            padding: '1.5em',
            customClass: {
              title: 'swal-title-custom',      // Classe CSS pour le titre
              popup: 'swal-popup-custom',      // Classe CSS pour la popup
              confirmButton: 'swal-confirm-button', // Classe CSS pour le bouton de confirmation
            },
          });
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression du devoir:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la suppression du devoir.',
            confirmButtonText: 'ok',
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


  devoirAdded(newDevoir: any) {
    this.devoirs = [...this.devoirs, newDevoir];
  }
  getFichierUrl(devoir: string): string {
    const content = devoir.split('/').pop(); // Récupère juste le nom du fichier
    return `https://srv828261.hstgr.cloud/uploads/devoirs/${content}`;  
  }
}
