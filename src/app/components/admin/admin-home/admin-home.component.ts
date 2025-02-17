import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '@app/services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  imports: [CommonModule]
})
export class AdminHomeComponent implements OnInit {
  products: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    const token = this.storageService.getToken();
    if (!token) {
      alert('Unauthorized! Please log in.');
      this.router.navigate(['/login']);
      return;
    }
  
    this.http.get<any[]>('http://localhost:8086/product-rest/admin/fetch', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: (data) => {
        console.log("Admin Products fetched:", data); 
        this.products = data;
  
        // Ensure each product has a productId
        this.products.forEach(product => {
          if (!product.productId) {
            console.error("Product missing productId:", product);
          }
        });
      },
      error: (err) => console.error('Error fetching products:', err),
    });
  }
  navigateToAddProduct() {
    this.router.navigate(['/add-product']);
  }

 
  deleteProduct(productId: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;
  
    const token = this.storageService.getToken();
    this.http.delete(`http://localhost:8086/product-rest/admin/deleteProduct/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'text' // Specify that the response is a text
      })
      .subscribe({
        next: (response: string) => {
          alert(response); // Display the response message
          this.fetchProducts(); // Refresh product list after deletion
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Failed to delete product.');
        },
      });
  }

  updateProduct(productId: number | undefined) {
    if (!productId) {
      console.error("Product ID is undefined!");
      alert("Product ID is missing, update cannot proceed.");
      return;
    }
  
    console.log("Navigating to update-product with ID:", productId);
    this.router.navigate(['/update-product', productId]);
  }
  navigateToUserDetails() {
    
    this.router.navigate(['/user-details']);
    
  }
  navigateToRevenue(){
    this.router.navigate(['/revenue']);
  }
}