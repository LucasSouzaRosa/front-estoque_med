import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FabricanteCadastroComponent } from './components/fabricante-cadastro/fabricante-cadastro.component';

import { FabricanteListaComponent } from './components/fabricante-lista/fabricante-lista.page';

const routes: Routes = [
  {
    path: '',
    component: FabricanteListaComponent
  },
  {
    path: 'cadastro',
    component: FabricanteCadastroComponent
  },
  {
    path: 'fabricantes/:id',
    component: FabricanteCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class fabricantePageRoutingModule {}
