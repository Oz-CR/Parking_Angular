import { Component, Input } from '@angular/core';
import { PrimaryButton } from '../primary-button/primary-button';

@Component({
  selector: 'app-saludo',
  imports: [PrimaryButton],
  templateUrl: './saludo.html',
  styleUrl: './saludo.css',
  standalone: true
})

export class Saludo {
  @Input() nombre: string = 'Oz'
}
