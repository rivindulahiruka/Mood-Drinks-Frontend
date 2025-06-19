import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../cart.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports:[NgFor],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  @Input() selectedCategory: string = 'All';
  menuItems: any[] = [];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit() {
    this.getProducts();
  }

  
  getProducts() {
    this.http.get<any[]>("http://localhost:8080/products/get").subscribe({
      next: (res) => {
        this.menuItems = res.map(item => {
          if (typeof item.image === 'string' && (item.image.startsWith('/9j') || item.image.startsWith('iVBORw'))) {
            const imageType = item.image.startsWith('/9j') ? 'jpeg' : 'png';
            item.image = `data:image/${imageType};base64,${item.image}`;
          }
          return item;
        });
        console.log('item', this.menuItems);
      },
      error: (err) => {
        console.error('error', err);
      }
    });
  }

  
  get filteredMenu() {
    if (this.selectedCategory === 'All') {
      return this.menuItems;
    }
    return this.menuItems.filter(item => item.category === this.selectedCategory);
  }

  
  onBuyItem(item: any) {
    this.cartService.addToCart(item);
    console.log('Added to cart:', item);
  }
}