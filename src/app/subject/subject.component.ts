import { Component, Inject, PLATFORM_ID, OnInit, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { SubjectService } from '../services/subject.service';
import { AjouterSubjectComponent } from '../ajouter-subject/ajouter-subject.component';
import { ModifierSubjectComponent } from '../modifier-subject/modifier-subject.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [AjouterSubjectComponent, ModifierSubjectComponent, CommonModule,FormsModule],
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects: any[] = [];
  filteredSubjects: any[] = [];
  selectedSubject: any = null;
  searchTerm: string = '';

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
      this.filteredSubjects = [...this.subjects]; // 🔁 initialise la liste filtrée
    }).catch(error => console.error('Erreur lors du chargement des matières:', error));
  }

  filterSubjects() {
    const term = this.searchTerm.toLowerCase();
    this.filteredSubjects = this.subjects.filter(subject =>
      subject.name?.toLowerCase().includes(term)
    );
  }

  subjectAdded(newSubject: any) {
    this.subjects = [...this.subjects, newSubject];
    this.filterSubjects(); // 🔁 re-filtrer avec le nouveau
  }

  deleteSubject(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette matière ?')) {
      this.subjectService.deleteSubject(id).then(() => {
        this.subjects = this.subjects.filter(s => s.id !== id);
        this.filterSubjects(); // 🧼 mise à jour
      }).catch(error => console.error('Erreur lors de la suppression:', error));
    }
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
}
