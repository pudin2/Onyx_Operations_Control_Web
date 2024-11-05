import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ImagePreviewComponent } from './ImagePreviewComponent';

@NgModule({
  declarations: [ImagePreviewComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [ImagePreviewComponent]
})
export class ImagePreviewModule { }
