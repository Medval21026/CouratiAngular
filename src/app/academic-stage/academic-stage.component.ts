import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AcademicStageService } from '../services/academic-stage.service';
import { AjouterAcademicStageComponent } from '../ajouter-academic-stage/ajouter-academic-stage.component';
import { ModifierAcademicStageComponent } from '../modifier-academic-stage/modifier-academic-stage.component';
import { PLATFORM_ID } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-academic-stage',
  standalone: true,
  imports: [CommonModule,AjouterAcademicStageComponent,ModifierAcademicStageComponent],
  templateUrl: './academic-stage.component.html',
  styleUrls: ['./academic-stage.component.css']
})
export class AcademicStageComponent implements OnInit {

  academicStages: any[] = [];
  selectedAcademicStage: any = null;

  constructor(
    private academicStageService: AcademicStageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadAcademicStages();
  }

  loadAcademicStages() {
    this.academicStageService.getAll().then((data: any[]) => {
      this.academicStages = data;
    }).catch((error: any) => {
      console.error('Erreur lors du chargement des stages académiques:', error);
    });
  }

  openModal(stage: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedAcademicStage = { ...stage };
      setTimeout(() => {
        const modalElement = document.getElementById('modifyAcademicStageModal');
        if (modalElement) {
          import('bootstrap').then((bootstrap) => {
            const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
            modal.show();
          }).catch(err => console.error('Erreur lors de l\'importation de Bootstrap:', err));
        }
      }, 0);
    }
  }

  onAcademicStageUpdated() {
    this.loadAcademicStages();
    this.cdr.detectChanges();
    const modalElement = document.getElementById('modifyAcademicStageModal');
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }).catch(err => console.error('Erreur lors de la fermeture de la modal:', err));
    }
  }

 deleteAcademicStage(id: number) {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action supprimera définitivement ce stage académique.',
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
      this.academicStageService.delete(id).then(() => {
        this.academicStages = this.academicStages.filter(s => s.id !== id);

        Swal.fire({
          title: 'Supprimé',
          text: 'Le stage académique a été supprimé avec succès.',
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
        console.error('Erreur lors de la suppression:', error);
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


  academicStageAdded(newStage: any) {
    this.academicStages = [...this.academicStages, newStage];
    this.loadAcademicStages();
  }
}
