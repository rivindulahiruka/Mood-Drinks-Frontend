import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   email = '';
  password = '';

  constructor(private router: Router){

  }
  login(){
    console.log(this.email);
    
    if (this.email === 'admin@mos.com' && this.password === '123456') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials!');
    }
    }

  }


