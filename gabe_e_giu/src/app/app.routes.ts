import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DicasComponent } from './dicas/dicas.component';
import { RecomendacoesComponent } from './recomendacoes/recomendacoes.component';
import { PresentesComponent } from './presentes/presentes.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dicas', component: DicasComponent },
  { path: 'recomendacoes', component: RecomendacoesComponent },
  { path: 'presentes', component: PresentesComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: NotFoundComponent } // Optional: Redirect unknown routes to not found
];
