import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CollegeService } from '../services/college.service';
import { CommonModule } from '@angular/common';
import { AjouterCollegeComponent } from '../ajouter-college/ajouter-college.component';
import { ModifierCollegeComponent } from '../modifier-college/modifier-college.component';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css'],
  standalone: true,
  imports: [CommonModule, AjouterCollegeComponent, ModifierCollegeComponent]
})
export class CollegeComponent {
  colleges: any[] = [];
  selectedCollege: any = null;

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
