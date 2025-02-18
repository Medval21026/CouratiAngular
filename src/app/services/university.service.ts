import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private readonly URL_UNIVERSITY = 'http://localhost:8079/universities/tous_universities';
  private readonly ADD_UNIVERSITY_URL = 'http://localhost:8079/universities/ajouter_university';

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
  updateUniversity(id: number, university: { name: string }) {
    const url = `http://localhost:8079/universities/modifier/${id}`;  // Utilise l'ID dans l'URL
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(university)
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Erreur lors de la modification de l\'université:', error);
      throw error;
    });
  }
  getUniversityById(id: number) {
    return fetch(`http://localhost:8079/universities/${id}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Erreur lors de la récupération de l\'université:', error);
        throw error;
      });
  }
}

