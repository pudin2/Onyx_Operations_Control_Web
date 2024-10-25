import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenService } from '../../Servicios/ot.service';
import { CabSubT } from '../../Models/SubTModel';
import { DetSubT } from '../../Models/DetSubTModel';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Operario } from '../../Models/OperarioModel';

@Component({
  selector: 'app-noti',
  templateUrl: './Noti.component.html',
  styleUrls: ['./Noti.component.css']
})
export class NotiComponent implements OnInit {
  subtarea: CabSubT | null = null;
  materiales: DetSubT[] = [];
  isLoading: boolean = false;
  operarios: Operario[] = []; // Lista de operarios disponibles
  operariosSeleccionados: { Encargado: string, Horas: number, Real: string }[] = []; // Lista de operarios adicionales seleccionados
  mostrarTablaOperarios: boolean = false; // Controla la visibilidad de la tabla de operarios

  tabs = [
    { label: 'Materiales' },
    { label: 'Mano de Obra' },
    { label: 'Anexos' }
  ];

  activeTabIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private ordenService: OrdenService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('Id');
    if (id) {
      const subtareaId = parseInt(id, 10);
      this.loadSubtareaAndMateriales(subtareaId);
    }
  }

  // Cargar subtarea y materiales en paralelo, incluyendo el operario asignado originalmente
  loadSubtareaAndMateriales(id: number): void {
    this.isLoading = true;

    forkJoin({
      subtarea: this.ordenService.getSubTareaById(id),
      materiales: this.ordenService.getDetSubTBySubTareaId(id)
    }).subscribe({
      next: (results) => {
        this.subtarea = results.subtarea;
        this.materiales = results.materiales;

        // Agregar el operario asignado inicialmente a la subtarea como el primer operario en la tabla
        if (this.subtarea?.AsignadaA) {
          this.operariosSeleccionados.push({
            Encargado: this.subtarea.AsignadaA, // Nombre del operario asignado
            Horas: this.subtarea.Horas || 0, // Horas asignadas originalmente
            Real: '' // Campo real editable
          });
        }
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Cargar operarios disponibles desde el servicio
  cargarOperarios(): void {
    this.ordenService.getOperarios().subscribe({
      next: (data: Operario[]) => {
        this.operarios = data;
        this.mostrarTablaOperarios = true; // Mostrar tabla al cargar operarios
      },
      error: (error) => {
        console.error('Error al cargar operarios:', error);
      }
    });
  }

  // Método para seleccionar un nuevo operario y agregarlo a la lista de mano de obra adicional
  seleccionarOperario(operario: Operario): void {
    const operarioExistente = this.operariosSeleccionados.find(o => o.Encargado === operario.NombreMostrar);

    if (!operarioExistente) {
      this.operariosSeleccionados.push({
        Encargado: operario.NombreMostrar, // Nombre del operario
        Horas: 0, // Inicializar horas a 0 para mano de obra adicional
        Real: '' // Campo real editable
      });
      this.mostrarTablaOperarios = false; // Ocultar tabla después de seleccionar
    }
  }

  // Control de pestañas
  selectTab(index: number): void {
    this.activeTabIndex = index;
  }

  // Regresar a la página anterior
  goBack(): void {
    this.location.back();
  }

  // Eliminar guion en la descripción
  getDescripcionSinGuion(descripcion: string | undefined): string {
    if (!descripcion) {
      return '';
    }
    return descripcion.trim().startsWith('-') ? descripcion.trim().substring(1).trim() : descripcion.trim();
  }
}
