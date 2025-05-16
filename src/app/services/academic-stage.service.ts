import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcademicStageService {

  private baseUrl = 'http://srv828261.hstgr.cloud/academic-stages';

  constructor() { }

  // GET : récupérer toutes les étapes académiques
  async getAll(): Promise<any[]> {
    const response = await fetch(this.baseUrl);
    return response.json();
  }

  // POST : créer une nouvelle étape académique
  async create(stage: any): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stage)
    });
    return response.json();
  }

  // PUT : mettre à jour une étape académique
  async update(id: number, stage: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stage)
    });
    return response.json();
  }

  // DELETE : supprimer une étape académique
  async delete(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    });
  }
}
