import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TpService {

  private apiUrl = 'https://srv828261.hstgr.cloud/api/tps'; // URL de l'API des TPs

  constructor() { }

  // GET: Récupérer tous les TPs
  async getAllTps(): Promise<any[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des TPs');
    }
    return await response.json();
  }

  // POST: Créer un TP
  async createTp(tp: any): Promise<any> {
    const formData = new FormData();
    formData.append('title', tp.title);
    formData.append('subjectId', tp.subjectId);
    formData.append('year', tp.year);
    formData.append('file', tp.content); // fichier du TP

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du TP');
    }

    return await response.json();
  }

  // PUT: Mettre à jour un TP
  async updateTp(id: number, tp: any): Promise<any> {
    const formData = new FormData();
    formData.append('title', tp.title);
    formData.append('subjectId', tp.subjectId);
    formData.append('year', tp.year);
    if (tp.content) {
      formData.append('file', tp.content); // fichier mis à jour (facultatif)
    }

    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du TP');
    }

    return await response.json();
  }

  // DELETE: Supprimer un TP
  async deleteTp(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du TP');
    }
  }

  async getTotalTPs(): Promise<number> {
    const response = await fetch(`${this.apiUrl}/total`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return response.json();
  }
  
}
