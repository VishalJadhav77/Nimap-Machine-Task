import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-master',
  standalone: true,
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,  // Import MatPaginatorModule here
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatCardModule, // Add MatCardModule here
  ],
})
export class ProductMasterComponent {
  products: Product[] = [];
  categories: Category[] = [];
  product: Product = { id: 0, name: '', categoryId: 0, categoryName: '' };
  displayedColumns: string[] = ['id', 'name', 'category', 'actions'];
  pageIndex: number = 0;  // Keep track of the current page index
  pageSize: number = 10;  // Set the page size

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    this.loadCategories();
    this.loadProducts();
  }

  // Load categories for the dropdown
  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (error) => {
        console.error('Error loading categories:', error);
        this.showSnackBar('Failed to load categories. Please try again.');
      },
    });
  }

  loadProducts(): void {
    this.apiService.getProducts(this.pageIndex + 1, this.pageSize).subscribe({
      next: (data) => {
        if (data && data.items) {
          this.products = data.items;
          console.log('Loaded products:', this.products); // Verify data
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
      },
    });
  }

  // Handle page changes
  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();  // Load products for the new page
  }

  // Add or update a product
  addOrUpdateProduct(): void {
    if (this.product.id) {
      // Update existing product
      this.apiService.updateProduct(this.product.id, this.product).subscribe({
        next: () => {
          this.loadProducts();  // Refresh the product list after update
          this.showSnackBar('Product updated successfully.');
          this.resetForm();
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.showSnackBar('Failed to update product. Please try again.');
        },
      });
    } else {
      // Add new product
      this.apiService.addProduct(this.product).subscribe({
        next: (newProduct) => {
          // Add new product to the list
          this.products.push(newProduct);  // Add the newly created product to the list
          this.showSnackBar('Product added successfully.');
          this.resetForm();
        },
        error: (error) => {
          console.error('Error adding product:', error);
          this.showSnackBar('Failed to add product. Please try again.');
        },
      });
    }
  }

  
  editProduct(product: Product): void {
    this.product = { ...product };  
    
  }


  deleteProduct(id: number): void {
    this.apiService.deleteProduct(id).subscribe({
      next: () => {
        
        this.products = this.products.filter(product => product.id !== id);
        this.showSnackBar('Product deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.showSnackBar('Failed to delete product. Please try again.');
      },
    });
  }

  
  resetForm(): void {
    this.product = { id: 0, name: '', categoryId: 0, categoryName: '' };
  }

  
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
