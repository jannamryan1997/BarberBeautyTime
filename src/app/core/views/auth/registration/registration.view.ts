import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IRegistration } from 'src/app/core/models/registration';
import { RegistrationService } from './registration.service';

@Component({
    selector: 'app-registration',
    templateUrl: 'registration.view.html',
    styleUrls: ['registration.view.scss']
})

export class RegistrationViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$: Subject<void> = new Subject<void>();
    public registrationForm: FormGroup;
    public loading = false;
    public message: string;

    constructor(
        private _router: Router,
        private _fb: FormBuilder,
        private _registrationService: RegistrationService,
        private _cookieService: CookieService,
    ) { }

    ngOnInit(): void {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.registrationForm = this._fb.group({
            username: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required]
        });
    }

    public submitForm(): void {
        for (const i in this.registrationForm.controls) {
            this.registrationForm.controls[i].markAsDirty();
            this.registrationForm.controls[i].updateValueAndValidity();
        }
    }


    public onClickRegistration(): void {
        const {
            username,
            first_name,
            last_name,
            email,
            password,
        } = this.registrationForm.value;
        const registrationDetails: IRegistration = {
            username,
            first_name,
            last_name,
            email,
            password,
        }
        if (this.registrationForm.invalid) {
            this.registrationForm.markAllAsTouched();
            return;
        }
        this.loading = true;

        this._registrationService.registration(registrationDetails)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this._cookieService.put('accessToken', data.access_token);
                this._cookieService.put('refreshToken', data.refresh_token);
                this._router.navigate(['/auth/login']);

            },
                err => {
                    this.message = err.message;
                }
            );
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
