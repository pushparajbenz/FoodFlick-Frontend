import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '@app/services/storage.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Import FormsModule here
})
export class AddProductComponent {
  name: string = '';
  price: number | null = null;
  category: string = '';
  image: File | null = null;
  preview: string = '';

  

  constructor(private http: HttpClient, private router: Router,private storageService:StorageService) {}
  
  handleImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.image = file;
      const reader = new FileReader();
      reader.onload = () => this.preview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  handleSubmit() {
    console.log('Name:', this.name);
    console.log('Price:', this.price);
    console.log('Category:', this.category);
    console.log('Image:', this.image);
   
    if (!this.name || !this.price || !this.category || !this.image) {
      alert('All fields are required!');
      return;
    }
   
    const productData = {
      name: this.name,
      price: this.price,
      category: this.category,
    };
    const token= this.storageService.getToken();
    console.log("token....."+token);
    const formData = new FormData();
    // Append JSON data as a Blob 
    formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
    // Append image
    formData.append('image', this.image);
   const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
   
    this.http.post(`http://localhost:8086/product-rest/admin/product`, formData,{
     headers: { Authorization: `Bearer ${token}` } // Keep the Authorization header
     }) .subscribe({
      next: () => {
        console.log("Product added successfully!");
        this.router.navigate(['/admin-home']); // Redirect after success
      },
      error: (err) => {
        console.error("Error adding product:", err);
        alert('Failed to add product. Please try again.');
      }
    });
  }
}