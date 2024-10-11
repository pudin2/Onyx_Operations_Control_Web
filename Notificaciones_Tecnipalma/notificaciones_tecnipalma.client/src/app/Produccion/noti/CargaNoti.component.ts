import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Location } from '@angular/common';
import { OrdenService } from '../../Servicios/ot.service';
import { VwOrdenTrabajo } from '../../Models/OtModel'
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { CabSubT } from '../../Models/SubTModel';

@Component({
  selector: 'app-CargaNoti',
  templateUrl: './CargaNoti.component.html',
  styleUrls: ['./CargaNoti.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, FormsModule, CommonModule],
})
export class NotiComponent {
  searchTerm: string = '';
  //data: any[] = [];
  //filteredData: any[] = [];
  orden: VwOrdenTrabajo | null = null; // Variable para almacenar la orden
  subtRegistros: CabSubT[] = []; // Variable para almacenar los registros de Cab_SubT
  errorMessage: string = '';
  noData: boolean = false;

  constructor(private location: Location, private ordenService: OrdenService) { }

  buscarOrden(): void {
    const numeroOrden = parseInt(this.searchTerm, 10);

    // Limpiar los datos de la orden anterior antes de continuar
    this.orden = null;
    this.noData = false;
    this.subtRegistros = []; // Limpiar las subtareas

    if (isNaN(numeroOrden)) {
      this.errorMessage = 'Ingresa un número de orden válido.';
      this.noData = true;
      return;
    }

    this.ordenService.getOrdenTrabajo(numeroOrden).subscribe({
      next: (data) => {
        this.orden = data;
        this.errorMessage = ''; // Limpiar el mensaje de error si se obtiene la orden correctamente
        this.noData = false; // Hay datos, así que no hay error
        this.getSubTByNumeroOrden(numeroOrden);
      },
      error: (err) => {
        console.error('Error al obtener la orden', err);
        this.errorMessage = 'No se encontró la orden con el número proporcionado.';
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

  getAlcanceIntroduccion(): string {
    return this.orden?.OT_Alcance?.split(':')[0] || '';
  }

  getAlcanceItems(): string[] {
    // Dividimos la parte después de los dos puntos (:) en elementos separados por el guion seguido de un espacio (" - ")
    const items = this.orden?.OT_Alcance?.split(':')[1]?.split(/\s*-\s*/g) || [];
    // Limpiamos cada elemento para eliminar posibles espacios adicionales
    return items.map(item => item.trim()).filter(item => item.length > 0);
  }



  onInputChange(): void {
   
    this.errorMessage = '';  // Limpia el mensaje de error cuando el usuario empieza a escribir de nuevo
    this.orden = null;
    this.noData = false;
    this.subtRegistros = []; // Limpia las subtareas

  }

  goBack() {
    this.location.back(); // Navega a la página anterior
  }

  limpiarInput(): void {
    this.searchTerm = ''; // Limpia el valor del input
    this.errorMessage = ''; // Limpia cualquier mensaje de error
    this.orden = null; // Limpia los datos de la orden si estaban cargados
    this.noData = false; // Resetea el estado de 'noData'
    this.subtRegistros = []; // Limpia las subtareas
  }


  notificar(subt: any): void {
    // Aquí puedes añadir la lógica para manejar la notificación
    // Por ejemplo, podrías mostrar un mensaje en consola o llamar a un servicio
    console.log(`Notificando a la tarea: ${subt.Descripcion}`);
    // Lógica adicional para enviar la notificación puede ir aquí
  }

}
