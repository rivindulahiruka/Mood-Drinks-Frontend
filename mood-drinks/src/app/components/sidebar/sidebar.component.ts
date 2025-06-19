import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router){
  }
  navigateTo(route:string){
    this.router.navigate([route])
  }
  isActive(router:string) :boolean{
    return this.router.url === `/${router}`;
  }
  
  public selectedMenu='Dashboard';

  changeMainSection(name:string){
    this.selectedMenu=name;
  }

}
