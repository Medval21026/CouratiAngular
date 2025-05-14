import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExamenService } from '../services/examen.service';
import { SubjectService } from '../services/subject.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'ajouter-examen',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './ajouter-examen.component.html',
  styleUrls: ['./ajouter-examen.component.css'],
})
export class AjouterExamenComponent implements OnInit {
  examen = { title: '', content: null as File | null, year: null as number | null, subjectId: null as number | null };
  subjects: any[] = [];

  @Output() examenAdded = new EventEmitter<any>();

  constructor(
    private examenService: ExamenService,
    private subjectsService: SubjectService
  ) {}

  ngOnInit() {
    this.subjectsService.getAllSubjects().then(data => {
      this.subjects = data;
    }).catch(error => console.error('Erreur lors du chargement des matières:', error));
  }


async onSubmit() {
  if (this.examen.title.trim() !== '' && this.examen.subjectId && this.examen.content && this.examen.year) {
    try {
      const newExamen = {
        title: this.examen.title,
        subjectId: this.examen.subjectId,
        year: this.examen.year,
        content: this.examen.content
      };

      console.log(newExamen);

      const addedExamen = await this.examenService.createExamen(newExamen);

      const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
      if (closeButton) closeButton.click();

      this.examenAdded.emit(addedExamen);

      // Affichage de succès avec SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Examen ajouté avec succès',
        text: 'L\'examen a été ajouté.',
        confirmButtonText: 'ok',
        width: '350px',
        padding: '1.5em',
        customClass: {
          title: 'swal-title-custom',
          popup: 'swal-popup-custom',
          confirmButton: 'swal-confirm-button'
        }
      });

      this.examen = { title: '', content: null, year: null, subjectId: null };
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'examen:", error);
      
      // Affichage d'erreur avec SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'ajout de l\'examen. Veuillez réessayer.',
        confirmButtonText: 'oK',
        width: '350px',
        padding: '1.5em',
        customClass: {
          title: 'swal-title-custom',
          popup: 'swal-popup-custom',
          confirmButton: 'swal-confirm-button'
        }
      });
    }
  } else {
    alert('Veuillez remplir tous les champs obligatoires.');
  }
}


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.examen.content = file;
    } else {
      alert('Veuillez sélectionner un fichier.');
    }
  }
}
