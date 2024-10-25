import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenService } from '../../Servicios/ot.service';
import { CabSubT } from '../../Models/SubTModel';
import { DetSubT } from '../../Models/DetSubTModel';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs'; // Importar forkJoin para ejecutar solicitudes en paralelo
import { Operario } from '../../Models/OperarioModel'; // Modelo de operario

@Component({
  selector: 'app-noti',
  templateUrl: './Noti.component.html',
  styleUrls: ['./Noti.component.css']
})
export class NotiComponent implements OnInit {
  subtarea: CabSubT | null = null; // Variable para almacenar la subtarea seleccionada
  materiales: DetSubT[] = []; // Variable para almacenar los materiales (detalles de subtarea)
  isLoading: boolean = false; // Variable para controlar la pantalla de carga
  operarios: Operario[] = []; // Lista de operarios
  selectedOperario: Operario | null = null; // Operario seleccionado



  tabs = [
    { label: 'Materiales' },
    { label: 'Mano de Obra' },
    { label: 'Anexos' }
  ];

  activeTabIndex: number = 0; // Control which tab is active

  constructor(
    private route: ActivatedRoute,
    private ordenService: OrdenService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('Id'); // Obtener el ID de la subtarea de la URL
    console.log('Subtarea ID:', id); // Verifica si el ID es correcto

    if (id) {
      const subtareaId = parseInt(id, 10);
      this.loadSubtareaAndMateriales(subtareaId); // Cargar subtarea y materiales en paralelo
    }
  }

  // Cargar subtarea y materiales en paralelo y manejar la pantalla de carga de manera adecuada
  loadSubtareaAndMateriales(id: number): void {
    this.isLoading = true; // Activar la pantalla de carga

    // Ejecutar las dos solicitudes en paralelo
    forkJoin({
      subtarea: this.ordenService.getSubTareaById(id),
      materiales: this.ordenService.getDetSubTBySubTareaId(id)
    }).subscribe({
      next: (results) => {
        this.subtarea = results.subtarea; // Asignar la subtarea recibida
        this.materiales = results.materiales; // Asignar los materiales recibidos
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
      },
      complete: () => {
        this.isLoading = false; // Desactivar la pantalla de carga cuando ambas solicitudes se completen
      }
    });
  }

  cargarOperarios() {
    this.ordenService.getOperarios().subscribe((data: Operario[]) => {
      this.operarios = data;
    }, error => {
      console.error('Error al cargar operarios:', error);
    });
  }

  // Método para seleccionar un operario
  seleccionarOperario(operario: Operario) {
    this.selectedOperario = operario;
    console.log('Operario seleccionado:', operario);
  }


  // Control de pestañas
  selectTab(index: number): void {
    this.activeTabIndex = index;
  }

  goBack() {
    this.location.back(); // Regresa a la página anterior
  }

  getDescripcionSinGuion(descripcion: string | undefined): string {
    if (!descripcion) {
      return ''; // Si la descripción está vacía, retorna una cadena vacía
    }
    // Elimina un guion si está al inicio (usa trim para evitar espacios)
    return descripcion.trim().startsWith('-') ? descripcion.trim().substring(1).trim() : descripcion.trim();
  }
}
