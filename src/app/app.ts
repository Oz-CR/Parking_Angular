import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Saludo } from './saludo/saludo';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Saludo, Login, Register],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected title = 'Parking';
  protected nombreUsuario = 'Esteban';
}
