import { Component, OnDestroy, OnInit } from "@angular/core";
import { RemedioService } from "../../services/sintomas.service";
import { Subscription } from "rxjs";
import { Remedio } from "../../types/sintomas.class";
import { AlertService } from '@services';
import { AlertController, ViewWillEnter } from "@ionic/angular";

@Component({
    templateUrl: './remedio-lista.component.html',
    styleUrls: ['./remedio-lista.component.scss']
})
export class RemedioListaComponent implements OnInit, OnDestroy, ViewWillEnter {

    public remedios: Remedio[] = [];
    private subscription!: Subscription;

    constructor(
        private remedioService: RemedioService,
        private alertService: AlertService,
        private alertController: AlertController,
    ) { }
    
    ionViewWillEnter(): void {
        this.listagem();
    }

    ngOnInit(): void {
                
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    listagem() {
        this.subscription = this.remedioService
            .getRemedios()
            .subscribe(
                (response) => {
                    console.log('Response: ', response);
                    this.remedios = response;
                },
                (error) => {
                    console.error(error);
                    this.alertService.error('Erro ao carregar listagem de remedios');
                }
            );
    }

    excluir(remedio: Remedio) {
        this.alertController
            .create({
                header: 'Confirmação de exclusão',
                message: `Deseja excluir o remedio ${remedio.titulo}?`,
                buttons: [
                    {
                        text: 'Sim',
                        handler: () => {
                            this.remedioService
                                .remove(remedio)
                                .subscribe({
                                    next: () => {
                                        this.remedios = this.remedios.filter(
                                            l => l.id !== remedio.id
                                        )
                                    },
                                    error: (error) => {
                                        console.error(error);
                                        this.alertService.error('Não foi possível excluir o remedio!');
                                    }
                                });;
                        },
                    },
                    {
                        text: 'Não',
                    },
                ],
            })
            .then((alerta) => alerta.present());
    }

}