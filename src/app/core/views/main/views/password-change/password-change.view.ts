import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IChangedPassword } from 'src/app/core/models/changed-password';
import { PasswordChangeService } from './password-change.service';

@Component({
    selector: 'app-password-change',
    templateUrl: 'password-change.view.html',
    styleUrls: ['password-change.view.scss']
})

export class PasswordChangeViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();
    public validateForm: FormGroup;
    public message: string;
    public loading = false;

    constructor(
        private _router: Router, 
        private _fb: FormBuilder, 
        private _messagesuccessful: NzMessageService,
        private _passwordChangeService: PasswordChangeService) { }

    ngOnInit() {
        this._formBuilder();
    }


       private _createMessage(type: string): void {
            this._messagesuccessful.create(type, `This is a message of ${type}`);
          }
    

    private _formBuilder(): void {
        this.validateForm = this._fb.group({
            old_password: ['', [Validators.required], [this._userNameAsyncValidator]],
            password: ['', [Validators.required]],
            confirm: ['', [this._confirmValidator]],
        });
    }

    private _confirmValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.validateForm.controls.password.value) {
            return { confirm: true, error: true };
        }
        return {};
    };

    private _userNameAsyncValidator = (control: FormControl) =>
        new Observable((observer: Observer<ValidationErrors | null>) => {
            setTimeout(() => {
                if (control.value === 'JasonWood') {
                    observer.next({ error: true, duplicated: true });
                } else {
                    observer.next(null);
                }
                observer.complete();
            }, 1000);
        });

    public submitForm(value: { userName: string; email: string; password: string; confirm: string; comment: string }): void {
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsDirty();
            this.validateForm.controls[key].updateValueAndValidity();
        }
        console.log(value);
    }


    public validateConfirmPassword(): void {
        setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
    }

    public onClickChangedPassword(): void {
        this.loading = true;
        const changedPasswordDetails: IChangedPassword = {
            old_password: this.validateForm.value.old_password,
            new_password: this.validateForm.value.password,
            confirm_new_password: this.validateForm.value.confirm,
        }
        this._passwordChangeService.changedPassword(changedPasswordDetails)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this._createMessage('success');
            },
                err => {
                    this.message = err.message;
                }
            )

    }

    ngOnDestroy() {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

}