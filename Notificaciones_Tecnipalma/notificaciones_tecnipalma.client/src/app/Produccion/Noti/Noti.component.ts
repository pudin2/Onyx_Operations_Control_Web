import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenService } from '../../Servicios/ot.service';
import { CabSubT } from '../../Models/SubTModel';
import { DetSubT } from '../../Models/DetSubTModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-noti',
  templateUrl: './Noti.component.html',
  styleUrls: ['./Noti.component.css']
})
export class NotiComponent implements OnInit {
  subtarea: CabSubT | null = null; // Variable para almacenar la subtarea seleccionada
  materiales: DetSubT[] = []; // Variable para almacenar los materiales (detalles de subtarea)

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
      this.getSubTareaById(parseInt(id, 10)); // Cargar la subtarea
      this.getMaterialesByCabId(parseInt(id, 10)); // Cargar los detalles de la subtarea (Materiales)
    }
  }

  // Obtener la subtarea por su Id
  getSubTareaById(id: number): void {
    this.ordenService.getSubTareaById(id).subscribe({
      next: (data) => {
        this.subtarea = data; // Asigna la subtarea seleccionada
      },
      error: (err) => {
        console.error('Error al obtener la subtarea', err);
      }
    });
  }

  // Obtener los detalles de DetSubT (materiales) por Cab_Id (que es el Id de la subtarea)
  getMaterialesByCabId(cabId: number): void {
    this.ordenService.getDetSubTBySubTareaId(cabId).subscribe({
      next: (data) => {
        console.log('Materiales recibidos:', data);
        this.materiales = data; // Asigna los materiales que coinciden con el Cab_Id
      },
      error: (err) => {
        console.error('Error al obtener los materiales', err);
      }
    });
  }

  selectTab(index: number): void {
    this.activeTabIndex = index;
  }

  goBack() {
    this.location.back(); // Regresa a la página anterior
  }
}

