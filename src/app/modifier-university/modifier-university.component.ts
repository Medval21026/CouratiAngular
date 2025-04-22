import { Component, Input, Output, EventEmitter} from '@angular/core';
import { UniversityService } from '../services/university.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-university',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-university.component.html',
  styleUrls: ['./modifier-university.component.css']
})
export class ModifierUniversityComponent {
  @Input() university: any = null;
  @Output() universityUpdated = new EventEmitter<void>();

  constructor(private universityService: UniversityService) {}

  updateUniversity() {
    if (this.university) {
      this.universityService.updateUniversity(this.university.id, { name_fr: this.university.name_fr , name_ar: this.university.name_ar })
        .then(() => {
          this.universityUpdated.emit();
        })
        .catch(error => console.error(error));
    }
  }
}
