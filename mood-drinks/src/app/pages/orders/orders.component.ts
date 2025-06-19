import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../../model/order';

@Component({
  selector: 'app-orders',
  imports: [NgFor],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  public order: Order[]=[];
  constructor(private http:HttpClient){

  }
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.http.get<Order[]>("http://localhost:8080/order/all").subscribe({
      next: (res) => {
        this.order = res;
      },
      error: (err) => {
        console.error('Error:', err);
        alert('cant');
      }
    });
  }

}
