import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRipple } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Servicios/auth.service';

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

  constructor(private router: Router, private authService: AuthService) { }

  logout(): void {
    this.authService.logout();  // Llama a logout en AuthService para cerrar sesión
    this.router.navigate(['/login']);  // Redirige a la página de login
  }
}


