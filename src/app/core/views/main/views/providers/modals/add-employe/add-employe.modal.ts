import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { EmployeData } from 'src/app/core/models/employees';
import { ProvidersService } from '../../providers.service';

@Component({
    selector: 'add-employe',
    templateUrl: 'add-employe.modal.html',
    styleUrls: ['add-employe.modal.scss']
})

export class AddEmployeModalComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public validateForm: FormGroup;
    public loading = false;
    public message: string;
    @Input() providerId: number;

    constructor(private _fb: FormBuilder, private _providersService: ProvidersService,private _modal:NzModalRef) { }


    ngOnInit() {
        this._initForm();
    }

    private _initForm(): void {
        this.validateForm = this._fb.group({
            username: ['janna', Validators.required],
            first_name: ['janna mryan', Validators.required],
            last_name: ['janna', Validators.required],
            email: ['janna.mryan1997@mail.ru', [Validators.required, Validators.email]],
            password: ['111111', Validators.required]
        })
    }


    public submitForm(): void {
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
    }

    public addEmploye(): void {
        this.loading = true;
        const {
            username,
            first_name,
            last_name,
            email,
            password,
        } = this.validateForm.value;

        const employeDetails: EmployeData = {
            username,
            first_name,
            last_name,
            email,
            password,
            service_provider: this.providerId
        }
        this._providersService.addEmployees(employeDetails)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data)=>{
                console.log(data);
                this._modal.destroy('AddEmploye');
                
            },
            err=>{
                this.message = err.message;
            }
            )
    }
    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}