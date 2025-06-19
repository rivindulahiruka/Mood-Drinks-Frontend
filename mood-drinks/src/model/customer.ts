export class Customer {
    customerId: number;
    customerName: string;
    phone: string;
  
    constructor(customerId: number, customerName: string, phone: string) {
      this.customerId = customerId;
      this.customerName = customerName;
      this.phone = phone;
    }
  }
  