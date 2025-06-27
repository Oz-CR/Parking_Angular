import { Component } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  templateUrl: './primary-button.html',
  styleUrl: './primary-button.css',
  standalone: true
})

export class PrimaryButton {
  protected text: string = 'Click Me';
  protected disabled: boolean = false;
  protected onClick(): void {
    console.log('Button clicked!');
  }
}
