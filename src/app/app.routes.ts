import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UniversityComponent } from './university/university.component'; // Importation du composant
import { SubjectComponent } from './subject/subject.component';
import { CollegeComponent } from './college/college.component';
import { InstitutComponent } from './institut/institut.component';
import { SpecialisationComponent } from './specialisation/specialisation.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, data: { showNavbar: false } },  // Pas de navbar sur la page de login
  { path: 'university', component: UniversityComponent, data: { showNavbar: true } },
  { path: 'subject', component: SubjectComponent, data: { showNavbar: true } },
  { path: 'college', component: CollegeComponent, data: { showNavbar: true } },
  { path: 'institut', component: InstitutComponent, data: { showNavbar: true } },
  { path: 'specialisation', component: SpecialisationComponent, data: { showNavbar: true } },
  ];
