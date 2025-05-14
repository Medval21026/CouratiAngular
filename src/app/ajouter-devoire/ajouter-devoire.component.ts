import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { SubjectService } from '../services/subject.service';
import { DevoirService } from '../services/devoire.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'ajouter-devoire',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './ajouter-devoire.component.html',
  styleUrls: ['./ajouter-devoire.component.css'],
})
export class AjouterDevoireComponent implements OnInit {
  devoir = { title: '', content: null as File | null, year: null as number | null, subjectId: null as number | null };
  subjects: any[] = [];

  @Output() devoirAdded = new EventEmitter<any>();

  constructor(
    private devoirService: DevoirService,
    private subjectsService: SubjectService
  ) {}

  ngOnInit() {
    this.subjectsService.getAllSubjects().then(data => {
      this.subjects = data;
    }).catch(error => console.error('Erreur lors du chargement des matières:', error));
  }


async onSubmit() {
  if (this.devoir.title.trim() !== '' && this.devoir.subjectId && this.devoir.content && this.devoir.year) {
    try {
      const newDevoir = {
        title: this.devoir.title,
        subjectId: this.devoir.subjectId,
        year: this.devoir.year,
        content: this.devoir.content
      };

      const addedDevoir = await this.devoirService.createDevoir(newDevoir);

      const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
      if (closeButton) closeButton.click();

      this.devoirAdded.emit(addedDevoir);

      this.devoir = { title: '', content: null, year: null, subjectId: null };

      // ✅ Message de succès
      Swal.fire({
        icon: 'success',
        title: 'Ajout réussi',
        text: 'Le devoir a été ajouté avec succès.',
        confirmButtonText: 'ok',
        width: '350px',
        padding: '1.5em',
        customClass: {
          title: 'swal-title-custom',
          popup: 'swal-popup-custom',
          confirmButton: 'swal-confirm-button'
        }
      });

    } catch (error) {
      console.error("Erreur lors de l'ajout du devoir:", error);

      // ❌ Message d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Une erreur est survenue lors de l'ajout du devoir. Veuillez réessayer.",
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
  } else {
    // ⚠️ Message de champs obligatoires manquants
    Swal.fire({
      icon: 'warning',
      title: 'Champs requis',
      text: 'Veuillez remplir tous les champs obligatoires.',
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
    } else {
      alert('Veuillez sélectionner un fichier.');
    }
  }
}
