import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Location } from '@angular/common';
import { OrdenService } from '../../Servicios/ot.service';
import { VwOrdenTrabajo } from '../../Models/OtModel';
import { CommonModule } from '@angular/common';
import { CabSubT } from '../../Models/SubTModel';
import { Router } from '@angular/router';
import { SearchService } from '../../Servicios/state.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-carganoti',
  templateUrl: './Adiciones.component.html',
  styleUrls: ['./Adiciones.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, FormsModule, CommonModule, MatMenuModule],
})
export class AdicionesComponent {
  searchTerm: string = '';
  orden: VwOrdenTrabajo | null = null;
  subtRegistros: CabSubT[] = [];
  errorMessage: string = '';

  noData: boolean = false;
  isLoading: boolean = false;
  successSubMessage = false;
  errorSubMessage: string = '';

  constructor(
    private location: Location,
    private ordenService: OrdenService,
    private router: Router,
    private searchService: SearchService
  ) {

    this.searchTerm = this.searchService.getSearchQuery();
    const storedOrderData = this.searchService.getOrderData();
    if (storedOrderData) {
      this.orden = storedOrderData;
      this.getSubTByNumeroOrden(storedOrderData.NumOrden);
    }
  }

  buscarOrden(): void {
    const numeroOrden = parseInt(this.searchTerm, 10);

    this.isLoading = true;
    this.orden = null;
    this.noData = false;
    this.subtRegistros = [];

    if (isNaN(numeroOrden)) {
      this.errorMessage = 'Ingresa un número de orden válido.';
      this.noData = true;
      this.isLoading = false;
      return;
    }

    this.searchService.setSearchQuery(this.searchTerm);

    this.isLoading = true;

    setTimeout(() => {
      this.ordenService.getOrdenTrabajo(numeroOrden).subscribe({
        next: (data) => {
          this.orden = data;
          this.searchService.setOrderData(data);
          this.errorMessage = '';
          this.noData = false;

          if (this.orden.EstadoOT === 'C') {
            this.errorSubMessage = 'La orden de trabajo está cerrada.';

          } else {
            this.errorSubMessage = '';
          }

          this.getSubTByNumeroOrden(numeroOrden);
        },
        error: (err) => {
          console.error('Error al obtener la orden', err);
          this.errorMessage = 'No se encontró la orden con el número proporcionado.';
          this.orden = null;
          this.subtRegistros = [];
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }, 1000);
  }

  getSubTByNumeroOrden(numeroOrden: number) {
    this.isLoading = true;
    this.ordenService.getSubTByNumeroOrden(numeroOrden).subscribe({
      next: (data) => {
        this.subtRegistros = data.map(subt => ({ ...subt, isClosed: false }));
        this.subtRegistros = data;
      },
      error: (err) => {

        this.errorMessage = 'No se encontraron subtareas programadas a esta orden.';
        console.error('Error al obtener los registros de subt', err);
        this.subtRegistros = [];
      },
      complete: () => {
        this.isLoading = false;

      }
    });
  }

  getAlcanceIntroduccion(): string {
    return this.orden?.OT_Alcance?.split(':')[0] || '';
  }

  getAlcanceItems(): string[] {

    const items = this.orden?.OT_Alcance?.split(':')[1]?.split(/\s*-\s*/g) || [];

    return items.map(item => item.trim()).filter(item => item.length > 0);
  }

  onInputChange(): void {
    this.errorMessage = '';
    this.orden = null;
    this.noData = false;
    this.subtRegistros = [];
  }

  goBack() {
    this.searchService.setSearchQuery(this.searchTerm);
    this.location.back();
    this.searchService.clearSearchQuery();
  }

  limpiarInput(): void {
    this.searchService.clearSearchQuery();
    this.searchTerm = '';
    this.errorMessage = '';
    this.orden = null;
    this.noData = false;
    this.subtRegistros = [];
  }

  notificar(subt: CabSubT): void {
    if (this.orden) {
      this.router.navigate(['/produccion/noti', subt.Id], { queryParams: { numOrden: this.orden.NumOrden } });
      console.log(`Notificando a la tarea: ${subt.Descripcion} con número de orden: ${this.orden.NumOrden}`);
    }
  }

  cerrarSubtarea(subtareaId: number): void {

    this.ordenService.cerrarSubtarea(subtareaId).subscribe({
      next: (response) => {

        const subtarea = this.subtRegistros.find(subt => subt.Id === subtareaId);
        if (subtarea) {
          subtarea.Estado = 'C';
        }

        this.successSubMessage = true;
        setTimeout(() => this.successSubMessage = false, 5000);

        this.buscarOrden();
      },
      error: (err) => {

        this.successSubMessage = true;
        setTimeout(() => this.successSubMessage = false, 5000);

        console.error('Error al cerrar la subtarea:', err);

      }
    });
  }

}
