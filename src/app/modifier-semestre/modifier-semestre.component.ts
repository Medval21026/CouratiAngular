import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SemestreService } from '../services/semestre.service';

@Component({
  selector: 'app-modifier-semestre',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modifier-semestre.component.html',
  styleUrls: ['./modifier-semestre.component.css']
})
export class ModifierSemestreComponent {
  @Input() semestre: any;
  @Output() semestreUpdated = new EventEmitter<void>();

  constructor(private semestreService: SemestreService) {}

  async onUpdate() {
    try {
      await this.semestreService.updateSemestre(this.semestre.id, this.semestre);
      this.semestreUpdated.emit();
    } catch (error) {
      console.error('Erreur lors de la modification du semestre:', error);
      alert('Erreur lors de la modification du semestre');
    }
  }
}
