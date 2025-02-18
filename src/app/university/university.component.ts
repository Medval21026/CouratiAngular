import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { CommonModule } from '@angular/common';
import { AjouterUniversityComponent } from '../ajouter-university/ajouter-university.component';
import { Router } from '@angular/router';
import { ModifierUniversityComponent } from '../modifier-university/modifier-university.component';
import bootstrap from 'bootstrap';  // Assurez-vous d'importer bootstrap correctement.

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'],
  standalone: true,
  imports: [CommonModule, AjouterUniversityComponent, ModifierUniversityComponent]
})
export class UniversityComponent implements OnInit {
  universities: any[] = [];
  universityToModify: number | null = null; // Ajouter cette propriété

  constructor(private universityService: UniversityService, private route: Router) {}

  ngOnInit() {
    this.universityService.getAllUniversities()
      .then(data => {
        this.universities = data;
      })
      .catch(error => {
        console.error('Erreur lors du chargement des universités:', error);
      });
  }

  openModifyModal(universityId: number) {
    if (typeof document !== 'undefined') { 
      const modalElement = document.getElementById('modifyUniversityModal');
      if (modalElement) { 
        import('bootstrap').then((bootstrap) => {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
          this.universityToModify = universityId;  // Assurez-vous que cette propriété existe
        });
      } else {
        console.error('Modal element not found!');
      }
    }
  }
  
}
