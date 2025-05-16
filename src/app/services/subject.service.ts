import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseUrl = 'http://srv828261.hstgr.cloud/subjects'; // à adapter selon ton backend

  constructor() { }

  // GET: récupérer tous les sujets
  async getAllSubjects(): Promise<any[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des sujets');
    }
    return await response.json();
  }

  // POST: créer un sujet
  async createSubject(subject: any): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subject)
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du sujet');
    }
    return await response.json();
  }

  // PUT: mettre à jour un sujet
  async updateSubject(id: number, subject: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subject)
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du sujet');
    }
    return await response.json();
  }

  // DELETE: supprimer un sujet
  async deleteSubject(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du sujet');
    }
  }
  async getTotalSubjects(): Promise<number> {
    const response = await fetch(`${this.baseUrl}/total`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return response.json();
  }
  
}
