import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ILogin } from 'src/app/core/models/login';
import { IUser } from 'src/app/core/models/user';
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
    constructor(private _fb: FormBuilder, private _router: Router, private _loginService: LoginService,private _cookieService:CookieService) { }

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

   public submitForm(): void {
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
        .subscribe((data:IUser)=>{
            console.log(data.user.additional_data.employee);
            
            if( data.user.role === 'O'){
                let ownerId =  data.user.additional_data.owner.id;
                this._cookieService.put('ownerId', ownerId);
            }
            else if(data.user.role === 'E'){
                let service_provider_id = data.user.additional_data.employee.service_provider_id;
                this._cookieService.put('service_provider_id',service_provider_id)
            }
         
            this._cookieService.put('accessToken', data.access_token);
            this._cookieService.put('refreshToken', data.refresh_token);
         
            this._cookieService.put('role',data.user.role);
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
