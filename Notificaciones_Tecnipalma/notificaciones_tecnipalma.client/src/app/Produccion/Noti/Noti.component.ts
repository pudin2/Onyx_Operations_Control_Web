import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenService } from '../../Servicios/ot.service';
import { CabSubT } from '../../Models/SubTModel';
import { DetSubT } from '../../Models/DetSubTModel';
import { VwDetSubT } from '../../Models/CantRestanteModel';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Operario } from '../../Models/OperarioModel';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewComponent } from '../ImagePreviewComponent/ImagePreviewComponent';
import { UserService } from '../../Servicios/UserService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-noti',
  templateUrl: './Noti.component.html',
  styleUrls: ['./Noti.component.css']
})
export class NotiComponent implements OnInit {
  numOrden: string | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  anexosPreview: string[] = [];
  anexosFile: File[] = [];
  anexos: string[] = [];
  subtarea: CabSubT | null = null;
  materiales: DetSubT[] = [];
  cantidad: VwDetSubT[] = [];
  isLoading: boolean = false;
  operarios: Operario[] = [];
  operariosSeleccionados: { Id: number, Encargado: string, Horas: number, Real: string }[] = [];
  mostrarTablaOperarios: boolean = false;
  successMessage = false;
  success2Message = false;
  errorMessage = false;
  error2Message = false;
  error3Message = false;
  error4Message = false;
  error5Message = false;
  cantidadMessage = false;
  porcentajeavance: string = "";
  usuarioId: number = 0;
  observaciones: string = "";
  

