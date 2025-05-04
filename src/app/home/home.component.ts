import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { InstitutService } from '../services/institut.service';
import { LessonsService } from '../services/lessons.service';
import { SubjectService } from '../services/subject.service';
import { SpecialisationService } from '../services/specialisation.service';
import { TpService } from '../services/tp.service';
import { TdService } from '../services/td.service';
import { DevoirService } from '../services/devoire.service';
import { ExamenService } from '../services/examen.service';
import { CollegeService } from '../services/college.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports:[CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalUniversities: number = 0;
  totalInstituts: number = 0;
  totalLessons: number = 0;
  totalSubjects: number = 0;
  totalSpecialisations: number = 0;
  totalTPs: number = 0;
  totalTDs: number = 0;
  totalDevoirs: number = 0;
  totalExamens: number = 0;
  totalColleges: number = 0;
  collegeData: any[] = [];


  constructor(
    private universityService: UniversityService,
    private institutService: InstitutService,
    private lessonService: LessonsService,
    private subjectService: SubjectService,
    private specialisation: SpecialisationService,
    private tpService: TpService,
    private tdService: TdService,
    private devoirService: DevoirService,
    private examenService: ExamenService,
    private collegeService: CollegeService
  ) {}

  ngOnInit(): void {
    this.universityService.getTotalUniversities()
      .then(total => {
        this.totalUniversities = total;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du total des universités:', error);
      });

    this.institutService.getTotalInstitutes()
      .then(total => {
        this.totalInstituts = total;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du total des instituts:', error);
      });
     
      this.specialisation.getTotalSpecialisations()
      .then(total => {
        this.totalSpecialisations = total;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du total des leçons:', error);
      });
      this.subjectService.getTotalSubjects()
      .then(total => {
        this.totalSubjects = total;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du total des sujets:', error);
      });

      this.lessonService.getTotalLessons()
      .then(total => {
        this.totalLessons = total;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du total des sujets:', error);
      });

      this.tpService.getTotalTPs()
      .then(total => {
        this.totalTPs = total;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du total des TP:', error);
      });
      
      this.tdService.getTotalTDs()
      .then(total => {
        this.totalTDs = total;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du total des TD:', error);
      });

      this.devoirService.getTotalDevoirs()
      .then(total => {
        this.totalDevoirs = total;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du total des devoirs:', error);
      });

      this.examenService.getTotalExamens()
      .then(total => {
        this.totalExamens = total;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du total des examens:', error);
      });
      this.collegeService.getTotalColleges()
      .then(total => {
        this.totalColleges = total;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du total des collèges:', error);
      });
      this.collegeService.getCountByUniversity()
      .then(data => {
        this.collegeData = data;
        console.log('Données récupérées:', this.collegeData);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }
}
