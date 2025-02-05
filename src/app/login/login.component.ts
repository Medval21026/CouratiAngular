import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthserviceService,router:Router) { }

  async onLogin(event: Event) {
    event.preventDefault();

    try {
      const data = await this.authService.login(this.email, this.password);
      console.log('Login successful:', data);
    } catch (error) {
      this.errorMessage = 'Email ou mot de passe incorrect';
    }
  }
}

