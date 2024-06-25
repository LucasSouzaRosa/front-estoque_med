import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SintomasListaComponent } from "./components/sintomas-lista/sintomas-lista.component";
import { SintomasCadastroComponent } from "./components/sintomas-cadastro/sintomas-cadastro.component";

const routes: Routes = [
    {
        path: '',
        component: SintomasListaComponent
    },
    {
        path: 'novo',
        component: SintomasCadastroComponent
    },
    {
        path: 'sintomas/:id',
        component: SintomasCadastroComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SintomasRoutingModule { }