import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExamenService } from '../services/examen.service';
import { SubjectService } from '../services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'modifier-examen',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './modifier-examen.component.html',
  styleUrls: ['./modifier-examen.component.css']
})
export class ModifierExamenComponent implements OnInit {
  @Input() examen: any;  // Examen à modifier
  @Output() examenUpdated = new EventEmitter<void>();

  subjects: any[] = [];

  constructor(
    private examenService: ExamenService,
    private subjectsService: SubjectService
  ) {}

  ngOnInit() {
    this.subjectsService.getAllSubjects().then(data => {
      this.subjects = data;
    }).catch(error => console.error('Erreur lors du chargement des matières', error));
  }



async onUpdate() {
  try {
    // Mise à jour de l'examen
    await this.examenService.updateExamen(this.examen.id, {
      title: this.examen.title,
      subjectId: this.examen.subjectId,
      year: this.examen.year,
      content: this.examen.content
    });

    // Émission de l'événement de mise à jour
    this.examenUpdated.emit();

    // Affichage d'un message de succès avec SweetAlert et styles personnalisés
    Swal.fire({
      title: 'Mise à jour réussie',
      text: 'L\'examen a été mis à jour avec succès.',
      icon: 'success',
      confirmButtonText: 'OK',
      width: '350px',
      padding: '1.5em',
      customClass: {
        title: 'swal-title-custom',
        popup: 'swal-popup-custom',
        confirmButton: 'swal-confirm-button'
      }
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'examen', error);

    // Affichage d'un message d'erreur avec SweetAlert et styles personnalisés
    Swal.fire({
      title: 'Erreur',
      text: 'Une erreur est survenue lors de la mise à jour de l\'examen.',
      icon: 'error',
      confirmButtonText: 'Réessayer',
      width: '350px',
      padding: '2em',
      customClass: {
        title: 'swal-title-custom',
        popup: 'swal-popup-custom',
        confirmButton: 'swal-confirm-button'
      }
    });
  }
}



  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.examen.content = file;
    }
  }
}
