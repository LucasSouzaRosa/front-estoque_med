import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { RemedioService } from "src/app/remedio/services/remedio.service";
import { AlertService } from "@services";
import { Subscription } from "rxjs";
import { SintomasService } from "../../services/sintomas.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SintomasInterface } from "../../types/sintomas.interface";
import { RemedioInterface } from "src/app/remedio/types/remedio.interface";

@Component({
    templateUrl: './sintomas-cadastro.component.html'
})
export class SintomasCadastroComponent implements OnInit, OnDestroy {

    private URL_PATTERN: RegExp = new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

    private remedioValidator: ValidatorFn = (control: AbstractControl<any, any>): ValidationErrors | null => {
        if (control.value?.length < 1) {
            return { remedioInvalido: true }
        }
        return null;
    }

    id: string = '';
    remedio: RemedioInterface[] = [];
    sintomaForm = new FormGroup({
        nome: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
        ]),
        descricao: new FormControl(''),
        remedio: new FormControl<RemedioInterface[]>([], this.remedioValidator),
        ativo: new FormControl('', Validators.required),
    });

    private subscriptions = new Subscription();

    constructor(
        private activatedRoute: ActivatedRoute,

        private router: Router,
        private remedioService: RemedioService,
        private alertService: AlertService,
        private sintomaService: SintomasService,
    ) { }

    ngOnInit(): void {
        this.carregaremedio()
        
        this.id = this.activatedRoute.snapshot.params['id'];
        if (this.id) {
            this.subscriptions.add(
                this.sintomaService.getSintoma(this.id).subscribe((sintoma) => {
                    this.sintomaForm.patchValue({ ...sintoma })
                }, (error) => {
                    this.alertService.error('Não foi possível carregar os dados do sintoma!')
                    console.error(error)
                })
            )
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    carregaremedio() {
        const subscription = this.remedioService.getRemedios().subscribe(
            (remedios) => {
                console.log(remedios);
                this.remedio = remedios;
            },
            (error) => {
                console.error(error);
                this.alertService.error('Não foi possível carregar os remedios. Tente novamente mais tarde')

            }
        )
        this.subscriptions.add(subscription);
    }

    compareWith(o1: RemedioInterface, o2: RemedioInterface) {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    }

    onSubmit() {
        const sintoma = this.sintomaForm.value;

        let observable;
        if (this.id) {
            observable = this.sintomaService.update(this.id, sintoma);
        } else {
            observable = this.sintomaService.save(sintoma);
        }

        this.subscriptions.add(
            observable
                .subscribe({
                    next: () => {
                        this.router.navigate(['/sintoma'])
                    },
                    error: (error) => {
                        console.error(error);
                        this.alertService.error(
                            'Não foi possível salvar o sintoma.'
                        );
                    }
                })
        );

    }
}