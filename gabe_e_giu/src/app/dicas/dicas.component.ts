import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MenuConfig } from '@models/menu.model';

@Component({
  selector: 'app-dicas',
  imports: [MenuComponent],
  templateUrl: './dicas.component.html',
  styleUrl: './dicas.component.css'
})
export class DicasComponent {
  logo_properties: MenuConfig = {
    color: 'white',
    background_color: "#715f26",
    hamburger_color: "#ffffff"
  }
}
