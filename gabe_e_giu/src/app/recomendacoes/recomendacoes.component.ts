import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MenuConfig } from '@models/menu.model';
import { product } from '@models/product.model';
import { CardPresenteComponent } from '../card-presente/card-presente.component';
import { Business } from '@models/business.model';
import { BusinessService } from '@services/business.service';
import { BusinessCardComponent } from '../business-card/business-card.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-recomendacoes',
  imports: [
    CommonModule,
    MenuComponent,
    CardPresenteComponent,
    BusinessCardComponent,
    FooterComponent
  ],
  templateUrl: './recomendacoes.component.html',
  styleUrl: './recomendacoes.component.css'
})
export class RecomendacoesComponent implements OnInit {
  logo_properties: MenuConfig = {
    color: 'marsala',
    background_color: "#f6b1ca",
    hamburger_color: "#440f21"
  }

  private business: BusinessService = new BusinessService()

  product: product = {
    category: "",
    description: "Reserva de lugar na van para e ir voltar da festa.\nHorários:\nSaída: 15:30 (centro de Mogi, próximo ao Marbor)\nRetorno: 22:00 ou 00:00",
    id: 1234,
    name: "Lugar na van para ir e voltar",
    photo_path: "https://jvcvans.com.br/site/wp-content/uploads/2019/02/transporte-corporativo-sp.jpg",
    price_cents: 4500,
    type: ""
  }

  businesses: Business[] = []

  async ngOnInit() {
    this.businesses = await this.business.getBusinesses()
  }
}
