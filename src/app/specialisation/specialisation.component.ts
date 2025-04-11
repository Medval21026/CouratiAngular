import { Component, Inject, PLATFORM_ID, OnInit, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { SpecialisationService } from '../services/specialisation.service'; // ✅ Service avec "s"
import { AjouterSpecialisationComponent } from '../ajouter-specialisation/ajouter-specialisation.component'; // ✅ avec "s"
import { ModifierSpecialisationComponent } from '../modifier-specialisation/modifier-specialisation.component';

@Component({
  selector: 'app-specialisation',
  standalone: true,
  imports: [AjouterSpecialisationComponent,ModifierSpecialisationComponent, CommonModule],
  templateUrl: './specialisation.component.html',
  styleUrls: ['./specialisation.component.css']
})
export class SpecialisationComponent implements OnInit {
  specialisations: any[] = [];
  selectedSpecialisation: any = null;

  constructor(
    private specialisationService: SpecialisationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadSpecialisations();
  }

  loadSpecialisations() {
    this.specialisationService.getAllSpecialisations().then((data: any[]) => {
      this.specialisations = data;
    }).catch((error: any) => console.error('Erreur lors du chargement des spécialisations:', error));
  }

  openModal(specialisation: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedSpecialisation = { ...specialisation };
      setTimeout(() => {
        const modalElement = document.getElementById('modifySpecialisationModal');
        if (modalElement) {
          import('bootstrap').then((bootstrap) => {
            const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
            modal.show();
          }).catch(err => console.error('Erreur lors de l\'importation de Bootstrap:', err));
        } else {
          console.error('Élément modal introuvable');
        }
      }, 0);
    }
  }
  

  onSpecialisationUpdated() {
    this.loadSpecialisations();
    this.cdr.detectChanges();
    const modalElement = document.getElementById('modifySpecialisationModal');
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

  deleteSpecialisation(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette spécialisation ?')) {
      this.specialisationService.deleteSpecialisation(id).then(() => {
        this.specialisations = this.specialisations.filter(sp => sp.id !== id);
      }).catch((error: any) => {
        console.error('Erreur lors de la suppression:', error);
      });
    }
  }

  specialisationAdded(newSpecialisation: any) {
    this.specialisations = [...this.specialisations, newSpecialisation];
    this.loadSpecialisations();
  }
  
}
