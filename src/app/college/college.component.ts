import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CollegeService } from '../services/college.service';
import { CommonModule } from '@angular/common';
import { AjouterCollegeComponent } from '../ajouter-college/ajouter-college.component';
import { ModifierCollegeComponent } from '../modifier-college/modifier-college.component';
import { FormsModule } from '@angular/forms';  // Importer FormsModule pour ngModel
 import Swal from 'sweetalert2';



@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AjouterCollegeComponent, ModifierCollegeComponent]
})
export class CollegeComponent implements OnInit {
  colleges: any[] = [];
  selectedCollege: any = null;
  searchTerm: string = '';  // Champ de recherche

  constructor(
    private collegeService: CollegeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadColleges();
  }

  loadColleges() {
    this.collegeService.getAllColleges().then(data => {
      this.colleges = data;
    }).catch(error => console.error(error));
  }

  get filteredColleges() {
    const term = this.searchTerm.toLowerCase();
    return this.colleges.filter(college =>
      college.name_fr?.toLowerCase().includes(term)  // Filtrage par nom_fr
    );
  }

  openModal(college: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedCollege = { ...college };
      setTimeout(() => {
        const modalElement = document.getElementById('modifyCollegeModal');
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

  onCollegeUpdated() {
    this.loadColleges();
    const modalElement = document.getElementById('modifyCollegeModal');
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }).catch(err => console.error('Erreur lors de la fermeture de la modal:', err));
    }
  }


deleteCollege(id: number) {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action supprimera définitivement ce collège.',
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
      confirmButton: 'swal-confirm-button',
    },
  }).then(result => {
    if (result.isConfirmed) {
      this.collegeService.deleteCollege(id)
        .then(() => {
          // Suppression réussie
          this.colleges = this.colleges.filter(col => col.id !== id);

          // Message de succès
          Swal.fire({
            title: 'Supprimé !',
            text: 'Le collège a été supprimé avec succès.',
            icon: 'success',
            confirmButtonText: 'OK',
            width: '350px',
            padding: '1.5em',
            customClass: {
              confirmButton: 'swal-confirm-button'
            },
            buttonsStyling: false
          });
        })
        .catch(error => {
          console.error('Erreur lors de la suppression:', error);
          // Message d'erreur
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de la suppression du collège.',
            icon: 'error',
            confirmButtonText: 'OK',
            width: '350px',
            padding: '1.5em',
            customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button'
            }
          });
        });
    }
  });
}


  onCollegeAdded(newCollege: any) {
    this.colleges = [...this.colleges, newCollege];
  }
}
