import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { FabricanteInterface, FabricanteService } from "src/app/fabricante";
import { AlertService } from "@services";
import { Subscription } from "rxjs";
import { RemedioService } from "../../services/remedio.service";
import { ActivatedRoute, Router } from "@angular/router";

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

    id: string = '';
    fabricante: FabricanteInterface[] = [];
    remedioForm = new FormGroup({
        titulo: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ]),
        subtitulo: new FormControl(''),
        numeroPaginas: new FormControl(0, Validators.min(5)),
        isbn: new FormControl('', [
            Validators.minLength(10),
            Validators.maxLength(10)
        ]),
        editora: new FormControl('', Validators.required),
        ano: new FormControl(2000, [
            Validators.required,
            this.anoAtualValidator
        ]),
        logoUrl: new FormControl('http://', Validators.pattern(this.URL_PATTERN)),
        preco: new FormControl(0, Validators.min(0)),
        fabricante: new FormControl<FabricanteInterface[]>([], this.fabricanteValidator)
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
        this.carregafabricante()
        
        this.id = this.activatedRoute.snapshot.params['id'];
        if (this.id) {
            this.subscriptions.add(
                this.remedioService.getRemedio(this.id).subscribe((remedio) => {
                    this.remedioForm.patchValue({ ...remedio })
                }, (error) => {
                    this.alertService.error('Não foi possível carregar os dados do remedio!')
                    console.error(error)
                })
            )
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    carregafabricante() {
        const subscription = this.fabricanteService.getfabricante().subscribe(
            (fabricante) => {
                console.log(fabricante);
                this.fabricante = fabricante;
            },
            (error) => {
                console.error(error);
                this.alertService.error('Não foi possível carregar os fabricante. Tente novamente mais tarde')

            }
        )
        this.subscriptions.add(subscription);
    }

    compareWith(o1: FabricanteInterface, o2: FabricanteInterface) {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    }

    onSubmit() {
        const remedio = this.remedioForm.value;

        let observable;
        if (this.id) {
            observable = this.remedioService.update(this.id, remedio);
        } else {
            observable = this.remedioService.save(remedio);
        }

        this.subscriptions.add(
            observable
                .subscribe({
                    next: () => {
                        this.router.navigate(['/remedios'])
                    },
                    error: (error) => {
                        console.error(error);
                        this.alertService.error(
                            'Não foi possível salvar o remedio.'
                        );
                    }
                })
        );

    }
}