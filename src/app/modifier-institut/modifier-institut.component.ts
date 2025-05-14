import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstitutService } from '../services/institut.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modifier-institut',
  imports:[FormsModule],
  templateUrl: './modifier-institut.component.html',
  styleUrls: ['./modifier-institut.component.css']
})
export class ModifierInstitutComponent {
  @Input() institute: any;
  @Output() instituteUpdated = new EventEmitter<void>();

  constructor(private institutService: InstitutService) {}

 async onUpdate() {
  try {
    await this.institutService.updateInstitute(this.institute.id, this.institute);
    this.instituteUpdated.emit();

    // ✅ Message de succès
    Swal.fire({
      title: 'Mise à jour réussie',
      text: 'L’institut a été mis à jour avec succès.',
      icon: 'success',
      confirmButtonText: 'OK',
      width: '350px',
      padding: '1.5em',
      customClass: {
        title: 'swal-title-custom',
        popup: 'swal-popup-custom',
        confirmButton: 'swal-confirm-button'
      },
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de l’institut:', error);

    // ❌ Message d’erreur
    Swal.fire({
      title: 'Erreur',
      text: 'Une erreur est survenue lors de la mise à jour de l’institut.',
      icon: 'error',
      confirmButtonText: 'OK',
      width: '350px',
      padding: '1.5em',
      customClass: {
        title: 'swal-title-custom',
        popup: 'swal-popup-custom',
        confirmButton: 'swal-confirm-button'
      },
      buttonsStyling: false
    });
  }
}

}
