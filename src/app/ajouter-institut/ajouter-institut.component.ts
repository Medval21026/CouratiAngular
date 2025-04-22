import { Component, Output, EventEmitter } from '@angular/core';
import { InstitutService } from '../services/institut.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajouter-institut',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ajouter-institut.component.html',
  styleUrls: ['./ajouter-institut.component.css']
})
export class AjouterInstitutComponent {
  institute = { name_fr: '',name_ar: '' };
  @Output() instituteAdded = new EventEmitter<any>();

  constructor(private institutService: InstitutService) {}
  async onSubmit() {
    if (this.institute.name_fr.trim() !== '' && this.institute.name_ar) {
      try {
        const newInstitute = await this.institutService.createInstitute(this.institute);
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        if (closeButton) {
          (closeButton as HTMLButtonElement).click();
        }
        this.instituteAdded.emit(newInstitute);
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'ajout de l\'institut');
      }
    }
  }
}
