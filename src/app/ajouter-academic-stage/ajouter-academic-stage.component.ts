import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AcademicStageService } from '../services/academic-stage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-academic-stage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ajouter-academic-stage.component.html',
  styleUrls: ['./ajouter-academic-stage.component.css']
})
export class AjouterAcademicStageComponent implements OnInit {
  academicStage = { name: '' };

  @Output() academicStageAdded = new EventEmitter<any>();

  constructor(private academicStageService: AcademicStageService) {}

  ngOnInit() {}

 async onSubmit() {
  if (this.academicStage.name.trim() !== '') {
    try {
      const nouveauStage = await this.academicStageService.create(this.academicStage);
      const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
      if (closeButton) closeButton.click();

      this.academicStageAdded.emit(nouveauStage);
      this.academicStage = { name: '' };

      Swal.fire({
        title: 'Ajout réussi',
        text: 'Le stage académique a été ajouté avec succès.',
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
      console.error("Erreur lors de l'ajout du stage académique:", error);
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l’ajout du stage académique.',
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
    Swal.fire({
      title: 'Champs requis',
      text: 'Veuillez remplir le nom du stage.',
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
