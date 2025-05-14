import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AcademicStageService } from '../services/academic-stage.service';
import { CollegeService } from '../services/college.service';
import { InstitutService } from '../services/institut.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';

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

    Swal.fire({
      title: 'Mise à jour réussie',
      text: 'Le stage académique a été mis à jour avec succès.',
      icon: 'success',
      confirmButtonText: 'OK',
      width: '350px',
      padding: '1.5em',
      customClass: {
        title: 'swal-title-custom',
        popup: 'swal-popup-custom',
        confirmButton: 'swal-confirm-button'
      },
      buttonsStyling: false
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du stage académique', error);

    Swal.fire({
      title: 'Erreur',
      text: 'Une erreur est survenue lors de la mise à jour du stage académique.',
      icon: 'error',
      confirmButtonText: 'OK',
      width: '350px',
      padding: '1.5em',
      customClass: {
        title: 'swal-title-custom',
        popup: 'swal-popup-custom',
        confirmButton: 'swal-confirm-button'
      },
      buttonsStyling: false
    });
  }
}

}
