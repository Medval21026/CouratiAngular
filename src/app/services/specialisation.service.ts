import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialisationService {
  private apiUrl = 'http://localhost:8077/specializations';

  constructor() {}

  // 🔹 Ajouter une spécialisation (POST)
  async addSpecialisation(specialisation: any): Promise<any> {
    specialisation.collegeId = parseInt(specialisation.collegeId, 10);
    specialisation.instituteId = parseInt(specialisation.instituteId, 10);

    const response = await fetch(`${this.apiUrl}/ajouter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(specialisation),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'ajout de la spécialisation: ${response.statusText}`);
    }

    return response.json();
  }

  // 🔹 Modifier une spécialisation (PUT)
  async updateSpecialisation(id: number, specialisation: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}/modifier/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(specialisation),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour: ${response.statusText}`);
    }

    return response.json();
  }

  // 🔹 Supprimer une spécialisation (DELETE)
  async deleteSpecialisation(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/supprimer/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression: ${response.statusText}`);
    }
  }

  // 🔹 Récupérer toutes les spécialisations (GET)
  async getAllSpecialisations(): Promise<any[]> {
    const response = await fetch(`${this.apiUrl}`);
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des spécialisations: ${response.statusText}`);
    }
    return response.json();
  }

  // 🔹 Récupérer une spécialisation par ID (GET)
  async getSpecialisationById(id: number): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${id}`);

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération de la spécialisation: ${response.statusText}`);
    }

    return response.json();
  }
}
