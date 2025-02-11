import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '@app/services/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  standalone: true,
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  imports: [CommonModule,FormsModule]
})
export class UpdateProductComponent implements OnInit {
  product: any = {
    productId: 0,
    name: '',
    price: '',
    category: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.fetchProductById(productId);
    }
  }

  fetchProductById(id: string) {
    const token = this.storageService.getToken();
    this.http
      .get<any>(`http://localhost:8086/product-rest/user/fetch/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (data) => {
          this.product = data[0];
        },
        error: (err) => {
          console.error('Error fetching product:', err);
          alert('Failed to fetch product details.');
        },
      });
  }

  // updateProduct() {
  //   const token = this.storageService.getToken();
  //   this.http
  //     .put(`http://localhost:8086/product-rest/admin/product/${this.product.productId}`, this.product, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .subscribe({
  //       next: () => {
  //         alert('Product updated successfully!');
  //         this.router.navigate(['/admin-home']);
  //       },
  //       error: (err) => {
  //         console.error('Error updating product:', err);
  //         alert('Failed to update product.');
  //       },
  //     });
  // }
  updateProduct() {
    const token = this.storageService.getToken();
    this.http
      .put(`http://localhost:8086/product-rest/admin/product/${this.product.productId}`, this.product, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'text' // Specify that the response is a text
      })
      .subscribe({
        next: (response: string) => {
          alert(response); // Display the response message
          this.router.navigate(['/admin-home']);
        },
        error: (err) => {
          console.error('Error updating product:', err);
          alert('Failed to update product.');
        },
      });
  }
}