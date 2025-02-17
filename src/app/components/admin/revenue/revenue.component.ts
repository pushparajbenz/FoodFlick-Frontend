import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '@app/services/storage.service';

@Component({
  selector: 'app-revenue',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  fromDate: string = '';
  toDate: string = '';
  revenueData: any = null;
  errorMessage: string = '';

  constructor(private http: HttpClient,private storageService:StorageService) {}

  ngOnInit(): void {}

  fetchRevenue() {
    if (!this.fromDate || !this.toDate) {
      this.errorMessage = 'Please select both dates.';
      return;
    }
    this.errorMessage = '';

    const token = this.storageService.getToken(); // JWT Token from local storage
    if (!token) {
      console.error('No token found, authentication required.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `http://localhost:8086/order-rest/admin/getRevenueMonthly?fromdate=${this.fromDate}&todate=${this.toDate}`;

    this.http.get(url, { headers }).subscribe(
      (response) => {
        this.revenueData = response;
      },
      (error) => {
        console.error('Error fetching revenue:', error);
        this.errorMessage = 'Failed to fetch revenue. Please try again.';
      }
    );
  }
}