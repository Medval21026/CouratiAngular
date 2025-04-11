import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showLayout = true;  
  showCollege = false;
  showSubjects = false;
  activeElement: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private route:Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute.firstChild?.snapshot.data['showNavbar'])
    ).subscribe((showNavbar: boolean | undefined) => {
      this.showLayout = showNavbar !== false; 
    });
    if (typeof window !== 'undefined' && window.localStorage) {
      // Récupère l'élément actif depuis le localStorage si disponible
      this.activeElement = localStorage.getItem('activeElement') || 'university'; // Valeur par défaut 'university'
    } else {
      // Si localStorage n'est pas disponible (par exemple en SSR), définir une valeur par défaut
      this.activeElement = 'university';
    }
  }
  toggleCollege(event: Event) {
    event.preventDefault(); // Empêche la navigation immédiate
    this.showCollege = !this.showCollege; // Alterne l'affichage
  }
  toggleSubjects(event: Event) {
    event.preventDefault(); // Empêche la navigation immédiate
    this.showSubjects = !this.showSubjects; // Alterne l'affichage de Subject-related items
  }
  setActive(event: Event, element: string) {
    event.preventDefault();
    this.activeElement = element; // Définit l'élément actif

    // Enregistre l'élément actif dans le localStorage pour le garder après un rafraîchissement
    localStorage.setItem('activeElement', element);
  }

  isActive(element: string): boolean {
    return this.activeElement === element; // Vérifie si l'élément est actif
  }
}
