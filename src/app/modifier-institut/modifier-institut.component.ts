import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstitutService } from '../services/institut.service';
import { FormsModule } from '@angular/forms';

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
    await this.institutService.updateInstitute(this.institute.id, this.institute);
    this.instituteUpdated.emit();
  }
}
