import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UniversityComponent } from './university/university.component'; // Importation du composant
import { SubjectComponent } from './subject/subject.component';
import { CollegeComponent } from './college/college.component';
import { InstitutComponent } from './institut/institut.component';
import { SpecialisationComponent } from './specialisation/specialisation.component';
import { authGuard } from './auth.guard';
import { SemestreComponent } from './semestre/semestre.component';
export const routes: Routes = [
  { path: '', component: LoginComponent, data: { showNavbar: false } },
  { path: 'university', component: UniversityComponent, canActivate: [authGuard], data: { showNavbar: true } },
  { path: 'subject', component: SubjectComponent, canActivate: [authGuard], data: { showNavbar: true } },
  { path: 'college', component: CollegeComponent, canActivate: [authGuard], data: { showNavbar: true } },
  { path: 'institut', component: InstitutComponent, canActivate: [authGuard], data: { showNavbar: true } },
  { path: 'semestre', component: SemestreComponent, canActivate: [authGuard], data: { showNavbar: true } },
  { path: 'specialisation', component: SpecialisationComponent, canActivate: [authGuard], data: { showNavbar: true } },
];





