import { Component, Output, OnInit, EventEmitter,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SubjectService } from '../services/subject.service';
import { SpecialisationService } from '../services/specialisation.service';
import { SemestreService } from '../services/semestre.service';
import { CollegeService } from '../services/college.service';  // Importer CollegeService
import { InstitutService } from '../services/institut.service'; 
import { NgForm } from '@angular/forms';  // Importer InstitutService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-subject',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './ajouter-subject.component.html',
  styleUrls: ['./ajouter-subject.component.css']
})
export class AjouterSubjectComponent implements OnInit {
  @ViewChild('addSubjectForm') addSubjectForm!: NgForm;
  subject = { name: '', specializationId: null, semesterId: '', collegeId: null, instituteId: null };
  specialisations: any[] = [];
  semesters: any[] = [];
  colleges: any[] = [];  // Ajouter un tableau pour les colleges
  institutes: any[] = []; // Ajouter un tableau pour les institutes

  @Output() subjectAdded = new EventEmitter<any>();

  constructor(
    private subjectService: SubjectService,
    private specializationService: SpecialisationService,
    private semestreService: SemestreService,
    private collegeService: CollegeService,  // Ajouter CollegeService
    private institutService: InstitutService  // Ajouter InstitutService
  ) {}

  async ngOnInit() {
    try {
      this.specialisations = await this.specializationService.getAllSpecialisations();
      this.semesters = await this.semestreService.getAllSemestres();
      this.colleges = await this.collegeService.getAllColleges();  // Récupérer les colleges
      this.institutes = await this.institutService.getAllInstitutes();  // Récupérer les institutes
    } catch (error) {
      console.error('Erreur lors du chargement des données', error);
    }
  }


async onSubmit() {
  console.log(this.subject);

  if (this.subject.name.trim() !== '' && this.subject.semesterId) {
    try {
      const nouveauSubject = await this.subjectService.createSubject(this.subject);

      const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
      if (closeButton) closeButton.click();

      this.subjectAdded.emit(nouveauSubject);
      this.subject = { name: '', specializationId: null, semesterId: '', collegeId: null, instituteId: null };

      // ✅ Message de succès
      Swal.fire({
        title: 'Ajout réussi',
        text: 'La matière a été ajoutée avec succès.',
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
      console.error("Erreur lors de l'ajout du sujet:", error);

      // ❌ Message d'erreur
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur s’est produite lors de l’ajout de la matière. Veuillez réessayer.',
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

  } else {
    // ⚠️ Champs vides
    Swal.fire({
      title: 'Champs requis',
      text: 'Veuillez remplir tous les champs obligatoires.',
      icon: 'warning',
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
