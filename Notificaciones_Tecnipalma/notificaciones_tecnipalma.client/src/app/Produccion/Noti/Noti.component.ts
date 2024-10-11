import { Component } from '@angular/core';

@Component({
  selector: 'app-Noti',
  templateUrl: './Noti.component.html',
  styleUrls: ['./Noti.component.css']
})
export class NotiComponent {
  value: number = 0;
  hovered: boolean = false;

  onMouseEnter(): void {
    this.hovered = true;
  }

  onMouseLeave(): void {
    this.hovered = false;
  }
}
