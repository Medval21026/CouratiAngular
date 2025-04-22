import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SemestreService } from '../services/semestre.service';
import { AcademicStageService } from '../services/academic-stage.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifier-semestre',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './modifier-semestre.component.html',
  styleUrls: ['./modifier-semestre.component.css']
})
export class ModifierSemestreComponent implements OnInit {
  @Input() semestre: any;
  @Output() semestreUpdated = new EventEmitter<void>();

  academicStages: any[] = [];

  constructor(
    private semestreService: SemestreService,
    private academicStageService: AcademicStageService
  ) {}

  ngOnInit(): void {
    this.loadAcademicStages();
  }

  loadAcademicStages() {
    this.academicStageService.getAll().then(data => {
      this.academicStages = [{ id: null, name: 'Aucun' }, ...data];
    }).catch(error => {
      console.error('Erreur lors du chargement des stages académiques', error);
    });
  }

  async onUpdate() {
    try {
      await this.semestreService.updateSemestre(this.semestre.id, this.semestre);
      this.semestreUpdated.emit();
    } catch (error) {
      console.error('Erreur lors de la modification du semestre:', error);
      alert('Erreur lors de la modification du semestre');
    }
  }
}
