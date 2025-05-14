import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LessonsService } from '../services/lessons.service';
import { AjouterLessonsComponent } from '../ajouter-lessons/ajouter-lessons.component';
import { ModifierLessonsComponent } from '../modifier-lessons/modifier-lessons.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
 import Swal from 'sweetalert2';




@Component({
  selector: 'app-lesson',
  standalone: true,
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  imports: [CommonModule, AjouterLessonsComponent, ModifierLessonsComponent,FormsModule],
})
export class LessonsComponent implements OnInit {
  lessons: any[] = [];
  filteredLessons: any[] = [];
  selectedLesson: any = null;
  searchTerm: string = '';

  constructor(
    private lessonsService: LessonsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    this.lessonsService.getAllLessons().then(data => {
      this.lessons = data;
      this.filteredLessons = [...this.lessons];
    }).catch(error => console.error('Erreur lors du chargement des leçons:', error));
  }

  filterLessons() {
    const term = this.searchTerm.toLowerCase();
    this.filteredLessons = this.lessons.filter(lesson =>
      lesson.title?.toLowerCase().includes(term)
    );
  }

  openModal(lesson: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedLesson = { ...lesson };
      setTimeout(() => {
        const modalElement = document.getElementById('modifyLessonModal');
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

  onLessonUpdated() {
    this.loadLessons();
    const modalElement = document.getElementById('modifyLessonModal');
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }).catch(err => console.error('Erreur lors de la fermeture de la modal:', err));
    }
  }


deleteLesson(id: number) {
  Swal.fire({
    title: 'Confirmation',
    text: 'Êtes-vous sûr de vouloir supprimer cette leçon ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
    width:'350px',
    customClass: {
      title: 'swal-title-custom',
      popup: 'swal-popup-custom',
      confirmButton: 'swal-confirm-button',
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.lessonsService.deleteLesson(id).then(() => {
        this.lessons = this.lessons.filter(lesson => lesson.id !== id);
        this.filterLessons();

        Swal.fire({
          title: 'Supprimée',
          text: 'La leçon a été supprimée avec succès.',
          icon: 'success',
          confirmButtonText: 'OK',
          width:'350px',

          customClass: {
            title: 'swal-title-custom',
            popup: 'swal-popup-custom',
            confirmButton: 'swal-confirm-button'
          }
        });
      }).catch(error => {
        console.error('Erreur lors de la suppression de la leçon:', error);
        Swal.fire({
          title: 'Erreur',
          text: 'Impossible de supprimer la leçon.',
          icon: 'error',
          confirmButtonText: 'OK',
          width:'350px',
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


  lessonAdded(newLesson: any) {
    this.lessons = [...this.lessons, newLesson];
    this.filterLessons();
  }

  getFichierUrl(contentPath: string): string {
  const fileName = contentPath.split('/').pop();
  return `${environment.apiUrl}/uploads/devoirs/${fileName}`;
}

}
