import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UniversityComponent } from './university/university.component'; // Importation du composant
import { ModifierUniversityComponent } from './modifier-university/modifier-university.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, data: { showNavbar: false } },  // Pas de navbar sur la page de login
  { path: 'university', component: UniversityComponent, data: { showNavbar: true } },
  { path: 'modifier_university/:id', component: ModifierUniversityComponent },
  ];
