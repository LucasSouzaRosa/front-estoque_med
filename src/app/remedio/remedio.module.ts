import { NgModule } from "@angular/core";
import { RemedioRoutingModule } from "./remedio-routing.module";
import { IonicModule } from "@ionic/angular";
import { RemedioListaComponent } from "./components/remedio-lista/remedio-lista.component";
import { CommonModule } from "@angular/common";
import { RemedioCadastroComponent } from "./components/remedio-cadastro/remedio-cadastro.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [RemedioRoutingModule, CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
    declarations: [RemedioListaComponent, RemedioCadastroComponent]
})
export class RemedioModule { }