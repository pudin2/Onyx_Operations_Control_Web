import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Location } from '@angular/common';
import { OrdenService } from '../../Servicios/ot.service';
import { VwOrdenTrabajo } from '../../Models/OtModel'
import { CommonModule } from '@angular/common'; // Importa CommonModule


@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrl: './noti.component.css',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, FormsModule, CommonModule],
})
export class NotiComponent implements OnInit {
  searchTerm: string = '';
  //data: any[] = [];
  //filteredData: any[] = [];
  orden: VwOrdenTrabajo | null = null; // Variable para almacenar la orden

  constructor(private location: Location, private ordenService: OrdenService) { }

  ngOnInit() {
    // Aquí podrías obtener un número de orden fijo o de otra manera (por ejemplo, de la URL)
    //const numeroOrden = 1; // Número de orden para la búsqueda (puedes cambiarlo o hacerlo dinámico)
    //this.getOrden(numeroOrden);
  }

  buscarOrden() {
    const numeroOrden = parseInt(this.searchTerm, 10);
    if (isNaN(numeroOrden)) {
      alert('Por favor, ingresa un número de orden válido.');
      return;
    }

    this.ordenService.getOrdenTrabajo(numeroOrden).subscribe({
      next: (data) => {
        this.orden = data;
      },
      error: (err) => {
        console.error('Error al obtener la orden', err);
        alert('No se encontró la orden con el número proporcionado.');
        this.orden = null; // Resetea la variable si no se encuentra la orden
      },
    });
  }

  goBack() {
    this.location.back(); // Navega a la página anterior
  }
 
}
