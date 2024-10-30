import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput') fileInput!: ElementRef;
  anexos: string[] = [];  // Array para almacenar las URLs de los anexos
  subtarea: CabSubT | null = null;
  materiales: DetSubT[] = [];
  isLoading: boolean = false;
  operarios: Operario[] = []; // Lista de operarios disponibles
  operariosSeleccionados: { Id: number, Encargado: string, Horas: number, Real: string }[] = []; // Lista de operarios adicionales seleccionados
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
            Id: 0,
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

    if (!operarioExistente && this.subtarea?.AsignadaA !== operario.NombreMostrar) {
      this.operariosSeleccionados.push({
        Id: operario.Id,
        Encargado: operario.NombreMostrar, // Nombre del operario
        Horas: 0, // Inicializar horas a 0 para mano de obra adicional
        Real: '' // Campo real editable
      });
      this.mostrarTablaOperarios = false; // Ocultar tabla después de seleccionar
    }
  }

  // Método para eliminar un operario adicional de la lista de seleccionados
  eliminarOperario(operario: { Encargado: string, Horas: number, Real: string }): void {
    this.operariosSeleccionados = this.operariosSeleccionados.filter(o => o !== operario);
  }

  // Abrir el selector de archivos al hacer clic en "Agregar Anexo"
  onFileSelect(): void {
    this.fileInput.nativeElement.click();
  }

  // Manejar el cambio de archivo al seleccionar una imagen
  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.anexos.push(e.target.result);  // Guardar la URL de la imagen en el array de anexos
      };
      reader.readAsDataURL(file);
    }
  }

  guardarValores(): void {
    // Crear el array de materiales con valores reales ingresados
    const materialesReales = this.materiales.map(material => ({
      CodInventario: material.CodInventario,
      Inventario_ID: material.Inventario_ID,
      Cant: parseFloat( material.CantReal),  // Asegúrate de que el campo "Cant" se esté actualizando en el input
      Unidad_Id: material.Unidad_Id,
      Estado: material.Estado,
      DetCotizacion_Id: material.DetCotizacion_Id,
      Tipo: 1
    }));

    // Crear el array de operarios con valores reales ingresados solo para mano de obra adicional se encesita este proceso
    const operariosReales = this.operariosSeleccionados.filter(op => op.Id !== 0).map(operario => ({
      CodInventario: operario.Encargado, // Usa el ID del operario si lo tienes en lugar del nombre
      Cant: parseFloat(operario.Real),
      Tipo: 2,
      Estado: 'A',
      Unidad_Id: 1,
      DetCotizacion_Id: 0,
      Inventario_Id:operario.Id.toString()  
    }));

    const { Id, ...subtareaCopia } = this.subtarea!;
    subtareaCopia.Tipo = 'NT'
    // Convierte "Real" a número y asigna a Horas
    subtareaCopia.Horas = this.operariosSeleccionados[0]?.Real
      ? parseFloat(this.operariosSeleccionados[0].Real)
      : subtareaCopia.Horas;

    const datosParaGuardar = {
      MaterialesReales: materialesReales,
      OperariosReales: operariosReales,
      CopiaSubtarea: subtareaCopia,
      Anexos: this.anexos
    };

    // Llamar al servicio para enviar datos al backend
    this.ordenService.guardarValores(datosParaGuardar).subscribe({
      next: (response) => {
        console.log("Respuesta del backend:", response);
      },
      error: (error) => {
        console.error("Error al guardar datos en el backend:", error);
      }
    });
    
    // Mostrar los datos en la consola
    console.log('Materiales Reales:', materialesReales);
    console.log('Operarios Reales:', operariosReales);
    console.log('Subtarea copia:', subtareaCopia);
    console.log('Anexos:', this.anexos )

    // Puedes agregar una alerta o mensaje en la consola para confirmar que se guardó
    console.log("Datos preparados para guardado.");
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
