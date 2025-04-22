import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TdService } from '../services/td.service';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'modifier-td',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './modifier-td.component.html',
  styleUrls: ['./modifier-td.component.css']
})
export class ModifierTdComponent implements OnInit {
  @Input() td: any;  // TD à modifier
  @Output() tdUpdated = new EventEmitter<void>();

  subjects: any[] = [];

  constructor(
    private tdService: TdService,
    private subjectsService: SubjectService
  ) {}

  ngOnInit() {
    this.subjectsService.getAllSubjects().then(data => {
      this.subjects = data;
    }).catch(error => console.error('Erreur lors du chargement des matières', error));
  }

  async onUpdate() {
    try {
      await this.tdService.updateTd(this.td.id, {
        title: this.td.title,
        subjectId: this.td.subjectId,
        year: this.td.year,
        content: this.td.content
      });
      this.tdUpdated.emit();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du TD', error);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.td.content = file;
    }
  }
}
