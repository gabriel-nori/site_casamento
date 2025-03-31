import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component'
import { MenuComponent } from '../menu/menu.component';
import { MenuConfig } from '@models/menu.model';

@Component({
  selector: 'app-home',
  imports: [FooterComponent, MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  logo_properties: MenuConfig = {
    custom_image: "/assets/images/flores.svg",
    background_color: "#f2dcd6",
    hamburger_color: "#440f21"
  }
}
