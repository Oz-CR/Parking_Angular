import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  alertMessage = '';
  alertType = '';
  passwordStrength = { percentage: 0, text: '', class: '' };

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+52\s?)?[\d\s\-()]{10,}$/)]],
      vehicleType: ['', [Validators.required]],
      licensePlate: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{3}-[A-Z]{3}$|^[A-Z]{3}\d{4}$/)]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
      receiveEmails: [false]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.registerForm.get('password')?.valueChanges.subscribe((password: string) => {
      this.updatePasswordStrength(password);
    });
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword?.hasError('passwordMismatch')) {
      delete confirmPassword.errors?.['passwordMismatch'];
      confirmPassword.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    
    return null;
  }

  updatePasswordStrength(password: string): void {
    if (!password) {
      this.passwordStrength = { percentage: 0, text: '', class: '' };
      return;
    }

    let strength = 0;
    let text = '';
    let className = '';

    // Criterios de fortaleza
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;

    if (strength < 50) {
      text = 'Débil';
      className = 'weak';
    } else if (strength < 100) {
      text = 'Media';
      className = 'medium';
    } else {
      text = 'Fuerte';
      className = 'strong';
    }

    this.passwordStrength = {
      percentage: strength,
      text: text,
      class: className
    };
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.alertMessage = '';
      
      // Simular llamada a API
      setTimeout(() => {
        const formData = this.registerForm.value;
        
        // Simulación de registro exitoso
        this.alertMessage = `¡Bienvenido ${formData.firstName}! Tu cuenta ha sido creada exitosamente.`;
        this.alertType = 'success';
        
        // Aquí rediriges al login o dashboard
        setTimeout(() => {
          console.log('Redirigiendo al login...');
        }, 2000);
        
        this.isLoading = false;
      }, 2500);
    } else {
      this.alertMessage = 'Por favor, completa todos los campos correctamente.';
      this.alertType = 'warning';
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }
}
