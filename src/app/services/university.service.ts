import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private readonly BASE_URL = 'https://srv828261.hstgr.cloud/universities';

  constructor() { }

  getAllUniversities() {
    return fetch(`${this.BASE_URL}/tous_universities`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des universités:', error);
        throw error;
      });
  }

  addUniversity(university: { name_fr: string, name_ar: string }) {
    return fetch(`${this.BASE_URL}/ajouter_university`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(university)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout de l\'université:', error);
      throw error;
    });
  }

  updateUniversity(id: number, updatedData: any) {
    return fetch(`${this.BASE_URL}/modifier/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Erreur lors de la modification de l’université:', error);
      throw error;
    });
  }

  deleteUniversity(id: number) {
    return fetch(`${this.BASE_URL}/supprimer/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }
      return response.text().then(text => text ? JSON.parse(text) : {});
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l\'université:', error);
      throw error;
    });
  }

  getTotalUniversities() {
    return fetch(`${this.BASE_URL}/total`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du total des universités:', error);
        throw error;
      });
  }
}
