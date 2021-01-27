import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IForgotPassword, IResetPassword } from 'src/app/core/models/forgot-passrord';
import { ForgotPasswordService } from './forgot-password.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: 'forgot-password.view.html',
    styleUrls: ['forgot-password.view.scss']
})

export class ForgotPasswordViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public forgotPassswordForm: FormGroup;
    public message: string;
    public loading = false;
    public showFull: boolean = false;
    public showPersonal: boolean = true;

    constructor(private _router: Router, private _fb: FormBuilder, private _forgotPasswordService: ForgotPasswordService) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.forgotPassswordForm = this._fb.group({
            personal: this._fb.group({
                email: ['', [Validators.email, Validators.required]],
            }),
            full: this._fb.group({
                otp: ['', Validators.required],
                new_password: ['', Validators.required],
                confirm_new_password: ['', [this._confirmValidator, Validators.required]],
            })
        })

    }

    private _confirmValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.forgotPassswordForm.get('full')['controls'].new_password.value) {
            return { confirm: true, error: true };
        }
        return {};
    };

    public submitForm(value: { userName: string; email: string; password: string; confirm: string; comment: string }): void {
        for (const key in this.forgotPassswordForm.controls) {
            this.forgotPassswordForm.controls[key].markAsDirty();
            this.forgotPassswordForm.controls[key].updateValueAndValidity();
        }
    }

    public validateConfirmPassword(): void {
        setTimeout(() => this.forgotPassswordForm.get('full')['controls'].confirm.updateValueAndValidity());
    }


    public onClickForgotPassword(): void {
        this.loading = true;
        const { personal } = this.forgotPassswordForm.value;
        const fotgotPasswordDetails: IForgotPassword = {
            email: personal.email,
        }
        this._forgotPasswordService.forgotPassword(fotgotPasswordDetails)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this.message = 'please look at your mail';
                this.showPersonal = false;
                this.showFull = true;

            }, err => {
                this.message = err.message;
            })
    }


    public onClickResetPassword(): void {
        this.loading = true;
        const { full } = this.forgotPassswordForm.value;
        const resetPasswordDetails: IResetPassword = {
            otp: full.otp,
            new_password: full.new_password,
            confirm_new_password: full.confirm_new_password,
        }
        this._forgotPasswordService.resetPassword(resetPasswordDetails)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this._router.navigate(['/auth/login']);

            }, err => {
                this.message = err.message;
            })
    }


    get personalGroup(): FormGroup {
        return this.forgotPassswordForm.get('personal') as FormGroup;
    }

    get fullGroup(): FormGroup {
        return this.forgotPassswordForm.get('full') as FormGroup;
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();

    }
}