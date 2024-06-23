import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RemedioListaComponent } from "./components/remedio-lista/remedio-lista.component";
import { RemedioCadastroComponent } from "./components/remedio-cadastro/remedio-cadastro.component";

const routes: Routes = [
    {
        path: '',
        component: RemedioListaComponent
    },
    {
        path: 'novo',
        component: RemedioCadastroComponent
    },
    {
        path: 'fabricante/:id',
        component: RemedioCadastroComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RemedioRoutingModule { }