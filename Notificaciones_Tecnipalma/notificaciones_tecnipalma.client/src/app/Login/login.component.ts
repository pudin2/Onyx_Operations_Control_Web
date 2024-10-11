import { Component } from '@angular/core';
import { AuthService } from '../Servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage: string = '';
  isLoading: boolean = false; // Variable para controlar la pantalla de carga

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.isLoading = true; // Mostrar pantalla de carga cuando se envía el formulario
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login exitoso', response);
        
        this.router.navigate(['/menu'])
        this.isLoading = false;
        this.errorMessage = '';
      },
      error => {
        console.error('Error en el login', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
        this.isLoading = false;
      }
    );
  }
  resetForm() {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
    this.isLoading = false;
  }



}
