import { NgModule } from "@angular/core";
import { SintomasRoutingModule } from "./sintomas-routing.module";
import { IonicModule } from "@ionic/angular";
import { SintomasListaComponent } from "./components/sintomas-lista/sintomas-lista.component";
import { CommonModule } from "@angular/common";
import { SintomasCadastroComponent } from "./components/sintomas-cadastro/sintomas-cadastro.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [SintomasRoutingModule, CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
    declarations: [SintomasListaComponent, SintomasCadastroComponent]
})
export class SintomasModule { }