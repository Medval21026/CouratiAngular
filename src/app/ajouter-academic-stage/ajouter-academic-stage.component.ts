import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CollegeService } from '../services/college.service';
import { InstitutService } from '../services/institut.service';
import { AcademicStageService } from '../services/academic-stage.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-ajouter-academic-stage',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './ajouter-academic-stage.component.html',
  styleUrls: ['./ajouter-academic-stage.component.css']
})
export class AjouterAcademicStageComponent implements OnInit {
  academicStage = { name: '', collegeId: null as number | null, instituteId: null as number | null };
  colleges: any[] = [];
  institutes: any[] = [];

  @Output() academicStageAdded = new EventEmitter<any>();

  constructor(
    private academicStageService: AcademicStageService,
    private collegeService: CollegeService,
    private institutService: InstitutService
  ) {}

  async ngOnInit() {
    try {
      this.colleges = await this.collegeService.getAllColleges();
      this.institutes = await this.institutService.getAllInstitutes();
    } catch (error) {
      console.error('Erreur lors du chargement des données', error);
    }
  }

  async onSubmit() {
    if (this.academicStage.name.trim() !== '') {
      try {
        const nouveauStage = await this.academicStageService.create(this.academicStage);
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        if (closeButton) closeButton.click();
        this.academicStageAdded.emit(nouveauStage);
        this.academicStage = { name: '', collegeId: null, instituteId: null };
      } catch (error) {
        console.error("Erreur lors de l'ajout du stage académique:", error);
        alert("Erreur lors de l'ajout. Veuillez réessayer.");
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}
