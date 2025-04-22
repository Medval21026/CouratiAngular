import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { TpService } from '../services/tp.service';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'ajouter-tp',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './ajouter-tp.component.html',
  styleUrls: ['./ajouter-tp.component.css'],
})
export class AjouterTpComponent implements OnInit {
  tp = { title: '', content: null as File | null, year: null as number | null, subjectId: null as number | null };
  subjects: any[] = [];

  @Output() tpAdded = new EventEmitter<any>();

  constructor(
    private tpService: TpService,
    private subjectsService: SubjectService
  ) {}

  ngOnInit() {
    this.subjectsService.getAllSubjects().then(data => {
      this.subjects = data;
    }).catch(error => console.error('Erreur lors du chargement des matières:', error));
  }

  async onSubmit() {
    if (this.tp.title.trim() !== '' && this.tp.subjectId && this.tp.content && this.tp.year) {
      try {
        const newTp = {
          title: this.tp.title,
          subjectId: this.tp.subjectId,
          year: this.tp.year,
          content: this.tp.content
        };

        const addedTp = await this.tpService.createTp(newTp);

        const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        if (closeButton) closeButton.click();

        this.tpAdded.emit(addedTp);

        this.tp = { title: '', content: null, year: null, subjectId: null };
      } catch (error) {
        console.error("Erreur lors de l'ajout du TP:", error);
        alert("Erreur lors de l'ajout du TP. Veuillez réessayer.");
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.tp.content = file;
    } else {
      alert('Veuillez sélectionner un fichier.');
    }
  }
}
