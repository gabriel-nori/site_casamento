import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, Output, EventEmitter } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule } from '@angular/forms'
import { FilterSearchModalComponent } from '../filter-search-modal/filter-search-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderKey, ProductFilter } from '@models/product.model';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-filter-search',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './filter-search.component.html',
  styleUrl: './filter-search.component.css'
})
export class FilterSearchComponent {
  constructor(public dialog: MatDialog) {}
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedOption = 'R$'; // Valor inicial
  private cart: CartService = new CartService()

  radioForm = new FormGroup({
    option: new FormControl('op1') // Valor inicial
  });

  @Output() searchTerm = new EventEmitter<string>()
  @Output() order = new EventEmitter<string>()
  @Output() filter = new EventEmitter<ProductFilter>
  private filter_obj: ProductFilter = {
    order:{
      key: "id",
      field_type: 'number',
      name: "Padrão",
      order: 'asc'
    }
  }

  protected filter_options: OrderKey = this.cart.getOrderingKeys()

  updateSearch(value: string) {
    this.filter_obj.search_term = value
    this.filter.emit(this.filter_obj)
    this.searchTerm.emit(value);
  }

  updateOrder(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.filter_obj.order = this.filter_options[value]
    this.order.emit(value)
    this.filter.emit(this.filter_obj)
  }

  openFilterModal(): void {
    this.dialog.open(FilterSearchModalComponent, {
          width: '90%',
          height: '90%',
          maxHeight: '750px',
          maxWidth: '400',
          data: {}
        });
  }
}
