import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CollegeService } from '../services/college.service';
import { InstitutService } from '../services/institut.service';
import { SpecialisationService } from '../services/specialisation.service';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-ajouter-specialisation',
  standalone: true,
  imports: [FormsModule, CommonModule,NgSelectModule],
  templateUrl: './ajouter-specialisation.component.html',
  styleUrls: ['./ajouter-specialisation.component.css']
})
export class AjouterSpecialisationComponent implements OnInit {
  specialisation = { name: '', collegeId: '' as number | '', instituteId: '' as number | '' };
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
    if (this.specialisation.name.trim() !== '' && this.specialisation.collegeId && this.specialisation.instituteId) {
      try {
        const nouvelleSpecialisation = await this.specialisationService.addSpecialisation(this.specialisation);
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        if (closeButton) closeButton.click();
        this.specialisationAdded.emit(nouvelleSpecialisation);
        this.specialisation = { name: '', collegeId: '', instituteId: '' };
      } catch (error) {
        console.error("Erreur lors de l'ajout de la spécialisation:", error);
        alert("Erreur lors de l'ajout de la spécialisation. Veuillez réessayer.");
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}
