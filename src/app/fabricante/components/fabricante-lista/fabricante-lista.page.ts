import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { FabricanteInterface } from '../../types/fabricante.interface';
import { FabricanteService } from '../../services/fabricante.service';
import { AlertService } from '@services';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante-lista.page.html',
  styleUrls: ['./fabricante-lista.page.scss'],
})
export class FabricanteListaComponent
  implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave, ViewDidLeave {
  fabricante: FabricanteInterface[] = [];

  constructor(
    private alertController: AlertController,
    private fabricanteService: FabricanteService,
    private alertService: AlertService
  ) { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.listar();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnInit() { }

  listar() {
    const observable = this.fabricanteService.getFabricante();
    observable.subscribe(
      (dados) => {
        this.fabricante = dados;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Erro ao carregar listagem de fabricantes');
      }
    );
  }

  confirmarExclusao(fabricante: FabricanteInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o fabricante ${fabricante.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(fabricante),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(fabricante: FabricanteInterface) {
    if (fabricante.id) {
      this.fabricanteService.excluir(fabricante.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.alertService.error(`Não foi possível excluir o fabricante ${fabricante.nome}`);
        }
      );
    }
  }
}