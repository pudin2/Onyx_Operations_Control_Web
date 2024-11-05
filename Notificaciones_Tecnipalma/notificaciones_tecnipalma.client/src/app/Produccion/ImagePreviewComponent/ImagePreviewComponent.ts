import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ImagePreviewComponent',
  templateUrl: './ImagePreviewComponent.html',
  styleUrls: ['./ImagePreviewComponent.css']
})
export class ImagePreviewComponent {
  // Constructor que inyecta los datos pasados al dialog, que es la URL de la imagen.
  constructor(
    public dialogRef: MatDialogRef<ImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imgSrc: string } // Recibe la URL de la imagen.
  ) { }
}
