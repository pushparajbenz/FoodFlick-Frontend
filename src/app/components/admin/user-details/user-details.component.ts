import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '@app/services/storage.service';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  imports: [CommonModule]
})
export class UserDetailsComponent implements OnInit {
  users: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    const token = this.storageService.getToken();
    console.log('Retrieved Token:', token);  // Check if token exists
  
    if (!token) {
      alert('Unauthorized! Please log in.');
      this.router.navigate(['/login']);
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    this.http.get<any[]>('http://localhost:8086/auth/admin/userdetails', { headers })
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log('Users fetched:', this.users);
        },
        error: (err) => {
          console.error('Error fetching users:', err);
          if (err.status === 403) {
            alert('Access Denied! You do not have permission.');
          }
        }
      });
  }
  

  goBack() {
    this.router.navigate(['/admin-home']);
  }
}