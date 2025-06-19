import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeroComponent } from './components/hero/hero.component';
import { OrderSummaryComponent } from "./components/order-summary/order-summary.component";
import { CategoryComponent } from './components/category/category.component';
import { MenuComponent } from "./components/menu/menu.component";

import { OrdersComponent } from './pages/orders/orders.component';
import { ItemsComponent } from './items/items.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'Mood Drinks';

  selectedCategory: string = 'All'; 

  changeCategory(category: string) {
    this.selectedCategory = category; 
}
}
