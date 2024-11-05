import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //importarFormsModule//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { MenuComponent } from './Menu/menu.component';
import { MainLayoutComponent } from './layouts/main_layout/main-layout.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NotiComponent } from './Produccion/Noti/Noti.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    MainLayoutComponent,
    NotiComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule, MenuComponent, MatDialogModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
