import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ILogin } from 'src/app/core/models/login';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.view.html',
    styleUrls: ['login.view.scss']
})

export class LoginViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();
    public loginForm: FormGroup;
    public sucssed = false;
    public loading = false;
    public message:string;
    constructor(private _fb: FormBuilder, private _router: Router, private _loginService: LoginService) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this.loginForm = this._fb.group({
            username: ['+37494598258', Validators.required],
            password: ['janulik57', Validators.required],
            remember: ['']
        });
    }

    submitForm(): void {
        for (const i in this.loginForm.controls) {
            this.loginForm.controls[i].markAsDirty();
            this.loginForm.controls[i].updateValueAndValidity();
        }
    }

    public onClickLogin(): void {
        const {
            username,
            password
        } = this.loginForm.value;
        const loginDetails: ILogin = {
            username,
            password
        }

        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        this.sucssed = true;
        this.loading = true;
        this._loginService.login(loginDetails)
        .pipe(takeUntil(this._unsubscribe$),
        finalize(()=>{
            this.loading = false;
        })
        )
        .subscribe((data)=>{
            console.log(data);
            this._router.navigate(['home']);
        },
        err=>{
            this.message=err.message;
        }
        )
       
    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
