import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LessonsService } from '../services/lessons.service';
import { SubjectService } from '../services/subject.service';
import { NgSelectModule } from '@ng-select/ng-select';
 import Swal from 'sweetalert2';

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
  if (this.lesson.title.trim() !== '' && this.lesson.subjectId && this.lesson.content && this.lesson.year) {
    try {
      const newLesson = {
        title: this.lesson.title,
        subjectId: this.lesson.subjectId,
        year: this.lesson.year,
        content: this.lesson.content
      };

      console.log(newLesson);

      const addedlesson = await this.lessonsService.createLesson(newLesson);

      const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
      if (closeButton) closeButton.click();

      this.lessonAdded.emit(addedlesson);

      // Affichage de succès avec SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Lesson ajouté avec succès',
        text: 'Lesson a été ajouté.',
        confirmButtonText: 'ok',
        width: '350px',
        padding: '1.5em',
        customClass: {
          title: 'swal-title-custom',
          popup: 'swal-popup-custom',
          confirmButton: 'swal-confirm-button'
        }
      });

      this.lesson = { title: '', content: null, year: null, subjectId: null };
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'Lesson:", error);
      
      // Affichage d'erreur avec SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'ajout de Lesson. Veuillez réessayer.',
        confirmButtonText: 'ok',
        width: '350px',
        padding: '1.5em',
        customClass: {
          title: 'swal-title-custom',
          popup: 'swal-popup-custom',
          confirmButton: 'swal-confirm-button'
        }
      });
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
