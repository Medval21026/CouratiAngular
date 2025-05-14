import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { TdService } from '../services/td.service';
import { SubjectService } from '../services/subject.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'ajouter-td',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './ajouter-td.component.html',
  styleUrls: ['./ajouter-td.component.css'],
})
export class AjouterTdComponent implements OnInit {
  td = { title: '', content: null as File | null, year: null as number | null, subjectId: null as number | null };
  subjects: any[] = [];

  @Output() tdAdded = new EventEmitter<any>();

  constructor(
    private tdService: TdService,
    private subjectsService: SubjectService
  ) {}

  ngOnInit() {
    this.subjectsService.getAllSubjects().then(data => {
      this.subjects = data;
    }).catch(error => console.error('Erreur lors du chargement des matières:', error));
  }


async onSubmit() {
  if (
    this.td.title.trim() !== '' &&
    this.td.subjectId &&
    this.td.content &&
    this.td.year
  ) {
    try {
      const newTd = {
        title: this.td.title,
        subjectId: this.td.subjectId,
        year: this.td.year,
        content: this.td.content
      };

      const addedTd = await this.tdService.createTd(newTd);

      const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
      if (closeButton) closeButton.click();

      this.tdAdded.emit(addedTd);

      this.td = { title: '', content: null, year: null, subjectId: null };

      Swal.fire({
        title: 'Succès',
        text: 'TD ajouté avec succès.',
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
      console.error("Erreur lors de l'ajout du TD:", error);
      Swal.fire({
        title: 'Erreur',
        text: 'Erreur lors de l\'ajout du TD. Veuillez réessayer.',
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
      title: 'Champs manquants',
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


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.td.content = file;
    } else {
      alert('Veuillez sélectionner un fichier.');
    }
  }
}
