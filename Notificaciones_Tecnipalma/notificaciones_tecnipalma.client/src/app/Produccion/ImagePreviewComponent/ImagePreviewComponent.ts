import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ImagePreviewComponent',
  templateUrl: './ImagePreviewComponent.html',
  styleUrls: ['./ImagePreviewComponent.css']
})
export class ImagePreviewComponent {
  
  constructor(
    public dialogRef: MatDialogRef<ImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imgSrc: string } 
  ) { }
}
