import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenService } from '../../Servicios/ot.service';
import { CabSubT } from '../../Models/SubTModel';

@Component({
  selector: 'app-noti',
  templateUrl: './Noti.component.html',
  styleUrls: ['./Noti.component.css']
})
export class NotiComponent implements OnInit {
  value: number = 0;
  hovered: boolean = false;
  subtarea: CabSubT | null = null; // Variable para almacenar la subtarea

  constructor(
    private route: ActivatedRoute, // Inyecta ActivatedRoute para capturar parámetros de la ruta
    private ordenService: OrdenService // Inyecta el servicio para obtener datos
  ) { }

  ngOnInit(): void {
    // Obtén el ID de la subtarea de los parámetros de la ruta
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getSubTareaById(parseInt(id, 10));
    }
  }

  getSubTareaById(id: number): void {
    // Llama al servicio para obtener la información de la subtarea basada en el ID
    //this.ordenService.getSubTareaById(id).subscribe({
      //next: (data) => {
       // this.subtarea = data;
      //},
      //error: (err) => {
        //console.error('Error al obtener la subtarea', err);
     // }
    //});
  }

  onMouseEnter(): void {
    this.hovered = true;
  }

  onMouseLeave(): void {
    this.hovered = false;
  }
}
