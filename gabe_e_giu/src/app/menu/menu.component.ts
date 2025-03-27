import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menu_open: boolean = false

  toggle_menu() {
    this.menu_open = !this.menu_open
  }

}
