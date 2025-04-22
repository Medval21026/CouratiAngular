import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TpService } from '../services/tp.service';
import { AjouterTpComponent } from '../ajouter-tp/ajouter-tp.component';
import { ModifierTpComponent } from '../modifier-tp/modifier-tp.component';

@Component({
  selector: 'app-tp',
  standalone: true,
  templateUrl: './tp.component.html',
  styleUrls: ['./tp.component.css'],
  imports: [CommonModule,AjouterTpComponent,ModifierTpComponent],
})
export class TpComponent implements OnInit {
  tps: any[] = [];
  selectedTp: any = null;

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
        } else {
          console.error('Modal element not found');
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
    if (confirm('Êtes-vous sûr de vouloir supprimer ce TP ?')) {
      this.tpService.deleteTp(id).then(() => {
        this.tps = this.tps.filter(tp => tp.id !== id);
      }).catch(error => {
        console.error('Erreur lors de la suppression du TP:', error);
      });
    }
  }

  tpAdded(newTp: any) {
    this.tps = [...this.tps, newTp];
  }
}
