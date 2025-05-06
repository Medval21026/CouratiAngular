import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AcademicStageService } from '../services/academic-stage.service';

@Component({
  selector: 'app-ajouter-academic-stage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ajouter-academic-stage.component.html',
  styleUrls: ['./ajouter-academic-stage.component.css']
})
export class AjouterAcademicStageComponent implements OnInit {
  academicStage = { name: '' };

  @Output() academicStageAdded = new EventEmitter<any>();

  constructor(private academicStageService: AcademicStageService) {}

  ngOnInit() {}

  async onSubmit() {
    if (this.academicStage.name.trim() !== '') {
      try {
        const nouveauStage = await this.academicStageService.create(this.academicStage);
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        if (closeButton) closeButton.click();
        this.academicStageAdded.emit(nouveauStage);
        this.academicStage = { name: '' };
      } catch (error) {
        console.error("Erreur lors de l'ajout du stage académique:", error);
        alert("Erreur lors de l'ajout. Veuillez réessayer.");
      }
    } else {
      alert('Veuillez remplir le nom du stage.');
    }
  }
}
