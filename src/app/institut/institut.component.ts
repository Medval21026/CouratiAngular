import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { InstitutService } from '../services/institut.service';
import { CommonModule } from '@angular/common';
import { AjouterInstitutComponent } from '../ajouter-institut/ajouter-institut.component';
import { ModifierInstitutComponent } from '../modifier-institut/modifier-institut.component';

@Component({
  selector: 'app-institut',
  templateUrl: './institut.component.html',
  styleUrls: ['./institut.component.css'],
  standalone: true,
  imports: [CommonModule, AjouterInstitutComponent, ModifierInstitutComponent]
})
export class InstitutComponent {
  institutes: any[] = [];
  selectedInstitut: any = null;

  constructor(
    private institutService: InstitutService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadInstitutes();
  }

  loadInstitutes() {
    this.institutService.getAllInstitutes().then(data => {
      this.institutes = data;
    }).catch(error => console.error(error));
  }

  openModal(institut: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedInstitut = { ...institut };
      setTimeout(() => {
        const modalElement = document.getElementById('modifyInstitutModal');
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

  onInstitutUpdated() {
    this.loadInstitutes();
    const modalElement = document.getElementById('modifyInstitutModal');
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }).catch(err => console.error('Erreur lors de la fermeture de la modal:', err));
    }
  }
  

  deleteInstitut(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet institut ?')) {
      this.institutService.deleteInstitut(id).then(() => {
        this.institutes = this.institutes.filter(inst => inst.id !== id);
      }).catch(error => {
        console.error('Erreur lors de la suppression:', error);
      });
    }
  }

  onInstitutAdded(newInstitut: any) {
    this.institutes = [...this.institutes, newInstitut];
  }
}
