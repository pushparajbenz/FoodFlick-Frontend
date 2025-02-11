import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  imports: [CommonModule]
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  userId: number;
  showPopup: boolean = false;
 
  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) {
    this.userId = this.storageService.getUserId();
  }
 
  ngOnInit() {
    this.loadOrders();
  }
 
  loadOrders() {
    const token = this.storageService.getToken();
    if (!token) {
      alert("Unauthorized! Please log in.");
      this.router.navigate(['/login']);
      return;
    }
 
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
 
    this.http.get<any[]>(`http://localhost:8086/order-rest/user/getUserOrder/${this.userId}`, { headers }).subscribe({
      next: (data) => { this.orders = data; },
      error: (err) => console.error("Error fetching orders:", err)
    });
  }
 
 
}
