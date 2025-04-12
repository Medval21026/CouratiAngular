import { Component, Inject, PLATFORM_ID, OnInit, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { SubjectService } from '../services/subject.service';
import { AjouterSubjectComponent } from '../ajouter-subject/ajouter-subject.component';
import { ModifierSubjectComponent } from '../modifier-subject/modifier-subject.component';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [AjouterSubjectComponent, ModifierSubjectComponent, CommonModule],
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects: any[] = [];
  selectedSubject: any = null;

  constructor(
    private subjectService: SubjectService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getAllSubjects().then((data: any[]) => {
      this.subjects = data;
    }).catch(error => console.error('Erreur lors du chargement des matières:', error));
  }

  openModal(subject: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedSubject = { ...subject };
      setTimeout(() => {
        const modalElement = document.getElementById('modifySubjectModal');
        if (modalElement) {
          import('bootstrap').then((bootstrap) => {
            const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
            modal.show();
          });
        }
      }, 0);
    }
  }

  onSubjectUpdated() {
    this.loadSubjects();
    this.cdr.detectChanges();
    const modalElement = document.getElementById('modifySubjectModal');
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    if (modalElement) {
      import('bootstrap').then((bootstrap) => {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      });
    }
  }

  deleteSubject(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette matière ?')) {
      this.subjectService.deleteSubject(id).then(() => {
        this.subjects = this.subjects.filter(s => s.id !== id);
      }).catch(error => console.error('Erreur lors de la suppression:', error));
    }
  }

  subjectAdded(newSubject: any) {
    this.subjects = [...this.subjects, newSubject];
    this.loadSubjects();
  }
}
