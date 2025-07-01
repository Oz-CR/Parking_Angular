import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit{
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  alertMessage = '';
  alertType = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.alertMessage = '';
      
      // Simular llamada a API
      setTimeout(() => {
        const { email, password } = this.loginForm.value;
        
        // Simulación de validación
        if (email === 'admin@parking.com' && password === '123456') {
          this.alertMessage = '¡Bienvenido al sistema de parking!';
          this.alertType = 'success';
          
          // Aquí rediriges al dashboard
          setTimeout(() => {
            console.log('Redirigiendo al dashboard...');
          }, 1500);
        } else {
          this.alertMessage = 'Credenciales incorrectas. Intenta nuevamente.';
          this.alertType = 'error';
        }
        
        this.isLoading = false;
      }, 2000);
    } else {
      this.alertMessage = 'Por favor, completa todos los campos correctamente.';
      this.alertType = 'warning';
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}
