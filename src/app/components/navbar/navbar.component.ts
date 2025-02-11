import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
//import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule,RouterLink]
})
export class NavbarComponent {
  constructor(private storageService: StorageService, private router: Router) {}

  isLoggedIn(): boolean {
    return !!this.storageService.getToken();
  }

  getRole(): string | null {
    return this.storageService.getRole();
  }

  logout() {
    this.storageService.clearToken();
    this.router.navigate(['/home']);
  }
  profile(){
    this.router.navigate(["/profile"]);
  }

  login() {
    this.router.navigate(['/login']);
  }

  signup() {
    this.router.navigate(['/signup']);
  }
  cart() {
    this.router.navigate(['/cart']);
  }
  userhome() {
    this.router.navigate(['/user-home']);
  }
}
