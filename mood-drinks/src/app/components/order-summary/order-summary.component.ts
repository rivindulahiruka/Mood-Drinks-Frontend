import { Component, NgModule } from '@angular/core';
import { CartService } from '../../cart.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Trash2 } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-order-summary',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
   modalOpen=false;
  customer={
    customerName:'',
    phone:'',
    email:''
  };

  constructor(public cartService:CartService,private http:HttpClient){
  }
  increaseQuantity(item: any){
    item.quantity++;
  }
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: any) {
    this.cartService.removeFormCart(item.id);
  }

  clearCart() {
    this.cartService.clearCart();
  }
  openModal(){
    this.modalOpen=true;
    document.body.style.overflow='hidden'

  }
  closeModal() {
    this.modalOpen = false;
    document.body.style.overflow = 'auto'; 
  }
  submitOrder() {
    const orderData = {
      customer: {
        customerName: this.customer.customerName,
        phone: this.customer.phone,
        email: this.customer.email
      },
      orderItems: this.cartService.getCartItems().map(item => ({
        productId: item.id, 
        name: item.name, 
        quantity: item.quantity,
        price: item.price 
      })),
      totalAmount: this.cartService.getTotal(),
      orderDate: new Date().toISOString() 
    };
  
    this.http.post('http://localhost:8080/order/place-order', orderData,{ responseType: 'text' }).subscribe({
      next: (response) => {
        Swal.fire('Success!', 'Order placed successfully!', 'success');
         this.generatePDFBill(orderData);
        this.cartService.clearCart();
        this.closeModal();
       
      },
      error: (error) => {
        console.error('Full error:', error);
        Swal.fire('Error!', error.error?.message || 'Failed to place order', 'error');
      }
    });
  }
  generatePDFBill(order: any) {
    const doc = new jsPDF();
    
    // Theme colors
    const primaryColor: [number, number, number] = [45, 55, 72];
    const accentColor: [number, number, number] = [239, 68, 68];
    const lightGray: [number, number, number] = [243, 244, 246];
    const darkGray: [number, number, number] = [107, 114, 128];
    const borderGray: [number, number, number] = [229, 231, 235];
    const headerGray: [number, number, number] = [249, 250, 251];
  
    // Header with accent bar
  doc.setFillColor(255, 0, 0); 
  doc.rect(0, 0, 210, 12, 'F');

    
  
    doc.setFontSize(20);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Mood Drinks', 105, 25, { align: 'center' });
  
   
    doc.setFontSize(10);
    doc.setTextColor(...darkGray);
    doc.setFont('helvetica', 'normal');
    doc.text('Sip Beauty, Taste Joy', 105, 32, { align: 'center' });
  
  
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);
    
    const infoY = 45;
    doc.text(`ORDER #: ${Math.floor(Math.random() * 10000)}`, 14, infoY);
    doc.text(`DATE: ${new Date(order.orderDate).toLocaleDateString()}`, 14, infoY + 6);
    doc.text(`TIME: ${new Date(order.orderDate).toLocaleTimeString()}`, 14, infoY + 12);
    
    
    doc.text(`CUSTOMER: ${order.customer.customerName}`, 180, infoY, { align: 'right' });
    doc.text(`PHONE: ${order.customer.phone}`, 180, infoY + 6, { align: 'right' });
    doc.text(`EMAIL: ${order.customer.email}`, 180, infoY + 12, { align: 'right' });
  
    
    doc.setDrawColor(...accentColor);
    doc.line(14, infoY + 18, 196, infoY + 18);
  
    // Items table
    const headers = [['ITEM', 'QTY', 'PRICE', 'TOTAL']];
    const rows = order.orderItems.map((item: any) => [
      item.name,
      item.quantity.toString(),
      `Rs. ${item.price.toFixed(2)}`,
      `Rs. ${(item.quantity * item.price).toFixed(2)}`
    ]);
  
    autoTable(doc, {
      startY: infoY + 24,
      head: headers,
      body: rows,
      margin: { left: 14, right: 14 },
      styles: {
        fontSize: 10,
        textColor: primaryColor,
        lineColor: borderGray,
        lineWidth: 0.5
      },
      headStyles: {
        fillColor: headerGray,
        textColor: primaryColor,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        halign: 'center'
      },
      columnStyles: {
        0: { halign: 'left', cellWidth: 'auto' },
        1: { cellWidth: 20 },
        2: { cellWidth: 30, halign: 'right' },
        3: { cellWidth: 35, halign: 'right' }
      },
      alternateRowStyles: {
        fillColor: lightGray
      }
    });
  
    
    const finalY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(230, 230, 230);
    doc.rect(14, finalY + 5, 180, 10, 'F');
    doc.text(`Total Amount: Rs. ${order.totalAmount.toFixed(2)}`, 16, finalY + 12);
    doc.setFillColor(...accentColor);
    doc.rect(0, 280, 210, 20, 'F');
    
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('Thank you for your order!', 105, 287, { align: 'center' });
    doc.setFontSize(8);
    doc.text('123  Street, Food City • Phone: +94 112 345 678', 105, 292, { align: 'center' });
  
    doc.save(`MOod Drink_Order_${order.customer.customerName}_${Date.now()}.pdf`);
}
  
}
