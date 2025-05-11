import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LessonsService } from '../services/lessons.service';
import { SubjectService } from '../services/subject.service';

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
        year: this.lesson.year,  // Assurez-vous que la valeur de "year" est incluse
        subjectId: this.lesson.subjectId,
        content: this.lesson.content
      });
      this.lessonUpdated.emit();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la leçon', error);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.lesson.content = file;
    }
  }
}
