import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { fabricanteCadastroComponent } from './components/fabricante-cadastro/fabricante-cadastro.component';

import { fabricanteListaComponent } from './components/fabricante-lista/fabricante-lista.page';

const routes: Routes = [
  {
    path: '',
    component: fabricanteListaComponent
  },
  {
    path: 'cadastro',
    component: fabricanteCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: fabricanteCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class fabricantePageRoutingModule {}
