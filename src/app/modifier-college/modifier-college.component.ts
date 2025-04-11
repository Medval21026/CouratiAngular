import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CollegeService } from '../services/college.service';
import { UniversityService } from '../services/university.service'; // Assurez-vous que le service des universités est importé
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';


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
      await this.collegeService.updateCollege(this.college.id, this.college); // Mise à jour du collège via le service
      this.collegeUpdated.emit(); // Emission de l'événement pour notifier que la mise à jour est terminée
    } catch (error) {
      console.error('Erreur lors de la mise à jour du collège', error);
    }
  }
}
