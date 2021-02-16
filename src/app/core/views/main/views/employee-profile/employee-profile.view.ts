import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeProfileService } from './employee-profile.service';
import { IAuthUser } from 'src/app/core/models/auth-user';
import { finalize, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
    selector: 'app-employee-profile',
    templateUrl: 'employee-profile.view.html',
    styleUrls: ['employee-profile.view.scss']
})

export class EmployeeProfileViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public validateForm: FormGroup;
    public user: IAuthUser;
    public localImage: any = 'assets/images/hairdresser.jpg';
    public loading = false;
    public message: string;
    public service_provider_id: string;

    constructor(
        private _fb: FormBuilder,
        private _employeeProfileService: EmployeeProfileService,
        private _router: Router,
        private _cookieService: CookieService,
    ) {
        let service_provider_id = this._cookieService.get('service_provider_id');
        if (service_provider_id) {
            this.service_provider_id = service_provider_id;
        }
    }

    ngOnInit(): void {
        this._initForm();
        this._getEmployee();
    }

    private _initForm(): void {
        this.validateForm = this._fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required]
        });
    }

    private _setPatchValue(): void {
        this.validateForm.patchValue({
            name: this.user.username,
            email: this.user.email,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
        });
    }

    private _getEmployee(): void {
        this.loading = true;
        this._employeeProfileService.getEmployee()
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this.user = data;
                if (this.user.avatar) {
                    this.localImage = this.user.avatar;
                }
                console.log(data);
                this._setPatchValue();

            },
                err => {
                    this.message = err.message;
                }
            );
    }

    public submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }

    public handleFileSelect(evt): void {
        const files = evt.target.files;
        const file = files[0];
        if (files && file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64str = reader.result;
                this.localImage = base64str;
            };
            reader.readAsDataURL(file);
        }
    }

    public onClickBooking(): void {
        this._router.navigate([`timesheet/${this.service_provider_id}/${this.user.additional_data.employee.id}`]);
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
