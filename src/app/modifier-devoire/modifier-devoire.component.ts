import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SubjectService } from '../services/subject.service';
import { DevoirService } from '../services/devoire.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'modifier-devoire',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './modifier-devoire.component.html',
  styleUrls: ['./modifier-devoire.component.css']
})
export class ModifierDevoireComponent implements OnInit {
  @Input() devoir: any;  // Devoir à modifier
  @Output() devoirUpdated = new EventEmitter<void>();

  subjects: any[] = [];

  constructor(
    private devoirService: DevoirService,
    private subjectsService: SubjectService
  ) {}

  ngOnInit() {
    this.subjectsService.getAllSubjects().then(data => {
      this.subjects = data;
    }).catch(error => console.error('Erreur lors du chargement des matières', error));
  }


async onUpdate() {
  try {
    await this.devoirService.updateDevoir(this.devoir.id, {
      title: this.devoir.title,
      subjectId: this.devoir.subjectId,
      year: this.devoir.year,
      content: this.devoir.content
    });

    this.devoirUpdated.emit();

    Swal.fire({
      icon: 'success',
      title: 'Mise à jour réussie',
      text: 'Le devoir a été modifié avec succès.',
      confirmButtonText: 'oK',
      width: '350px',
      padding: '1.5em',
      customClass: {
        title: 'swal-title-custom',
        popup: 'swal-popup-custom',
        confirmButton: 'swal-confirm-button'
      }
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du devoir', error);

    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Échec de la mise à jour du devoir.',
      confirmButtonText: 'ok',
      width: '350px',
      padding: '1.5em',
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
      this.devoir.content = file;
    }
  }
}
