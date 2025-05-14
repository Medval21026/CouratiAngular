import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CollegeService } from '../services/college.service';
import { InstitutService } from '../services/institut.service';
import { SpecialisationService } from '../services/specialisation.service';
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ajouter-specialisation',
  standalone: true,
  imports: [FormsModule, CommonModule,NgSelectModule],
  templateUrl: './ajouter-specialisation.component.html',
  styleUrls: ['./ajouter-specialisation.component.css']
})
export class AjouterSpecialisationComponent implements OnInit {
  specialisation = { name: '', collegeId: null as number | null, instituteId: null as number | null };
  colleges: any[] = [];
  institutes: any[] = [];

  @Output() specialisationAdded = new EventEmitter<any>();

  constructor(
    private specialisationService: SpecialisationService,
    private collegeService: CollegeService,
    private institutService: InstitutService
  ) {}

  async ngOnInit() {
    try {
      this.colleges = await this.collegeService.getAllColleges();
      this.institutes = await this.institutService.getAllInstitutes();
    } catch (error) {
      console.error('Erreur lors du chargement des données', error);
    }
  }

  async onSubmit() {
  if (this.specialisation.name.trim() !== '') {
    try {
      const nouvelleSpecialisation = await this.specialisationService.addSpecialisation(this.specialisation);
      
      // Fermer le modal après ajout réussi
      const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
      if (closeButton) closeButton.click();
      
      // Emission de l'événement pour notifier l'ajout
      this.specialisationAdded.emit(nouvelleSpecialisation);
      
      // Réinitialisation de l'objet spécialisation
      this.specialisation = { name: '', collegeId: null, instituteId: null };

      // Affichage d'un message de succès
      Swal.fire({
        title: 'Spécialisation ajoutée',
        text: 'La spécialisation a été ajoutée avec succès.',
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
      console.error("Erreur lors de l'ajout de la spécialisation:", error);

      // Affichage d'un message d'erreur
      Swal.fire({
        title: 'Erreur',
        text: "Une erreur est survenue lors de l'ajout de la spécialisation. Veuillez réessayer.",
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

}
