import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SubjectService } from '../services/subject.service';
import { SpecialisationService } from '../services/specialisation.service';
import { SemestreService } from '../services/semestre.service';
import { CollegeService } from '../services/college.service';  // Importer CollegeService
import { InstitutService } from '../services/institut.service';  // Importer InstitutService
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modifier-subject',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './modifier-subject.component.html',
  styleUrls: ['./modifier-subject.component.css']
})
export class ModifierSubjectComponent implements OnInit {
  @Input() subject: any;
  @Output() subjectUpdated = new EventEmitter<void>();

  specialisations: any[] = [];
  semesters: any[] = [];
  colleges: any[] = [];  // Ajouter un tableau pour les colleges
  institutes: any[] = []; // Ajouter un tableau pour les institutes

  constructor(
    private subjectService: SubjectService,
    private specialisationService: SpecialisationService,
    private semestreService: SemestreService,
    private collegeService: CollegeService,  // Ajouter CollegeService
    private institutService: InstitutService  // Ajouter InstitutService
  ) {}

  ngOnInit() {
    this.loadSpecialisations();
    this.loadSemesters();
    this.loadColleges();
    this.loadInstitutes();
  }

  loadSpecialisations() {
    this.specialisationService.getAllSpecialisations().then(data => {
      this.specialisations = data;
    }).catch(err => console.error('Erreur lors du chargement des spécialités', err));
  }

  loadSemesters() {
    this.semestreService.getAllSemestres().then(data => {
      this.semesters = data;
    }).catch(err => console.error('Erreur lors du chargement des semestres', err));
  }

  loadColleges() {
    this.collegeService.getAllColleges().then(data => {
      this.colleges = [{ id: null, name: 'Aucun' }, ...data];
    }).catch(err => console.error('Erreur lors du chargement des colleges', err));
  }

  loadInstitutes() {
    this.institutService.getAllInstitutes().then(data => {
      this.institutes = [{ id: null, name: 'Aucun' }, ...data];
    }).catch(err => console.error('Erreur lors du chargement des institutes', err));
  }


async onUpdate() {
  try {
    await this.subjectService.updateSubject(this.subject.id, this.subject);
    this.subjectUpdated.emit();

    // ✅ Message de succès
    Swal.fire({
      title: 'Mise à jour réussie',
      text: 'La matière a été mise à jour avec succès.',
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
    console.error("Erreur lors de la mise à jour de la matière", error);

    // ❌ Message d'erreur
    Swal.fire({
      title: 'Erreur',
      text: 'Une erreur s’est produite lors de la mise à jour de la matière.',
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
