import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class SignupComponent {
  signupForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['USER', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.registerUser(this.signupForm.value, { responseType: 'text' }).subscribe({
        next: (response: string) => {
          console.log('Response from server:', response);
          if (response) {
            this.successMessage = 'Registration successful! Redirecting to login...';
            setTimeout(() => {
              this.router.navigate(['/login']); // Redirect to login page
            }, 2000);
          } else {
            this.successMessage = '';
            this.errorMessage = 'Unexpected response from server.';
          }
        },
        error: (err) => {
          console.error('Error during registration:', err);
          this.errorMessage = 'Failed to register.';
        }
      });
    }
  }
}