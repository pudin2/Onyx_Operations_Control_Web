import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenService } from '../../Servicios/ot.service';
import { CabSubT } from '../../Models/SubTModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-noti',
  templateUrl: './Noti.component.html',
  styleUrls: ['./Noti.component.css']
})
export class NotiComponent implements OnInit {
  isOpen: boolean = false;
  subtarea: CabSubT | null = null; // Variable para almacenar la subtarea

  constructor(
    private route: ActivatedRoute, // Inyecta ActivatedRoute para capturar parámetros de la ruta
    private ordenService: OrdenService, // Inyecta el servicio para obtener datos
    private location: Location
  ) { }

  ngOnInit(): void {
    // Obtén el ID de la subtarea de los parámetros de la ruta
    const id = this.route.snapshot.paramMap.get('Id');
    if (id) {
      this.getSubTareaById(parseInt(id, 10));
    }
  }

  getSubTareaById(id: number): void {
    // Llama al servicio para obtener la información de la subtarea basada en el ID
    this.ordenService.getSubTareaById(id).subscribe({
      next: (data) => {
       this.subtarea = data;
      },
      error: (err) => {
        console.error('Error al obtener la subtarea', err);
     }
    });
  }

  // Array de pestañas con etiquetas
  tabs = [
    { label: 'Materiales' },
    { label: 'Mano de Obra' },
    { label: 'Anexos' }
  ];

  activeTabIndex: number = 0;

  // Función para seleccionar una pestaña
  selectTab(index: number): void {
    this.activeTabIndex = index;
  }

  goBack() {
    this.location.back(); // Navega a la página anterior
  }
}
