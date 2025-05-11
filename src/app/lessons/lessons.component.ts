import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LessonsService } from '../services/lessons.service';
import { AjouterLessonsComponent } from '../ajouter-lessons/ajouter-lessons.component';
import { ModifierLessonsComponent } from '../modifier-lessons/modifier-lessons.component';
import { FormsModule } from '@angular/forms';

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
    if (confirm('Êtes-vous sûr de vouloir supprimer cette leçon ?')) {
      this.lessonsService.deleteLesson(id).then(() => {
        this.lessons = this.lessons.filter(lesson => lesson.id !== id);
        this.filterLessons();
      }).catch(error => {
        console.error('Erreur lors de la suppression de la leçon:', error);
      });
    }
  }

  lessonAdded(newLesson: any) {
    this.lessons = [...this.lessons, newLesson];
    this.filterLessons();
  }

  getFichierUrl(lesson: string): string {
    const content = lesson.split('/').pop();
    return `http://localhost:8077/uploads/lessons/${content}`;
  }
}
