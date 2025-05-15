import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MenuConfig } from '@models/menu.model';
import { product } from '@models/product.model';
import { CardPresenteComponent } from '../card-presente/card-presente.component';

@Component({
  selector: 'app-recomendacoes',
  imports: [
    MenuComponent,
    CardPresenteComponent
  ],
  templateUrl: './recomendacoes.component.html',
  styleUrl: './recomendacoes.component.css'
})
export class RecomendacoesComponent {
  logo_properties: MenuConfig = {
    color: 'marsala',
    background_color: "#f6b1ca",
    hamburger_color: "#440f21"
  }
  product: product = {
    category: "",
    description: "Reserva de lugar na van para e ir voltar da festa",
    id: 1234,
    name: "Lugar na van para ir e voltar",
    photo_path: "https://jvcvans.com.br/site/wp-content/uploads/2019/02/transporte-corporativo-sp.jpg",
    price_cents: 4500,
    type: ""
  }
}
