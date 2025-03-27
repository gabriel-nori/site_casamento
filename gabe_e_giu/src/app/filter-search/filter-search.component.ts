import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-filter-search',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './filter-search.component.html',
  styleUrl: './filter-search.component.css'
})
export class FilterSearchComponent {
  searchQuery: string = '';
  selectedCategory: string = '';

  categories: string[] = ['Eletrônicos', 'Roupas', 'Livros', 'Brinquedos'];

  items = [
    { name: 'Notebook', category: 'Eletrônicos' },
    { name: 'Camiseta', category: 'Roupas' },
    { name: 'Livro Angular', category: 'Livros' },
    { name: 'Boneca', category: 'Brinquedos' }
  ];

  filteredItems() {
    return this.items.filter(item => 
      (this.selectedCategory === '' || item.category === this.selectedCategory) &&
      (this.searchQuery === '' || item.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }
}
