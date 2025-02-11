import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  string: any;
  successMessage!: string;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): any {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          const token = response.token; // Extract token from response
          const role = response.role; // Extract role from response
          const userId = response.userId; //Extract userId from response
          console.log(token);
          this.storageService.setToken(token);

          console.log(role); // Log the role to verify if it's correctly extracted
          this.storageService.setRole(role);

          console.log(userId);
          this.storageService.setUserId(userId);


          // Show success message based on role
          if (role === 'ADMIN') {
            this.successMessage = 'Welcome back, Admin!';
            console.log(this.successMessage); // Log the success message to the console
            setTimeout(() => this.router.navigate(['/admin-home']), 2000);
          } else if (role === 'USER') {
            this.successMessage = 'Welcome back, User!';
            console.log(this.successMessage); // Log the success message to the console
            setTimeout(() => this.router.navigate(['/user-home']), 2000);
          }
        },
        error: (err: any) => {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }

  parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      return null;
    }
  }
}