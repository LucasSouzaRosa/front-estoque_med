import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { FabricanteInterface, FabricanteService } from "src/app/fabricante";
import { AlertService } from "@services";
import { Subscription } from "rxjs";
import { RemedioService } from "../../services/remedio.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SintomasInterface } from "src/app/sintomas/types/sintomas.interface";
import { RemedioInterface } from "../../types/remedio.interface";

@Component({
    templateUrl: './remedio-cadastro.component.html'
})
export class RemedioCadastroComponent implements OnInit, OnDestroy {

    private URL_PATTERN: RegExp = new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

    private anoAtualValidator: ValidatorFn = (control: AbstractControl<any, any>): ValidationErrors | null => {
        const anoAtual = new Date().getFullYear();
        if (control.value && control.value > anoAtual) {
            return { anoInvalido: true }
        }
        return null;
    }
    private fabricanteValidator: ValidatorFn = (control: AbstractControl<any, any>): ValidationErrors | null => {
        if (control.value?.length < 1) {
            return { fabricanteInvalido: true }
        }
        return null;
    }

    private sintomaValidator: ValidatorFn = (control: AbstractControl<any, any>): ValidationErrors | null => {
        if (control.value?.length < 1) {
            return { sintomaInvalido: true }
        }
        return null;
    }

    id: string = '';
    fabricante: FabricanteInterface[] = [];
    remedioForm = new FormGroup({
        nome: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ]),
        descricao: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100)
        ]),
        saldo: new FormControl<number>(0, [
            Validators.min(0)
        ]),
        dataValidade: new FormControl(2000, [
            Validators.required,
            this.anoAtualValidator
        ]),
        controlado: new FormControl(''),
        fabricante: new FormControl<FabricanteInterface[]>([], this.fabricanteValidator),
        tipo: new FormControl(''),
        sintomas: new FormControl<SintomasInterface[]>([], this.sintomaValidator),
    });

    private subscriptions = new Subscription();

    constructor(
        private activatedRoute: ActivatedRoute,

        private router: Router,
        private fabricanteService: FabricanteService,
        private alertService: AlertService,
        private remedioService: RemedioService,
    ) { }

    ngOnInit(): void {
        this.carregafabricante();
    
        this.id = this.activatedRoute.snapshot.params['id'];
        if (this.id) {
            this.subscriptions.add(
                this.remedioService.getRemedio(this.id).subscribe(
                    (remedio: RemedioInterface) => {
                        const dataValidade = remedio.dataValidade != null ? new Date(remedio.dataValidade).getFullYear() : null;
    
                        this.remedioForm.patchValue({
                            ...remedio,
                            dataValidade: dataValidade // Converte dataValidade para número (ano)
                        });
                    },
                    (error) => {
                        this.alertService.error('Não foi possível carregar os dados do remedio!');
                        console.error(error);
                    }
                )
            );
        }
    }
    
    
    

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    carregafabricante() {
        const subscription = this.fabricanteService.getFabricantes().subscribe(
            (fabricantes) => {
                console.log(fabricantes);
                this.fabricante = fabricantes;
            },
            (error) => {
                console.error(error);
                this.alertService.error('Não foi possível carregar os fabricantes. Tente novamente mais tarde')

            }
        )
        this.subscriptions.add(subscription);
    }

    compareWith(o1: FabricanteInterface, o2: FabricanteInterface) {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    }

    onSubmit() {
        const remedioFormValue = this.remedioForm.value;
    
        // Garantir que propriedades obrigatórias tenham um valor
        if (!remedioFormValue.nome || !remedioFormValue.descricao || remedioFormValue.saldo === undefined || !remedioFormValue.controlado || !remedioFormValue.tipo) {
            console.error('Alguma propriedade obrigatória está faltando ou undefined');
            return; // Ou trate o erro de outra forma
        }
    
        // Tratar dataValidade para garantir que seja um número ou null
        const dataValidade = remedioFormValue.dataValidade != null ? Number(remedioFormValue.dataValidade) : null;
    
        // Tratar saldo para garantir que seja um número ou 0 se for null
        const saldo = remedioFormValue.saldo != null ? Number(remedioFormValue.saldo) : 0;
    
        const remedio: RemedioInterface = {
            nome: remedioFormValue.nome,
            descricao: remedioFormValue.descricao,
            saldo: saldo,
            dataValidade: dataValidade,
            controlado: remedioFormValue.controlado,
            fabricante: remedioFormValue.fabricante || [],
            tipo: remedioFormValue.tipo,
            sintoma: remedioFormValue.sintomas || []
        };
    
        let observable;
        if (this.id) {
            observable = this.remedioService.update(this.id, remedio);
        } else {
            observable = this.remedioService.save(remedio);
        }
    
        this.subscriptions.add(
            observable.subscribe({
                next: () => {
                    this.router.navigate(['/remedios']);
                },
                error: (error) => {
                    console.error(error);
                    this.alertService.error('Não foi possível salvar o remedio.');
                }
            })
        );
    }
    
    
}