  tabs = [
    { label: 'Materiales' },
    { label: 'Mano de Obra' },
    { label: 'Anexos' },
    { label: 'Porcentaje' },
    { label: 'Observaciones' }

  ];
  activeTabIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private ordenService: OrdenService,
    private location: Location,
    private dialog: MatDialog,
    private userService: UserService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.numOrden = params['numOrden'];
    });
    console.log('Número de Orden:', this.numOrden);
    const id = this.route.snapshot.paramMap.get('Id');
    if (id) {
      const subtareaId = parseInt(id, 10);
      this.loadSubtareaAndMateriales(subtareaId);
    }
    const username = this.userService.getUsername();
    if (username) {
      this.http.get<any>(`http://localhost:8050/api/usuarios/${username}`).subscribe({
        next: (data) => {
          this.usuarioId = data.id;
          console.log('ID del usuario:', this.usuarioId);
        },
        error: (err) => {
          console.error('Error al obtener datos del usuario', err);
        }
      });
    }
  }

  validarCantidadMaterial(material: DetSubT): void {
    if (parseFloat(material.CantReal) > material.Cant) {
      material.CantReal = material.Cant.toString(); // Limita al valor máximo permitido

      this.cantidadMessage = true;  // Mostrar el mensaje de éxito
      setTimeout(() => this.cantidadMessage = false, 5000);  // Ocultar mensaje después de 3 segundos

      //this.snackBar.open('La cantidad real no puede ser mayor que la cantidad disponible.', 'Cerrar', {
      //  duration: 3000,
      //  horizontalPosition: 'center',
      //  verticalPosition: 'top'
      //});
    }
  }


  loadSubtareaAndMateriales(id: number): void {
    this.isLoading = true;
    forkJoin({
      subtarea: this.ordenService.getSubTareaById(id),
      materiales: this.ordenService.getDetSubTBySubTareaId(id),
      cantidad: this.ordenService.getCantidadMaterial(id)
    }).subscribe({
      next: (results) => {
        this.subtarea = results.subtarea;
        this.materiales = results.materiales;
        this.cantidad = results.cantidad.map((item: any) => ({
          Id: item.Id,
          Cab_Id: item.Cab_Id,
          CANT_NT: item.CANT_NT || 0 // Asegúrate de asignar un valor si no existe
        })) as VwDetSubT[];

        if (this.subtarea?.AsignadaA) {
          this.operariosSeleccionados.push({
            Id: 0,
            Encargado: this.subtarea.AsignadaA,
            Horas: this.subtarea.Horas || 0,
            Real: ''
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

  cargarOperarios(): void {
    this.ordenService.getOperarios().subscribe({
      next: (data: Operario[]) => {
        this.operarios = data.sort((a, b) => a.NombreMostrar.localeCompare(b.NombreMostrar));
        this.mostrarTablaOperarios = true;
      },
      error: (error) => {
        console.error('Error al cargar operarios:', error);
      }
    });
  }

  seleccionarOperario(operario: Operario): void {
    const operarioExistente = this.operariosSeleccionados.find(o => o.Encargado === operario.NombreMostrar);
    if (!operarioExistente && this.subtarea?.AsignadaA !== operario.NombreMostrar) {
      this.operariosSeleccionados.push({
        Id: operario.Id,
        Encargado: operario.NombreMostrar,
        Horas: 0,
        Real: ''
      });
      this.mostrarTablaOperarios = false;
    }
  }

  eliminarOperario(operario: { Encargado: string, Horas: number, Real: string }): void {
    this.operariosSeleccionados = this.operariosSeleccionados.filter(o => o !== operario);
  }

  onFileSelect(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.anexosPreview.push(e.target.result);
        this.anexosFile.push(file);
      };
      reader.readAsDataURL(file);
    }
  }

  guardarValores(): void {

    let isValid = true;

    if (!this.porcentajeavance || this.porcentajeavance.trim() === '') {
      console.error("El porcentaje de avance está vacío.");
      isValid = false;
      this.error3Message = true;
      setTimeout(() => this.error3Message = false, 5000);
    }

    if (this.anexosFile.length === 0) {
      console.error("Debe agregar al menos un anexo.");
      isValid = false;
      this.error4Message = true;
      setTimeout(() => this.error4Message = false, 5000);
    }

    if (!this.tieneMaterialesLlenos() && !this.tieneManoDeObra()) {
      console.error("Debe llenar al menos un material o registrar mano de obra.");
      isValid = false;
      this.error5Message = true;
      setTimeout(() => this.error5Message = false, 5000);
    }

    if (!isValid) {
      this.errorMessage = true;
      setTimeout(() => (this.errorMessage = false), 5000);
      return;
    }
    // Si todas las validaciones pasan, procede con el guardado
    this.isLoading = true;

    const materialesReales = this.materiales.map(material => ({
      CodInventario: material.CodInventario,
      Inventario_ID: material.Inventario_ID,
      Cant: parseFloat(material.CantReal),
      Unidad_Id: material.Unidad_Id,
      Estado: material.Estado,
      DetCotizacion_Id: material.DetCotizacion_Id,
      Tipo: 1
    }));

    const operariosReales = this.operariosSeleccionados.filter(op => op.Id !== 0).map(operario => ({
      CodInventario: operario.Encargado,
      Cant: parseFloat(operario.Real),
      Tipo: 2,
      Estado: 'A',
      Unidad_Id: 1,
      DetCotizacion_Id: 0,
      Inventario_Id: operario.Id.toString()
    }));
    
    this.userService.getUsername

    const { Id, ...subtareaCopia } = this.subtarea!;
    subtareaCopia.Tipo = 'NT';
    subtareaCopia.Horas = this.operariosSeleccionados[0]?.Real ? parseFloat(this.operariosSeleccionados[0].Real) : subtareaCopia.Horas;
    subtareaCopia.Porc = parseFloat(this.porcentajeavance);
    subtareaCopia.Usuario_Id = this.usuarioId
    subtareaCopia.Observacion= this.observaciones

    const datosParaGuardar = {
      MaterialesReales: materialesReales,
      OperariosReales: operariosReales,
      CopiaSubtarea: subtareaCopia,
    };

    this.ordenService.guardarValores(datosParaGuardar).subscribe({
      next: (response) => {

        console.log("Datos guardados en el backend:", response);
        this.limpiarCampos(); // aquí se limpia después del éxito

        // Limpieza de otros campos si es necesario
        this.porcentajeavance = '';
        this.observaciones = "";
        const formData = new FormData();
        formData.append('numOrden', this.numOrden ?? '');
        const cabId = this.materiales[0]?.Cab_Id;
        if (cabId) {
          formData.append('Cab_Id', cabId.toString());
        }
        this.anexosFile.forEach((file) => {
          formData.append('files', file);
        });

        this.ordenService.guardarAnexo(formData).subscribe({
          next: (response) => {
            console.log("Imagen guardada temporalmente en el servidor:", response.filePath);

            //this.snackBar.open('Datos y anexos guardados correctamente', 'Cerrar', {
            //  duration: 3000,
            //  horizontalPosition: 'center',
            //  verticalPosition: 'top',
            //  panelClass: ['custom-snackbar']
            //});

            this.successMessage = true;  // Mostrar el mensaje de éxito
            setTimeout(() => this.successMessage = false, 5000);  // Ocultar mensaje después de 3 segundos
            this.anexosPreview = [];
            this.anexosFile = [];
          },
          error: (error) => {
            this.errorMessage = true;  // Mostrar el mensaje 
            setTimeout(() => this.errorMessage = false, 5000);  // Ocultar mensaje después de 3 segundos
            console.error("Error al guardar el anexo en el backend:", error);

            //this.snackBar.open('Error al guardar el anexo', 'Cerrar', {
            //  duration: 3000,
            //  horizontalPosition: 'center',
            //  verticalPosition: 'top'
            //});
          }
        });
        
      },

      error: (error) => {
        this.error2Message = true;  // Mostrar el mensaje 
        setTimeout(() => this.error2Message = false, 5000);  // Ocultar mensaje después de 3 segundos

        console.error("Error al guardar con el procedimiento almacenado:", error);

        //this.snackBar.open('Error al guardar los datos', 'Cerrar', {
        //  duration: 3000,
        //  horizontalPosition: 'center',
        //  verticalPosition: 'top'
        //});
      },

        complete: () => {
        this.isLoading = false; // Desactivar la pantalla de carga
      }

    });

    console.log('Materiales Reales:', materialesReales);
    console.log('Operarios Reales:', operariosReales);
    console.log('Subtarea copia:', subtareaCopia);
    console.log('Anexos:', this.anexos);

  }

  selectTab(index: number): void {
    this.activeTabIndex = index;
  }

  goBack(): void {
    this.location.back();
  }

  openPreview(imageSrc: string): void {
    this.dialog.open(ImagePreviewComponent, {
      width: 'auto',
      data: { imgSrc: imageSrc },
      panelClass: 'custom-modalbox'
    });
  }

  getDescripcionSinGuion(descripcion: string | undefined): string {
    if (!descripcion) {
      return '';
    }
    return descripcion.trim().startsWith('-') ? descripcion.trim().substring(1).trim() : descripcion.trim();
  }

  limpiarCampos(): void {
    // Vaciar los valores en los materiales
    this.materiales.forEach(material => material.CantReal = '');

    // Vaciar los valores en los operarios seleccionados
    this.operariosSeleccionados.forEach(operario => operario.Real = '');

    // Vaciar el porcentaje de avance
    this.porcentajeavance = '';
  }

  tieneMaterialesLlenos(): boolean {
    return this.materiales.some(
      (material) => material.CantReal && parseFloat(material.CantReal) > 0
    );
  }

  tieneManoDeObra(): boolean {
    return this.operariosSeleccionados.some(
      (operario) => operario.Real && parseFloat(operario.Real) > 0
    );
  }

}
