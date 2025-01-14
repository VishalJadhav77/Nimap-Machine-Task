import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Ensure FormsModule is imported
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-master',
  standalone: true,
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.css'],
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule
    MatTableModule, // Add MatTableModule
    MatFormFieldModule, // Add MatFormFieldModule
    MatInputModule, // Add MatInputModule
    MatButtonModule, // Add MatButtonModule
    MatIconModule, // Add MatIconModule
  ],
})
export class CategoryMasterComponent {
  categories: Category[] = [];
  category: Category = { id: 0, name: '' };
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private apiService: ApiService) {
    this.loadCategories();
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe((data) => (this.categories = data));
  }

  addOrUpdateCategory(): void {
    if (this.category.id) {
      this.apiService
        .updateCategory(this.category.id, this.category)
        .subscribe(() => this.loadCategories());
    } else {
      this.apiService.addCategory(this.category).subscribe(() => this.loadCategories());
    }
    this.resetForm();
  }

  editCategory(category: Category): void {
    this.category = { ...category };
  }

  deleteCategory(id: number): void {
    this.apiService.deleteCategory(id).subscribe(() => this.loadCategories());
  }

  resetForm(): void {
    this.category = { id: 0, name: '' };
  }
}
