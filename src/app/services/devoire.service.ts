import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevoirService {

  private apiUrl = 'https://srv828261.hstgr.cloud/devoirs'; // URL de l'API des devoirs

  constructor() { }

  // GET: Récupérer tous les devoirs
  async getAllDevoirs(): Promise<any[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des devoirs');
    }
    return await response.json();
  }

  // POST: Créer un devoir
  async createDevoir(devoir: any): Promise<any> {
    const formData = new FormData();
    formData.append('title', devoir.title);
    formData.append('subjectId', devoir.subjectId);
    formData.append('year', devoir.year);
    formData.append('file', devoir.content); // fichier du devoir

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du devoir');
    }

    return await response.json();
  }

  // PUT: Mettre à jour un devoir
  async updateDevoir(id: number, devoir: any): Promise<any> {
    const formData = new FormData();
    formData.append('title', devoir.title);
    formData.append('subjectId', devoir.subjectId);
    formData.append('year', devoir.year);
    if (devoir.content) {
      formData.append('file', devoir.content); // fichier mis à jour (facultatif)
    }

    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du devoir');
    }

    return await response.json();
  }

  // DELETE: Supprimer un devoir
  async deleteDevoir(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du devoir');
    }
  }
  async getTotalDevoirs(): Promise<number> {
    const response = await fetch(`${this.apiUrl}/total`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return response.json();
  }
  
}
