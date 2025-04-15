import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ExamenService } from '../services/examen.service';
import { AjouterExamenComponent } from '../ajouter-examen/ajouter-examen.component';
import { ModifierExamenComponent } from '../modifier-examen/modifier-examen.component';

@Component({
  selector: 'app-examen',
  standalone: true,
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css'],
  imports: [CommonModule, AjouterExamenComponent, ModifierExamenComponent],
})
export class ExamenComponent implements OnInit {
  examens: any[] = [];
  selectedExamen: any = null;

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
    if (confirm('Êtes-vous sûr de vouloir supprimer cet examen ?')) {
      this.examenService.deleteExamen(id).then(() => {
        this.examens = this.examens.filter(examen => examen.id !== id);
      }).catch(error => {
        console.error('Erreur lors de la suppression de l\'examen:', error);
      });
    }
  }

  examenAdded(newExamen: any) {
    this.examens = [...this.examens, newExamen];
  }
}
