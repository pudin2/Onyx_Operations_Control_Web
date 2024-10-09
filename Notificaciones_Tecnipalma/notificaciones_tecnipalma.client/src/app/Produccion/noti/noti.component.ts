import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrls: ['./noti.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, FormsModule, CommonModule],
})
export class NotiComponent {

  searchTerm: string = '';
  errorMessage: string = '';

  onSearch(): void {
    // Validar si el valor ingresado contiene solo números
    const regex = /^[0-9]*$/;

    if (regex.test(this.searchTerm)) {
      this.errorMessage = ''; // Limpiar el mensaje de error si todo es válido
      console.log('Valor válido:', this.searchTerm);
      // Aquí puedes agregar la lógica adicional que quieras ejecutar con el valor válido
    } else {
      this.errorMessage = 'Orden de trabajo, no existe';
    }
  }
  constructor(private location: Location) { }

  goBack() {
    this.location.back(); // Navega a la página anterior
  }


}
