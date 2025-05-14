import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-etudiant',
  imports: [CommonModule, FormsModule],
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  etudiants: any[] = [];
  filteredEtudiants: any[] = [];  // Variable pour stocker les étudiants filtrés
  numeroTel: number | null = null; 

  constructor(private authService: AuthserviceService) {}

  ngOnInit(): void {
    this.loadEtudiants();
  }

  // Fonction pour ajouter un nouvel étudiant
  etudiantAdded(newEtudiant: any) {
    this.etudiants = [...this.etudiants, newEtudiant];
  }

  // Charger la liste des étudiants
  async loadEtudiants() {
    try {
      this.etudiants = await this.authService.getAllEtudiants();
      this.filteredEtudiants = this.etudiants;  // Par défaut, afficher tous les étudiants
      console.log('Étudiants récupérés :', this.etudiants);
    } catch (error) {
      console.error('Erreur lors du chargement des étudiants', error);
    }
  }

  async deleteEtudiant(id: number) {
  const result = await Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action supprimera définitivement cet étudiant.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
    reverseButtons: true,
    width: '350px',
    padding: '1.5em',
    customClass: {
      title: 'swal-title-custom',
      popup: 'swal-popup-custom',
      confirmButton: 'swal-confirm-button'
    },
  });

  if (result.isConfirmed) {
    try {
      await this.authService.supprimerEtudiant(id);
      this.etudiants = this.etudiants.filter(e => e.id !== id);
      this.filteredEtudiants = this.filteredEtudiants.filter(e => e.id !== id);  // Mettre à jour la liste filtrée

      Swal.fire({
        title: 'Suppression réussie',
        text: 'L\'étudiant a été supprimé avec succès.',
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

      console.log('Étudiant supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de l’étudiant', error);

      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la suppression de l\'étudiant.',
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


  // Activer l'abonnement pour un étudiant
  async activerSubscription() {
  if (this.numeroTel) {
    try {
      const response = await this.authService.activerSubscription(this.numeroTel);
      console.log('Abonnement activé', response);
      await this.loadEtudiants();  // Recharger après succès

      Swal.fire({
        title: 'Activation réussie',
        text: 'L\'abonnement a été activé avec succès.',
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
      console.error('Erreur lors de l’activation de l’abonnement', error);

      Swal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'activation de l\'abonnement.',
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
  } else {
    console.error('Numéro de téléphone invalide');
    Swal.fire({
      title: 'Erreur',
      text: 'Veuillez entrer un numéro de téléphone valide.',
      icon: 'warning',
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


  // Filtrer les étudiants en fonction du numéro de téléphone
  filterByPhoneNumber(): void {
    if (this.numeroTel !== null && this.numeroTel !== undefined) {  // Vérifier si numeroTel est défini
      const searchValue = this.numeroTel.toString(); // Convertir numeroTel en string une fois qu'on est sûr qu'il est défini
  
      this.filteredEtudiants = this.etudiants.filter(e => {
        const studentPhone = e.numeroTel != null ? e.numeroTel.toString() : ''; // Si numeroTel de l'étudiant est non null, on le convertit, sinon chaîne vide
        return studentPhone.includes(searchValue);  // On effectue la recherche
      });
    } else {
      this.filteredEtudiants = this.etudiants;  // Si aucun numéro n'est saisi, afficher tous les étudiants
    }
  }
  
  
  
}
