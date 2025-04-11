import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  private apiUrle = 'http://localhost:8079/colleges'; // URL du backend

  constructor() {}
  async createCollege(college: any): Promise<any> {
    college.universityId = parseInt(college.universityId, 10); // Assurez-vous d'utiliser universityId
    const response = await fetch(`${this.apiUrle}/ajouter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(college),
    });
    if (!response.ok) {
      throw new Error(`Erreur lors de l'ajout du collège: ${response.statusText}`);
    }
  
    const responseBody = await response.json(); // Utilisez .json() pour obtenir directement l'objet JSON
    return responseBody;
  }

  // 🔹 Modifier un collège
  async updateCollege(id: number, college: any): Promise<any> {
    const response = await fetch(`${this.apiUrle}/modifier/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(college)
    });
    return response.json();
  }

  // 🔹 Supprimer un collège
  async deleteCollege(id: number): Promise<void> {
    await fetch(`${this.apiUrle}/supprimer/${id}`, { method: 'DELETE' });
  }

  // 🔹 Récupérer tous les collèges
  async getAllColleges(): Promise<any[]> {
    const response = await fetch(this.apiUrle);
    return response.json();
  }
}
