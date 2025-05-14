import { Component, Inject, PLATFORM_ID, OnInit, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { SpecialisationService } from '../services/specialisation.service';
import { AjouterSpecialisationComponent } from '../ajouter-specialisation/ajouter-specialisation.component';
import { ModifierSpecialisationComponent } from '../modifier-specialisation/modifier-specialisation.component';
import { FormsModule } from '@angular/forms';  // Importer FormsModule pour ngModel
import Swal from 'sweetalert2';

@Component({
  selector: 'app-specialisation',
  standalone: true,
  imports: [AjouterSpecialisationComponent, ModifierSpecialisationComponent, CommonModule, FormsModule],
  templateUrl: './specialisation.component.html',
  styleUrls: ['./specialisation.component.css']
})
export class SpecialisationComponent implements OnInit {
  specialisations: any[] = [];
  selectedSpecialisation: any = null;
  searchTerm: string = '';  // Champ de recherche

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

  get filteredSpecialisations() {
    const term = this.searchTerm.toLowerCase();
    return this.specialisations.filter(specialisation =>
      specialisation.name?.toLowerCase().includes(term) ||  // Filtrage par nom
      specialisation.collegeName?.toLowerCase().includes(term) ||  // Filtrage par collège
      specialisation.instituteName?.toLowerCase().includes(term)  // Filtrage par institut
    );
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

async deleteSpecialisation(id: number) {
  const result = await Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action supprimera définitivement cette spécialisation.',
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
  });

  if (result.isConfirmed) {
    try {
      await this.specialisationService.deleteSpecialisation(id);
      this.specialisations = this.specialisations.filter(sp => sp.id !== id);

      Swal.fire({
        title: 'Suppression réussie',
        text: 'La spécialisation a été supprimée avec succès.',
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

      console.log('Spécialisation supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);

      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la suppression de la spécialisation.',
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
    }
  }
}


  specialisationAdded(newSpecialisation: any) {
    this.specialisations = [...this.specialisations, newSpecialisation];
    this.loadSpecialisations();
  }
}
