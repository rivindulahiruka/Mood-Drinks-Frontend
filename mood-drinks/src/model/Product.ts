export class Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: any; 
    constructor(
      id: number,
      name: string,
      price: number,
      category: string,
      image: any
    ) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.category = category;
      this.image = image;
    }
  
    // Getters and Setters
    public getId(): number {
      return this.id;
    }
  
    public setId(id: number): void {
      this.id = id;
    }
  
    public getName(): string {
      return this.name;
    }
  
    public setName(name: string): void {
      this.name = name;
    }
  
    public getPrice(): number {
      return this.price;
    }
  
    public setPrice(price: number): void {
      this.price = price;
    }
  
    public getCategory(): string {
      return this.category;
    }
  
    public setCategory(category: string): void {
      this.category = category;
    }
  
    public getImage(): any {
      return this.image;
    }
  
    public setImage(image: any): void {
      this.image = image;
    }
  }
  