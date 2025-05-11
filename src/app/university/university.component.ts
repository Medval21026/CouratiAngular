import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';  // Importer isPlatformBrowser
import { UniversityService } from '../services/university.service';
import { CommonModule } from '@angular/common';
import { AjouterUniversityComponent } from '../ajouter-university/ajouter-university.component';
import { ModifierUniversityComponent } from '../modifier-university/modifier-university.component';
import { FormsModule } from '@angular/forms';  // Importer FormsModule pour ngModel

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AjouterUniversityComponent, ModifierUniversityComponent]
})
export class UniversityComponent implements OnInit {
  universities: any[] = [];
  selectedUniversity: any = null;
  searchTerm: string = '';  // Champ de recherche

  constructor(
    private universityService: UniversityService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadUniversities();
  }

  loadUniversities() {
    this.universityService.getAllUniversities().then(data => {
      this.universities = data;
      console.log(data);
    }).catch(error => console.error(error));
  }

  get filteredUniversities() {
    const term = this.searchTerm.toLowerCase();
    return this.universities.filter(university =>
      university.name_fr?.toLowerCase().includes(term)  // Filtrage par nom_fr
    );
  }

  openModal(university: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedUniversity = { ...university };
      setTimeout(() => {
        const modalElement = document.getElementById('modifyUniversityModal');
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

  onUniversityUpdated() {
    this.loadUniversities();
    const modalElement = document.getElementById('modifyUniversityModal');
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }).catch(err => console.error('Erreur lors de la fermeture de la modal:', err));
    }
  }

  deleteUniversity(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette université ?')) {
      this.universityService.deleteUniversity(id).then(() => {
        const updatedUniversities = this.universities.filter(university => university.id !== id);
        this.universities = [...updatedUniversities];
      }).catch(error => {
        console.error('Erreur lors de la suppression de l\'université:', error);
      });
    }
  }  

  onUniversityAdded(newUniversity: any) {
    const modalElement = document.getElementById('addUniversityModal');
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();  // Fermer la modal
        }
      }).catch(err => console.error('Erreur lors de la fermeture de la modal:', err));
    }
    this.universities = [...this.universities, newUniversity];
  }
}
