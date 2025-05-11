import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AjouterDevoireComponent } from '../ajouter-devoire/ajouter-devoire.component';
import { DevoirService } from '../services/devoire.service';
import { ModifierDevoireComponent } from '../modifier-devoire/modifier-devoire.component';
import { FormsModule } from '@angular/forms';

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
    if (confirm('Êtes-vous sûr de vouloir supprimer ce devoir ?')) {
      this.devoirService.deleteDevoir(id)
        .then(() => this.devoirs = this.devoirs.filter(d => d.id !== id))
        .catch(error => console.error('Erreur lors de la suppression du devoir:', error));
    }
  }

  devoirAdded(newDevoir: any) {
    this.devoirs = [...this.devoirs, newDevoir];
  }

  getFichierUrl(contentPath: string): string {
    const fileName = contentPath.split('/').pop();
    return `http://localhost:8077/uploads/devoirs/${fileName}`;
  }
}
