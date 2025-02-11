import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone:true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    const token = localStorage.getItem('auth-token'); // Get JWT token from local storage
    if (!token) {
      console.error('No token found, unable to fetch user profile');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:8086/auth/user/profile', { headers }).subscribe(
      (response: any) => {
        this.userProfile = response;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}