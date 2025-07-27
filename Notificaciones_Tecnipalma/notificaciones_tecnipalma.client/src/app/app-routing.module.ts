import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { MenuComponent } from './Menu/menu.component';
import { MainLayoutComponent } from './layouts/main_layout/main-layout.component';
import { CargaNotiComponent } from './Produccion/Noti/CargaNoti.component'
import { NotiComponent } from './Produccion/Noti/Noti.component';
import { AuthGuard } from './Servicios/auth.guard';
import { AdicionesComponent } from './Produccion/Adiciones/Adiciones.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainLayoutComponent, 
    children: [
      { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
      { path: 'produccion/noti', component: CargaNotiComponent, canActivate: [AuthGuard] },
      { path: 'produccion/noti/:Id', component: NotiComponent, canActivate: [AuthGuard] },
      { path: 'produccion/adiciones', component: AdicionesComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: '**', redirectTo: '/login' }
    ]
  },

  { path: '**', redirectTo: '/login' }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
