import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SemestreService } from '../services/semestre.service';
import { AjouterSemestreComponent } from '../ajouter-semestre/ajouter-semestre.component';
import { ModifierSemestreComponent } from '../modifier-semestre/modifier-semestre.component';
import { CommonModule } from '@angular/common';

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
    if (confirm('Êtes-vous sûr de vouloir supprimer ce semestre ?')) {
      this.semestreService.deleteSemestre(id).then(() => {
        this.semestres = this.semestres.filter(s => s.id !== id);
      }).catch(error => {
        console.error('Erreur lors de la suppression:', error);
      });
    }
  }

  onSemestreAdded(newSemestre: any) {
    this.semestres = [...this.semestres, newSemestre];
  }
}
