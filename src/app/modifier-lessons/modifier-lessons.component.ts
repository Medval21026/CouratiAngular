import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LessonsService } from '../services/lessons.service';
import { SubjectService } from '../services/subject.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'modifier-lesson',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './modifier-lessons.component.html',
  styleUrls: ['./modifier-lessons.component.css']
})
export class ModifierLessonsComponent implements OnInit {
  @Input() lesson: any;  // Leçon à modifier
  @Output() lessonUpdated = new EventEmitter<void>();

  subjects: any[] = [];

  constructor(
    private lessonsService: LessonsService,
    private subjectsService: SubjectService
  ) {}

  ngOnInit() {
    this.subjectsService.getAllSubjects().then(data => {
      this.subjects = data;
    }).catch(error => console.error('Erreur lors du chargement des matières', error));
  }

async onUpdate() {
  try {
    await this.lessonsService.updateLesson(this.lesson.id, {
      title: this.lesson.title,
      subjectId: this.lesson.subjectId,
      year: this.lesson.year,
      content: this.lesson.content
    });

    this.lessonUpdated.emit();

    Swal.fire({
      icon: 'success',
      title: 'Mise à jour réussie',
      text: 'Le devoir a été modifié avec succès.',
      confirmButtonText: 'oK',
      width: '350px',
      padding: '1.5em',
      customClass: {
        title: 'swal-title-custom',
        popup: 'swal-popup-custom',
        confirmButton: 'swal-confirm-button'
      }
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du devoir', error);

    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Échec de la mise à jour du devoir.',
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
}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.lesson.content = file;
    }
  }
}
