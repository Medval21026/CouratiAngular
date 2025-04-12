import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SemestreService {
  private baseUrl = 'http://localhost:8079/semestres'; // Remplace par ton URL backend si nécessaire

  constructor() {}

  // Récupérer tous les semestres
  async getAllSemestres(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/tous_semestres`);
    return response.json();
  }

  // Récupérer un semestre par ID
  async getSemestreById(id: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  // Ajouter un semestre
  async createSemestre(semestre: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(semestre),
    });
    return response.json();
  }

  // Modifier un semestre
  async updateSemestre(id: number, semestre: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(semestre),
    });
    return response.json();
  }

  // Supprimer un semestre
  async deleteSemestre(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }
}
