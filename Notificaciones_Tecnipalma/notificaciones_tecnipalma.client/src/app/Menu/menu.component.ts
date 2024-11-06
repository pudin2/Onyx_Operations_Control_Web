import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRipple } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MenuItem {
  title: string;
  links: { text: string; url: string; disabled?: boolean }[];
  isOpen: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatTabsModule, MatRipple, CommonModule, RouterModule],
})
export class MenuComponent {

  menuItems: MenuItem[] = [
    {
      title: 'Producción',
      links: [
        { text: 'Notificaciones', url: '/Producción/Notificaciones' },
        //{ text: 'Prueba', url: '/Producción/Notificaciones', disabled: true },
  
      ],
      isOpen: false
    },

    {
      title: 'En desarrollo',
      links: [
        // text: 'Desarrollo', url: '/En desarrolo/Desarrollo', disabled: true },
      ],
      isOpen: false
    }
  ];

  isLinkDisabled(link: any): boolean {
    // Verificar si el enlace tiene la propiedad 'disabled' en true
    return link.disabled === true;
  }

  hasNotificationLink(item: any): boolean {
    return item.links.some((link: any) => link.text === 'Notificaciones');
  }

  toggleItem(item: MenuItem) {
    item.isOpen = !item.isOpen;
  }

  onLinkClick(url: string) {
    // Aquí puedes implementar la lógica para navegar a la URL
    // Por ahora, solo mostraremos un mensaje en la consola
    console.log(`Navegando a: ${url}`);
  }

  constructor(private router: Router) { }

  logout(): void {
    // Aquí puedes limpiar la información del usuario y redirigirlo al login
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']);
  }
}


