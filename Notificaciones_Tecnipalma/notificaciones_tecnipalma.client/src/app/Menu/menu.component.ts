import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router) { }

  logout(): void {
    // Aquí puedes limpiar la información del usuario y redirigirlo al login
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']);
  }
}


