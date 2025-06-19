import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: true, 
  imports: [],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Output() categorySelected=new EventEmitter<string>();
  
  selectCategory(category:string){
    this.categorySelected.emit(category)
  }


}
