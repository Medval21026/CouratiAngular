import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';  // Importer isPlatformBrowser
import { UniversityService } from '../services/university.service';
import { CommonModule } from '@angular/common';
import { AjouterUniversityComponent } from '../ajouter-university/ajouter-university.component';
import { ModifierUniversityComponent } from '../modifier-university/modifier-university.component';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'],
  standalone: true,
  imports: [CommonModule, AjouterUniversityComponent, ModifierUniversityComponent]
})
export class UniversityComponent {
  universities: any[] = [];
  selectedUniversity: any = null;

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
    }).catch(error => console.error(error));
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
        console.log(modal); 
        if (modal) {
          modal.hide();  // Fermer la modal
        }
      }).catch(err => console.error('Erreur lors de la fermeture de la modal:', err));
    }
    this.universities = [...this.universities, newUniversity];
  }
}
