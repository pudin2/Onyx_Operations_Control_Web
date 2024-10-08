import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

/**
 * @title Basic toolbar
 */
@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrl: './noti.component.css',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class NotiComponent { }
