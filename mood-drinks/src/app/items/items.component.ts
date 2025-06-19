import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-items',
  imports: [CommonModule,FormsModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit{
  public menuItems :Product[]=[];
  public selectedImage:File|null=null;
  public imagePreview: string | ArrayBuffer | null = null;
  selectedItem: Product = new Product(0, '', 0, '', null);
  
  openEditModal(item: Product) {
    this.selectedItem = new Product(
      item.id,
      item.name,
      item.price,
      item.category,
      item.image
    );
    this.imagePreview = item.image; 
    this.selectedImage = null;
  }
onImageSelected(event: any) {
  const file = event.target.files[0]; 
  if (file) {
    this.selectedImage = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  } 
}
updateItem():void{
  const formData=new FormData();
  formData.append('id', this.selectedItem.id.toString());
    formData.append('name', this.selectedItem.name);
    formData.append('price', this.selectedItem.price.toString());
    formData.append('category', this.selectedItem.category);
    
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    } else {
      formData.append('image', new Blob());
    }
    this.http.patch<Product>('http://localhost:8080/products/update', formData).subscribe(
      (updatedProduct) => {
        Swal.fire('Success!', 'Product updated successfully!', 'success');
        const index = this.menuItems.findIndex(item => item.id === updatedProduct.id);
        if (index !== -1) {
          this.menuItems[index] = updatedProduct;
          
          
          if (typeof updatedProduct.image === 'string' && 
              (updatedProduct.image.startsWith('/9j') || updatedProduct.image.startsWith('iVBORw'))) {
            const imageType = updatedProduct.image.startsWith('/9j') ? 'jpeg' : 'png';
            this.menuItems[index].image = `data:image/${imageType};base64,${updatedProduct.image}`;
          }
        }
        },
        
    )

}

  ngOnInit(): void {
    this.getItems()
  }
  constructor(private http:HttpClient){
  }
  getItems() {
    this.http.get<Product[]>("http://localhost:8080/products/get").subscribe({
      next: (res) => {
        this.menuItems = res.map(item => {
          if (typeof item.image === 'string' && 
              (item.image.startsWith('/9j') || item.image.startsWith('iVBORw'))) {
            const imageType = item.image.startsWith('/9j') ? 'jpeg' : 'png';
            item.image = `data:image/${imageType};base64,${item.image}`;
          }
          return item;
        });
        console.log('Refreshed items:', this.menuItems);
      },
      error: (err) => {
        console.error('Error loading items:', err);
      }
    });
  }
  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.http.delete(`http://localhost:8080/products/delete/${id}`, 
        { responseType: 'text' } // Expect text response
      ).subscribe({
        next: () => {
          // Refresh the list after deletion
          this.getItems();
          console.log('Item marked as deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting item:', err);
        }
      });
    }
  }
  productData={
    name:'',
    price: 0,
    category: '',
    image: null
  };
  selectedFile: File | null = null;
  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }
onSubmit(){
  if(!this.selectedFile){
    alert('please select an image')
    return;
  }
  const formData=new FormData();
  formData.append('name', this.productData.name);
    formData.append('price', this.productData.price.toString());
    formData.append('category', this.productData.category);
    formData.append('image', this.selectedFile);

    this.http.post('http://localhost:8080/products/add',formData)
    .subscribe({
      next: (response) => {
        Swal.fire('Success!', 'Product Added successfully!', 'success');
        console.log('Product added successfully', response);
        // this.closeModal();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Error adding product. Please try again.');
      }
    });
}
private resetForm() {
  this.productData = {
    name: '',
    price: 0,
    category: '',
    image: null
  };
  this.selectedFile = null;
}
}
