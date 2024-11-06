import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Location } from '@angular/common';
import { OrdenService } from '../../Servicios/ot.service';
import { VwOrdenTrabajo } from '../../Models/OtModel';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { CabSubT } from '../../Models/SubTModel';
import { Router } from '@angular/router';
import { SearchService } from '../../Servicios/state.service'; // Importa tu servicio de búsqueda

@Component({
  selector: 'app-carganoti',
  templateUrl: './CargaNoti.component.html',
  styleUrls: ['./CargaNoti.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, FormsModule, CommonModule],
})
export class CargaNotiComponent {
  searchTerm: string = '';
  orden: VwOrdenTrabajo | null = null; // Variable para almacenar la orden
  subtRegistros: CabSubT[] = []; // Variable para almacenar los registros de Cab_SubT
  errorMessage: string = '';
  noData: boolean = false;
  isLoading: boolean = false; // Variable para controlar la carga

  constructor(
    private location: Location,
    private ordenService: OrdenService,
    private router: Router,
    private searchService: SearchService // Inyecta el servicio de búsqueda
  ) {
    // Recuperar el valor de búsqueda almacenado
    this.searchTerm = this.searchService.getSearchQuery();
  }

  buscarOrden(): void {
    const numeroOrden = parseInt(this.searchTerm, 10);

    this.isLoading = true;
    this.orden = null; // Limpiar los datos de la orden anterior antes de continuar
    this.noData = false;
    this.subtRegistros = []; // Limpiar las subtareas

    if (isNaN(numeroOrden)) {
      this.errorMessage = 'Ingresa un número de orden válido.';
      this.noData = true;
      this.isLoading = false;
      return;
    }

    this.searchService.setSearchQuery(this.searchTerm); // Guarda la búsqueda actual

    this.isLoading = true; // Activar el GIF de carga

    // Temporizador de 3 segundos antes de realizar la búsqueda
    setTimeout(() => {
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
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false; // Desactivar la pantalla de carga después de completar la búsqueda
        }
      });
    }, 1000); // Mantener el GIF durante 3 segundos antes de continuar
  }

  getSubTByNumeroOrden(numeroOrden: number) {
    this.isLoading = true; // Activar la pantalla de carga
    this.ordenService.getSubTByNumeroOrden(numeroOrden).subscribe({
      next: (data) => {
        this.subtRegistros = data;
      },
      error: (err) => {

        this.errorMessage = 'No se encontraron registros asociados a esta orden.';
        console.error('Error al obtener los registros de subt', err);
        this.subtRegistros = []; // Resetea los registros si no se encuentran
      },
      complete: () => {
        this.isLoading = false; // Desactivar la pantalla de carga

      }
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
    this.searchService.setSearchQuery(this.searchTerm); // Guarda la búsqueda actual antes de regresar
    this.location.back(); // Regresa a la página anterior
  }

  limpiarInput(): void {
    this.searchService.clearSearchQuery(); // Limpia el valor almacenado en el servicio
    this.searchTerm = ''; // Limpia el valor del input
    this.errorMessage = ''; // Limpia cualquier mensaje de error
    this.orden = null; // Limpia los datos de la orden si estaban cargados
    this.noData = false; // Resetea el estado de 'noData'
    this.subtRegistros = []; // Limpia las subtareas
  }

  notificar(subt: CabSubT): void {
    if (this.orden) { // Asegúrate de que `orden` tenga un valor válido
      this.router.navigate(['/produccion/noti', subt.Id], { queryParams: { numOrden: this.orden.NumOrden } });
      console.log(`Notificando a la tarea: ${subt.Descripcion} con número de orden: ${this.orden.NumOrden}`);
    }
  }
}

