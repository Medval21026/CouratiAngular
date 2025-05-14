import { Component, Output, EventEmitter, OnInit,ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SemestreService } from '../services/semestre.service';
import { AcademicStageService } from '../services/academic-stage.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-semestre',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './ajouter-semestre.component.html',
  styleUrls: ['./ajouter-semestre.component.css'],
  encapsulation: ViewEncapsulation.None
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

      // ✅ Message de succès
      Swal.fire({
        title: 'Ajout réussi',
        text: 'Le semestre a été ajouté avec succès.',
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
      console.error('Erreur:', error);

      // ❌ Message d'erreur
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l’ajout du semestre.',
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
    // ⚠️ Message d'avertissement
    Swal.fire({
      title: 'Numéro invalide',
      text: 'Le numéro du semestre doit être un entier valide.',
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
