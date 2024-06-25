// sintomas-lista.component.ts
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Sintomas } from "../../types/sintomas.class";
import { SintomasService } from "../../services/sintomas.service";
import { AlertService } from '@services';
import { AlertController } from "@ionic/angular";

@Component({
    templateUrl: './sintomas-lista.component.html',
    styleUrls: ['./sintomas-lista.component.scss']
})
export class SintomasListaComponent implements OnInit, OnDestroy {
    public sintomas: Sintomas[] = [];
    private subscription!: Subscription;

    constructor(
        private sintomaService: SintomasService,
        private alertService: AlertService,
        private alertController: AlertController,
    ) { }

    ngOnInit(): void {
        this.listagem();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    listagem() {
        this.subscription = this.sintomaService.getSintomas().subscribe(
            (response) => {
                console.log('Response: ', response);
                this.sintomas = response.map(data => new Sintomas(data));
            },
            (error) => {
                console.error(error);
                this.alertService.error('Erro ao carregar listagem de sintomas');
                console.log('teste');
            }
        );
    }

    excluir(sintoma: Sintomas) {
        this.alertController.create({
            header: 'Confirmação de exclusão',
            message: `Deseja excluir o sintoma ${sintoma.nome}?`,
            buttons: [
                {
                    text: 'Sim',
                    handler: () => {
                        this.sintomaService.remove(sintoma).subscribe({
                            next: () => {
                                this.sintomas = this.sintomas.filter(s => s.id !== sintoma.id);
                            },
                            error: (error: any) => {
                                console.error(error);
                                this.alertService.error('Não foi possível excluir o sintoma!');
                            }
                        });
                    },
                },
                {
                    text: 'Não',
                },
            ],
        }).then((alerta) => alerta.present());
    }
}
