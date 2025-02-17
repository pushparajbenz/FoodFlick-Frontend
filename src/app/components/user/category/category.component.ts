import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-category',
  standalone: true,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [CommonModule]
})
export class CategoryComponent implements OnInit {
  categories: string[] = ['Vegetarian', 'Non-Vegetarian', 'Starters', 'Snacks & Juices'];
  products: any[] = [];
  selectedCategory: string = '';
  quantities: { [productId: number]: number } = {}; // Track quantities
  cartItems: any[] = [];
  userId: number;
 
  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) {
    this.userId = this.storageService.getUserId();
  }
 
  ngOnInit(): void {}
 
  fetchProductsByCategory(category: string) {
    this.selectedCategory = category;
    const token = this.storageService.getToken();
 
    if (!token) {
      alert('Unauthorized! Please log in.');
      this.router.navigate(['/login']);
      return;
    }
 
    this.http.get<any[]>(`http://localhost:8086/product-rest/category/${category}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        console.log("Fetched products for category:", category, data);
        this.products = data;
        // Initialize quantities for each product
        this.products.forEach(product => {
          this.quantities[product.productId] = 1;
        });
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }
 
  increaseQuantity(productId: number) {
    this.quantities[productId]++;
  }
 
  decreaseQuantity(productId: number) {
    if (this.quantities[productId] > 1) {
      this.quantities[productId]--;
    }
  }

  loadCartItems() {
    const token = this.storageService.getToken();
 
    if (!token) {
      alert('Unauthorized! Please log in.');
      this.router.navigate(['/login']);
      return;
    }
    this.http.get<any[]>(`http://localhost:8086/cart-rest/cart/${this.userId}`,{
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.cartItems = data;
        console.log("data items",data);
      },
      error: (err) => console.error('Error fetching cart items:', err)
    });
  }
 
  addToCart(product: any) {
    const userId = this.storageService.getUserId();
    const token = this.storageService.getToken();
 
    if (!token) {
      alert("Unauthorized! Please log in.");
      this.router.navigate(['/login']);
      return;
    }
 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
 
    const cartData = {
      userId: userId,
      quantity: this.quantities[product.productId], // Get quantity from the object
      inorder: false,
      product: {
        productId: product.productId,
        name: product.name,
        image: product.imageData,
        price: product.price
      }
    };
 
    console.log("Formatted cart data:", cartData);
 
    this.http.post('http://localhost:8086/cart-rest/addCart', cartData, { headers: headers, responseType: 'text' })
      .subscribe({
        next: (res) => console.log("Product added to cart successfully!", res),
        error: (err) => console.error("Error adding to cart:", err)
      });
      this.loadCartItems();
    this.router.navigate(['/cart']);
    this.loadCartItems();
  }
}

