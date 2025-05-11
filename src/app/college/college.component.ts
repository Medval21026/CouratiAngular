import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CollegeService } from '../services/college.service';
import { CommonModule } from '@angular/common';
import { AjouterCollegeComponent } from '../ajouter-college/ajouter-college.component';
import { ModifierCollegeComponent } from '../modifier-college/modifier-college.component';
import { FormsModule } from '@angular/forms';  // Importer FormsModule pour ngModel

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
    if (confirm('Êtes-vous sûr de vouloir supprimer ce collège ?')) {
      this.collegeService.deleteCollege(id).then(() => {
        this.colleges = this.colleges.filter(col => col.id !== id);
      }).catch(error => {
        console.error('Erreur lors de la suppression:', error);
      });
    }
  }

  onCollegeAdded(newCollege: any) {
    this.colleges = [...this.colleges, newCollege];
  }
}
