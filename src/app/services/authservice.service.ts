import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrl = 'http://localhost:8079/auth/login'; // URL de ton API
  constructor() { }
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await fetch('http://localhost:8079/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const responseBody = await response.json();
      if (!response.ok) {
        throw new Error(responseBody.message || "Erreur inconnue");
      }
      return responseBody;
    } catch (error) {
      console.error('Erreur Fetch:', error);
      throw error;
    }
  }
}
