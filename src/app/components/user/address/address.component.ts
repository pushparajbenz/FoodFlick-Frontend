import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { ReactiveFormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-address',
  standalone: true,
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  imports: [CommonModule,ReactiveFormsModule]
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  addresses: any[] = [];  // Store user addresses
  userId: number | null = null;
 
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5,6}$')]]  // Zip should be 5 or 6 digits
    });
  }
 
  ngOnInit(): void {
    this.userId = this.storageService.getUserId();
    const token = this.storageService.getToken();
   
    if (!this.userId || !token) {
      alert('Unauthorized! Please log in.');
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return;
    }
   
    this.fetchUserAddresses(); // Fetch addresses only if the user is logged in
  }
 
  fetchUserAddresses() {
    const token = this.storageService.getToken();
    if (!token) {
      alert('Unauthorized! Please log in.');
      return;
    }
 
    this.http.get<any[]>(`http://localhost:8086/address-rest/getAddress/${this.userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        console.log('Fetched addresses:', data);
        this.addresses = data;
      },
      error: (err) => console.error('Error fetching addresses:', err)
    });
  }
 
  addAddress() {
    if (this.addressForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }
 
    const token = this.storageService.getToken();
    if (!token) {
      alert('Unauthorized! Please log in.');
      return;
    }
 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
 
    const addressData = [this.addressForm.value];  // Sending list of addresses as expected by backend
 
    this.http.post(`http://localhost:8086/address-rest/addAddress/${this.userId}`, addressData, { headers })
      .subscribe({
        next: (res) => {
          console.log('Address added successfully!', res);
          alert('Address added successfully!');
          this.router.navigate(['/cart']);  // Redirect to cart after adding address
        },
        error: (err) => {
          console.error('Error adding address:', err);
          alert('Error adding address!');
        }
      });
  }
 
  deleteAddress(addressId: number) {
    if (!confirm('Are you sure you want to delete this address?')) {
      return;
    }
 
    const token = this.storageService.getToken();
    if (!token) {
      alert('Unauthorized! Please log in.');
      return;
    }
 
    this.http.delete(`http://localhost:8086/address-rest/deleteAddress/${addressId}/${this.userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        console.log('Address deleted successfully!');
        this.addresses = this.addresses.filter(address => address.addressId !== addressId);
      },
      error: (err) => console.error('Error deleting address:', err)
    });
  }
}