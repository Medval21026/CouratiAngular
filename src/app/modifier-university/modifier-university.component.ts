import { Component, Input, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-university',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './modifier-university.component.html',
  styleUrls: ['./modifier-university.component.css']
})
export class ModifierUniversityComponent implements OnInit {
  @Input() university: any = { name: '' };   // Définir la propriété `university` pour recevoir l'université à modifier

  constructor(private universityService: UniversityService) {}

  ngOnInit() {
    if (!this.university) {
      console.error('Aucune université à modifier');
    }
  }

  onSubmit() {
    if (this.university) {
      this.universityService.updateUniversity(this.university.id, this.university)
        .then(response => {
          this.university = { name: '' };
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour de l\'université:', error);
        });
    }
  }
}
