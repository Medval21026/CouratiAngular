import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TdService } from '../services/td.service';
import { AjouterTdComponent } from '../ajouter-td/ajouter-td.component';
import { ModifierTdComponent } from '../modifier-td/modifier-td.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-td',
  standalone: true,
  templateUrl: './td.component.html',
  styleUrls: ['./td.component.css'],
  imports: [CommonModule, FormsModule, AjouterTdComponent, ModifierTdComponent],
})
export class TdComponent implements OnInit {
  tds: any[] = [];
  selectedTd: any = null;
  searchTerm: string = '';

  constructor(
    private tdService: TdService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadTds();
  }

  loadTds() {
    this.tdService.getAllTds().then(data => {
      this.tds = data;
    }).catch(error => console.error('Erreur lors du chargement des TDs:', error));
  }

  get filteredTds() {
    const term = this.searchTerm.toLowerCase();
    return this.tds.filter(td =>
      td.title?.toLowerCase().includes(term) ||
      td.subjectName?.toLowerCase().includes(term)
    );
  }

  openModal(td: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedTd = { ...td };
      setTimeout(() => {
        const modalElement = document.getElementById('modifyTdModal');
        if (modalElement) {
          import('bootstrap').then((bootstrap) => {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          }).catch(err => console.error('Erreur lors de l\'importation de Bootstrap:', err));
        }
      }, 0);
    }
  }

  onTdUpdated() {
    this.loadTds();
    const modalElement = document.getElementById('modifyTdModal');
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }).catch(err => console.error('Erreur lors de la fermeture de la modal:', err));
    }
  }


deleteTd(id: number) {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action supprimera définitivement ce TD.',
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
  }).then((result) => {
    if (result.isConfirmed) {
      this.tdService.deleteTd(id).then(() => {
        this.tds = this.tds.filter(td => td.id !== id);
        Swal.fire({
          title: 'Supprimé !',
          text: 'Le TD a été supprimé avec succès.',
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
        console.error('Erreur lors de la suppression du TD:', error);
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la suppression.',
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


  tdAdded(newTd: any) {
    this.tds = [...this.tds, newTd];
  }

  getFichierUrl(tds: string): string {
    const content = tds.split('/').pop(); // Récupère juste le nom du fichier
    return `http://srv828261.hstgr.cloud/uploads/tps/${content}`;
  }
}
