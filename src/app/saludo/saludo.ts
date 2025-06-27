import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-saludo',
  imports: [],
  templateUrl: './saludo.html',
  styleUrl: './saludo.css',
  standalone: true
})
export class Saludo {
  @Input() nombre: string = 'Oz'
}
