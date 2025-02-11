
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private TOKEN_KEY = 'auth-token';
  private ROLE_KEY = 'user-role';
  private USER_ID_KEY = 'user-id';
 
  constructor() {}
 
  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
 
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
 
  clearToken() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
  }
 
  setRole(role: string) {
    localStorage.setItem(this.ROLE_KEY, role);
  }
 
  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }
  
  setUserId(userId: number) {    
     localStorage.setItem(this.USER_ID_KEY, userId.toString()); 
    }  
      
    
  getUserId(): number {    
         return Number(localStorage.getItem(this.USER_ID_KEY)) || 0; 
    }
}

