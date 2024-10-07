import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { MenuComponent } from './Menu/menu.component';
//import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Redirige a la página de login por defecto
  { path: 'menu', component: MenuComponent },  // Ruta para la página de login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }// Ruta para la página de menú
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
