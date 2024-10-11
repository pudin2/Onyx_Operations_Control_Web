import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Location } from '@angular/common';
import { OrdenService } from '../../Servicios/ot.service';
import { VwOrdenTrabajo } from '../../Models/OtModel'
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { CabSubT } from '../../Models/SubTModel';


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
  subtRegistros: CabSubT[] = []; // Variable para almacenar los registros de Cab_SubT

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
        this.orden = data
        this.getSubTByNumeroOrden(numeroOrden);
      },
      error: (err) => {
        console.error('Error al obtener la orden', err);
        alert('No se encontró la orden con el número proporcionado.');
        this.orden = null; // Resetea la variable si no se encuentra la orden
        this.subtRegistros = []; // Resetea los registros si no hay orden
      },
    });
  }

  getSubTByNumeroOrden(numeroOrden: number) {
    this.ordenService.getSubTByNumeroOrden(numeroOrden).subscribe({
      next: (data) => {
        this.subtRegistros = data;
      },
      error: (err) => {
        console.error('Error al obtener los registros de subt', err);
        alert('No se encontraron registros asociados a esta orden.');
        this.subtRegistros = []; // Resetea los registros si no se encuentran
      },
    });
  }

  goBack() {
    this.location.back(); // Navega a la página anterior
  }
 
}
