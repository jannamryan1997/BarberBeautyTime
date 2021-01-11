import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    public otp: boolean = false;

    constructor(private _router: Router, private _fb: FormBuilder, private _forgotPasswordService: ForgotPasswordService) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.forgotPassswordForm = this._fb.group({
            email: ['', Validators.required],
            otp: [''],
            new_password: [''],
            confirm_new_password: [''],
        },
        {validator: this._checkPasswords }
        );
    }

    private _checkPasswords(group: FormGroup) { 
  let pass = group.get('new_password').value;
  let confirmPass = group.get('confirm_new_password').value;

  return pass === confirmPass ? null : { notSame: true }     
}

  public   submitForm(): void {
        for (const i in this.forgotPassswordForm.controls) {
            this.forgotPassswordForm.controls[i].markAsDirty();
            this.forgotPassswordForm.controls[i].updateValueAndValidity();
        }
    }

    public onClickForgotPassword(): void {
        if (this.forgotPassswordForm.invalid) {
            this.forgotPassswordForm.markAllAsTouched();
            return;
        }
        this.loading = true;
        if (!this.otp) {
            const {
                email
            } = this.forgotPassswordForm.value;
            const fotgotPasswordDetails: IForgotPassword = {
                email,
            }
            this._forgotPasswordService.forgotPassword(fotgotPasswordDetails)
                .pipe(takeUntil(this._unsubscribe$),
                    finalize(() => {
                        this.loading = false;
                    })
                )
                .subscribe((data) => {
                    this.message = 'please look at your mail';
                    this.otp = true;
                    console.log(data);

                }, err => {
                    this.message = err.message;
                })
        }
        else if (this.otp) {
            const {
                otp,
                new_password,
                confirm_new_password,
            } = this.forgotPassswordForm.value;
            const resetPasswordDetails: IResetPassword = {
                otp,
                new_password,
                confirm_new_password,
            }
            this._forgotPasswordService.resetPassword(resetPasswordDetails)
                .pipe(takeUntil(this._unsubscribe$),
                    finalize(() => {
                        this.loading = false;
                    })
                )
                .subscribe((data) => {
                    console.log(data);
                    this._router.navigate(['/auth/login']);

                }, err => {
                    this.message = err.message;
                })

        }
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();

    }
}