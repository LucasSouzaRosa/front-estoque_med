import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FabricanteInterface } from '../../types/fabricante.interface';
import { FabricanteService } from '../../services/fabricante.service';
import { AlertService } from '@services';

@Component({
  selector: 'app-fabricante-cadastro',
  templateUrl: './fabricante-cadastro.component.html',
  styleUrls: ['./fabricante-cadastro.component.scss'],
})
export class fabricanteCadastroComponent implements OnInit {
  fabricanteId: string | null;
  fabricanteForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fabricanteService: FabricanteService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.fabricanteId = null;
    this.fabricanteForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.fabricanteId = id;
      this.fabricanteService.getFabricante(this.fabricanteId).subscribe((fabricante) => {
        this.fabricanteForm = this.createForm(fabricante);
      });
    }
  }

  private createForm(fabricante?: FabricanteInterface) {
    return new FormGroup({
      nome: new FormControl(fabricante?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      dataNascimento: new FormControl(
        fabricante?.dataNascimento || new Date().toISOString()
      )
    });
  }

  salvar() {
    const fabricante: FabricanteInterface = {
      ...this.fabricanteForm.value,
    };
    if (this.fabricanteId) {
      fabricante.id = this.fabricanteId;
    }
    this.fabricanteService.salvar(fabricante).subscribe(
      () => this.router.navigate(['fabricante']),
      (erro) => {
        console.error(erro);
        this.alertService.error(
          `Não foi possível salvar o fabricante: ${erro.error.message}`
        );
      }
    );
  }

  get nome() {
    return this.fabricanteForm.get('nome');
  }
}
