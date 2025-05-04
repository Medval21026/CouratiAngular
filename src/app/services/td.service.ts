import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TdService {

  private apiUrl = 'http://localhost:8077/api/tds'; // URL de l'API des TDs

  constructor() { }

  // GET: Récupérer tous les TDs
  async getAllTds(): Promise<any[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des TDs');
    }
    return await response.json();
  }

  // POST: Créer un TD
  async createTd(td: any): Promise<any> {
    const formData = new FormData();
    formData.append('title', td.title);
    formData.append('subjectId', td.subjectId);
    formData.append('year', td.year);
    formData.append('file', td.content); // fichier du TD

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du TD');
    }

    return await response.json();
  }

  // PUT: Mettre à jour un TD
  async updateTd(id: number, td: any): Promise<any> {
    const formData = new FormData();
    formData.append('title', td.title);
    formData.append('subjectId', td.subjectId);
    formData.append('year', td.year);
    if (td.content) {
      formData.append('file', td.content); // fichier mis à jour (facultatif)
    }

    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du TD');
    }

    return await response.json();
  }

  // DELETE: Supprimer un TD
  async deleteTd(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du TD');
    }
  }

  async getTotalTDs(): Promise<number> {
    const response = await fetch(`${this.apiUrl}/total`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return response.json();
  }
  
}
