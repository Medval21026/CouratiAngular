import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private baseUrl = 'http://srv828261.hstgr.cloud/auth'; // Base de l’API

  constructor() { }

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(responseBody.message || "Erreur inconnue");
      }

      if (responseBody.token) {
        localStorage.setItem('token', responseBody.token);
      }

      return responseBody;
    } catch (error) {
      console.error('Erreur Fetch:', error);
      throw error;
    }
  }

  async getAllEtudiants(): Promise<any[]> {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(responseBody.message || "Erreur lors de la récupération des étudiants");
      }

      return responseBody;
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants:', error);
      throw error;
    }
  }

  async activerSubscription(numeroTel: number): Promise<any> {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${this.baseUrl}/activer-subscription/${numeroTel}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(responseBody.message || "Erreur lors de l'activation de l'abonnement");
      }

      return responseBody;
    } catch (error) {
      console.error('Erreur lors de l’activation de l’abonnement :', error);
      throw error;
    }
  }

  async supprimerEtudiant(id: number): Promise<void> {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${this.baseUrl}/'gh'/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l’étudiant :', error);
      throw error;
    }
  }
}
