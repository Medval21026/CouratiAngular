import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TpService } from '../services/tp.service';
import { AjouterTpComponent } from '../ajouter-tp/ajouter-tp.component';
import { ModifierTpComponent } from '../modifier-tp/modifier-tp.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tp',
  standalone: true,
  templateUrl: './tp.component.html',
  styleUrls: ['./tp.component.css'],
  imports: [CommonModule, FormsModule, AjouterTpComponent, ModifierTpComponent],
})
export class TpComponent implements OnInit {
  tps: any[] = [];
  selectedTp: any = null;
  searchTerm: string = '';

  constructor(
    private tpService: TpService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadTps();
  }

  loadTps() {
    this.tpService.getAllTps().then(data => {
      this.tps = data;
    }).catch(error => console.error('Erreur lors du chargement des TPs:', error));
  }

  get filteredTps() {
    const term = this.searchTerm.toLowerCase();
    return this.tps.filter(tp =>
      tp.title?.toLowerCase().includes(term) ||
      tp.subjectName?.toLowerCase().includes(term)
    );
  }

  openModal(tp: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedTp = { ...tp };
      setTimeout(() => {
        const modalElement = document.getElementById('modifyTpModal');
        if (modalElement) {
          import('bootstrap').then((bootstrap) => {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          }).catch(err => console.error('Erreur lors de l\'importation de Bootstrap:', err));
        }
      }, 0);
    }
  }

  onTpUpdated() {
    this.loadTps();
    const modalElement = document.getElementById('modifyTpModal');
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }).catch(err => console.error('Erreur lors de la fermeture de la modal:', err));
    }
  }


deleteTp(id: number) {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action supprimera définitivement ce TP.',
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
      confirmButton: 'swal-confirm-button'
    },
  }).then(result => {
    if (result.isConfirmed) {
      this.tpService.deleteTp(id).then(() => {
        this.tps = this.tps.filter(tp => tp.id !== id);

        Swal.fire({
          title: 'Supprimé',
          text: 'Le TP a été supprimé avec succès.',
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
      }).catch(error => {
        console.error('Erreur lors de la suppression du TP:', error);

        Swal.fire({
          title: 'Erreur',
          text: 'Échec de la suppression du TP.',
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
    }
  });
}


  tpAdded(newTp: any) {
    this.tps = [...this.tps, newTp];
  }
  getFichierUrl(tps: string): string {
    const content = tps.split('/').pop(); // Récupère juste le nom du fichier
    return `http://srv828261.hstgr.cloud/uploads/tps/${content}`;
  }
}
