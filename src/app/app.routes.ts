import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { UpdateProductComponent } from './components/admin/update-product/update-product.component';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { CategoryComponent } from './components/user/category/category.component';
import { AddressComponent } from './components/user/address/address.component';
import { CartComponent } from './components/user/cart/cart.component';
import { OrderComponent } from './components/user/order/order.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RevenueComponent } from './components/admin/revenue/revenue.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
   { path: 'admin-home', component: AdminHomeComponent },
   {path:'add-product',component: AddProductComponent},
   {path: 'update-product/:productId',component: UpdateProductComponent},
   { path: 'user-details', component: UserDetailsComponent },
   {path: 'user-home', component: UserHomeComponent},
   {path: 'category', component: CategoryComponent},
   {path: 'address', component: AddressComponent},
   {path: 'cart', component: CartComponent},
   {path: 'order', component: OrderComponent},
   {path: 'profile',component: ProfileComponent},
   {path: 'revenue', component: RevenueComponent},

 
  { path: '**', redirectTo: '' }
];
