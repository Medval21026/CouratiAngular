import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TdService } from '../services/td.service';
import { AjouterTdComponent } from '../ajouter-td/ajouter-td.component';
import { ModifierTdComponent } from '../modifier-td/modifier-td.component';


@Component({
  selector: 'app-td',
  standalone: true,
  templateUrl: './td.component.html',
  styleUrls: ['./td.component.css'],
  imports: [CommonModule,AjouterTdComponent,ModifierTdComponent],
})
export class TdComponent implements OnInit {
  tds: any[] = [];
  selectedTd: any = null;

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
        } else {
          console.error('Modal element not found');
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
    if (confirm('Êtes-vous sûr de vouloir supprimer ce TD ?')) {
      this.tdService.deleteTd(id).then(() => {
        this.tds = this.tds.filter(td => td.id !== id);
      }).catch(error => {
        console.error('Erreur lors de la suppression du TD:', error);
      });
    }
  }

  tdAdded(newTd: any) {
    this.tds = [...this.tds, newTd];
  }
  getFichierUrl(tds: string): string {
    const content = tds.split('/').pop(); // Récupère juste le nom du fichier
    return `http://localhost:8077/uploads/tps/${content}`;
  }
}
