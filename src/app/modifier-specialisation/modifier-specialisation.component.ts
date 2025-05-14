import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SpecialisationService } from '../services/specialisation.service';
import { CollegeService } from '../services/college.service';
import { InstitutService } from '../services/institut.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modifier-specialisation',
  imports: [FormsModule, CommonModule,NgSelectModule],
  templateUrl: './modifier-specialisation.component.html',
  styleUrls: ['./modifier-specialisation.component.css']
})
export class ModifierSpecialisationComponent implements OnInit {
  @Input() specialisation: any;
  @Output() specialisationUpdated = new EventEmitter<void>();

  colleges: any[] = [];
  institutes: any[] = [];

  constructor(
    private specialisationService: SpecialisationService,
    private collegeService: CollegeService,
    private instituteService: InstitutService
  ) {}

  ngOnInit() {
    this.loadColleges();
    this.loadInstitutes();
  }

  loadColleges() {
    this.collegeService.getAllColleges().then(data => {
      this.colleges = [{ id: null, name: 'Aucun' }, ...data];
    }).catch(err => console.error('Erreur lors du chargement des collèges', err));
  }

  loadInstitutes() {
    this.instituteService.getAllInstitutes().then(data => {
      this.institutes = [{ id: null, name: 'Aucun' }, ...data];
    }).catch(err => console.error('Erreur lors du chargement des instituts', err));
  }

  async onUpdate() {
  try {
    // Tentative de mise à jour de la spécialisation via le service
    await this.specialisationService.updateSpecialisation(this.specialisation.id, this.specialisation);
    
    // Emission de l'événement pour notifier que la spécialisation a été mise à jour
    this.specialisationUpdated.emit();

    // Affichage d'un message de succès
    Swal.fire({
      title: 'Mise à jour réussie',
      text: 'La spécialisation a été mise à jour avec succès.',
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
    // Gestion de l'erreur lors de la mise à jour
    console.error('Erreur lors de la mise à jour de la spécialisation', error);

    // Affichage d'un message d'erreur
    Swal.fire({
      title: 'Erreur',
      text: 'Une erreur est survenue lors de la mise à jour de la spécialisation. Veuillez réessayer.',
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
