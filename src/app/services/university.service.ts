import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private readonly URL_UNIVERSITY = 'http://localhost:8079/universities/tous_universities';
  private readonly ADD_UNIVERSITY_URL = 'http://localhost:8079/universities/ajouter_university';
  private readonly apiUrl='http://localhost:8079/universities/modifier'
  private readonly DELETE_UNIVERSITY_URL = 'http://localhost:8079/universities/supprimer';
  constructor() { }

  getAllUniversities() {
    return fetch(this.URL_UNIVERSITY)
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
  addUniversity(university: { name: string }) {
    return fetch(this.ADD_UNIVERSITY_URL, {
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
    return fetch(`${this.apiUrl}/${id}`, {
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
    return fetch(`${this.DELETE_UNIVERSITY_URL}/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }
      return response.text().then(text => text ? JSON.parse(text) : {}); // Vérifie si la réponse est vide
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l\'université:', error);
      throw error;
    });
  }
  
}

