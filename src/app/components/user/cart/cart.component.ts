import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId: number;
  showPopup: boolean = false;
 
  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) {
    this.userId = this.storageService.getUserId(); // Implement method to retrieve user ID
  }
 
  ngOnInit() {
    this.loadCartItems();
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
 
  deleteCartItem(cartId: number) {
    const token = this.storageService.getToken();
 
    if (!token) {
      alert('Unauthorized! Please log in.');
      this.router.navigate(['/login']);
      return;
    }
    this.http.delete(`http://localhost:8086/cart-rest/deleteCart/${cartId}`,{
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        alert('Item removed from cart');
        this.loadCartItems();
      },
      error: (err) => console.error('Error deleting cart item:', err)
    });
  }
 
  addMoreItems() {
    this.router.navigate(['/category']);
  }
  // placeOrder() {    
  //    const token = this.storageService.getToken();     
  //    if (!token) {      
  //      alert("Unauthorized! Please log in.");       
  //      this.router.navigate(['/login']);       
  //      return;     
  //     }     
  //     // console.log(this.userId);
  //     //const headers = new HttpHeaders({       'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'    });     
  //    // const  address= "DefaultAddress" ;  
  //     this.http.post(`http://localhost:8086/order-rest/user/addOrder/${this.userId}`,  {headers: { Authorization: `Bearer ${token}`} })       
  //     .subscribe({        
  //        next: () => {           
  //         this.showPopup = true;        
  //        },        
  //        error: (err) => console.error("Error placing order:", err)      
  //        });  
  //        }   

  placeOrder() {    
    const token = this.storageService.getToken();     
    if (!token) {      
      alert("Unauthorized! Please log in.");       
      this.router.navigate(['/login']);       
      return;     
    }     
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Ensure no request body is sent as the API only requires userId in the path
    this.http.post(`http://localhost:8086/order-rest/user/addOrder/${this.userId}`, null, { headers })       
      .subscribe({        
        next: () => {           
          this.showPopup = true;        
        },        
        error: (err) => console.error("Error placing order:", err)      
      });  
  }  
  
  
  
  
         navigateToOrders() { 
          this.showPopup = false; 
          this.router.navigate([`/order`]); // Navigating to the order details page 
          } 
        }

