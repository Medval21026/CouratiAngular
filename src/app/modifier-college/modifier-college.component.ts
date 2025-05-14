import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CollegeService } from '../services/college.service';
import { UniversityService } from '../services/university.service'; // Assurez-vous que le service des universités est importé
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modifier-college',
  imports: [FormsModule,CommonModule,NgSelectModule],
  templateUrl: './modifier-college.component.html',
  styleUrls: ['./modifier-college.component.css']
})
export class ModifierCollegeComponent implements OnInit {
  @Input() college: any;  // Le collège à modifier
  @Output() collegeUpdated = new EventEmitter<void>();  // EventEmitter pour notifier que la mise à jour a été effectuée

  universities: any[] = []; // Liste des universités

  constructor(
    private collegeService: CollegeService,
    private universityService: UniversityService // Injection du service des universités
  ) {}

  ngOnInit() {
    this.universityService.getAllUniversities().then(data => {
      this.universities = data; // Remplir la liste des universités
    }).catch(error => console.error('Erreur lors du chargement des universités', error));
  }

  // Méthode pour mettre à jour le collège

async onUpdate() {
  try {
    // Mise à jour du collège via le service
    await this.collegeService.updateCollege(this.college.id, this.college);

    // Émission de l'événement de mise à jour
    this.collegeUpdated.emit();

    // ✅ Message de succès
    Swal.fire({
      title: 'Mise à jour réussie',
      text: 'Le collège a été mis à jour avec succès.',
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
    console.error('Erreur lors de la mise à jour du collège', error);

    // ❌ Message d'erreur
    Swal.fire({
      title: 'Erreur',
      text: 'Une erreur s\'est produite lors de la mise à jour du collège.',
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
}

}
