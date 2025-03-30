import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, Output, EventEmitter } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule } from '@angular/forms'
import { FilterSearchModalComponent } from '../filter-search-modal/filter-search-modal.component';
import { MatDialog } from '@angular/material/dialog';

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

  radioForm = new FormGroup({
    option: new FormControl('op1') // Valor inicial
  });

  @Output() searchTerm = new EventEmitter<string>()
  @Output() order = new EventEmitter<string>()

  updateSearch(value: string) {
    this.searchTerm.emit(value);
  }

  updateOrder(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.order.emit(value)
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
