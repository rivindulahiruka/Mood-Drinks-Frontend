import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[]=[];
  private cartCount=new BehaviorSubject<number>(0);
  currentCartCount=this.cartCount.asObservable();

  addToCart(item:any){
    const existingItem=this.cartItems.find(i=>i.id===item.id);
    

    if(existingItem){
      existingItem.quantity+=1;

    }else{
      this.cartItems.push({... item, quantity: 1})
    }
    this.updateCartCount();

  }
  getCartItems(){
    return this.cartItems;
  }
  removeFormCart(itemId: number){
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.updateCartCount();
  }
  clearCart() {
    this.cartItems = [];
    this.updateCartCount();
  }
  getTotal() {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

 
  private updateCartCount() {
    this.cartCount.next(this.cartItems.length);
  }
  
}
