import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { fabricantePageRoutingModule } from './fabricante-routing.module';

import { FabricanteListaComponent } from './components/fabricante-lista/fabricante-lista.page';
import { FabricanteCadastroComponent } from './components/fabricante-cadastro/fabricante-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    fabricantePageRoutingModule,
    HttpClientModule,
  ],
  declarations: [FabricanteListaComponent, FabricanteCadastroComponent]
})
export class FabricantePageModule {}
