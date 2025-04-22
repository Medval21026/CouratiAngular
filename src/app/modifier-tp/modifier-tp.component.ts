import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TpService } from '../services/tp.service';  // Utilisation du service TP
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'modifier-tp',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './modifier-tp.component.html',
  styleUrls: ['./modifier-tp.component.css']
})
export class ModifierTpComponent implements OnInit {
  @Input() tp: any;  // TP à modifier
  @Output() tpUpdated = new EventEmitter<void>();

  subjects: any[] = [];

  constructor(
    private tpService: TpService,  // Utilisation du service TP
    private subjectsService: SubjectService
  ) {}

  ngOnInit() {
    this.subjectsService.getAllSubjects().then(data => {
      this.subjects = data;
    }).catch(error => console.error('Erreur lors du chargement des matières', error));
  }

  async onUpdate() {
    try {
      await this.tpService.updateTp(this.tp.id, {
        title: this.tp.title,
        subjectId: this.tp.subjectId,
        year: this.tp.year,
        content: this.tp.content
      });
      this.tpUpdated.emit();  // Émission de l'événement de mise à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour du TP', error);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.tp.content = file;
    }
  }
}
