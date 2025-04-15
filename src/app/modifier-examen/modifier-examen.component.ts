import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExamenService } from '../services/examen.service';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'modifier-examen',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './modifier-examen.component.html',
  styleUrls: ['./modifier-examen.component.css']
})
export class ModifierExamenComponent implements OnInit {
  @Input() examen: any;  // Examen à modifier
  @Output() examenUpdated = new EventEmitter<void>();

  subjects: any[] = [];

  constructor(
    private examenService: ExamenService,
    private subjectsService: SubjectService
  ) {}

  ngOnInit() {
    this.subjectsService.getAllSubjects().then(data => {
      this.subjects = data;
    }).catch(error => console.error('Erreur lors du chargement des matières', error));
  }

  async onUpdate() {
    try {
      await this.examenService.updateExamen(this.examen.id, {
        title: this.examen.title,
        subjectId: this.examen.subjectId,
        year: this.examen.year,
        content: this.examen.content
      });
      this.examenUpdated.emit();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'examen', error);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.examen.content = file;
    }
  }
}
