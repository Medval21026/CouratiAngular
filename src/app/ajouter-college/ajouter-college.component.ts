import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { CollegeService } from '../services/college.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UniversityService } from '../services/university.service';
import { NgSelectModule } from '@ng-select/ng-select';
 import Swal from 'sweetalert2';


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
  // Vérification des champs
  if (this.college.name_fr.trim() !== '' && this.college.name_ar && this.college.universityId != null) {
    try {
      // Tentative de création du collège
      const newCollege = await this.collegeService.createCollege(this.college);

      // Fermeture du modal
      const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
      if (closeButton) {
        (closeButton as HTMLButtonElement).click();
      }

      // Émission de l'événement
      this.collegeAdded.emit(newCollege);

      // Réinitialisation des champs du formulaire
      this.college.name_fr = '';
      this.college.name_ar = '';
      this.college.universityId = '';

      // ✅ Message de succès
      Swal.fire({
        title: 'Ajout réussi',
        text: 'Le collège a été ajouté avec succès.',
        icon: 'success',
        confirmButtonText: 'OK',
        width: '350px',
        padding: '1.5em',
        customClass: {
          confirmButton: 'swal-confirm-button'
        },
        buttonsStyling: false
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du collège:', error);

      // ❌ Message d'erreur
      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de l\'ajout du collège.',
        icon: 'error',
        confirmButtonText: 'OK',
        width: '350px',
        padding: '1.5em',
        customClass: {
          confirmButton: 'swal-confirm-button'
        },
        buttonsStyling: false
      });
    }
  } else {
    // ⚠️ Message si les champs sont vides
    Swal.fire({
      title: 'Champs requis',
      text: 'Veuillez remplir tous les champs obligatoires.',
      icon: 'warning',
      confirmButtonText: 'OK',
      width: '350px',
      padding: '1.5em',
      customClass: {
        confirmButton: 'swal-confirm-button'
      },
      buttonsStyling: false
    });
  }
}

}
