import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import ptBr from '@angular/common/locales/pt';

import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SintomasListaComponent } from './sintomas/components/sintomas-lista/sintomas-lista.component';
import { RemedioService } from './remedio/services/remedio.service';
import { RemedioListaComponent } from './remedio/components/remedio-lista/remedio-lista.component';
import { FabricanteListaComponent } from './fabricante/components/fabricante-lista/fabricante-lista.page';

registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent, SintomasListaComponent, RemedioListaComponent, FabricanteListaComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    RemedioService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
