import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { MenuComponent } from './Menu/menu.component';
import { MainLayoutComponent } from './layouts/main_layout/main-layout.component';
import { NotiComponent} from './Produccion/Noti/CargaNoti.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },// Redirige a la página de login por defecto
  {
    path: '',
    component: MainLayoutComponent, // Este es el layout que incluye el menú
    children: [
      { path: 'menu', component: MenuComponent },
      {path: 'Produccion/noti', component: NotiComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: '**', redirectTo: '/login' }// Ruta para la página de menú
    ]
  },
  { path: '**', redirectTo: '/login' }
];


@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
