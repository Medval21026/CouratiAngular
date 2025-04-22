import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SemestreService } from '../services/semestre.service';
import { AcademicStageService } from '../services/academic-stage.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-semestre',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './ajouter-semestre.component.html',
  styleUrls: ['./ajouter-semestre.component.css']
})
export class AjouterSemestreComponent implements OnInit {
  semestre = { semesterNumber: '', academicStageId: null };
  academicStages: any[] = [];

  @Output() semestreAdded = new EventEmitter<any>();

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

  async onSubmit() {
    if (Number.isInteger(this.semestre.semesterNumber)) {
      try {
        console.log('Formulaire soumis:', this.semestre);
        const newSemestre = await this.semestreService.createSemestre(this.semestre);
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        if (closeButton) closeButton.click();

        this.semestreAdded.emit(newSemestre);
        this.semestre.semesterNumber = '';
        this.semestre.academicStageId = null;
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'ajout du semestre');
      }
    } else {
      alert('Le numéro du semestre doit être un entier valide');
    }
  }
}
