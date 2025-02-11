import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-home',
  standalone: true,
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  imports: [CommonModule,RouterModule]
})
export class UserHomeComponent {
  
  constructor(private router: Router, private storageService: StorageService) {}

  logout() {
    this.storageService.clearToken(); // Clear stored JWT token
    this.router.navigate(['/login']); // Redirect to login page
  }
}