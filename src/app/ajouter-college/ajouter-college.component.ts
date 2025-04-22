import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { CollegeService } from '../services/college.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UniversityService } from '../services/university.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-ajouter-college',
  standalone: true,
  imports: [FormsModule, CommonModule,NgSelectModule],
  templateUrl: './ajouter-college.component.html',
  styleUrls: ['./ajouter-college.component.css'],
})
export class AjouterCollegeComponent implements OnInit {
  college = { name_fr: '',name_ar: '', universityId: '' as number | '' }; // ou utiliser une assertion de type ici
  universities: any[] = [];
  @Output() collegeAdded = new EventEmitter<any>();

  constructor(
    private collegeService: CollegeService,
    private universityService: UniversityService
  ) {}

  ngOnInit() {
    // Charger les universités disponibles
    this.universityService
      .getAllUniversities()
      .then((data) => {
        this.universities = data;
      })
      .catch((error) => console.error(error));
  }

  async onSubmit() {
    if (this.college.name_fr.trim() !== '' &&this.college.name_ar && this.college.universityId != null) {
      try {
        const newCollege = await this.collegeService.createCollege(this.college);
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        if (closeButton) {
          (closeButton as HTMLButtonElement).click();
        }
        this.collegeAdded.emit(newCollege);
        this.college.name_fr = '';
        this.college.name_ar = '';
        this.college.universityId = '';
      } catch (error) {
        console.error('Erreur lors de l\'ajout du collège:', error);
        alert('Erreur lors de l\'ajout du collège. Veuillez réessayer.');
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}
