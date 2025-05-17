import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private apiUrl = 'https://srv828261.hstgr.cloud/examens'; // URL de l'API des examens

  constructor() { }

  // GET: Récupérer tous les examens
  async getAllExamens(): Promise<any[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des examens');
    }
    return await response.json();
  }

  // POST: Créer un examen
  async createExamen(examen: any): Promise<any> {
    const formData = new FormData();
    formData.append('title', examen.title);
    formData.append('subjectId', examen.subjectId);
    formData.append('year', examen.year);
    formData.append('file', examen.content); // fichier de l'examen

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'examen');
    }

    return await response.json();
  }

  // PUT: Mettre à jour un examen
  async updateExamen(id: number, examen: any): Promise<any> {
    const formData = new FormData();
    formData.append('title', examen.title);
    formData.append('subjectId', examen.subjectId);
    formData.append('year', examen.year);
    if (examen.content) {
      formData.append('file', examen.content); // fichier mis à jour (facultatif)
    }

    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de l\'examen');
    }

    return await response.json();
  }

  // DELETE: Supprimer un examen
  async deleteExamen(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de l\'examen');
    }
  }

  async getTotalExamens(): Promise<number> {
    const response = await fetch(`${this.apiUrl}/total`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return response.json();
  }
  
}
