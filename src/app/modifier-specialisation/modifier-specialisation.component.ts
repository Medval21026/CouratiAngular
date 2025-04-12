import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SpecialisationService } from '../services/specialisation.service';
import { CollegeService } from '../services/college.service';
import { InstitutService } from '../services/institut.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';


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
      await this.specialisationService.updateSpecialisation(this.specialisation.id, this.specialisation);
      this.specialisationUpdated.emit();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la spécialisation', error);
    }
  }
}
