import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SemestreService } from '../services/semestre.service';
import { AcademicStageService } from '../services/academic-stage.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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

    // ✅ Message de succès
    Swal.fire({
      title: 'Mise à jour réussie',
      text: 'Le semestre a été mis à jour avec succès.',
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
    console.error('Erreur lors de la modification du semestre:', error);

    // ❌ Message d'erreur
    Swal.fire({
      title: 'Erreur',
      text: 'Une erreur est survenue lors de la mise à jour du semestre.',
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
