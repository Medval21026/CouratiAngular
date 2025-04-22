import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AcademicStageService } from '../services/academic-stage.service';
import { CollegeService } from '../services/college.service';
import { InstitutService } from '../services/institut.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-modifier-academic-stage',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './modifier-academic-stage.component.html',
  styleUrls: ['./modifier-academic-stage.component.css']
})
export class ModifierAcademicStageComponent implements OnInit {
  @Input() academicStage: any;
  @Output() academicStageUpdated = new EventEmitter<void>();

  colleges: any[] = [];
  institutes: any[] = [];

  constructor(
    private academicStageService: AcademicStageService,
    private collegeService: CollegeService,
    private institutService: InstitutService
  ) {}

  ngOnInit() {
    this.loadColleges();
    this.loadInstitutes();
  }

  loadColleges() {
    this.collegeService.getAllColleges().then(data => {
      this.colleges = [{ id: null, name: 'Aucun' }, ...data];
    }).catch(err => console.error('Erreur lors du chargement des collèges', err));
  }

  loadInstitutes() {
    this.institutService.getAllInstitutes().then(data => {
      this.institutes = [{ id: null, name: 'Aucun' }, ...data];
    }).catch(err => console.error('Erreur lors du chargement des instituts', err));
  }

  async onUpdate() {
    try {
      await this.academicStageService.update(this.academicStage.id, this.academicStage);
      this.academicStageUpdated.emit();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du stage académique', error);
    }
  }
}
