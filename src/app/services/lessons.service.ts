import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  private apiUrl = 'http://localhost:8077/lessons'; // adapte l'URL si besoin

  constructor() { }
  
  async getAllLessons(): Promise<any[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des leçons');
    }
    return await response.json();
  }
  async getTotalLessons(): Promise<number> {
    const response = await fetch(`${this.apiUrl}/total`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return response.json();
  }
  
  async createLesson(lesson: any): Promise<any> {
    const formData = new FormData();
    formData.append('title', lesson.title);
    formData.append('subjectId', lesson.subjectId);
    formData.append('file', lesson.content); // Ajoute le fichier ici
  
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      body: formData
    });
  
    if (!response.ok) {
      throw new Error('Erreur lors de la création de la leçon');
    }
    
    return await response.json();
  }
  

  // PUT: Mettre à jour une leçon
  async updateLesson(id: number, lesson: any): Promise<any> {
    const formData = new FormData();
    formData.append('title', lesson.title);
    formData.append('subjectId', lesson.subjectId);
    if (lesson.content) {
      formData.append('file', lesson.content);  // Ajoute le fichier si présent
    }
  
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      body: formData  // Envoie FormData au lieu de JSON
    });
  
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de la leçon');
    }
    return await response.json();
  }
  

  // DELETE: Supprimer une leçon
  async deleteLesson(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la leçon');
    }
  }
}
