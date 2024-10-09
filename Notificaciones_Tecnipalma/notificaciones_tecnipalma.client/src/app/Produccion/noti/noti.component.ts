import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrl: './noti.component.css',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, FormsModule],
})
export class NotiComponent implements OnInit {
  searchTerm: string = '';
  data: any[] = [];
  filteredData: any[] = [];

  ngOnInit() {
    // Inicializar con algunos datos de ejemplo
    this.data = [
      { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
      { id: 2, name: 'María García', email: 'maria@example.com' },
      { id: 3, name: 'Carlos López', email: 'carlos@example.com' },
      { id: 4, name: 'Ana Martínez', email: 'ana@example.com' },
      { id: 5, name: 'Pedro Sánchez', email: 'pedro@example.com' },
    ];
    this.filteredData = [...this.data];
  }

  onSearch() {
    if (this.searchTerm) {
      this.filteredData = this.data.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = [...this.data];
    }
  }
}
