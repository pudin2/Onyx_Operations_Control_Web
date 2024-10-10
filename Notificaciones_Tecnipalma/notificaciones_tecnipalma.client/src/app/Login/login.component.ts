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

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login exitoso', response);
        this.router.navigate(['/menu'])
        // Maneja el login exitoso aquí, como redirigir a otra página
        this.errorMessage = '';
      },
      error => {
        console.error('Error en el login', error);
        this.errorMessage = 'Usuario o contraseña incorrectos';
        // Maneja el error aquí, por ejemplo, mostrando un mensaje
      }
    );
  }
  resetForm() {
    this.username = '';
    this.password = '';
    this.errorMessage = '';
  }
}
