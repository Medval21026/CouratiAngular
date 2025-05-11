import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LessonsService } from '../services/lessons.service';
import { SubjectService } from '../services/subject.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'ajouter-lesson',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './ajouter-lessons.component.html',
  styleUrls: ['./ajouter-lessons.component.css'],
})
export class AjouterLessonsComponent implements OnInit {
  lesson = { title: '', year: null as number | null, content: null as File | null, subjectId: null as number | null };
  subjects: any[] = [];

  @Output() lessonAdded = new EventEmitter<any>();

  constructor(
    private lessonsService: LessonsService,
    private subjectsService: SubjectService
  ) {}

  ngOnInit() {
    // Récupère la liste des matières
    this.subjectsService.getAllSubjects().then(data => {
      this.subjects = data;
    }).catch(error => console.error('Erreur lors du chargement des matières:', error));
  }

  async onSubmit() {
    // Vérifie que les champs obligatoires sont remplis
    if (this.lesson.title.trim() !== '' && this.lesson.subjectId && this.lesson.content && this.lesson.year) {
      try {
        // Crée l'objet de la leçon
        const newLesson = {
          title: this.lesson.title,
          year: this.lesson.year,
          subjectId: this.lesson.subjectId,
          content: this.lesson.content
        };

        // Envoi directement l'objet via le service
        const addedLesson = await this.lessonsService.createLesson(newLesson);

        // Ferme le modal si la leçon est ajoutée avec succès
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        if (closeButton) closeButton.click();

        // Émet l'événement pour informer le parent
        this.lessonAdded.emit(addedLesson);

        // Réinitialise le formulaire
        this.lesson = { title: '', year: null, content: null, subjectId: null };
      } catch (error) {
        console.error("Erreur lors de l'ajout de la leçon:", error);
        alert("Erreur lors de l'ajout de la leçon. Veuillez réessayer.");
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  onFileSelected(event: any) {
    // Assure-toi que le fichier est sélectionné
    const file = event.target.files[0];
    if (file) {
      this.lesson.content = file;
    } else {
      alert('Veuillez sélectionner un fichier.');
    }
  }
}
