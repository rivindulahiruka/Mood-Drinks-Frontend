import { Component } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HeroComponent } from "../components/hero/hero.component";
import { CategoryComponent } from "../components/category/category.component";
import { MenuComponent } from "../components/menu/menu.component";
import { OrderSummaryComponent } from "../components/order-summary/order-summary.component";

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, HeroComponent, CategoryComponent, MenuComponent, OrderSummaryComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
