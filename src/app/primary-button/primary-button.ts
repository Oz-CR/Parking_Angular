import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  templateUrl: './primary-button.html',
  styleUrl: './primary-button.css',
  standalone: true
})

export class PrimaryButton {
  @Input() disabled = false;
}
