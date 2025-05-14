import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InstitutService {
  private baseUrl = 'http://localhost:8077/institutes'; // Remplace par ton URL backend

  constructor() {}

  // Récupérer tous les instituts
  async getAllInstitutes(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/touts_institus`);
    return response.json();
  }

  // Ajouter un institut
  async createInstitute(institute: any): Promise<any> {
  const response = await fetch(`${this.baseUrl}/ajouter_institut`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(institute),
  });

  // ✅ Vérifie si le status est entre 200 et 299
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Erreur lors de l’ajout de l’institut.');
  }

  return response.json();
}


  // Modifier un institut
  async updateInstitute(id: number, institute: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/modifier/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(institute),
    });
    return response.json();
  }

  // Supprimer un institut
  async deleteInstitut(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/suprimer/${id}`, { method: 'DELETE' });
  }
  async getTotalInstitutes(): Promise<number> {
    const response = await fetch(`${this.baseUrl}/total`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return response.json();
  }
}
