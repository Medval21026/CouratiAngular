import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UniversityComponent } from './university/university.component'; // Importation du composant
import { SubjectComponent } from './subject/subject.component';
import { CollegeComponent } from './college/college.component';
import { InstitutComponent } from './institut/institut.component';
import { SpecialisationComponent } from './specialisation/specialisation.component';
import { authGuard } from './auth.guard';
import { SemestreComponent } from './semestre/semestre.component';
import { LessonsComponent } from './lessons/lessons.component';
import { ExamenComponent } from './examen/examen.component';
import { AcademicStageComponent } from './academic-stage/academic-stage.component';
import { HomeComponent } from './home/home.component';
import { DevoirComponent } from './devoire/devoire.component';
import { TdComponent } from './td/td.component';
import { TpComponent } from './tp/tp.component';
export const routes: Routes = [
  { path: '', component: LoginComponent, data: { showNavbar: false } },
  { path: 'university', component: UniversityComponent,  data: { showNavbar: true } },
  { path: 'subject', component: SubjectComponent,  data: { showNavbar: true } },
  { path: 'examen', component: ExamenComponent,  data: { showNavbar: true } },
  { path: 'college', component: CollegeComponent,  data: { showNavbar: true } },
  { path: 'lesson', component: LessonsComponent,  data: { showNavbar: true } },
  { path: 'institut', component: InstitutComponent,  data: { showNavbar: true } },
  { path: 'semestre', component: SemestreComponent,  data: { showNavbar: true } },
  { path: 'academic', component: AcademicStageComponent,  data: { showNavbar: true } },
  { path: 'home', component: HomeComponent, canActivate: [authGuard], data: { showNavbar: true } },
  { path: 'specialisation', component: SpecialisationComponent,  data: { showNavbar: true } },
  { path: 'devoire', component: DevoirComponent,  data: { showNavbar: true } },
  { path: 'td', component: TdComponent,  data: { showNavbar: true } },
  { path: 'tp', component: TpComponent,  data: { showNavbar: true } },

];





