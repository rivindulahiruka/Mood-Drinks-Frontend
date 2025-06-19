import { Customer } from './customer';
import { OrderItem } from './order-item';

export class Order {
  id: number;
  customer: Customer;
  totalAmount: number;
  orderDate: Date;
  orderItems: OrderItem[];

  constructor(
    id: number,
    customer: Customer,
    totalAmount: number,
    orderDate: Date,
    orderItems: OrderItem[]
  ) {
    this.id = id;
    this.customer = customer;
    this.totalAmount = totalAmount;
    this.orderDate = orderDate;
    this.orderItems = orderItems;
  }

    getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  getCustomer(): Customer {
    return this.customer;
  }

  setCustomer(customer: Customer): void {
    this.customer = customer;
  }

  getTotalAmount(): number {
    return this.totalAmount;
  }

  setTotalAmount(totalAmount: number): void {
    this.totalAmount = totalAmount;
  }

  getOrderDate(): Date {
    return this.orderDate;
  }

  setOrderDate(orderDate: Date): void {
    this.orderDate = orderDate;
  }

  getOrderItems(): OrderItem[] {
    return this.orderItems;
  }

  setOrderItems(orderItems: OrderItem[]): void {
    this.orderItems = orderItems;
  }
}
