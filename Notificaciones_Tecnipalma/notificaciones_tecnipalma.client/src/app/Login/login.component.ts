import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login exitoso', response);
        // Maneja el login exitoso aquí, como redirigir a otra página
      },
      error => {
        console.error('Error en el login', error);
        // Maneja el error aquí, por ejemplo, mostrando un mensaje
      }
    );
  }
  resetForm() {
    this.username = '';
    this.password = '';
  }
}
