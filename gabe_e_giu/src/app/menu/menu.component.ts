import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import { MenuConfig } from '@models/menu.model';

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
  @Input() logo_properties: MenuConfig = {
    color: 'white',
    background_color: "#f2dcd6",
    hamburger_color: "#440f21"
  }

  toggle_menu() {
    this.menu_open = !this.menu_open
  }

}
