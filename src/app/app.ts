import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Saludo } from './saludo/saludo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Saludo],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected title = 'Parking';
  protected nombreUsuario = 'Esteban';
}
