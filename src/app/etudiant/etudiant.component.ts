

import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service'; // adapte le chemin si nécessaire
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-etudiant',
  imports:[CommonModule,FormsModule],
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  etudiants: any[] = [];
  numeroTel: number | null = null; 

  constructor(private authService: AuthserviceService) {}

  ngOnInit(): void {
    this.loadEtudiants();
  }
  etudiantAdded(newEtudiant: any) {
    this.etudiants = [...this.etudiants, newEtudiant];
  }
  async loadEtudiants() {
    try {
      this.etudiants = await this.authService.getAllEtudiants();
      console.log('Étudiants récupérés :', this.etudiants);
    } catch (error) {
      console.error('Erreur lors du chargement des étudiants', error);
    }
  }
  async deleteEtudiant(id: number) {
    const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?");
    
    if (!isConfirmed) {
      return;  // Si l'utilisateur annule, on sort de la méthode
    }
  
    try {
      await this.authService.supprimerEtudiant(id);  // Appel au service pour supprimer l'étudiant
      this.etudiants = this.etudiants.filter(e => e.id !== id);  // Mise à jour de la liste d'étudiants
      console.log('Étudiant supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de l’étudiant', error);
    }
  }
  async activerSubscription() {
    this.loadEtudiants();
    if (this.numeroTel) {
      try {
        const response = await this.authService.activerSubscription(this.numeroTel);
        console.log('Abonnement activé', response);
        // Tu peux ici mettre à jour l'affichage des étudiants ou afficher un message de succès
      } catch (error) {
        console.error('Erreur lors de l’activation de l’abonnement', error);
      }
    } else {
      console.error('Numéro de téléphone invalide');
    }
  }
  
}

